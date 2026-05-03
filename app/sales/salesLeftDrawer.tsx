import Confirm from "@/components/common/confirmationModal";
import { ThemedView } from "@/components/themed-view";
import Button from "@/components/ui/button";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { clearAllSalesOrders } from "@/services/salesOrder";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

type leftDrawerProps = {
  onClose: () => void;
};
const SalesLeftDrawer = (props: leftDrawerProps) => {
  const { onClose } = props;
  const [showConfirm, setShowConfirm] = useState(false);
  return (
    <ThemedView
      lightColor="#ffffff"
      darkColor="#101010"
      style={styles.leftDrawerContainer}
    >
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          padding: 10,
        }}
        onPress={onClose}
      >
        <IconSymbol
          name="close"
          size={28}
          type="MaterialIcons"
          lightColor="#000000"
          darkColor="#ffffff"
        />
      </TouchableOpacity>
      <Button
        title="Clear All Sales Bills"
        onPress={() => setShowConfirm(true)}
        darkColor="red"
        lightColor="red"
      />
      <Confirm
        visible={showConfirm}
        title="Clear All Sales Bills?"
        message="This will delete all sales bills and cannot be undone!"
        onConfirm={() => {
          clearAllSalesOrders();
          setShowConfirm(false);
          onClose();
        }}
        onCancel={() => setShowConfirm(false)}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  leftDrawerContainer: {
    height: "100%",
    width: "80%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

export default SalesLeftDrawer;
