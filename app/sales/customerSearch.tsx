import SearchList from "@/components/common/searchList";
import { ThemedView } from "@/components/themed-view";
import Button from "@/components/ui/button";
import { getCustomersByName } from "@/services/customer";
import React, { useContext } from "react";
import { View } from "react-native";
import { SalesContext } from "../context/salesContext";

type CustomerSearchProps = {
  setShowCustSearchModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const CustomerSearch = (props: CustomerSearchProps) => {
  const { setShowCustSearchModal } = props;
  const salesContextValue = useContext(SalesContext);
  if (!salesContextValue) {
    throw new Error("SalesContext not found. Wrap with SalesProvider.");
  }
  const { setCustomer } = salesContextValue;
  return (
    <ThemedView
      lightColor="#f5f8f6"
      darkColor="#000000"
      style={{
        height: "90%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
    >
      <View
        style={{
          padding: 10,
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <SearchList
          label="Customer Name"
          placeholder="Search customer..."
          onSearch={getCustomersByName}
          getLabel={(c) =>
            `${c.name} - ${c.phone} ${c.address ? `- ${c.address}` : ""}`
          }
          onSelect={(item) => {
            setCustomer(item);
            setShowCustSearchModal(false);
          }}
        />
        <Button title="Close" onPress={() => setShowCustSearchModal(false)} />
      </View>
    </ThemedView>
  );
};

export default CustomerSearch;
