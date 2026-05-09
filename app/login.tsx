import { graphqlRequest } from "@/services/graphql/client";
import { LOGIN_USER, User } from "@/services/graphql/user";
import React from "react";
import { Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const LoginPage = () => {
  const handleLoginUser = async (userdata?: User) => {
    const response = await graphqlRequest(LOGIN_USER, {
      email: userdata?.email || "harhar@mahadev.com",
      password: userdata?.password || "123456",
    });

    console.log(JSON.stringify(response, null, 0));

    return response;
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
          <Text>Login Page</Text>
          <TextInput mode="outlined" label="Email" />
          <TextInput mode="outlined" label="Password" secureTextEntry />
          <Button mode="contained" onPress={() => handleLoginUser()}>
            Login
          </Button>
          <Button mode="text">Don&apos;t have an account? Register</Button>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default LoginPage;
