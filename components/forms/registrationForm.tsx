import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { saveShopOwner, updateShopOwner } from "../../services/shopOwner";

type registrationData = {
  registeredData?: {
    id: string;
    name: string;
    shopName: string;
    phone: string;
    address?: string;
  };
  isEditMode?: boolean;
  onClose?: (updated: boolean) => void;
};

const RegistrationForm = ({
  registeredData,
  isEditMode,
  onClose,
}: registrationData) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: registeredData?.name || "",
    shopName: registeredData?.shopName || "",
    phone: registeredData?.phone || "",
    address: registeredData?.address || "",
  });
  const [errorState, setErrorState] = useState({
    name: "",
    shopName: "",
    phone: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    shopName: false,
    phone: false,
  });

  const validateField = (field: string, value: string) => {
    let error = "";

    if (field === "name" && value.trim() === "") {
      error = "Name is required";
    }

    if (field === "shopName" && value.trim() === "") {
      error = "Shop Name is required";
    }

    if (field === "phone") {
      if (value.trim() === "") {
        error = "Phone is required";
      } else if (value.length !== 10) {
        error = "Phone number must be 10 digits";
      }
    }

    setErrorState((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const isFormValid = () => {
    return !errorState.name && !errorState.shopName && !errorState.phone;
  };

  const generateId = () => {
    const shopNamePart = formData.shopName
      .replace(/\s+/g, "")
      .toUpperCase()
      .slice(0, 1);
    const namePart = formData.name
      .replace(/\s+/g, "")
      .toUpperCase()
      .slice(0, 1);
    const phonePart = formData.phone.slice(8, 10);
    return `UA-${shopNamePart}${namePart}${phonePart}`;
  };
  const handleRegister = async (isEditMode?: boolean) => {
    if (!isFormValid()) {
      return;
    }
    if (!isEditMode) {
      const newOwner = {
        id: generateId(),
        name: formData.name,
        shopName: formData.shopName,
        phone: formData.phone,
        address: formData.address,
      };

      await saveShopOwner(newOwner);

      router.replace("/(tabs)");
    } else {
      await updateShopOwner({
        id: registeredData?.id,
        name: formData.name,
        shopName: formData.shopName,
        phone: formData.phone,
        address: formData.address,
      });

      onClose?.(true);
    }
  };

  const handlePhoneChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    setFormData((prev) => ({ ...prev, phone: numericValue }));
  };
  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
      }}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid
      extraScrollHeight={20}
      keyboardOpeningTime={0}
    >
      <View style={styles.formContainer}>
        <Input
          label="Name"
          value={formData.name}
          onChangeText={(text) => {
            setFormData((prev) => ({ ...prev, name: text }));
            validateField("name", text);
          }}
          onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
          touched={touched.name}
          autoCapitalize="words"
          required
          error={errorState.name}
        />
        <Input
          label="Shop Name"
          value={formData.shopName}
          onChangeText={(text) => {
            setFormData((prev) => ({ ...prev, shopName: text }));
            validateField("shopName", text);
          }}
          onBlur={() => setTouched((prev) => ({ ...prev, shopName: true }))}
          touched={touched.shopName}
          autoCapitalize="words"
          required
          error={errorState.shopName}
        />
        <Input
          label="Phone"
          value={formData.phone}
          onChangeText={(text) => {
            handlePhoneChange(text);
            validateField("phone", text);
          }}
          onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
          touched={touched.phone}
          keyboardType="number-pad"
          maxLength={10}
          required
          error={errorState.phone}
        />
        <Input
          label="Address"
          value={formData.address}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, address: text }))
          }
        />
      </View>
      <View style={styles.btnContainer}>
        <Button
          title={isEditMode ? "Save Changes" : "Register"}
          onPress={() => handleRegister(isEditMode)}
          color="blue"
        />
        <Button
          title="Cancel"
          onPress={() => {
            if (isEditMode) {
              onClose?.(false);
            } else {
              setFormData({
                name: "",
                shopName: "",
                phone: "",
                address: "",
              });
            }
          }}
          color="black"
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginBottom: 20,
    gap: 0,
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
  },
  btnContainer: {
    gap: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default RegistrationForm;
