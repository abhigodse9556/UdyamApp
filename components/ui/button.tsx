import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

type ButtonProps = {
  title: string;
  onPress: () => void;
  color?: string;
  disabled?: boolean;
};

const Button = (props: ButtonProps) => {
  const { title, onPress, color = "#2196F3", disabled = false } = props;
  return (
    <ThemedView style={styles.container}>
      {/* Custom TouchableOpacity Button */}
      <TouchableOpacity
        style={[
          styles.customButton,
          { backgroundColor: color, opacity: disabled ? 0.5 : 1 },
        ]}
        activeOpacity={0.7}
        onPress={onPress}
        disabled={disabled}
      >
        <ThemedText style={styles.customButtonText}>{title}</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    marginTop: 10,
  },
  customButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  customButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Button;
