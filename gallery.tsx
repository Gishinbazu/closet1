// Full Code: Dynamic Clothing Gallery with imageLibrary.js

import React, { useRef, useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import imageLibrary from "../../../utils/imageLibrary";

export default function Page() {
  const insets = useSafeAreaInsets();
  const { top } = insets;
  const navigation = useNavigation();
  const route = useRoute();

  // Dynamically load initial clothing data
  const [clothingCategory, setClothingCategory] = useState("men");
  const clothingData = imageLibrary[clothingCategory] || [];

  // Modal visibility and selected clothing state
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedClothing, setSelectedClothing] = useState(null);

  // ScrollView reference for scroll-to-top/bottom functionality
  const scrollViewRef = useRef(null);

  // Scroll-to-top functionality
  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  // Scroll-to-bottom functionality
  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  // Close modal when tapping outside
  const handleBackgroundPress = () => {
    setModalVisible(false);
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/AdobeStock_1033769224_Preview.jpeg")}
      style={styles.background}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>Gallery</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("ClothesRegistrationScreen")}
            style={styles.menuButton}
          >
            <MaterialIcons name="menu" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Category Buttons */}
        <View style={styles.categoryButtons}>
          {Object.keys(imageLibrary).map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                clothingCategory === category && styles.activeCategoryButton,
              ]}
              onPress={() => setClothingCategory(category)}
            >
              <Text
                style={
                  clothingCategory === category
                    ? styles.activeCategoryText
                    : styles.categoryText
                }
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Gallery */}
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.gallery, { marginTop: Platform.OS === "android" ? top : 0 }]}>
            {clothingData.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  setSelectedClothing(item);
                  setModalVisible(true);
                }}
              >
                <View style={styles.clothingItem}>
                  <Image source={item.image} style={styles.clothingImage} />
                  <Text style={styles.clothingText}>{item.name}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        {/* Scroll Buttons */}
        <View style={styles.scrollButtons}>
          <TouchableOpacity style={styles.scrollButton} onPress={scrollToTop}>
            <Text style={styles.scrollButtonText}>↑</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.scrollButton} onPress={scrollToBottom}>
            <Text style={styles.scrollButtonText}>↓</Text>
          </TouchableOpacity>
        </View>

        {/* Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={handleBackgroundPress}>
            <View style={styles.modalBackground}>
              {selectedClothing && (
                <View style={styles.modalContent}>
                  <Image source={selectedClothing.image} style={styles.modalImage} />
                  <Text style={styles.modalText}>{selectedClothing.name}</Text>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.closeButton}
                  >
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    backgroundColor: "#f8f9fa",
  },
  safeArea: {
    flex: 1,
  },
  header: {
    height: 80,
    backgroundColor: "#007BFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  menuButton: {
    padding: 5,
  },
  categoryButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#e9ecef",
    borderRadius: 8,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  activeCategoryButton: {
    backgroundColor: "#007BFF",
    shadowOpacity: 0.2,
  },
  categoryText: {
    fontSize: 16,
    color: "#495057",
    fontWeight: "500",
  },
  activeCategoryText: {
    color: "#fff",
    fontWeight: "bold",
  },
  scrollViewContent: {
    padding: 20,
    flexGrow: 1,
  },
  gallery: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },
  clothingItem: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  clothingImage: {
    width: 200,
    height: 200,
    borderRadius: 15,
    marginBottom: 10,
  },
  clothingText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#343a40",
    textAlign: "center",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    padding: 25,
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 7,
  },
  modalImage: {
    width: 250,
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#495057",
    marginBottom: 20,
  },
  closeButton: {
    padding: 12,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  scrollButtons: {
    position: "absolute",
    bottom: 20,
    right: 20,
    alignItems: "center",
  },
  scrollButton: {
    backgroundColor: "#007BFF",
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 27.5,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  scrollButtonText: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
  },
});