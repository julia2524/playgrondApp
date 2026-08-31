import React from "react";

import Svg, {
  Circle,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

interface GameFeedbackProps {
  type: "correct" | "wrong" | null;
}

export default function GameFeedback({ type }: GameFeedbackProps) {
  if (!type) {
    return null;
  }

  // ==================================================
  // ⭐ 정답
  // ==================================================

  if (type === "correct") {
    return (
      <Svg width={120} height={70} viewBox="0 0 120 70">
        <Defs>
          <LinearGradient id="correctGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FFF9A8" />

            <Stop offset="50%" stopColor="#FFEB3B" />

            <Stop offset="100%" stopColor="#FBC02D" />
          </LinearGradient>
        </Defs>

        {/* 큰 별 */}

        <Path
          d="
            M60 5
            C64 5 66 18 69 22
            C74 23 88 18 91 22
            C94 26 82 35 80 39
            C81 44 90 56 87 59
            C84 62 72 55 68 54
            C64 57 63 67 60 67
            C57 67 56 57 52 54
            C48 55 36 62 33 59
            C30 56 39 44 40 39
            C38 35 26 26 29 22
            C32 18 46 23 51 22
            C54 18 56 5 60 5
            Z
          "
          fill="url(#correctGrad)"
        />

        {/* 반짝이 */}

        <Circle cx="18" cy="18" r="5" fill="#FFF176" />

        <Circle cx="102" cy="20" r="4" fill="#FFF176" />

        <Circle cx="25" cy="55" r="3" fill="#FFF176" />

        <Circle cx="98" cy="53" r="5" fill="#FFF176" />
      </Svg>
    );
  }

  // ==================================================
  // ❌ 실패
  // ==================================================

  return (
    <Svg width={90} height={60} viewBox="0 0 90 60">
      <Defs>
        <LinearGradient id="wrongGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#E0F2FE" />

          <Stop offset="100%" stopColor="#93C5FD" />
        </LinearGradient>
      </Defs>

      {/* 젤리 버블 */}

      <Circle cx="45" cy="30" r="22" fill="url(#wrongGrad)" />

      {/* 작은 반짝이 */}

      <Circle cx="18" cy="15" r="4" fill="#FFFFFF" opacity="0.8" />

      <Circle cx="70" cy="45" r="3" fill="#FFFFFF" opacity="0.7" />
    </Svg>
  );
}
