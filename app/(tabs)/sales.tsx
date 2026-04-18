import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import Button from "@/components/ui/button";
import { useThemeColor } from "@/hooks/use-theme-color";
import {
  clearAllSalesOrders,
  getAllSalesOrders,
  SalesOrder,
} from "@/services/salesOrder";
import { getShopOwner, ShopOwner } from "@/services/shopOwner";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ModalDrawer from "../../components/ui/modalDrawer";
import SalesProvider from "../context/salesContext";
import SalesBill from "../sales/salesBill";
import SalesCard from "../sales/salesCard";

const SalesScreen = () => {
  const backgroundColor = useThemeColor(
    { light: "#ffffff", dark: "#000000" },
    "background",
  );
  const [shopData, setShopData] = useState({} as ShopOwner);
  const [openSalesBillModal, setOpenSalesBillModal] = useState(false);
  const [orders, setOrders] = useState<SalesOrder[]>([]);

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

  const fetchSalesOrders = useCallback(async () => {
    const orders = await getAllSalesOrders();
    setOrders(orders || []);
  }, []);

  useEffect(() => {
    fetchShopOwner();
    fetchSalesOrders();
  }, [fetchShopOwner, fetchSalesOrders]);

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
            <View>
              {orders.map((order, index) => (
                <SalesCard key={order.id} index={index} salesOrder={order} />
              ))}
            </View>
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
