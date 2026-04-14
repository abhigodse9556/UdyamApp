import LineItemCard from "@/components/common/lineItemCard";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import Button from "@/components/ui/button";
import { IconSymbol } from "@/components/ui/icon-symbol";
import Input from "@/components/ui/input";
import ModalDrawer from "@/components/ui/modalDrawer";
import { formatDateTime } from "@/utils/date";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
          lightColor="rgb(240 244 247)"
          darkColor="#000000"
          style={styles.mainContainer}
        >
          <ThemedView
            lightColor="rgb(255, 255, 255)"
            darkColor="#000000"
            style={styles.headerContainer}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <IconSymbol
                name="arrow-left"
                type="AntDesign"
                size={20}
                color="#4059aa"
              />
              <ThemedText
                lightColor="#4059aa"
                darkColor="rgb(240 244 247)"
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  fontFamily: "manrope",
                }}
              >
                New Sale Bill
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
              darkColor="#101010"
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
                  darkColor="#4059aa"
                  style={{ fontWeight: "bold", fontSize: 16 }}
                >
                  STEP 1 OF 2
                </ThemedText>
              </View>

              <ThemedView
                lightColor="#f0f4f7"
                darkColor="#101010"
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
                        color="#566166"
                      />
                    ) : (
                      <IconSymbol
                        name="add-user"
                        type="Entypo"
                        size={20}
                        color="#566166"
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
                        color="#566166"
                      />
                    ) : (
                      <IconSymbol
                        name="add-call"
                        type="MaterialIcons"
                        size={20}
                        color="#566166"
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
                  color="#4059aa"
                />
                <ThemedText
                  lightColor="#4059aa"
                  darkColor="#4059aa"
                  style={{ fontWeight: "bold", fontSize: 18 }}
                >
                  Add Product
                </ThemedText>
              </TouchableOpacity>
            </View>
            <ThemedView
              lightColor="#ffffff"
              darkColor="#101010"
              style={[styles.contentContainer, { flex: 1 }]}
            >
              {salesBillItems?.map((item, index) => (
                <LineItemCard key={`item.id-${index}`} item={item} />
              ))}
            </ThemedView>
          </KeyboardAwareScrollView>
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
    backgroundColor: "#ffffff",
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
});

export default SalesBill;
