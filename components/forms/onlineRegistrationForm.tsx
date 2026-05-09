import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { graphqlRequest } from "@/services/graphql/client";
import { CREATE_USER, User } from "@/services/graphql/user";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
  const [errorState, setErrorState] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    mobile: false,
    password: false,
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

    if (field === "password") {
      if (value.trim() === "") {
        error = "Password is required";
      } else if (value.length < 6) {
        error = "Password must be at least 6 characters";
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
      !errorState.password
    );
  };

  const handleCreateUser = async (userdata?: User) => {
    const response = await graphqlRequest(CREATE_USER, {
      ...userdata,
    });

    console.log(JSON.stringify(response, null, 0));

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
          label="Your Name"
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
          label="Email"
          value={formData.email}
          onChangeText={(text) => {
            setFormData((prev) => ({ ...prev, email: text }));
            validateField("email", text);
          }}
          onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
          touched={touched.email}
          autoCapitalize="words"
          required
          error={errorState.email}
        />
        <Input
          label="Contact Number"
          value={formData.mobile}
          onChangeText={(text) => {
            handlePhoneChange(text);
            validateField("mobile", text);
          }}
          onBlur={() => setTouched((prev) => ({ ...prev, mobile: true }))}
          touched={touched.mobile}
          keyboardType="number-pad"
          maxLength={10}
          required
          error={errorState.mobile}
        />
        <Input
          label="Password"
          value={formData.password}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, password: text }))
          }
          secureTextEntry
          error={errorState.password}
          required
        />
      </View>
      <View style={styles.btnContainer}>
        <Button
          title={isEditMode ? "Save Changes" : "Register"}
          onPress={() => handleRegister(isEditMode)}
          lightColor="blue"
          darkColor="blue"
        />
        <Button
          title="Cancel"
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
          lightColor="gray"
          darkColor="gray"
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

export default OnlineRegistrationForm;
