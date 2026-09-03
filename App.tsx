import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { ThemeProvider } from "styled-components/native";
import { theme } from "./design-system/theme/theme";
import AppNavigator from "./navigation/AppNavigator";
import CustomSplash from "./components/CustomSplash";

// 폰트가 로딩되는 동안 스플래시 화면이 유지되도록 설정
SplashScreen.preventAutoHideAsync();

export default function App() {
  // 1. 주아체 폰트 불러오기 (경로가 다를 경우 수정해 줘!)
  const [fontsLoaded] = useFonts({
    Jua: require("./assets/fonts/Jua-Regular.ttf"),
  });

  // ⭐ CustomSplash 보여줄지
  const [showCustomSplash, setShowCustomSplash] = useState(true);
  // ==================================================
  // 1. 네이티브 스플래시 최대한 빨리 숨기기
  // ==================================================
  useEffect(() => {
    // 폰트 로딩과 상관없이 빠르게 숨김
    const hideNativeSplash = async () => {
      try {
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      }
    };

    hideNativeSplash();
  }, []);
  // ==================================================
  // 2. CustomSplash 최소 시간 유지
  // ==================================================
  useEffect(() => {
    // 폰트가 로드되고, 최소 2.2초는 보여주기
    if (!fontsLoaded) return;

    const timer = setTimeout(() => {
      setShowCustomSplash(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, [fontsLoaded]);

  // ==================================================
  // 3. CustomSplash 보여주는 중
  // ==================================================
  if (showCustomSplash) {
    return <CustomSplash />;
  }

  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <NavigationContainer>
          <StatusBar hidden={true} translucent={true} />
          <AppNavigator />
        </NavigationContainer>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
