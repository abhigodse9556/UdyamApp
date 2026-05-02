import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import Button from "@/components/ui/button";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useThemeColor } from "@/hooks/use-theme-color";
import {
  clearAllSalesOrders,
  getAllSalesOrders,
  SalesOrder,
} from "@/services/salesOrder";
import { getShopOwner, ShopOwner } from "@/services/shopOwner";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ModalDrawer from "../../components/ui/modalDrawer";
import SalesProvider from "../context/salesContext";
import SalesBill from "../sales/salesBill";
import SalesLedgerCard from "../sales/salesLedgerCard";

const SalesScreen = () => {
  const backgroundColor = useThemeColor(
    { light: "#ffffff", dark: "#101010" },
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
    if (orders && orders?.length > 0) {
      const sortedOrders = [...orders]?.sort((a, b) => {
        // Convert to timestamps; fallback to 0 if date is missing
        const dateA = new Date(a?.createdAt || 0).getTime();
        const dateB = new Date(b?.createdAt || 0).getTime();

        // Descending order: newest first (B - A)
        return dateB - dateA;
      });
      setOrders(sortedOrders);
    } else {
      setOrders([]);
    }
  }, []);

  const onCloseSalesBillModal = useCallback(
    (createNew: boolean = false) => {
      if (createNew) fetchSalesOrders();
      setOpenSalesBillModal(false);
    },
    [fetchSalesOrders],
  );

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
            darkColor="#101010"
            style={styles.headerContainer}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <IconSymbol
                size={28}
                name="menu"
                type="MaterialIcons"
                lightColor="#4059aa"
                darkColor="#4059aa"
              />
              <ThemedText
                lightColor="#4059aa"
                darkColor="#4059aa"
                type="subtitle"
                style={{ fontWeight: "bold" }}
              >
                Sales Ledger
              </ThemedText>
            </View>
            <ThemedText
              lightColor="#000000"
              darkColor="#ffffff"
              style={{ fontWeight: "bold" }}
            >
              {shopData.shopName || "Your Shop Name"}
            </ThemedText>
          </ThemedView>
          <ScrollView style={styles.ledgerContainer}>
            {orders.map((order, index) => (
              <SalesLedgerCard
                key={`${order.id}_${index}`}
                ledgerData={order}
              />
            ))}
          </ScrollView>
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
          <ModalDrawer
            isVisible={openSalesBillModal}
            onClose={() => setOpenSalesBillModal(false)}
            animationIn="slideInRight"
            animationOut="slideOutRight"
          >
            <SalesBill onCloseSalesBillModal={onCloseSalesBillModal} />
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 6,
    borderRadius: 8,
  },
  ledgerContainer: {
    flex: 1,
  },
  buttonContainer: {
    padding: 6,
    borderRadius: 8,
    marginTop: 6,
    gap: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
  },
});

export default SalesScreen;
