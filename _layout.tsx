import React from "react";
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function StackLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#f0f0f5", // Light background color for the tab bar
            borderTopColor: "#d1d1d6", // Subtle border for a clean look
            height: 60, // Increase height for better spacing
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
            marginBottom: 5, // Adjust spacing for better alignment
          },
          tabBarIconStyle: {
            marginTop: 5, // Space between the icon and label
          },
          tabBarActiveTintColor: "#007BFF", // Vibrant active color
          tabBarInactiveTintColor: "#6c757d", // Muted inactive color
          animation: "none", // Disable tab animation
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            tabBarLabel: "Home",
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="gallery"
          options={{
            headerShown: false,
            tabBarLabel: "Gallery",
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="photo" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="add"
          options={{
            headerShown: false,
            tabBarLabel: "Add",
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="add" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="setting"
          options={{
            headerShown: false,
            tabBarLabel: "Setting",
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="settings" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
