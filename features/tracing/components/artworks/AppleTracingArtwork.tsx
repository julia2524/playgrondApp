// import React from "react";
// import Svg, { Ellipse, G, Path } from "react-native-svg";

// const OUTLINE = "#684B3B";
// const WHITE = "#FFFFFF";

// /**
//  * 사과 컬러 그림
//  * createShapeTracingGuide와 동일한 320 x 240 좌표계
//  *
//  * 몸통의 외곽선은 일부러 제거한다.
//  * 외곽선은 TracingCanvas의 점선 가이드가 담당한다.
//  */
// export default function AppleTracingArtwork() {
//   return (
//     <Svg
//       width="100%"
//       height="100%"
//       viewBox="0 0 320 240"
//       preserveAspectRatio="xMidYMid meet"
//     >
//       <G transform="translate(40 0) scale(2.4)">
//         {/* 사과 몸통 */}
//         <Path
//           d="
//             M50 28
//             C42 20 26 23 20 38
//             C13 56 23 82 50 82
//             C77 82 87 56 80 38
//             C74 23 58 20 50 28Z
//           "
//           fill="#F45D62"
//           stroke="none"
//         />

//         {/* 사과 꼭지 */}
//         <Path
//           d="M50 28 C50 20 54 15 61 12"
//           stroke="#79513A"
//           strokeWidth="5"
//           strokeLinecap="round"
//           fill="none"
//         />

//         {/* 잎 */}
//         <Path
//           d="M56 18 C67 12 77 16 79 25 C68 28 61 25 56 18Z"
//           fill="#71C66B"
//           stroke={OUTLINE}
//           strokeWidth="2"
//           strokeLinejoin="round"
//         />

//         {/* 반짝이는 하이라이트 */}
//         <Ellipse
//           cx="34"
//           cy="45"
//           rx="8"
//           ry="13"
//           fill={WHITE}
//           opacity={0.35}
//           transform="rotate(25 34 45)"
//         />
//       </G>
//     </Svg>
//   );
// }

import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import Svg, { Ellipse, G, Path } from "react-native-svg";

const OUTLINE = "#684B3B";
const WHITE = "#FFFFFF";

const AnimatedView = Animated.View;

interface AppleTracingArtworkProps {
  isCompleted?: boolean;
}

interface AppleSvgProps {
  colored: boolean;
}

function AppleSvg({ colored }: AppleSvgProps) {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 320 240"
      preserveAspectRatio="xMidYMid meet"
    >
      <G transform="translate(40 0) scale(2.4)">
        {/* 사과 몸통 */}
        <Path
          d="
            M50 28
            C42 20 26 23 20 38
            C13 56 23 82 50 82
            C77 82 87 56 80 38
            C74 23 58 20 50 28Z
          "
          fill={colored ? "#F45D62" : "#F5DAD5"}
          stroke="none"
        />

        {/* 사과 꼭지 */}
        <Path
          d="M50 28 C50 20 54 15 61 12"
          stroke={colored ? "#79513A" : "#D0BEB1"}
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />

        {/* 잎 */}
        <Path
          d="M56 18 C67 12 77 16 79 25 C68 28 61 25 56 18Z"
          fill={colored ? "#71C66B" : "#DCEBD5"}
          stroke={colored ? OUTLINE : "#C4D2BD"}
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* 반짝이는 하이라이트 */}
        <Ellipse
          cx="34"
          cy="45"
          rx="8"
          ry="13"
          fill={WHITE}
          opacity={colored ? 0.35 : 0.15}
          transform="rotate(25 34 45)"
        />
      </G>
    </Svg>
  );
}

export default function AppleTracingArtwork({
  isCompleted = false,
}: AppleTracingArtworkProps) {
  const colorOpacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    // 이전 애니메이션 중단
    colorOpacity.stopAnimation();

    // 재도전 또는 새 스테이지에서는 회색으로 초기화
    if (!isCompleted) {
      colorOpacity.setValue(0);
      return;
    }

    // 성공하면 컬러 애니메이션
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
      {/* 처음 보여줄 연한 사과 */}
      <View style={StyleSheet.absoluteFill}>
        <AppleSvg colored={false} />
      </View>

      {/* 완성되면 컬러 사과가 서서히 나타남 */}
      <AnimatedView
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, { opacity: colorOpacity }]}
      >
        <AppleSvg colored />
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
