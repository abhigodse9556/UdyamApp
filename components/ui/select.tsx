import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";

type selectPropTypes = {
  label?: string;
  selectedValue: string;
  onValueChange: (itemValue: string, itemIndex: number) => void;
  items: { label: string; value: string }[];
};

const Select = (props: selectPropTypes) => {
  const { label, selectedValue, onValueChange, items } = props;

  return (
    <View style={{ marginBottom: 16 }}>
      {label && (
        <ThemedText
          type="defaultSemiBold"
          lightColor="#000"
          darkColor="#fff"
          style={styles.label}
        >
          {label}
        </ThemedText>
      )}

      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={{ backgroundColor: "#fff" }}
        mode="dropdown" //dialog
      >
        {items.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  label: {
    marginBottom: 2,
    marginLeft: 4,
  },
});
