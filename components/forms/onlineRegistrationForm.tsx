import { graphqlRequest } from "@/services/graphql/client";
import { CREATE_USER, User } from "@/services/graphql/user";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PaperButton from "../ui/paperButton";
import PaperInput from "../ui/paperInput";
import StoreForm from "./storeForm";

type registrationData = {
  registeredData?: {
    id: string;
    name: string;
    email: string;
    mobile: string;
    password?: string;
  };
  isEditMode?: boolean;
  onClose?: (updated: boolean) => void;
};

const OnlineRegistrationForm = ({
  registeredData,
  isEditMode,
  onClose,
}: registrationData) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: registeredData?.name || "",
    email: registeredData?.email || "",
    mobile: registeredData?.mobile || "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorState, setErrorState] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [showStoreForm, setShowStoreForm] = useState(false);

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

    if (field === "password") {
      if (value.trim() === "") {
        error = "Password is required";
      } else if (value.length < 6) {
        error = "Password must be at least 6 characters";
      }
    }

    if (field === "confirmPassword") {
      if (value.trim() === "") {
        error = "Confirm Password is required";
      } else if (value !== formData.password) {
        error = "Passwords do not match";
      }
    }

    setErrorState((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const isFormValid = () => {
    return (
      !errorState.name &&
      !errorState.email &&
      !errorState.mobile &&
      !errorState.password &&
      !errorState.confirmPassword
    );
  };

  const handleCreateUser = async (userdata?: User) => {
    const response = await graphqlRequest(CREATE_USER, {
      ...userdata,
    });

    return response;
  };

  const handleRegister = async (isEditMode?: boolean) => {
    if (!isFormValid()) {
      return;
    }
    if (!isEditMode) {
      const newUser = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile || "9090909090",
        password: formData.password,
      };

      await handleCreateUser(newUser);

      router.replace("/login");
    } else {
      // await updateShopOwner({
      //   id: registeredData?.id,
      //   name: formData.name,
      //   email: formData.email,
      //   mobile: formData.mobile,
      // });

      onClose?.(true);
    }
  };

  const handlePhoneChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    setFormData((prev) => ({ ...prev, mobile: numericValue }));
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
      {!showStoreForm ? (
        <>
          <View style={styles.formContainer}>
            <PaperInput
              label="Your Name"
              value={formData.name}
              onChangeText={(text) => {
                setFormData((prev) => ({ ...prev, name: text }));
                validateField("name", text);
              }}
              autoCapitalize="words"
              required
              error={errorState.name ? true : false}
            />
            <PaperInput
              label="Email"
              value={formData.email}
              onChangeText={(text) => {
                setFormData((prev) => ({ ...prev, email: text }));
                validateField("email", text);
              }}
              autoCapitalize="words"
              required
              error={errorState.email ? true : false}
              keyboardType="email-address"
            />
            <PaperInput
              label="Contact Number"
              value={formData.mobile}
              onChangeText={(text) => {
                handlePhoneChange(text);
                validateField("mobile", text);
              }}
              keyboardType="number-pad"
              maxLength={10}
              required
              error={errorState.mobile ? true : false}
            />
            <PaperInput
              label="Password"
              value={formData.password}
              onChangeText={(text) => {
                setFormData((prev) => ({ ...prev, password: text }));
                validateField("password", text);
              }}
              passwordField={true}
              error={errorState.password ? true : false}
              required
            />
            <PaperInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                validateField("confirmPassword", text);
              }}
              passwordField={true}
              error={errorState.confirmPassword ? true : false}
              required
            />
          </View>
          <View style={styles.btnContainer}>
            <PaperButton
              title="Cancel"
              mode="outlined"
              onPress={() => {
                if (isEditMode) {
                  onClose?.(false);
                } else {
                  setFormData({
                    name: "",
                    email: "",
                    mobile: "",
                    password: "",
                  });
                  onClose?.(false);
                }
              }}
            />
            <PaperButton
              title={isEditMode ? "Save Changes" : "Register"}
              mode="contained"
              onPress={() => handleRegister(isEditMode)}
            />
            <PaperButton
              title="Next"
              mode="contained-tonal"
              onPress={() => setShowStoreForm(true)}
            />
          </View>
        </>
      ) : (
        <StoreForm userId="USER0001" />
      )}
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

export default OnlineRegistrationForm;
