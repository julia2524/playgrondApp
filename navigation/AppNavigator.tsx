import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ClassificationPlayScreen from "../games/classification/color/screens/ClassificationPlayScreen";

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
        name="ClassificationPlayScreen"
        component={ClassificationPlayScreen}
        options={{
          // 🌟 화면이 열릴 때 오른쪽에서 왼쪽으로 오되,
          // 뒤로 갈 때는 왼쪽에서 오른쪽으로 슥 빠져나가게 설정!
          animation: "fade", // 또는 'fade', 'ios_from_right' 등
        }}
      />
    </Stack.Navigator>
  );
}
