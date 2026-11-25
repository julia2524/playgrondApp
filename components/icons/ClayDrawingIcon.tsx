import React from "react";
import Svg, {
  Circle,
  Ellipse,
  G,
  Path,
  Rect,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const BABY_OUTLINE = "#A66D59";

type ClayIconProps = {
  size?: number;
};

export function ClayDrawingIcon({ size = 88 }: ClayIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Defs>
        <LinearGradient id="drawRed" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FFAAA0" />
          <Stop offset="0.55" stopColor="#FF737A" />
          <Stop offset="1" stopColor="#E84D68" />
        </LinearGradient>

        <LinearGradient id="drawYellow" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FFF29C" />
          <Stop offset="0.55" stopColor="#FFD94F" />
          <Stop offset="1" stopColor="#F2A83D" />
        </LinearGradient>

        <LinearGradient id="drawBlue" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#9CEBFF" />
          <Stop offset="0.55" stopColor="#56C5F2" />
          <Stop offset="1" stopColor="#4385D8" />
        </LinearGradient>
      </Defs>

      {/* 바닥 그림자 */}
      <Ellipse cx="57" cy="103" rx="39" ry="6" fill="#795C43" opacity="0.17" />

      {/* 꼬불꼬불 무지개 그림 */}
      <Path
        d="M12 69 C21 54 29 82 39 65 S54 48 63 65"
        fill="none"
        stroke="#FF8291"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <Path
        d="M14 80 C24 66 31 94 42 77 S55 61 65 76"
        fill="none"
        stroke="#FFD35A"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <Path
        d="M18 91 C28 79 35 102 46 89 S58 76 68 87"
        fill="none"
        stroke="#71CDEB"
        strokeWidth="7"
        strokeLinecap="round"
      />

      {/* 파란 크레용 그림자 */}
      <G transform="rotate(-42 77 54)">
        <Rect
          x="68"
          y="20"
          width="20"
          height="70"
          rx="8"
          fill="#426AA6"
          opacity="0.25"
          transform="translate(2 4)"
        />

        {/* 크레용 몸통 */}
        <Rect
          x="68"
          y="18"
          width="20"
          height="70"
          rx="8"
          fill="url(#drawBlue)"
          stroke={BABY_OUTLINE}
          strokeWidth="3"
        />

        <Path
          d="M73 25 L73 65"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.65"
        />

        {/* 크레용 끝 */}
        <Path
          d="M68 20 Q78 2 88 20Z"
          fill="#75D8F8"
          stroke={BABY_OUTLINE}
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </G>

      {/* 노란 크레용 */}
      <G transform="rotate(12 91 54)">
        <Rect
          x="82"
          y="27"
          width="18"
          height="62"
          rx="8"
          fill="#D99B44"
          opacity="0.25"
          transform="translate(2 4)"
        />
        <Rect
          x="82"
          y="25"
          width="18"
          height="62"
          rx="8"
          fill="url(#drawYellow)"
          stroke={BABY_OUTLINE}
          strokeWidth="3"
        />
        <Path
          d="M87 33 L87 63"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.7"
        />
        <Path
          d="M82 27 Q91 10 100 27Z"
          fill="#FFE987"
          stroke={BABY_OUTLINE}
          strokeWidth="3"
        />
      </G>

      {/* 빨간 크레용 */}
      <G transform="rotate(38 66 57)">
        <Rect
          x="57"
          y="32"
          width="19"
          height="64"
          rx="8"
          fill="#A84E62"
          opacity="0.25"
          transform="translate(2 4)"
        />
        <Rect
          x="57"
          y="30"
          width="19"
          height="64"
          rx="8"
          fill="url(#drawRed)"
          stroke={BABY_OUTLINE}
          strokeWidth="3"
        />
        <Path
          d="M62 38 L62 70"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.65"
        />
        <Path
          d="M57 32 Q66 15 76 32Z"
          fill="#FFB4A7"
          stroke={BABY_OUTLINE}
          strokeWidth="3"
        />
      </G>

      {/* 작은 반짝임 */}
      {/* <Path
        d="M103 12 L106 20 L114 23 L106 26 L103 34 L100 26 L92 23 L100 20Z"
        fill="#FFF0A0"
      /> */}
      <Circle cx="17" cy="42" r="4" fill="#FFFFFF" />
      <Circle cx="27" cy="34" r="2.5" fill="#FFD45D" />
    </Svg>
  );
}
