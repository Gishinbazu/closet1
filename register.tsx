import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../constants/firebaseConfig";
import { useRouter } from "expo-router";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Account created successfully!");
      router.replace("/(tabs)"); // Navigate to the home page
    } catch (error: any) {
      console.error(error);
      Alert.alert("Registration Failed", error?.message || "An unexpected error occurred.");
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/AdobeStock_645372426_Preview.jpeg")} // Replace with your image path
      style={styles.backgroundImage}
      resizeMode="cover" // Ensures the image covers the entire screen
      onError={(error) => console.error("Background image failed to load:", error)} // Logs if image fails to load
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Text style={styles.title}>Register</Text>
          <TextInput
            style={[
              styles.input,
              { borderColor: emailFocused ? "#007BFF" : "#ccc" },
            ]}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
          />
          <TextInput
            style={[
              styles.input,
              { borderColor: passwordFocused ? "#007BFF" : "#ccc" },
            ]}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />
          <TouchableOpacity onPress={handleRegister} style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <Text
            style={styles.linkText}
            onPress={() => router.push("/(tabs)")}
          >
            Already have an account? Log In
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1, // Full height and width of the screen
    width: "100%", // Ensures full width on larger screens
    height: "100%", // Ensures full height on larger screens
    justifyContent: "center", // Centers content vertically
    alignItems: "center", // Centers content horizontally
  },
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    width: "200%",
    maxWidth: 400,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent dark background
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
  },
  button: {
    width: "100%",
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  linkText: {
    marginTop: 20,
    color: "#fff",
    textDecorationLine: "underline",
    textAlign: "center",
    fontWeight: "bold",
  },
});
