import { Picker } from "@react-native-picker/picker";
import { StyleSheet, Text, View } from "react-native";

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
      {label && <Text style={styles.label}>{label}</Text>}

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
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
