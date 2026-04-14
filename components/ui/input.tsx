import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

type Props = TextInputProps & {
  label?: string;
  required?: boolean;
  error?: string;
  touched?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  outerContainerStyle?: object;
  inputRef?: React.RefObject<TextInput | null>;
};

const Input = ({
  inputRef,
  label,
  required,
  error,
  touched,
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  editable = true,
  outerContainerStyle = {},
  ...props
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  const showError = touched && !!error;

  return (
    <ThemedView style={[styles.container, outerContainerStyle]}>
      {label && (
        <ThemedView
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "transparent",
          }}
        >
          <ThemedText
            type="defaultSemiBold"
            lightColor="#566166"
            darkColor="#fff"
            style={styles.label}
          >
            {label}
          </ThemedText>
          {required && <ThemedText style={{ color: "red" }}> *</ThemedText>}
        </ThemedView>
      )}

      <ThemedView
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
          ref={inputRef}
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
      </ThemedView>

      {showError && <ThemedText style={styles.errorText}>{error}</ThemedText>}
    </ThemedView>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
    backgroundColor: "transparent",
  },
  label: {
    marginBottom: 2,
    marginLeft: 4,
    fontSize: 14,
    fontWeight: 500,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 0,
    borderBottomWidth: 2,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: "#a9b4b9",
    paddingRight: 10,
    backgroundColor: "#fff",
  },
  focused: {
    borderBottomWidth: 1,
    borderColor: "#3b82f680",
  },
  errorBorder: {
    borderColor: "red",
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 18,
    color: "#2a3439",
    fontFamily: "Inter",
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
