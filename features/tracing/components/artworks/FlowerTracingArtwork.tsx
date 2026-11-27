import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import Svg, { Circle, Ellipse, G, Path } from "react-native-svg";

const WHITE = "#FFFFFF";
const AnimatedView = Animated.View;

interface FlowerTracingArtworkProps {
  isCompleted?: boolean;
}

interface FlowerSvgProps {
  colored: boolean;
}

function FlowerSvg({ colored }: FlowerSvgProps) {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 320 240"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* 2.5배 확대 + 전체 그림 중앙 배치 */}
      <G transform="translate(35 -4) scale(2.5)">
        {/* 줄기 */}
        <Path
          d="M50 62 L50 90"
          stroke={colored ? "#71B95C" : "#D5E4CC"}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />

        {/* 잎 */}
        <Path
          d="M50 78 C40 76 34 82 32 90 C42 90 48 86 50 78Z"
          fill={colored ? "#75B85C" : "#DCEBD3"}
        />

        {/* 꽃잎 8장 */}
        <G>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <Ellipse
              key={angle}
              cx="50"
              cy="26"
              rx="9"
              ry="17"
              fill={colored ? "#FFC83D" : "#F5E7BD"}
              stroke="none"
              transform={`rotate(${angle} 50 50)`}
            />
          ))}
        </G>

        {/* 가운데 씨앗 원판 */}
        <Circle
          cx="50"
          cy="50"
          r="16"
          fill={colored ? "#925B35" : "#D8C5A9"}
          stroke="none"
        />

        {/* 씨앗 질감 */}
        <G fill={colored ? "#6F452C" : "#BDAA91"}>
          <Circle cx="45" cy="46" r="1.6" />
          <Circle cx="55" cy="46" r="1.6" />
          <Circle cx="50" cy="52" r="1.6" />
          <Circle cx="44" cy="54" r="1.6" />
          <Circle cx="56" cy="54" r="1.6" />
        </G>

        {/* 꽃잎 하이라이트 */}
        <Ellipse
          cx="47"
          cy="14"
          rx="3"
          ry="5"
          fill={WHITE}
          opacity={colored ? 0.35 : 0.15}
        />

        {/* 꽃 가운데 은은한 하이라이트 */}
        <Ellipse
          cx="45"
          cy="43"
          rx="4"
          ry="2.5"
          fill={WHITE}
          opacity={colored ? 0.25 : 0.12}
        />
      </G>
    </Svg>
  );
}

export default function FlowerTracingArtwork({
  isCompleted = false,
}: FlowerTracingArtworkProps) {
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
      {/* 연한 꽃 */}
      <View style={StyleSheet.absoluteFill}>
        <FlowerSvg colored={false} />
      </View>

      {/* 완성 후 컬러 꽃 */}
      <AnimatedView
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, { opacity: colorOpacity }]}
      >
        <FlowerSvg colored />
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
