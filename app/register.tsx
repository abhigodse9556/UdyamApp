import RegistrationForm from "@/components/forms/registrationForm";
import { Text } from "@react-navigation/elements";
import { StyleSheet, View } from "react-native";

const Register = () => {
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
      <RegistrationForm />
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
});

export default Register;
