import React, { useEffect, useRef } from "react";

import { Animated, Easing, StyleSheet, View } from "react-native";

import Svg, { Path } from "react-native-svg";

const WHITE = "#FFFFFF";

const AnimatedView = Animated.View;

interface SailboatTracingArtworkProps {
  isCompleted?: boolean;
}

interface SailboatSvgProps {
  colored: boolean;
}

function SailboatSvg({ colored }: SailboatSvgProps) {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 320 240"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* 배 몸체 */}
      <Path
        d="
          M 57.6 156
          H 262.4
          Q 243.2 201.6 160 206.4
          Q 76.8 201.6 57.6 156
          Z
        "
        fill={colored ? "#F5D9A9" : "#E9DFCC"}
      />

      {/* 왼쪽 돛 */}
      <Path
        d="
          M 150.4 60
          L 80 136.8
          H 150.4
          Z
        "
        fill={colored ? "#F4A261" : "#E8D2BE"}
      />

      {/* 오른쪽 돛 */}
      <Path
        d="
          M 169.6 60
          L 243.2 136.8
          H 169.6
          Z
        "
        fill={colored ? "#69C5DF" : "#DCEBF0"}
      />

      {/* 돛대 */}
      <Path
        d="M 160 48 V 156"
        stroke={colored ? "#A66C48" : "#C9B6A2"}
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />

      {/* 배 몸체 장식 */}
      <Path
        d="M 92 174 Q 160 190 228 174"
        stroke={colored ? "#D6A66F" : "#D5C4AD"}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        opacity={0.8}
      />

      {/* 배의 반짝임 */}
      <Path
        d="M 135 193 Q 160 197 185 193"
        stroke={WHITE}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        opacity={colored ? 0.7 : 0.4}
      />

      {/* 물결 */}
      <Path
        d="
          M 64 220
          Q 96 201 128 220
          Q 160 239 192 220
          Q 224 201 256 220
        "
        fill="none"
        stroke={colored ? "#69C5DF" : "#DCEBF0"}
        strokeWidth="6"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default function SailboatTracingArtwork({
  isCompleted = false,
}: SailboatTracingArtworkProps) {
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

    return () => colorOpacity.stopAnimation();
  }, [isCompleted, colorOpacity]);

  return (
    <View style={styles.container}>
      {/* 연한 돛단배 */}
      <View style={StyleSheet.absoluteFill}>
        <SailboatSvg colored={false} />
      </View>

      {/* 완성 후 컬러 돛단배 */}
      <AnimatedView
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, { opacity: colorOpacity }]}
      >
        <SailboatSvg colored />
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
