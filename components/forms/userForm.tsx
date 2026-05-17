import { graphqlRequest } from "@/services/graphql/client";
import {
  CHECK_EMAIL_AVAILABILITY,
  CHECK_MOBILE_AVAILABILITY,
  CHECK_USERNAME_AVAILABILITY,
  CheckEmailAvailabilityResponse,
  CheckMobileAvailabilityResponse,
  CheckUserNameAvailabilityResponse,
  CREATE_USER,
  User,
} from "@/services/graphql/user";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Checkbox } from "react-native-paper";
import PaperButton from "../ui/paperButton";
import PaperInput from "../ui/paperInput";

type registrationData = {
  registeredData?: {
    id: string;
    name: string;
    email: string;
    userName: string;
    mobile: string;
    password?: string;
  };
  isEditMode?: boolean;
  onClose?: (updated: boolean) => void;
};

const UserForm = ({
  registeredData,
  isEditMode,
  onClose,
}: registrationData) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: registeredData?.name || "",
    email: registeredData?.email || "",
    userName: registeredData?.userName || "",
    mobile: registeredData?.mobile || "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorState, setErrorState] = useState({
    name: "",
    email: "",
    userName: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [setCustomUsername, setSetCustomUsername] = useState(false);

  const userNameRef = useRef<any>(null);
  const emailRef = useRef<any>(null);
  const mobileRef = useRef<any>(null);

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

    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setErrorState((prev) => ({ ...prev, email: "Invalid email format" }));
      } else {
        setErrorState((prev) => ({ ...prev, email: "" }));
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
        userName: formData.userName,
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

  const isUserNameAvailable = useCallback(async () => {
    const response = await graphqlRequest<CheckUserNameAvailabilityResponse>(
      CHECK_USERNAME_AVAILABILITY,
      {
        userName: formData.userName,
      },
    );
    if (response.isUserNameAvailable) {
      setErrorState((prev) => ({ ...prev, userName: "" }));
      return true;
    } else {
      setErrorState((prev) => ({
        ...prev,
        userName: "Username is already taken",
      }));
      if (userNameRef.current) {
        userNameRef.current.focus();
      }
      return false;
    }
  }, [formData.userName]);

  const isEmailAvailable = useCallback(async () => {
    const response = await graphqlRequest<CheckEmailAvailabilityResponse>(
      CHECK_EMAIL_AVAILABILITY,
      {
        email: formData.email,
      },
    );
    if (response.isEmailAvailable) {
      setErrorState((prev) => ({ ...prev, email: "" }));
      return true;
    } else {
      setErrorState((prev) => ({
        ...prev,
        email: "Email is already registered",
      }));
      if (emailRef.current) {
        emailRef.current.focus();
      }
      return false;
    }
  }, [formData.email]);

  const isMobileAvailable = useCallback(async () => {
    const response = await graphqlRequest<CheckMobileAvailabilityResponse>(
      CHECK_MOBILE_AVAILABILITY,
      {
        mobile: formData.mobile,
      },
    );
    if (response.isMobileAvailable) {
      setErrorState((prev) => ({ ...prev, mobile: "" }));
      return true;
    } else {
      setErrorState((prev) => ({
        ...prev,
        mobile: "Mobile number is already registered",
      }));
      if (mobileRef.current) {
        mobileRef.current.focus();
      }
      return false;
    }
  }, [formData.mobile]);

  useEffect(() => {
    if (formData.email && !setCustomUsername) {
      const user_name = formData.email.split("@")[0];
      setFormData((prev) => ({ ...prev, userName: user_name }));
    }
  }, [formData.email, setCustomUsername]);

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
      }}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid
      extraScrollHeight={60}
      keyboardOpeningTime={0}
    >
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
          ref={emailRef}
          label="Email"
          value={formData.email}
          onChangeText={(text) => {
            setFormData((prev) => ({ ...prev, email: text }));
            validateField("email", text);
          }}
          onBlur={() => isEmailAvailable()}
          required
          error={errorState.email ? true : false}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <PaperInput
          ref={userNameRef}
          label="Username"
          value={formData.userName}
          onChangeText={(text) => {
            setFormData((prev) => ({ ...prev, userName: text }));
            validateField("userName", text);
          }}
          onBlur={() => isUserNameAvailable()}
          autoCapitalize="none"
          required
          error={errorState.userName ? true : false}
          editable={setCustomUsername}
        />
        <Checkbox.Item
          label="I want to use my own username"
          status={setCustomUsername ? "checked" : "unchecked"}
          onPress={() => setSetCustomUsername(!setCustomUsername)}
        />
        <PaperInput
          ref={mobileRef}
          label="Contact Number"
          value={formData.mobile}
          onChangeText={(text) => {
            handlePhoneChange(text);
            validateField("mobile", text);
          }}
          onBlur={() => isMobileAvailable()}
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
                userName: "",
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
          onPress={() => router.replace("/store")}
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

export default UserForm;
