import React from "react";

import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

interface HomeIconProps {
  size?: number;
}

export default function HomeIcon({ size = 70 }: HomeIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Defs>
        <LinearGradient id="homeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#FFC6E5" />

          <Stop offset="100%" stopColor="#F05A9D" />
        </LinearGradient>
      </Defs>

      {/* 버튼 */}

      <Path
        d="
          M50 12
          C71 12 88 29 88 50
          C88 71 71 88 50 88
          C29 88 12 71 12 50
          C12 29 29 12 50 12
          Z
        "
        fill="url(#homeGrad)"
      />

      {/* 집 */}

      <Path
        d="
          M28 48
          L50 28
          L72 48
          L68 48
          L68 70
          C68 73 66 75 63 75
          L37 75
          C34 75 32 73 32 70
          L32 48
          Z
        "
        fill="#FFFFFF"
      />

      {/* 문 */}

      <Path
        d="
          M45 75
          L45 58
          C45 55 47 53 50 53
          C53 53 55 55 55 58
          L55 75
          Z
        "
        fill="#F48FB1"
      />

      {/* 광택 */}

      <Path
        d="
          M28 28
          C35 19 48 17 57 21
          C45 24 35 31 30 40
          C25 37 25 32 28 28
          Z
        "
        fill="#FFFFFF"
        opacity="0.35"
      />
    </Svg>
  );
}
