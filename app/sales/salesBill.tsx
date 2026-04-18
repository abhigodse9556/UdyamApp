import LineItemCard from "@/components/common/lineItemCard";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import Button from "@/components/ui/button";
import { IconSymbol } from "@/components/ui/icon-symbol";
import Input from "@/components/ui/input";
import ModalDrawer from "@/components/ui/modalDrawer";
import { SalesBillItem } from "@/services/salesOrder";
import { calculateSalesLineItem } from "@/utils/calculate";
import { formatDateTime } from "@/utils/date";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SalesContext } from "../context/salesContext";
import BillSummary from "./billSummary";
import CustomerSearch from "./customerSearch";
import ProductSearch from "./productSearch";

type SalesBillProps = {
  setOpenSalesBillModal: (bool: boolean) => void;
};
const SalesBill = (props: SalesBillProps) => {
  const { setOpenSalesBillModal } = props;
  const salesContextValue = useContext(SalesContext);
  if (!salesContextValue) {
    throw new Error("SalesContext not found. Wrap with SalesProvider.");
  }
  const {
    customer,
    salesBillItems,
    setSalesBillItems,
    setSelectedProduct,
    orderData,
  } = salesContextValue;
  const [dateTime, setDateTime] = useState(formatDateTime());
  const [showCustSearchModal, setShowCustSearchModal] = useState(false);
  const [showProductSearchModal, setShowProductSearchModal] = useState(false);
  const [isProductReplacement, setIsProductReplacement] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(formatDateTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
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
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.mainContainer}>
        <ThemedView
          lightColor="#ffffff"
          darkColor="#000000"
          style={styles.mainContainer}
        >
          <ThemedView
            lightColor="rgb(255, 255, 255)"
            darkColor="#1a1c1f"
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
              <TouchableOpacity onPress={() => setOpenSalesBillModal(false)}>
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
                New Bill
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
                <ThemedText
                  lightColor="#4059aa"
                  darkColor="#a9c7ff"
                  style={{ fontWeight: "bold", fontSize: 16 }}
                >
                  Step 1 of 2
                </ThemedText>
              </View>

              <ThemedView
                lightColor="#f0f4f7"
                darkColor="#282a2d"
                style={styles.custContainerRow1}
              >
                <Input
                  label="Customer Name"
                  placeholder="Customer Name"
                  value={customer?.name}
                  // outerContainerStyle={{ flex: 1 }}
                  // readOnly
                  rightIcon={
                    customer?.name ? (
                      <IconSymbol
                        name="edit"
                        type="AntDesign"
                        size={20}
                        lightColor="#566166"
                        // darkColor="#000"
                      />
                    ) : (
                      <IconSymbol
                        name="add-user"
                        type="Entypo"
                        size={20}
                        lightColor="#566166"
                        // darkColor="#000"
                      />
                    )
                  }
                  onRightIconPress={() => {
                    setShowCustSearchModal(true);
                  }}
                />
                <Input
                  label="Phone Number"
                  placeholder="Phone Number"
                  value={customer?.phone}
                  // outerContainerStyle={{ flex: 1 }}
                  readOnly
                  rightIcon={
                    customer?.phone ? (
                      <IconSymbol
                        name="edit"
                        type="AntDesign"
                        size={20}
                        lightColor="#566166"
                      />
                    ) : (
                      <IconSymbol
                        name="add-call"
                        type="MaterialIcons"
                        size={20}
                        lightColor="#566166"
                      />
                    )
                  }
                />
              </ThemedView>
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
                &#8377;{orderData?.netAmount || 0}
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
              onPress={() => setOpenSalesBillModal(false)}
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
          isVisible={showCustSearchModal}
          onClose={() => setShowCustSearchModal(false)}
          style={{ justifyContent: "flex-end" }}
        >
          <CustomerSearch setShowCustSearchModal={setShowCustSearchModal} />
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
  custContainerRow1: {
    justifyContent: "space-between",
    gap: 10,
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
