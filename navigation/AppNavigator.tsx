import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../features/home/HomeScreen";
import ClassificationPlayScreen from "../features/classification/ClassificationPlayScreen";
import StageMapScreen from "../features/StageMap/StageMapScreen";
import StickerGalleryScreen from "../features/classification/StickerGalleryScreen";
import ShapeStickerGalleryScreen from "../features/classification/ShapeStickerGalleryScreen";
import SettingScreen from "../features/setting/SettingScreen";
import CategoryStickerGalleryScreen from "../features/classification/CategoryStickerGalleyScreen";
import CategoryTestScreen from "../features/classification/CategoryTestScreen";
import RainbowTestScreen from "../features/StageMap/RainbowTextScreen";

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
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="StickerGalleryScreen"
        component={StickerGalleryScreen}
      />
      <Stack.Screen
        name="ShapeStickerGalleryScreen"
        component={ShapeStickerGalleryScreen}
      />
      <Stack.Screen
        name="CategoryStickerGalleryScreen"
        component={CategoryStickerGalleryScreen}
      />
      <Stack.Screen name="CategoryTestScreen" component={CategoryTestScreen} />
      <Stack.Screen name="RainbowTestScreen" component={RainbowTestScreen} />
    </Stack.Navigator>
  );
}
