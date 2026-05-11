import { IconSymbol } from "@/components/ui/icon-symbol";
import PaperButton from "@/components/ui/paperButton";
import PaperInput from "@/components/ui/paperInput";
import { graphqlRequest } from "@/services/graphql/client";
import { LOGIN_USER, LoginUserResponse } from "@/services/graphql/user";
import { saveTokens } from "@/services/token.service";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Snackbar, Text } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleLoginUser = async () => {
    if (!formData.email || !formData.password) {
      setSnackbarMessage("Please fill in all fields");
      setVisible(true);
      return;
    }
    try {
      const response = await graphqlRequest<LoginUserResponse>(LOGIN_USER, {
        email: formData?.email,
        password: formData?.password,
      });

      if (
        response?.loginUser?.accessToken &&
        response?.loginUser?.refreshToken
      ) {
        saveTokens(
          response.loginUser.accessToken,
          response.loginUser.refreshToken,
          response.loginUser.user.id,
        );
        router.replace("/(tabs)");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      if (error instanceof Error) {
        let message = "";
        switch (error.message) {
          case "UNAUTHORIZED":
            message = "Login Failed: Invalid password";
            break;

          case "NOT_FOUND":
            message = "User Not Found: Please check your email";
            break;

          default:
            message = "Something went wrong";
        }
        setSnackbarMessage(message);
        setVisible(true);
      } else {
        setSnackbarMessage("An unknown error occurred.");
        setVisible(true);
      }
      // alert(`${error}`);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={styles.container}>
          <Text variant="titleLarge">Login Page</Text>
          <PaperInput
            mode="flat"
            label="Email"
            right={<IconSymbol type="AntDesign" name="mail" />}
            left={<IconSymbol type="AntDesign" name="mail" />}
            value={formData.email}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, email: text }))
            }
          />
          <PaperInput
            mode="flat"
            label="Password"
            passwordField={true}
            value={formData.password}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, password: text }))
            }
          />
          <View style={styles.buttonContainer}>
            <PaperButton
              title="Cancel"
              mode="outlined"
              onPress={() => router.replace("/register")}
            />
            <PaperButton
              title="Login"
              mode="contained"
              onPress={() => handleLoginUser()}
            />
          </View>
          <PaperButton
            mode="text"
            title="Don't have an account? Register"
            onPress={() => {
              router.replace("/register");
            }}
          />
        </View>
      </SafeAreaView>

      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: "Undo",
          onPress: () => {
            // Do something
          },
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "center",
  },
});

export default LoginPage;
