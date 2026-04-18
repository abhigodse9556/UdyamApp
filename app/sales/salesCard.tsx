import { Customer, getCustomerById } from "@/services/customer";
import { SalesOrder } from "@/services/salesOrder";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../../components/themed-text";
import { ThemedView } from "../../components/themed-view";
import { IconSymbol } from "../../components/ui/icon-symbol";

type SalesCardProps = {
  index: number;
  salesOrder: SalesOrder;
};
const SalesCard = (props: SalesCardProps) => {
  const { index, salesOrder } = props;
  const [customer, setCustomer] = useState<Customer>({} as Customer);
  useEffect(() => {
    const fetchCustomer = async () => {
      const customer = await getCustomerById(salesOrder.customerId);
      setCustomer(customer || ({} as Customer));
    };
    fetchCustomer();
  });
  return (
    <ThemedView
      lightColor="#ffffff"
      darkColor="#190231"
      style={[styles.container, styles.cardShadow]}
    >
      <View style={styles.indexContainer}>
        <ThemedText lightColor="#0f001f" darkColor="#efe4fb">
          {index + 1}
        </ThemedText>
      </View>
      <ThemedView
        // lightColor="rgb(240 244 247)"
        darkColor="#0f001f"
        style={styles.contentContainer}
      >
        <View style={{ flex: 1 }}>
          <ThemedText type="subtitle" lightColor="#0f001f" darkColor="#efe4fb">
            {customer.name}
          </ThemedText>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <ThemedText type="default" lightColor="#0f001f" darkColor="#efe4fb">
            &#8377;{salesOrder.paidAmount}
          </ThemedText>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <TouchableOpacity
              style={{
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: 10,
                padding: 2,
              }}
            >
              <IconSymbol
                size={12}
                name="minus"
                type="AntDesign"
                lightColor="#0f001f"
              />
            </TouchableOpacity>
            <ThemedText type="default" lightColor="#0f001f" darkColor="#efe4fb">
              Qty: {salesOrder.invoiceNumber}
            </ThemedText>
            <TouchableOpacity
              style={{
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: 10,
                padding: 2,
              }}
            >
              <IconSymbol
                size={12}
                name="plus"
                type="AntDesign"
                lightColor="#0f001f"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "auto",
    height: 60,
    borderRadius: 10,
    flexDirection: "row",
    borderWidth: 0,
    borderColor: "#f9f9f9",
  },
  cardShadow: {
    // --- iOS Shadow Properties ---
    shadowColor: "rgb(42, 52, 57)", // Base color without opacity
    shadowOffset: {
      width: 0, // x-offset
      height: 4, // y-offset
    },
    shadowOpacity: 0.04, // Opacity from the rgba value
    shadowRadius: 20, // Blur radius

    // --- Android Shadow Property ---
    elevation: 2, // Closest approximation for a subtle shadow
  },
  indexContainer: {
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  contentContainer: {
    flex: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
export default SalesCard;
