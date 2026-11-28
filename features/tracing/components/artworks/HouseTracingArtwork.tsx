import React, { useEffect, useRef } from "react";

import { Animated, Easing, StyleSheet, View } from "react-native";

import Svg, { Circle, G, Path, Rect } from "react-native-svg";

const WHITE = "#FFFFFF";

const AnimatedView = Animated.View;

interface HouseTracingArtworkProps {
  isCompleted?: boolean;
}

interface HouseSvgProps {
  colored: boolean;
}

function HouseSvg({ colored }: HouseSvgProps) {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 320 240"
      preserveAspectRatio="xMidYMid meet"
    >
      <G>
        {/* 집 전체 외곽 - tracing guide와 동일한 경로 */}
        <Path
          d="
            M 160 25
            L 292 130
            L 265 130
            L 265 220
            L 55 220
            L 55 130
            L 28 130
            Z
          "
          fill={colored ? "#F5D9A9" : "#E9DFCC"}
        />

        {/* 지붕 */}
        <Path
          d="
            M 160 25
            L 292 130
            L 265 130
            L 160 47
            L 55 130
            L 28 130
            Z
          "
          fill={colored ? "#E87568" : "#F0C9C3"}
        />

        {/* 지붕 아래 장식 */}
        <Path
          d="M 55 130 L 265 130"
          stroke={colored ? "#D65E55" : "#DDBDB5"}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* 왼쪽 창문 */}
        <Rect
          x="78"
          y="148"
          width="48"
          height="43"
          rx="7"
          fill={colored ? "#A9DDF0" : "#DCEBF0"}
        />

        <Rect
          x="99"
          y="148"
          width="5"
          height="43"
          rx="2"
          fill={WHITE}
          opacity={colored ? 0.95 : 0.65}
        />

        <Path
          d="M 78 169.5 H 126"
          stroke={WHITE}
          strokeWidth="4"
          opacity={colored ? 0.95 : 0.65}
        />

        {/* 오른쪽 창문 */}
        <Rect
          x="194"
          y="148"
          width="48"
          height="43"
          rx="7"
          fill={colored ? "#A9DDF0" : "#DCEBF0"}
        />

        <Rect
          x="215"
          y="148"
          width="5"
          height="43"
          rx="2"
          fill={WHITE}
          opacity={colored ? 0.95 : 0.65}
        />

        <Path
          d="M 194 169.5 H 242"
          stroke={WHITE}
          strokeWidth="4"
          opacity={colored ? 0.95 : 0.65}
        />

        {/* 가운데 문 */}
        <Path
          d="
            M 139 220
            L 139 177
            Q 139 168 148 168
            L 172 168
            Q 181 168 181 177
            L 181 220
            Z
          "
          fill={colored ? "#C98B61" : "#D8C0A8"}
        />

        {/* 문 손잡이 */}
        <Circle
          cx="171"
          cy="198"
          r="3"
          fill={colored ? "#FFE8A8" : "#F5E8D5"}
        />

        {/* 지붕 장식 별 */}
        <Circle
          cx="160"
          cy="75"
          r="4"
          fill={WHITE}
          opacity={colored ? 0.9 : 0.55}
        />

        {/* 창문 반짝임 */}
        <Circle
          cx="88"
          cy="157"
          r="3"
          fill={WHITE}
          opacity={colored ? 0.9 : 0.5}
        />

        <Circle
          cx="204"
          cy="157"
          r="3"
          fill={WHITE}
          opacity={colored ? 0.9 : 0.5}
        />
      </G>
    </Svg>
  );
}

export default function HouseTracingArtwork({
  isCompleted = false,
}: HouseTracingArtworkProps) {
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
      {/* 처음 보여줄 연한 집 */}
      <View style={StyleSheet.absoluteFill}>
        <HouseSvg colored={false} />
      </View>

      {/* 완성되면 컬러 집이 서서히 나타남 */}
      <AnimatedView
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, { opacity: colorOpacity }]}
      >
        <HouseSvg colored />
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
