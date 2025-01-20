import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../../../constants/firebaseConfig";

const ClothesRegistrationScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [material, setMaterial] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to pick an image
  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert("Permission Required", "You need to allow image access.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while picking the image.");
      console.error("Image Picker Error:", error);
    }
  };

  // Function to handle submission
  const handleSubmit = async () => {
    if (!image || !itemName.trim() || !category || !color.trim() || !material.trim()) {
      Alert.alert("Error", "Please fill all fields and select an image.");
      return;
    }

    setIsSubmitting(true);

    try {
      const storage = getStorage();
      const response = await fetch(image);
      const blob = await response.blob();
      const imageRef = ref(storage, `clothes/${Date.now()}`);
      await uploadBytes(imageRef, blob);
      const imageUrl = await getDownloadURL(imageRef);

      const newClothingItem = {
        itemName,
        category,
        color,
        material,
        imageUrl,
      };

      await addDoc(collection(firestore, "clothes"), newClothingItem);

      Alert.alert("Success", "Clothes registered successfully!", [
        {
          text: "Go to Add",
          onPress: () => navigation.navigate("add", { newItem: newClothingItem }),
        },
        { text: "Stay Here" },
      ]);

      // Reset inputs
      resetForm();
    } catch (error) {
      Alert.alert("Error", "Failed to register clothes. Please try again.");
      console.error("Submission Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form inputs
  const resetForm = () => {
    setImage(null);
    setItemName("");
    setCategory("");
    setColor("");
    setMaterial("");
  };

  if (isSubmitting) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3182ce" />
        <Text style={styles.loadingText}>Registering Clothes...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Register Your Clothes</Text>

        {/* Image Picker */}
        <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
          <View style={styles.imageContainer}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Text style={styles.imageText}>Tap to select an image</Text>
            )}
          </View>
        </TouchableOpacity>

        {/* Input Fields */}
        <TextInput
          style={styles.input}
          placeholder="Clothing Name"
          value={itemName}
          onChangeText={setItemName}
          placeholderTextColor="#aaa"
        />

        {/* Category Picker */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Category" value="" />
            <Picker.Item label="Top" value="Top" />
            <Picker.Item label="Bottom" value="Bottom" />
            <Picker.Item label="Outerwear" value="Outerwear" />
            <Picker.Item label="Accessories" value="Accessories" />
          </Picker>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Color"
          value={color}
          onChangeText={setColor}
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={styles.input}
          placeholder="Material (e.g., Cotton/Leather/Other)"
          value={material}
          onChangeText={setMaterial}
          placeholderTextColor="#aaa"
        />

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && { opacity: 0.6 }]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.submitButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#f8fafc",
    padding: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1a202c",
    marginBottom: 30,
    textAlign: "center",
  },
  imageButton: {
    width: "100%",
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#f1f5f9",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#cbd5e0",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  imageText: {
    color: "#4a5568",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    fontSize: 16,
    color: "#2d3748",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  pickerContainer: {
    width: "100%",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f8fafc",
  },
  picker: {
    width: "100%",
    height: 50,
    backgroundColor: "#f8fafc",
    color: "#2d3748",
  },
  submitButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#3182ce",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
});

export default ClothesRegistrationScreen;
