import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Add from "../app/(tabs)/tabs/add"; // Component for adding items
import Gallery from "../app/(tabs)/tabs/gallery"; // Main gallery component
import Closet from "../closet/Gallery"; // Closet or specific gallery component
import ClothesRegistrationScreen from "../app/(tabs)/tabs/add"; // Clothes registration screen
import ViewItemsScreen from "../app/(tabs)/tabs/gallery"; // View items screen

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Gallery">
        {/* Gallery Screen */}
        <Stack.Screen 
          name="Gallery" 
          component={Gallery} 
          options={{ title: "Gallery" }} 
        />

        {/* Closet Screen */}
        <Stack.Screen 
          name="Closet" 
          component={Closet} 
          options={{ title: "Closet" }} 
        />

        {/* Add Screen */}
        <Stack.Screen 
          name="Add" 
          component={Add} 
          options={{ title: "Add Clothes" }} 
        />

        {/* Clothes Registration Screen */}
        <Stack.Screen 
          name="Register" 
          component={ClothesRegistrationScreen} 
          options={{ title: "Register Clothes" }} 
        />

        {/* View Items Screen */}
        <Stack.Screen 
          name="ViewItems" 
          component={ViewItemsScreen} 
          options={{ title: "View Saved Items" }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
