import ProductCard from "@/components/common/productCard";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import Button from "@/components/ui/button";
import { IconSymbol } from "@/components/ui/icon-symbol";
import Input from "@/components/ui/input";
import ModalDrawer from "@/components/ui/modalDrawer";
import { formatDateTime } from "@/utils/date";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { SalesContext } from "../context/salesContext";
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
  const { customer, salesBillItems, setSelectedProduct } = salesContextValue;
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
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.mainContainer}>
        <ThemedView
          lightColor="#ffffff"
          darkColor="#000000"
          style={styles.mainContainer}
        >
          <ThemedView
            lightColor="#ffffff"
            darkColor="#000000"
            style={styles.headerContainer}
          >
            <ThemedText
              lightColor="#000000"
              darkColor="#ffffff"
              style={{ fontWeight: "bold", marginBottom: 10 }}
            >
              Sale
            </ThemedText>
            <ThemedText
              lightColor="#000000"
              darkColor="#ffffff"
              style={{ fontWeight: "bold", marginBottom: 10 }}
            >
              {dateTime}
            </ThemedText>
          </ThemedView>
          <ThemedView
            lightColor="#f0f0f0"
            darkColor="#101010"
            style={styles.contentContainer}
          >
            <View style={styles.custContainerRow1}>
              <Input
                label="Customer"
                placeholder="Customer Name"
                value={customer?.name}
                outerContainerStyle={{ flex: 1 }}
                readOnly
                rightIcon={
                  customer?.name ? (
                    <IconSymbol
                      name="edit"
                      type="AntDesign"
                      size={20}
                      color="#000"
                    />
                  ) : (
                    <IconSymbol
                      name="add-user"
                      type="Entypo"
                      size={20}
                      color="#000"
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
                outerContainerStyle={{ flex: 1 }}
                readOnly
                rightIcon={
                  customer?.phone ? (
                    <IconSymbol
                      name="edit"
                      type="AntDesign"
                      size={20}
                      color="#000"
                    />
                  ) : (
                    <IconSymbol
                      name="add-call"
                      type="MaterialIcons"
                      size={20}
                      color="#000"
                    />
                  )
                }
              />
            </View>
          </ThemedView>
          <ThemedView
            lightColor="#f0f0f0"
            darkColor="#101010"
            style={[styles.contentContainer, { flex: 1 }]}
          >
            <ThemedText
              lightColor="#000000"
              darkColor="#ffffff"
              style={{ fontWeight: "bold", marginBottom: 10 }}
            >
              Bill Items for - {customer?.name || "No customer selected"}
            </ThemedText>

            {salesBillItems?.map((item, index) => (
              <TouchableOpacity
                key={`item.id-${index}`}
                onPress={() => {
                  setShowProductSearchModal(true);
                  setIsProductReplacement(true);
                  setSelectedProduct(item);
                }}
                style={{
                  marginBottom: 4,
                }}
              >
                <ProductCard index={index} product={item} />
                {/* <View style={styles.custContainerRow1} key={`item.id-${index}`}>
                  <ThemedText
                    lightColor="#000000"
                    darkColor="#ffffff"
                    style={{ fontWeight: "bold", marginBottom: 10 }}
                  >
                    {item.name}
                  </ThemedText>
                  <ThemedText
                    lightColor="#000000"
                    darkColor="#ffffff"
                    style={{ fontWeight: "bold", marginBottom: 10 }}
                  >
                    {item.rate}
                  </ThemedText>
                  <ThemedText
                    lightColor="#000000"
                    darkColor="#ffffff"
                    style={{ fontWeight: "bold", marginBottom: 10 }}
                  >
                    {item.quantity}
                  </ThemedText>
                </View> */}
              </TouchableOpacity>
            ))}
            <Button
              title="Add Product"
              onPress={() => setShowProductSearchModal(true)}
            />
          </ThemedView>
          <Button title="Close" onPress={() => setOpenSalesBillModal(false)} />
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
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
});

export default SalesBill;
