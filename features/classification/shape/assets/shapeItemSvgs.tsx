import React from "react";
import Svg, { Circle, Path, Rect, Polygon, Line } from "react-native-svg";

interface ItemSvgProps {
  colorHex?: string;
}

const OUTLINE = "#5B4B4B";
const WHITE = "#FFFFFF";
const DARK = "#3D3333";
const DEFAULT_COLOR = "#FFD166";

// ============================================================
// 🔵 동그라미
// ============================================================

// ⚽ 공
export const Ball = ({ colorHex = DEFAULT_COLOR }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Circle
      cx="50"
      cy="53"
      r="30"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 공 무늬 */}
    <Path
      d="M38 29 Q50 40 62 29"
      fill="none"
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinecap="round"
    />

    <Path
      d="M25 52 Q38 58 38 72"
      fill="none"
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinecap="round"
    />

    <Path
      d="M62 72 Q62 58 75 52"
      fill="none"
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinecap="round"
    />

    {/* 반짝임 */}
    <Circle cx="40" cy="42" r="5" fill={WHITE} opacity={0.55} />
  </Svg>
);

// 🛞 바퀴
export const Wheel = ({ colorHex = DEFAULT_COLOR }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Circle
      cx="50"
      cy="50"
      r="31"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="5"
    />

    <Circle
      cx="50"
      cy="50"
      r="11"
      fill={WHITE}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 바퀴살 */}
    <Line
      x1="50"
      y1="19"
      x2="50"
      y2="39"
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinecap="round"
    />

    <Line
      x1="50"
      y1="61"
      x2="50"
      y2="81"
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinecap="round"
    />

    <Line
      x1="19"
      y1="50"
      x2="39"
      y2="50"
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinecap="round"
    />

    <Line
      x1="61"
      y1="50"
      x2="81"
      y2="50"
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinecap="round"
    />
  </Svg>
);

// 🕐 시계
export const Clock = ({ colorHex = DEFAULT_COLOR }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Circle
      cx="50"
      cy="51"
      r="31"
      fill={WHITE}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 시계 테두리 색 포인트 */}
    <Circle
      cx="50"
      cy="51"
      r="25"
      fill="none"
      stroke={colorHex}
      strokeWidth="7"
    />

    {/* 시계 바늘 */}
    <Line
      x1="50"
      y1="51"
      x2="50"
      y2="34"
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinecap="round"
    />

    <Line
      x1="50"
      y1="51"
      x2="64"
      y2="58"
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinecap="round"
    />

    <Circle cx="50" cy="51" r="4" fill={OUTLINE} />

    {/* 작은 점 */}
    <Circle cx="50" cy="28" r="2.5" fill={OUTLINE} />
    <Circle cx="73" cy="51" r="2.5" fill={OUTLINE} />
    <Circle cx="50" cy="74" r="2.5" fill={OUTLINE} />
    <Circle cx="27" cy="51" r="2.5" fill={OUTLINE} />
  </Svg>
);

// 🍽️ 접시
export const Plate = ({ colorHex = DEFAULT_COLOR }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 접시 */}
    <Circle
      cx="50"
      cy="52"
      r="32"
      fill={WHITE}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Circle cx="50" cy="52" r="24" fill={colorHex} opacity={0.85} />

    <Circle cx="50" cy="52" r="18" fill={WHITE} opacity={0.8} />

    {/* 반짝임 */}
    <Path
      d="M30 38 Q36 31 44 31"
      fill="none"
      stroke={WHITE}
      strokeWidth="4"
      strokeLinecap="round"
      opacity={0.8}
    />
  </Svg>
);

// 🍪 쿠키
export const Cookie = ({ colorHex = DEFAULT_COLOR }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Path
      d="
        M75 31
        Q82 42 79 55
        Q76 72 59 80
        Q42 88 28 77
        Q16 67 20 50
        Q23 34 37 27
        Q51 20 64 25
        Q70 27 75 31
        Z
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 초코칩 */}
    <Circle cx="36" cy="44" r="5" fill="#7B341E" />
    <Circle cx="57" cy="35" r="4" fill="#7B341E" />
    <Circle cx="64" cy="54" r="5" fill="#7B341E" />
    <Circle cx="42" cy="64" r="4" fill="#7B341E" />
    <Circle cx="57" cy="71" r="3.5" fill="#7B341E" />

    {/* 쿠키 반짝임 */}
    <Circle cx="31" cy="36" r="5" fill={WHITE} opacity={0.45} />
  </Svg>
);

// 🔘 단추
export const Button = ({ colorHex = DEFAULT_COLOR }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Circle
      cx="50"
      cy="51"
      r="30"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 안쪽 테두리 */}
    <Circle
      cx="50"
      cy="51"
      r="21"
      fill="none"
      stroke={WHITE}
      strokeWidth="3"
      opacity={0.7}
    />

    {/* 구멍 */}
    <Circle cx="42" cy="44" r="3.5" fill={OUTLINE} />
    <Circle cx="58" cy="44" r="3.5" fill={OUTLINE} />
    <Circle cx="42" cy="59" r="3.5" fill={OUTLINE} />
    <Circle cx="58" cy="59" r="3.5" fill={OUTLINE} />

    <Circle cx="40" cy="34" r="5" fill={WHITE} opacity={0.45} />
  </Svg>
);

// 🌕 보름달
export const FullMoon = ({ colorHex = DEFAULT_COLOR }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Circle
      cx="50"
      cy="50"
      r="31"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 달 표면 */}
    <Circle cx="37" cy="40" r="6" fill={WHITE} opacity={0.18} />

    <Circle cx="61" cy="37" r="4" fill={WHITE} opacity={0.18} />

    <Circle cx="63" cy="60" r="7" fill={WHITE} opacity={0.15} />

    <Circle cx="40" cy="65" r="4" fill={WHITE} opacity={0.18} />

    {/* 달빛 */}
    <Path
      d="M30 30 Q37 23 46 21"
      fill="none"
      stroke={WHITE}
      strokeWidth="4"
      strokeLinecap="round"
      opacity={0.7}
    />
  </Svg>
);

// ============================================================
// 🟦 네모
// ============================================================

// 📦 상자
export const Box = ({ colorHex = DEFAULT_COLOR }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 상자 */}
    <Path
      d="
        M24 35
        L50 22
        L76 35
        L76 68
        L50 81
        L24 68
        Z
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 뚜껑 */}
    <Path
      d="
        M24 35
        L50 48
        L76 35
        L50 22
        Z
      "
      fill={WHITE}
      opacity={0.28}
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    />

    {/* 리본 */}
    <Path d="M50 48 L50 78" stroke={WHITE} strokeWidth="6" opacity={0.7} />

    <Path
      d="M24 35 L50 48 L76 35"
      fill="none"
      stroke={WHITE}
      strokeWidth="4"
      opacity={0.7}
    />
  </Svg>
);

// 🧱 블록
export const Block = ({ colorHex = DEFAULT_COLOR }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Rect
      x="22"
      y="27"
      width="56"
      height="51"
      rx="8"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 블록 돌기 */}
    <Circle
      cx="37"
      cy="27"
      r="7"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Circle
      cx="63"
      cy="27"
      r="7"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 앞면 */}
    <Rect
      x="30"
      y="43"
      width="40"
      height="27"
      rx="5"
      fill={WHITE}
      opacity={0.15}
    />

    <Circle cx="33" cy="36" r="4" fill={WHITE} opacity={0.45} />
  </Svg>
);

// 🪟 창문
export const Window = ({ colorHex = DEFAULT_COLOR }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Rect
      x="20"
      y="22"
      width="60"
      height="58"
      rx="7"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 유리 */}
    <Rect
      x="29"
      y="31"
      width="42"
      height="40"
      rx="3"
      fill="#BFE3FF"
      stroke={OUTLINE}
      strokeWidth="3"
    />

    {/* 창틀 */}
    <Line x1="50" y1="31" x2="50" y2="71" stroke={OUTLINE} strokeWidth="3" />

    <Line x1="29" y1="51" x2="71" y2="51" stroke={OUTLINE} strokeWidth="3" />

    {/* 빛 */}
    <Path
      d="M35 37 L43 37"
      stroke={WHITE}
      strokeWidth="4"
      strokeLinecap="round"
      opacity={0.7}
    />
  </Svg>
);

// 🍞 식빵
export const Bread = ({ colorHex = DEFAULT_COLOR }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Path
      d="
        M27 77
        Q22 73 22 64
        V42
        Q22 27 35 24
        Q50 19 65 24
        Q78 27 78 42
        V64
        Q78 74 73 77
        Z
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 빵 속 */}
    <Path
      d="
        M31 68
        V43
        Q31 32 42 31
        Q50 29 58 31
        Q69 32 69 43
        V68
        Q69 72 65 72
        H35
        Q31 72 31 68
        Z
      "
      fill="#FFF3BF"
      opacity={0.85}
    />

    {/* 빵 반짝임 */}
    <Path
      d="M34 39 Q39 33 45 33"
      fill="none"
      stroke={WHITE}
      strokeWidth="4"
      strokeLinecap="round"
      opacity={0.8}
    />
  </Svg>
);

// 🖼️ 액자
export const Frame = ({ colorHex = DEFAULT_COLOR }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Rect
      x="19"
      y="20"
      width="62"
      height="62"
      rx="6"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Rect
      x="29"
      y="30"
      width="42"
      height="42"
      rx="3"
      fill={WHITE}
      stroke={OUTLINE}
      strokeWidth="3"
    />

    {/* 그림 */}
    <Circle cx="59" cy="42" r="6" fill="#FFD166" />

    <Polygon points="32,67 45,49 53,59 59,52 69,67" fill="#8ACB88" />

    {/* 반짝임 */}
    <Path
      d="M27 28 L36 28"
      stroke={WHITE}
      strokeWidth="4"
      strokeLinecap="round"
      opacity={0.6}
    />
  </Svg>
);

// 🎁 선물상자
export const GiftBox = ({ colorHex = DEFAULT_COLOR }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 상자 */}
    <Rect
      x="23"
      y="38"
      width="54"
      height="39"
      rx="5"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 뚜껑 */}
    <Rect
      x="20"
      y="30"
      width="60"
      height="13"
      rx="5"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 리본 세로 */}
    <Rect x="46" y="30" width="8" height="47" fill={WHITE} opacity={0.75} />

    {/* 리본 가로 */}
    <Rect x="20" y="34" width="60" height="7" fill={WHITE} opacity={0.75} />

    {/* 리본 */}
    <Path
      d="M50 30
         Q38 18 34 26
         Q32 32 50 35"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />

    <Path
      d="M50 30
         Q62 18 66 26
         Q68 32 50 35"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />
  </Svg>
);

// 🟫 타일
export const Tile = ({ colorHex = DEFAULT_COLOR }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Rect
      x="21"
      y="21"
      width="58"
      height="58"
      rx="9"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 안쪽 타일 */}
    <Rect
      x="29"
      y="29"
      width="42"
      height="42"
      rx="5"
      fill={WHITE}
      opacity={0.18}
    />

    {/* 귀여운 무늬 */}
    <Circle cx="41" cy="43" r="4" fill={WHITE} opacity={0.7} />
    <Circle cx="59" cy="43" r="4" fill={WHITE} opacity={0.7} />
    <Path
      d="M39 56 Q50 65 61 56"
      fill="none"
      stroke={WHITE}
      strokeWidth="3"
      strokeLinecap="round"
      opacity={0.7}
    />

    {/* 반짝임 */}
    <Path
      d="M30 31 L38 31"
      stroke={WHITE}
      strokeWidth="4"
      strokeLinecap="round"
      opacity={0.65}
    />
  </Svg>
);

/////////////////////////////////////////////////////

// 🍙 삼각김밥
export const TriangleRiceBall = ({ colorHex = "#FFF9F9" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 김밥 몸체 */}
    <Polygon
      points="50,15 85,80 15,80"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* 아래쪽 김 띠 */}
    <Rect
      x="25"
      y="60"
      width="50"
      height="20"
      rx="4"
      fill="#2D3748"
      stroke={OUTLINE}
      strokeWidth="3"
    />
    {/* 반짝임 */}
    <Path
      d="M45 28 L53 38"
      stroke={WHITE}
      strokeWidth="3"
      strokeLinecap="round"
      opacity={0.7}
    />
  </Svg>
);

// 🍰 조각케이크
export const CakeSlice = ({ colorHex = "#FFB5C2" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 케이크 조각 */}
    <Polygon
      points="50,20 85,75 25,85"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* 위에 올려진 체리/크림 */}
    <Circle
      cx="50"
      cy="25"
      r="9"
      fill="#FF6B6B"
      stroke={OUTLINE}
      strokeWidth="3"
    />
    <Path
      d="M35 55 Q50 45 65 55"
      stroke="#FFFFFF"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
      opacity={0.8}
    />
  </Svg>
);

// 🏠 지붕
export const Roof = ({ colorHex = "#FF8B8B" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Polygon
      points="50,15 90,75 10,75"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* 창문 장식 */}
    <Circle
      cx="50"
      cy="50"
      r="12"
      fill={WHITE}
      stroke={OUTLINE}
      strokeWidth="3"
    />
    <Path
      d="M35 30 L50 20"
      stroke={WHITE}
      strokeWidth="4"
      strokeLinecap="round"
      opacity={0.6}
    />
  </Svg>
);

// 🍕 피자 한 조각
export const PizzaSlice = ({ colorHex = "#FFD166" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Polygon
      points="50,15 85,85 20,70"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* 페퍼로니 토핑 */}
    <Circle
      cx="50"
      cy="50"
      r="8"
      fill="#EF476F"
      stroke={OUTLINE}
      strokeWidth="3"
    />
    <Circle
      cx="40"
      cy="70"
      r="6"
      fill="#EF476F"
      stroke={OUTLINE}
      strokeWidth="3"
    />
  </Svg>
);

// ⛰️ 산
export const Mountain = ({ colorHex = "#758BFD" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Polygon
      points="50,20 85,80 15,80"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* 산 꼭대기 눈 */}
    <Polygon
      points="50,20 62,42 38,42"
      fill={WHITE}
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    />
  </Svg>
);

// 🎪 파티모자
export const PartyHat = ({ colorHex = "#06D6A0" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Polygon
      points="50,25 75,80 25,80"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* 꼭대기 방울 */}
    <Circle
      cx="50"
      cy="20"
      r="8"
      fill="#FFD166"
      stroke={OUTLINE}
      strokeWidth="3"
    />
    {/* 모자 줄무늬 패턴 */}
    <Path
      d="M35 55 Q50 48 65 55"
      stroke={WHITE}
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
  </Svg>
);
// 🍪 하트 쿠키
export const HeartCookie = ({ colorHex = "#E09F3E" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Path
      d="M50 82 C50 82 20 60 20 38 C20 25 30 18 40 18 C47 18 50 24 50 24 C50 24 53 18 60 18 C70 18 80 25 80 38 C80 60 50 82 50 82 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* 쿠키 위에 설탕 데코 */}
    <Path
      d="M40 35 Q50 30 60 35"
      stroke={WHITE}
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
      opacity={0.7}
    />
  </Svg>
);

// 🎈 하트 풍선
export const HeartBalloon = ({ colorHex = "#FF6B6B" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Path
      d="M50 72 C50 72 22 52 22 32 C22 19 32 12 42 12 C49 12 50 18 50 18 C50 18 51 18 58 12 C68 12 78 19 78 32 C78 52 50 72 50 72 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* 풍선 매듭 */}
    <Polygon
      points="47,70 53,70 50,78"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />
    {/* 하이라이트 반짝임 */}
    <Path
      d="M33 26 L39 32"
      stroke={WHITE}
      strokeWidth="4"
      strokeLinecap="round"
      opacity={0.6}
    />
  </Svg>
);

// 👓 하트 안경
export const HeartGlasses = ({ colorHex = "#9B5DE5" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 왼쪽 하트 */}
    <Path
      d="M32 60 C32 60 12 45 12 30 C12 20 20 15 27 15 C32 15 32 20 32 20 C32 20 32 15 37 15 C44 15 52 20 52 30 C52 45 32 60 32 60 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />
    {/* 오른쪽 하트 (살짝 겹치게 혹은 나란히) */}
    <Path
      d="M68 60 C68 60 48 45 48 30 C48 20 56 15 63 15 C68 15 68 20 68 20 C68 20 68 15 73 15 C80 15 88 20 88 30 C88 45 68 60 68 60 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />
    {/* 안경테 연결선 */}
    <Path
      d="M32 30 L68 30"
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinecap="round"
    />
  </Svg>
);

// 🍫 하트 초콜릿
export const HeartChocolate = ({ colorHex = "#7F4F24" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Path
      d="M50 82 C50 82 20 60 20 38 C20 25 30 18 40 18 C47 18 50 24 50 24 C50 24 53 18 60 18 C70 18 80 25 80 38 C80 60 50 82 50 82 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* 초콜릿 질감 리본 */}
    <Path
      d="M35 35 Q50 45 65 35"
      stroke="#E9D8A6"
      strokeWidth="6"
      strokeLinecap="round"
      fill="none"
    />
  </Svg>
);
// ⭐ 별 스티커
export const StarSticker = ({ colorHex = "#FFD166" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Path
      d="M50 12 L61 38 L89 40 L67 59 L74 86 L50 71 L26 86 L33 59 L11 40 L39 38 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
    <Path
      d="M40 38 L50 25 L60 38"
      stroke={WHITE}
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
      opacity={0.6}
    />
  </Svg>
);

// 🪄 요술봉
export const MagicWand = ({ colorHex = "#F72585" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 막대기 */}
    <Path
      d="M30 75 L70 35"
      stroke="#B08968"
      strokeWidth="6"
      strokeLinecap="round"
    />
    {/* 상단 별 */}
    <Path
      d="M70 20 L76 34 L92 35 L80 46 L84 61 L70 52 L56 61 L60 46 L48 35 L64 34 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
  </Svg>
);

// 🌊 불가사리
export const Starfish = ({ colorHex = "#F3722C" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Path
      d="M50 15 L62 38 L88 38 L67 55 L75 80 L50 67 L25 80 L33 55 L12 38 L38 38 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* 불가사리 무늬 점들 */}
    <Circle cx="50" cy="45" r="3" fill="#FFFFFF" opacity={0.7} />
    <Circle cx="43" cy="55" r="2.5" fill="#FFFFFF" opacity={0.7} />
    <Circle cx="57" cy="55" r="2.5" fill="#FFFFFF" opacity={0.7} />
  </Svg>
);

// 🍬 별사탕
export const StarCandy = ({ colorHex = "#4CC9F0" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Path
      d="M50 15 L60 38 L85 40 L65 58 L72 82 L50 68 L28 82 L35 58 L15 40 L40 38 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* 영롱한 반짝임 */}
    <Path
      d="M45 35 L55 25"
      stroke={WHITE}
      strokeWidth="5"
      strokeLinecap="round"
      opacity={0.8}
    />
  </Svg>
);

// 🌙 밤하늘 별
export const NightStar = ({ colorHex = "#FFB703" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Path
      d="M50 12 L61 38 L89 40 L67 59 L74 86 L50 71 L26 86 L33 59 L11 40 L39 38 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* 가운데 작은 눈/미소 */}
    <Circle cx="45" cy="45" r="3" fill={OUTLINE} />
    <Circle cx="55" cy="45" r="3" fill={OUTLINE} />
    <Path
      d="M47 55 Q50 60 53 55"
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
  </Svg>
);

// ============================================================
// 🔵 동그라미 추가 사물들
// ============================================================

// 🍩 도넛
export const Donut = ({ colorHex = DEFAULT_COLOR }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Circle
      cx="50"
      cy="51"
      r="32"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    <Circle
      cx="50"
      cy="51"
      r="12"
      fill={WHITE}
      stroke={OUTLINE}
      strokeWidth="3"
    />
    {/* 스프링클 데코 */}
    <Rect x="32" y="32" width="6" height="3" rx="1.5" fill="#FF6B6B" />
    <Rect x="60" y="38" width="6" height="3" rx="1.5" fill="#4CC9F0" />
    <Rect x="42" y="66" width="6" height="3" rx="1.5" fill="#FFD166" />
  </Svg>
);

export const RoundDonut = ({ colorHex = "#F792C0" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Circle
      cx="50"
      cy="52"
      r="32"
      fill="#E8B47A"
      stroke={OUTLINE}
      strokeWidth="4"
    />
    <Circle cx="50" cy="52" r="27" fill={colorHex} />
    <Circle
      cx="50"
      cy="52"
      r="10"
      fill="#FFF9F0"
      stroke={OUTLINE}
      strokeWidth="3"
    />
    {/* 스프링클 */}
    <Line
      x1="38"
      y1="34"
      x2="41"
      y2="38"
      stroke={WHITE}
      strokeWidth="3"
      strokeLinecap="round"
    />
    <Line
      x1="58"
      y1="30"
      x2="60"
      y2="35"
      stroke="#4CC9F0"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <Line
      x1="68"
      y1="45"
      x2="72"
      y2="48"
      stroke={WHITE}
      strokeWidth="3"
      strokeLinecap="round"
    />
    <Line
      x1="35"
      y1="60"
      x2="38"
      y2="64"
      stroke="#4CC9F0"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </Svg>
);

// 🍊 귤 / 오렌지
export const Orange = ({ colorHex = "#F3722C" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Circle
      cx="50"
      cy="53"
      r="31"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    {/* 꼭지 */}
    <Path
      d="M47 22 Q50 14 55 22"
      fill="none"
      stroke="#43AA8B"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <Path
      d="M50 22 Q58 20 54 26"
      fill="#43AA8B"
      stroke={OUTLINE}
      strokeWidth="2"
    />
    <Circle cx="40" cy="42" r="5" fill={WHITE} opacity={0.5} />
  </Svg>
);

export const RoundOrange = ({ colorHex = "#FFA630" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Circle
      cx="50"
      cy="54"
      r="30"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    {/* 꼭지 */}
    <Path
      d="M50 24 Q47 18 42 16"
      stroke="#4C9A4C"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
    {/* 잎사귀 */}
    <Path
      d="M42 16 Q50 12 56 18 Q48 22 42 16 Z"
      fill="#6FCF6F"
      stroke={OUTLINE}
      strokeWidth="2.5"
    />
    {/* 반짝임 */}
    <Circle cx="39" cy="43" r="5" fill={WHITE} opacity={0.5} />
  </Svg>
);

// 🍭 사탕 (롤리팝)
export const Lollipop = ({ colorHex = "#F72585" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Path
      d="M50 56 L50 82"
      stroke="#B08968"
      strokeWidth="6"
      strokeLinecap="round"
    />
    <Circle
      cx="50"
      cy="38"
      r="26"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    {/* 소용돌이 무늬 */}
    <Path
      d="M38 30 Q50 38 62 30"
      fill="none"
      stroke={WHITE}
      strokeWidth="5"
      strokeLinecap="round"
    />
    <Path
      d="M34 44 Q50 52 66 44"
      fill="none"
      stroke={WHITE}
      strokeWidth="5"
      strokeLinecap="round"
      opacity={0.8}
    />
  </Svg>
);
export const RoundLollipop = ({ colorHex = "#FF70A6" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Line
      x1="50"
      y1="60"
      x2="50"
      y2="88"
      stroke="#C9A66B"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <Circle
      cx="50"
      cy="38"
      r="27"
      fill={WHITE}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    <Path
      d="M50 38 m-20 0 a20 20 0 0 1 40 0 a14 14 0 0 1 -28 0 a8 8 0 0 1 16 0"
      stroke={colorHex}
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
    />
  </Svg>
);

// ============================================================
// 🔺 세모 추가 사물들
// ============================================================

// 🎄 크리스마스 트리
export const ChristmasTree = ({ colorHex = "#06D6A0" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 나무 기둥 */}
    <Rect
      x="44"
      y="74"
      width="12"
      height="12"
      fill="#7F4F24"
      stroke={OUTLINE}
      strokeWidth="3"
    />
    {/* 세모 겹침 트리 */}
    <Polygon
      points="50,15 78,50 22,50"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
    <Polygon
      points="50,35 84,74 16,74"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* 꼭대기 별 */}
    <Polygon
      points="50,8 54,16 62,17 56,23 58,31 50,27 42,31 44,23 38,17 46,16"
      fill="#FFD166"
      stroke={OUTLINE}
      strokeWidth="2"
    />
  </Svg>
);

// 🍉 수박 조각
export const WatermelonSlice = ({ colorHex = "#EF476F" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 수박 껍질 (바깥 세모) */}
    <Polygon
      points="50,15 90,80 10,80"
      fill="#06D6A0"
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* 수박 과육 (안쪽 세모) */}
    <Polygon
      points="50,24 82,76 18,76"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    />
    {/* 수박 씨앗들 */}
    <Circle cx="50" cy="48" r="3" fill={OUTLINE} />
    <Circle cx="40" cy="62" r="3" fill={OUTLINE} />
    <Circle cx="60" cy="62" r="3" fill={OUTLINE} />
  </Svg>
);

// ⛺ 텐트
export const Tent = ({ colorHex = "#118AB2" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Polygon
      points="50,18 85,80 15,80"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* 텐트 문 */}
    <Path
      d="M50 48 L65 80 L35 80 Z"
      fill={WHITE}
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    />
    {/* 깃발 */}
    <Path
      d="M50 18 L50 10 L62 14 L50 18 Z"
      fill="#FFD166"
      stroke={OUTLINE}
      strokeWidth="2"
    />
  </Svg>
);

// ============================================================
// 🟦 네모 추가 사물들
// ============================================================

// ✉️ 편지봉투
export const Envelope = ({ colorHex = "#FFFCF2" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Rect
      x="18"
      y="28"
      width="64"
      height="48"
      rx="6"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    {/* 편지 플랩 (X자 모양 선) */}
    <Path
      d="M20 32 L50 56 L80 32"
      fill="none"
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* 하트 우표 스티커 */}
    <Circle
      cx="68"
      cy="44"
      r="7"
      fill="#FF6B6B"
      stroke={OUTLINE}
      strokeWidth="2"
    />
  </Svg>
);

// 🍫 판초콜릿
export const ChocolateBar = ({ colorHex = "#7F4F24" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Rect
      x="20"
      y="22"
      width="60"
      height="60"
      rx="8"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    {/* 초콜릿 조각 격자선 */}
    <Line x1="20" y1="42" x2="80" y2="42" stroke={OUTLINE} strokeWidth="3" />
    <Line x1="20" y1="62" x2="80" y2="62" stroke={OUTLINE} strokeWidth="3" />
    <Line x1="40" y1="22" x2="40" y2="82" stroke={OUTLINE} strokeWidth="3" />
    <Line x1="60" y1="22" x2="60" y2="82" stroke={OUTLINE} strokeWidth="3" />
  </Svg>
);
export const ChocolateBar2 = ({ colorHex = "#7F4F24" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Rect
      x="20"
      y="24"
      width="60"
      height="52"
      rx="6"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    <Line x1="20" y1="50" x2="80" y2="50" stroke="#5A3418" strokeWidth="3" />
    <Line x1="40" y1="24" x2="40" y2="76" stroke="#5A3418" strokeWidth="3" />
    <Line x1="60" y1="24" x2="60" y2="76" stroke="#5A3418" strokeWidth="3" />
    <Path
      d="M27 32 L35 32"
      stroke={WHITE}
      strokeWidth="3"
      strokeLinecap="round"
      opacity={0.5}
    />
  </Svg>
);

// 🧀 치즈 조각 (네모난 슬라이스 치즈)
export const CheeseSlice = ({ colorHex = "#FFD166" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Rect
      x="20"
      y="20"
      width="60"
      height="60"
      rx="8"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    {/* 구멍들 */}
    <Circle
      cx="38"
      cy="38"
      r="7"
      fill="#E09F3E"
      stroke={OUTLINE}
      strokeWidth="3"
    />
    <Circle
      cx="63"
      cy="57"
      r="9"
      fill="#E09F3E"
      stroke={OUTLINE}
      strokeWidth="3"
    />
    <Circle
      cx="60"
      cy="31"
      r="5"
      fill="#E09F3E"
      stroke={OUTLINE}
      strokeWidth="2"
    />
  </Svg>
);

// ============================================================
// ❤️ 하트 추가 사물들
// ============================================================

// 💍 반지 (다이아몬드/하트 보석)
export const Ring = ({ colorHex = "#FFB5C2" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 반지 링 */}
    <Path
      d="M35 62 Q50 85 65 62"
      fill="none"
      stroke="#FFD166"
      strokeWidth="8"
      strokeLinecap="round"
    />
    <Path
      d="M35 62 Q50 85 65 62"
      fill="none"
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinecap="round"
    />
    {/* 상단 하트 보석 */}
    <Path
      d="M50 56 C50 56 32 42 32 28 C32 19 39 14 46 14 C50 14 50 18 50 18 C50 18 50 14 54 14 C61 14 68 19 68 28 C68 42 50 56 50 56 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    />
  </Svg>
);

// 🎁 하트 상자
export const HeartBox = ({ colorHex = "#EF476F" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Path
      d="M50 84 C50 84 16 58 16 34 C16 20 28 12 40 12 C47 12 50 18 50 18 C50 18 53 18 60 12 C72 12 84 20 84 34 C84 58 50 84 50 84 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* 리본 X표시 */}
    <Path
      d="M35 25 Q50 45 65 25"
      fill="none"
      stroke={WHITE}
      strokeWidth="5"
      strokeLinecap="round"
      opacity={0.8}
    />
    <Path
      d="M50 20 L50 75"
      fill="none"
      stroke={WHITE}
      strokeWidth="5"
      strokeLinecap="round"
      opacity={0.8}
    />
  </Svg>
);

// ============================================================
// ⭐ 별 추가 사물들
// ============================================================

// 🎖️ 메달
export const Medal = ({ colorHex = "#FFD166" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 리본 목걸이 */}
    <Path
      d="M35 15 L50 42 L65 15"
      fill="none"
      stroke="#EF476F"
      strokeWidth="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M35 15 L50 42 L65 15"
      fill="none"
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* 별 메달 본체 */}
    <Path
      d="M50 35 L58 52 L78 54 L63 68 L67 87 L50 78 L33 87 L37 68 L22 54 L42 52 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
  </Svg>
);

// 🌵 불가사리 요정 (별 모양 요정 머리)
export const StarCrown = ({ colorHex = "#4CC9F0" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Path
      d="M50 15 L60 38 L85 41 L66 58 L72 82 L50 69 L28 82 L34 58 L15 41 L40 38 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* 보석 박힌 센터 */}
    <Circle
      cx="50"
      cy="52"
      r="10"
      fill={WHITE}
      stroke={OUTLINE}
      strokeWidth="3"
    />
    <Circle cx="50" cy="52" r="4" fill="#F72585" />
  </Svg>
);
export const Sun = ({ colorHex = "#FFD166" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 햇살 */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
      <Line
        key={deg}
        x1="50"
        y1="50"
        x2="50"
        y2="12"
        stroke={colorHex}
        strokeWidth="5"
        strokeLinecap="round"
        transform={`rotate(${deg} 50 50)`}
      />
    ))}
    <Circle
      cx="50"
      cy="50"
      r="22"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    {/* 눈 미소 */}
    <Circle cx="43" cy="47" r="2.5" fill={OUTLINE} />
    <Circle cx="57" cy="47" r="2.5" fill={OUTLINE} />
    <Path
      d="M43 56 Q50 61 57 56"
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
  </Svg>
);
// 🔴 1. 동그라미 (Circle)
export const BasicCircle = ({ colorHex = "#FFB5C2" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Circle
      cx="50"
      cy="50"
      r="34"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    {/* 입체감을 주는 귀여운 반짝임 */}
    <Path
      d="M34 34 Q40 28 48 30"
      stroke={WHITE}
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
      opacity={0.7}
    />
  </Svg>
);

// 🔺 2. 세모 (Triangle)
export const BasicTriangle = ({ colorHex = "#FFD166" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Polygon
      points="50,15 86,80 14,80"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* 반짝임 */}
    <Path
      d="M44 38 L52 28"
      stroke={WHITE}
      strokeWidth="4"
      strokeLinecap="round"
      opacity={0.7}
    />
  </Svg>
);

// 🟦 3. 네모 (Square)
export const BasicSquare = ({ colorHex = "#06D6A0" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Rect
      x="18"
      y="18"
      width="64"
      height="64"
      rx="12"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    {/* 반짝임 */}
    <Path
      d="M28 28 L38 28"
      stroke={WHITE}
      strokeWidth="4"
      strokeLinecap="round"
      opacity={0.7}
    />
  </Svg>
);

// ❤️ 4. 하트 (Heart)
export const BasicHeart = ({ colorHex = "#FF6B6B" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Path
      d="M50 82 C50 82 18 60 18 36 C18 23 28 15 39 15 C46 15 50 21 50 21 C50 21 54 15 61 15 C72 15 82 23 82 36 C82 60 50 82 50 82 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* 반짝임 */}
    <Path
      d="M31 28 L37 34"
      stroke={WHITE}
      strokeWidth="4"
      strokeLinecap="round"
      opacity={0.7}
    />
  </Svg>
);

// ⭐ 5. 별 (Star)
export const BasicStar = ({ colorHex = "#FFB703" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Path
      d="M50 12 L61 38 L89 40 L67 59 L74 86 L50 71 L26 86 L33 59 L11 40 L39 38 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* 반짝임 */}
    <Path
      d="M42 38 L50 26 L58 38"
      stroke={WHITE}
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
      opacity={0.7}
    />
  </Svg>
);

export const RoundBalloon = ({ colorHex = "#9B5DE5" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Circle
      cx="50"
      cy="45"
      r="30"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    <Polygon
      points="47,73 53,73 50,82"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />
    <Path
      d="M50 82 Q54 88 50 92"
      stroke={OUTLINE}
      strokeWidth="2.5"
      fill="none"
    />
    <Path
      d="M34 30 Q40 24 47 26"
      stroke={WHITE}
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
      opacity={0.6}
    />
  </Svg>
);

export const Waffle = ({ colorHex = "#E9B44C" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Rect
      x="18"
      y="18"
      width="64"
      height="64"
      rx="8"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    <Line
      x1="18"
      y1="34"
      x2="82"
      y2="34"
      stroke={WHITE}
      strokeWidth="3"
      opacity={0.6}
    />
    <Line
      x1="18"
      y1="50"
      x2="82"
      y2="50"
      stroke={WHITE}
      strokeWidth="3"
      opacity={0.6}
    />
    <Line
      x1="18"
      y1="66"
      x2="82"
      y2="66"
      stroke={WHITE}
      strokeWidth="3"
      opacity={0.6}
    />
    <Line
      x1="34"
      y1="18"
      x2="34"
      y2="82"
      stroke={WHITE}
      strokeWidth="3"
      opacity={0.6}
    />
    <Line
      x1="50"
      y1="18"
      x2="50"
      y2="82"
      stroke={WHITE}
      strokeWidth="3"
      opacity={0.6}
    />
    <Line
      x1="66"
      y1="18"
      x2="66"
      y2="82"
      stroke={WHITE}
      strokeWidth="3"
      opacity={0.6}
    />
  </Svg>
);
export const Book = ({ colorHex = "#4CC9F0" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Rect
      x="20"
      y="20"
      width="60"
      height="60"
      rx="5"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    <Line x1="50" y1="20" x2="50" y2="80" stroke={OUTLINE} strokeWidth="3" />
    <Path
      d="M28 30 Q40 26 50 30"
      stroke={WHITE}
      strokeWidth="2.5"
      fill="none"
      opacity={0.7}
    />
    <Path
      d="M50 30 Q60 26 72 30"
      stroke={WHITE}
      strokeWidth="2.5"
      fill="none"
      opacity={0.7}
    />
    <Path
      d="M28 42 Q40 38 50 42"
      stroke={WHITE}
      strokeWidth="2.5"
      fill="none"
      opacity={0.7}
    />
    <Path
      d="M50 42 Q60 38 72 42"
      stroke={WHITE}
      strokeWidth="2.5"
      fill="none"
      opacity={0.7}
    />
  </Svg>
);
export const Envelope2 = ({ colorHex = "#FFD6E8" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Rect
      x="18"
      y="28"
      width="64"
      height="46"
      rx="6"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    <Path
      d="M18 30 L50 56 L82 30"
      stroke={OUTLINE}
      strokeWidth="3.5"
      fill="none"
      strokeLinejoin="round"
    />
  </Svg>
);
export const IceCreamCone = ({ colorHex = "#FFB5C2" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Polygon
      points="50,85 65,45 35,45"
      fill="#E9B44C"
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
    <Line x1="40" y1="52" x2="60" y2="60" stroke="#C9925A" strokeWidth="2" />
    <Line x1="38" y1="62" x2="58" y2="70" stroke="#C9925A" strokeWidth="2" />
    <Circle
      cx="50"
      cy="30"
      r="22"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    <Path
      d="M36 22 Q42 16 50 18"
      stroke={WHITE}
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
      opacity={0.6}
    />
  </Svg>
);
export const ChristmasTree2 = ({ colorHex = "#2A9D8F" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Polygon
      points="50,14 68,42 32,42"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    <Polygon
      points="50,32 74,64 26,64"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    <Rect
      x="44"
      y="64"
      width="12"
      height="16"
      fill="#8B5A2B"
      stroke={OUTLINE}
      strokeWidth="3"
    />
    <Circle
      cx="50"
      cy="12"
      r="5"
      fill="#FFD166"
      stroke={OUTLINE}
      strokeWidth="2.5"
    />
    <Circle cx="42" cy="50" r="3" fill="#FFD166" />
    <Circle cx="58" cy="56" r="3" fill="#FF6B6B" />
  </Svg>
);

export const Sandwich = ({ colorHex = "#F4D35E" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Polygon
      points="50,20 85,80 15,80"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
    <Path d="M25 63 L75 63" stroke="#6FCF6F" strokeWidth="6" opacity={0.85} />
    <Path d="M30 70 L70 70" stroke="#EF476F" strokeWidth="5" opacity={0.85} />
  </Svg>
);
export const TriangleFlag = ({ colorHex = "#EF476F" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Line
      x1="30"
      y1="15"
      x2="30"
      y2="88"
      stroke="#8B5A2B"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <Polygon
      points="30,20 78,38 30,56"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
  </Svg>
);
export const HeartLollipop = ({ colorHex = "#F72585" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Line
      x1="50"
      y1="60"
      x2="50"
      y2="88"
      stroke="#C9A66B"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <Path
      d="M50 62 C50 62 22 42 22 24 C22 13 30 8 38 8 C44 8 50 13 50 13 C50 13 56 8 62 8 C70 8 78 13 78 24 C78 42 50 62 50 62 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    <Path
      d="M34 22 L40 28"
      stroke={WHITE}
      strokeWidth="3.5"
      strokeLinecap="round"
      opacity={0.6}
    />
  </Svg>
);
export const HeartEnvelope = ({ colorHex = "#FFD6E8" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Rect
      x="18"
      y="28"
      width="64"
      height="46"
      rx="6"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    <Path
      d="M18 30 L50 56 L82 30"
      stroke={OUTLINE}
      strokeWidth="3"
      fill="none"
      strokeLinejoin="round"
    />
    <Path
      d="M50 44 C50 44 42 38 42 32 C42 28 45 26 48 26 C50 26 50 28 50 28 C50 28 50 26 52 26 C55 26 58 28 58 32 C58 38 50 44 50 44 Z"
      fill="#F72585"
      stroke={OUTLINE}
      strokeWidth="2.5"
    />
  </Svg>
);
export const HeartBadge = ({ colorHex = "#FFD166" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Circle
      cx="50"
      cy="45"
      r="28"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    <Path
      d="M50 60 C50 60 30 46 30 32 C30 24 36 20 42 20 C47 20 50 24 50 24 C50 24 53 20 58 20 C64 20 70 24 70 32 C70 46 50 60 50 60 Z"
      fill={WHITE}
      stroke={OUTLINE}
      strokeWidth="3"
    />
    <Polygon
      points="40,68 60,68 55,88 45,88"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />
  </Svg>
);
export const ShootingStar = ({ colorHex = "#4CC9F0" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Path
      d="M20 75 Q40 60 55 62"
      stroke={colorHex}
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
      opacity={0.6}
    />
    <Path
      d="M60 45 L67 60 L84 62 L71 73 L75 90 L60 81 L45 90 L49 73 L36 62 L53 60 Z"
      fill="#FFD166"
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
  </Svg>
);
export const StarCookie = ({ colorHex = "#E9B44C" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Path
      d="M50 12 L61 38 L89 40 L67 59 L74 86 L50 71 L26 86 L33 59 L11 40 L39 38 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
    <Circle cx="45" cy="48" r="3" fill="#7B341E" />
    <Circle cx="58" cy="42" r="2.5" fill="#7B341E" />
    <Circle cx="55" cy="62" r="3" fill="#7B341E" />
  </Svg>
);
export const StarBalloon = ({ colorHex = "#9B5DE5" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Line
      x1="50"
      y1="74"
      x2="50"
      y2="92"
      stroke={OUTLINE}
      strokeWidth="2"
      opacity={0.7}
    />
    <Path
      d="M50 10 L60 34 L86 36 L66 53 L72 78 L50 65 L28 78 L34 53 L14 36 L40 34 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
    <Path
      d="M38 28 L44 34"
      stroke={WHITE}
      strokeWidth="3.5"
      strokeLinecap="round"
      opacity={0.6}
    />
  </Svg>
);
export const SheriffBadge = ({ colorHex = "#FFD166" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Circle
      cx="50"
      cy="50"
      r="20"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3.5"
    />
    <Path
      d="M50 8 L58 30 L82 32 L62 47 L69 70 L50 57 L31 70 L38 47 L18 32 L42 30 Z"
      fill="none"
      stroke={colorHex}
      strokeWidth="10"
      strokeLinejoin="round"
    />
    <Path
      d="M50 8 L58 30 L82 32 L62 47 L69 70 L50 57 L31 70 L38 47 L18 32 L42 30 Z"
      fill="none"
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
  </Svg>
);

// ============================================================
// 🎯 itemId → SVG 컴포넌트
// ============================================================

export const SHAPE_ITEM_SVGS = {
  ball: Ball,
  wheel: Wheel,
  clock: Clock,
  plate: Plate,
  cookie: Cookie,
  button: Button,
  fullMoon: FullMoon,
  // ⭐ 새로 추가된 동그라미 사물들
  donut: Donut,
  roundDonut: RoundDonut,
  orange: Orange,
  roundOrange: RoundOrange,
  lollipop: Lollipop,
  sun: Sun,
  roundBalloon: RoundBalloon,
  roundLollipop: RoundLollipop,

  box: Box,
  block: Block,
  window: Window,
  bread: Bread,
  frame: Frame,
  giftBox: GiftBox,
  tile: Tile,
  // ⭐ 새로 추가된 네모 사물들
  envelope: Envelope,
  envelope2: Envelope2,
  chocolateBar: ChocolateBar,
  chocolateBar2: ChocolateBar2,
  cheeseSlice: CheeseSlice,
  waffle: Waffle,
  book: Book,

  triangleRiceBall: TriangleRiceBall,
  cakeSlice: CakeSlice,
  roof: Roof,
  pizzaSlice: PizzaSlice,
  mountain: Mountain,
  partyHat: PartyHat,
  // ⭐ 새로 추가된 세모 사물들
  christmasTree: ChristmasTree,
  christmasTree2: ChristmasTree2,
  watermelonSlice: WatermelonSlice,
  tent: Tent,
  iceCreamCone: IceCreamCone,
  sandwich: Sandwich,
  triangleFlag: TriangleFlag,

  heartCookie: HeartCookie,
  heartBalloon: HeartBalloon,
  heartGlasses: HeartGlasses,
  heartChocolate: HeartChocolate,
  // ⭐ 새로 추가된 하트 사물들
  ring: Ring,
  heartBox: HeartBox,
  heartLollipop: HeartLollipop,
  heartEnvelope: HeartEnvelope,
  heartBadge: HeartBadge,

  starSticker: StarSticker,
  magicWand: MagicWand,
  starfish: Starfish,
  starCandy: StarCandy,
  nightStar: NightStar,
  // ⭐ 새로 추가된 별 사물들
  medal: Medal,
  starCrown: StarCrown,
  shootingStar: ShootingStar,
  starCookie: StarCookie,
  starBalloon: StarBalloon,
  sheriffBadge: SheriffBadge,

  basiccircle: BasicCircle,
  basictriangle: BasicTriangle,
  basicsquare: BasicSquare,
  basicheart: BasicHeart,
  basicstar: BasicStar,
} as const;

export const RenderBasicShapeSvg = ({
  shapeId,
  colorHex,
}: ItemSvgProps & { shapeId?: string }) => {
  const renderId = shapeId ? `basic${shapeId}` : undefined;

  const ShapeComponent = renderId
    ? SHAPE_ITEM_SVGS[renderId as keyof typeof SHAPE_ITEM_SVGS]
    : undefined;

  if (!ShapeComponent) {
    return null;
  }

  return <ShapeComponent colorHex={colorHex} />;
};

export const RenderShapeItemSvg = ({
  itemId,
  colorHex,
}: ItemSvgProps & { itemId?: string }) => {
  const ItemComponent = itemId
    ? SHAPE_ITEM_SVGS[itemId as keyof typeof SHAPE_ITEM_SVGS]
    : undefined;

  // 등록된 SVG가 없으면 귀여운 기본 아이콘
  if (!ItemComponent) {
    return (
      <Svg width="100" height="100" viewBox="0 0 100 100">
        <Circle
          cx="50"
          cy="50"
          r="30"
          fill={colorHex ?? DEFAULT_COLOR}
          stroke={OUTLINE}
          strokeWidth="3"
        />

        {/* 눈 */}
        <Circle cx="40" cy="45" r="4" fill={WHITE} />
        <Circle cx="60" cy="45" r="4" fill={WHITE} />

        <Circle cx="40" cy="45" r="2" fill={DARK} />
        <Circle cx="60" cy="45" r="2" fill={DARK} />

        {/* 입 */}
        <Path
          d="M40 60 Q50 70 60 60"
          stroke={DARK}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </Svg>
    );
  }

  return <ItemComponent colorHex={colorHex} />;
};
