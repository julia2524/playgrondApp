import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import CountdownOverlay from "./components/common/CountDownOverlay";
import AppNavigator from "./navigation/AppNavigator";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./constants/theme";

// 폰트가 로딩되는 동안 스플래시 화면이 유지되도록 설정
SplashScreen.preventAutoHideAsync();

export default function App() {
  // 1. 주아체 폰트 불러오기 (경로가 다를 경우 수정해 줘!)
  const [fontsLoaded] = useFonts({
    Jua: require("./assets/fonts/Jua-Regular.ttf"),
  });

  // 2. 폰트 로드가 완료되면 스플래시 화면 숨기기
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // 폰트가 아직 안 로드되었다면 빈 화면을 보여주어 글자 깨짐 방지
  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <NavigationContainer>
          <StatusBar hidden={true} />
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
