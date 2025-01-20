import React from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

const WeatherMap = ({ latitude, longitude, description }) => {
  if (!latitude || !longitude) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Location data is unavailable</Text>
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      <Marker
        coordinate={{ latitude: parseFloat(latitude), longitude: parseFloat(longitude) }}
        title="Weather Location"
        description={description}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
    width: "100%",
    marginVertical: 20,
    borderRadius: 10,
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 300,
    backgroundColor: "#f8d7da",
    borderRadius: 10,
  },
  errorText: {
    color: "#721c24",
    fontSize: 16,
  },
});

export default WeatherMap;
