import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import HomeScreen from "../features/home/HomeScreen";
import ClassificationPlayScreen from "../features/classification/ClassificationPlayScreen";
import StageMapScreen from "../features/StageMap/StageMapScreen";
import StickerGalleryScreen from "../features/sticker/StickerGalleryScreen";
import ShapeStickerGalleryScreen from "../features/sticker/ShapeStickerGalleryScreen";
import SettingScreen from "../features/setting/SettingScreen";
import CategoryStickerGalleyScreen from "../features/sticker/CategoryStickerGalleyScreen";
import IntegratedStickerGalleryScreen from "../features/sticker/IntegratedStickerGalleryScreen";
import StickerDetailScreen from "../features/sticker/StickerDetailScreen";
import LanguageScreen from "../features/LanguageScreen";
import TracingGameScreen from "../features/tracing/TracingGameScreen";

import type { RootStackParamList } from "./types";
import ClassificationSectionScreen from "../features/classification/ClassificationSectionScreen";

// 네비게이션 타입 연결
const Stack = createNativeStackNavigator<RootStackParamList>();

// TracingGameScreen에 뒤로 가기 기능 전달
function TracingGameRoute({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "TracingGameScreen">) {
  return <TracingGameScreen onBack={() => navigation.goBack()} />;
}

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
        name="ClassificationSectionScreen"
        component={ClassificationSectionScreen}
        options={{ animation: "fade" }}
      />

      <Stack.Screen
        name="StageMapScreen"
        component={StageMapScreen}
        options={{ animation: "fade" }}
      />

      <Stack.Screen
        name="ClassificationPlayScreen"
        component={ClassificationPlayScreen}
        options={{ animation: "fade" }}
      />

      <Stack.Screen
        name="TracingGameScreen"
        component={TracingGameRoute}
        options={{ animation: "fade" }}
      />

      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{ animation: "fade" }}
      />

      {/* 통합 스티커북 등록 */}
      <Stack.Screen
        name="IntegratedStickerGalleryScreen"
        component={IntegratedStickerGalleryScreen}
        options={{ animation: "fade" }}
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
        component={CategoryStickerGalleyScreen}
      />

      <Stack.Screen
        name="StickerDetailScreen"
        component={StickerDetailScreen}
        options={{ animation: "fade" }}
      />

      <Stack.Screen name="LanguageScreen" component={LanguageScreen} />
    </Stack.Navigator>
  );
}
