import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from "axios";
import imageLibrary from "../../../utils/imageLibrary";

// Function to recommend clothes based on category and temperature
const recommendClothes = (category, temperature) => {
  const clothesByCategory = imageLibrary[category] || [];
  
  // Logic to filter based on temperature
  if (temperature <= 5) {
    return clothesByCategory.filter((item) =>
      ["Warm Coat", "Black winter boots", "Winter Coat","Pants","mittens",
        "sweater ","hood","knitted hat","winter jacket","jogger","hoodie",
        "puffer jacket","pom-pom hats","knit sweater"
      ].includes(item.name)
    );
  } else if (temperature > 5 && temperature <= 15) {
    return clothesByCategory.filter((item) =>
      ["Jeans", "Sweater", "Pants"].includes(item.name)
    );
  } else {
    return clothesByCategory.filter((item) =>
      ["Floral dress", "Sun hat", "Cute Dress"].includes(item.name)
    );
  }
};


// Function to describe the weather
const getWeatherDescription = (temperature, condition) => {
  if (condition.includes("rain")) {
    return temperature > 20
      ? "Warm and rainy - carry an umbrella and wear light rain gear."
      : "Cool and rainy - wear a waterproof jacket and warm layers.";
  } else if (condition.includes("clear")) {
    return temperature > 30
      ? "Hot and sunny - wear sunscreen, sunglasses, and stay hydrated."
      : temperature > 20
      ? "Warm and sunny - light clothes and a hat will be perfect."
      : "Sunny but cool - wear a light jacket and enjoy the day.";
  } else if (condition.includes("cloud")) {
    return temperature > 15
      ? "Mild and cloudy - comfortable casual wear should be fine."
      : "Cool and cloudy - a light jacket or sweater is recommended.";
  } else if (condition.includes("snow")) {
    return "Cold and snowy - wear warm layers, a hat, gloves, and snow boots.";
  } else {
    return "Weather data unclear - dress comfortably for unexpected conditions.";
  }
};

// Header component
const Header = () => (
  <View style={styles.header}>
    <Image
      source={require("../../../assets/images/Home-Logo-Background-PNG-Image.png")}
      style={styles.logo}
      resizeMode="contain"
    />
    <Text style={styles.headerText}>WeatherWear</Text>
  </View>
);

export default function Home() {
  const insets = useSafeAreaInsets();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clothes, setClothes] = useState({});
  const [city, setCity] = useState("Seoul");

  const API_KEY = "b748c1c6bb1a2517a25014354486f117";

  const fetchWeather = async () => {
    try {
      if (!city.trim()) {
        Alert.alert("Invalid City", "Please enter a valid city name.");
        return;
      }

      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const weatherData = response.data;
      setWeather(weatherData);

      const weatherDesc = getWeatherDescription(
        weatherData.main.temp,
        weatherData.weather[0].description
      );

      Alert.alert("Weather Description", weatherDesc);

      // Fetch recommendations for all categories
      const recommendedClothes = {
        men: recommendClothes("men", weatherData.main.temp),
        women: recommendClothes("women", weatherData.main.temp),
        babyBoy: recommendClothes("babyBoy", weatherData.main.temp),
        babyGirl: recommendClothes("babyGirl", weatherData.main.temp),
      };

      setClothes(recommendedClothes);
      setError(null);
    } catch (err) {
      console.error("Error fetching weather:", err);
      setError("Failed to fetch weather for the specified city.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const renderWeather = () => {
    if (loading) return <ActivityIndicator size="large" color="#007BFF" />;
    if (error) return <Text style={styles.errorText}>{error}</Text>;
    if (!weather || Object.keys(weather).length === 0)
      return <Text style={styles.errorText}>No weather data available.</Text>;

    const { description } = weather?.weather?.[0] || {};
    const { temp: temperature, humidity } = weather?.main || {};

    return (
      <View style={styles.weatherCard}>
        <Text style={styles.weatherText}>{weather?.name || "City"}</Text>
        <View style={styles.weatherDetails}>
          <Image
            source={{
              uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
            }}
            style={styles.weatherIcon}
          />
          <Text style={styles.weatherDescription}>{description || "N/A"}</Text>
        </View>
        <Text style={styles.weatherInfo}>Temperature: {temperature}°C</Text>
        <Text style={styles.weatherInfo}>Humidity: {humidity}%</Text>
      </View>
    );
  };

  const renderClothes = (category) => {
    const recommendedClothes = clothes[category] || [];
  
    return (
      <View style={styles.imageGallery} key={category}>
        <Text style={styles.sectionTitle}>
          Recommended Outfit for {category.charAt(0).toUpperCase() + category.slice(1)}
        </Text>
        <ScrollView
          style={styles.clothesScroll}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.imageRow}>
            {recommendedClothes.map((item, index) => (
              <View key={index} style={styles.clothingItem}>
                <Image source={item.image} style={styles.outfitImage} />
                <Text style={styles.clothingText}>{item.name}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };
  

  return (
    <ImageBackground
      source={require("../../../assets/images/AdobeStock_1033769224_Preview.jpeg")}
      style={styles.background}
    >
      <SafeAreaView style={styles.safeArea}>
        <Header />
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.cityInput}
                placeholder="Enter City Name"
                value={city}
                onChangeText={setCity}
                onSubmitEditing={fetchWeather}
                placeholderTextColor="#aaa"
              />
              <TouchableOpacity style={styles.fetchButton} onPress={fetchWeather}>
                <Text style={styles.fetchButtonText}>Search</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.weatherSection}>
              <Text style={styles.sectionTitle}>Today's Weather</Text>
              {renderWeather()}
            </View>
            {["men", "women", "babyBoy", "babyGirl"].map(renderClothes)}
            
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    backgroundColor: "#f0f4f7",
  },
  header: {
    height: 80,
    backgroundColor: "#4A90E2",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
    flex: 1,
    textAlign: "center",
  },
  scrollViewContent: {
    padding: 20,
  },
  container: {
    flex: 3,
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  cityInput: {
    flex: 1,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#ced4da",
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  fetchButton: {
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 20,
    height: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  fetchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  weatherSection: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#212529",
    textAlign: "center",
  },
  weatherCard: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#eaf4fb",
    padding: 15,
    borderRadius: 12,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  weatherText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4A90E2",
    marginBottom: 10,
  },
  weatherDescription: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#495057",
    marginBottom: 10,
    textAlign: "center",
  },
  weatherDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  weatherIcon: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  weatherInfo: {
    fontSize: 16,
    color: "#6c757d",
    marginBottom: 5,
  },
  clothesScroll: {
    maxHeight: 250,
    marginBottom: 15,
  },
  imageGallery: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  imageRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  clothingItem: {
    width: 140,
    backgroundColor: "#eaf4fb",
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  outfitImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  clothingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
});
