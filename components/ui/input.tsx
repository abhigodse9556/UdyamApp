import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

type Props = TextInputProps & {
  label?: string;
  required?: boolean;
  error?: string;
  touched?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
};

const Input = ({
  label,
  required,
  error,
  touched,
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  editable = true,
  ...props
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  const showError = touched && !!error;

  return (
    <View style={styles.container}>
      {label && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.label}>{label}</Text>
          {required && <Text style={{ color: "red" }}> *</Text>}
        </View>
      )}

      <View
        style={[
          styles.inputContainer,
          isFocused && styles.focused,
          showError && styles.errorBorder,
          editable
            ? {}
            : { backgroundColor: "#dfdfdf", borderColor: "#c3c3c3" },
        ]}
      >
        {leftIcon}

        <TextInput
          {...props}
          style={[styles.input, style]}
          placeholderTextColor="#999"
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          editable={editable}
        />

        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>

      {showError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 2,
    marginLeft: 4,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1a1a1a",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  focused: {
    borderColor: "#007AFF",
  },
  errorBorder: {
    borderColor: "red",
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: "#000",
  },
  icon: {
    marginHorizontal: 5,
    color: "#555",
  },
  errorText: {
    marginTop: 4,
    color: "red",
    fontSize: 12,
  },
});
