import React from "react";
import Svg, { Circle, Ellipse, Path, Polygon, Rect, G } from "react-native-svg";
import { getColorVariants } from "../../../utils/colorUtils";

interface ItemSvgProps {
  colorHex: string;
}

/* ==================================================
   공통 스타일
================================================== */

const OUTLINE = "#4B5563";
const WHITE = "#FFFFFF";
const DARK = "#2C3E50";

const ORANGE = "#FB923C";
const PINK = "#FF9EC4";
const BROWN = "#9A5B32";
const LIGHT_BROWN = "#D99A62";
const GREEN = "#62C370";
const DARK_GREEN = "#3D9A55";
const RED = "#FF6B6B";
const YELLOW = "#FFD84D";
const WATERMELON_RED = "#FF7B7B";
const WATERMELON_GREEN = "#4DBA70";
const PURPLE = "#8B6BE8";

export const Apple = ({ colorHex }: ItemSvgProps) => {
  const colors = getColorVariants(colorHex);

  return (
    <Svg width="100" height="100" viewBox="0 0 100 100">
      <Path
        d="
        M50 28
        C42 20 26 23 20 38
        C13 56 23 82 50 82
        C77 82 87 56 80 38
        C74 23 58 20 50 28Z
      "
        fill={colorHex}
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

const Strawberry = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    <Path
      d="M50 82
         C38 70 25 55 27 42
         C29 29 41 25 50 31
         C59 25 71 29 73 42
         C75 55 62 70 50 82Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 잎 */}
    <Path
      d="M50 34
         C42 25 34 25 30 30
         C37 31 42 35 50 34
         C58 35 63 31 70 30
         C66 25 58 25 50 34Z"
      fill={GREEN}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 씨앗 */}
    <Ellipse cx="40" cy="48" rx="2" ry="4" fill="#FDE68A" />
    <Ellipse cx="52" cy="45" rx="2" ry="4" fill="#FDE68A" />
    <Ellipse cx="62" cy="50" rx="2" ry="4" fill="#FDE68A" />
    <Ellipse cx="47" cy="60" rx="2" ry="4" fill="#FDE68A" />
    <Ellipse cx="57" cy="64" rx="2" ry="4" fill="#FDE68A" />
  </Svg>
);

// export const Strawberry = ({ colorHex }: ItemSvgProps) => (
//   <Svg width="100" height="100" viewBox="0 0 100 100">
//     <Path
//       d="
//         M25 35
//         C30 22 70 22 75 35
//         C80 50 67 80 50 87
//         C33 80 20 50 25 35Z
//       "
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />

//     <Path
//       d="M50 28 L42 15 L50 19 L58 15Z"
//       fill={GREEN}
//       stroke={OUTLINE}
//       strokeWidth="3"
//       strokeLinejoin="round"
//     />
//     <Ellipse cx="40" cy="48" rx="2" ry="4" fill="#FDE68A" />
//     <Ellipse cx="52" cy="45" rx="2" ry="4" fill="#FDE68A" />

//     <Ellipse cx="47" cy="60" rx="2" ry="4" fill="#FDE68A" />
//     <Ellipse cx="57" cy="64" rx="2" ry="4" fill="#FDE68A" />
//     <Ellipse cx="32" cy="55" rx="2" ry="4" fill="#FDE68A" />
//     <Ellipse cx="69" cy="45" rx="2" ry="4" fill="#FDE68A" />

//     {/* <Circle cx="36" cy="47" r="2.5" fill={YELLOW} />
//     <Circle cx="51" cy="43" r="2.5" fill={YELLOW} />
//     <Circle cx="64" cy="50" r="2.5" fill={YELLOW} />
//     <Circle cx="42" cy="61" r="2.5" fill={YELLOW} />
//     <Circle cx="57" cy="65" r="2.5" fill={YELLOW} /> */}

//     <Ellipse
//       cx="35"
//       cy="39"
//       rx="6"
//       ry="9"
//       fill={WHITE}
//       opacity={0.3}
//       transform="rotate(25 35 39)"
//     />
//   </Svg>
// );

const Balloon = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    <Ellipse
      cx="50"
      cy="40"
      rx="27"
      ry="32"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Polygon points="46,69 54,69 50,77" fill={colorHex} />

    <Path
      d="M50 77 C48 85 55 88 51 96"
      stroke="#94A3B8"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
    />

    <Ellipse cx="40" cy="30" rx="7" ry="11" fill={WHITE} opacity={0.5} />
  </Svg>
);

const FireTruck = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    <Rect
      x="12"
      y="38"
      width="58"
      height="36"
      rx="8"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Rect
      x="68"
      y="48"
      width="20"
      height="26"
      rx="5"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 창문 */}
    <Rect
      x="73"
      y="52"
      width="11"
      height="10"
      rx="3"
      fill="#BAE6FD"
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 사다리 */}
    <Rect
      x="25"
      y="28"
      width="38"
      height="6"
      rx="3"
      fill="#F8FAFC"
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Circle cx="27" cy="77" r="9" fill={DARK} />
    <Circle cx="73" cy="77" r="9" fill={DARK} />

    <Circle cx="27" cy="77" r="4" fill="#CBD5E1" />
    <Circle cx="73" cy="77" r="4" fill="#CBD5E1" />
  </Svg>
);
const Cherry = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    <Circle
      cx="37"
      cy="62"
      r="17"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Circle
      cx="63"
      cy="62"
      r="17"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Path
      d="M37 47 C40 27 50 22 63 45"
      stroke={GREEN}
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
    />

    <Path
      d="M47 29 C54 20 67 21 71 27 C61 32 53 32 47 29Z"
      fill={GREEN}
      stroke={OUTLINE}
      strokeWidth="4"
    />
  </Svg>
);
// const Fish = ({ colorHex }: ItemSvgProps) => (
//   <Svg width="100" height="100" viewBox="0 0 100 100">
//     <Path
//       d="M20 50
//          C32 30 64 28 77 50
//          C64 72 32 70 20 50Z"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />

//     <Polygon
//       points="76,50 92,35 92,65"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />

//     <Circle cx="38" cy="44" r="5" fill={WHITE} />
//     <Circle cx="39" cy="44" r="2.5" fill={DARK} />

//     <Path
//       d="M52 42 Q60 50 52 58"
//       stroke={WHITE}
//       strokeWidth="3"
//       fill="none"
//       opacity={0.7}
//     />
//   </Svg>
// );
const Fish = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    {/* 꼬리 */}

    <Path
      d="
        M70 50
        L88 30
        L86 70
        Z
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 몸통 */}

    <Path
      d="
        M15 50
        C22 30 45 23 68 35
        C82 42 82 58 68 65
        C45 77 22 70 15 50
        Z
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 눈 */}

    <Circle cx="32" cy="45" r="6" fill={WHITE} />

    <Circle cx="33" cy="46" r="3" fill={DARK} />

    {/* 비늘 */}

    <Path
      d="M48 43 Q54 50 48 57"
      stroke={WHITE}
      strokeWidth="3"
      fill="none"
      opacity={0.35}
    />
  </Svg>
);
const Blueberry = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    <Ellipse
      cx="50"
      cy="56"
      rx="30"
      ry="24"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    {/* 블루베리 특유의 별모양 꽃받침 자국 */}
    <Path
      d="M50 34 L52 38 L56 37 L53 41 L55 45 L50 42 L45 45 L47 41 L44 37 L48 38Z"
      fill="#1E3A8A"
    />
    <Ellipse cx="39" cy="47" rx="6" ry="4.5" fill={WHITE} opacity={0.35} />
  </Svg>
);

const Umbrella = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    <Path
      d="M18 48
         C20 25 80 25 82 48
         C70 42 63 55 50 48
         C38 55 30 42 18 48Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Path
      d="M50 48 L50 75 C50 86 68 84 64 73"
      stroke={OUTLINE}
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
    />

    <Ellipse cx="37" cy="37" rx="10" ry="5" fill={WHITE} opacity={0.3} />
  </Svg>
);

const Whale = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    <Path
      d="
        M16 59
        C21 38 50 29 74 40
        C85 44 90 55 83 65
        C70 80 35 78 16 59Z
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3.5"
    />
    <Polygon
      points="18,57 6,45 10,62 5,72 22,66"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* <Path
      d="M22 60 C11 52 7 43 9 38 C16 42 21 46 25 51"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    /> */}

    <Circle cx="70" cy="48" r="4.5" fill={WHITE} />
    <Circle cx="71" cy="48" r="2.3" fill={DARK} />

    <Path
      d="M75 58 Q80 62 84 57"
      stroke={OUTLINE}
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />

    <Path
      d="M47 34 Q43 22 37 19 M48 33 Q50 20 56 16"
      stroke="#7DD3FC"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
    />
  </Svg>
);

// const Banana = ({ colorHex }: ItemSvgProps) => (
//   <Svg width="100" height="100" viewBox="0 0 100 100">
//     {/* ======================
//         가운데 바나나
//     ====================== */}
//     <Path
//       d="
//         M47 24
//         C43 42 44 66 51 82
//         C54 88 61 89 64 84
//         C70 68 66 43 57 25
//         C55 21 50 20 47 24
//         Z
//       "
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />

//     {/* ======================
//         왼쪽 바나나
//     ====================== */}
//     <Path
//       d="
//         M45 27
//         C31 33 20 48 18 65
//         C17 74 23 80 30 78
//         C43 73 50 55 52 34
//         C53 28 49 25 45 27
//         Z
//       "
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />

//     {/* ======================
//         오른쪽 바나나
//     ====================== */}
//     <Path
//       d="
//         M57 27
//         C70 32 81 46 83 62
//         C85 72 80 79 73 78
//         C60 75 52 56 50 34
//         C49 29 53 25 57 27
//         Z
//       "
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />

//     {/* ======================
//         공통 꼭지
//     ====================== */}
//     <Path
//       d="
//         M44 20
//         C48 15 55 15 59 20
//         L57 29
//         C53 27 49 27 45 29
//         Z
//       "
//       fill={BROWN}
//       stroke={OUTLINE}
//       strokeWidth="3"
//       strokeLinejoin="round"
//     />

//     {/* 꼭지 위 */}
//     <Path
//       d="
//         M49 17
//         L54 11
//       "
//       stroke={BROWN}
//       strokeWidth="5"
//       strokeLinecap="round"
//     />

//     {/* ======================
//         바나나 끝부분
//     ====================== */}

//     <Circle
//       cx="29"
//       cy="77"
//       r="4"
//       fill={BROWN}
//       stroke={OUTLINE}
//       strokeWidth="2"
//     />

//     <Circle
//       cx="57"
//       cy="85"
//       r="4"
//       fill={BROWN}
//       stroke={OUTLINE}
//       strokeWidth="2"
//     />

//     <Circle
//       cx="74"
//       cy="77"
//       r="4"
//       fill={BROWN}
//       stroke={OUTLINE}
//       strokeWidth="2"
//     />

//     {/* ======================
//         하이라이트
//     ====================== */}

//     <Path
//       d="
//         M26 49
//         C25 58 26 64 29 68
//       "
//       stroke={WHITE}
//       strokeWidth="3"
//       opacity={0.3}
//       strokeLinecap="round"
//     />

//     <Path
//       d="
//         M51 35
//         C49 50 51 65 55 74
//       "
//       stroke={WHITE}
//       strokeWidth="3"
//       opacity={0.3}
//       strokeLinecap="round"
//     />

//     <Path
//       d="
//         M72 48
//         C77 57 77 64 74 69
//       "
//       stroke={WHITE}
//       strokeWidth="3"
//       opacity={0.3}
//       strokeLinecap="round"
//     />
//   </Svg>
// );
const Owl = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    <Polygon
      points="32,20 40,34 26,34"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <Polygon
      points="68,20 74,34 60,34"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <Path
      d="M50 26 C70 26 82 40 82 58 C82 76 68 88 50 88 C32 88 18 76 18 58 C18 40 30 26 50 26Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    <Circle
      cx="38"
      cy="54"
      r="12"
      fill={WHITE}
      stroke={OUTLINE}
      strokeWidth="3"
    />
    <Circle
      cx="62"
      cy="54"
      r="12"
      fill={WHITE}
      stroke={OUTLINE}
      strokeWidth="3"
    />
    <Circle cx="38" cy="54" r="5" fill={DARK} />
    <Circle cx="62" cy="54" r="5" fill={DARK} />
    <Polygon
      points="50,60 45,68 55,68"
      fill={ORANGE}
      stroke={OUTLINE}
      strokeWidth="2"
    />
    <Ellipse cx="33" cy="40" rx="5" ry="7" fill={WHITE} opacity={0.3} />
  </Svg>
);
const Frog = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    <Circle
      cx="34"
      cy="30"
      r="13"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    <Circle
      cx="66"
      cy="30"
      r="13"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    <Circle cx="34" cy="30" r="5" fill={DARK} />
    <Circle cx="66" cy="30" r="5" fill={DARK} />
    <Path
      d="M50 36 C70 36 82 48 82 62 C82 78 68 88 50 88 C32 88 18 78 18 62 C18 48 30 36 50 36Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    <Path
      d="M36 66 Q50 74 64 66"
      stroke={DARK}
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
    <Circle cx="30" cy="62" r="4" fill="#FDA4AF" opacity={0.5} />
    <Circle cx="70" cy="62" r="4" fill="#FDA4AF" opacity={0.5} />
    <Ellipse cx="36" cy="52" rx="5" ry="7" fill={WHITE} opacity={0.3} />
  </Svg>
);
const Rocket = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    <Path
      d="M50 12 C62 24 66 42 66 58 L34 58 C34 42 38 24 50 12Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
    <Circle
      cx="50"
      cy="40"
      r="9"
      fill="#BAE6FD"
      stroke={OUTLINE}
      strokeWidth="3"
    />
    <Path
      d="M34 58 L20 74 L34 70Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <Path
      d="M66 58 L80 74 L66 70Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <Path
      d="M42 58 L44 82 L50 74 L56 82 L58 58Z"
      fill={ORANGE}
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <Ellipse cx="42" cy="26" rx="5" ry="8" fill={WHITE} opacity={0.3} />
  </Svg>
);

const Snail = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    {/* 몸 */}
    <Path
      d="
        M20 68
        Q25 55 43 58
        H70
        Q84 58 86 72
        Q82 82 65 82
        H30
        Q18 80 20 68
        Z
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 껍질 */}
    <Circle
      cx="42"
      cy="52"
      r="24"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 소용돌이 */}
    <Path
      d="
        M42 39
        Q54 39 54 51
        Q54 63 42 63
        Q32 63 32 53
        Q32 45 40 45
        Q46 45 46 51
        Q46 55 42 55
      "
      fill="none"
      stroke={WHITE}
      strokeWidth="4"
      opacity={0.7}
      strokeLinecap="round"
    />

    {/* 더듬이 */}
    <Path
      d="M70 59 L74 43 M77 60 L84 47"
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinecap="round"
    />

    <Circle cx="74" cy="42" r="3" fill={DARK} />
    <Circle cx="84" cy="46" r="3" fill={DARK} />
  </Svg>
);
const Lemon = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    {/* 날개 */}
    <Ellipse
      cx="38"
      cy="38"
      rx="15"
      ry="10"
      fill={WHITE}
      stroke={OUTLINE}
      strokeWidth="3"
      opacity={0.8}
      transform="rotate(-30 38 38)"
    />

    <Ellipse
      cx="61"
      cy="38"
      rx="15"
      ry="10"
      fill={WHITE}
      stroke={OUTLINE}
      strokeWidth="3"
      opacity={0.8}
      transform="rotate(30 61 38)"
    />

    {/* 몸 */}
    <Ellipse
      cx="50"
      cy="58"
      rx="21"
      ry="27"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 줄무늬 */}
    <Path d="M32 50 H68" stroke={DARK} strokeWidth="5" />
    <Path d="M30 61 H70" stroke={DARK} strokeWidth="5" />
    <Path d="M35 72 H65" stroke={DARK} strokeWidth="5" />

    {/* 얼굴 */}
    <Circle cx="42" cy="48" r="3" fill={DARK} />
    <Circle cx="58" cy="48" r="3" fill={DARK} />

    {/* 웃는 입 */}
    <Path
      d="M43 56 Q50 63 57 56"
      fill="none"
      stroke={OUTLINE}
      strokeWidth="2.5"
      strokeLinecap="round"
    />

    {/* 더듬이 */}
    <Path
      d="M43 34 Q39 24 33 23 M57 34 Q61 24 67 23"
      stroke={OUTLINE}
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />
  </Svg>
);

const Penguin = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    {/* 몸 */}
    <Path
      d="
        M28 52
        Q28 20 50 20
        Q72 20 72 52
        V70
        Q70 87 50 87
        Q30 87 28 70
        Z
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 배 */}
    <Ellipse cx="50" cy="64" rx="17" ry="21" fill={WHITE} />

    {/* 눈 */}
    <Circle cx="42" cy="43" r="5" fill={WHITE} />
    <Circle cx="58" cy="43" r="5" fill={WHITE} />

    <Circle cx="42" cy="44" r="2.5" fill={DARK} />
    <Circle cx="58" cy="44" r="2.5" fill={DARK} />

    {/* 부리 */}
    <Path
      d="M44 52 L50 59 L56 52 Z"
      fill="#FBBF24"
      stroke={OUTLINE}
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* 발 */}
    <Ellipse cx="39" cy="88" rx="10" ry="4" fill="#FBBF24" />
    <Ellipse cx="61" cy="88" rx="10" ry="4" fill="#FBBF24" />
  </Svg>
);
const Bear = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    {/* 귀 */}
    <Circle
      cx="29"
      cy="32"
      r="13"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    <Circle
      cx="71"
      cy="32"
      r="13"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 얼굴 */}
    <Circle
      cx="50"
      cy="55"
      r="31"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 눈 */}
    <Circle cx="40" cy="51" r="3.5" fill={DARK} />
    <Circle cx="60" cy="51" r="3.5" fill={DARK} />

    {/* 주둥이 */}
    <Ellipse cx="50" cy="66" rx="13" ry="10" fill={WHITE} opacity={0.85} />

    <Ellipse cx="50" cy="62" rx="5" ry="4" fill={DARK} />

    <Path
      d="M50 66 Q45 72 41 67 M50 66 Q55 72 59 67"
      fill="none"
      stroke={OUTLINE}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </Svg>
);
const Pig = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    {/* 귀 */}
    <Path
      d="M28 38 L22 20 Q38 20 42 37"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    <Path
      d="M58 37 Q62 20 78 20 L72 38"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 얼굴 */}
    <Circle
      cx="50"
      cy="54"
      r="30"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 눈 */}
    <Circle cx="40" cy="48" r="3.5" fill={DARK} />
    <Circle cx="60" cy="48" r="3.5" fill={DARK} />

    {/* 코 */}
    <Ellipse
      cx="50"
      cy="64"
      rx="14"
      ry="10"
      fill="#F9A8D4"
      stroke={OUTLINE}
      strokeWidth="3"
    />

    <Ellipse cx="45" cy="64" rx="2.5" ry="4" fill={DARK} />
    <Ellipse cx="55" cy="64" rx="2.5" ry="4" fill={DARK} />
  </Svg>
);

const Fox = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    {/* 귀 */}
    <Path
      d="M26 40 L30 15 L45 34"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    <Path
      d="M55 34 L70 15 L74 40"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 얼굴 */}
    <Path
      d="
        M24 43
        Q28 30 50 30
        Q72 30 76 43
        Q80 63 50 83
        Q20 63 24 43
        Z
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 흰 주둥이 */}
    <Path d="M35 60 Q50 50 65 60 Q61 75 50 77 Q39 75 35 60 Z" fill={WHITE} />

    {/* 눈 */}
    <Circle cx="40" cy="52" r="3.5" fill={DARK} />
    <Circle cx="60" cy="52" r="3.5" fill={DARK} />

    {/* 코 */}
    <Circle cx="50" cy="65" r="4" fill={DARK} />
  </Svg>
);
const Dog = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    {/* 갈기 */}
    {/* <Circle
      cx="50"
      cy="52"
      r="34"
      fill={BROWN}
      stroke={OUTLINE}
      strokeWidth="4"
    /> */}

    {/* 얼굴 */}
    <Circle
      cx="50"
      cy="54"
      r="25"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />

    {/* 귀 */}
    <Circle
      cx="31"
      cy="38"
      r="9"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />
    <Circle
      cx="69"
      cy="38"
      r="9"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />

    {/* 눈 */}
    <Circle cx="41" cy="51" r="3.5" fill={DARK} />
    <Circle cx="59" cy="51" r="3.5" fill={DARK} />

    {/* 코 */}
    <Ellipse cx="50" cy="61" rx="5" ry="4" fill={DARK} />

    {/* 입 */}
    <Path
      d="M50 65 Q44 71 39 66 M50 65 Q56 71 61 66"
      fill="none"
      stroke={OUTLINE}
      strokeWidth="2.5"
      strokeLinecap="round"
    />

    {/* 볼 */}
    <Circle cx="34" cy="62" r="4" fill="#F9A8D4" opacity={0.6} />
    <Circle cx="66" cy="62" r="4" fill="#F9A8D4" opacity={0.6} />
  </Svg>
);
const Ship = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    {/* 배 */}
    <Path
      d="
        M18 65
        H82
        Q76 84 50 86
        Q24 84 18 65
        Z
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 돛대 */}
    <Path d="M50 64 V20" stroke={BROWN} strokeWidth="5" strokeLinecap="round" />

    {/* 왼쪽 돛 */}
    <Path
      d="M47 25 L25 57 H47 Z"
      fill={WHITE}
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    />

    {/* 오른쪽 돛 */}
    <Path
      d="M53 25 L76 57 H53 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    />

    {/* 물결 */}
    <Path
      d="M20 88 Q30 82 40 88 Q50 94 60 88 Q70 82 80 88"
      fill="none"
      stroke="#7DD3FC"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </Svg>
);
const Car = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    <Path
      d="M12 62 C12 50 20 50 28 50 L36 34 C38 30 42 28 48 28 L64 28 C70 28 74 30 76 34 L82 50 C90 50 90 56 90 62 L90 68 L12 68Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
    <Path
      d="M40 50 L46 36 L62 36 L68 50Z"
      fill="#BAE6FD"
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <Circle
      cx="30"
      cy="70"
      r="11"
      fill={DARK}
      stroke={OUTLINE}
      strokeWidth="3"
    />
    <Circle
      cx="70"
      cy="70"
      r="11"
      fill={DARK}
      stroke={OUTLINE}
      strokeWidth="3"
    />
    <Circle cx="30" cy="70" r="4" fill="#CBD5E1" />
    <Circle cx="70" cy="70" r="4" fill="#CBD5E1" />
    <Ellipse cx="26" cy="56" rx="6" ry="4" fill={WHITE} opacity={0.35} />
  </Svg>
);

const Clock = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    <Circle
      cx="50"
      cy="52"
      r="36"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    <Circle cx="50" cy="52" r="28" fill={WHITE} opacity={0.85} />
    <Path
      d="M50 34 L50 52 L64 58"
      stroke={DARK}
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
    <Circle cx="50" cy="52" r="4" fill={DARK} />
    <Ellipse cx="38" cy="38" rx="6" ry="8" fill={WHITE} opacity={0.3} />
  </Svg>
);

const Bell = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    <Circle
      cx="50"
      cy="20"
      r="6"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />
    <Path
      d="M50 26 C66 26 74 40 74 56 C74 62 78 66 82 68 L18 68 C22 66 26 62 26 56 C26 40 34 26 50 26Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
    <Rect
      x="16"
      y="68"
      width="68"
      height="8"
      rx="4"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    <Circle
      cx="50"
      cy="84"
      r="7"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />
    <Ellipse cx="38" cy="40" rx="6" ry="10" fill={WHITE} opacity={0.35} />
  </Svg>
);

const Banana = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    {/* ======================
        공통 꼭지
    ====================== */}
    <Path
      d="
        M47 17
        C50 13 55 13 58 17
        L56 25
        C53 27 49 27 46 24
        Z
      "
      fill={BROWN}
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    />

    {/* ======================
        왼쪽 바나나
    ====================== */}
    <Path
      d="
        M48 24
        C34 30 22 43 22 60
        C22 76 34 84 48 82
        C55 81 57 76 53 72
        C43 62 40 47 48 24
        Z
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3.5"
      strokeLinejoin="round"
    />

    {/* ======================
        가운데 바나나
    ====================== */}
    <Path
      d="
        M52 24
        C43 42 44 62 52 78
        C57 88 69 90 76 83
        C80 79 78 75 74 73
        C62 65 56 47 56 25
        Z
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3.5"
      strokeLinejoin="round"
    />

    {/* ======================
        오른쪽 바나나
    ====================== */}
    {/* <Path
      d="
        M56 25
        C66 29 80 40 82 56
        C84 70 75 82 62 83
        C56 83 54 79 58 75
        C67 65 68 48 56 25
        Z
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3.5"
      strokeLinejoin="round"
    /> */}

    {/* ======================
        끝부분
    ====================== */}
    <Path
      d="M43 81 L48 85"
      stroke={BROWN}
      strokeWidth="4"
      strokeLinecap="round"
    />

    <Path
      d="M73 82 L77 85"
      stroke={BROWN}
      strokeWidth="4"
      strokeLinecap="round"
    />

    {/* ======================
        하이라이트
    ====================== */}
    <Path
      d="M33 44 C28 58 31 69 40 75"
      stroke={WHITE}
      strokeWidth="3"
      strokeLinecap="round"
      opacity={0.3}
      fill="none"
    />

    <Path
      d="M51 42 C50 56 54 70 61 78"
      stroke={WHITE}
      strokeWidth="3"
      strokeLinecap="round"
      opacity={0.25}
      fill="none"
    />
  </Svg>
);

const Grape = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    {/* ======================
        줄기
    ====================== */}
    <Path
      d="M52 12 C52 18 50 22 50 28"
      stroke={BROWN}
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
    />

    {/* ======================
        포도 잎
    ====================== */}
    <Path
      d="
        M50 27
        C40 13 24 15 20 28
        C19 37 30 42 40 37
        C45 35 48 31 50 27
        Z
      "
      fill="#7CCB5A"
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    />

    {/* 잎맥 */}
    <Path
      d="M24 29 C33 29 41 28 49 27"
      stroke="#4C9A45"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />

    {/* ======================
        포도알 3개
    ====================== */}
    <Circle
      cx="32"
      cy="43"
      r="13"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />

    <Circle
      cx="50"
      cy="43"
      r="13"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />

    <Circle
      cx="68"
      cy="43"
      r="13"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />

    {/* ======================
        포도알 2개
    ====================== */}
    <Circle
      cx="41"
      cy="61"
      r="13"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />

    <Circle
      cx="59"
      cy="61"
      r="13"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />

    {/* ======================
        마지막 포도알 1개
    ====================== */}
    <Circle
      cx="50"
      cy="79"
      r="13"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />

    {/* ======================
        하이라이트
    ====================== */}
    <Ellipse
      cx="28"
      cy="39"
      rx="5"
      ry="3"
      fill={WHITE}
      opacity={0.35}
      transform="rotate(-25 28 39)"
    />

    <Ellipse
      cx="46"
      cy="39"
      rx="5"
      ry="3"
      fill={WHITE}
      opacity={0.25}
      transform="rotate(-25 46 39)"
    />

    <Ellipse
      cx="37"
      cy="57"
      rx="4"
      ry="2.5"
      fill={WHITE}
      opacity={0.22}
      transform="rotate(-25 37 57)"
    />
  </Svg>
);
export const Watermelon = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    {/* ======================
        초록 껍질
    ====================== */}
    <Path
      d="
        M15 72
        L50 20
        L85 72
        Q80 84 50 88
        Q20 84 15 72
        Z
      "
      fill={WATERMELON_GREEN}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* ======================
        하얀 껍질층
    ====================== */}
    <Path
      d="
        M20 70
        L50 26
        L80 70
        Q76 78 50 82
        Q24 78 20 70
        Z
      "
      fill={WHITE}
    />

    {/* ======================
        빨간 과육
    ====================== */}
    <Path
      d="
        M24 68
        L50 31
        L76 68
        Q72 73 50 76
        Q28 73 24 68
        Z
      "
      fill={colorHex}
    />

    {/* ======================
        씨앗
    ====================== */}

    <Ellipse cx="50" cy="48" rx="2.8" ry="5" fill={DARK} />

    <Ellipse
      cx="39"
      cy="63"
      rx="2.8"
      ry="5"
      fill={DARK}
      transform="rotate(-18 39 63)"
    />

    <Ellipse
      cx="61"
      cy="63"
      rx="2.8"
      ry="5"
      fill={DARK}
      transform="rotate(18 61 63)"
    />

    {/* ======================
        하이라이트
    ====================== */}

    <Path
      d="
        M40 44
        Q35 52 32 58
      "
      stroke={WHITE}
      strokeWidth="4"
      strokeLinecap="round"
      opacity={0.28}
    />
  </Svg>
);

const Koala = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    {/* 귀 */}
    <Circle
      cx="24"
      cy="34"
      r="15"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    <Circle
      cx="76"
      cy="34"
      r="15"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    <Circle cx="24" cy="34" r="7" fill="#F1F5F9" />
    <Circle cx="76" cy="34" r="7" fill="#F1F5F9" />
    {/* 얼굴 */}
    <Circle
      cx="50"
      cy="55"
      r="30"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    <Circle cx="40" cy="52" r="4" fill={DARK} />
    <Circle cx="60" cy="52" r="4" fill={DARK} />
    <Circle cx="41.2" cy="51" r="1.2" fill={WHITE} />
    <Circle cx="61.2" cy="51" r="1.2" fill={WHITE} />
    {/* 코 (큰 타원) */}
    <Ellipse cx="50" cy="63" rx="8" ry="6" fill={DARK} />
    <Circle cx="37" cy="60" r="4" fill="#FDA4AF" opacity={0.5} />
    <Circle cx="63" cy="60" r="4" fill="#FDA4AF" opacity={0.5} />
  </Svg>
);

const Ladybug = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    {/* 머리 */}
    <Circle
      cx="50"
      cy="28"
      r="13"
      fill={DARK}
      stroke={OUTLINE}
      strokeWidth="3"
    />
    <Circle cx="45" cy="26" r="2" fill={WHITE} />
    <Circle cx="55" cy="26" r="2" fill={WHITE} />
    {/* 더듬이 */}
    <Path
      d="M45 18 C42 12 38 10 35 10 M55 18 C58 12 62 10 65 10"
      stroke={OUTLINE}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* 몸통 (등껍질) */}
    <Path
      d="M50 38 C72 38 84 52 84 66 C84 80 70 90 50 90 C30 90 16 80 16 66 C16 52 28 38 50 38Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    {/* 등판 가운데선 */}
    <Path d="M50 38 L50 90" stroke={OUTLINE} strokeWidth="3" opacity={0.5} />
    {/* 점 무늬 */}
    <Circle cx="34" cy="56" r="6" fill={DARK} />
    <Circle cx="34" cy="76" r="6" fill={DARK} />
    <Circle cx="66" cy="56" r="6" fill={DARK} />
    <Circle cx="66" cy="76" r="6" fill={DARK} />
    <Ellipse cx="30" cy="50" rx="6" ry="4" fill={WHITE} opacity={0.3} />
  </Svg>
);

const Mushroom = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    {/* 버섯 갓 */}

    <Path
      d="
        M17 52
        C18 28 36 17 50 17
        C64 17 82 28 83 52
        Z
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 줄기 */}

    <Path
      d="
        M38 52
        L62 52
        L66 82
        Q50 89 34 82
        Z
      "
      fill={WHITE}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 점 */}

    <Circle cx="38" cy="37" r="6" fill={WHITE} opacity={0.75} />
    <Circle cx="61" cy="31" r="5" fill={WHITE} opacity={0.75} />
  </Svg>
);

// export const Chick = ({ colorHex }: ItemSvgProps) => (
//   <Svg width="100" height="100" viewBox="0 0 100 100">
//     {/* 몸 */}
//     <Circle
//       cx="50"
//       cy="54"
//       r="30"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />

//     {/* 머리 털 */}
//     <Path
//       d="M42 28 Q46 15 50 27 Q55 15 59 29"
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinecap="round"
//       fill="none"
//     />

//     {/* 눈 */}
//     <Circle cx="40" cy="49" r="4" fill={DARK} />
//     <Circle cx="60" cy="49" r="4" fill={DARK} />

//     {/* 부리 */}
//     <Path
//       d="M43 59 Q50 53 57 59 Q50 67 43 59Z"
//       fill={YELLOW}
//       stroke={OUTLINE}
//       strokeWidth="3"
//     />

//     {/* 볼 */}
//     <Circle cx="32" cy="61" r="5" fill={PINK} opacity={0.4} />
//     <Circle cx="68" cy="61" r="5" fill={PINK} opacity={0.4} />
//   </Svg>
// );

const Chick = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    {/* 머리털 */}
    <Path
      d="M42 31 Q46 20 50 30 Q54 19 59 31"
      stroke={colorHex}
      strokeWidth="7"
      fill="none"
      strokeLinecap="round"
    />
    {/* 몸통 */}
    <Circle
      cx="50"
      cy="56"
      r="29"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    {/* ⭐ 날개: 몸통 곡선을 따라 자연스럽게 붙는 형태로 재설계 */}
    <Path
      d="M26 52 C20 54 17 62 20 70 C24 76 32 76 36 70 C34 63 32 56 30 51 C29 50 27 51 26 52Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3.5"
    />
    {/* 눈 */}
    <Circle cx="40" cy="52" r="4" fill={DARK} />
    <Circle cx="60" cy="52" r="4" fill={DARK} />
    <Circle cx="41.2" cy="51" r="1.2" fill={WHITE} />
    <Circle cx="61.2" cy="51" r="1.2" fill={WHITE} />
    {/* 부리 */}
    <Path
      d="M50 57 L43 64 Q50 69 57 64Z"
      fill={ORANGE}
      stroke={OUTLINE}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* 볼터치 */}
    <Circle cx="37" cy="62" r="4" fill="#FDA4AF" opacity={0.5} />
    <Circle cx="63" cy="62" r="4" fill="#FDA4AF" opacity={0.5} />
  </Svg>
);

const Sunflower = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    {/* 줄기 + 잎 */}
    <Path
      d="M50 62 L50 90"
      stroke={GREEN}
      strokeWidth="4"
      strokeLinecap="round"
    />
    <Path d="M50 78 C40 76 34 82 32 90 C42 90 48 86 50 78Z" fill={GREEN} />

    {/* 뾰족한 꽃잎 8장 (타원을 회전시켜 배치) */}
    <G>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <Ellipse
          key={angle}
          cx="50"
          cy="26"
          rx="9"
          ry="17"
          fill={colorHex}
          stroke={OUTLINE}
          strokeWidth="4"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
    </G>

    {/* 가운데 씨앗 원판 */}
    <Circle
      cx="50"
      cy="50"
      r="16"
      fill="#92400E"
      stroke={OUTLINE}
      strokeWidth="4"
    />
    {/* 씨앗 질감 점들 */}
    <Circle cx="45" cy="46" r="1.6" fill="#5C3A21" />
    <Circle cx="55" cy="46" r="1.6" fill="#5C3A21" />
    <Circle cx="50" cy="52" r="1.6" fill="#5C3A21" />
    <Circle cx="44" cy="54" r="1.6" fill="#5C3A21" />
    <Circle cx="56" cy="54" r="1.6" fill="#5C3A21" />
  </Svg>
);
const Flower = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    {/* 꽃잎 */}

    <Circle
      cx="50"
      cy="28"
      r="17"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />

    <Circle
      cx="72"
      cy="43"
      r="17"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />

    <Circle
      cx="64"
      cy="68"
      r="17"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />

    <Circle
      cx="36"
      cy="68"
      r="17"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />

    <Circle
      cx="28"
      cy="43"
      r="17"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />

    {/* 가운데 */}

    <Circle
      cx="50"
      cy="50"
      r="14"
      fill="#FFD84D"
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Circle cx="45" cy="45" r="4" fill={WHITE} opacity={0.4} />
  </Svg>
);
const Star = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    <Polygon
      points="
        50,12
        61,38
        89,40
        67,58
        74,86
        50,70
        26,86
        33,58
        11,40
        39,38
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    <Ellipse
      cx="38"
      cy="38"
      rx="7"
      ry="4"
      fill={WHITE}
      opacity={0.45}
      transform="rotate(-20 38 38)"
    />
  </Svg>
);
const Tree = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    <Rect x="44" y="55" width="12" height="30" rx="4" fill="#92400E" />

    <Circle
      cx="50"
      cy="40"
      r="27"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Circle cx="35" cy="44" r="15" fill={colorHex} />
    <Circle cx="65" cy="44" r="15" fill={colorHex} />

    <Ellipse cx="40" cy="30" rx="8" ry="5" fill={WHITE} opacity={0.25} />
  </Svg>
);

const Broccoli = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    <Rect
      x="42"
      y="52"
      width="16"
      height="30"
      rx="6"
      fill="#84CC16"
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Circle cx="32" cy="48" r="17" fill={colorHex} />
    <Circle cx="50" cy="39" r="20" fill={colorHex} />
    <Circle cx="68" cy="48" r="17" fill={colorHex} />

    <Circle cx="43" cy="35" r="5" fill={WHITE} opacity={0.25} />
  </Svg>
);

const Butterfly = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    {/* ======================
        더듬이
    ====================== */}

    <Path
      d="
        M47 30
        C43 20 38 16 33 14

        M53 30
        C57 20 62 16 67 14
      "
      stroke={OUTLINE}
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />

    <Circle cx="33" cy="14" r="3" fill={OUTLINE} />
    <Circle cx="67" cy="14" r="3" fill={OUTLINE} />

    {/* ======================
        왼쪽 위 날개
    ====================== */}

    <Path
      d="
        M48 45
        C38 17 15 16 11 35
        C7 54 25 62 48 53
        Z
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* ======================
        오른쪽 위 날개
    ====================== */}

    <Path
      d="
        M52 45
        C62 17 85 16 89 35
        C93 54 75 62 52 53
        Z
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* ======================
        왼쪽 아래 통통 날개
    ====================== */}

    <Path
      d="
        M48 49
        C34 48 15 55 18 70
        C21 86 40 83 49 60
        Z
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* ======================
        오른쪽 아래 통통 날개
    ====================== */}

    <Path
      d="
        M52 49
        C66 48 85 55 82 70
        C79 86 60 83 51 60
        Z
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* ======================
        몸통
    ====================== */}

    <Path
      d="
        M50 28
        C46 28 45 36 46 48
        L47 70
        C47 80 49 85 50 85
        C51 85 53 80 53 70
        L54 48
        C55 36 54 28 50 28
        Z
      "
      fill={BROWN}
      stroke={OUTLINE}
      strokeWidth="3"
    />

    {/* ======================
        날개 하이라이트
    ====================== */}

    <Ellipse
      cx="27"
      cy="35"
      rx="7"
      ry="10"
      fill={WHITE}
      opacity={0.3}
      transform="rotate(-30 27 35)"
    />

    <Ellipse
      cx="73"
      cy="35"
      rx="7"
      ry="10"
      fill={WHITE}
      opacity={0.3}
      transform="rotate(30 73 35)"
    />

    {/* ======================
        귀여운 날개 점
    ====================== */}

    <Circle cx="32" cy="62" r="4" fill={WHITE} opacity={0.45} />
    <Circle cx="68" cy="62" r="4" fill={WHITE} opacity={0.45} />
  </Svg>
);
const Cupcake = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    {/* 크림 */}
    <Path
      d="
        M25 52
        C18 44 24 32 35 32
        C36 20 55 18 61 30
        C74 25 84 36 77 48
        C83 58 72 65 62 61
        L38 61
        C28 64 21 59 25 52Z
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 컵 */}
    <Path
      d="M30 60 L70 60 L64 84 Q50 90 36 84Z"
      fill={LIGHT_BROWN}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    <Path d="M40 64 L43 81" stroke={WHITE} strokeWidth="3" opacity={0.35} />
    <Path d="M52 63 L52 84" stroke={WHITE} strokeWidth="3" opacity={0.35} />
    <Path d="M63 64 L59 81" stroke={WHITE} strokeWidth="3" opacity={0.35} />

    {/* 체리 */}
    <Circle cx="51" cy="22" r="7" fill={RED} stroke={OUTLINE} strokeWidth="3" />
  </Svg>
);

const Cactus = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    {/* 화분 */}
    <Path
      d="M30 82 L70 82 L66 94 L34 94Z"
      fill="#C89666"
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* 몸통 */}
    <Rect
      x="38"
      y="30"
      width="24"
      height="55"
      rx="12"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    {/* 작은 가시 */}
    <Path
      d="M48 34 L46 30 M54 43 L58 40 M46 58 L43 61"
      stroke={WHITE}
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.7"
    />
    {/* 팔 */}
    <Path
      d="M38 55 H24 C17 55 17 42 24 42"
      stroke={colorHex}
      strokeWidth="15"
      fill="none"
      strokeLinecap="round"
    />
    <Path
      d="M38 55 H24 C17 55 17 42 24 42"
      stroke={OUTLINE}
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
      opacity={0.9}
    />
    <Path
      d="M62 65 H76 C83 65 83 52 76 52"
      stroke={colorHex}
      strokeWidth="15"
      fill="none"
      strokeLinecap="round"
    />
    <Path
      d="M62 65 H76 C83 65 83 52 76 52"
      stroke={OUTLINE}
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
      opacity={0.9}
    />
    {/* 꽃 */}
    {/* <Circle
      cx="50"
      cy="24"
      r="7"
      fill="#F9A8D4"
      stroke={OUTLINE}
      strokeWidth="2.5"
    /> */}
    {/* 얼굴 */}
    <Circle cx="45" cy="55" r="3" fill={DARK} />
    <Circle cx="55" cy="55" r="3" fill={DARK} />
    <Path
      d="M45 63 Q50 67 55 63"
      stroke={DARK}
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
    <Ellipse cx="43" cy="42" rx="4" ry="8" fill={WHITE} opacity={0.3} />
  </Svg>
);

const Cloud = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    <Path
      d="M20 65
         C15 52 24 42 37 44
         C40 30 58 26 68 39
         C82 36 91 47 87 59
         C95 68 85 78 74 77
         L30 77
         C20 77 15 72 20 65Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Ellipse cx="43" cy="50" rx="9" ry="5" fill={WHITE} opacity={0.5} />
  </Svg>
);
const Snowman = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    <Circle
      cx="50"
      cy="65"
      r="25"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Circle
      cx="50"
      cy="35"
      r="19"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Circle cx="43" cy="32" r="3" fill={DARK} />
    <Circle cx="57" cy="32" r="3" fill={DARK} />

    <Polygon
      points="50,38 67,43 50,47"
      fill={ORANGE}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Circle cx="50" cy="58" r="3" fill={DARK} />
    <Circle cx="50" cy="68" r="3" fill={DARK} />
  </Svg>
);

const Milk = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    {/* 병목 */}
    <Path
      d="M42 16 H58 V28 C58 30 60 31 62 34 C66 38 68 43 68 50 V80 C68 84 64 88 60 88 H40 C36 88 32 84 32 80 V50 C32 43 34 38 38 34 C40 31 42 30 42 28Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* 병뚜껑 */}
    <Rect
      x="40"
      y="10"
      width="20"
      height="8"
      rx="2"
      fill={OUTLINE}
      opacity={0.8}
    />
    {/* 우유 표면선 */}
    <Path d="M32 55 H68" stroke={WHITE} strokeWidth="3" opacity={0.4} />
    {/* 라벨 얼굴 */}
    <Circle cx="42" cy="68" r="3" fill={DARK} />
    <Circle cx="58" cy="68" r="3" fill={DARK} />
    <Circle cx="42.8" cy="67" r="1" fill={WHITE} />
    <Circle cx="58.8" cy="67" r="1" fill={WHITE} />
    <Path
      d="M42 75 Q50 79 58 75"
      stroke={DARK}
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
    <Ellipse cx="40" cy="45" rx="4" ry="8" fill={WHITE} opacity={0.3} />
  </Svg>
);

const Rabbit = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    <Ellipse
      cx="38"
      cy="25"
      rx="10"
      ry="21"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3.5"
    />

    <Ellipse
      cx="62"
      cy="25"
      rx="10"
      ry="21"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3.5"
    />

    <Ellipse cx="38" cy="25" rx="4" ry="12" fill="#F9A8D4" opacity="0.7" />
    <Ellipse cx="62" cy="25" rx="4" ry="12" fill="#F9A8D4" opacity="0.7" />

    <Circle
      cx="50"
      cy="61"
      r="27"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3.5"
    />

    <Circle cx="40" cy="58" r="4" fill={DARK} />
    <Circle cx="60" cy="58" r="4" fill={DARK} />

    <Circle cx="41" cy="57" r="1" fill={WHITE} />
    <Circle cx="61" cy="57" r="1" fill={WHITE} />

    <Circle cx="50" cy="67" r="4" fill="#F9A8D4" />

    <Path
      d="M50 71 Q45 77 41 72 M50 71 Q55 77 59 72"
      stroke={OUTLINE}
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
  </Svg>
);

const CottonCandy = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    {/* 종이 콘(막대 대신 원뿔) */}
    <Polygon
      points="42,60 58,60 52,90 48,90"
      fill="#FDE68A"
      stroke={OUTLINE}
      strokeWidth="4"
    />
    <Path
      d="M43 66 L57 66 M44 74 L56 74"
      stroke={OUTLINE}
      strokeWidth="4"
      opacity={0.4}
    />

    {/* 뭉게뭉게 솜사탕 (여러 원을 겹쳐 구름처럼) */}
    <Circle cx="32" cy="46" r="16" fill={colorHex} />
    <Circle cx="50" cy="34" r="20" fill={colorHex} />
    <Circle cx="68" cy="46" r="16" fill={colorHex} />
    <Circle cx="40" cy="52" r="14" fill={colorHex} />
    <Circle cx="60" cy="52" r="14" fill={colorHex} />

    {/* 입체 하이라이트 */}
    <Ellipse cx="42" cy="30" rx="9" ry="6" fill={WHITE} opacity={0.45} />
    <Ellipse cx="60" cy="40" rx="6" ry="4" fill={WHITE} opacity={0.3} />
  </Svg>
);

const Crow = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    {/* 꼬리 깃털 */}
    <Path
      d="M28 66 C18 70 12 78 14 84 C20 80 26 76 32 70Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    {/* 몸통 */}
    <Ellipse
      cx="52"
      cy="58"
      rx="26"
      ry="22"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    {/* 머리 */}
    <Circle
      cx="70"
      cy="38"
      r="16"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    {/* 부리 */}
    <Polygon
      points="83,36 96,32 84,44"
      fill={ORANGE}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    {/* 날개 */}
    <Path
      d="M40 50 C34 58 34 68 42 74 C50 68 52 58 48 50Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      opacity={0.85}
    />
    <Path
      d="M40 56 C38 62 38 68 42 72"
      stroke={OUTLINE}
      strokeWidth="4"
      fill="none"
      opacity={0.4}
    />
    {/* 눈 */}
    <Circle cx="75" cy="35" r="4" fill={WHITE} />
    <Circle cx="76" cy="35" r="2" fill={DARK} />
    {/* 다리 */}
    <Path
      d="M46 78 L44 90 M60 78 L62 90"
      stroke={ORANGE}
      strokeWidth="4"
      strokeLinecap="round"
    />
    <Path
      d="M44 90 L40 92 M44 90 L48 93 M62 90 L58 93 M62 90 L66 92"
      stroke={ORANGE}
      strokeWidth="4"
      strokeLinecap="round"
    />
  </Svg>
);
const Cat = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    {/* 귀 (바깥) */}
    <Polygon
      points="26,42 32,16 47,38"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="2.5"
    />
    <Polygon
      points="74,42 68,16 53,38"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="2.5"
    />
    {/* 귀 (안쪽 핑크) */}
    <Polygon points="30,37 34,22 42,35" fill="#F9A8D4" />
    <Polygon points="70,37 66,22 58,35" fill="#F9A8D4" />
    {/* 얼굴 */}
    <Circle
      cx="50"
      cy="58"
      r="30"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />
    {/* 눈 */}
    <Circle cx="39" cy="55" r="4.5" fill={DARK} />
    <Circle cx="61" cy="55" r="4.5" fill={DARK} />
    <Circle cx="40.5" cy="53.5" r="1.3" fill={WHITE} />
    <Circle cx="62.5" cy="53.5" r="1.3" fill={WHITE} />
    {/* 코 */}
    <Polygon points="50,63 46,67 54,67" fill="#F9A8D4" />
    {/* 입 */}
    <Path
      d="M50 67 L50 70 M50 70 Q44 74 40 70 M50 70 Q56 74 60 70"
      stroke={DARK}
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
    {/* 수염 */}
    <Path
      d="M18 58 L34 60 M18 66 L34 64 M82 58 L66 60 M82 66 L66 64"
      stroke={OUTLINE}
      strokeWidth="1.5"
      opacity={0.6}
      strokeLinecap="round"
    />
    {/* 볼터치 */}
    <Circle cx="32" cy="63" r="4" fill="#FDA4AF" opacity={0.5} />
    <Circle cx="68" cy="63" r="4" fill="#FDA4AF" opacity={0.5} />
  </Svg>
);

const Donut = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    {/* 도넛 */}

    <Circle
      cx="50"
      cy="50"
      r="32"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 가운데 구멍 */}

    <Circle
      cx="50"
      cy="50"
      r="11"
      fill={WHITE}
      stroke={OUTLINE}
      strokeWidth="3"
    />

    {/* 토핑 */}

    <Path
      d="M31 35 L37 39"
      stroke={WHITE}
      strokeWidth="3"
      strokeLinecap="round"
      opacity={0.7}
    />

    <Path
      d="M58 30 L62 36"
      stroke={WHITE}
      strokeWidth="3"
      strokeLinecap="round"
      opacity={0.7}
    />

    <Path
      d="M68 48 L74 45"
      stroke={WHITE}
      strokeWidth="3"
      strokeLinecap="round"
      opacity={0.7}
    />

    <Path
      d="M60 68 L66 72"
      stroke={WHITE}
      strokeWidth="3"
      strokeLinecap="round"
      opacity={0.7}
    />

    <Path
      d="M34 65 L39 70"
      stroke={WHITE}
      strokeWidth="3"
      strokeLinecap="round"
      opacity={0.7}
    />

    <Path
      d="M25 50 L32 52"
      stroke={WHITE}
      strokeWidth="3"
      strokeLinecap="round"
      opacity={0.7}
    />

    {/* 광택 */}

    <Ellipse
      cx="38"
      cy="31"
      rx="9"
      ry="5"
      fill={WHITE}
      opacity={0.25}
      transform="rotate(-25 38 31)"
    />
  </Svg>
);
/* ==================================================
   🔗 1️⃣ 먼저: 모든 개별 SVG 컴포넌트 선언→ 2️⃣ 그 다음에: ITEM_SVGS 매핑 (모든 컴포넌트가 이미 선언된 뒤여야 함)
================================================== */
const ITEM_SVGS: Record<string, React.ComponentType<ItemSvgProps>> = {
  apple: Apple,
  strawberry: Strawberry,
  balloon: Balloon,
  fireTruck: FireTruck,
  cherry: Cherry,
  fish: Fish,
  blueberry: Blueberry,
  umbrella: Umbrella,
  whale: Whale,
  milk: Milk,
  banana: Banana,
  watermelon: Watermelon,
  lemon: Lemon,
  snail: Snail,
  penguin: Penguin,
  bear: Bear,
  pig: Pig,
  fox: Fox,
  dog: Dog,
  ship: Ship,
  car: Car,
  clock: Clock,
  bell: Bell,
  rocket: Rocket,
  frog: Frog,
  owl: Owl,
  grape: Grape,
  koala: Koala,
  ladybug: Ladybug,
  chick: Chick,
  sunflower: Sunflower,
  flower: Flower,
  star: Star,
  tree: Tree,
  broccoli: Broccoli,
  butterfly: Butterfly,
  cupcake: Cupcake,
  cactus: Cactus,
  crow: Crow,
  cat: Cat,
  donut: Donut,
  cloud: Cloud,
  snowman: Snowman,
  rabbit: Rabbit,
  cottonCandy: CottonCandy,
  mushroom: Mushroom,
};
/* ==================================================
   🎨 최종 RenderItemSvg
================================================== */

export const RenderItemSvg = ({
  shapeId, // ⭐ itemName(한글) → shapeId(영문)로 변경
  colorHex,
}: ItemSvgProps & { shapeId: string }) => {
  const ItemComponent = ITEM_SVGS[shapeId];

  if (!ItemComponent) {
    return (
      <Svg width="100" height="100" viewBox="0 0 100 100">
        <Circle
          cx="50"
          cy="50"
          r="30"
          fill={colorHex}
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

  return <ItemComponent colorHex={colorHex} />;
};
