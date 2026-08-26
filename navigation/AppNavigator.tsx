import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ClassificationPlayScreen from "../games/classification/color/screens/ClassificationPlayScreen";
import StageMapScreen from "../screens/StageMapScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="StageMapScreen"
        component={StageMapScreen}
        options={{
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="ClassificationPlayScreen"
        component={ClassificationPlayScreen}
        options={{
          animation: "fade",
        }}
      />
    </Stack.Navigator>
  );
}
