import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import Button from "@/components/ui/button";
import { useThemeColor } from "@/hooks/use-theme-color";
import { clearAllSalesOrders } from "@/services/salesOrder";
import { getShopOwner } from "@/services/shopOwner";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ModalDrawer from "../../components/ui/modalDrawer";
import SalesProvider from "../context/salesContext";
import SalesBill from "../sales/salesBill";

const SalesScreen = () => {
  const backgroundColor = useThemeColor(
    { light: "#ffffff", dark: "#000000" },
    "background",
  );
  const [shopData, setShopData] = useState({
    id: "",
    name: "",
    shopName: "",
    phone: "",
    address: "",
  });
  const [openSalesBillModal, setOpenSalesBillModal] = useState(false);

  const fetchShopOwner = useCallback(async () => {
    const owner = await getShopOwner();
    setShopData({
      id: owner?.id || "",
      name: owner?.name || "",
      shopName: owner?.shopName || "",
      phone: owner?.phone || "",
      address: owner?.address || "",
    });
  }, []);
  useEffect(() => {
    fetchShopOwner();
  }, [fetchShopOwner]);

  return (
    <SalesProvider>
      <SafeAreaProvider style={{ backgroundColor }}>
        <SafeAreaView style={styles.mainContainer}>
          <ThemedView
            lightColor="#ffffff"
            darkColor="#000000"
            style={{ padding: 6 }}
          >
            <ThemedView
              lightColor="#ffffff"
              darkColor="#101010"
              style={styles.headerContainer}
            >
              <ThemedText
                lightColor="#000000"
                darkColor="#ffffff"
                style={{ fontWeight: "bold" }}
              >
                {shopData.shopName || "Your Shop Name"}
              </ThemedText>
            </ThemedView>
            <ThemedView
              lightColor="#ffffff"
              darkColor="#101010"
              style={styles.buttonContainer}
            >
              <Button
                title="Create New Sales Bill"
                onPress={() => setOpenSalesBillModal(true)}
              />
              <Button
                title="Clear All Sales Bills"
                onPress={() => clearAllSalesOrders()}
                darkColor="red"
                lightColor="red"
              />
            </ThemedView>
          </ThemedView>
          <ModalDrawer
            isVisible={openSalesBillModal}
            onClose={() => setOpenSalesBillModal(false)}
            animationIn="slideInRight"
            animationOut="slideOutRight"
          >
            <SalesBill setOpenSalesBillModal={setOpenSalesBillModal} />
          </ModalDrawer>
        </SafeAreaView>
      </SafeAreaProvider>
    </SalesProvider>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 0,
    padding: 0,
    justifyContent: "space-between",
  },
  headerContainer: { padding: 6, borderRadius: 8 },
  buttonContainer: {
    padding: 6,
    borderRadius: 8,
    marginTop: 6,
    gap: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default SalesScreen;
