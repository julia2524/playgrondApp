import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import Svg, { Circle, Ellipse, G, Path } from "react-native-svg";

const WHITE = "#FFFFFF";
const AnimatedView = Animated.View;

interface MushroomTracingArtworkProps {
  isCompleted?: boolean;
}

interface MushroomSvgProps {
  colored: boolean;
}

function MushroomSvg({ colored }: MushroomSvgProps) {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 320 240"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* 2.5배 확대 + 중앙 배치 */}
      <G transform="translate(-27.5 -78.75) scale(3.75)">
        {/* 버섯 갓 */}
        <Path
          d="
            M17 52
            C18 28 36 17 50 17
            C64 17 82 28 83 52
            Z
          "
          fill={colored ? "#E85D55" : "#F0C9C3"}
        />

        {/* 버섯 줄기 */}
        <Path
          d="
            M38 52
            L62 52
            L66 82
            Q50 89 34 82
            Z
          "
          fill={colored ? "#F5D9A9" : "#E9DFCC"}
        />

        {/* 갓의 흰색 점 */}
        <Circle
          cx="38"
          cy="37"
          r="6"
          fill={WHITE}
          opacity={colored ? 0.9 : 0.55}
        />
        <Circle
          cx="61"
          cy="31"
          r="5"
          fill={WHITE}
          opacity={colored ? 0.9 : 0.55}
        />

        {/* 갓 하이라이트 */}
        <Ellipse
          cx="34"
          cy="30"
          rx="5"
          ry="9"
          fill={WHITE}
          opacity={colored ? 0.35 : 0.15}
          transform="rotate(30 34 30)"
        />

        {/* 줄기 하이라이트 */}
        <Path
          d="M42 58 Q40 68 42 78"
          stroke={WHITE}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity={colored ? 0.4 : 0.2}
        />

        {/* 갓 아래쪽의 은은한 음영 */}
        <Path
          d="M20 50 Q50 55 80 50"
          stroke={colored ? "#C94B45" : "#DDBDB5"}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity={colored ? 0.35 : 0.2}
        />
      </G>
    </Svg>
  );
}

export default function MushroomTracingArtwork({
  isCompleted = false,
}: MushroomTracingArtworkProps) {
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
      {/* 처음 보여줄 연한 버섯 */}
      <View style={StyleSheet.absoluteFill}>
        <MushroomSvg colored={false} />
      </View>

      {/* 완성되면 컬러 버섯이 서서히 나타남 */}
      <AnimatedView
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, { opacity: colorOpacity }]}
      >
        <MushroomSvg colored />
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
