import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { ThemeProvider } from "styled-components/native";
import { theme } from "./design-system/theme/theme";
import AppNavigator from "./navigation/AppNavigator";
import CustomSplash from "./components/CustomSplash";
import { BackgroundMusicProvider } from "./features/audio/BackgroundMusicContext";
import i18n, { loadSavedLanguage } from "./i18n"; // 👈 loadSavedLanguage 및 i18n 임포트

// 폰트가 로딩되는 동안 스플래시 화면이 유지되도록 설정
SplashScreen.preventAutoHideAsync();

export default function App() {
  // 1. 주아체 폰트 불러오기
  const [fontsLoaded] = useFonts({
    Jua: require("./assets/fonts/Jua-Regular.ttf"),
    Fredoka: require("./assets/fonts/Fredoka-Medium.ttf"),
    ZCOOLKuaiLe: require("./assets/fonts/ZCOOLKuaiLe-Regular.ttf"),
  });

  // ⭐ CustomSplash 보여줄지
  const [showCustomSplash, setShowCustomSplash] = useState<boolean>(true);

  // ⭐ 저장된 언어가 로드되었는지 확인하는 상태
  const [isLangLoaded, setIsLangLoaded] = useState<boolean>(false);

  // ==================================================
  // 1. 앱 실행 시 저장된 언어 불러오기 & 네이티브 스플래시 숨기기
  // ==================================================
  useEffect(() => {
    const initApp = async () => {
      try {
        // 💡 저장된 언어가 있으면 i18n.locale에 적용
        await loadSavedLanguage();
        setIsLangLoaded(true);

        // 네이티브 스플래시 숨김
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
        setIsLangLoaded(true);
      }
    };

    initApp();
  }, []);

  // ==================================================
  // 2. CustomSplash 최소 시간 유지 (폰트 + 저장 언어 모두 완료 시)
  // ==================================================
  useEffect(() => {
    if (!fontsLoaded || !isLangLoaded) return;

    const timer = setTimeout(() => {
      setShowCustomSplash(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, [fontsLoaded, isLangLoaded]);

  // ==================================================
  // ⭐ 현재 설정된 언어(i18n.locale)에 따른 스플래시 이미지 결정
  // ==================================================
  const currentLang = i18n.locale || "en";

  let splashImage;
  if (currentLang.startsWith("ko")) {
    splashImage = require("./assets/splash-icon.png"); // 한국어
  } else if (currentLang.startsWith("zh")) {
    splashImage = require("./assets/splash-china.png"); // 중국어
  } else {
    splashImage = require("./assets/splash-en.png"); // 영어 및 기타
  }

  // ==================================================
  // 3. CustomSplash 보여주는 중
  // ==================================================
  if (showCustomSplash) {
    return <CustomSplash imageSource={splashImage} />;
  }

  return (
    <BackgroundMusicProvider>
      <ThemeProvider theme={theme}>
        <View style={styles.container}>
          <NavigationContainer>
            <StatusBar hidden={true} translucent={true} />
            <AppNavigator />
          </NavigationContainer>
        </View>
      </ThemeProvider>
    </BackgroundMusicProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
