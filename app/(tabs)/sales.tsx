import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { getShopOwner } from "@/services/shopOwner";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const SalesScreen = () => {
  const [shopData, setShopData] = useState({
    id: "",
    name: "",
    shopName: "",
    phone: "",
    address: "",
  });
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
    <SafeAreaProvider>
      <SafeAreaView style={styles.mainContainer}>
        <ThemedView
          lightColor="#ffffff"
          darkColor="#000000"
          style={{ padding: 6 }}
        >
          <ThemedView
            lightColor="#f0f0f0"
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
        </ThemedView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerContainer: { padding: 6, borderRadius: 8 },
});

export default SalesScreen;
