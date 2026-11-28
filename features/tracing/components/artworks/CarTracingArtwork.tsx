// import React, { useEffect, useRef } from "react";

// import { Animated, Easing, StyleSheet, View } from "react-native";

// import Svg, { Circle, Ellipse, Path } from "react-native-svg";

// const WHITE = "#FFFFFF";
// const OUTLINE = "#526575";

// const AnimatedView = Animated.View;

// interface CarTracingArtworkProps {
//   isCompleted?: boolean;
// }

// interface CarSvgProps {
//   colored: boolean;
// }

// function CarSvg({ colored }: CarSvgProps) {
//   const colors = {
//     base: colored ? "#69C5DF" : "#DCEBF0",
//     dark: colored ? "#BDEAF4" : "#EAF5F7",
//     darker: colored ? "#526575" : "#B9C5C9",
//   };

//   return (
//     <Svg
//       width="100%"
//       height="100%"
//       viewBox="0 0 100 100"
//       preserveAspectRatio="xMidYMid meet"
//     >
//       {/* 자동차 차체 */}
//       <Path
//         d="
//           M12 62
//           C12 50 20 50 28 50
//           L36 34
//           C38 30 42 28 48 28
//           L64 28
//           C70 28 74 30 76 34
//           L82 50
//           C90 50 90 56 90 62
//           L90 68
//           L12 68
//           Z
//         "
//         fill={colors.base}
//         stroke={OUTLINE}
//         strokeWidth="4"
//         strokeLinejoin="round"
//       />

//       {/* 자동차 창문 */}
//       <Path
//         d="M40 50 L46 36 L62 36 L68 50 Z"
//         fill={colors.dark}
//         stroke={OUTLINE}
//         strokeWidth="3"
//         strokeLinejoin="round"
//       />

//       {/* 왼쪽 바퀴 */}
//       <Circle
//         cx="30"
//         cy="70"
//         r="11"
//         fill={colors.darker}
//         stroke={OUTLINE}
//         strokeWidth="3"
//       />

//       {/* 오른쪽 바퀴 */}
//       <Circle
//         cx="70"
//         cy="70"
//         r="11"
//         fill={colors.darker}
//         stroke={OUTLINE}
//         strokeWidth="3"
//       />

//       {/* 바퀴 중심 */}
//       <Circle cx="30" cy="70" r="4" fill={colors.dark} />
//       <Circle cx="70" cy="70" r="4" fill={colors.dark} />

//       {/* 차체 하이라이트 */}
//       <Ellipse cx="26" cy="56" rx="6" ry="4" fill={WHITE} opacity={0.35} />
//     </Svg>
//   );
// }

// export default function CarTracingArtwork({
//   isCompleted = false,
// }: CarTracingArtworkProps) {
//   const colorOpacity = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     colorOpacity.stopAnimation();

//     if (!isCompleted) {
//       colorOpacity.setValue(0);
//       return;
//     }

//     Animated.timing(colorOpacity, {
//       toValue: 1,
//       duration: 700,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: true,
//     }).start();

//     return () => colorOpacity.stopAnimation();
//   }, [isCompleted, colorOpacity]);

//   return (
//     <View style={styles.container}>
//       {/* 연한 자동차 */}
//       <View style={StyleSheet.absoluteFill}>
//         <CarSvg colored={false} />
//       </View>

//       {/* 완성 후 컬러 자동차 */}
//       <AnimatedView
//         pointerEvents="none"
//         style={[StyleSheet.absoluteFill, { opacity: colorOpacity }]}
//       >
//         <CarSvg colored />
//       </AnimatedView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     height: "100%",
//   },
// });

import React, { useEffect, useRef } from "react";

import { Animated, Easing, StyleSheet, View } from "react-native";

import Svg, { Circle, Ellipse, Path } from "react-native-svg";

const WHITE = "#FFFFFF";

const AnimatedView = Animated.View;

interface CarTracingArtworkProps {
  isCompleted?: boolean;
}

interface CarSvgProps {
  colored: boolean;
}

// 자동차 차체 외곽
const CAR_BODY_PATH = `
  M 35 151
  C 35 139 43 132 57 130
  L 76 88
  C 82 74 94 65 111 65
  L 201 65
  C 219 65 232 75 239 91
  L 257 130
  C 275 132 285 140 285 153
  L 285 164
  C 285 173 279 179 269 179
  L 51 179
  C 41 179 35 172 35 163
  Z
`;

// 자동차 창문
const CAR_WINDOW_PATH = `
  M 91 126
  L 108 83
  C 111 76 117 73 126 73
  L 151 73
  L 151 126
  Z

  M 160 73
  L 200 73
  C 213 73 222 81 228 95
  L 241 126
  L 160 126
  Z
`;

function CarSvg({ colored }: CarSvgProps) {
  const colors = {
    body: colored ? "#69C5DF" : "#DCEBF0",
    window: colored ? "#BDEAF4" : "#EAF5F7",
    wheel: colored ? "#526575" : "#B9C5C9",
    wheelCenter: colored ? "#BDEAF4" : "#EAF5F7",
    outline: colored ? "#D98A58" : "#D7C1AB",
    highlight: WHITE,
  };

  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 320 240"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* 자동차 차체 */}
      <Path
        d={CAR_BODY_PATH}
        fill={colors.body}
        stroke={colors.outline}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* 자동차 창문 */}
      <Path
        d={CAR_WINDOW_PATH}
        fill={colors.window}
        stroke={colors.outline}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* 왼쪽 바퀴 */}
      <Circle
        cx="96"
        cy="178"
        r="24"
        fill={colors.wheel}
        stroke={colors.outline}
        strokeWidth="3"
      />

      {/* 오른쪽 바퀴 */}
      <Circle
        cx="226"
        cy="178"
        r="24"
        fill={colors.wheel}
        stroke={colors.outline}
        strokeWidth="3"
      />

      {/* 왼쪽 바퀴 중심 */}
      <Circle cx="96" cy="178" r="9" fill={colors.wheelCenter} />

      {/* 오른쪽 바퀴 중심 */}
      <Circle cx="226" cy="178" r="9" fill={colors.wheelCenter} />

      {/* 차체 하이라이트 */}
      <Path
        d="M 58 145 Q 68 137 83 137"
        stroke={colors.highlight}
        strokeWidth="6"
        strokeLinecap="round"
        opacity={colored ? 0.55 : 0.35}
        fill="none"
      />

      {/* 지붕 하이라이트 */}
      <Path
        d="M 116 81 Q 125 75 139 76"
        stroke={colors.highlight}
        strokeWidth="4"
        strokeLinecap="round"
        opacity={colored ? 0.5 : 0.3}
        fill="none"
      />

      {/* 앞쪽 헤드라이트 */}
      <Ellipse
        cx="275"
        cy="148"
        rx="5"
        ry="8"
        fill={colored ? "#FFF1B8" : "#F6E8C8"}
      />

      {/* 뒤쪽 후미등 */}
      <Ellipse
        cx="43"
        cy="150"
        rx="4"
        ry="7"
        fill={colored ? "#E87568" : "#F0C9C3"}
      />
    </Svg>
  );
}

export default function CarTracingArtwork({
  isCompleted = false,
}: CarTracingArtworkProps) {
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
      {/* 연한 자동차 */}
      <View style={StyleSheet.absoluteFill}>
        <CarSvg colored={false} />
      </View>

      {/* 완성 후 컬러 자동차 */}
      <AnimatedView
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, { opacity: colorOpacity }]}
      >
        <CarSvg colored />
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
