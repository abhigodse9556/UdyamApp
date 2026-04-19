import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Customer, getCustomerById } from "@/services/customer";
import { SalesOrder } from "@/services/salesOrder";
import { formatDateTime } from "@/utils/date";
import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type SalesLedgerCardProps = {
  ledgerData: SalesOrder;
  onPress?: () => void;
};
const SalesLedgerCard = (props: SalesLedgerCardProps) => {
  const { ledgerData, onPress } = props;
  const [status, setStatus] = useState("");
  const [customer, setCustomer] = useState<Customer>({} as Customer);
  const isPaid = useMemo(
    () => ledgerData.netAmount === ledgerData.paidAmount,
    [ledgerData],
  );

  useEffect(() => {
    if (isPaid) {
      setStatus("Paid");
    } else {
      setStatus("Pending");
    }
  }, [isPaid]);

  useEffect(() => {
    const fetchCustomer = async () => {
      const customer = await getCustomerById(ledgerData.customerId);
      setCustomer(customer || ({} as Customer));
    };
    fetchCustomer();
  }, [ledgerData.customerId]);

  return (
    <ThemedView
      lightColor="#ffffff"
      darkColor="#282a2d"
      style={styles.cardContainer}
    >
      {/* Top Section / Left Side */}
      <View style={styles.headerRow}>
        <ThemedView
          lightColor="#F3F4F6"
          darkColor="#3F3F46"
          style={styles.iconContainer}
        >
          <IconSymbol
            type="MaterialIcons"
            name="receipt-long"
            size={24}
            lightColor="#005FB8"
            darkColor="#005FB8"
          />
        </ThemedView>

        <View style={styles.infoContainer}>
          <View style={styles.badgeRow}>
            <ThemedView
              lightColor="#E5E7EB"
              darkColor="#3F3F46"
              style={styles.invoiceBadge}
            >
              <ThemedText
                lightColor="#4B5563"
                darkColor="#D1D5DB"
                style={styles.invoiceText}
              >
                #{ledgerData.invoiceNumber}
              </ThemedText>
            </ThemedView>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: isPaid ? "#10B981" : "#F59E0B" },
              ]}
            />
            <Text
              style={[
                styles.statusText,
                { color: isPaid ? "#059669" : "#D97706" },
              ]}
            >
              {status}
            </Text>
          </View>
          <ThemedText
            lightColor="#1C1B1F"
            darkColor="#ffffff"
            style={styles.customerName}
          >
            {customer.name}
          </ThemedText>
          <ThemedText
            lightColor="#49454F"
            darkColor="#c2c6d4"
            style={styles.dateText}
          >
            {formatDateTime(ledgerData.createdAt)}
          </ThemedText>
        </View>
      </View>

      {/* Bottom Section / Right Side */}
      <View style={styles.footerRow}>
        <View>
          <ThemedText
            lightColor="#938F99"
            darkColor="#c2c6d4"
            style={styles.amountLabel}
          >
            TOTAL AMOUNT
          </ThemedText>
          <ThemedText
            lightColor="#1C1B1F"
            darkColor="#ffffff"
            style={styles.amountValue}
          >
            ${ledgerData.paidAmount}
          </ThemedText>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.shareAction}>
            <IconSymbol
              type="MaterialIcons"
              name="share"
              size={20}
              lightColor="#25D366"
              darkColor="#25D366"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.moreAction}>
            <IconSymbol
              type="MaterialIcons"
              name="more-vert"
              size={20}
              lightColor="#49454F"
              darkColor="#49454F"
            />
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 16,
    padding: 24,
    marginVertical: 8,
    marginHorizontal: 16,
    // Shadow for iOS
    shadowColor: "#2A3439",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    // Elevation for Android
    elevation: 3,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    // backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  invoiceBadge: {
    // backgroundColor: "#E5E7EB",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  invoiceText: {
    fontSize: 10,
    fontWeight: "700",
    // color: "#4B5563",
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  customerName: {
    fontSize: 18,
    fontWeight: "700",
    // color: "#1C1B1F",
  },
  dateText: {
    fontSize: 12,
    fontWeight: "500",
    // color: "#49454F",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 16,
  },
  amountLabel: {
    fontSize: 10,
    fontWeight: "700",
    // color: "#938F99",
    letterSpacing: 1,
  },
  amountValue: {
    fontSize: 20,
    fontWeight: "800",
    // color: "#1C1B1F",
  },
  actionContainer: {
    flexDirection: "row",
    gap: 8,
  },
  shareAction: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(37, 211, 102, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  moreAction: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SalesLedgerCard;
