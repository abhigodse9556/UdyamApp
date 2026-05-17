import { StyleSheet } from "react-native";

import StoreForm from "@/components/forms/storeForm";
import { ThemedView } from "@/components/themed-view";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const StoreRegisterScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <Text variant="titleLarge" style={{ marginBottom: 12 }}>
          Register your store
        </Text>
        <StoreForm />
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
});

export default StoreRegisterScreen;
