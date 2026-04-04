import React from "react";
import { Button as NativeButton, View } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  color?: string;
  accessibilityLabel?: string;
};

const Button = ({
  title,
  onPress,
  color = "blue",
  accessibilityLabel = "",
}: Props) => {
  return (
    <View>
      <NativeButton
        title={title}
        onPress={onPress}
        color={color}
        accessibilityLabel={accessibilityLabel}
      />
    </View>
  );
};

export default Button;
