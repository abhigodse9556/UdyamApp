import OnlineRegistrationForm from "@/components/forms/onlineRegistrationForm";
import RegistrationForm from "@/components/forms/registrationForm";
import PaperButton from "@/components/ui/paperButton";
import { Text } from "@react-navigation/elements";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

const Register = () => {
  const [showForm, setShowForm] = useState("none"); // 'none' | 'online' | 'offline'
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>UdayamApp</Text>
        <Text style={styles.subTitle}>
          Manage your business स्मार्ट तरीके से
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>
          To use UdayamApp you need to register
        </Text>
        <Text style={styles.infoSubTitle}>
          Don&apos;t worry, we will never share your information with anyone
          else.
        </Text>
      </View>
      {showForm === "offline" ? (
        <RegistrationForm onClose={() => setShowForm("none")} />
      ) : showForm === "online" ? (
        <OnlineRegistrationForm onClose={() => setShowForm("none")} />
      ) : (
        <View style={styles.buttonContainer}>
          <PaperButton
            mode="contained"
            onPress={() => setShowForm("online")}
            title="Register With Us"
          />
          <PaperButton
            mode="outlined"
            onPress={() => router.replace("/login")}
            title="Already Have An Account? Login"
          />
          {/* <Button
            mode="contained"
            onPress={() => setShowForm("offline")}
            // style={styles.button}
            // labelStyle={styles.buttonText}
          >
            Use Offline
          </Button> */}
          <PaperButton
            mode="text"
            onPress={() => setShowForm("none")}
            title="Learn More About UdayamApp&#39;s Features"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  titleContainer: {
    marginBottom: 10,
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  subTitle: {
    fontSize: 18,
    color: "#ffffff",
    marginTop: 15,
  },
  infoContainer: {
    marginBottom: 20,
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  infoSubTitle: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
  formContainer: {
    marginBottom: 20,
    gap: 0,
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
  },
  buttonContainer: {
    gap: 16,
    justifyContent: "center",
  },
});

export default Register;
