import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ClassificationPlayScreen from "./games/classification/color/screens/ClassificationPlayScreen";

import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import CountdownOverlay from "./screens/CountDownOverlay";

export default function App() {
  return (
    // <CountdownOverlay onFinish={() => {}} />
    <NavigationContainer>
      <StatusBar hidden={true} />
      <AppNavigator />
    </NavigationContainer>
  );
}
