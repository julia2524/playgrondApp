import React from "react";
import Svg, { Circle, Ellipse, Path, Polygon, Rect, G } from "react-native-svg";

interface ItemSvgProps {
  colorHex: string;
}

/* ==================================================
   공통 스타일
================================================== */

const OUTLINE = "#475569";
const WHITE = "#FFFFFF";
const DARK = "#334155";
const BROWN = "#92400E";
const GREEN = "#65A30D";
const ORANGE = "#FB923C";

const Apple = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    <Path
      d="M50 30
         C35 20 18 28 18 50
         C18 72 32 84 50 88
         C68 84 82 72 82 50
         C82 28 65 20 50 30Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />

    {/* 꼭지 */}
    <Path
      d="M50 30 C49 22 54 17 61 16"
      stroke={BROWN}
      strokeWidth="5"
      strokeLinecap="round"
    />

    {/* 잎 */}
    <Path
      d="M53 24 C60 14 72 15 76 20 C68 27 59 28 53 24Z"
      fill={GREEN}
      stroke={OUTLINE}
      strokeWidth="2"
    />

    {/* 반짝임 */}
    <Ellipse cx="34" cy="45" rx="5" ry="9" fill={WHITE} opacity={0.55} />
  </Svg>
);
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
      strokeWidth="3"
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
      strokeWidth="2"
    />

    {/* 씨앗 */}
    <Ellipse cx="40" cy="48" rx="2" ry="4" fill="#FDE68A" />
    <Ellipse cx="52" cy="45" rx="2" ry="4" fill="#FDE68A" />
    <Ellipse cx="62" cy="50" rx="2" ry="4" fill="#FDE68A" />
    <Ellipse cx="47" cy="60" rx="2" ry="4" fill="#FDE68A" />
    <Ellipse cx="57" cy="64" rx="2" ry="4" fill="#FDE68A" />
  </Svg>
);
const Balloon = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    <Ellipse
      cx="50"
      cy="40"
      rx="27"
      ry="32"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />

    <Polygon points="46,69 54,69 50,77" fill={colorHex} />

    <Path
      d="M50 77 C48 85 55 88 51 96"
      stroke="#94A3B8"
      strokeWidth="3"
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
      strokeWidth="3"
    />

    <Rect
      x="68"
      y="48"
      width="20"
      height="26"
      rx="5"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
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
      strokeWidth="2"
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
      strokeWidth="2"
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
      strokeWidth="3"
    />

    <Circle
      cx="63"
      cy="62"
      r="17"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />

    <Path
      d="M37 47 C40 27 50 22 63 45"
      stroke={GREEN}
      strokeWidth="5"
      fill="none"
      strokeLinecap="round"
    />

    <Path
      d="M47 29 C54 20 67 21 71 27 C61 32 53 32 47 29Z"
      fill={GREEN}
      stroke={OUTLINE}
      strokeWidth="2"
    />
  </Svg>
);
const Fish = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    <Path
      d="M20 50
         C32 30 64 28 77 50
         C64 72 32 70 20 50Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />

    <Polygon
      points="76,50 92,35 92,65"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />

    <Circle cx="38" cy="44" r="5" fill={WHITE} />
    <Circle cx="39" cy="44" r="2.5" fill={DARK} />

    <Path
      d="M52 42 Q60 50 52 58"
      stroke={WHITE}
      strokeWidth="3"
      fill="none"
      opacity={0.7}
    />
  </Svg>
);
// const Blueberry = ({ colorHex }: ItemSvgProps) => (
//   <Svg width="100" height="100" viewBox="0 0 100 100">
//     <Circle
//       cx="50"
//       cy="55"
//       r="28"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="3"
//     />

//     <Path
//       d="M38 31 Q50 22 62 31"
//       stroke="#1E3A8A"
//       strokeWidth="5"
//       fill="none"
//       strokeLinecap="round"
//     />

//     <Circle cx="40" cy="45" r="6" fill={WHITE} opacity={0.4} />
//   </Svg>
// );
const Blueberry = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    <Ellipse
      cx="50"
      cy="56"
      rx="30"
      ry="24"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
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
      strokeWidth="3"
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
      d="M15 58
              C22 35 55 29 78 43
              C88 49 89 61 80 67
              C60 80 28 74 15 58Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Polygon
      points="18,57 6,45 10,62 5,72 22,66"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    <Circle cx="70" cy="48" r="4" fill={WHITE} />
    <Circle cx="71" cy="48" r="2" fill="#374151" />

    <Path
      d="M75 57 Q79 61 83 57"
      stroke={OUTLINE}
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />

    {/* 물 뿜기 */}
    <Path
      d="M48 31 Q44 20 38 18 M48 30 Q50 18 56 15"
      stroke="#7DD3FC"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
    />
  </Svg>
);

const Banana = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    <Path
      d="M22 65
         C43 69 67 51 74 25
         C77 20 84 23 82 29
         C77 59 53 80 25 78
         C20 77 18 70 22 65Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />

    <Path
      d="M72 27 L78 23"
      stroke={BROWN}
      strokeWidth="5"
      strokeLinecap="round"
    />

    <Ellipse
      cx="38"
      cy="68"
      rx="9"
      ry="4"
      fill={WHITE}
      opacity={0.35}
      transform="rotate(-20 38 68)"
    />
  </Svg>
);

// const Lemon = ({ colorHex }: ItemSvgProps) => (
//   <Svg width="100" height="100" viewBox="0 0 100 100">
//     <Ellipse
//       cx="50"
//       cy="52"
//       rx="32"
//       ry="25"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="3"
//     />

//     <Ellipse
//       cx="39"
//       cy="43"
//       rx="9"
//       ry="5"
//       fill={WHITE}
//       opacity={0.4}
//       transform="rotate(-20 39 43)"
//     />
//   </Svg>
// );
const Lemon = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    <Path
      d="M50 20
         C68 20 82 34 82 52
         C82 70 68 82 50 82
         C32 82 18 70 18 52
         C18 34 32 20 50 20Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />
    {/* 양쪽 꼭지(레몬 특유의 젖꼭지 모양) */}
    <Path
      d="M18 52 C13 51 10 52 10 55 C10 58 13 58 18 56Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="2"
    />
    <Path
      d="M82 52 C87 51 90 52 90 55 C90 58 87 58 82 56Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="2"
    />
    {/* 표면 질감선 */}
    <Path
      d="M32 30 Q50 24 68 30 M28 68 Q50 76 72 68"
      stroke={OUTLINE}
      strokeWidth="1.3"
      fill="none"
      opacity={0.3}
    />
    <Ellipse
      cx="38"
      cy="38"
      rx="10"
      ry="6"
      fill={WHITE}
      opacity={0.4}
      transform="rotate(-25 38 38)"
    />
  </Svg>
);
const Chick = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    <Circle
      cx="50"
      cy="53"
      r="28"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />

    <Circle cx="41" cy="47" r="4" fill={DARK} />
    <Circle cx="59" cy="47" r="4" fill={DARK} />

    <Polygon
      points="47,55 53,55 50,60"
      fill={ORANGE}
      stroke={OUTLINE}
      strokeWidth="2"
    />

    <Circle cx="38" cy="58" r="5" fill="#FDA4AF" opacity={0.6} />
    <Circle cx="62" cy="58" r="5" fill="#FDA4AF" opacity={0.6} />
  </Svg>
);

// const Sunflower = ({ colorHex }: ItemSvgProps) => (
//   <Svg width="100" height="100" viewBox="0 0 100 100">
//     <G>
//       <Circle cx="50" cy="50" r="14" fill="#92400E" />

//       <Circle cx="50" cy="24" r="14" fill={colorHex} />
//       <Circle cx="50" cy="76" r="14" fill={colorHex} />
//       <Circle cx="24" cy="50" r="14" fill={colorHex} />
//       <Circle cx="76" cy="50" r="14" fill={colorHex} />

//       <Circle cx="32" cy="32" r="12" fill={colorHex} />
//       <Circle cx="68" cy="32" r="12" fill={colorHex} />
//       <Circle cx="32" cy="68" r="12" fill={colorHex} />
//       <Circle cx="68" cy="68" r="12" fill={colorHex} />

//       <Circle cx="50" cy="50" r="13" fill="#92400E" />
//     </G>
//   </Svg>
// );

const Sunflower = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    {/* 줄기 + 잎 */}
    <Path
      d="M50 62 L50 90"
      stroke={GREEN}
      strokeWidth="5"
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
          strokeWidth="1.5"
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
      strokeWidth="2"
    />
    {/* 씨앗 질감 점들 */}
    <Circle cx="45" cy="46" r="1.6" fill="#5C3A21" />
    <Circle cx="55" cy="46" r="1.6" fill="#5C3A21" />
    <Circle cx="50" cy="52" r="1.6" fill="#5C3A21" />
    <Circle cx="44" cy="54" r="1.6" fill="#5C3A21" />
    <Circle cx="56" cy="54" r="1.6" fill="#5C3A21" />
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
      strokeWidth="3"
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
      strokeWidth="3"
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
      strokeWidth="3"
    />

    <Circle cx="32" cy="48" r="17" fill={colorHex} />
    <Circle cx="50" cy="39" r="20" fill={colorHex} />
    <Circle cx="68" cy="48" r="17" fill={colorHex} />

    <Circle cx="43" cy="35" r="5" fill={WHITE} opacity={0.25} />
  </Svg>
);
// const Crocodile = ({ colorHex }: ItemSvgProps) => (
//   <Svg width="100" height="100" viewBox="0 0 100 100">
//     <Path
//       d="M14 55
//          C20 38 63 36 83 50
//          C90 55 84 67 73 67
//          L25 68
//          C17 67 11 62 14 55Z"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="3"
//     />

//     <Circle cx="70" cy="47" r="5" fill={WHITE} />
//     <Circle cx="70" cy="47" r="2" fill={DARK} />

//     {/* 이빨 */}
//     <Polygon points="55,63 59,63 57,69" fill={WHITE} />
//     <Polygon points="63,63 67,63 65,69" fill={WHITE} />
//   </Svg>
// );
const Crocodile = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    {/* 꼬리 */}
    <Path
      d="M78 62 C88 58 94 62 92 68 C88 66 82 66 76 68Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="2.5"
    />
    {/* 몸통 + 긴 주둥이 */}
    <Path
      d="M10 60
         C10 50 20 46 30 47
         C40 40 60 38 78 44
         C86 47 90 52 88 58
         C86 63 80 64 76 62
         L30 63
         C20 64 10 62 10 60Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />
    {/* 등 돌기(캔디처럼 통통) */}
    <Circle
      cx="35"
      cy="45"
      r="4"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="2"
    />
    <Circle
      cx="45"
      cy="42"
      r="4"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="2"
    />
    <Circle
      cx="55"
      cy="41"
      r="4"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="2"
    />
    {/* 다리 */}
    <Path
      d="M28 62 L26 70 M42 63 L40 71"
      stroke={OUTLINE}
      strokeWidth="5"
      strokeLinecap="round"
    />
    {/* 눈 (주둥이 위쪽 돌출) */}
    <Circle
      cx="18"
      cy="49"
      r="5"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="2"
    />
    <Circle cx="18" cy="49" r="2.3" fill={DARK} />
    {/* 입 라인 + 이빨 */}
    <Path d="M10 58 L88 58" stroke={OUTLINE} strokeWidth="2" opacity={0.6} />
    <Polygon points="20,58 23,58 21.5,63" fill={WHITE} />
    <Polygon points="30,58 33,58 31.5,63" fill={WHITE} />
    <Polygon points="40,58 43,58 41.5,63" fill={WHITE} />
  </Svg>
);
// const Peas = ({ colorHex }: ItemSvgProps) => (
//   <Svg width="100" height="100" viewBox="0 0 100 100">
//     <Path
//       d="M15 58
//          C20 35 72 25 86 48
//          C92 58 80 72 62 75
//          C42 78 18 72 15 58Z"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="3"
//     />

//     <Circle cx="38" cy="55" r="9" fill="#BEF264" />
//     <Circle cx="55" cy="51" r="9" fill="#BEF264" />
//     <Circle cx="70" cy="55" r="9" fill="#BEF264" />
//   </Svg>
// );
const Peas = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    {/* 콩깍지 (열린 형태) */}
    <Path
      d="M12 55
         C16 32 66 20 84 42
         C90 50 82 62 68 66
         C48 71 20 68 12 55Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
      opacity={0.35}
    />
    {/* 깍지 안쪽 라인 (알알이 들어앉은 홈) */}
    <Path
      d="M20 54 C22 40 60 30 78 46"
      stroke={OUTLINE}
      strokeWidth="1.5"
      fill="none"
      opacity={0.25}
    />

    {/* ⭐ 완두콩 알맹이 — colorHex를 따라감 */}
    <Circle
      cx="34"
      cy="52"
      r="11"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="2"
    />
    <Circle
      cx="53"
      cy="47"
      r="12"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="2"
    />
    <Circle
      cx="71"
      cy="51"
      r="10"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="2"
    />

    {/* 콩알 각각의 볼록한 하이라이트 */}
    <Ellipse cx="30" cy="48" rx="3" ry="2" fill={WHITE} opacity={0.5} />
    <Ellipse cx="49" cy="43" rx="3.5" ry="2.3" fill={WHITE} opacity={0.5} />
    <Ellipse cx="67" cy="47" rx="3" ry="2" fill={WHITE} opacity={0.5} />
  </Svg>
);

const Cactus = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    <Rect
      x="40"
      y="25"
      width="20"
      height="60"
      rx="10"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />

    <Path
      d="M40 48 H27 C20 48 20 35 27 35"
      stroke={colorHex}
      strokeWidth="14"
      fill="none"
      strokeLinecap="round"
    />

    <Path
      d="M60 58 H73 C80 58 80 45 73 45"
      stroke={colorHex}
      strokeWidth="14"
      fill="none"
      strokeLinecap="round"
    />
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
      strokeWidth="3"
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
      strokeWidth="3"
    />

    <Circle
      cx="50"
      cy="35"
      r="19"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />

    <Circle cx="43" cy="32" r="3" fill={DARK} />
    <Circle cx="57" cy="32" r="3" fill={DARK} />

    <Polygon
      points="50,38 67,43 50,47"
      fill={ORANGE}
      stroke={OUTLINE}
      strokeWidth="2"
    />

    <Circle cx="50" cy="58" r="3" fill={DARK} />
    <Circle cx="50" cy="68" r="3" fill={DARK} />
  </Svg>
);
// const Milk = ({ colorHex }: ItemSvgProps) => (
//   <Svg width="100" height="100" viewBox="0 0 100 100">
//     <Path
//       d="M30 25 L70 25 L70 82 L30 82Z"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="3"
//     />

//     <Polygon
//       points="30,25 50,14 70,25"
//       fill="#E2E8F0"
//       stroke={OUTLINE}
//       strokeWidth="3"
//     />

//     <Rect
//       x="38"
//       y="45"
//       width="24"
//       height="17"
//       rx="4"
//       fill={WHITE}
//       opacity={0.55}
//     />
//   </Svg>
// );
const Milk = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    {/* 팩 몸통 */}
    <Path
      d="M28 32 L72 32 L72 84 L28 84Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />
    {/* 지붕(게이블탑) - 접힌 선까지 표현 */}
    <Path
      d="M28 32 L50 14 L72 32 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <Path d="M50 14 L50 32" stroke={OUTLINE} strokeWidth="2" opacity={0.5} />
    {/* 옆면 접힘 삼각 포인트 */}
    <Polygon points="28,32 36,24 44,32" fill={WHITE} opacity={0.25} />
    {/* 라벨 */}
    <Rect
      x="36"
      y="46"
      width="28"
      height="20"
      rx="4"
      fill={WHITE}
      opacity={0.9}
      stroke={OUTLINE}
      strokeWidth="1.5"
    />
    <Path
      d="M41 56 Q50 50 59 56"
      stroke={colorHex}
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />
  </Svg>
);
const Rabbit = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    {/* 귀 */}
    <Ellipse
      cx="38"
      cy="25"
      rx="9"
      ry="20"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Ellipse
      cx="62"
      cy="25"
      rx="9"
      ry="20"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Ellipse cx="38" cy="25" rx="4" ry="12" fill="#F9A8D4" />

    <Ellipse cx="62" cy="25" rx="4" ry="12" fill="#F9A8D4" />

    {/* 얼굴 */}
    <Circle
      cx="50"
      cy="61"
      r="27"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Circle cx="40" cy="58" r="4" fill="#374151" />
    <Circle cx="60" cy="58" r="4" fill="#374151" />

    <Circle cx="50" cy="66" r="4" fill="#F472B6" />

    <Path
      d="M45 72 Q50 77 55 72"
      stroke={OUTLINE}
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />
  </Svg>
);

// const CottonCandy = ({ colorHex }: ItemSvgProps) => (
//   <Svg width="100" height="100" viewBox="0 0 100 100">
//     <Circle cx="36" cy="48" r="17" fill={colorHex} />
//     <Circle cx="52" cy="38" r="20" fill={colorHex} />
//     <Circle cx="68" cy="48" r="17" fill={colorHex} />

//     <Path
//       d="M50 58 L50 88"
//       stroke={BROWN}
//       strokeWidth="7"
//       strokeLinecap="round"
//     />

//     <Ellipse cx="42" cy="34" rx="8" ry="5" fill={WHITE} opacity={0.4} />
//   </Svg>
// );

// const Crow = ({ colorHex }: ItemSvgProps) => (
//   <Svg width="100" height="100" viewBox="0 0 100 100">
//     <Path
//       d="M18 60
//          C25 40 55 35 76 50
//          C85 56 80 69 68 70
//          C48 73 27 72 18 60Z"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="3"
//     />

//     <Polygon
//       points="75,50 92,45 76,58"
//       fill={ORANGE}
//       stroke={OUTLINE}
//       strokeWidth="2"
//     />

//     <Circle cx="61" cy="49" r="4" fill={WHITE} />
//     <Circle cx="62" cy="49" r="2" fill={DARK} />
//   </Svg>
// );
const CottonCandy = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    {/* 종이 콘(막대 대신 원뿔) */}
    <Polygon
      points="42,60 58,60 52,90 48,90"
      fill="#FDE68A"
      stroke={OUTLINE}
      strokeWidth="2"
    />
    <Path
      d="M43 66 L57 66 M44 74 L56 74"
      stroke={OUTLINE}
      strokeWidth="1"
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
      strokeWidth="2"
    />
    {/* 몸통 */}
    <Ellipse
      cx="52"
      cy="58"
      rx="26"
      ry="22"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />
    {/* 머리 */}
    <Circle
      cx="70"
      cy="38"
      r="16"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />
    {/* 부리 */}
    <Polygon
      points="83,36 96,32 84,44"
      fill={ORANGE}
      stroke={OUTLINE}
      strokeWidth="2"
    />
    {/* 날개 */}
    <Path
      d="M40 50 C34 58 34 68 42 74 C50 68 52 58 48 50Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="2"
      opacity={0.85}
    />
    <Path
      d="M40 56 C38 62 38 68 42 72"
      stroke={OUTLINE}
      strokeWidth="1.3"
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
      strokeWidth="3"
      strokeLinecap="round"
    />
    <Path
      d="M44 90 L40 92 M44 90 L48 93 M62 90 L58 93 M62 90 L66 92"
      stroke={ORANGE}
      strokeWidth="2"
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
const Charcoal = ({ colorHex }: ItemSvgProps) => (
  <Svg width="100" height="100" viewBox="0 0 100 100">
    <Polygon
      points="25,35 68,28 82,63 60,80 24,68"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />

    <Ellipse
      cx="45"
      cy="45"
      rx="10"
      ry="5"
      fill={WHITE}
      opacity={0.15}
      transform="rotate(-15 45 45)"
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
  lemon: Lemon,
  chick: Chick,
  sunflower: Sunflower,
  star: Star,
  tree: Tree,
  broccoli: Broccoli,
  crocodile: Crocodile,
  peas: Peas,
  cactus: Cactus,
  crow: Crow,
  cat: Cat,
  charcoal: Charcoal,
  cloud: Cloud,
  snowman: Snowman,
  rabbit: Rabbit,
  cottonCandy: CottonCandy,
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

// import React from "react";
// import Svg, { Path, Circle, Rect, Ellipse, Polygon, G } from "react-native-svg";

// interface RenderItemSvgProps {
//   itemName: string;
//   colorHex: string;
//   size?: number;
// }

// /* --------------------------------------------------
//  * 공통 설정
//  * -------------------------------------------------- */

// const STROKE = "#6B7280";
// const WHITE = "#FFFFFF";

// const getLightColor = (color: string) => {
//   const lightColors: Record<string, string> = {
//     "#F03E3E": "#FFB3B3",
//     "#1971C2": "#9DD6FF",
//     "#F9C80E": "#FFF0A8",
//     "#2F9E44": "#A8E6B8",
//     "#AE3EC9": "#DDA8EA",
//     "#E8590C": "#FFC08A",
//     "#F06595": "#FFB8D2",
//     "#5C3A21": "#B98B6B",
//     "#1A1A1A": "#555555",
//     "#FFFFFF": "#F1F5F9",
//   };

//   return lightColors[color] ?? "#FFFFFF";
// };

// /* --------------------------------------------------
//  * 귀여운 유아용 SVG
//  * -------------------------------------------------- */

// export const RenderItemSvg = ({
//   itemName,
//   colorHex,
//   size = 92,
// }: RenderItemSvgProps) => {
//   const lightColor = getLightColor(colorHex);

//   const commonProps = {
//     width: size,
//     height: size,
//     viewBox: "0 0 100 100",
//   };

//   switch (itemName) {
//     /* ==================================================
//      * 🍎 사과
//      * ================================================== */

//     case "빨간 사과":
//     case "사과":
//       return (
//         <Svg {...commonProps}>
//           {/* 잎 */}
//           <Path
//             d="M51 19 C58 8 70 9 76 14 C68 23 59 25 51 19Z"
//             fill="#65B741"
//             stroke={STROKE}
//             strokeWidth="3"
//             strokeLinejoin="round"
//           />

//           {/* 사과 */}
//           <Path
//             d="M50 30
//               C37 20 19 28 19 47
//               C19 69 35 84 50 89
//               C65 84 81 69 81 47
//               C81 28 63 20 50 30Z"
//             fill={colorHex}
//             stroke={STROKE}
//             strokeWidth="4"
//           />

//           {/* 하이라이트 */}
//           <Ellipse cx="34" cy="43" rx="7" ry="12" fill={WHITE} opacity={0.35} />

//           {/* 꼭지 */}
//           <Path
//             d="M50 31 Q48 22 53 17"
//             stroke="#8B5E3C"
//             strokeWidth="5"
//             strokeLinecap="round"
//           />
//         </Svg>
//       );

//     /* ==================================================
//      * 🍓 딸기
//      * ================================================== */

//     case "딸기":
//     case "strawberry":
//       return (
//         <Svg {...commonProps}>
//           <Path
//             d="M50 28
//               C34 23 20 34 23 51
//               C26 68 40 82 50 89
//               C60 82 74 68 77 51
//               C80 34 66 23 50 28Z"
//             fill={colorHex}
//             stroke={STROKE}
//             strokeWidth="4"
//           />

//           {/* 잎 */}
//           <Path
//             d="M50 31
//               L38 18
//               L47 21
//               L50 10
//               L54 21
//               L65 17
//               L56 31Z"
//             fill="#65B741"
//             stroke={STROKE}
//             strokeWidth="3"
//             strokeLinejoin="round"
//           />

//           {/* 씨앗 */}
//           <Ellipse cx="39" cy="45" rx="2" ry="4" fill="#FFE082" />
//           <Ellipse cx="51" cy="40" rx="2" ry="4" fill="#FFE082" />
//           <Ellipse cx="62" cy="46" rx="2" ry="4" fill="#FFE082" />
//           <Ellipse cx="44" cy="58" rx="2" ry="4" fill="#FFE082" />
//           <Ellipse cx="57" cy="60" rx="2" ry="4" fill="#FFE082" />

//           {/* 하이라이트 */}
//           <Ellipse cx="35" cy="40" rx="5" ry="8" fill={WHITE} opacity={0.3} />
//         </Svg>
//       );

//     /* ==================================================
//      * 🎈 풍선
//      * ================================================== */

//     case "빨간 풍선":
//     case "balloon":
//       return (
//         <Svg {...commonProps}>
//           <Ellipse
//             cx="50"
//             cy="42"
//             rx="29"
//             ry="35"
//             fill={colorHex}
//             stroke={STROKE}
//             strokeWidth="4"
//           />

//           <Path
//             d="M42 74 L50 83 L58 74 Z"
//             fill={colorHex}
//             stroke={STROKE}
//             strokeWidth="3"
//           />

//           <Path
//             d="M50 83 Q54 92 47 97"
//             stroke={STROKE}
//             strokeWidth="3"
//             fill="none"
//             strokeLinecap="round"
//           />

//           {/* 빛 */}
//           <Ellipse cx="39" cy="31" rx="7" ry="12" fill={WHITE} opacity={0.35} />
//         </Svg>
//       );

//     /* ==================================================
//      * 🚒 소방차
//      * ================================================== */

//     case "소방차":
//     case "fireTruck":
//       return (
//         <Svg {...commonProps}>
//           {/* 차체 */}
//           <Rect
//             x="13"
//             y="40"
//             width="74"
//             height="35"
//             rx="8"
//             fill={colorHex}
//             stroke={STROKE}
//             strokeWidth="4"
//           />

//           {/* 운전석 */}
//           <Path
//             d="M60 40 H78 Q87 40 87 50 V61 H60Z"
//             fill={lightColor}
//             stroke={STROKE}
//             strokeWidth="4"
//           />

//           {/* 창문 */}
//           <Rect x="65" y="45" width="15" height="11" rx="3" fill="#BDE7FF" />

//           {/* 사다리 */}
//           <Rect
//             x="20"
//             y="30"
//             width="40"
//             height="7"
//             rx="3"
//             fill="#FFD166"
//             stroke={STROKE}
//             strokeWidth="3"
//           />

//           <Path
//             d="M27 30 V37 M37 30 V37 M47 30 V37"
//             stroke={STROKE}
//             strokeWidth="2"
//           />

//           {/* 바퀴 */}
//           <Circle
//             cx="30"
//             cy="77"
//             r="10"
//             fill="#374151"
//             stroke={STROKE}
//             strokeWidth="3"
//           />
//           <Circle cx="30" cy="77" r="4" fill="#E5E7EB" />

//           <Circle
//             cx="70"
//             cy="77"
//             r="10"
//             fill="#374151"
//             stroke={STROKE}
//             strokeWidth="3"
//           />
//           <Circle cx="70" cy="77" r="4" fill="#E5E7EB" />

//           {/* 사이렌 */}
//           <Circle
//             cx="51"
//             cy="30"
//             r="6"
//             fill="#FF6B6B"
//             stroke={STROKE}
//             strokeWidth="3"
//           />
//         </Svg>
//       );

//     /* ==================================================
//      * 🍒 체리
//      * ================================================== */

//     case "체리":
//     case "cherry":
//       return (
//         <Svg {...commonProps}>
//           <Circle
//             cx="35"
//             cy="65"
//             r="17"
//             fill={colorHex}
//             stroke={STROKE}
//             strokeWidth="4"
//           />

//           <Circle
//             cx="65"
//             cy="65"
//             r="17"
//             fill={colorHex}
//             stroke={STROKE}
//             strokeWidth="4"
//           />

//           <Path
//             d="M35 50 Q42 22 55 22 Q68 22 65 50"
//             fill="none"
//             stroke="#65B741"
//             strokeWidth="5"
//             strokeLinecap="round"
//           />

//           <Ellipse cx="29" cy="59" rx="5" ry="7" fill={WHITE} opacity={0.3} />

//           <Ellipse cx="59" cy="59" rx="5" ry="7" fill={WHITE} opacity={0.3} />
//         </Svg>
//       );

//     /* ==================================================
//      * 🐟 물고기
//      * ================================================== */

//     case "파란 물고기":
//     case "fish":
//       return (
//         <Svg {...commonProps}>
//           <Path
//             d="M18 50
//               C30 28 62 27 77 50
//               C62 73 30 72 18 50Z"
//             fill={colorHex}
//             stroke={STROKE}
//             strokeWidth="4"
//           />

//           <Polygon
//             points="76,50 94,35 94,65"
//             fill={colorHex}
//             stroke={STROKE}
//             strokeWidth="4"
//             strokeLinejoin="round"
//           />

//           <Circle cx="67" cy="43" r="5" fill={WHITE} />
//           <Circle cx="68" cy="43" r="2.5" fill="#374151" />

//           {/* 웃는 입 */}
//           <Path
//             d="M68 55 Q73 60 78 55"
//             stroke={STROKE}
//             strokeWidth="3"
//             fill="none"
//             strokeLinecap="round"
//           />

//           <Ellipse cx="35" cy="42" rx="6" ry="10" fill={WHITE} opacity={0.25} />
//         </Svg>
//       );

//     /* ==================================================
//      * 🫐 블루베리
//      * ================================================== */

//     case "블루베리":
//     case "blueberry":
//       return (
//         <Svg {...commonProps}>
//           <Circle
//             cx="50"
//             cy="53"
//             r="30"
//             fill={colorHex}
//             stroke={STROKE}
//             strokeWidth="4"
//           />

//           <Path
//             d="M37 28 L43 35 L50 27 L57 35 L64 28"
//             fill="#6B46C1"
//             stroke={STROKE}
//             strokeWidth="3"
//             strokeLinejoin="round"
//           />

//           <Circle cx="40" cy="45" r="6" fill={WHITE} opacity={0.3} />
//         </Svg>
//       );

//     /* ==================================================
//      * ☂️ 우산
//      * ================================================== */

//     case "파란 우산":
//     case "검은 우산":
//     case "umbrella":
//       return (
//         <Svg {...commonProps}>
//           <Path
//             d="M15 52
//               Q50 18 85 52
//               Q78 49 72 56
//               Q64 49 57 56
//               Q50 49 43 56
//               Q36 49 28 56
//               Q22 49 15 52Z"
//             fill={colorHex}
//             stroke={STROKE}
//             strokeWidth="4"
//             strokeLinejoin="round"
//           />

//           <Path
//             d="M50 52 V82 Q50 92 60 88"
//             fill="none"
//             stroke={STROKE}
//             strokeWidth="5"
//             strokeLinecap="round"
//           />

//           <Ellipse cx="38" cy="42" rx="8" ry="5" fill={WHITE} opacity={0.3} />
//         </Svg>
//       );

//     /* ==================================================
//      * 🐳 고래
//      * ================================================== */

//     case "고래":
//     case "whale":
//       return (
//         <Svg {...commonProps}>
//           <Path
//             d="M15 58
//               C22 35 55 29 78 43
//               C88 49 89 61 80 67
//               C60 80 28 74 15 58Z"
//             fill={colorHex}
//             stroke={STROKE}
//             strokeWidth="4"
//           />

//           <Polygon
//             points="18,57 6,45 10,62 5,72 22,66"
//             fill={colorHex}
//             stroke={STROKE}
//             strokeWidth="4"
//             strokeLinejoin="round"
//           />

//           <Circle cx="70" cy="48" r="4" fill={WHITE} />
//           <Circle cx="71" cy="48" r="2" fill="#374151" />

//           <Path
//             d="M75 57 Q79 61 83 57"
//             stroke={STROKE}
//             strokeWidth="3"
//             fill="none"
//             strokeLinecap="round"
//           />

//           {/* 물 뿜기 */}
//           <Path
//             d="M48 31 Q44 20 38 18 M48 30 Q50 18 56 15"
//             stroke="#7DD3FC"
//             strokeWidth="4"
//             fill="none"
//             strokeLinecap="round"
//           />
//         </Svg>
//       );

//     /* ==================================================
//      * 🍌 바나나
//      * ================================================== */

//

//     /* ==================================================
//      * 🍋 레몬
//      * ================================================== */

//     case "레몬":
//     case "lemon":
//       return (
//         <Svg {...commonProps}>
//           <Ellipse
//             cx="50"
//             cy="53"
//             rx="34"
//             ry="25"
//             fill={colorHex}
//             stroke={STROKE}
//             strokeWidth="4"
//             transform="rotate(-15 50 53)"
//           />

//           <Ellipse
//             cx="38"
//             cy="44"
//             rx="8"
//             ry="5"
//             fill={WHITE}
//             opacity={0.3}
//             transform="rotate(-15 38 44)"
//           />
//         </Svg>
//       );

//     /* ==================================================
//      * 🐥 병아리
//      * ================================================== */

//     case "병아리":
//     case "chick":
//       return (
//         <Svg {...commonProps}>
//           <Circle
//             cx="50"
//             cy="55"
//             r="29"
//             fill={colorHex}
//             stroke={STROKE}
//             strokeWidth="4"
//           />

//           {/* 머리 털 */}
//           <Path
//             d="M43 29 Q47 18 50 28 Q54 17 57 29"
//             stroke={colorHex}
//             strokeWidth="7"
//             fill="none"
//             strokeLinecap="round"
//           />

//           {/* 눈 */}
//           <Circle cx="40" cy="52" r="4" fill="#374151" />
//           <Circle cx="60" cy="52" r="4" fill="#374151" />

//           {/* 부리 */}
//           <Polygon
//             points="50,57 41,64 59,64"
//             fill="#FF9F43"
//             stroke={STROKE}
//             strokeWidth="3"
//           />

//           <Ellipse cx="39" cy="43" rx="7" ry="9" fill={WHITE} opacity={0.25} />
//         </Svg>
//       );

//     /* ==================================================
//      * 🌻 해바라기
//      * ================================================== */

//     case "해바라기":
//     case "sunflower":
//       return (
//         <Svg {...commonProps}>
//           <G>
//             <Circle cx="50" cy="25" r="13" fill={colorHex} />
//             <Circle cx="25" cy="38" r="13" fill={colorHex} />
//             <Circle cx="75" cy="38" r="13" fill={colorHex} />
//             <Circle cx="22" cy="63" r="13" fill={colorHex} />
//             <Circle cx="78" cy="63" r="13" fill={colorHex} />
//             <Circle cx="50" cy="78" r="13" fill={colorHex} />
//             <Circle cx="50" cy="50" r="19" fill="#8B5E34" />
//             <Circle cx="45" cy="44" r="5" fill={WHITE} opacity={0.25} />
//           </G>
//         </Svg>
//       );

//     /* ==================================================
//      * ⭐ 별
//      * ================================================== */

//     case "노란 별":
//     case "star":
//       return (
//         <Svg {...commonProps}>
//           <Polygon
//             points="50,10 61,38 91,39 67,56 76,86 50,68 24,86 33,56 9,39 39,38"
//             fill={colorHex}
//             stroke={STROKE}
//             strokeWidth="4"
//             strokeLinejoin="round"
//           />

//           <Ellipse
//             cx="36"
//             cy="34"
//             rx="7"
//             ry="5"
//             fill={WHITE}
//             opacity={0.35}
//             transform="rotate(-25 36 34)"
//           />
//         </Svg>
//       );

//     /* ==================================================
//      * 🌳 나무
//      * ================================================== */

//     case "초록 나무":
//     case "tree":
//       return (
//         <Svg {...commonProps}>
//           <Rect
//             x="43"
//             y="55"
//             width="14"
//             height="32"
//             rx="5"
//             fill="#9A6B45"
//             stroke={STROKE}
//             strokeWidth="3"
//           />

//           <Circle
//             cx="35"
//             cy="47"
//             r="19"
//             fill={colorHex}
//             stroke={STROKE}
//             strokeWidth="4"
//           />

//           <Circle
//             cx="65"
//             cy="47"
//             r="19"
//             fill={colorHex}
//             stroke={STROKE}
//             strokeWidth="4"
//           />

//           <Circle
//             cx="50"
//             cy="31"
//             r="20"
//             fill={colorHex}
//             stroke={STROKE}
//             strokeWidth="4"
//           />

//           <Ellipse cx="43" cy="28" rx="7" ry="10" fill={WHITE} opacity={0.2} />
//         </Svg>
//       );

//     /* ==================================================
//      * 🥦 브로콜리
//      * ================================================== */

//     case "브로콜리":
//     case "broccoli":
//       return (
//         <Svg {...commonProps}>
//           <Rect
//             x="42"
//             y="57"
//             width="16"
//             height="30"
//             rx="6"
//             fill="#86C06A"
//             stroke={STROKE}
//             strokeWidth="3"
//           />

//           <Circle
//             cx="32"
//             cy="48"
//             r="17"
//             fill={colorHex}
//             stroke={STROKE}
//             strokeWidth="4"
//           />

//           <Circle
//             cx="50"
//             cy="38"
//             r="21"
//             fill={colorHex}
//             stroke={STROKE}
//             strokeWidth="4"
//           />

//           <Circle
//             cx="68"
//             cy="48"
//             r="17"
//             fill={colorHex}
//             stroke={STROKE}
//             strokeWidth="4"
//           />

//           <Ellipse cx="44" cy="31" rx="7" ry="9" fill={WHITE} opacity={0.2} />
//         </Svg>
//       );

//     /* ==================================================
//      * 🐊 악어
//      * ================================================== */

//     case "악어":
//     case "crocodile":
//       return (
//         <Svg {...commonProps}>
//           <Path
//             d="M12 58
//               Q22 36 53 42
//               Q75 45 87 58
//               Q76 70 51 68
//               Q27 70 12 58Z"
//             fill={colorHex}
//             stroke={STROKE}
//             strokeWidth="4"
//           />

//           <Circle cx="68" cy="48" r="5" fill="#FFFFFF" />
//           <Circle cx="69" cy="48" r="2.5" fill="#374151" />

//           <Path
//             d="M75 59 Q82 63 87 58"
//             stroke={STROKE}
//             strokeWidth="3"
//             fill="none"
//             strokeLinecap="round"
//           />

//           <Ellipse cx="35" cy="49" rx="8" ry="5" fill={WHITE} opacity={0.25} />
//         </Svg>
//       );

//     /* ==================================================
//      * 🐈 고양이
//      * ================================================== */

//     case "검은 고양이":
//     case "고양이":
//     case "cat":
//       return (
//         <Svg {...commonProps}>
//           <Polygon
//             points="25,39 28,16 44,31 56,31 72,16 75,39"
//             fill={colorHex}
//             stroke={STROKE}
//             strokeWidth="4"
//             strokeLinejoin="round"
//           />

//           <Circle
//             cx="50"
//             cy="58"
//             r="28"
//             fill={colorHex}
//             stroke={STROKE}
//             strokeWidth="4"
//           />

//           <Circle cx="40" cy="54" r="4" fill="#F8FAFC" />
//           <Circle cx="60" cy="54" r="4" fill="#F8FAFC" />

//           <Circle cx="40" cy="54" r="2" fill="#374151" />
//           <Circle cx="60" cy="54" r="2" fill="#374151" />

//           <Path
//             d="M47 63 Q50 66 53 63"
//             stroke="#F472B6"
//             strokeWidth="3"
//             fill="none"
//             strokeLinecap="round"
//           />

//           <Path
//             d="M28 63 H13 M28 68 H15 M72 63 H87 M72 68 H85"
//             stroke={STROKE}
//             strokeWidth="2"
//             strokeLinecap="round"
//           />
//         </Svg>
//       );

//     /* ==================================================
//      * ☁️ 구름
//      * ================================================== */

//     case "구름":
//     case "cloud":
//       return (
//         <Svg {...commonProps}>
//           <Path
//             d="M18 67
//               C13 58 20 47 31 47
//               C33 34 44 27 56 31
//               C65 25 79 32 80 44
//               C91 45 95 56 89 64
//               C85 70 76 72 67 71
//               H29
//               C24 71 20 70 18 67Z"
//             fill={colorHex}
//             stroke={STROKE}
//             strokeWidth="4"
//           />

//           <Ellipse cx="40" cy="44" rx="10" ry="7" fill={WHITE} opacity={0.45} />
//         </Svg>
//       );

//     /* ==================================================
//      * ☃️ 눈사람
//      * ================================================== */

//     case "눈사람":
//     case "snowman":
//       return (
//         <Svg {...commonProps}>
//           <Circle
//             cx="50"
//             cy="67"
//             r="25"
//             fill={colorHex}
//             stroke={STROKE}
//             strokeWidth="4"
//           />

//           <Circle
//             cx="50"
//             cy="35"
//             r="19"
//             fill={colorHex}
//             stroke={STROKE}
//             strokeWidth="4"
//           />

//           {/* 눈 */}
//           <Circle cx="43" cy="33" r="3" fill="#374151" />
//           <Circle cx="57" cy="33" r="3" fill="#374151" />

//           {/* 코 */}
//           <Polygon points="50,38 63,42 50,45" fill="#FF9F43" />

//           {/* 목도리 */}
//           <Path
//             d="M33 48 Q50 55 67 48"
//             stroke="#F87171"
//             strokeWidth="7"
//             fill="none"
//           />

//           <Ellipse cx="44" cy="26" rx="5" ry="7" fill={WHITE} opacity={0.35} />
//         </Svg>
//       );

//     /* ==================================================
//      * 🐰 토끼
//      * ================================================== */

//     case "흰 토끼":
//     case "토끼":
//     case "rabbit":
//       return (
//         <Svg {...commonProps}>
//           {/* 귀 */}
//           <Ellipse
//             cx="38"
//             cy="25"
//             rx="9"
//             ry="20"
//             fill={colorHex}
//             stroke={STROKE}
//             strokeWidth="4"
//           />

//           <Ellipse
//             cx="62"
//             cy="25"
//             rx="9"
//             ry="20"
//             fill={colorHex}
//             stroke={STROKE}
//             strokeWidth="4"
//           />

//           <Ellipse cx="38" cy="25" rx="4" ry="12" fill="#F9A8D4" />

//           <Ellipse cx="62" cy="25" rx="4" ry="12" fill="#F9A8D4" />

//           {/* 얼굴 */}
//           <Circle
//             cx="50"
//             cy="61"
//             r="27"
//             fill={colorHex}
//             stroke={STROKE}
//             strokeWidth="4"
//           />

//           <Circle cx="40" cy="58" r="4" fill="#374151" />
//           <Circle cx="60" cy="58" r="4" fill="#374151" />

//           <Circle cx="50" cy="66" r="4" fill="#F472B6" />

//           <Path
//             d="M45 72 Q50 77 55 72"
//             stroke={STROKE}
//             strokeWidth="3"
//             fill="none"
//             strokeLinecap="round"
//           />
//         </Svg>
//       );

//     /* ==================================================
//      * 🍬 솜사탕
//      * ================================================== */

//     case "솜사탕":
//     case "cottonCandy":
//       return (
//         <Svg {...commonProps}>
//           <Circle
//             cx="36"
//             cy="47"
//             r="16"
//             fill={colorHex}
//             stroke={STROKE}
//             strokeWidth="4"
//           />

//           <Circle
//             cx="55"
//             cy="39"
//             r="19"
//             fill={colorHex}
//             stroke={STROKE}
//             strokeWidth="4"
//           />

//           <Circle
//             cx="70"
//             cy="50"
//             r="15"
//             fill={colorHex}
//             stroke={STROKE}
//             strokeWidth="4"
//           />

//           <Path
//             d="M50 61 L50 90"
//             stroke="#C58B5A"
//             strokeWidth="6"
//             strokeLinecap="round"
//           />

//           <Ellipse cx="48" cy="32" rx="8" ry="6" fill={WHITE} opacity={0.35} />
//         </Svg>
//       );

//     /* ==================================================
//      * 🥛 우유
//      * ================================================== */

//     case "우유":
//     case "milk":
//       return (
//         <Svg {...commonProps}>
//           <Path
//             d="M28 28 L40 19 H67 L77 29 V82 Q77 88 71 88 H29 Q23 88 23 82 V35Z"
//             fill={colorHex}
//             stroke={STROKE}
//             strokeWidth="4"
//             strokeLinejoin="round"
//           />

//           <Path
//             d="M40 19 L45 29 H77"
//             fill="none"
//             stroke={STROKE}
//             strokeWidth="4"
//           />

//           <Rect
//             x="34"
//             y="45"
//             width="32"
//             height="20"
//             rx="6"
//             fill={WHITE}
//             opacity={0.65}
//           />

//           <Path
//             d="M43 55 Q50 48 57 55"
//             stroke="#60A5FA"
//             strokeWidth="4"
//             fill="none"
//             strokeLinecap="round"
//           />
//         </Svg>
//       );

//     default:
//       return (
//         <Svg {...commonProps}>
//           <Circle
//             cx="50"
//             cy="50"
//             r="32"
//             fill={colorHex}
//             stroke={STROKE}
//             strokeWidth="4"
//           />
//           <Ellipse cx="39" cy="38" rx="8" ry="10" fill={WHITE} opacity={0.3} />
//         </Svg>
//       );
//   }
// };
