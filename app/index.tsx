import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { getShopOwner } from "../services/shopOwner";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const owner = await getShopOwner();

      if (owner) {
        router.replace("/(tabs)");
      } else {
        router.replace("/register");
      }
    };

    checkUser();
  }, [router]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
