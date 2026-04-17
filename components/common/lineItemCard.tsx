import { SalesBillItem } from "@/services/saleorder";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
import { IconSymbol } from "../ui/icon-symbol";

interface LineItemCardProps {
  item: SalesBillItem;
  totalPrice?: string;
  onIncrease?: () => void;
  onDecrease?: () => void;
  onDelete?: () => void;
}

const LineItemCard = (props: LineItemCardProps) => {
  const {
    item = {
      name: "",
      description: "",
      quantity: 0,
      soldAtRate: 0,
    },
    onIncrease = () => {},
    onDecrease = () => {},
    onDelete = () => {},
  } = props;
  return (
    <ThemedView
      lightColor="#ffffff"
      darkColor="#0f001f"
      style={styles.cardContainer}
    >
      {/* Left Column */}
      <View style={styles.leftSection}>
        <ThemedText
          lightColor="#1D1B20"
          darkColor="#ffffff"
          style={styles.title}
        >
          {item.name}
        </ThemedText>
        <ThemedText lightColor="#49454F" darkColor="#ffffff" style={styles.sku}>
          SKU: {item.description}
        </ThemedText>

        <View style={styles.controlsRow}>
          {/* Quantity Selector */}
          <ThemedView
            lightColor="#EDF1F5"
            darkColor="#1D1B20"
            style={styles.quantityBox}
          >
            <TouchableOpacity onPress={onDecrease} activeOpacity={0.6}>
              <IconSymbol
                type="MaterialIcons"
                name="remove"
                size={16}
                lightColor="#49454F"
              />
            </TouchableOpacity>

            <ThemedText
              lightColor="#1D1B20"
              darkColor="#ffffff"
              style={styles.quantityText}
            >
              {item.quantity}
            </ThemedText>

            <TouchableOpacity onPress={onIncrease} activeOpacity={0.6}>
              <IconSymbol
                type="MaterialIcons"
                name="add"
                size={16}
                lightColor="#49454F"
              />
            </TouchableOpacity>
          </ThemedView>

          {/* Unit Price */}
          <ThemedText
            lightColor="#49454F"
            darkColor="#ffffff"
            style={styles.unitPriceText}
          >
            &#8377;{item.soldAtRate}
          </ThemedText>
        </View>
      </View>

      {/* Right Column */}
      <View style={styles.rightSection}>
        <ThemedText
          lightColor="#2B418E"
          darkColor="#ffffff"
          style={styles.totalPrice}
        >
          &#8377;{item.soldAtRate * item.quantity}
        </ThemedText>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={onDelete}
          activeOpacity={0.4}
        >
          <IconSymbol
            type="Ionicons"
            name="trash-outline"
            size={22}
            lightColor="#B3261E"
          />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 16, // p-4
    borderRadius: 12, // rounded-xl
    flexDirection: "row", // flex
    justifyContent: "space-between", // justify-between
    alignItems: "flex-start", // items-start

    // Shadow snippet integrated here
    shadowColor: "rgb(42, 52, 57)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 2,
    marginBottom: 12,
  },
  leftSection: {
    flex: 1,
    paddingRight: 16,
  },
  title: {
    fontSize: 16, // text-sm
    fontWeight: "bold", // font-bold
    marginBottom: 4,
  },
  sku: {
    fontSize: 14, // text-xs
    textTransform: "uppercase", // uppercase
    letterSpacing: 0.5, // tracking-wider
  },
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8, // pt-2 mapping
  },
  quantityBox: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8, // rounded-lg
    paddingHorizontal: 8, // px-2
    paddingVertical: 4, // py-1
    marginRight: 12, // gap-3 equivalent
  },
  quantityText: {
    fontSize: 14, // text-xs
    fontWeight: "bold", // font-bold
    marginHorizontal: 12, // gap-3 equivalent
  },
  unitPriceText: {
    fontSize: 13, // text-[10px]
    fontWeight: "500", // font-medium
  },
  rightSection: {
    alignItems: "flex-end", // text-right equivalent for flex
  },
  totalPrice: {
    fontSize: 16, // text-sm
    fontWeight: "800", // font-extrabold
  },
  deleteButton: {
    marginTop: 16, // mt-4
    opacity: 1, // opacity-40
  },
});

export default LineItemCard;
