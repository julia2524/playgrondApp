import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ClassificationPlayScreen from "./games/classification/color/screens/ClassificationPlayScreen";

import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
      <AppNavigator />
    </NavigationContainer>
  );
}
