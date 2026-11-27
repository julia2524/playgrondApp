import React, { useEffect, useRef } from "react";

import { Animated, Easing, StyleSheet, View } from "react-native";

import Svg, { Circle, G, Path } from "react-native-svg";

const WHITE = "#FFFFFF";

const AnimatedView = Animated.View;

interface FishTracingArtworkProps {
  isCompleted?: boolean;
}

interface FishSvgProps {
  colored: boolean;
}

function FishSvg({ colored }: FishSvgProps) {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 320 240"
      preserveAspectRatio="xMidYMid meet"
    >
      <G transform="translate(5.5 -30) scale(3)">
        {/* 물고기 전체 몸통 + 꼬리 외곽 */}
        <Path
          d="
            M15 50
            C22 30 45 23 68 35
            L88 30
            L86 70
            L68 65
            C45 77 22 70 15 50
            Z
          "
          fill={colored ? "#55BCEB" : "#D5EAF2"}
          stroke="none"
        />

        {/* 눈 */}
        <Circle
          cx="32"
          cy="45"
          r="6"
          fill={colored ? "#FFFFFF" : "#F4F0E8"}
          opacity={colored ? 1 : 0.5}
        />

        <Circle cx="33" cy="46" r="3" fill={colored ? "#36536A" : "#C5D1D5"} />

        {/* 비늘 */}
        <Path
          d="M48 43 Q54 50 48 57"
          stroke={colored ? "#278DBD" : "#BDD9E3"}
          strokeWidth="3"
          fill="none"
          opacity={colored ? 0.65 : 0.5}
          strokeLinecap="round"
        />

        {/* 몸통 하이라이트 */}
        <Path
          d="
            M24 43
            C31 32 45 30 56 35
          "
          stroke={WHITE}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          opacity={colored ? 0.45 : 0.2}
        />
      </G>
    </Svg>
  );
}

export default function FishTracingArtwork({
  isCompleted = false,
}: FishTracingArtworkProps) {
  const colorOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    colorOpacity.stopAnimation();

    if (!isCompleted) {
      colorOpacity.setValue(0);
      return;
    }

    Animated.timing(colorOpacity, {
      toValue: 1,
      duration: 700,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    return () => {
      colorOpacity.stopAnimation();
    };
  }, [isCompleted, colorOpacity]);

  return (
    <View style={styles.container}>
      {/* 처음 보여줄 연한 물고기 */}
      <View style={StyleSheet.absoluteFill}>
        <FishSvg colored={false} />
      </View>

      {/* 완성되면 컬러 물고기가 서서히 나타남 */}
      <AnimatedView
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, { opacity: colorOpacity }]}
      >
        <FishSvg colored />
      </AnimatedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
