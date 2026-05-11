import React, { useState } from "react";
import { TextInput, TextInputProps } from "react-native-paper";

type PaperInputProps = {
  passwordField?: boolean;
  right?: React.ReactNode;
  left?: React.ReactNode;
  onRightIconPress?: () => void;
  required?: boolean;
};
const PaperInput = (props: PaperInputProps & TextInputProps) => {
  const {
    label,
    mode = "outlined", // "flat"
    passwordField = false,
    right,
    left,
    onRightIconPress = () => {},
    required = false,
    ...rest
  } = props;
  const [passwordVisible, setPasswordVisible] = useState(true);

  return (
    <TextInput
      {...rest}
      label={required ? `${label} *` : label}
      mode={mode}
      secureTextEntry={passwordField ? passwordVisible : false}
      right={
        passwordField ? (
          <TextInput.Icon
            icon={passwordVisible ? "eye-off" : "eye"}
            onPress={() => setPasswordVisible(!passwordVisible)}
          />
        ) : (
          <TextInput.Icon
            icon={(props) => right}
            onPress={() => onRightIconPress?.()}
          />
        )
      }
      left={
        left && !right && !passwordField ? (
          <TextInput.Icon icon={(props) => left} />
        ) : null
      }
    />
  );
};

export default PaperInput;
