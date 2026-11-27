import React from "react";
import Svg, { Path, Ellipse } from "react-native-svg";
import { getCategoryVariants } from "../../../utils/colorUtils";

interface ItemSvgProps {
  colorHex: string;
}

/* ==================================================
   공통 스타일
================================================== */

const OUTLINE = "#4B5563";
const WHITE = "#FFFFFF";
const DARK = "#2C3E50";

// 기존에 사용하던 색상 함수와 상수 import
// getCategoryVariants, OUTLINE, WHITE

// 기존 컬러 일러스트
export const AppleArtwork = ({ colorHex }: ItemSvgProps) => {
  const colors = getCategoryVariants(colorHex);

  return (
    <Svg width="100%" height="100%" viewBox="0 0 100 100">
      <Path
        d="
          M50 28
          C42 20 26 23 20 38
          C13 56 23 82 50 82
          C77 82 87 56 80 38
          C74 23 58 20 50 28Z
        "
        fill={colors.base}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      <Path
        d="M50 28 C50 20 54 15 61 12"
        stroke={colors.dark}
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />

      <Path
        d="M56 18 C67 12 77 16 79 25 C68 28 61 25 56 18Z"
        fill={colors.light}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      <Ellipse
        cx="34"
        cy="45"
        rx="8"
        ry="13"
        fill={WHITE}
        opacity={0.35}
        transform="rotate(25 34 45)"
      />
    </Svg>
  );
};

// 그리기용 외곽선
export const APPLE_TRACING_PATH =
  "M50 28 C42 20 26 23 20 38 C13 56 23 82 50 82 C77 82 87 56 80 38 C74 23 58 20 50 28Z";
