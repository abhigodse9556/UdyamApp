import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

type ButtonProps = {
  title: string;
  onPress: () => void;
  lightColor?: string;
  darkColor?: string;
  disabled?: boolean;
  style?: object;
  buttonContainerStyle?: object;
  titleStyle?: object;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
};

const Button = (props: ButtonProps) => {
  const {
    title,
    onPress,
    lightColor = "#2196F3",
    darkColor = "#86c8ff",
    disabled = false,
    style,
    titleStyle,
    rightIcon,
    leftIcon,
    buttonContainerStyle,
  } = props;
  return (
    <ThemedView
      lightColor={lightColor}
      darkColor={darkColor}
      style={[styles.container, buttonContainerStyle]}
    >
      {/* Custom TouchableOpacity Button */}
      <TouchableOpacity
        style={[
          styles.customButton,
          {
            opacity: disabled ? 0.5 : 1,
          },
          style,
        ]}
        activeOpacity={0.7}
        onPress={onPress}
        disabled={disabled}
      >
        {leftIcon && <>{leftIcon}</>}
        <ThemedText
          lightColor="#fff"
          darkColor="#003063"
          style={[styles.customButtonText, titleStyle]}
        >
          {title}
        </ThemedText>
        {rightIcon && <>{rightIcon}</>}
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 50,
    borderRadius: 10,
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    margin: 0,
  },
  customButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
    borderRadius: 10,
  },
  customButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Button;
