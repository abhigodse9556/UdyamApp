import SearchList from "@/components/common/searchList";
import CustomerForm from "@/components/forms/customerForm";
import { ThemedView } from "@/components/themed-view";
import Button from "@/components/ui/button";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Customer, getCustomersByName } from "@/services/customer";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { SalesContext } from "../context/salesContext";

type CustomerModalProps = {
  setShowCustomerModal: React.Dispatch<React.SetStateAction<boolean>>;
  isEditCustomer?: boolean;
};
const CustomerModal = (props: CustomerModalProps) => {
  const { setShowCustomerModal, isEditCustomer } = props;
  const salesContextValue = useContext(SalesContext);
  if (!salesContextValue) {
    throw new Error("SalesContext not found. Wrap with SalesProvider.");
  }
  const { customer, setCustomer } = salesContextValue;
  const [showCustForm, setShowCustForm] = useState(false);
  const handleClose = useCallback(
    (updated?: boolean, customerData?: Customer) => {
      if (updated && customerData) {
        setCustomer(customerData);
        setShowCustomerModal(false);
      }
      if (isEditCustomer) {
        setShowCustomerModal(false);
        setShowCustForm(false);
      }
      setShowCustForm(false);
    },
    [setShowCustForm, setShowCustomerModal, setCustomer, isEditCustomer],
  );

  useEffect(() => {
    if (isEditCustomer) {
      setShowCustForm(true);
    }
  }, [isEditCustomer]);

  return (
    <ThemedView
      lightColor="#f5f8f6"
      darkColor="#000000"
      style={{
        height: "75%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
    >
      {!showCustForm ? (
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
              setShowCustomerModal(false);
            }}
            rightIcon={
              <IconSymbol
                name="add-user"
                type="Entypo"
                size={20}
                lightColor="#566166"
              />
            }
            onRightIconPress={() => {
              setShowCustForm(true);
            }}
          />
          <Button title="Close" onPress={() => setShowCustomerModal(false)} />
        </View>
      ) : (
        <View style={{ paddingTop: 20, height: "100%" }}>
          <CustomerForm
            customerData={customer}
            isEditMode={isEditCustomer}
            onClose={(updated, customerData) => {
              handleClose(updated, customerData);
            }}
          />
        </View>
      )}
    </ThemedView>
  );
};

export default CustomerModal;
