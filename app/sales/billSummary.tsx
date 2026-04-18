import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SalesContext } from "../context/salesContext";

const BillSummary = () => {
  const salesContextValue = useContext(SalesContext);
  if (!salesContextValue) {
    throw new Error("SalesContext not found. Wrap with SalesProvider.");
  }
  const { orderData } = salesContextValue;
  return (
    <ThemedView
      lightColor="#f0f4f7"
      darkColor="#282a2d"
      style={styles.container}
    >
      {/* Subtotal */}
      <View style={styles.row}>
        <ThemedText
          lightColor="#49454F"
          darkColor="#c2c6d4"
          style={styles.label}
        >
          Subtotal
        </ThemedText>
        <ThemedText
          lightColor="#1C1B1F"
          darkColor="#ffffff"
          style={styles.value}
        >
          &#8377;{orderData?.grossAmount || 0.0}
        </ThemedText>
      </View>

      {/* Tax */}
      <View style={styles.row}>
        <View style={styles.infoWrapper}>
          <ThemedText
            lightColor="#49454F"
            darkColor="#c2c6d4"
            style={styles.label}
          >
            Tax (GST 12%)
          </ThemedText>
          <IconSymbol
            type="MaterialIcons"
            name="info-outline"
            size={14}
            lightColor="#79747E"
            style={styles.icon}
          />
        </View>
        <ThemedText
          lightColor="#1C1B1F"
          darkColor="#ffffff"
          style={styles.value}
        >
          &#8377;25.20
        </ThemedText>
      </View>

      {/* Discount */}
      <View style={styles.row}>
        <View>
          <ThemedText
            lightColor="#49454F"
            darkColor="#c2c6d4"
            style={styles.label}
          >
            Discount
          </ThemedText>
          <TouchableOpacity>
            <ThemedText
              lightColor="#6750A4"
              darkColor="#6750A4"
              style={styles.couponButton}
            >
              APPLY COUPON
            </ThemedText>
          </TouchableOpacity>
        </View>
        <ThemedText
          lightColor="#B3261E"
          darkColor="#B3261E"
          style={[styles.value, styles.errorText]}
        >
          -&#8377;{orderData?.discountAmount || 0.0}
        </ThemedText>
      </View>

      <View style={styles.row}>
        <ThemedText
          lightColor="#49454F"
          darkColor="#c2c6d4"
          style={styles.label}
        >
          Shipping and Handling
        </ThemedText>
        <ThemedText
          lightColor="#1C1B1F"
          darkColor="#ffffff"
          style={styles.value}
        >
          &#8377;150.00
        </ThemedText>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Grand Total Section */}
      <View style={[styles.row, styles.alignEnd]}>
        <View>
          <ThemedText lightColor="#49454F" style={styles.grandTotalLabel}>
            GRAND TOTAL
          </ThemedText>
          <ThemedText
            lightColor="#1C1B1F"
            darkColor="#a9c7ff"
            style={styles.totalAmount}
          >
            &#8377;{orderData?.netAmount || 0.0}
          </ThemedText>
        </View>
        <ThemedView
          lightColor="#e8ddff"
          darkColor="#6750A4"
          style={styles.currencyBadge}
        >
          <ThemedText
            lightColor="#21005D"
            darkColor="#ffffff"
            style={styles.currencyText}
          >
            INR CURRENCY
          </ThemedText>
        </ThemedView>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "rgba(232, 230, 235, 0.5)", // surface-container-high/50
    borderRadius: 16,
    padding: 24,
    margin: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  alignEnd: {
    alignItems: "flex-end",
    marginBottom: 0,
    paddingTop: 16,
  },
  label: {
    fontSize: 16,
    // color: "#49454F", // on-surface-variant
  },
  value: {
    fontSize: 16,
    fontWeight: "700",
    // color: "#1C1B1F", // on-surface
  },
  infoWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: 8,
  },
  couponButton: {
    fontSize: 12,
    fontWeight: "bold",
    // color: "#6750A4", // primary
    letterSpacing: 1.5,
    marginTop: 2,
  },
  errorText: {
    color: "#B3261E", // error
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: "rgba(121, 116, 126, 0.2)", // outline-variant/20
    marginVertical: 4,
  },
  grandTotalLabel: {
    fontSize: 14,
    fontWeight: "bold",
    // color: "#49454F",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  totalAmount: {
    fontSize: 30,
    fontWeight: "900",
    // color: "#1C1B1F",
    letterSpacing: -0.5,
  },
  currencyBadge: {
    // backgroundColor: "#e8ddff", // tertiary-container
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
  },
  currencyText: {
    fontSize: 12,
    fontWeight: "bold",
    // color: "#21005D", // on-tertiary-container
  },
});

export default BillSummary;
