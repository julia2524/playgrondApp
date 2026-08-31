import React from "react";

import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

interface NextIconProps {
  size?: number;
}

export default function NextIcon({ size = 70 }: NextIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Defs>
        <LinearGradient id="nextGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#B9FF8A" />

          <Stop offset="100%" stopColor="#45C94F" />
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
        fill="url(#nextGrad)"
      />

      {/* Play */}

      <Path
        d="
          M40 31
          C40 27 44 25 47 28
          L70 45
          C74 48 74 52 70 55
          L47 72
          C44 75 40 73 40 69
          Z
        "
        fill="#FFFFFF"
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
