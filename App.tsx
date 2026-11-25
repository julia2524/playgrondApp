import React, { useEffect, useState } from "react";

import { StyleSheet, View } from "react-native";

import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";

import { useFonts } from "expo-font";

import * as SplashScreen from "expo-splash-screen";

import { ThemeProvider } from "styled-components/native";

import { theme } from "./design-system/theme/theme";

import AppNavigator from "./navigation/AppNavigator";

import CustomSplash from "./components/CustomSplash";

import { BackgroundMusicProvider } from "./features/audio/BackgroundMusicContext";

import i18n, { loadSavedLanguage } from "./i18n";

import { LanguageProvider } from "./context/LanguageContext";

import { useAppPlayTimer } from "./utils/useAppPlayTimer";

import RestModal from "./components/common/RestModal";
import { useInAppUpdates } from "./hooks/useInAppUpdates";
import UpdateModal from "./components/common/UpdateModal";
import { preloadSounds } from "./utils/sound";

// 네이티브 스플래시 유지
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Jua: require("./assets/fonts/Jua-Regular.ttf"),
    Fredoka: require("./assets/fonts/Fredoka-Medium.ttf"),
    ZCOOLKuaiLe: require("./assets/fonts/ZCOOLKuaiLe-Regular.ttf"),
  });

  const [showCustomSplash, setShowCustomSplash] = useState<boolean>(true);

  const [isLangLoaded, setIsLangLoaded] = useState<boolean>(false);

  const {
    shouldShowRestModal,
    isCooltimeActive,
    remainingCooltimeSec,
    startThreeMinuteRest,
    resetPlayTime,
  } = useAppPlayTimer();

  const { isUpdateModalVisible, isUpdating, onUpdate, onLater } =
    useInAppUpdates(!showCustomSplash && fontsLoaded && isLangLoaded);

  // 저장된 언어 불러오기 및 네이티브 스플래시 처리
  useEffect(() => {
    const initApp = async () => {
      try {
        await loadSavedLanguage();
        setIsLangLoaded(true);

        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
        setIsLangLoaded(true);
      }
    };

    initApp();
  }, []);

  // CustomSplash 최소 표시 시간
  useEffect(() => {
    if (!fontsLoaded || !isLangLoaded) return;

    const timer = setTimeout(() => {
      setShowCustomSplash(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, [fontsLoaded, isLangLoaded]);

  // 앱 전체 공통 사운드 초기화
  useEffect(() => {
    void preloadSounds();
  }, []);

  // 현재 언어에 따른 스플래시 이미지
  const currentLang = i18n.locale || "en";

  let splashImage;

  if (currentLang.startsWith("ko")) {
    splashImage = require("./assets/splash-icon.png");
  } else if (
    currentLang.startsWith("zh") ||
    currentLang === "wuu" ||
    currentLang === "yue"
  ) {
    splashImage = require("./assets/splash-china.png");
  } else {
    splashImage = require("./assets/splash-en.png");
  }

  // CustomSplash 표시
  if (showCustomSplash || !fontsLoaded || !isLangLoaded) {
    return <CustomSplash imageSource={splashImage} />;
  }

  const isRestModalVisible = shouldShowRestModal || isCooltimeActive;

  return (
    <LanguageProvider>
      <BackgroundMusicProvider>
        <ThemeProvider theme={theme}>
          <View style={styles.container}>
            <NavigationContainer>
              <StatusBar hidden={true} translucent={true} />

              <AppNavigator />

              {/* 기존 휴식 모달 */}
              <RestModal
                visible={isRestModalVisible}
                isCooltimeActive={isCooltimeActive}
                remainingCooltimeSec={remainingCooltimeSec}
                onRestThreeMinutes={startThreeMinuteRest}
                onWatchAdSuccess={resetPlayTime}
              />

              {/* 업데이트 팝업 디자인 테스트 */}
              <UpdateModal
                visible={isUpdateModalVisible && !isRestModalVisible}
                isUpdating={isUpdating}
                onUpdate={onUpdate}
                onLater={onLater}
              />
            </NavigationContainer>
          </View>
        </ThemeProvider>
      </BackgroundMusicProvider>
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
