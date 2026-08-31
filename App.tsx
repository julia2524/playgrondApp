import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ClassificationPlayScreen from "./screens/games/classification/color/ClassificationPlayScreen";

import { NavigationContainer } from "@react-navigation/native";
import CountdownOverlay from "./screens/CountDownOverlay";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  return (
    // <CountdownOverlay onFinish={() => {}} />
    <NavigationContainer>
      <StatusBar hidden={true} />
      <AppNavigator />
    </NavigationContainer>
  );
}
