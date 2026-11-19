import React from "react";
import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Path,
  Stop,
} from "react-native-svg";

interface ClayIconProps {
  size?: number;
}

// 공통 테두리 스타일
const OUTLINE = "#FFFFFF";

export function ClayColorIcon({ size = 88 }: ClayIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Defs>
        <LinearGradient id="paletteBody" x1="0" y1="0" x2="0.2" y2="1">
          <Stop offset="0" stopColor="#FFF0C9" />
          <Stop offset="0.55" stopColor="#FFDCA0" />
          <Stop offset="1" stopColor="#F3A85E" />
        </LinearGradient>

        <LinearGradient id="brushBody" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#83D9FF" />
          <Stop offset="0.5" stopColor="#398DFF" />
          <Stop offset="1" stopColor="#6555D9" />
        </LinearGradient>

        <LinearGradient id="brushTip" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FFB1A6" />
          <Stop offset="1" stopColor="#ED6481" />
        </LinearGradient>
      </Defs>

      {/* 바닥 그림자 */}
      <Ellipse cx="55" cy="101" rx="39" ry="7" fill="#795C43" opacity="0.15" />

      {/* 팔레트 */}
      <Path
        d="M60 18 C34 12 12 32 12 58 C12 83 31 101 57 101
           C67 101 76 94 76 84 C76 77 70 72 71 65
           C73 56 91 60 99 49 C109 34 85 21 60 18Z"
        fill="#D99B58"
        opacity="0.35"
        transform="translate(0 4)"
      />

      <Path
        d="M60 15 C34 9 12 29 12 55 C12 80 31 98 57 98
           C67 98 76 91 76 81 C76 74 70 69 71 62
           C73 53 91 57 99 46 C109 31 85 18 60 15Z"
        fill="url(#paletteBody)"
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 팔레트 광택 */}
      <Path
        d="M24 40 C30 26 45 20 58 22"
        stroke="#FFFFFF"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.55"
        fill="none"
      />

      {/* 물감 */}
      <Circle cx="31" cy="53" r="7" fill="#FF6B75" />
      <Circle cx="52" cy="36" r="7" fill="#FFD84D" />
      <Circle cx="76" cy="39" r="7" fill="#72D889" />
      {/* <Circle cx="88" cy="59" r="7" fill="#55B9F7" /> */}
      <Circle cx="42" cy="77" r="7" fill="#B77CF3" />
      <Circle cx="64" cy="82" r="8" fill="#FF9D55" />

      {/* 붓 손잡이 그림자 */}
      <G transform="rotate(54 76 39) translate(25, -10)">
        <Path
          d="M68 23 L82 23 L82 67 L68 67Z"
          fill="#4C4D9F"
          opacity="0.35"
          transform="translate(2 3)"
        />

        {/* 붓 손잡이 */}
        <Path
          d="M68 20 Q68 16 72 16 L78 16 Q82 16 82 20
             L82 68 L68 68Z"
          fill="url(#brushBody)"
          stroke={OUTLINE}
          strokeWidth="3"
        />

        <Path
          d="M72 23 L72 57"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* 붓 고정 부분 */}
        <Path
          d="M68 62 L82 62 L82 72 L68 72Z"
          fill="#FFD34F"
          stroke={OUTLINE}
          strokeWidth="2"
        />

        {/* 붓 끝 */}
        <Path
          d="M68 72 L82 72 Q81 88 75 96 Q69 88 68 72Z"
          fill="url(#brushTip)"
          stroke={OUTLINE}
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </G>

      {/* 작은 반짝임 */}
      <Circle cx="96" cy="17" r="3" fill="#FFFFFF" opacity="0.9" />
      <Path
        d="M101 27 L103 32 L108 34 L103 36 L101 41 L99 36 L94 34 L99 32Z"
        fill="#FFF1A8"
      />
    </Svg>
  );
}

export function ClayShapeIcon({ size = 88 }: ClayIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Defs>
        <LinearGradient id="starBody" x1="0" y1="0" x2="0.3" y2="1">
          <Stop offset="0" stopColor="#FFF17B" />
          <Stop offset="0.55" stopColor="#FFD43F" />
          <Stop offset="1" stopColor="#F5A91F" />
        </LinearGradient>

        <LinearGradient id="triangleBody" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#A0E8FF" />
          <Stop offset="0.55" stopColor="#45B9F4" />
          <Stop offset="1" stopColor="#327DEB" />
        </LinearGradient>

        <LinearGradient id="circleBody" x1="0" y1="0" x2="0.8" y2="1">
          <Stop offset="0" stopColor="#FFA7D2" />
          <Stop offset="0.6" stopColor="#F477B2" />
          <Stop offset="1" stopColor="#D94D91" />
        </LinearGradient>
      </Defs>

      {/* 그림자 */}
      <Ellipse cx="58" cy="104" rx="43" ry="7" fill="#574A8A" opacity="0.16" />

      {/* 분홍 원 */}
      <Circle
        cx="30"
        cy="76"
        r="17"
        fill="#B94C87"
        opacity="0.3"
        transform="translate(1 3)"
      />
      <Circle
        cx="30"
        cy="73"
        r="17"
        fill="url(#circleBody)"
        stroke={OUTLINE}
        strokeWidth="4"
      />
      <Ellipse cx="24" cy="64" rx="6" ry="3" fill="#FFFFFF" opacity="0.55" />

      {/* 노란 별 그림자 */}
      <Path
        d="M59 14 Q63 8 68 14 L78 31 L97 34
           Q105 36 99 44 L85 58 L88 78
           Q89 87 80 83 L62 74 L44 83
           Q35 87 37 78 L40 58 L26 44
           Q20 36 28 34 L47 31Z"
        fill="#A87B19"
        opacity="0.3"
        transform="translate(1 4)"
      />

      {/* 별 */}
      <Path
        d="M59 11 Q63 5 68 11 L78 28 L97 31
           Q105 33 99 41 L85 55 L88 75
           Q89 84 80 80 L62 71 L44 80
           Q35 84 37 75 L40 55 L26 41
           Q20 33 28 31 L47 28Z"
        fill="url(#starBody)"
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      <Path
        d="M54 20 Q60 12 64 18 L68 26"
        stroke="#FFFFFF"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.65"
        fill="none"
      />

      {/* 파란 삼각형 그림자 */}
      <Path
        d="M78 60 Q83 51 89 60 L112 98
           Q117 107 106 108 L62 108
           Q52 107 58 98Z"
        fill="#2467B6"
        opacity="0.35"
        transform="translate(0 3)"
      />

      {/* 삼각형 */}
      <Path
        d="M78 56 Q83 47 89 56 L112 94
           Q117 103 106 104 L62 104
           Q52 103 58 94Z"
        fill="url(#triangleBody)"
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      <Path
        d="M81 64 L65 94"
        stroke="#FFFFFF"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.55"
      />

      {/* 광택 */}
      <Circle cx="91" cy="65" r="3" fill="#FFFFFF" opacity="0.75" />
    </Svg>
  );
}

export function ClayCategoryIcon({ size = 88 }: ClayIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Defs>
        <LinearGradient id="appleBody" x1="0" y1="0" x2="0.5" y2="1">
          <Stop offset="0" stopColor="#FFAAA0" />
          <Stop offset="0.5" stopColor="#FF625F" />
          <Stop offset="1" stopColor="#D9364F" />
        </LinearGradient>

        <LinearGradient id="bananaBody" x1="0" y1="0" x2="0.5" y2="1">
          <Stop offset="0" stopColor="#FFF49A" />
          <Stop offset="0.55" stopColor="#FFD84D" />
          <Stop offset="1" stopColor="#F4A91F" />
        </LinearGradient>
      </Defs>

      {/* 바닥 그림자 */}
      <Ellipse cx="58" cy="105" rx="46" ry="7" fill="#74583C" opacity="0.15" />

      {/* 사과 그림자 */}
      <Path
        d="M44 35 C34 27 18 35 16 52 C12 76 26 96 43 99
           C52 101 57 94 64 95 C78 100 94 86 97 65
           C101 43 83 31 67 37 C58 41 53 41 44 35Z"
        fill="#9F293F"
        opacity="0.3"
        transform="translate(0 3)"
      />

      {/* 사과 몸체 */}
      <Path
        d="M44 32 C34 24 18 32 16 49 C12 73 26 93 43 96
           C52 98 57 91 64 92 C78 97 94 83 97 62
           C101 40 83 28 67 34 C58 38 53 38 44 32Z"
        fill="url(#appleBody)"
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 사과 광택 */}
      <Path
        d="M25 48 C27 39 34 35 42 37"
        stroke="#FFFFFF"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.6"
        fill="none"
      />

      <Circle cx="25" cy="59" r="3" fill="#FFFFFF" opacity="0.45" />

      {/* 사과 꼭지 */}
      <Path
        d="M56 32 Q55 19 63 14"
        stroke="#86502F"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />

      {/* 잎 */}
      <Path
        d="M60 20 Q71 4 85 13 Q81 29 62 28Z"
        fill="#72D77F"
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <Path
        d="M65 23 Q73 17 80 15"
        stroke="#C4F7A4"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* 바나나 그림자 */}
      <Path
        d="M43 91 C57 104 81 105 99 87
           C106 80 109 70 104 62
           C99 56 93 59 91 67
           C87 80 72 87 57 80
           C48 76 42 69 35 69
           C25 69 23 81 43 91Z"
        fill="#B8791B"
        opacity="0.35"
        transform="translate(0 3)"
      />

      {/* 바나나 */}
      <Path
        d="M43 88 C57 101 81 102 99 84
           C106 77 109 67 104 59
           C99 53 93 56 91 64
           C87 77 72 84 57 77
           C48 73 42 66 35 66
           C25 66 23 78 43 88Z"
        fill="url(#bananaBody)"
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 바나나 광택 */}
      <Path
        d="M38 76 C46 86 59 91 72 89"
        stroke="#FFFFFF"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.55"
        fill="none"
      />

      {/* 바나나 꼭지 */}
      <Path
        d="M101 59 L107 53"
        stroke="#8B6337"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <Path
        d="M31 67 L25 62"
        stroke="#8B6337"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </Svg>
  );
}
