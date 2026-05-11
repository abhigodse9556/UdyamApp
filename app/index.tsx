import { initializeDatabase } from "@/database/init";
import bootstrapAuth from "@/services/auth.bootstrap";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    initializeDatabase();
  }, []);

  useEffect(() => {
    const checkUserSession = async () => {
      await bootstrapAuth();
    };

    checkUserSession();
  }, [router]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
