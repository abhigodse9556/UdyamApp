import { Checkbox, CheckboxProps } from "expo-checkbox";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../themed-text";

type PropsType = CheckboxProps & {
  label: string;
};

const ExpoCheckBox = (props: PropsType) => {
  const { value, onValueChange, color, label } = props;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onValueChange && onValueChange(!value)}
      activeOpacity={0.7}
    >
      <View style={styles.section}>
        <Checkbox
          style={styles.checkbox}
          value={value}
          onValueChange={onValueChange}
          color={color}
        />
        <ThemedText
          type="defaultSemiBold"
          lightColor="#000"
          darkColor="#fff"
          style={styles.paragraph}
        >
          {label}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 0,
    marginBottom: 16,
  },
  section: { flexDirection: "row", alignItems: "center" },
  paragraph: {},
  checkbox: { marginRight: 8 },
});

export default ExpoCheckBox;
