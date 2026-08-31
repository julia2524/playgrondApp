import React from "react";

import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

interface RestartIconProps {
  size?: number;
}

export default function RestartIcon({ size = 70 }: RestartIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Defs>
        <LinearGradient id="restartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#8DEBFF" />

          <Stop offset="100%" stopColor="#3498DB" />
        </LinearGradient>
      </Defs>

      {/* 통통한 원 */}

      <Path
        d="
          M50 12
          C71 12 88 29 88 50
          C88 71 71 88 50 88
          C29 88 12 71 12 50
          C12 29 29 12 50 12
          Z
        "
        fill="url(#restartGrad)"
      />

      {/* 둥근 회전 화살표 */}

      <Path
        d="
          M68 48
          C68 37 60 30 50 30
          C39 30 31 39 31 50
          C31 61 39 69 50 69
          C57 69 63 65 66 59
        "
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="8"
        strokeLinecap="round"
      />

      <Path
        d="
          M66 59
          L66 43
          L79 53
          Z
        "
        fill="#FFFFFF"
      />

      {/* 광택 */}

      <Path
        d="
          M28 28
          C35 19 48 17 56 21
          C43 24 34 30 29 40
          C25 37 25 32 28 28
          Z
        "
        fill="#FFFFFF"
        opacity="0.35"
      />
    </Svg>
  );
}
