import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { validateEmail, validatePhone } from "@/utils/valitators";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  Customer,
  CUSTOMER_TYPE_OPTIONS,
  getAllCustomers,
  getCustomerById,
  saveCustomer,
  updateCustomer,
} from "../../services/customer";
import ExpoCheckBox from "../ui/expoCheckbox";
import { IconSymbol } from "../ui/icon-symbol";
import SearchSelect from "../ui/SearchSelect";
import Select from "../ui/select";

type CustomerFormProps = {
  isEditMode?: boolean;
  customerData?: Customer;
  onClose: (updated?: boolean) => void;
};

const CustomerForm = ({
  customerData,
  isEditMode,
  onClose,
}: CustomerFormProps) => {
  const [formData, setFormData] = useState<Customer>({} as Customer);
  const [errorState, setErrorState] = useState<
    Partial<Record<keyof Customer, string>>
  >({});
  const [touchedFields, setTouchedFields] = useState<
    Partial<Record<keyof Customer, boolean>>
  >({});
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);
  const [referralSourceName, setReferralSourceName] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (
    field: keyof Customer,
    value: string | number | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleOnBlur = (field: keyof Customer) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
    validateForm();
  };

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof Customer, string>> = {};
    if (!formData.name) {
      errors.name = "Name is required";
    }
    if (formData.email !== undefined) {
      const emailError = validateEmail(formData.email);
      if (emailError) {
        errors.email = emailError;
      }
    }
    if (
      formData.phone ||
      formData.phone === undefined ||
      formData.phone === ""
    ) {
      const phoneError = validatePhone(formData.phone);
      if (phoneError) {
        errors.phone = phoneError;
      }
    }
    if (formData.customerDiscount !== undefined) {
      if (
        isNaN(Number(formData.customerDiscount)) ||
        Number(formData.customerDiscount) < 0 ||
        Number(formData.customerDiscount) > 100
      ) {
        errors.customerDiscount =
          "Customer Discount must be a number between 0 and 100";
      }
    }
    setErrorState(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSave = async (isEditMode?: boolean) => {
    if (!isEditMode) {
      await saveCustomer(formData as Customer);
    } else {
      await updateCustomer(formData as Customer);
    }
    onClose(true);
  };

  const getReferralCustomer = async (customerId: string) => {
    const data = await getCustomerById(customerId);
    if (data) {
      setReferralSourceName(data.name);
    } else {
      setReferralSourceName(customerId);
    }
  };

  useEffect(() => {
    if (isEditMode && customerData) {
      setFormData({ ...customerData } as Customer);
      if (customerData.referralSource) {
        getReferralCustomer(customerData.referralSource);
      }
    }
  }, [isEditMode, customerData]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <View style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              {isEditMode ? "Edit Customer" : "Add New Customer"}
            </Text>
          </View>
          <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              flexGrow: 1,
            }}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid
            extraScrollHeight={20}
            keyboardOpeningTime={0}
            nestedScrollEnabled={true}
          >
            <View style={styles.formContainer}>
              <Input
                label="Name"
                value={formData.name}
                onChangeText={(text) => {
                  handleInputChange("name", text);
                }}
                onBlur={() => handleOnBlur("name")}
                touched={touchedFields.name}
                autoCapitalize="words"
                required
                error={errorState.name}
              />
              <Input
                label="Email"
                value={formData.email}
                onChangeText={(text) => {
                  handleInputChange("email", text);
                }}
                onBlur={() => handleOnBlur("email")}
                touched={touchedFields.email}
                autoCapitalize="none"
                error={errorState.email}
              />
              <Input
                label="Phone"
                value={formData.phone}
                onChangeText={(text) => {
                  text = text.toString().replace(/[^0-9]/g, "");
                  handleInputChange("phone", text);
                }}
                onBlur={() => handleOnBlur("phone")}
                touched={touchedFields.phone}
                keyboardType="number-pad"
                maxLength={10}
                required
                error={errorState.phone}
              />
              <Input
                label="Address"
                value={formData.address}
                onChangeText={(text) => handleInputChange("address", text)}
              />
              <ExpoCheckBox
                label={
                  isEditMode
                    ? "View Additional Details"
                    : "Fill Additional Details"
                }
                value={showAdditionalDetails}
                onValueChange={setShowAdditionalDetails}
              />
              {showAdditionalDetails && (
                <>
                  <Input
                    label="Customer Discount (%)"
                    value={formData?.customerDiscount?.toString() || ""}
                    onChangeText={(text) => {
                      text = text.toString().replace(/[^0-9]/g, "");
                      handleInputChange("customerDiscount", text);
                    }}
                    onBlur={() => handleOnBlur("customerDiscount")}
                    touched={touchedFields.customerDiscount}
                    error={errorState.customerDiscount}
                    keyboardType="number-pad"
                  />
                  <Select
                    label="Customer Type"
                    selectedValue={formData.customerType || "walkin"}
                    onValueChange={(itemValue) => {
                      handleInputChange("customerType", itemValue);
                    }}
                    items={CUSTOMER_TYPE_OPTIONS}
                  />
                  {formData.customerType === "referral" && (
                    <Input
                      label="Referred By"
                      value={referralSourceName}
                      editable={false}
                      rightIcon={
                        referralSourceName === "" ? (
                          <IconSymbol size={24} name="add-user" type="Entypo" />
                        ) : (
                          <IconSymbol
                            size={24}
                            name="user-edit"
                            type="FontAwesome5"
                          />
                        )
                      }
                      onRightIconPress={() => setShowModal(true)}
                    />
                  )}
                </>
              )}
            </View>
          </KeyboardAwareScrollView>
          <View style={styles.btnContainer}>
            <Button
              title={isEditMode ? "Update Changes" : "Save Customer"}
              onPress={() => handleSave(isEditMode)}
              disabled={!validateForm()}
              color="blue"
            />
            <Button
              title="Cancel"
              onPress={() => {
                setFormData({} as Customer);
                setShowAdditionalDetails(false);
                setReferralSourceName("");
                setTouchedFields({});
                setErrorState({});
                onClose();
              }}
              color="black"
            />
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
              setShowModal(false);
            }}
          >
            <View style={styles.modalView}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalText}>Referral Source</Text>
                <SearchSelect
                  label="Referred By"
                  placeholder="Search customer..."
                  allowCustomInput
                  value={formData.referralSource}
                  initialLabel={referralSourceName}
                  onSearch={async (query) => {
                    const data = await getAllCustomers({
                      AND: [
                        { field: "deleted", operator: "eq", value: false },
                        { field: "name", operator: "includes", value: query },
                      ],
                    });

                    return (
                      data?.map((c) => ({
                        label: c.name,
                        value: c.id,
                      })) || []
                    );
                  }}
                  onSelect={(item, text) => {
                    if (item) {
                      handleInputChange("referralSource", item.value);
                    } else {
                      handleInputChange("referralSource", text);
                    }
                  }}
                />
                <Button
                  title="OK"
                  onPress={() => {
                    getReferralCustomer(formData.referralSource || "");
                    setShowModal(false);
                  }}
                />
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  mainContainer: {
    flexGrow: 1,
    flexDirection: "column",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  formContainer: {
    flex: 1,
    gap: 0,
    padding: 15,
  },
  btnContainer: {
    gap: 10,
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  modalView: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 300,
  },
  modalText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default CustomerForm;
