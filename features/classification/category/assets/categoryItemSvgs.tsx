import Svg, { Circle, Ellipse, Line, Path, Rect } from "react-native-svg";

// ============================================================
// 공통
// ============================================================

const OUTLINE = "#3A3541";
const WHITE = "#FFFFFF";
const DARK = "#333333";

const DEFAULT_COLOR = "#FFD166";

export type ItemSvgProps = {
  colorHex?: string;
};

// ============================================================
// 🚗 자동차
// ============================================================
export const Car = ({ colorHex = "#E53935" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 차체 */}
    <Path
      d="M18 60
         L25 43
         Q28 37 35 37
         L64 37
         Q72 37 76 44
         L83 60
         L83 72
         L18 72 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 창문 */}
    <Path
      d="M31 42 L47 42 L47 55 L26 55 Z"
      fill="#90CAF9"
      stroke={OUTLINE}
      strokeWidth="3"
    />

    <Path
      d="M51 42 L64 42 Q68 42 71 55 L51 55 Z"
      fill="#90CAF9"
      stroke={OUTLINE}
      strokeWidth="3"
    />

    {/* 바퀴 */}
    <Circle
      cx="31"
      cy="72"
      r="10"
      fill="#303030"
      stroke={OUTLINE}
      strokeWidth="3"
    />
    <Circle
      cx="69"
      cy="72"
      r="10"
      fill="#303030"
      stroke={OUTLINE}
      strokeWidth="3"
    />
    <Circle cx="31" cy="72" r="4" fill="#BDBDBD" />
    <Circle cx="69" cy="72" r="4" fill="#BDBDBD" />

    {/* 전조등 */}
    <Circle cx="22" cy="57" r="4" fill="#FFF59D" />
    <Circle cx="78" cy="57" r="4" fill="#FFF59D" />
  </Svg>
);

// ============================================================
// 🚌 버스
// ============================================================

export const Bus = ({ colorHex = "#FDD835" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 버스 몸체 */}
    <Rect
      x="16"
      y="23"
      width="68"
      height="55"
      rx="10"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 앞 유리 */}
    <Rect
      x="22"
      y="31"
      width="56"
      height="23"
      rx="4"
      fill="#90CAF9"
      stroke={OUTLINE}
      strokeWidth="3"
    />

    {/* 창문 나누기 */}
    <Line x1="36" y1="31" x2="36" y2="54" stroke={OUTLINE} strokeWidth="2" />
    <Line x1="50" y1="31" x2="50" y2="54" stroke={OUTLINE} strokeWidth="2" />
    <Line x1="64" y1="31" x2="64" y2="54" stroke={OUTLINE} strokeWidth="2" />

    {/* 범퍼 */}
    <Rect
      x="20"
      y="57"
      width="60"
      height="7"
      rx="3"
      fill="#FFFFFF"
      opacity={0.7}
    />

    {/* 바퀴 */}
    <Circle
      cx="31"
      cy="78"
      r="9"
      fill="#303030"
      stroke={OUTLINE}
      strokeWidth="3"
    />
    <Circle
      cx="69"
      cy="78"
      r="9"
      fill="#303030"
      stroke={OUTLINE}
      strokeWidth="3"
    />
  </Svg>
);

// ============================================================
// 🚂 기차
// ============================================================

export const Train = ({ colorHex = "#42A5F5" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 기관차 */}
    <Rect
      x="20"
      y="25"
      width="52"
      height="48"
      rx="6"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 굴뚝 */}
    <Rect
      x="30"
      y="15"
      width="10"
      height="12"
      fill="#616161"
      stroke={OUTLINE}
      strokeWidth="3"
    />

    {/* 창문 */}
    <Rect
      x="30"
      y="34"
      width="15"
      height="13"
      rx="2"
      fill="#90CAF9"
      stroke={OUTLINE}
      strokeWidth="3"
    />

    <Rect
      x="49"
      y="34"
      width="15"
      height="13"
      rx="2"
      fill="#90CAF9"
      stroke={OUTLINE}
      strokeWidth="3"
    />

    {/* 앞부분 */}
    <Rect x="16" y="55" width="60" height="12" rx="4" fill="#FDD835" />

    {/* 연결 객차 */}
    <Rect
      x="72"
      y="35"
      width="15"
      height="38"
      rx="3"
      fill="#EF5350"
      stroke={OUTLINE}
      strokeWidth="3"
    />

    {/* 바퀴 */}
    <Circle cx="32" cy="76" r="8" fill="#303030" />
    <Circle cx="61" cy="76" r="8" fill="#303030" />
    <Circle cx="79" cy="76" r="7" fill="#303030" />
  </Svg>
);

// ============================================================
// ✈️ 비행기
// ============================================================

export const Airplane = ({ colorHex = "#90CAF9" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 비행기 몸체 */}
    <Path
      d="M15 47
         L43 43
         L43 20
         Q50 15 57 20
         L57 43
         L85 47
         Q91 49 85 54
         L57 57
         L57 78
         L50 84
         L43 78
         L43 57
         L15 54
         Q9 51 15 47 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 창문 */}
    <Circle cx="50" cy="31" r="4" fill="#42A5F5" />
    <Circle cx="50" cy="43" r="3" fill="#42A5F5" />
  </Svg>
);

// ============================================================
// 🚢 배
// ============================================================

export const Ship = ({ colorHex = "#42A5F5" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 선체 */}
    <Path
      d="M16 57 L84 57 L73 76 Q50 87 27 76 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 갑판 */}
    <Rect
      x="28"
      y="43"
      width="44"
      height="14"
      fill="#FFFFFF"
      stroke={OUTLINE}
      strokeWidth="3"
    />

    {/* 선실 */}
    <Rect
      x="38"
      y="29"
      width="24"
      height="14"
      rx="2"
      fill="#FFFFFF"
      stroke={OUTLINE}
      strokeWidth="3"
    />

    {/* 창문 */}
    <Circle cx="44" cy="36" r="3" fill="#42A5F5" />
    <Circle cx="56" cy="36" r="3" fill="#42A5F5" />

    {/* 굴뚝 */}
    <Rect
      x="62"
      y="22"
      width="7"
      height="12"
      fill="#EF5350"
      stroke={OUTLINE}
      strokeWidth="3"
    />

    {/* 물결 */}
    <Path
      d="M15 84 Q25 78 35 84 Q45 90 55 84 Q65 78 75 84 Q82 88 88 84"
      fill="none"
      stroke="#64B5F6"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </Svg>
);
// ============================================================
// 🍚 밥
// ============================================================

export const Rice = ({ colorHex = "#FFFFFF" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 밥 */}
    <Path
      d="M24 47
         Q28 27 50 29
         Q72 27 76 47
         Q73 59 50 61
         Q27 59 24 47 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 밥알 */}
    <Ellipse cx="39" cy="42" rx="3" ry="5" fill="#E0E0E0" />
    <Ellipse cx="51" cy="37" rx="3" ry="5" fill="#E0E0E0" />
    <Ellipse cx="61" cy="44" rx="3" ry="5" fill="#E0E0E0" />

    {/* 그릇 */}
    <Path
      d="M20 56 Q50 66 80 56 L75 75 Q50 88 25 75 Z"
      fill="#90CAF9"
      stroke={OUTLINE}
      strokeWidth="4"
    />
  </Svg>
);

// ============================================================
// 🍙 김밥
// ============================================================

export const Gimbap = ({ colorHex = "#212121" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 김밥 단면 */}
    <Circle
      cx="50"
      cy="50"
      r="32"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 밥 */}
    <Circle cx="50" cy="50" r="24" fill="#FFFFFF" />

    {/* 속재료 */}
    <Rect x="40" y="38" width="10" height="10" rx="2" fill="#F44336" />
    <Rect x="51" y="39" width="9" height="9" rx="2" fill="#FFD54F" />
    <Rect x="39" y="50" width="10" height="10" rx="2" fill="#43A047" />
    <Rect x="51" y="50" width="10" height="10" rx="2" fill="#FF9800" />
  </Svg>
);

// ============================================================
// 🍕 피자
// ============================================================

export const Pizza = ({ colorHex = "#F9A825" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 도우 */}
    <Path
      d="M50 18 L82 78 Q50 91 18 78 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 치즈 */}
    <Path d="M50 27 L73 72 Q50 80 27 72 Z" fill="#FFD54F" />

    {/* 페퍼로니 */}
    <Circle cx="45" cy="48" r="5" fill="#E53935" />
    <Circle cx="61" cy="59" r="5" fill="#E53935" />
    <Circle cx="40" cy="65" r="4" fill="#E53935" />
  </Svg>
);

// ============================================================
// 🍔 햄버거
// ============================================================

export const Hamburger = ({ colorHex = "#D4A574" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 빵 위 */}
    <Path
      d="M20 43 Q23 23 50 22 Q77 23 80 43 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 깨 */}
    <Ellipse cx="38" cy="32" rx="3" ry="2" fill="#FFF3CD" />
    <Ellipse cx="50" cy="29" rx="3" ry="2" fill="#FFF3CD" />
    <Ellipse cx="62" cy="32" rx="3" ry="2" fill="#FFF3CD" />

    {/* 치즈 */}
    <Rect x="22" y="44" width="56" height="8" fill="#FFD54F" />

    {/* 패티 */}
    <Rect x="20" y="52" width="60" height="10" rx="4" fill="#6D4C41" />

    {/* 양상추 */}
    <Path
      d="M20 62 Q27 57 34 63 Q41 57 48 63 Q55 57 62 63 Q69 57 80 62 L77 69 L23 69 Z"
      fill="#66BB6A"
      stroke={OUTLINE}
      strokeWidth="2"
    />

    {/* 아래 빵 */}
    <Path
      d="M22 69 L78 69 Q76 82 50 83 Q24 82 22 69 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
  </Svg>
);

// ============================================================
// 🎂 케이크
// ============================================================

export const Cake = ({ colorHex = "#F48FB1" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 케이크 몸체 */}
    <Rect
      x="20"
      y="45"
      width="60"
      height="34"
      rx="5"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 크림 */}
    <Path
      d="M20 47 Q28 38 36 47 Q44 38 52 47 Q60 38 68 47 Q75 39 80 47"
      fill="#FFFFFF"
      stroke={OUTLINE}
      strokeWidth="3"
    />

    {/* 초 */}
    <Rect x="47" y="23" width="6" height="16" rx="2" fill="#64B5F6" />

    {/* 불꽃 */}
    <Path
      d="M50 22 Q44 15 50 9 Q56 15 50 22"
      fill="#FF9800"
      stroke={OUTLINE}
      strokeWidth="2"
    />

    {/* 장식 */}
    <Circle cx="31" cy="59" r="3" fill="#FFD54F" />
    <Circle cx="50" cy="66" r="3" fill="#64B5F6" />
    <Circle cx="68" cy="59" r="3" fill="#66BB6A" />
  </Svg>
);

// ============================================================
// 🍪 쿠키
// ============================================================

export const Cookie = ({ colorHex = "#D7A86E" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Circle
      cx="50"
      cy="52"
      r="30"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 초코칩 */}
    <Circle cx="37" cy="40" r="4" fill="#5D4037" />
    <Circle cx="57" cy="37" r="4" fill="#5D4037" />
    <Circle cx="67" cy="53" r="4" fill="#5D4037" />
    <Circle cx="43" cy="63" r="4" fill="#5D4037" />
    <Circle cx="58" cy="70" r="4" fill="#5D4037" />
  </Svg>
);

// ============================================================
// 🍦 아이스크림
// ============================================================

export const IceCream = ({ colorHex = "#F48FB1" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 콘 */}
    <Path
      d="M34 55 L66 55 L55 84 Q50 90 45 84 Z"
      fill="#D7A86E"
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 콘 무늬 */}
    <Line x1="39" y1="61" x2="54" y2="81" stroke="#A67C52" strokeWidth="2" />
    <Line x1="61" y1="61" x2="46" y2="81" stroke="#A67C52" strokeWidth="2" />

    {/* 아이스크림 */}
    <Circle
      cx="50"
      cy="42"
      r="24"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 토핑 */}
    <Circle cx="40" cy="34" r="3" fill="#FFD54F" />
    <Circle cx="59" cy="38" r="3" fill="#64B5F6" />
  </Svg>
);
// ============================================================
// 🍎 사과
// ============================================================

export const Apple = ({ colorHex = "#E53935" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 사과 */}
    <Path
      d="M50 31
         Q36 21 25 33
         Q12 48 20 69
         Q28 88 50 84
         Q72 88 80 69
         Q88 48 75 33
         Q64 21 50 31 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 꼭지 */}
    <Path
      d="M50 31 Q49 20 55 14"
      fill="none"
      stroke="#5D4037"
      strokeWidth="5"
      strokeLinecap="round"
    />

    {/* 잎 */}
    <Path
      d="M53 22 Q64 11 75 18 Q66 28 53 25 Z"
      fill="#43A047"
      stroke={OUTLINE}
      strokeWidth="3"
    />

    {/* 하이라이트 */}
    <Ellipse
      cx="34"
      cy="48"
      rx="7"
      ry="4"
      fill={WHITE}
      opacity={0.35}
      transform="rotate(-35 34 48)"
    />
  </Svg>
);

// ============================================================
// 🍌 바나나
// ============================================================

export const Banana = ({ colorHex = "#FDD835" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Path
      d="M24 26
         Q24 58 47 70
         Q68 80 80 57
         Q83 51 79 46
         Q73 65 58 63
         Q39 59 38 29
         Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 꼭지 */}
    <Path
      d="M24 26 Q21 20 25 16"
      fill="none"
      stroke="#6D4C41"
      strokeWidth="5"
      strokeLinecap="round"
    />

    <Path
      d="M77 47 Q83 43 86 46"
      fill="none"
      stroke="#6D4C41"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </Svg>
);

// ============================================================
// 🍓 딸기
// ============================================================

export const Strawberry = ({ colorHex = "#E53935" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Path
      d="M20 39
         Q50 27 80 39
         Q76 67 50 84
         Q24 67 20 39 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 잎 */}
    <Path
      d="M50 40
         Q38 31 29 35
         Q36 27 44 29
         Q45 18 50 28
         Q56 18 57 29
         Q68 25 73 35
         Q61 31 50 40 Z"
      fill="#43A047"
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    />

    {/* 씨 */}
    <Ellipse cx="36" cy="48" rx="2" ry="4" fill="#FFD54F" />
    <Ellipse cx="50" cy="45" rx="2" ry="4" fill="#FFD54F" />
    <Ellipse cx="64" cy="48" rx="2" ry="4" fill="#FFD54F" />
    <Ellipse cx="43" cy="59" rx="2" ry="4" fill="#FFD54F" />
    <Ellipse cx="57" cy="59" rx="2" ry="4" fill="#FFD54F" />
    <Ellipse cx="50" cy="70" rx="2" ry="4" fill="#FFD54F" />
  </Svg>
);

// ============================================================
// 🍉 수박
// ============================================================

export const Watermelon = ({ colorHex = "#43A047" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 수박 반쪽 */}
    <Path
      d="M15 42 Q50 88 85 42 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 속 */}
    <Path
      d="M22 44 Q50 78 78 44 Z"
      fill="#F56C73"
      stroke={OUTLINE}
      strokeWidth="3"
    />

    {/* 흰 부분 */}
    <Path
      d="M22 44 Q50 76 78 44"
      fill="none"
      stroke="#F5F5F5"
      strokeWidth="5"
    />

    {/* 씨 */}
    <Ellipse cx="38" cy="57" rx="2" ry="4" fill={DARK} />
    <Ellipse cx="50" cy="63" rx="2" ry="4" fill={DARK} />
    <Ellipse cx="62" cy="57" rx="2" ry="4" fill={DARK} />
  </Svg>
);

// ============================================================
// 🥕 당근
// ============================================================

export const Carrot = ({ colorHex = "#FF7043" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 잎 */}
    <Path
      d="M48 30 Q35 18 37 9
         M50 30 Q50 15 55 7
         M53 30 Q66 18 67 10"
      fill="none"
      stroke="#43A047"
      strokeWidth="6"
      strokeLinecap="round"
    />

    {/* 당근 */}
    <Path
      d="M28 30 Q50 37 72 30 L61 77 Q50 91 39 77 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 줄 */}
    <Path
      d="M38 46 L61 49 M37 58 L58 61 M41 70 L55 72"
      fill="none"
      stroke="#E64A19"
      strokeWidth="2.5"
      opacity={0.6}
    />
  </Svg>
);

// ============================================================
// 🥒 오이
// ============================================================

export const Cucumber = ({ colorHex = "#66BB6A" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Ellipse
      cx="50"
      cy="52"
      rx="17"
      ry="37"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      transform="rotate(35 50 52)"
    />

    {/* 오이 돌기 */}
    <Circle cx="38" cy="39" r="2" fill="#2E7D32" />
    <Circle cx="49" cy="34" r="2" fill="#2E7D32" />
    <Circle cx="59" cy="42" r="2" fill="#2E7D32" />
    <Circle cx="44" cy="54" r="2" fill="#2E7D32" />
    <Circle cx="57" cy="59" r="2" fill="#2E7D32" />
    <Circle cx="50" cy="70" r="2" fill="#2E7D32" />
  </Svg>
);

// ============================================================
// 🍅 토마토
// ============================================================

export const Tomato = ({ colorHex = "#EF5350" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Circle
      cx="50"
      cy="55"
      r="31"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 꼭지 */}
    <Path
      d="M50 32 L50 24 M50 28 L35 22 L42 34 M50 28 L65 22 L58 34"
      fill="#43A047"
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
      strokeLinecap="round"
    />

    {/* 하이라이트 */}
    <Ellipse
      cx="36"
      cy="46"
      rx="6"
      ry="4"
      fill={WHITE}
      opacity={0.3}
      transform="rotate(-30 36 46)"
    />
  </Svg>
);

// ============================================================
// 🐶 개
// ============================================================

export const Dog = ({ colorHex = "#D4A574" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 귀 */}
    <Ellipse
      cx="27"
      cy="42"
      rx="13"
      ry="22"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      transform="rotate(-18 27 42)"
    />

    <Ellipse
      cx="73"
      cy="42"
      rx="13"
      ry="22"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      transform="rotate(18 73 42)"
    />

    {/* 얼굴 */}
    <Circle
      cx="50"
      cy="51"
      r="29"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 눈 */}
    <Circle cx="39" cy="49" r="4" fill={DARK} />
    <Circle cx="61" cy="49" r="4" fill={DARK} />

    {/* 눈 하이라이트 */}
    <Circle cx="40" cy="48" r="1.4" fill={WHITE} />
    <Circle cx="62" cy="48" r="1.4" fill={WHITE} />

    {/* 주둥이 */}
    <Ellipse
      cx="50"
      cy="62"
      rx="13"
      ry="10"
      fill="#F3D5C0"
      stroke={OUTLINE}
      strokeWidth="2.5"
    />

    {/* 코 */}
    <Ellipse cx="50" cy="59" rx="5" ry="4" fill={DARK} />

    {/* 입 */}
    <Path
      d="M50 63 Q45 70 40 67 M50 63 Q55 70 60 67"
      fill="none"
      stroke={OUTLINE}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </Svg>
);

// ============================================================
// 🐱 고양이
// ============================================================

export const Cat = ({ colorHex = "#F4A460" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 귀 */}
    <Path
      d="M24 42 L27 18 L44 34 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    <Path
      d="M76 42 L73 18 L56 34 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 얼굴 */}
    <Circle
      cx="50"
      cy="53"
      r="29"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 눈 */}
    <Ellipse cx="39" cy="51" rx="4" ry="5" fill={DARK} />
    <Ellipse cx="61" cy="51" rx="4" ry="5" fill={DARK} />

    {/* 코 */}
    <Path
      d="M46 61 Q50 58 54 61 Q50 65 46 61"
      fill="#F28B9C"
      stroke={OUTLINE}
      strokeWidth="2"
    />

    {/* 입 */}
    <Path
      d="M50 64 Q45 69 41 67 M50 64 Q55 69 59 67"
      fill="none"
      stroke={OUTLINE}
      strokeWidth="2.5"
      strokeLinecap="round"
    />

    {/* 수염 */}
    <Line x1="27" y1="59" x2="10" y2="55" stroke={OUTLINE} strokeWidth="2" />
    <Line x1="27" y1="65" x2="10" y2="66" stroke={OUTLINE} strokeWidth="2" />
    <Line x1="73" y1="59" x2="90" y2="55" stroke={OUTLINE} strokeWidth="2" />
    <Line x1="73" y1="65" x2="90" y2="66" stroke={OUTLINE} strokeWidth="2" />
  </Svg>
);

// ============================================================
// 🐰 토끼
// ============================================================

export const Rabbit = ({ colorHex = "#F5F5F5" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 긴 귀 */}
    <Ellipse
      cx="37"
      cy="27"
      rx="10"
      ry="25"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      transform="rotate(-8 37 27)"
    />

    <Ellipse
      cx="63"
      cy="27"
      rx="10"
      ry="25"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      transform="rotate(8 63 27)"
    />

    {/* 귀 안쪽 */}
    <Ellipse cx="37" cy="27" rx="4" ry="17" fill="#FFB6C1" />
    <Ellipse cx="63" cy="27" rx="4" ry="17" fill="#FFB6C1" />

    {/* 얼굴 */}
    <Circle
      cx="50"
      cy="57"
      r="27"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 눈 */}
    <Circle cx="40" cy="54" r="4" fill={DARK} />
    <Circle cx="60" cy="54" r="4" fill={DARK} />

    {/* 코 */}
    <Path d="M46 63 Q50 59 54 63 Q50 67 46 63" fill="#FF9FB0" />

    {/* 입 */}
    <Path
      d="M50 66 L50 70 M50 70 Q45 73 42 70 M50 70 Q55 73 58 70"
      fill="none"
      stroke={OUTLINE}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

// ============================================================
// 🐔 닭
// ============================================================

export const Chicken = ({ colorHex = "#F5F5F5" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 몸 */}
    <Ellipse
      cx="52"
      cy="58"
      rx="27"
      ry="23"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 머리 */}
    <Circle
      cx="62"
      cy="36"
      r="20"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 볏 */}
    <Path
      d="M52 19 Q55 9 61 18 Q66 7 70 18 Q78 10 78 23"
      fill="#E53935"
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    />

    {/* 부리 */}
    <Path
      d="M80 35 L94 41 L80 47 Z"
      fill="#FFB300"
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    />

    {/* 눈 */}
    <Circle cx="68" cy="33" r="4" fill={DARK} />
    <Circle cx="69" cy="32" r="1.3" fill={WHITE} />

    {/* 날개 */}
    <Ellipse
      cx="42"
      cy="58"
      rx="13"
      ry="17"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />

    {/* 다리 */}
    <Line x1="44" y1="78" x2="42" y2="89" stroke={OUTLINE} strokeWidth="3" />
    <Line x1="62" y1="78" x2="64" y2="89" stroke={OUTLINE} strokeWidth="3" />
  </Svg>
);

// ============================================================
// 🦆 오리
// ============================================================

export const Duck = ({ colorHex = "#FFEB3B" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 몸 */}
    <Ellipse
      cx="48"
      cy="61"
      rx="29"
      ry="20"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 머리 */}
    <Circle
      cx="67"
      cy="39"
      r="21"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 부리 */}
    <Path
      d="M84 39 Q97 40 87 49 Q80 49 77 45 Z"
      fill="#FF9800"
      stroke={OUTLINE}
      strokeWidth="3"
    />

    {/* 눈 */}
    <Circle cx="72" cy="34" r="4" fill={DARK} />
    <Circle cx="73" cy="33" r="1.3" fill={WHITE} />

    {/* 날개 */}
    <Ellipse
      cx="42"
      cy="59"
      rx="14"
      ry="11"
      fill="#FBC02D"
      stroke={OUTLINE}
      strokeWidth="3"
    />

    {/* 발 */}
    <Path
      d="M36 80 Q42 84 48 80"
      fill="none"
      stroke="#FF9800"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </Svg>
);

// ============================================================
// 🐧 펭귄
// ============================================================

export const Penguin = ({ colorHex = "#2C2C2C" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 몸 */}
    <Ellipse
      cx="50"
      cy="55"
      rx="29"
      ry="36"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 배 */}
    <Ellipse
      cx="50"
      cy="60"
      rx="19"
      ry="26"
      fill={WHITE}
      stroke={OUTLINE}
      strokeWidth="2"
    />

    {/* 얼굴 */}
    <Circle cx="41" cy="37" r="8" fill={WHITE} />
    <Circle cx="59" cy="37" r="8" fill={WHITE} />

    {/* 눈 */}
    <Circle cx="42" cy="37" r="3" fill={DARK} />
    <Circle cx="58" cy="37" r="3" fill={DARK} />

    {/* 부리 */}
    <Path
      d="M44 44 L50 50 L56 44 L50 42 Z"
      fill="#FF9800"
      stroke={OUTLINE}
      strokeWidth="2"
    />

    {/* 발 */}
    <Ellipse cx="39" cy="89" rx="10" ry="5" fill="#FF9800" />
    <Ellipse cx="61" cy="89" rx="10" ry="5" fill="#FF9800" />
  </Svg>
);

// ============================================================
// 🐋 고래
// ============================================================

export const Whale = ({ colorHex = "#42A5F5" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 몸 */}
    <Path
      d="M18 56
         Q20 35 47 34
         Q68 32 80 49
         Q86 55 94 49
         Q92 64 78 66
         Q66 82 43 78
         Q23 75 18 56 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 꼬리 */}
    <Path
      d="M18 56 Q7 45 8 36 Q18 40 25 49 Q18 53 18 56 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 물 뿜기 */}
    <Path
      d="M48 34 Q44 20 38 17 M48 34 Q50 18 56 14"
      fill="none"
      stroke="#42A5F5"
      strokeWidth="3"
      strokeLinecap="round"
    />

    {/* 눈 */}
    <Circle cx="70" cy="48" r="4" fill={DARK} />
    <Circle cx="71" cy="47" r="1.3" fill={WHITE} />

    {/* 배 */}
    <Path
      d="M35 67 Q53 75 68 65"
      fill="none"
      stroke={WHITE}
      strokeWidth="5"
      opacity={0.7}
    />
  </Svg>
);

// ============================================================
// 🦈 상어
// ============================================================

export const Shark = ({ colorHex = "#78909C" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 몸 */}
    <Path
      d="M10 55
         Q25 35 59 39
         Q74 41 91 55
         Q74 70 54 72
         Q30 74 10 55 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 등지느러미 */}
    <Path
      d="M48 41 L57 19 L64 42 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 아래 지느러미 */}
    <Path
      d="M53 70 L61 85 L66 68 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 꼬리 */}
    <Path
      d="M88 55 L99 40 L96 55 L99 70 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 눈 */}
    <Circle cx="72" cy="51" r="4" fill={DARK} />
    <Circle cx="73" cy="50" r="1.2" fill={WHITE} />

    {/* 아가미 */}
    <Path
      d="M64 57 Q62 62 64 66 M69 57 Q67 62 69 66"
      fill="none"
      stroke={OUTLINE}
      strokeWidth="2"
    />
  </Svg>
);

// ============================================================
// 🐙 문어
// ============================================================

export const Octopus = ({ colorHex = "#AB47BC" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 머리 */}
    <Path
      d="M23 53
         Q22 24 50 24
         Q78 24 77 53
         L76 63
         Q69 71 61 64
         Q55 74 50 65
         Q44 74 38 64
         Q31 71 24 63 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 눈 */}
    <Circle
      cx="40"
      cy="48"
      r="5"
      fill={WHITE}
      stroke={OUTLINE}
      strokeWidth="2"
    />
    <Circle
      cx="60"
      cy="48"
      r="5"
      fill={WHITE}
      stroke={OUTLINE}
      strokeWidth="2"
    />

    <Circle cx="40" cy="48" r="2.5" fill={DARK} />
    <Circle cx="60" cy="48" r="2.5" fill={DARK} />

    {/* 볼 */}
    <Circle cx="31" cy="57" r="4" fill="#F48FB1" opacity={0.6} />
    <Circle cx="69" cy="57" r="4" fill="#F48FB1" opacity={0.6} />
  </Svg>
);

// ============================================================
// 🐬 돌고래
// ============================================================

export const Dolphin = ({ colorHex = "#42A5F5" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 몸 */}
    <Path
      d="M12 57
         Q30 38 57 43
         Q71 45 82 55
         Q69 70 49 69
         Q29 68 12 57 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 등지느러미 */}
    <Path
      d="M52 44 L60 27 L66 46 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />

    {/* 꼬리 */}
    <Path
      d="M80 55 Q92 45 96 42 Q94 54 87 58 Q95 63 96 72 Q88 68 80 61"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 주둥이 */}
    <Path
      d="M13 57 Q7 54 5 59 Q10 62 16 61"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />

    {/* 눈 */}
    <Circle cx="67" cy="52" r="3.5" fill={DARK} />
  </Svg>
);
export const CATEGORY_ITEM_SVGS = {
  dog: Dog,
  cat: Cat,
  rabbit: Rabbit,
  chicken: Chicken,
  duck: Duck,
  penguin: Penguin,
  whale: Whale,
  shark: Shark,
  octopus: Octopus,
  dolphin: Dolphin,

  apple: Apple,
  banana: Banana,
  strawberry: Strawberry,
  watermelon: Watermelon,
  carrot: Carrot,
  cucumber: Cucumber,
  tomato: Tomato,

  rice: Rice,
  gimbap: Gimbap,
  pizza: Pizza,
  hamburger: Hamburger,
  cake: Cake,
  cookie: Cookie,
  iceCream: IceCream,

  car: Car,
  bus: Bus,
  train: Train,
  airplane: Airplane,
  ship: Ship,
} as const;

const COLOR_HEX_MAP: Record<string, string> = {
  red: "#F44336",
  blue: "#42A5F5",
  yellow: "#FFD166",
  green: "#66BB6A",
  black: "#333333",
  white: "#FFFFFF",
};
const resolveColor = (colorHex?: string) => {
  if (!colorHex) {
    return undefined;
  }
  return COLOR_HEX_MAP[colorHex] ?? colorHex;
};
export const RenderCategoryItemSvg = ({
  itemId,
  colorHex,
}: ItemSvgProps & { itemId?: string }) => {
  const ItemComponent = itemId
    ? CATEGORY_ITEM_SVGS[itemId as keyof typeof CATEGORY_ITEM_SVGS]
    : undefined;

  // SVG가 아직 없는 경우
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

        <Circle cx="40" cy="45" r="4" fill={WHITE} />
        <Circle cx="60" cy="45" r="4" fill={WHITE} />
        <Circle cx="40" cy="45" r="2" fill={DARK} />
        <Circle cx="60" cy="45" r="2" fill={DARK} />

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
  const resolvedColor = resolveColor(colorHex);

  return <ItemComponent colorHex={resolvedColor} />;
};
