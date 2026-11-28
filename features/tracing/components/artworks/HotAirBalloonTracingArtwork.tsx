// import React, { useEffect, useRef } from "react";
// import { Animated, Easing, StyleSheet, View } from "react-native";
// import Svg, { Circle, ClipPath, Defs, G, Path, Rect } from "react-native-svg";

// const AnimatedG = Animated.createAnimatedComponent(G);

// interface HotAirBalloonTracingArtworkProps {
//   isCompleted: boolean;
// }

// // 윗부분은 둥글고 아래쪽은 좁아지는 전형적인 열기구(전구) 실루엣
// const BALLOON_PATH = `
//   M 160 18
//   C 104 18 72 56 72 100
//   C 72 134 106 154 126 176
//   L 194 176
//   C 214 154 248 134 248 100
//   C 248 56 216 18 160 18
//   Z
// `;

// // 5개의 세로 패널 패스 (좌측 끝 -> 중앙 -> 우측 끝)
// const PANEL_1 = `M 160 18 C 104 18 72 56 72 100 C 72 134 106 154 126 176 L 138 176 C 122 154 102 132 102 98 C 102 58 126 24 160 18 Z`;
// const PANEL_2 = `M 160 18 C 126 24 102 58 102 98 C 102 132 122 154 138 176 L 151 176 C 142 152 136 128 136 98 C 136 58 146 26 160 18 Z`;
// const PANEL_3 = `M 160 18 C 146 26 136 58 136 98 C 136 128 142 152 151 176 L 169 176 C 178 152 184 128 184 98 C 184 58 174 26 160 18 Z`;
// const PANEL_4 = `M 160 18 C 174 26 184 58 184 98 C 184 128 178 152 169 176 L 182 176 C 198 154 218 132 218 98 C 218 58 194 24 160 18 Z`;
// const PANEL_5 = `M 160 18 C 194 24 218 58 218 98 C 218 132 198 154 182 176 L 194 176 C 214 154 248 134 248 100 C 248 56 216 18 160 18 Z`;

// const HotAirBalloonTracingArtwork = ({
//   isCompleted,
// }: HotAirBalloonTracingArtworkProps) => {
//   const colorAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.timing(colorAnim, {
//       toValue: isCompleted ? 1 : 0,
//       duration: 700,
//       easing: Easing.out(Easing.ease),
//       useNativeDriver: true,
//     }).start();
//   }, [isCompleted, colorAnim]);

//   const paleOpacity = colorAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [1, 0],
//   });

//   const colorOpacity = colorAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, 1],
//   });

//   return (
//     <View style={styles.container}>
//       <Svg
//         width="100%"
//         height="100%"
//         viewBox="0 0 320 240"
//         preserveAspectRatio="xMidYMid meet"
//       >
//         <Defs>
//           <ClipPath id="hotAirBalloonClip">
//             <Path d={BALLOON_PATH} />
//           </ClipPath>
//         </Defs>

//         {/* 풍선 기본 바탕 */}
//         <Path d={BALLOON_PATH} fill="#FFF9EE" />

//         {/* 1. 완성 상태: 선명하고 알록달록한 컬러 패널 */}
//         <AnimatedG opacity={colorOpacity}>
//           <G clipPath="url(#hotAirBalloonClip)">
//             <Path d={PANEL_1} fill="#FF7B72" />
//             <Path d={PANEL_2} fill="#FFD166" />
//             <Path d={PANEL_3} fill="#6BCBEF" />
//             <Path d={PANEL_4} fill="#FFD166" />
//             <Path d={PANEL_5} fill="#FF7B72" />
//             {/* 패널 사이 경계선 */}
//             <Path
//               d="M 160 18 C 126 24 102 58 102 98 C 102 132 122 154 138 176"
//               stroke="#8C735B"
//               strokeWidth={2}
//               fill="none"
//               opacity={0.4}
//             />
//             <Path
//               d="M 160 18 C 146 26 136 58 136 98 C 136 128 142 152 151 176"
//               stroke="#8C735B"
//               strokeWidth={2}
//               fill="none"
//               opacity={0.4}
//             />
//             <Path
//               d="M 160 18 C 174 26 184 58 184 98 C 184 128 178 152 169 176"
//               stroke="#8C735B"
//               strokeWidth={2}
//               fill="none"
//               opacity={0.4}
//             />
//             <Path
//               d="M 160 18 C 194 24 218 58 218 98 C 218 132 198 154 182 176"
//               stroke="#8C735B"
//               strokeWidth={2}
//               fill="none"
//               opacity={0.4}
//             />
//             {/* 좌측 상단 광택 하이라이트 */}
//             <Path
//               d="M 96 68 Q 108 42 132 32"
//               stroke="#FFFFFF"
//               strokeWidth={6}
//               strokeLinecap="round"
//               opacity={0.65}
//               fill="none"
//             />
//             <Circle cx="90" cy="82" r="3" fill="#FFFFFF" opacity={0.65} />
//             {/* 아기자기한 별과 도트 장식 */}
//             <Path
//               d="M 160 72 L 163 79 L 170 82 L 163 85 L 160 92 L 157 85 L 150 82 L 157 79 Z"
//               fill="#FFFFFF"
//               opacity={0.9}
//             />
//             <Circle cx="120" cy="112" r="3.5" fill="#FFFFFF" opacity={0.8} />
//             <Circle cx="200" cy="112" r="3.5" fill="#FFFFFF" opacity={0.8} />
//           </G>
//         </AnimatedG>

//         {/* 2. 미완성 상태: 은은한 파스텔 톤 패널 */}
//         <AnimatedG opacity={paleOpacity}>
//           <G clipPath="url(#hotAirBalloonClip)">
//             <Path d={PANEL_1} fill="#F7E4E1" />
//             <Path d={PANEL_2} fill="#FAF0D7" />
//             <Path d={PANEL_3} fill="#E3F2F8" />
//             <Path d={PANEL_4} fill="#FAF0D7" />
//             <Path d={PANEL_5} fill="#F7E4E1" />

//             {/* 미완성 상태 패널 가이드선 */}
//             <Path
//               d="M 160 18 C 126 24 102 58 102 98 C 102 132 122 154 138 176"
//               stroke="#D5C7B8"
//               strokeWidth={1.5}
//               fill="none"
//             />
//             <Path
//               d="M 160 18 C 146 26 136 58 136 98 C 136 128 142 152 151 176"
//               stroke="#D5C7B8"
//               strokeWidth={1.5}
//               fill="none"
//             />
//             <Path
//               d="M 160 18 C 174 26 184 58 184 98 C 184 128 178 152 169 176"
//               stroke="#D5C7B8"
//               strokeWidth={1.5}
//               fill="none"
//             />
//             <Path
//               d="M 160 18 C 194 24 218 58 218 98 C 218 132 198 154 182 176"
//               stroke="#D5C7B8"
//               strokeWidth={1.5}
//               fill="none"
//             />
//           </G>
//         </AnimatedG>

//         {/* 풍선 꼭대기 크라운(꼭지) 장식 */}
//         <Path
//           d="M 152 18 Q 160 8 168 18"
//           fill="#FFD166"
//           stroke="#8C735B"
//           strokeWidth={3}
//           strokeLinejoin="round"
//         />

//         {/* 풍선 외곽선 */}
//         <Path
//           d={BALLOON_PATH}
//           fill="none"
//           stroke="#8C735B"
//           strokeWidth={3.5}
//           strokeLinejoin="round"
//         />

//         {/* 풍선 하단 입구(스커트) 마감 테두리 */}
//         <Rect
//           x="123"
//           y="172"
//           width="74"
//           height="7"
//           rx="3.5"
//           fill="#F4A261"
//           stroke="#8C735B"
//           strokeWidth={3}
//         />

//         {/* 버너 불꽃 (완성 시 선명하게 빛남) */}
//         <AnimatedG opacity={colorOpacity}>
//           <Path
//             d="M 155 189 Q 160 179 165 189 Q 160 192 155 189 Z"
//             fill="#FF9F1C"
//             stroke="#E76F51"
//             strokeWidth={1.5}
//           />
//         </AnimatedG>

//         {/* 바구니 연결 로프 (4가닥 입체 표현) */}
//         <Path
//           d="
//             M 132 179 L 139 198
//             M 148 179 L 150 198
//             M 172 179 L 170 198
//             M 188 179 L 181 198
//           "
//           stroke="#8C735B"
//           strokeWidth={2.5}
//           strokeLinecap="round"
//           fill="none"
//         />

//         {/* 바구니 몸체 */}
//         <Path
//           d="
//             M 135 198
//             L 185 198
//             L 180 222
//             Q 179 227 174 227
//             L 146 227
//             Q 141 227 140 222
//             Z
//           "
//           fill="#E6B88A"
//           stroke="#8C735B"
//           strokeWidth={3.5}
//           strokeLinejoin="round"
//         />

//         {/* 바구니 윗 테두리 (쿠션감 있는 둥근 림) */}
//         <Rect
//           x="131"
//           y="195"
//           width="58"
//           height="7"
//           rx="3.5"
//           fill="#D49A6A"
//           stroke="#8C735B"
//           strokeWidth={3}
//         />

//         {/* 바구니 가로세로 짜임 무늬 */}
//         <Path
//           d="
//             M 149 202 L 148 226
//             M 160 202 L 160 226
//             M 171 202 L 172 226
//             M 138 211 L 182 211
//             M 139 219 L 181 219
//           "
//           stroke="#A8764C"
//           strokeWidth={2}
//           strokeLinecap="round"
//           fill="none"
//           opacity={0.7}
//         />
//       </Svg>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     height: "100%",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// export default HotAirBalloonTracingArtwork;

import React, { useEffect, useRef } from "react";

import { Animated, Easing, StyleSheet, View } from "react-native";

import Svg, { Circle, ClipPath, Defs, G, Path, Rect } from "react-native-svg";

const AnimatedG = Animated.createAnimatedComponent(G);

interface HotAirBalloonTracingArtworkProps {
  isCompleted: boolean;
}

// 열기구 풍선 외곽 실루엣
const BALLOON_PATH = `
  M 160 18
  C 104 18 72 56 72 100
  C 72 134 106 154 126 176
  L 194 176
  C 214 154 248 134 248 100
  C 248 56 216 18 160 18
  Z
`;

// 5개의 세로 패널
const PANEL_1 = `M 160 18 C 104 18 72 56 72 100 C 72 134 106 154 126 176 L 138 176 C 122 154 102 132 102 98 C 102 58 126 24 160 18 Z`;

const PANEL_2 = `M 160 18 C 126 24 102 58 102 98 C 102 132 122 154 138 176 L 151 176 C 142 152 136 128 136 98 C 136 58 146 26 160 18 Z`;

const PANEL_3 = `M 160 18 C 146 26 136 58 136 98 C 136 128 142 152 151 176 L 169 176 C 178 152 184 128 184 98 C 184 58 174 26 160 18 Z`;

const PANEL_4 = `M 160 18 C 174 26 184 58 184 98 C 184 128 178 152 169 176 L 182 176 C 198 154 218 132 218 98 C 218 58 194 24 160 18 Z`;

const PANEL_5 = `M 160 18 C 194 24 218 58 218 98 C 218 132 198 154 182 176 L 194 176 C 214 154 248 134 248 100 C 248 56 216 18 160 18 Z`;

const HotAirBalloonTracingArtwork = ({
  isCompleted,
}: HotAirBalloonTracingArtworkProps) => {
  const colorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(colorAnim, {
      toValue: isCompleted ? 1 : 0,
      duration: 700,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [isCompleted, colorAnim]);

  const paleOpacity = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const colorOpacity = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 320 240"
        preserveAspectRatio="xMidYMid meet"
      >
        <Defs>
          <ClipPath id="hotAirBalloonClip">
            <Path d={BALLOON_PATH} />
          </ClipPath>
        </Defs>

        {/* 풍선 기본 바탕 */}
        <Path d={BALLOON_PATH} fill="#FFF9EE" />

        {/* ================================== */}
        {/* 1. 완성 상태 - 선명한 컬러 풍선 */}
        {/* ================================== */}
        <AnimatedG opacity={colorOpacity}>
          <G clipPath="url(#hotAirBalloonClip)">
            <Path d={PANEL_1} fill="#FF7B72" />
            <Path d={PANEL_2} fill="#FFD166" />
            <Path d={PANEL_3} fill="#6BCBEF" />
            <Path d={PANEL_4} fill="#FFD166" />
            <Path d={PANEL_5} fill="#FF7B72" />

            {/* 패널 사이 경계선 */}
            <Path
              d="M 160 18 C 126 24 102 58 102 98 C 102 132 122 154 138 176"
              stroke="#8C735B"
              strokeWidth={2}
              fill="none"
              opacity={0.4}
            />

            <Path
              d="M 160 18 C 146 26 136 58 136 98 C 136 128 142 152 151 176"
              stroke="#8C735B"
              strokeWidth={2}
              fill="none"
              opacity={0.4}
            />

            <Path
              d="M 160 18 C 174 26 184 58 184 98 C 184 128 178 152 169 176"
              stroke="#8C735B"
              strokeWidth={2}
              fill="none"
              opacity={0.4}
            />

            <Path
              d="M 160 18 C 194 24 218 58 218 98 C 218 132 198 154 182 176"
              stroke="#8C735B"
              strokeWidth={2}
              fill="none"
              opacity={0.4}
            />

            {/* 좌측 상단 광택 */}
            <Path
              d="M 96 68 Q 108 42 132 32"
              stroke="#FFFFFF"
              strokeWidth={6}
              strokeLinecap="round"
              opacity={0.65}
              fill="none"
            />

            <Circle cx="90" cy="82" r="3" fill="#FFFFFF" opacity={0.65} />

            {/* 별 장식 */}
            <Path
              d="M 160 72 L 163 79 L 170 82 L 163 85 L 160 92 L 157 85 L 150 82 L 157 79 Z"
              fill="#FFFFFF"
              opacity={0.9}
            />

            <Circle cx="120" cy="112" r="3.5" fill="#FFFFFF" opacity={0.8} />
            <Circle cx="200" cy="112" r="3.5" fill="#FFFFFF" opacity={0.8} />
          </G>
        </AnimatedG>

        {/* ================================== */}
        {/* 2. 미완성 상태 - 파스텔 풍선 */}
        {/* ================================== */}
        <AnimatedG opacity={paleOpacity}>
          <G clipPath="url(#hotAirBalloonClip)">
            <Path d={PANEL_1} fill="#F7E4E1" />
            <Path d={PANEL_2} fill="#FAF0D7" />
            <Path d={PANEL_3} fill="#E3F2F8" />
            <Path d={PANEL_4} fill="#FAF0D7" />
            <Path d={PANEL_5} fill="#F7E4E1" />

            {/* 미완성 패널 가이드선 */}
            <Path
              d="M 160 18 C 126 24 102 58 102 98 C 102 132 122 154 138 176"
              stroke="#D5C7B8"
              strokeWidth={1.5}
              fill="none"
            />

            <Path
              d="M 160 18 C 146 26 136 58 136 98 C 136 128 142 152 151 176"
              stroke="#D5C7B8"
              strokeWidth={1.5}
              fill="none"
            />

            <Path
              d="M 160 18 C 174 26 184 58 184 98 C 184 128 178 152 169 176"
              stroke="#D5C7B8"
              strokeWidth={1.5}
              fill="none"
            />

            <Path
              d="M 160 18 C 194 24 218 58 218 98 C 218 132 198 154 182 176"
              stroke="#D5C7B8"
              strokeWidth={1.5}
              fill="none"
            />
          </G>
        </AnimatedG>

        {/* ================================== */}
        {/* 3. 풍선 꼭대기 장식 */}
        {/* ================================== */}

        {/* 파스텔 */}
        <AnimatedG opacity={paleOpacity}>
          <Path
            d="M 152 18 Q 160 8 168 18"
            fill="#FAF0D7"
            stroke="#D5C7B8"
            strokeWidth={3}
            strokeLinejoin="round"
          />
        </AnimatedG>

        {/* 완성 컬러 */}
        <AnimatedG opacity={colorOpacity}>
          <Path
            d="M 152 18 Q 160 8 168 18"
            fill="#FFD166"
            stroke="#8C735B"
            strokeWidth={3}
            strokeLinejoin="round"
          />
        </AnimatedG>

        {/* 풍선 외곽선 */}
        <Path
          d={BALLOON_PATH}
          fill="none"
          stroke="#8C735B"
          strokeWidth={3.5}
          strokeLinejoin="round"
        />

        {/* ================================== */}
        {/* 4. 열기구 하단 - 미완성 파스텔 */}
        {/* ================================== */}
        <AnimatedG opacity={paleOpacity}>
          {/* 풍선 하단 입구 */}
          <Rect
            x="123"
            y="172"
            width="74"
            height="7"
            rx="3.5"
            fill="#FAEBDD"
            stroke="#D5C7B8"
            strokeWidth={3}
          />

          {/* 버너 불꽃 */}
          <Path
            d="M 155 189 Q 160 179 165 189 Q 160 192 155 189 Z"
            fill="#F9DDB8"
            stroke="#E8C9B0"
            strokeWidth={1.5}
          />

          {/* 바구니 연결 로프 */}
          <Path
            d="
              M 132 179 L 139 198
              M 148 179 L 150 198
              M 172 179 L 170 198
              M 188 179 L 181 198
            "
            stroke="#D5C7B8"
            strokeWidth={2.5}
            strokeLinecap="round"
            fill="none"
          />

          {/* 바구니 몸체 */}
          <Path
            d="
              M 135 198
              L 185 198
              L 180 222
              Q 179 227 174 227
              L 146 227
              Q 141 227 140 222
              Z
            "
            fill="#F5E5D5"
            stroke="#D5C7B8"
            strokeWidth={3.5}
            strokeLinejoin="round"
          />

          {/* 바구니 윗 테두리 */}
          <Rect
            x="131"
            y="195"
            width="58"
            height="7"
            rx="3.5"
            fill="#EBDCCB"
            stroke="#D5C7B8"
            strokeWidth={3}
          />

          {/* 바구니 짜임 무늬 */}
          <Path
            d="
              M 149 202 L 148 226
              M 160 202 L 160 226
              M 171 202 L 172 226
              M 138 211 L 182 211
              M 139 219 L 181 219
            "
            stroke="#D5C7B8"
            strokeWidth={2}
            strokeLinecap="round"
            fill="none"
            opacity={0.7}
          />
        </AnimatedG>

        {/* ================================== */}
        {/* 5. 열기구 하단 - 완성 컬러 */}
        {/* ================================== */}
        <AnimatedG opacity={colorOpacity}>
          {/* 풍선 하단 입구 */}
          <Rect
            x="123"
            y="172"
            width="74"
            height="7"
            rx="3.5"
            fill="#F4A261"
            stroke="#8C735B"
            strokeWidth={3}
          />

          {/* 버너 불꽃 */}
          <Path
            d="M 155 189 Q 160 179 165 189 Q 160 192 155 189 Z"
            fill="#FF9F1C"
            stroke="#E76F51"
            strokeWidth={1.5}
          />

          {/* 바구니 연결 로프 */}
          <Path
            d="
              M 132 179 L 139 198
              M 148 179 L 150 198
              M 172 179 L 170 198
              M 188 179 L 181 198
            "
            stroke="#8C735B"
            strokeWidth={2.5}
            strokeLinecap="round"
            fill="none"
          />

          {/* 바구니 몸체 */}
          <Path
            d="
              M 135 198
              L 185 198
              L 180 222
              Q 179 227 174 227
              L 146 227
              Q 141 227 140 222
              Z
            "
            fill="#E6B88A"
            stroke="#8C735B"
            strokeWidth={3.5}
            strokeLinejoin="round"
          />

          {/* 바구니 윗 테두리 */}
          <Rect
            x="131"
            y="195"
            width="58"
            height="7"
            rx="3.5"
            fill="#D49A6A"
            stroke="#8C735B"
            strokeWidth={3}
          />

          {/* 바구니 짜임 무늬 */}
          <Path
            d="
              M 149 202 L 148 226
              M 160 202 L 160 226
              M 171 202 L 172 226
              M 138 211 L 182 211
              M 139 219 L 181 219
            "
            stroke="#A8764C"
            strokeWidth={2}
            strokeLinecap="round"
            fill="none"
            opacity={0.7}
          />
        </AnimatedG>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HotAirBalloonTracingArtwork;
