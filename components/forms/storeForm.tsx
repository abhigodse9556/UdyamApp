import React from "react";
import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import PaperInput from "../ui/paperInput";

type StoreFormProps = {
  userId?: string;
};

const StoreForm = (props: StoreFormProps) => {
  const { userId } = props;
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ gap: 10 }}>
      {userId && <Text>User ID: {userId}</Text>}
      <PaperInput label="Store Name" placeholder="Enter your store name" />
      <PaperInput
        label="Store Display Name"
        placeholder="Enter your store display name"
      />
      <Text>Contact Details</Text>
      <PaperInput
        label="Contact Person Name"
        placeholder="Enter your contact person name"
      />
      <PaperInput
        label="Contact Email"
        placeholder="Enter your contact person email"
      />
      <View
        style={{
          flexDirection: "row",
          //   justifyContent: "space-between",
          gap: 10,
        }}
      >
        <PaperInput label="Contact Phone" style={{ flex: 1 }} />
        <PaperInput label="Business Whatsapp" style={{ flex: 1 }} />
      </View>
      <Text>Store Address</Text>
      <PaperInput label="Address Line 1" />
      <PaperInput label="Address Line 2" />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <PaperInput label="City" style={{ flex: 1 }} />
        <PaperInput label="State" style={{ flex: 1 }} />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <PaperInput
          label="Country"
          value="India"
          editable={false}
          style={{ flex: 1 }}
        />
        <PaperInput
          label="Pincode"
          style={{ flex: 1 }}
          maxLength={6}
          keyboardType="number-pad"
        />
      </View>

      <PaperInput label="GST Number" />
      <PaperInput label="Business License" />
    </ScrollView>
  );
};

export default StoreForm;
