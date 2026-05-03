import LineItemCard from "@/app/sales/lineItemCard";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import Button from "@/components/ui/button";
import { IconSymbol } from "@/components/ui/icon-symbol";
import ModalDrawer from "@/components/ui/modalDrawer";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Customer, getCustomerById } from "@/services/customer";
import { getProductById } from "@/services/product";
import {
  getSalesOrderById,
  SalesBillItem,
  SalesOrder,
  saveSalesOrder,
  updateSalesOrder,
} from "@/services/salesOrder";
import { calculateSalesLineItem } from "@/utils/calculate";
import { formatDateTime } from "@/utils/date";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SalesContext } from "../context/salesContext";
import BillSummary from "./billSummary";
import CustomerCard from "./customerCard";
import CustomerModal from "./customerModal";
import ProductSearch from "./productSearch";

type SalesBillProps = {
  onCloseSalesBillModal: (bool: boolean) => void;
  orderId?: string;
};
const SalesBill = (props: SalesBillProps) => {
  const { onCloseSalesBillModal, orderId } = props;
  const backgroundColor = useThemeColor(
    { light: "#ffffff", dark: "#101010" },
    "background",
  );
  const salesContextValue = useContext(SalesContext);
  if (!salesContextValue) {
    throw new Error("SalesContext not found. Wrap with SalesProvider.");
  }
  const {
    customer,
    setCustomer,
    salesBillItems,
    setSalesBillItems,
    setSelectedProduct,
    orderData,
  } = salesContextValue;
  const [dateTime, setDateTime] = useState(formatDateTime(undefined, true));
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [isEditCustomer, setIsEditCustomer] = useState(false);
  const [showProductSearchModal, setShowProductSearchModal] = useState(false);
  const [isProductReplacement, setIsProductReplacement] = useState(false);

  const updateLineItem = (
    item: SalesBillItem,
    index: number,
    isIncrease?: boolean,
    isDelete?: boolean,
  ) => {
    setSalesBillItems((prevItems) => {
      const updated = [...prevItems];

      if (isDelete) {
        updated.splice(index, 1);
        return updated;
      }

      let currentItem = { ...updated[index] };

      if (isIncrease === true) {
        if (currentItem.quantity === currentItem.stock) return updated;
        currentItem.quantity += 1;
      }

      if (isIncrease === false) {
        if (currentItem.quantity === 1) return updated;
        currentItem.quantity -= 1;
      }

      if (isIncrease === undefined && !isDelete) {
        currentItem = item;
      }

      const calculated = calculateSalesLineItem(currentItem);
      updated[index] = { ...currentItem, ...calculated };

      return updated;
    });
  };

  const resetBill = () => {
    setSalesBillItems([]);
    setCustomer({} as Customer);
    setDateTime(formatDateTime(undefined, true));
    setSelectedProduct({} as SalesBillItem);
    setShowCustomerModal(false);
    setShowProductSearchModal(false);
    setIsProductReplacement(false);
    setIsEditCustomer(false);
  };

  const generateBill = async () => {
    const updated = {
      id: orderId || undefined,
      customerId: orderData.customerId,
      grossAmount: orderData.grossAmount,
      netAmount: orderData.netAmount,
      discountAmount: orderData.discountAmount,
      paidAmount: orderData.paidAmount,
      items: [
        ...orderData.items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          soldAtRate: item.soldAtRate,
          givenDiscPercent: item.givenDiscPercent,
          taxRate: item.taxRate,
        })),
      ],
    };
    if (!orderId) {
      await saveSalesOrder(updated as any);
    } else {
      await updateSalesOrder(updated as any);
    }
    resetBill();
    onCloseSalesBillModal(true);
  };

  const fetchOrderItems = async (order: SalesOrder) => {
    const items = await Promise.all(
      order.items.map(async (item) => {
        const product = await getProductById(item.productId);
        const calculated = calculateSalesLineItem({
          ...item,
          ...product,
        });
        return calculated;
      }),
    );
    return items;
  };

  useEffect(() => {
    if (!orderId) return;
    const fetchOrderById = async () => {
      const order = await getSalesOrderById(orderId);
      if (order) {
        setDateTime(formatDateTime(order.createdAt));
        setCustomer((await getCustomerById(order.customerId)) as Customer);
        const items = await fetchOrderItems(order);
        setSalesBillItems(items);
      } else setSalesBillItems([]);
    };
    fetchOrderById();
  }, [orderId, setSalesBillItems, setCustomer]);

  useEffect(() => {
    if (orderId) return;
    const interval = setInterval(() => {
      setDateTime(formatDateTime(undefined, true));
    }, 1000);
    return () => clearInterval(interval);
  }, [orderId]);

  return (
    <SafeAreaProvider style={{ backgroundColor }}>
      <SafeAreaView style={[styles.mainContainer]}>
        <ThemedView
          lightColor="#ffffff"
          darkColor="#000000"
          style={styles.mainContainer}
        >
          <ThemedView
            lightColor="rgb(255, 255, 255)"
            darkColor="#101010"
            style={styles.headerContainer}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginLeft: 4,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  onCloseSalesBillModal(false);
                  setSalesBillItems([]);
                  setCustomer({} as Customer);
                }}
              >
                <IconSymbol
                  name="arrow-left"
                  type="AntDesign"
                  size={20}
                  lightColor="#4059aa"
                  darkColor="rgb(240 244 247)"
                />
              </TouchableOpacity>
              <ThemedText
                lightColor="#4059aa"
                darkColor="rgb(240 244 247)"
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  fontFamily: "manrope",
                }}
              >
                {orderId ? "Edit Bill" : "New Bill"}
              </ThemedText>
            </View>
            <ThemedText
              lightColor="#000000"
              darkColor="rgb(240 244 247)"
              style={{ fontWeight: "bold", fontFamily: "font-manrope-bold" }}
            >
              {dateTime}
            </ThemedText>
          </ThemedView>
          <KeyboardAwareScrollView style={{ flex: 1, padding: 16 }}>
            <ThemedView
              lightColor="#ffffff"
              darkColor="#000000"
              style={styles.contentContainer}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <ThemedText
                  lightColor="#2a3439"
                  darkColor="rgb(240 244 247)"
                  style={{
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  Customer Details
                </ThemedText>
                <TouchableOpacity
                  onPress={() => {
                    setIsEditCustomer(true);
                    setShowCustomerModal(true);
                  }}
                  style={
                    customer?.name
                      ? { flexDirection: "row", gap: 2, alignItems: "center" }
                      : { display: "none" }
                  }
                >
                  <IconSymbol
                    name="edit"
                    type="AntDesign"
                    size={20}
                    lightColor="#4059aa"
                    darkColor="#a9c7ff"
                  />
                  <ThemedText
                    lightColor="#4059aa"
                    darkColor="#a9c7ff"
                    style={{ fontWeight: "bold", fontSize: 16 }}
                  >
                    Edit Info
                  </ThemedText>
                </TouchableOpacity>
              </View>
              <CustomerCard
                customer={customer}
                onPress={() => setShowCustomerModal(true)}
              />
            </ThemedView>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 20,
              }}
            >
              <ThemedText
                lightColor="#2a3439"
                darkColor="rgb(240 244 247)"
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  fontFamily: "Manrope",
                }}
              >
                Line Items
              </ThemedText>
              <TouchableOpacity
                onPress={() => setShowProductSearchModal(true)}
                style={{ flexDirection: "row", gap: 2, alignItems: "center" }}
              >
                <IconSymbol
                  name="add-circle-outline"
                  type="MaterialIcons"
                  size={20}
                  lightColor="#4059aa"
                  darkColor="#a9c7ff"
                />
                <ThemedText
                  lightColor="#4059aa"
                  darkColor="#a9c7ff"
                  style={{ fontWeight: "bold", fontSize: 18 }}
                >
                  Add Item
                </ThemedText>
              </TouchableOpacity>
            </View>
            <ThemedView
              lightColor="#ffffff"
              darkColor="#000000"
              style={[styles.contentContainer, { flex: 1 }]}
            >
              {salesBillItems?.map((item, index) => (
                <LineItemCard
                  key={`item.id-${index}`}
                  item={item}
                  onDelete={() => updateLineItem(item, index, undefined, true)}
                  onIncrease={() => updateLineItem(item, index, true)}
                  onDecrease={() => updateLineItem(item, index, false)}
                  onEdit={() => {
                    setIsProductReplacement(true);
                    setSelectedProduct(item);
                    setShowProductSearchModal(true);
                  }}
                />
              ))}
              <BillSummary />
            </ThemedView>
          </KeyboardAwareScrollView>
          <ThemedView
            lightColor="#ffffffcc"
            darkColor="#111316b3"
            style={styles.buttonContainer}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <ThemedText
                lightColor="#566166"
                darkColor="rgb(240 244 247)"
                style={{
                  fontWeight: "bold",
                  fontSize: 14,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                AMOUNT DUE
              </ThemedText>
              <ThemedText
                lightColor="#4059aa"
                darkColor="#a9c7ff"
                style={{
                  fontWeight: "bold",
                  fontSize: 24,
                  fontFamily: "Manrope",
                }}
              >
                &#8377;{(orderData?.netAmount || 0)?.toFixed(2)}
              </ThemedText>
            </View>
            <Button
              title="Generate Bill"
              titleStyle={{ fontSize: 20 }}
              style={{
                paddingHorizontal: 40,
                paddingVertical: 20,
                gap: 10,
              }}
              lightColor="#4059aa"
              darkColor="#005eb8"
              onPress={() => generateBill()}
              rightIcon={
                <IconSymbol
                  name="receipt-long"
                  type="MaterialIcons"
                  size={24}
                  lightColor="#ffffff"
                />
              }
            />
          </ThemedView>
        </ThemedView>
        <ModalDrawer
          isVisible={showCustomerModal}
          onClose={() => setShowCustomerModal(false)}
          style={{ justifyContent: "flex-end" }}
        >
          <CustomerModal
            setShowCustomerModal={setShowCustomerModal}
            isEditCustomer={isEditCustomer}
          />
        </ModalDrawer>
        <ModalDrawer
          isVisible={showProductSearchModal}
          onClose={() => setShowProductSearchModal(false)}
          style={{ justifyContent: "flex-end" }}
        >
          <ProductSearch
            setShowProductSearchModal={setShowProductSearchModal}
            isProductReplacement={isProductReplacement}
          />
        </ModalDrawer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 0,
    padding: 0,
    justifyContent: "space-between",
    // backgroundColor: "#1a1c1f",
  },
  headerContainer: {
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  contentContainer: {
    padding: 10,
  },
  custContainer: {
    flexDirection: "row",
    gap: 20,
    padding: 20,
    borderRadius: 8,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 26,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    gap: 18,
  },
});

export default SalesBill;
