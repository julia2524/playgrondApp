import React, { useEffect, useRef } from "react";

import { Animated, Easing, StyleSheet, View } from "react-native";

import Svg, { Ellipse, G, Path } from "react-native-svg";

const WHITE = "#FFFFFF";
const AnimatedView = Animated.View;

interface CarrotTracingArtworkProps {
  isCompleted?: boolean;
}

interface CarrotSvgProps {
  colored: boolean;
}

function CarrotSvg({ colored }: CarrotSvgProps) {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 320 240"
      preserveAspectRatio="xMidYMid meet"
    >
      <G transform="translate(-80 -60) scale(1.5)">
        {/* 당근 몸통 */}
        <Path
          d="
            M160 65
            C198 65 211 79 198 122
            C188 157 173 192 160 215
            C147 192 132 157 122 122
            C109 79 122 65 160 65Z
          "
          fill={colored ? "#FB8C35" : "#F7DDC5"}
          stroke="none"
        />

        {/* 당근 결 */}
        <Path
          d="
            M139 111 Q160 118 181 111
            M137 139 Q160 146 183 139
            M148 168 Q160 173 172 168
          "
          stroke={colored ? "#D96F25" : "#E6CBB4"}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          opacity={colored ? 0.65 : 0.5}
        />

        {/* 잎 줄기 */}
        <Path
          d="
            M160 67
            C149 47 139 35 126 28
            M160 67
            C158 43 160 28 160 17
            M160 67
            C171 45 182 34 194 29
          "
          stroke={colored ? "#71B95C" : "#D5E4CC"}
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />

        {/* 잎 하이라이트 */}
        <Path
          d="
            M160 67
            C149 47 139 35 126 28
            M160 67
            C158 43 160 28 160 17
            M160 67
            C171 45 182 34 194 29
          "
          stroke={colored ? "#A3D987" : "#E8F0E2"}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />

        {/* 몸통 하이라이트 */}
        <Ellipse
          cx="143"
          cy="105"
          rx="9"
          ry="19"
          fill={WHITE}
          opacity={colored ? 0.3 : 0.15}
          transform="rotate(-15 143 105)"
        />
      </G>
    </Svg>
  );
}

export default function CarrotTracingArtwork({
  isCompleted = false,
}: CarrotTracingArtworkProps) {
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
      {/* 처음 보여줄 연한 당근 */}
      <View style={StyleSheet.absoluteFill}>
        <CarrotSvg colored={false} />
      </View>

      {/* 완성되면 컬러 당근이 서서히 나타남 */}
      <AnimatedView
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, { opacity: colorOpacity }]}
      >
        <CarrotSvg colored />
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
