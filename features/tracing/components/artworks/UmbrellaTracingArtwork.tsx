import React, { useEffect, useRef } from "react";

import { Animated, Easing, StyleSheet, View } from "react-native";

import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

const WHITE = "#FFFFFF";

const AnimatedView = Animated.View;

interface UmbrellaTracingArtworkProps {
  isCompleted?: boolean;
}

interface UmbrellaSvgProps {
  colored: boolean;
}

// 우산 천 외곽선: 그리기 가이드와 동일한 경로
const UMBRELLA_CANOPY_PATH = `
  M 160 25
  C 91 25 35 78 25 145
  C 49 132 72 133 94 151
  C 115 168 138 166 160 145
  C 182 166 205 168 226 151
  C 248 133 271 132 295 145
  C 285 78 229 25 160 25
  Z
`;

function UmbrellaSvg({ colored }: UmbrellaSvgProps) {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 320 240"
      preserveAspectRatio="xMidYMid meet"
    >
      <Defs>
        <ClipPath id="umbrellaCanopyClip">
          <Path d={UMBRELLA_CANOPY_PATH} />
        </ClipPath>
      </Defs>

      {/* 우산 천 */}
      <G clipPath="url(#umbrellaCanopyClip)">
        {/* 기본 바탕 */}
        <Path d={UMBRELLA_CANOPY_PATH} fill={colored ? "#F6C85F" : "#F0E1BC"} />

        {/* 왼쪽 패널 */}
        <Path
          d="
            M 0 0
            H 105
            L 94 151
            L 25 145
            L 0 170
            Z
          "
          fill={colored ? "#69C5DF" : "#DCEBF0"}
        />

        {/* 가운데 왼쪽 패널 */}
        <Path
          d="
            M 105 0
            H 160
            L 160 145
            L 115 168
            L 94 151
            Z
          "
          fill={colored ? "#F4A261" : "#E8D2BE"}
        />

        {/* 가운데 오른쪽 패널 */}
        <Path
          d="
            M 160 0
            H 215
            L 226 151
            L 205 168
            L 160 145
            Z
          "
          fill={colored ? "#F6C85F" : "#F0E1BC"}
        />

        {/* 오른쪽 패널 */}
        <Path
          d="
            M 215 0
            H 320
            V 170
            L 295 145
            L 226 151
            Z
          "
          fill={colored ? "#E87568" : "#F0C9C3"}
        />

        {/* 부드러운 하이라이트 */}
        <Path
          d="M 67 91 Q 82 67 105 58"
          stroke={WHITE}
          strokeWidth="7"
          strokeLinecap="round"
          opacity={colored ? 0.5 : 0.35}
          fill="none"
        />

        <Path
          d="M 220 57 Q 245 70 259 94"
          stroke={WHITE}
          strokeWidth="7"
          strokeLinecap="round"
          opacity={colored ? 0.5 : 0.35}
          fill="none"
        />
      </G>

      {/* 우산 천의 외곽선 */}
      <Path
        d={UMBRELLA_CANOPY_PATH}
        fill="none"
        stroke={colored ? "#D98A58" : "#D7C1AB"}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* 우산 꼭대기 장식 */}
      <Path
        d="M 160 25 Q 154 15 160 12 Q 166 15 160 25"
        fill={colored ? "#E87568" : "#F0C9C3"}
      />

      {/* 손잡이 - 그리기 미션에는 포함하지 않음 */}
      <Path
        d="
          M 160 145
          L 160 198
          C 160 222 175 232 190 224
          C 200 218 199 207 192 198
        "
        stroke={colored ? "#A66C48" : "#C9B6A2"}
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* 손잡이 끝 장식 */}
      <Path
        d="M 185 222 Q 195 219 192 207"
        stroke={WHITE}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity={colored ? 0.55 : 0.35}
        fill="none"
      />
    </Svg>
  );
}

export default function UmbrellaTracingArtwork({
  isCompleted = false,
}: UmbrellaTracingArtworkProps) {
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
      {/* 연한 우산 */}
      <View style={StyleSheet.absoluteFill}>
        <UmbrellaSvg colored={false} />
      </View>

      {/* 완성 후 컬러 우산 */}
      <AnimatedView
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, { opacity: colorOpacity }]}
      >
        <UmbrellaSvg colored />
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
