import { Customer, getCustomersByName } from "@/services/customer";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
import Button from "../ui/button";
import { IconSymbol } from "../ui/icon-symbol";
import ModalDrawer from "../ui/modalDrawer";
import SearchList from "./searchList";

type ReferralModalProps = {
  showModal: boolean;
  onClose: (referral?: Customer) => void;
};

const ReferralModal = (props: ReferralModalProps) => {
  const { showModal, onClose } = props;
  const handleReferralSelect = async (referral: Customer) => {
    onClose(referral);
  };
  return (
    <ModalDrawer
      isVisible={showModal}
      onClose={() => {
        // setShowModal(false);
      }}
    >
      <View style={styles.modalView}>
        <ThemedView
          lightColor="#fff"
          darkColor="#353636"
          style={styles.modalContainer}
        >
          <ThemedText style={styles.modalText}>Referral Source</ThemedText>
          <SearchList
            label="Referral Name"
            placeholder="Search referral..."
            onSearch={getCustomersByName}
            getLabel={(c) =>
              `${c.name} - ${c.phone} ${c.address ? `- ${c.address}` : ""}`
            }
            onSelect={(item) => {
              handleReferralSelect(item);
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
              //   setShowCustForm(true);
            }}
          />
          <Button
            title="OK"
            onPress={() => {
              //   getReferralCustomer(formData.referralSource || "");
              //   setShowModal(false);
            }}
          />
        </ThemedView>
      </View>
    </ModalDrawer>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "90%",
    borderRadius: 10,
    padding: 20,
    gap: 20,
  },
  modalText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default ReferralModal;
