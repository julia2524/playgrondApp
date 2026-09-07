// // 🍽️ 접시
// export const Plate = ({ colorHex = DEFAULT_COLOR }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     {/* 접시 */}
//     <Circle
//       cx="50"
//       cy="52"
//       r="32"
//       fill={WHITE}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />

//     <Circle cx="50" cy="52" r="24" fill={colorHex} opacity={0.85} />

//     <Circle cx="50" cy="52" r="18" fill={WHITE} opacity={0.8} />

//     {/* 반짝임 */}
//     <Path
//       d="M30 38 Q36 31 44 31"
//       fill="none"
//       stroke={WHITE}
//       strokeWidth="4"
//       strokeLinecap="round"
//       opacity={0.8}
//     />
//   </Svg>
// );

// // 🍪 쿠키
// export const Cookie = ({ colorHex = DEFAULT_COLOR }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Path
//       d="
//         M75 31
//         Q82 42 79 55
//         Q76 72 59 80
//         Q42 88 28 77
//         Q16 67 20 50
//         Q23 34 37 27
//         Q51 20 64 25
//         Q70 27 75 31
//         Z
//       "
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />

//     {/* 초코칩 */}
//     <Circle cx="36" cy="44" r="5" fill="#7B341E" />
//     <Circle cx="57" cy="35" r="4" fill="#7B341E" />
//     <Circle cx="64" cy="54" r="5" fill="#7B341E" />
//     <Circle cx="42" cy="64" r="4" fill="#7B341E" />
//     <Circle cx="57" cy="71" r="3.5" fill="#7B341E" />

//     {/* 쿠키 반짝임 */}
//     <Circle cx="31" cy="36" r="5" fill={WHITE} opacity={0.45} />
//   </Svg>
// );

// // 🔘 단추
// export const Button = ({ colorHex = DEFAULT_COLOR }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Circle
//       cx="50"
//       cy="51"
//       r="30"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />

//     {/* 안쪽 테두리 */}
//     <Circle
//       cx="50"
//       cy="51"
//       r="21"
//       fill="none"
//       stroke={WHITE}
//       strokeWidth="3"
//       opacity={0.7}
//     />

//     {/* 구멍 */}
//     <Circle cx="42" cy="44" r="3.5" fill={OUTLINE} />
//     <Circle cx="58" cy="44" r="3.5" fill={OUTLINE} />
//     <Circle cx="42" cy="59" r="3.5" fill={OUTLINE} />
//     <Circle cx="58" cy="59" r="3.5" fill={OUTLINE} />

//     <Circle cx="40" cy="34" r="5" fill={WHITE} opacity={0.45} />
//   </Svg>
// );

// // 🌕 보름달
// export const FullMoon = ({ colorHex = DEFAULT_COLOR }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Circle
//       cx="50"
//       cy="50"
//       r="31"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />

//     {/* 달 표면 */}
//     <Circle cx="37" cy="40" r="6" fill={WHITE} opacity={0.18} />

//     <Circle cx="61" cy="37" r="4" fill={WHITE} opacity={0.18} />

//     <Circle cx="63" cy="60" r="7" fill={WHITE} opacity={0.15} />

//     <Circle cx="40" cy="65" r="4" fill={WHITE} opacity={0.18} />

//     {/* 달빛 */}
//     <Path
//       d="M30 30 Q37 23 46 21"
//       fill="none"
//       stroke={WHITE}
//       strokeWidth="4"
//       strokeLinecap="round"
//       opacity={0.7}
//     />
//   </Svg>
// );

// // ============================================================
// // 🟦 네모
// // ============================================================

// // 📦 상자
// export const Box = ({ colorHex = DEFAULT_COLOR }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     {/* 상자 */}
//     <Path
//       d="
//         M24 35
//         L50 22
//         L76 35
//         L76 68
//         L50 81
//         L24 68
//         Z
//       "
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />

//     {/* 뚜껑 */}
//     <Path
//       d="
//         M24 35
//         L50 48
//         L76 35
//         L50 22
//         Z
//       "
//       fill={WHITE}
//       opacity={0.28}
//       stroke={OUTLINE}
//       strokeWidth="3"
//       strokeLinejoin="round"
//     />

//     {/* 리본 */}
//     <Path d="M50 48 L50 78" stroke={WHITE} strokeWidth="6" opacity={0.7} />

//     <Path
//       d="M24 35 L50 48 L76 35"
//       fill="none"
//       stroke={WHITE}
//       strokeWidth="4"
//       opacity={0.7}
//     />
//   </Svg>
// );

// // 🧱 블록
// export const Block = ({ colorHex = DEFAULT_COLOR }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Rect
//       x="22"
//       y="27"
//       width="56"
//       height="51"
//       rx="8"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />

//     {/* 블록 돌기 */}
//     <Circle
//       cx="37"
//       cy="27"
//       r="7"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />

//     <Circle
//       cx="63"
//       cy="27"
//       r="7"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />

//     {/* 앞면 */}
//     <Rect
//       x="30"
//       y="43"
//       width="40"
//       height="27"
//       rx="5"
//       fill={WHITE}
//       opacity={0.15}
//     />

//     <Circle cx="33" cy="36" r="4" fill={WHITE} opacity={0.45} />
//   </Svg>
// );

// // 🪟 창문
// export const Window = ({ colorHex = DEFAULT_COLOR }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Rect
//       x="20"
//       y="22"
//       width="60"
//       height="58"
//       rx="7"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />

//     {/* 유리 */}
//     <Rect
//       x="29"
//       y="31"
//       width="42"
//       height="40"
//       rx="3"
//       fill="#BFE3FF"
//       stroke={OUTLINE}
//       strokeWidth="3"
//     />

//     {/* 창틀 */}
//     <Line x1="50" y1="31" x2="50" y2="71" stroke={OUTLINE} strokeWidth="3" />

//     <Line x1="29" y1="51" x2="71" y2="51" stroke={OUTLINE} strokeWidth="3" />

//     {/* 빛 */}
//     <Path
//       d="M35 37 L43 37"
//       stroke={WHITE}
//       strokeWidth="4"
//       strokeLinecap="round"
//       opacity={0.7}
//     />
//   </Svg>
// );

// // 🍞 식빵
// export const Bread = ({ colorHex = DEFAULT_COLOR }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Path
//       d="
//         M27 77
//         Q22 73 22 64
//         V42
//         Q22 27 35 24
//         Q50 19 65 24
//         Q78 27 78 42
//         V64
//         Q78 74 73 77
//         Z
//       "
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />

//     {/* 빵 속 */}
//     <Path
//       d="
//         M31 68
//         V43
//         Q31 32 42 31
//         Q50 29 58 31
//         Q69 32 69 43
//         V68
//         Q69 72 65 72
//         H35
//         Q31 72 31 68
//         Z
//       "
//       fill="#FFF3BF"
//       opacity={0.85}
//     />

//     {/* 빵 반짝임 */}
//     <Path
//       d="M34 39 Q39 33 45 33"
//       fill="none"
//       stroke={WHITE}
//       strokeWidth="4"
//       strokeLinecap="round"
//       opacity={0.8}
//     />
//   </Svg>
// );

// // 🖼️ 액자
// export const Frame = ({ colorHex = DEFAULT_COLOR }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Rect
//       x="19"
//       y="20"
//       width="62"
//       height="62"
//       rx="6"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />

//     <Rect
//       x="29"
//       y="30"
//       width="42"
//       height="42"
//       rx="3"
//       fill={WHITE}
//       stroke={OUTLINE}
//       strokeWidth="3"
//     />

//     {/* 그림 */}
//     <Circle cx="59" cy="42" r="6" fill="#FFD166" />

//     <Polygon points="32,67 45,49 53,59 59,52 69,67" fill="#8ACB88" />

//     {/* 반짝임 */}
//     <Path
//       d="M27 28 L36 28"
//       stroke={WHITE}
//       strokeWidth="4"
//       strokeLinecap="round"
//       opacity={0.6}
//     />
//   </Svg>
// );

// // 🎁 선물상자
// export const GiftBox = ({ colorHex = DEFAULT_COLOR }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     {/* 상자 */}
//     <Rect
//       x="23"
//       y="38"
//       width="54"
//       height="39"
//       rx="5"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />

//     {/* 뚜껑 */}
//     <Rect
//       x="20"
//       y="30"
//       width="60"
//       height="13"
//       rx="5"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />

//     {/* 리본 세로 */}
//     <Rect x="46" y="30" width="8" height="47" fill={WHITE} opacity={0.75} />

//     {/* 리본 가로 */}
//     <Rect x="20" y="34" width="60" height="7" fill={WHITE} opacity={0.75} />

//     {/* 리본 */}
//     <Path
//       d="M50 30
//          Q38 18 34 26
//          Q32 32 50 35"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="3"
//     />

//     <Path
//       d="M50 30
//          Q62 18 66 26
//          Q68 32 50 35"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="3"
//     />
//   </Svg>
// );

// // 🟫 타일
// export const Tile = ({ colorHex = DEFAULT_COLOR }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Rect
//       x="21"
//       y="21"
//       width="58"
//       height="58"
//       rx="9"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />

//     {/* 안쪽 타일 */}
//     <Rect
//       x="29"
//       y="29"
//       width="42"
//       height="42"
//       rx="5"
//       fill={WHITE}
//       opacity={0.18}
//     />

//     {/* 귀여운 무늬 */}
//     <Circle cx="41" cy="43" r="4" fill={WHITE} opacity={0.7} />
//     <Circle cx="59" cy="43" r="4" fill={WHITE} opacity={0.7} />
//     <Path
//       d="M39 56 Q50 65 61 56"
//       fill="none"
//       stroke={WHITE}
//       strokeWidth="3"
//       strokeLinecap="round"
//       opacity={0.7}
//     />

//     {/* 반짝임 */}
//     <Path
//       d="M30 31 L38 31"
//       stroke={WHITE}
//       strokeWidth="4"
//       strokeLinecap="round"
//       opacity={0.65}
//     />
//   </Svg>
// );

// /////////////////////////////////////////////////////

// // 🍙 삼각김밥
// export const TriangleRiceBall = ({ colorHex = "#FFF9F9" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     {/* 김밥 몸체 */}
//     <Polygon
//       points="50,15 85,80 15,80"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />
//     {/* 아래쪽 김 띠 */}
//     <Rect
//       x="25"
//       y="60"
//       width="50"
//       height="20"
//       rx="4"
//       fill="#2D3748"
//       stroke={OUTLINE}
//       strokeWidth="3"
//     />
//     {/* 반짝임 */}
//     <Path
//       d="M45 28 L53 38"
//       stroke={WHITE}
//       strokeWidth="3"
//       strokeLinecap="round"
//       opacity={0.7}
//     />
//   </Svg>
// );

// // 🏠 지붕
// export const Roof = ({ colorHex = "#FF8B8B" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Polygon
//       points="50,15 90,75 10,75"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />
//     {/* 창문 장식 */}
//     <Circle
//       cx="50"
//       cy="50"
//       r="12"
//       fill={WHITE}
//       stroke={OUTLINE}
//       strokeWidth="3"
//     />
//     <Path
//       d="M35 30 L50 20"
//       stroke={WHITE}
//       strokeWidth="4"
//       strokeLinecap="round"
//       opacity={0.6}
//     />
//   </Svg>
// );

// // ⛰️ 산
// export const Mountain = ({ colorHex = "#758BFD" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Polygon
//       points="50,20 85,80 15,80"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />
//     {/* 산 꼭대기 눈 */}
//     <Polygon
//       points="50,20 62,42 38,42"
//       fill={WHITE}
//       stroke={OUTLINE}
//       strokeWidth="3"
//       strokeLinejoin="round"
//     />
//   </Svg>
// );

// // 🎪 파티모자
// export const PartyHat = ({ colorHex = "#06D6A0" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Polygon
//       points="50,25 75,80 25,80"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />
//     {/* 꼭대기 방울 */}
//     <Circle
//       cx="50"
//       cy="20"
//       r="8"
//       fill="#FFD166"
//       stroke={OUTLINE}
//       strokeWidth="3"
//     />
//     {/* 모자 줄무늬 패턴 */}
//     <Path
//       d="M35 55 Q50 48 65 55"
//       stroke={WHITE}
//       strokeWidth="4"
//       strokeLinecap="round"
//       fill="none"
//     />
//   </Svg>
// );
// // 🍪 하트 쿠키
// export const HeartCookie = ({ colorHex = "#E09F3E" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Path
//       d="M50 82 C50 82 20 60 20 38 C20 25 30 18 40 18 C47 18 50 24 50 24 C50 24 53 18 60 18 C70 18 80 25 80 38 C80 60 50 82 50 82 Z"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />
//     {/* 쿠키 위에 설탕 데코 */}
//     <Path
//       d="M40 35 Q50 30 60 35"
//       stroke={WHITE}
//       strokeWidth="4"
//       strokeLinecap="round"
//       fill="none"
//       opacity={0.7}
//     />
//   </Svg>
// );

// // 🎈 하트 풍선
// export const HeartBalloon = ({ colorHex = "#FF6B6B" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Path
//       d="M50 72 C50 72 22 52 22 32 C22 19 32 12 42 12 C49 12 50 18 50 18 C50 18 51 18 58 12 C68 12 78 19 78 32 C78 52 50 72 50 72 Z"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />
//     {/* 풍선 매듭 */}
//     <Polygon
//       points="47,70 53,70 50,78"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="3"
//     />
//     {/* 하이라이트 반짝임 */}
//     <Path
//       d="M33 26 L39 32"
//       stroke={WHITE}
//       strokeWidth="4"
//       strokeLinecap="round"
//       opacity={0.6}
//     />
//   </Svg>
// );

// // 👓 하트 안경
// export const HeartGlasses = ({ colorHex = "#9B5DE5" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     {/* 왼쪽 하트 */}
//     <Path
//       d="M32 60 C32 60 12 45 12 30 C12 20 20 15 27 15 C32 15 32 20 32 20 C32 20 32 15 37 15 C44 15 52 20 52 30 C52 45 32 60 32 60 Z"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="3"
//     />
//     {/* 오른쪽 하트 (살짝 겹치게 혹은 나란히) */}
//     <Path
//       d="M68 60 C68 60 48 45 48 30 C48 20 56 15 63 15 C68 15 68 20 68 20 C68 20 68 15 73 15 C80 15 88 20 88 30 C88 45 68 60 68 60 Z"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="3"
//     />
//     {/* 안경테 연결선 */}
//     <Path
//       d="M32 30 L68 30"
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinecap="round"
//     />
//   </Svg>
// );

// // 🍫 하트 초콜릿
// export const HeartChocolate = ({ colorHex = "#7F4F24" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Path
//       d="M50 82 C50 82 20 60 20 38 C20 25 30 18 40 18 C47 18 50 24 50 24 C50 24 53 18 60 18 C70 18 80 25 80 38 C80 60 50 82 50 82 Z"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />
//     {/* 초콜릿 질감 리본 */}
//     <Path
//       d="M35 35 Q50 45 65 35"
//       stroke="#E9D8A6"
//       strokeWidth="6"
//       strokeLinecap="round"
//       fill="none"
//     />
//   </Svg>
// );
// // ⭐ 별 스티커
// export const StarSticker = ({ colorHex = "#FFD166" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Path
//       d="M50 12 L61 38 L89 40 L67 59 L74 86 L50 71 L26 86 L33 59 L11 40 L39 38 Z"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />
//     <Path
//       d="M40 38 L50 25 L60 38"
//       stroke={WHITE}
//       strokeWidth="4"
//       strokeLinecap="round"
//       fill="none"
//       opacity={0.6}
//     />
//   </Svg>
// );

// // 🪄 요술봉
// export const MagicWand = ({ colorHex = "#F72585" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     {/* 막대기 */}
//     <Path
//       d="M30 75 L70 35"
//       stroke="#B08968"
//       strokeWidth="6"
//       strokeLinecap="round"
//     />
//     {/* 상단 별 */}
//     <Path
//       d="M70 20 L76 34 L92 35 L80 46 L84 61 L70 52 L56 61 L60 46 L48 35 L64 34 Z"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />
//   </Svg>
// );

// // 🌊 불가사리
// export const Starfish = ({ colorHex = "#F3722C" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Path
//       d="M50 15 L62 38 L88 38 L67 55 L75 80 L50 67 L25 80 L33 55 L12 38 L38 38 Z"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />
//     {/* 불가사리 무늬 점들 */}
//     <Circle cx="50" cy="45" r="3" fill="#FFFFFF" opacity={0.7} />
//     <Circle cx="43" cy="55" r="2.5" fill="#FFFFFF" opacity={0.7} />
//     <Circle cx="57" cy="55" r="2.5" fill="#FFFFFF" opacity={0.7} />
//   </Svg>
// );

// // 🍬 별사탕
// export const StarCandy = ({ colorHex = "#4CC9F0" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Path
//       d="M50 15 L60 38 L85 40 L65 58 L72 82 L50 68 L28 82 L35 58 L15 40 L40 38 Z"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />
//     {/* 영롱한 반짝임 */}
//     <Path
//       d="M45 35 L55 25"
//       stroke={WHITE}
//       strokeWidth="5"
//       strokeLinecap="round"
//       opacity={0.8}
//     />
//   </Svg>
// );

// // 🌙 밤하늘 별
// export const NightStar = ({ colorHex = "#FFB703" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Path
//       d="M50 12 L61 38 L89 40 L67 59 L74 86 L50 71 L26 86 L33 59 L11 40 L39 38 Z"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />
//     {/* 가운데 작은 눈/미소 */}
//     <Circle cx="45" cy="45" r="3" fill={OUTLINE} />
//     <Circle cx="55" cy="45" r="3" fill={OUTLINE} />
//     <Path
//       d="M47 55 Q50 60 53 55"
//       stroke={OUTLINE}
//       strokeWidth="3"
//       strokeLinecap="round"
//       fill="none"
//     />
//   </Svg>
// );

// // ============================================================
// // 🔵 동그라미 추가 사물들
// // ============================================================

// // 🍩 도넛
// export const Donut = ({ colorHex = DEFAULT_COLOR }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Circle
//       cx="50"
//       cy="51"
//       r="32"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />
//     <Circle
//       cx="50"
//       cy="51"
//       r="12"
//       fill={WHITE}
//       stroke={OUTLINE}
//       strokeWidth="3"
//     />
//     {/* 스프링클 데코 */}
//     <Rect x="32" y="32" width="6" height="3" rx="1.5" fill="#FF6B6B" />
//     <Rect x="60" y="38" width="6" height="3" rx="1.5" fill="#4CC9F0" />
//     <Rect x="42" y="66" width="6" height="3" rx="1.5" fill="#FFD166" />
//   </Svg>
// );

// export const RoundDonut = ({ colorHex = "#F792C0" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Circle
//       cx="50"
//       cy="52"
//       r="32"
//       fill="#E8B47A"
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />
//     <Circle cx="50" cy="52" r="27" fill={colorHex} />
//     <Circle
//       cx="50"
//       cy="52"
//       r="10"
//       fill="#FFF9F0"
//       stroke={OUTLINE}
//       strokeWidth="3"
//     />
//     {/* 스프링클 */}
//     <Line
//       x1="38"
//       y1="34"
//       x2="41"
//       y2="38"
//       stroke={WHITE}
//       strokeWidth="3"
//       strokeLinecap="round"
//     />
//     <Line
//       x1="58"
//       y1="30"
//       x2="60"
//       y2="35"
//       stroke="#4CC9F0"
//       strokeWidth="3"
//       strokeLinecap="round"
//     />
//     <Line
//       x1="68"
//       y1="45"
//       x2="72"
//       y2="48"
//       stroke={WHITE}
//       strokeWidth="3"
//       strokeLinecap="round"
//     />
//     <Line
//       x1="35"
//       y1="60"
//       x2="38"
//       y2="64"
//       stroke="#4CC9F0"
//       strokeWidth="3"
//       strokeLinecap="round"
//     />
//   </Svg>
// );

// // 🍊 귤 / 오렌지
// export const Orange = ({ colorHex = "#F3722C" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Circle
//       cx="50"
//       cy="53"
//       r="31"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />
//     {/* 꼭지 */}
//     <Path
//       d="M47 22 Q50 14 55 22"
//       fill="none"
//       stroke="#43AA8B"
//       strokeWidth="4"
//       strokeLinecap="round"
//     />
//     <Path
//       d="M50 22 Q58 20 54 26"
//       fill="#43AA8B"
//       stroke={OUTLINE}
//       strokeWidth="2"
//     />
//     <Circle cx="40" cy="42" r="5" fill={WHITE} opacity={0.5} />
//   </Svg>
// );

// export const RoundOrange = ({ colorHex = "#FFA630" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Circle
//       cx="50"
//       cy="54"
//       r="30"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />
//     {/* 꼭지 */}
//     <Path
//       d="M50 24 Q47 18 42 16"
//       stroke="#4C9A4C"
//       strokeWidth="4"
//       strokeLinecap="round"
//       fill="none"
//     />
//     {/* 잎사귀 */}
//     <Path
//       d="M42 16 Q50 12 56 18 Q48 22 42 16 Z"
//       fill="#6FCF6F"
//       stroke={OUTLINE}
//       strokeWidth="2.5"
//     />
//     {/* 반짝임 */}
//     <Circle cx="39" cy="43" r="5" fill={WHITE} opacity={0.5} />
//   </Svg>
// );

// // 🍭 사탕 (롤리팝)
// export const Lollipop = ({ colorHex = "#F72585" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Path
//       d="M50 56 L50 82"
//       stroke="#B08968"
//       strokeWidth="6"
//       strokeLinecap="round"
//     />
//     <Circle
//       cx="50"
//       cy="38"
//       r="26"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />
//     {/* 소용돌이 무늬 */}
//     <Path
//       d="M38 30 Q50 38 62 30"
//       fill="none"
//       stroke={WHITE}
//       strokeWidth="5"
//       strokeLinecap="round"
//     />
//     <Path
//       d="M34 44 Q50 52 66 44"
//       fill="none"
//       stroke={WHITE}
//       strokeWidth="5"
//       strokeLinecap="round"
//       opacity={0.8}
//     />
//   </Svg>
// );
// export const RoundLollipop = ({ colorHex = "#FF70A6" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Line
//       x1="50"
//       y1="60"
//       x2="50"
//       y2="88"
//       stroke="#C9A66B"
//       strokeWidth="5"
//       strokeLinecap="round"
//     />
//     <Circle
//       cx="50"
//       cy="38"
//       r="27"
//       fill={WHITE}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />
//     <Path
//       d="M50 38 m-20 0 a20 20 0 0 1 40 0 a14 14 0 0 1 -28 0 a8 8 0 0 1 16 0"
//       stroke={colorHex}
//       strokeWidth="4"
//       fill="none"
//       strokeLinecap="round"
//     />
//   </Svg>
// );

// // ============================================================
// // 🔺 세모 추가 사물들
// // ============================================================

// // 🎄 크리스마스 트리
// export const ChristmasTree = ({ colorHex = "#06D6A0" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     {/* 나무 기둥 */}
//     <Rect
//       x="44"
//       y="74"
//       width="12"
//       height="12"
//       fill="#7F4F24"
//       stroke={OUTLINE}
//       strokeWidth="3"
//     />
//     {/* 세모 겹침 트리 */}
//     <Polygon
//       points="50,15 78,50 22,50"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />
//     <Polygon
//       points="50,35 84,74 16,74"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />
//     {/* 꼭대기 별 */}
//     <Polygon
//       points="50,8 54,16 62,17 56,23 58,31 50,27 42,31 44,23 38,17 46,16"
//       fill="#FFD166"
//       stroke={OUTLINE}
//       strokeWidth="2"
//     />
//   </Svg>
// );

// // ============================================================
// // 🟦 네모 추가 사물들
// // ============================================================

// // ✉️ 편지봉투
// export const Envelope = ({ colorHex = "#FFFCF2" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Rect
//       x="18"
//       y="28"
//       width="64"
//       height="48"
//       rx="6"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />
//     {/* 편지 플랩 (X자 모양 선) */}
//     <Path
//       d="M20 32 L50 56 L80 32"
//       fill="none"
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     {/* 하트 우표 스티커 */}
//     <Circle
//       cx="68"
//       cy="44"
//       r="7"
//       fill="#FF6B6B"
//       stroke={OUTLINE}
//       strokeWidth="2"
//     />
//   </Svg>
// );

// // 🍫 판초콜릿
// export const ChocolateBar = ({ colorHex = "#7F4F24" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Rect
//       x="20"
//       y="22"
//       width="60"
//       height="60"
//       rx="8"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />
//     {/* 초콜릿 조각 격자선 */}
//     <Line x1="20" y1="42" x2="80" y2="42" stroke={OUTLINE} strokeWidth="3" />
//     <Line x1="20" y1="62" x2="80" y2="62" stroke={OUTLINE} strokeWidth="3" />
//     <Line x1="40" y1="22" x2="40" y2="82" stroke={OUTLINE} strokeWidth="3" />
//     <Line x1="60" y1="22" x2="60" y2="82" stroke={OUTLINE} strokeWidth="3" />
//   </Svg>
// );
// export const ChocolateBar2 = ({ colorHex = "#7F4F24" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Rect
//       x="20"
//       y="24"
//       width="60"
//       height="52"
//       rx="6"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />
//     <Line x1="20" y1="50" x2="80" y2="50" stroke="#5A3418" strokeWidth="3" />
//     <Line x1="40" y1="24" x2="40" y2="76" stroke="#5A3418" strokeWidth="3" />
//     <Line x1="60" y1="24" x2="60" y2="76" stroke="#5A3418" strokeWidth="3" />
//     <Path
//       d="M27 32 L35 32"
//       stroke={WHITE}
//       strokeWidth="3"
//       strokeLinecap="round"
//       opacity={0.5}
//     />
//   </Svg>
// );

// // 🧀 치즈 조각 (네모난 슬라이스 치즈)
// export const CheeseSlice = ({ colorHex = "#FFD166" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Rect
//       x="20"
//       y="20"
//       width="60"
//       height="60"
//       rx="8"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />
//     {/* 구멍들 */}
//     <Circle
//       cx="38"
//       cy="38"
//       r="7"
//       fill="#E09F3E"
//       stroke={OUTLINE}
//       strokeWidth="3"
//     />
//     <Circle
//       cx="63"
//       cy="57"
//       r="9"
//       fill="#E09F3E"
//       stroke={OUTLINE}
//       strokeWidth="3"
//     />
//     <Circle
//       cx="60"
//       cy="31"
//       r="5"
//       fill="#E09F3E"
//       stroke={OUTLINE}
//       strokeWidth="2"
//     />
//   </Svg>
// );

// // ============================================================
// // ❤️ 하트 추가 사물들
// // ============================================================

// // 💍 반지 (다이아몬드/하트 보석)
// export const Ring = ({ colorHex = "#FFB5C2" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     {/* 반지 링 */}
//     <Path
//       d="M35 62 Q50 85 65 62"
//       fill="none"
//       stroke="#FFD166"
//       strokeWidth="8"
//       strokeLinecap="round"
//     />
//     <Path
//       d="M35 62 Q50 85 65 62"
//       fill="none"
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinecap="round"
//     />
//     {/* 상단 하트 보석 */}
//     <Path
//       d="M50 56 C50 56 32 42 32 28 C32 19 39 14 46 14 C50 14 50 18 50 18 C50 18 50 14 54 14 C61 14 68 19 68 28 C68 42 50 56 50 56 Z"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="3"
//       strokeLinejoin="round"
//     />
//   </Svg>
// );

// // 🎁 하트 상자
// export const HeartGiftBox = ({ colorHex = "#FF7B9C" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     {/* 아래쪽 상자 */}
//     <Path
//       d="
//         M24 47
//         C24 38 35 34 43 39
//         L50 44
//         L57 39
//         C65 34 76 38 76 47
//         L76 68
//         L50 83
//         L24 68
//         Z
//       "
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />

//     {/* 하트 뚜껑 */}
//     <Path
//       d="
//         M50 48
//         L29 30
//         C20 22 26 12 36 13
//         C43 13 48 18 50 24
//         C52 18 57 13 64 13
//         C74 12 80 22 71 30
//         Z
//       "
//       fill="#FF91AD"
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />

//     {/* 리본 */}
//     <Path d="M46 39 L54 39 L54 76 L46 76 Z" fill="#FFD166" />

//     <Circle
//       cx="50"
//       cy="39"
//       r="5"
//       fill="#F4A62A"
//       stroke={OUTLINE}
//       strokeWidth="2"
//     />

//     {/* 하이라이트 */}
//     <Ellipse
//       cx="33"
//       cy="52"
//       rx="5"
//       ry="2.5"
//       fill={WHITE}
//       opacity={0.4}
//       transform="rotate(-30 33 52)"
//     />
//   </Svg>
// );
// export const HeartBox = ({ colorHex = "#EF476F" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Path
//       d="M50 84 C50 84 16 58 16 34 C16 20 28 12 40 12 C47 12 50 18 50 18 C50 18 53 18 60 12 C72 12 84 20 84 34 C84 58 50 84 50 84 Z"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />
//     {/* 리본 X표시 */}
//     <Path
//       d="M35 25 Q50 45 65 25"
//       fill="none"
//       stroke={WHITE}
//       strokeWidth="5"
//       strokeLinecap="round"
//       opacity={0.8}
//     />
//     <Path
//       d="M50 20 L50 75"
//       fill="none"
//       stroke={WHITE}
//       strokeWidth="5"
//       strokeLinecap="round"
//       opacity={0.8}
//     />
//   </Svg>
// );

// // ============================================================
// // ⭐ 별 추가 사물들
// // ============================================================

// // 🎖️ 메달
// export const Medal = ({ colorHex = "#FFD166" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     {/* 리본 목걸이 */}
//     <Path
//       d="M35 15 L50 42 L65 15"
//       fill="none"
//       stroke="#EF476F"
//       strokeWidth="10"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <Path
//       d="M35 15 L50 42 L65 15"
//       fill="none"
//       stroke={OUTLINE}
//       strokeWidth="3"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     {/* 별 메달 본체 */}
//     <Path
//       d="M50 35 L58 52 L78 54 L63 68 L67 87 L50 78 L33 87 L37 68 L22 54 L42 52 Z"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />
//   </Svg>
// );

// // 🌵 불가사리 요정 (별 모양 요정 머리)
// export const StarCrown = ({ colorHex = "#4CC9F0" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Path
//       d="M50 15 L60 38 L85 41 L66 58 L72 82 L50 69 L28 82 L34 58 L15 41 L40 38 Z"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />
//     {/* 보석 박힌 센터 */}
//     <Circle
//       cx="50"
//       cy="52"
//       r="10"
//       fill={WHITE}
//       stroke={OUTLINE}
//       strokeWidth="3"
//     />
//     <Circle cx="50" cy="52" r="4" fill="#F72585" />
//   </Svg>
// );
// export const Sun = ({ colorHex = "#FFD166" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     {/* 햇살 */}
//     {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
//       <Line
//         key={deg}
//         x1="50"
//         y1="50"
//         x2="50"
//         y2="12"
//         stroke={colorHex}
//         strokeWidth="5"
//         strokeLinecap="round"
//         transform={`rotate(${deg} 50 50)`}
//       />
//     ))}
//     <Circle
//       cx="50"
//       cy="50"
//       r="22"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />
//     {/* 눈 미소 */}
//     <Circle cx="43" cy="47" r="2.5" fill={OUTLINE} />
//     <Circle cx="57" cy="47" r="2.5" fill={OUTLINE} />
//     <Path
//       d="M43 56 Q50 61 57 56"
//       stroke={OUTLINE}
//       strokeWidth="3"
//       strokeLinecap="round"
//       fill="none"
//     />
//   </Svg>
// );
// // 🔴 1. 동그라미 (Circle)
// export const BasicCircle = ({ colorHex = "#FFB5C2" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Circle
//       cx="50"
//       cy="50"
//       r="34"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />
//     {/* 입체감을 주는 귀여운 반짝임 */}
//     <Path
//       d="M34 34 Q40 28 48 30"
//       stroke={WHITE}
//       strokeWidth="4"
//       strokeLinecap="round"
//       fill="none"
//       opacity={0.7}
//     />
//   </Svg>
// );

// // 🔺 2. 세모 (Triangle)
// export const BasicTriangle = ({ colorHex = "#FFD166" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Polygon
//       points="50,15 86,80 14,80"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />
//     {/* 반짝임 */}
//     <Path
//       d="M44 38 L52 28"
//       stroke={WHITE}
//       strokeWidth="4"
//       strokeLinecap="round"
//       opacity={0.7}
//     />
//   </Svg>
// );

// // 🟦 3. 네모 (Square)
// export const BasicSquare = ({ colorHex = "#06D6A0" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Rect
//       x="18"
//       y="18"
//       width="64"
//       height="64"
//       rx="12"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />
//     {/* 반짝임 */}
//     <Path
//       d="M28 28 L38 28"
//       stroke={WHITE}
//       strokeWidth="4"
//       strokeLinecap="round"
//       opacity={0.7}
//     />
//   </Svg>
// );

// // ❤️ 4. 하트 (Heart)
// export const BasicHeart = ({ colorHex = "#FF6B6B" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Path
//       d="M50 82 C50 82 18 60 18 36 C18 23 28 15 39 15 C46 15 50 21 50 21 C50 21 54 15 61 15 C72 15 82 23 82 36 C82 60 50 82 50 82 Z"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />
//     {/* 반짝임 */}
//     <Path
//       d="M31 28 L37 34"
//       stroke={WHITE}
//       strokeWidth="4"
//       strokeLinecap="round"
//       opacity={0.7}
//     />
//   </Svg>
// );

// // ⭐ 5. 별 (Star)
// export const BasicStar = ({ colorHex = "#FFB703" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Path
//       d="M50 12 L61 38 L89 40 L67 59 L74 86 L50 71 L26 86 L33 59 L11 40 L39 38 Z"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />
//     {/* 반짝임 */}
//     <Path
//       d="M42 38 L50 26 L58 38"
//       stroke={WHITE}
//       strokeWidth="4"
//       strokeLinecap="round"
//       fill="none"
//       opacity={0.7}
//     />
//   </Svg>
// );

// export const RoundBalloon = ({ colorHex = "#9B5DE5" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Circle
//       cx="50"
//       cy="45"
//       r="30"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />
//     <Polygon
//       points="47,73 53,73 50,82"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="3"
//     />
//     <Path
//       d="M50 82 Q54 88 50 92"
//       stroke={OUTLINE}
//       strokeWidth="2.5"
//       fill="none"
//     />
//     <Path
//       d="M34 30 Q40 24 47 26"
//       stroke={WHITE}
//       strokeWidth="4"
//       strokeLinecap="round"
//       fill="none"
//       opacity={0.6}
//     />
//   </Svg>
// );

// export const Waffle = ({ colorHex = "#E9B44C" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Rect
//       x="18"
//       y="18"
//       width="64"
//       height="64"
//       rx="8"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />
//     <Line
//       x1="18"
//       y1="34"
//       x2="82"
//       y2="34"
//       stroke={WHITE}
//       strokeWidth="3"
//       opacity={0.6}
//     />
//     <Line
//       x1="18"
//       y1="50"
//       x2="82"
//       y2="50"
//       stroke={WHITE}
//       strokeWidth="3"
//       opacity={0.6}
//     />
//     <Line
//       x1="18"
//       y1="66"
//       x2="82"
//       y2="66"
//       stroke={WHITE}
//       strokeWidth="3"
//       opacity={0.6}
//     />
//     <Line
//       x1="34"
//       y1="18"
//       x2="34"
//       y2="82"
//       stroke={WHITE}
//       strokeWidth="3"
//       opacity={0.6}
//     />
//     <Line
//       x1="50"
//       y1="18"
//       x2="50"
//       y2="82"
//       stroke={WHITE}
//       strokeWidth="3"
//       opacity={0.6}
//     />
//     <Line
//       x1="66"
//       y1="18"
//       x2="66"
//       y2="82"
//       stroke={WHITE}
//       strokeWidth="3"
//       opacity={0.6}
//     />
//   </Svg>
// );
// export const Book = ({ colorHex = "#4CC9F0" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Rect
//       x="20"
//       y="20"
//       width="60"
//       height="60"
//       rx="5"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />
//     <Line x1="50" y1="20" x2="50" y2="80" stroke={OUTLINE} strokeWidth="3" />
//     <Path
//       d="M28 30 Q40 26 50 30"
//       stroke={WHITE}
//       strokeWidth="2.5"
//       fill="none"
//       opacity={0.7}
//     />
//     <Path
//       d="M50 30 Q60 26 72 30"
//       stroke={WHITE}
//       strokeWidth="2.5"
//       fill="none"
//       opacity={0.7}
//     />
//     <Path
//       d="M28 42 Q40 38 50 42"
//       stroke={WHITE}
//       strokeWidth="2.5"
//       fill="none"
//       opacity={0.7}
//     />
//     <Path
//       d="M50 42 Q60 38 72 42"
//       stroke={WHITE}
//       strokeWidth="2.5"
//       fill="none"
//       opacity={0.7}
//     />
//   </Svg>
// );
// export const Envelope2 = ({ colorHex = "#FFD6E8" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Rect
//       x="18"
//       y="28"
//       width="64"
//       height="46"
//       rx="6"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />
//     <Path
//       d="M18 30 L50 56 L82 30"
//       stroke={OUTLINE}
//       strokeWidth="3.5"
//       fill="none"
//       strokeLinejoin="round"
//     />
//   </Svg>
// );
// export const IceCreamCone = ({ colorHex = "#FFB5C2" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Polygon
//       points="50,85 65,45 35,45"
//       fill="#E9B44C"
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />
//     <Line x1="40" y1="52" x2="60" y2="60" stroke="#C9925A" strokeWidth="2" />
//     <Line x1="38" y1="62" x2="58" y2="70" stroke="#C9925A" strokeWidth="2" />
//     <Circle
//       cx="50"
//       cy="30"
//       r="22"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />
//     <Path
//       d="M36 22 Q42 16 50 18"
//       stroke={WHITE}
//       strokeWidth="4"
//       strokeLinecap="round"
//       fill="none"
//       opacity={0.6}
//     />
//   </Svg>
// );
// export const ChristmasTree2 = ({ colorHex = "#2A9D8F" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Polygon
//       points="50,14 68,42 32,42"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="3.5"
//       strokeLinejoin="round"
//     />
//     <Polygon
//       points="50,32 74,64 26,64"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="3.5"
//       strokeLinejoin="round"
//     />
//     <Rect
//       x="44"
//       y="64"
//       width="12"
//       height="16"
//       fill="#8B5A2B"
//       stroke={OUTLINE}
//       strokeWidth="3"
//     />
//     <Circle
//       cx="50"
//       cy="12"
//       r="5"
//       fill="#FFD166"
//       stroke={OUTLINE}
//       strokeWidth="2.5"
//     />
//     <Circle cx="42" cy="50" r="3" fill="#FFD166" />
//     <Circle cx="58" cy="56" r="3" fill="#FF6B6B" />
//   </Svg>
// );

// export const Sandwich = ({ colorHex = "#F4D35E" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Polygon
//       points="50,20 85,80 15,80"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />
//     <Path d="M25 63 L75 63" stroke="#6FCF6F" strokeWidth="6" opacity={0.85} />
//     <Path d="M30 70 L70 70" stroke="#EF476F" strokeWidth="5" opacity={0.85} />
//   </Svg>
// );
// export const TriangleFlag = ({ colorHex = "#EF476F" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Line
//       x1="30"
//       y1="15"
//       x2="30"
//       y2="88"
//       stroke="#8B5A2B"
//       strokeWidth="5"
//       strokeLinecap="round"
//     />
//     <Polygon
//       points="30,20 78,38 30,56"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="3.5"
//       strokeLinejoin="round"
//     />
//   </Svg>
// );

// export const ShootingStar = ({ colorHex = "#4CC9F0" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Path
//       d="M20 75 Q40 60 55 62"
//       stroke={colorHex}
//       strokeWidth="5"
//       strokeLinecap="round"
//       fill="none"
//       opacity={0.6}
//     />
//     <Path
//       d="M60 45 L67 60 L84 62 L71 73 L75 90 L60 81 L45 90 L49 73 L36 62 L53 60 Z"
//       fill="#FFD166"
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />
//   </Svg>
// );
// export const StarCookie = ({ colorHex = "#E9B44C" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Path
//       d="M50 12 L61 38 L89 40 L67 59 L74 86 L50 71 L26 86 L33 59 L11 40 L39 38 Z"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />
//     <Circle cx="45" cy="48" r="3" fill="#7B341E" />
//     <Circle cx="58" cy="42" r="2.5" fill="#7B341E" />
//     <Circle cx="55" cy="62" r="3" fill="#7B341E" />
//   </Svg>
// );

// export const SheriffBadge = ({ colorHex = "#FFD166" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Circle
//       cx="50"
//       cy="50"
//       r="20"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="3.5"
//     />
//     <Path
//       d="M50 8 L58 30 L82 32 L62 47 L69 70 L50 57 L31 70 L38 47 L18 32 L42 30 Z"
//       fill="none"
//       stroke={colorHex}
//       strokeWidth="10"
//       strokeLinejoin="round"
//     />
//     <Path
//       d="M50 8 L58 30 L82 32 L62 47 L69 70 L50 57 L31 70 L38 47 L18 32 L42 30 Z"
//       fill="none"
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />
//   </Svg>
// );

// // ============================================================
// // 🎯 itemId → SVG 컴포넌트
// // ============================================================

// export const SHAPE_ITEM_SVGS = {
//   ball: Ball,
//   wheel: Wheel,
//   clock: Clock,
//   plate: Plate,
//   cookie: Cookie,
//   button: Button,
//   fullMoon: FullMoon,
//   // ⭐ 새로 추가된 동그라미 사물들
//   donut: Donut,
//   roundDonut: RoundDonut,
//   orange: Orange,
//   roundOrange: RoundOrange,
//   lollipop: Lollipop,
//   sun: Sun,
//   roundBalloon: RoundBalloon,
//   roundLollipop: RoundLollipop,

//   box: Box,
//   block: Block,
//   window: Window,
//   bread: Bread,
//   frame: Frame,
//   giftBox: GiftBox,
//   tile: Tile,
//   // ⭐ 새로 추가된 네모 사물들
//   envelope: Envelope,
//   envelope2: Envelope2,
//   chocolateBar: ChocolateBar,
//   chocolateBar2: ChocolateBar2,
//   cheeseSlice: CheeseSlice,
//   waffle: Waffle,
//   book: Book,

//   triangleRiceBall: TriangleRiceBall,
//   cakeSlice: CakeSlice,
//   roof: Roof,
//   pizzaSlice: PizzaSlice,
//   mountain: Mountain,
//   partyHat: PartyHat,
//   // ⭐ 새로 추가된 세모 사물들
//   christmasTree: ChristmasTree,
//   christmasTree2: ChristmasTree2,
//   watermelonSlice: WatermelonSlice,
//   tent: Tent,
//   iceCreamCone: IceCreamCone,
//   sandwich: Sandwich,
//   triangleFlag: TriangleFlag,

//   heartCookie: HeartCookie,
//   heartBalloon: HeartBalloon,
//   heartGlasses: HeartGlasses,
//   heartChocolate: HeartChocolate,
//   // ⭐ 새로 추가된 하트 사물들
//   ring: Ring,
//   heartBox: HeartBox,
//   heartLollipop: HeartLollipop,
//   heartEnvelope: HeartEnvelope,
//   heartBadge: HeartBadge,

//   starSticker: StarSticker,
//   magicWand: MagicWand,
//   starfish: Starfish,
//   starCandy: StarCandy,
//   nightStar: NightStar,
//   // ⭐ 새로 추가된 별 사물들
//   medal: Medal,
//   starCrown: StarCrown,
//   shootingStar: ShootingStar,
//   starCookie: StarCookie,
//   starBalloon: StarBalloon,
//   sheriffBadge: SheriffBadge,

//   basiccircle: BasicCircle,
//   basictriangle: BasicTriangle,
//   basicsquare: BasicSquare,
//   basicheart: BasicHeart,
//   basicstar: BasicStar,
// } as const;

// export const RenderBasicShapeSvg = ({
//   shapeId,
//   colorHex,
// }: ItemSvgProps & { shapeId?: string }) => {
//   const renderId = shapeId ? `basic${shapeId}` : undefined;

//   const ShapeComponent = renderId
//     ? SHAPE_ITEM_SVGS[renderId as keyof typeof SHAPE_ITEM_SVGS]
//     : undefined;

//   if (!ShapeComponent) {
//     return null;
//   }

//   return <ShapeComponent colorHex={colorHex} />;
// };

// export const RenderShapeItemSvg = ({
//   itemId,
//   colorHex,
// }: ItemSvgProps & { itemId?: string }) => {
//   const ItemComponent = itemId
//     ? SHAPE_ITEM_SVGS[itemId as keyof typeof SHAPE_ITEM_SVGS]
//     : undefined;

//   // 등록된 SVG가 없으면 귀여운 기본 아이콘
//   if (!ItemComponent) {
//     return (
//       <Svg width="100" height="100" viewBox="0 0 100 100">
//         <Circle
//           cx="50"
//           cy="50"
//           r="30"
//           fill={colorHex ?? DEFAULT_COLOR}
//           stroke={OUTLINE}
//           strokeWidth="3"
//         />

//         {/* 눈 */}
//         <Circle cx="40" cy="45" r="4" fill={WHITE} />
//         <Circle cx="60" cy="45" r="4" fill={WHITE} />

//         <Circle cx="40" cy="45" r="2" fill={DARK} />
//         <Circle cx="60" cy="45" r="2" fill={DARK} />

//         {/* 입 */}
//         <Path
//           d="M40 60 Q50 70 60 60"
//           stroke={DARK}
//           strokeWidth="3"
//           fill="none"
//           strokeLinecap="round"
//         />
//       </Svg>
//     );
//   }

//   return <ItemComponent colorHex={colorHex} />;
// };

import React from "react";

import Svg, {
  Circle,
  Path,
  Rect,
  Polygon,
  Line,
  Ellipse,
} from "react-native-svg";

interface ItemSvgProps {
  colorHex?: string;
}
const COLOR_HEX_MAP: Record<string, string> = {
  red: "#F44336",
  blue: "#42A5F5",
  yellow: "#FFD166",
  green: "#66BB6A",
  black: "#333333",
  white: "#FFFFFF",
};
const OUTLINE = "#5B4B4B";
const WHITE = "#FFFFFF";
const DARK = "#3D3333";

const DEFAULT_COLOR = "#FFD166";

// ============================================================
// CIRCLE
// ============================================================

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
export const TennisBall = ({ colorHex = "#D4E157" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Circle
      cx="50"
      cy="55"
      r="23"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 흰색 곡선 무늬 (좌) - 공 테두리 안쪽으로 조정 */}
    <Path
      d="M31 43 Q45 55 31 67"
      fill="none"
      stroke={WHITE}
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    {/* 흰색 곡선 무늬 (우) - 공 테두리 안쪽으로 조정 */}
    <Path
      d="M69 43 Q55 55 69 67"
      fill="none"
      stroke={WHITE}
      strokeWidth="3.5"
      strokeLinecap="round"
    />

    <Ellipse
      cx="40"
      cy="43"
      rx="5"
      ry="2.5"
      fill={WHITE}
      opacity={0.55}
      transform="rotate(-30 40 43)"
    />
  </Svg>
);
export const Baseball = ({ colorHex = "#FFF8EC" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Circle
      cx="50"
      cy="55"
      r="24"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 빨간 실밥 곡선 (좌) */}
    <Path
      d="M31 37 Q42 55 31 73"
      fill="none"
      stroke="#E4463D"
      strokeWidth="2.5"
    />
    {/* 빨간 실밥 곡선 (우) */}
    <Path
      d="M69 37 Q58 55 69 73"
      fill="none"
      stroke="#E4463D"
      strokeWidth="2.5"
    />

    {/* 왼쪽 실밥 땀 */}
    <Line
      x1="29"
      y1="41"
      x2="35"
      y2="39"
      stroke="#E4463D"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <Line
      x1="34"
      y1="49"
      x2="40"
      y2="47"
      stroke="#E4463D"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <Line
      x1="36"
      y1="55"
      x2="42"
      y2="55"
      stroke="#E4463D"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <Line
      x1="34"
      y1="61"
      x2="40"
      y2="63"
      stroke="#E4463D"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <Line
      x1="29"
      y1="69"
      x2="35"
      y2="71"
      stroke="#E4463D"
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    {/* 오른쪽 실밥 땀 */}
    <Line
      x1="71"
      y1="41"
      x2="65"
      y2="39"
      stroke="#E4463D"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <Line
      x1="66"
      y1="49"
      x2="60"
      y2="47"
      stroke="#E4463D"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <Line
      x1="64"
      y1="55"
      x2="58"
      y2="55"
      stroke="#E4463D"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <Line
      x1="66"
      y1="61"
      x2="60"
      y2="63"
      stroke="#E4463D"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <Line
      x1="71"
      y1="69"
      x2="65"
      y2="71"
      stroke="#E4463D"
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    <Ellipse
      cx="41"
      cy="43"
      rx="5"
      ry="2.5"
      fill={WHITE}
      opacity={0.5}
      transform="rotate(-30 41 43)"
    />
  </Svg>
);
export const Basketball = ({ colorHex = "#F0813C" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Circle
      cx="50"
      cy="53"
      r="31"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 세로 중앙선 */}
    <Line
      x1="50"
      y1="22"
      x2="50"
      y2="84"
      stroke="#3A2A20"
      strokeWidth="3"
      strokeLinecap="round"
    />

    {/* 가로 중앙선 */}
    <Path
      d="M19 53 Q50 46 81 53"
      fill="none"
      stroke="#3A2A20"
      strokeWidth="3"
      strokeLinecap="round"
    />

    {/* 좌측 곡선 (상하 범위를 안쪽으로 줄임) */}
    <Path
      d="M29 32 Q40 53 29 74"
      fill="none"
      stroke="#3A2A20"
      strokeWidth="3"
      strokeLinecap="round"
    />

    {/* 우측 곡선 (상하 범위를 안쪽으로 줄임) */}
    <Path
      d="M71 32 Q60 53 71 74"
      fill="none"
      stroke="#3A2A20"
      strokeWidth="3"
      strokeLinecap="round"
    />
    {/* 반짝임 */}
    <Ellipse
      cx="38"
      cy="38"
      rx="6"
      ry="3"
      fill={WHITE}
      opacity={0.4}
      transform="rotate(-30 38 38)"
    />
  </Svg>
);
export const Tomato = ({ colorHex = "#F44336" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Circle
      cx="50"
      cy="55"
      r="30"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Path
      d="M50 28 L44 20 L48 30 L36 26 L44 35 L50 31 L56 35 L64 26 L52 30 L56 20 Z"
      fill="#4CAF50"
      stroke="#3E7F3E"
      strokeWidth="2"
    />

    <Ellipse
      cx="39"
      cy="43"
      rx="6"
      ry="3"
      fill={WHITE}
      opacity={0.35}
      transform="rotate(-30 39 43)"
    />
  </Svg>
);

// ------------------------------------------------------------

export const Watermelon = ({ colorHex = "#43A047" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Circle
      cx="50"
      cy="50"
      r="31"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Path
      d="M34 25 Q27 50 34 75"
      fill="none"
      stroke="#1B7A35"
      strokeWidth="7"
      strokeLinecap="round"
    />

    <Path
      d="M50 20 Q44 50 50 80"
      fill="none"
      stroke="#1B7A35"
      strokeWidth="7"
      strokeLinecap="round"
    />

    <Path
      d="M66 25 Q73 50 66 75"
      fill="none"
      stroke="#1B7A35"
      strokeWidth="7"
      strokeLinecap="round"
    />

    <Ellipse cx="38" cy="35" rx="6" ry="3" fill={WHITE} opacity={0.3} />
  </Svg>
);

// ------------------------------------------------------------

export const Cookie = ({ colorHex = "#D99A52" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Circle
      cx="50"
      cy="50"
      r="31"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Circle cx="35" cy="37" r="4" fill="#754421" />
    <Circle cx="58" cy="34" r="4" fill="#754421" />
    <Circle cx="68" cy="51" r="4" fill="#754421" />
    <Circle cx="43" cy="55" r="4" fill="#754421" />
    <Circle cx="31" cy="64" r="4" fill="#754421" />
    <Circle cx="57" cy="68" r="4" fill="#754421" />

    <Ellipse cx="38" cy="28" rx="7" ry="3" fill={WHITE} opacity={0.25} />
  </Svg>
);

// ------------------------------------------------------------

export const Donut = ({ colorHex = "#F48FB1" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Circle
      cx="50"
      cy="50"
      r="32"
      fill="#D89B57"
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Circle cx="50" cy="48" r="27" fill={colorHex} />

    <Circle
      cx="50"
      cy="50"
      r="10"
      fill="#FFF3D6"
      stroke="#C27E3C"
      strokeWidth="3"
    />

    <Circle cx="35" cy="38" r="2.5" fill="#4D96FF" />
    <Circle cx="57" cy="34" r="2.5" fill="#FFD166" />
    <Circle cx="67" cy="50" r="2.5" fill="#4CAF50" />
    <Circle cx="34" cy="55" r="2.5" fill="#F44336" />
    <Circle cx="57" cy="65" r="2.5" fill="#9C6ADE" />
  </Svg>
);

// ------------------------------------------------------------

export const Button = ({ colorHex = "#4D96FF" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Circle
      cx="50"
      cy="50"
      r="31"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Circle
      cx="50"
      cy="50"
      r="25"
      fill="none"
      stroke={WHITE}
      strokeWidth="2"
      opacity={0.3}
    />

    <Circle cx="39" cy="39" r="5" fill={WHITE} />
    <Circle cx="61" cy="39" r="5" fill={WHITE} />
    <Circle cx="39" cy="61" r="5" fill={WHITE} />
    <Circle cx="61" cy="61" r="5" fill={WHITE} />
  </Svg>
);

// ------------------------------------------------------------

export const CircleClock = ({ colorHex = "#F25C54" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Circle
      cx="50"
      cy="50"
      r="32"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Circle cx="50" cy="50" r="26" fill={WHITE} />

    <Line
      x1="50"
      y1="50"
      x2="50"
      y2="34"
      stroke={DARK}
      strokeWidth="4"
      strokeLinecap="round"
    />

    <Line
      x1="50"
      y1="50"
      x2="64"
      y2="42"
      stroke={DARK}
      strokeWidth="4"
      strokeLinecap="round"
    />

    <Circle cx="50" cy="50" r="4" fill="#FF9F43" />
  </Svg>
);

// ------------------------------------------------------------

export const Wheel = ({ colorHex = "#343A40" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Circle
      cx="50"
      cy="50"
      r="32"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Circle cx="50" cy="50" r="23" fill="#AEB6BC" />

    <Line x1="50" y1="29" x2="50" y2="71" stroke="#687178" strokeWidth="6" />

    <Line x1="29" y1="50" x2="71" y2="50" stroke="#687178" strokeWidth="6" />

    <Circle
      cx="50"
      cy="50"
      r="7"
      fill="#E9ECEF"
      stroke="#687178"
      strokeWidth="3"
    />
  </Svg>
);

// ============================================================
// SQUARE
// ============================================================

// export const Book = ({ colorHex = "#F45B55" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Rect
//       x="22"
//       y="15"
//       width="56"
//       height="70"
//       rx="5"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />

//     <Rect x="31" y="27" width="30" height="20" rx="2" fill={WHITE} />

//     <Line x1="30" y1="60" x2="69" y2="60" stroke={WHITE} strokeWidth="4" />

//     <Line x1="30" y1="69" x2="62" y2="69" stroke={WHITE} strokeWidth="4" />
//   </Svg>
// );
export const Book = ({ colorHex = "#F45B55" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 페이지 옆면 (살짝 보이게) */}
    <Line x1="78" y1="20" x2="78" y2="80" stroke="#E3D3B0" strokeWidth="1.5" />
    <Line x1="76" y1="18" x2="76" y2="82" stroke="#E3D3B0" strokeWidth="1.5" />
    <Line x1="74" y1="16" x2="74" y2="84" stroke="#E3D3B0" strokeWidth="1.5" />

    {/* 표지 */}
    <Rect
      x="20"
      y="14"
      width="54"
      height="72"
      rx="5"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 책등 라인 */}
    <Line
      x1="30"
      y1="14"
      x2="30"
      y2="86"
      stroke={OUTLINE}
      strokeWidth="3"
      opacity={0.35}
    />

    {/* 제목/텍스트 라인 */}
    <Rect
      x="38"
      y="30"
      width="26"
      height="6"
      rx="3"
      fill={WHITE}
      opacity={0.9}
    />
    <Line
      x1="38"
      y1="48"
      x2="66"
      y2="48"
      stroke={WHITE}
      strokeWidth="3"
      opacity={0.8}
    />
    <Line
      x1="38"
      y1="56"
      x2="58"
      y2="56"
      stroke={WHITE}
      strokeWidth="3"
      opacity={0.8}
    />

    {/* 책갈피 리본 */}
    <Path
      d="M41 14 L41 36 L35 30 L29 36 L29 14 Z"
      fill="#FFD166"
      stroke={OUTLINE}
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </Svg>
);
// ------------------------------------------------------------

export const Window = ({ colorHex = "#A8733E" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Rect
      x="18"
      y="18"
      width="64"
      height="64"
      rx="4"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Rect x="26" y="26" width="48" height="48" fill="#9EDCFF" />

    <Line x1="50" y1="26" x2="50" y2="74" stroke={WHITE} strokeWidth="5" />

    <Line x1="26" y1="50" x2="74" y2="50" stroke={WHITE} strokeWidth="5" />
  </Svg>
);

// ------------------------------------------------------------

export const Calendar = ({ colorHex = "#FF665E" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Rect
      x="18"
      y="20"
      width="64"
      height="62"
      rx="7"
      fill={WHITE}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Rect x="18" y="20" width="64" height="18" rx="7" fill={colorHex} />

    <Line
      x1="34"
      y1="14"
      x2="34"
      y2="28"
      stroke={OUTLINE}
      strokeWidth="5"
      strokeLinecap="round"
    />

    <Line
      x1="66"
      y1="14"
      x2="66"
      y2="28"
      stroke={OUTLINE}
      strokeWidth="5"
      strokeLinecap="round"
    />

    <Circle cx="31" cy="49" r="3" fill="#D8CEC3" />
    <Circle cx="50" cy="49" r="3" fill="#D8CEC3" />
    <Circle cx="69" cy="49" r="3" fill="#D8CEC3" />

    <Circle cx="31" cy="62" r="3" fill="#D8CEC3" />
    <Circle cx="50" cy="62" r="3" fill="#D8CEC3" />
    <Circle cx="69" cy="62" r="3" fill="#D8CEC3" />

    <Circle cx="31" cy="75" r="3" fill="#D8CEC3" />
    <Circle cx="50" cy="75" r="3" fill="#D8CEC3" />
    <Circle cx="69" cy="75" r="3" fill="#D8CEC3" />
  </Svg>
);

// ------------------------------------------------------------

export const Microwave = ({ colorHex = "#C9D0D5" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Rect
      x="12"
      y="25"
      width="76"
      height="52"
      rx="7"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Rect x="20" y="34" width="45" height="34" rx="3" fill="#46515A" />

    <Path d="M25 59 L48 37" stroke={WHITE} strokeWidth="5" opacity={0.12} />

    <Circle cx="76" cy="42" r="5" fill="#707A82" />
    <Circle cx="76" cy="57" r="5" fill="#707A82" />
  </Svg>
);

// ------------------------------------------------------------

// export const Pillow = ({ colorHex = "#8CC8FF" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Path
//       d="
//         M25 25
//         C35 31 65 31 75 25
//         C69 36 69 64 75 75
//         C65 69 35 69 25 75
//         C31 64 31 36 25 25
//         Z
//       "
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />

//     <Path
//       d="M35 35 Q50 42 65 35"
//       fill="none"
//       stroke={WHITE}
//       strokeWidth="3"
//       opacity={0.3}
//     />
//   </Svg>
// );
export const Pillow = ({ colorHex = "#8CC8FF" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Rect
      x="20"
      y="20"
      width="60"
      height="60"
      rx="16"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 코너 주름 */}
    <Path
      d="M20 30 Q28 30 28 20"
      fill="none"
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinecap="round"
      opacity={0.5}
    />
    <Path
      d="M80 30 Q72 30 72 20"
      fill="none"
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinecap="round"
      opacity={0.5}
    />
    <Path
      d="M20 70 Q28 70 28 80"
      fill="none"
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinecap="round"
      opacity={0.5}
    />
    <Path
      d="M80 70 Q72 70 72 80"
      fill="none"
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinecap="round"
      opacity={0.5}
    />

    {/* 안쪽 시접선 */}
    <Rect
      x="30"
      y="30"
      width="40"
      height="40"
      rx="10"
      fill="none"
      stroke={WHITE}
      strokeWidth="2.5"
      strokeDasharray="4 4"
      opacity={0.6}
    />

    {/* 가운데 단추 */}
    <Path
      d="M46 46 H54 V54 H46 Z"
      fill={WHITE}
      opacity={0.85}
      stroke={OUTLINE}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* <Circle
      cx="50"
      cy="50"
      r="4"
      fill={WHITE}
      opacity={0.85}
      stroke={OUTLINE}
      strokeWidth="1.5"
    /> */}
  </Svg>
);
// ------------------------------------------------------------

export const Tv = ({ colorHex = "#555E68" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Rect
      x="13"
      y="20"
      width="74"
      height="51"
      rx="5"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Rect x="20" y="27" width="60" height="37" rx="2" fill="#303941" />

    <Line x1="50" y1="71" x2="50" y2="80" stroke={OUTLINE} strokeWidth="5" />

    <Line
      x1="35"
      y1="82"
      x2="65"
      y2="82"
      stroke={OUTLINE}
      strokeWidth="5"
      strokeLinecap="round"
    />
  </Svg>
);

// ------------------------------------------------------------

export const GiftBox = ({ colorHex = "#FFD43B" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Rect
      x="20"
      y="35"
      width="60"
      height="48"
      rx="4"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Rect
      x="15"
      y="28"
      width="70"
      height="16"
      rx="4"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Rect x="45" y="29" width="10" height="54" fill="#F04F5F" />

    <Path d="M50 28 C38 18 29 20 31 28 C33 35 43 33 50 28" fill="#F04F5F" />

    <Path d="M50 28 C62 18 71 20 69 28 C67 35 57 33 50 28" fill="#F04F5F" />
  </Svg>
);

// ------------------------------------------------------------

export const SquareClock = ({ colorHex = "#4D96FF" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Rect
      x="17"
      y="17"
      width="66"
      height="66"
      rx="9"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Rect x="25" y="25" width="50" height="50" rx="6" fill={WHITE} />

    <Line
      x1="50"
      y1="50"
      x2="50"
      y2="34"
      stroke={DARK}
      strokeWidth="4"
      strokeLinecap="round"
    />

    <Line
      x1="50"
      y1="50"
      x2="63"
      y2="58"
      stroke={DARK}
      strokeWidth="4"
      strokeLinecap="round"
    />

    <Circle cx="50" cy="50" r="4" fill="#FF9F43" />
  </Svg>
);

// ============================================================
// TRIANGLE
// ============================================================

// // 🍉 수박 조각
export const WatermelonSlice = ({ colorHex = "#EF476F" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 수박 껍질 (바깥 세모) */}
    {/* <Polygon
      points="50,15 90,80 10,80"
      fill="#06D6A0"
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLi
      nejoin="round"
    /> */}
    <Rect
      x="19.5" // 왼쪽 시작
      y="70" // 위쪽 시작 (높이를 10으로 잡아서 80까지 오게 함)
      width="60" // 너비 (90 - 10)
      height="12" // 높이 (80 - 70)
      fill="#06D6A0"
      stroke={OUTLINE}
      strokeWidth="4"
      rx="5" // 살짝 둥근 모서리 (옵션)
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
// // 🍕 피자 한 조각
// export const PizzaSlice = ({ colorHex = "#FFD166" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Polygon
//       points="50,15 85,85 20,70"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />
//     {/* 페퍼로니 토핑 */}
//     <Circle
//       cx="50"
//       cy="50"
//       r="8"
//       fill="#EF476F"
//       stroke={OUTLINE}
//       strokeWidth="3"
//     />
//     <Circle
//       cx="40"
//       cy="70"
//       r="6"
//       fill="#EF476F"
//       stroke={OUTLINE}
//       strokeWidth="3"
//     />
//   </Svg>
// );
export const PizzaSlice = ({ colorHex = "#FFC93C" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 크러스트 (도우 끝단, 살짝 볼록하게) */}
    <Path
      d="M17 68 Q19 79 24 80 L76 80 Q81 79 83 68 Q50 74 17 68 Z"
      fill="#E8A857"
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 크러스트 기포 (구멍) */}
    <Circle cx="30" cy="73" r="2" fill="#C98A3E" opacity={0.6} />
    <Circle cx="45" cy="76" r="2" fill="#C98A3E" opacity={0.6} />
    <Circle cx="60" cy="75" r="2" fill="#C98A3E" opacity={0.6} />
    <Circle cx="72" cy="72" r="2" fill="#C98A3E" opacity={0.6} />

    {/* 피자 몸통 (치즈+도우) */}
    <Polygon
      points="50,20 81,70 19,70"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    />

    {/* 치즈 광택 */}
    <Path d="M50 26 L74 66 L26 66 Z" fill="#FFE380" opacity={0.4} />

    {/* 페퍼로니 */}
    {/* <Circle
      cx="50"
      cy="42"
      r="6.5"
      fill="#E4463D"
      stroke={OUTLINE}
      strokeWidth="1.5"
    />
    <Circle
      cx="38"
      cy="55"
      r="6"
      fill="#E4463D"
      stroke={OUTLINE}
      strokeWidth="1.5"
    />
    <Circle
      cx="62"
      cy="55"
      r="6"
      fill="#E4463D"
      stroke={OUTLINE}
      strokeWidth="1.5"
    /> */}

    {/* 페퍼로니 질감 점 */}
    <Polygon points="48,38 53,44 43,44" fill="#B8342C" strokeLinejoin="round" />
    <Polygon points="52,42 57,48 47,48" fill="#B8342C" strokeLinejoin="round" />
    <Polygon points="36,51 41,57 31,57" fill="#B8342C" strokeLinejoin="round" />
    <Polygon points="64,55 69,61 59,61" fill="#B8342C" strokeLinejoin="round" />
    {/* <Circle cx="48" cy="40" r="1" fill="#B8342C" />
    <Circle cx="52" cy="44" r="1" fill="#B8342C" />
    <Circle cx="36" cy="53" r="1" fill="#B8342C" />
    <Circle cx="64" cy="57" r="1" fill="#B8342C" /> */}

    {/* 피망(초록) 조각 */}
    <Path d="M42 60 Q45 56 48 60 Q45 63 42 60 Z" fill="#4CAF50" />
    <Path d="M58 48 Q61 44 64 48 Q61 51 58 48 Z" fill="#4CAF50" />

    {/* 반짝임 */}
    <Ellipse
      cx="42"
      cy="33"
      rx="5"
      ry="2.5"
      fill={WHITE}
      opacity={0.5}
      transform="rotate(-25 42 33)"
    />
  </Svg>
);
export const TriangleInstrument = ({ colorHex = "#B8C0C8" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Polygon
      points="50,16 18,76 82,76"
      fill="none"
      stroke={colorHex}
      strokeWidth="8"
      strokeLinejoin="round"
    />

    <Line
      x1="50"
      y1="65"
      x2="61"
      y2="85"
      stroke="#E5A13B"
      strokeWidth="5"
      strokeLinecap="round"
    />

    <Circle cx="50" cy="16" r="5" fill="#FFD166" />
  </Svg>
);

// ------------------------------------------------------------

export const PartyHat = ({ colorHex = "#4D96FF" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Polygon
      points="50,14 20,78 80,78"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* <Circle cx="50" cy="14" r="7" fill="#FFD166" />
<Circle cx="42" cy="42" r="4" fill={WHITE} />
<Circle cx="59" cy="55" r="4" fill="#FFD166" />
<Circle cx="37" cy="64" r="4" fill="#FF6B8A" /> */}
    <Polygon points="50,6 42,20 58,20" fill="#FFD166" />

    {/* 2번 삼각형 (기존 cx="42" cy="42" r="4" 대체) */}
    <Polygon points="42,37 37,47 47,47" fill={WHITE} />

    {/* 3번 삼각형 (기존 cx="59" cy="55" r="4" 대체) */}
    <Polygon points="59,50 54,60 64,60" fill="#FFD166" />

    {/* 4번 삼각형 (기존 cx="37" cy="64" r="4" 대체) */}
    <Polygon points="37,59 32,69 42,69" fill="#FFD166" />

    <Path
      d="M25 78 Q50 120 75 78"
      fill="none"
      stroke="#FF6B8A"
      strokeWidth="5"
      strokeLinecap="round"
    />
  </Svg>
);

// ------------------------------------------------------------

export const ChristmasTree = ({ colorHex = "#38A852" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Rect x="44" y="69" width="12" height="18" fill="#8D5A32" />
    <Polygon
      points="50,31 19,73 81,73"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />

    <Polygon
      points="50,16 28,52 72,52"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
    />

    {/* <Circle cx="37" cy="49" r="4" fill="#FF5B5B" />
    <Circle cx="62" cy="43" r="4" fill="#FFD166" />
    <Circle cx="47" cy="62" r="4" fill="#4D96FF" />
    <Circle cx="67" cy="63" r="4" fill="#FF6B8A" /> */}
    {/* <Polygon
      points="50,8 54,17 64,18 56,25 58,35 50,29 42,35 44,25 36,18 46,17"
      fill="#FFD166"
    /> */}
    <Polygon points="37,44 32,53 42,53" fill="#FF5B5B" />

    {/* 2번 삼각형 (기존 cx="62" cy="43" r="4") */}
    <Polygon points="62,38 57,47 67,47" fill="#FFD166" />

    {/* 3번 삼각형 (기존 cx="47" cy="62" r="4") */}
    <Polygon points="47,57 42,66 52,66" fill="#4D96FF" />

    {/* 4번 삼각형 (기존 cx="67" cy="63" r="4") */}
    <Polygon points="67,58 62,67 72,67" fill="#FF6B8A" />
  </Svg>
);

// ------------------------------------------------------------

export const Flag = ({ colorHex = "#F44336" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Line
      x1="27"
      y1="14"
      x2="27"
      y2="87"
      stroke="#8D5A32"
      strokeWidth="6"
      strokeLinecap="round"
    />

    <Polygon
      points="30,18 79,34 30,51"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    />
  </Svg>
);

// ------------------------------------------------------------

// export const Sandwich = ({ colorHex = "#F4D18A" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Polygon
//       points="50,17 17,65 83,65"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />

//     <Polygon points="20,64 80,64 73,73 27,73" fill="#57B957" />

//     <Polygon points="27,72 73,72 66,81 34,81" fill="#F15A4A" />

//     <Polygon points="34,80 66,80 59,87 41,87" fill="#FFD166" />
//   </Svg>
// );
// export const Sandwich = ({ colorHex = "#F4D18A" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Polygon
//       points="50,17 17,65 83,65"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />

//     {/* 속재료 - 삼각형 안쪽에 층층이 */}
//     <Polygon points="36,38 64,38 69,44 31,44" fill="#7ED957" />
//     <Polygon points="30,46 70,46 74,52 26,52" fill="#F15A4A" />
//     <Polygon points="25,54 75,54 80,60 20,60" fill="#FFD166" />
//   </Svg>
// );

export const TriangleSandwich = ({ colorHex = "#F4C27A" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 아래 빵 */}
    <Path
      d="M18 68 L50 27 L82 68 Z"
      fill="#D99A4E"
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 치즈 */}
    <Path
      d="M23 60 L50 37 L77 60 L72 66 L50 49 L28 66 Z"
      fill="#FFD166"
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    />

    {/* 양상추 */}
    <Path
      d="
        M25 56
        L50 35
        L75 56
        L70 62
        C65 58 61 64 56 60
        C51 57 48 63 43 59
        C38 55 34 62 29 60
        Z
      "
      fill="#72C968"
      stroke="#4F9148"
      strokeWidth="3"
      strokeLinejoin="round"
    />

    {/* 토마토 */}
    <Path
      d="M29 51 L50 34 L71 51 L68 57 L50 43 L32 57 Z"
      fill="#F05A47"
      stroke="#B83B3B"
      strokeWidth="3"
      strokeLinejoin="round"
    />

    {/* 위쪽 빵 */}
    <Path
      d="M18 59 L50 18 L82 59 L50 42 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 빵 하이라이트 */}
    <Path
      d="M38 36 L43 29"
      stroke={WHITE}
      strokeWidth="3"
      strokeLinecap="round"
      opacity={0.45}
    />
  </Svg>
);
export const Sandwich = ({ colorHex = "#F4C27A" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 아래쪽 빵 */}
    <Path
      d="M20 59 L50 75 L80 59 L80 69 L50 86 L20 69 Z"
      fill="#D99A4E"
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 치즈 */}
    <Path
      d="M22 52 L50 67 L78 52 L78 59 L50 74 L22 59 Z"
      fill="#FFD166"
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    />

    {/* 양상추 */}
    <Path
      d="
        M21 47
        C27 43 31 51 37 47
        C43 43 47 51 53 47
        C59 43 63 51 69 47
        C74 44 77 47 79 50
        L50 66
        L21 50 Z
      "
      fill="#7BC96F"
      stroke="#4F9148"
      strokeWidth="3"
      strokeLinejoin="round"
    />

    {/* 토마토 */}
    <Path
      d="M26 43 L50 56 L74 43 L74 49 L50 63 L26 49 Z"
      fill="#F05A47"
      stroke="#B83B3B"
      strokeWidth="3"
      strokeLinejoin="round"
    />

    {/* 위쪽 빵 */}
    <Path
      d="
        M20 42
        L50 25
        L80 42
        L50 59
        Z
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 빵 하이라이트 */}
    <Ellipse
      cx="39"
      cy="35"
      rx="7"
      ry="2.5"
      fill={WHITE}
      opacity={0.4}
      transform="rotate(-28 39 35)"
    />
  </Svg>
);
// ------------------------------------------------------------
// // ⛺ 텐트
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

// export const TriangleKimbap = ({ colorHex = "#22272B" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Polygon
//       points="50,15 17,80 83,80"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />

//     <Polygon points="50,28 29,69 71,69" fill="#FFF9F0" />

//     <Circle cx="50" cy="52" r="7" fill="#FFD166" />
//     <Circle cx="43" cy="58" r="5" fill="#F15B5B" />
//     <Circle cx="57" cy="58" r="5" fill="#65B95B" />
//   </Svg>
// );
export const TriangleKimbap = ({ colorHex = "#22272B" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Polygon
      points="50,15 17,80 83,80"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    <Polygon
      points="50,26 26,73 74,73"
      fill="#FFF9F0"
      stroke={OUTLINE}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* 노란색 삼각형 (기존 cx="50" cy="54" r="6") */}
    <Path d="M50 47 L56 59 L44 59 Z" fill="#FFD166" strokeLinejoin="round" />

    {/* 빨간색 삼각형 (기존 cx="41" cy="61" r="4.5") */}
    <Path
      d="M41 55.5 L45.5 65.5 L36.5 65.5 Z"
      fill="#F15B5B"
      strokeLinejoin="round"
    />

    {/* 초록색 삼각형 (기존 cx="59" cy="61" r="4.5") */}
    <Path
      d="M59 55.5 L63.5 65.5 L54.5 65.5 Z"
      fill="#65B95B"
      strokeLinejoin="round"
    />
    {/* <Circle cx="50" cy="54" r="6" fill="#FFD166" />
    <Circle cx="41" cy="61" r="4.5" fill="#F15B5B" />
    <Circle cx="59" cy="61" r="4.5" fill="#65B95B" /> */}

    {/* 김 결 느낌 */}
    <Line
      x1="24"
      y1="80"
      x2="30"
      y2="68"
      stroke="#000000"
      strokeOpacity={0.15}
      strokeWidth="2"
    />
    <Line
      x1="76"
      y1="80"
      x2="70"
      y2="68"
      stroke="#000000"
      strokeOpacity={0.15}
      strokeWidth="2"
    />
  </Svg>
);
// ------------------------------------------------------------

// export const CakeSlice = ({ colorHex = "#FFE2A6" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Polygon
//       points="50,15 18,72 82,72"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />

//     <Line x1="27" y1="61" x2="73" y2="61" stroke="#F08A58" strokeWidth="7" />

//     <Line x1="33" y1="50" x2="67" y2="50" stroke="#FFF8EC" strokeWidth="7" />

//     <Circle cx="50" cy="22" r="7" fill="#F25C54" />

//     <Circle cx="56" cy="18" r="3" fill="#4CAF50" />
//   </Svg>
// );
// export const CakeSlice = ({ colorHex = "#FFE2A6" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Polygon
//       points="50,20 20,74 80,74"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />

//     <Polygon points="32,54 68,54 72,61 28,61" fill="#F08A58" />
//     <Polygon points="37,44 63,44 66,50 34,50" fill="#FFF8EC" />

//     <Path
//       d="M42 20 Q50 8 58 20 Q54 24 50 20 Q46 24 42 20 Z"
//       fill={WHITE}
//       stroke={OUTLINE}
//       strokeWidth="2"
//       strokeLinejoin="round"
//     />

//     <Circle
//       cx="50"
//       cy="15"
//       r="6"
//       fill="#F25C54"
//       stroke={OUTLINE}
//       strokeWidth="2"
//     />
//     <Path
//       d="M50 9 Q53 4 57 6"
//       stroke="#4CAF50"
//       strokeWidth="2.5"
//       fill="none"
//       strokeLinecap="round"
//     />
//   </Svg>
// );

// // 🍰 조각케이크
export const Pyramid = ({ colorHex = "#E6C594" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 피라미드 전체 실루엣 (따스한 모래빛 베이스) */}
    <Polygon
      points="50,18 84,74 16,74"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 돌 블록 층 1 (상단 그림자/어두운 돌) */}
    <Polygon
      points="37,40 63,40 66,46 34,46"
      fill="#C89D6B"
      stroke={OUTLINE}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />

    {/* 돌 블록 층 2 (음영/질감) */}
    <Polygon
      points="32,48 68,48 72,54 28,54"
      fill="#D4A373"
      stroke={OUTLINE}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />

    {/* 돌 블록 층 3 (밝은 사막 모래톤) */}
    <Polygon
      points="27,56 73,56 78,64 22,64"
      fill="#E5B27D"
      stroke={OUTLINE}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />

    {/* 피라미드 기반암 (가장 어둡고 묵직한 하단) */}
    <Polygon
      points="21,66 79,66 84,74 16,74"
      fill="#B07D4F"
      stroke={OUTLINE}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />

    {/* 피라미드 능선(면 구분을 위한 빛 반사 라인) */}
    <Path
      d="M50 18 L50 74"
      fill="none"
      stroke={OUTLINE}
      strokeWidth="2"
      opacity={0.3}
      strokeLinecap="round"
    />

    {/* 신비로운 꼭짓점 황금빛 하이라이트 */}
    <Ellipse cx="50" cy="25" rx="3" ry="1.5" fill="#FFE082" opacity={0.7} />
  </Svg>
);
// export const TriangleCakeSlice = ({ colorHex = "#FFD6E0" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     {/* 케이크 전체 실루엣 (프로스팅 컬러) */}
//     <Polygon
//       points="50,18 84,74 16,74"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />

//     {/* 크림 층 */}
//     <Polygon
//       points="37,40 63,40 66,46 34,46"
//       fill="#FFF3E8"
//       stroke={OUTLINE}
//       strokeWidth="1.5"
//       strokeLinejoin="round"
//     />

//     {/* 잼/딸기 층 */}
//     <Polygon
//       points="32,48 68,48 72,54 28,54"
//       fill="#F4879A"
//       stroke={OUTLINE}
//       strokeWidth="1.5"
//       strokeLinejoin="round"
//     />

//     {/* 스폰지 층 */}
//     <Polygon
//       points="27,56 73,56 78,64 22,64"
//       fill="#F0C289"
//       stroke={OUTLINE}
//       strokeWidth="1.5"
//       strokeLinejoin="round"
//     />

//     {/* 바닥 크러스트 */}
//     <Polygon
//       points="21,66 79,66 84,74 16,74"
//       fill="#E0A465"
//       stroke={OUTLINE}
//       strokeWidth="1.5"
//       strokeLinejoin="round"
//     />

//     {/* 위쪽 프로스팅 드립 */}
//     <Path
//       d="M50 18 C48 26 44 30 40 33 M50 18 C52 26 56 30 60 33"
//       fill="none"
//       stroke={WHITE}
//       strokeWidth="3"
//       strokeLinecap="round"
//       opacity={0.6}
//     />

//     {/* 딸기 토핑 */}
//     {/* <Circle
//       cx="50"
//       cy="28"
//       r="6"
//       fill="#F44336"
//       stroke={OUTLINE}
//       strokeWidth="1.5"
//     />
//     <Path
//       d="M50 22 Q53 17 57 19"
//       stroke="#4CAF50"
//       strokeWidth="2.2"
//       fill="none"
//       strokeLinecap="round"
//     /> */}

//     {/* 반짝임 */}
//     <Ellipse
//       cx="38"
//       cy="60"
//       rx="5"
//       ry="2"
//       fill={WHITE}
//       opacity={0.4}
//       transform="rotate(-20 38 60)"
//     />
//   </Svg>
// );
export const SquareCakeSlice = ({ colorHex = "#FFD6E0" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 케이크 본체 */}
    <Path
      d="M20 43 L50 25 L80 43 L80 68 L50 84 L20 68 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 케이크 단면 */}
    <Path
      d="M20 43 L50 59 L80 43 L80 68 L50 84 L20 68 Z"
      fill="#F7B6C8"
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    />

    {/* 크림층 */}
    <Path
      d="M22 52 L50 67 L78 52"
      fill="none"
      stroke={WHITE}
      strokeWidth="6"
      strokeLinecap="round"
    />

    {/* 위쪽 크림 */}
    <Path
      d="M20 43 L50 25 L80 43 L50 59 Z"
      fill="#FFF1F4"
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    />

    {/* 딸기 */}
    <Path
      d="M46 30 C46 25 54 25 54 30 C54 35 50 38 50 38 C50 38 46 35 46 30 Z"
      fill="#F44336"
      stroke="#B83B3B"
      strokeWidth="2"
    />

    {/* 딸기 잎 */}
    <Path d="M50 29 L47 25 L50 27 L53 25 L50 31 Z" fill="#4CAF50" />

    {/* 반짝임 */}
    <Ellipse
      cx="36"
      cy="38"
      rx="5"
      ry="2"
      fill={WHITE}
      opacity={0.5}
      transform="rotate(-30 36 38)"
    />
  </Svg>
);

// ------------------------------------------------------------

// ============================================================
// HEART
// ============================================================

export const HeartCookie = ({ colorHex = "#E3A35D" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Path
      d="
        M50 83
        C43 75 18 59 18 37
        C18 21 37 17 50 33
        C63 17 82 21 82 37
        C82 59 57 75 50 83
        Z
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Circle cx="35" cy="39" r="3" fill="#754421" />
    <Circle cx="61" cy="39" r="3" fill="#754421" />
    <Circle cx="48" cy="56" r="3" fill="#754421" />
    <Circle cx="64" cy="57" r="3" fill="#754421" />
  </Svg>
);

// ------------------------------------------------------------

export const HeartBalloon = ({ colorHex = "#FF4F6D" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Path
      d="
        M50 72
        C43 64 19 50 19 31
        C19 17 37 12 50 28
        C63 12 81 17 81 31
        C81 50 57 64 50 72
        Z
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Polygon points="45,72 55,72 50,80" fill={colorHex} />

    <Path
      d="M50 80 C43 87 57 91 50 97"
      fill="none"
      stroke="#777777"
      strokeWidth="3"
    />

    <Ellipse cx="35" cy="29" rx="5" ry="9" fill={WHITE} opacity={0.3} />
  </Svg>
);

// ------------------------------------------------------------

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
// export const HeartGiftBox = ({ colorHex = "#FF5E7E" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Path
//       d="
//         M50 84
//         C42 76 18 60 18 37
//         C18 20 37 16 50 32
//         C63 16 82 20 82 37
//         C82 60 58 76 50 84
//         Z
//       "
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />

//     <Rect x="45" y="31" width="10" height="46" fill="#FFD166" />

//     <Path d="M50 31 C39 21 30 22 31 29 C32 36 42 35 50 31" fill="#FFD166" />

//     <Path d="M50 31 C61 21 70 22 69 29 C68 36 58 35 50 31" fill="#FFD166" />
//   </Svg>
// );
// export const HeartGiftBox = ({ colorHex = "#FF7B9C" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     {/* 하트 상자 */}
//     <Path
//       d="
//         M50 82
//         L23 55
//         C10 42 17 22 33 22
//         C42 22 48 27 50 34
//         C52 27 58 22 67 22
//         C83 22 90 42 77 55
//         Z
//       "
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />

//     {/* 뚜껑 */}
//     <Path
//       d="
//         M21 40
//         C20 29 27 23 36 23
//         C44 23 48 28 50 34
//         C52 28 56 23 64 23
//         C73 23 80 29 79 40
//         C69 44 31 44 21 40 Z
//       "
//       fill="#FF91AD"
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />

//     {/* 중앙 리본 */}
//     <Path d="M46 39 L54 39 L54 78 L46 78 Z" fill="#FFD166" />

//     {/* 리본 매듭 */}
//     <Circle
//       cx="50"
//       cy="38"
//       r="5"
//       fill="#F4A62A"
//       stroke={OUTLINE}
//       strokeWidth="2"
//     />

//     {/* 하이라이트 */}
//     <Ellipse
//       cx="32"
//       cy="51"
//       rx="5"
//       ry="2.5"
//       fill={WHITE}
//       opacity={0.4}
//       transform="rotate(-35 32 51)"
//     />
//   </Svg>
// );
export const HeartGiftBox = ({ colorHex = "#FF7B9C" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 아래쪽 상자 */}
    <Path
      d="
        M24 47
        C24 38 35 34 43 39
        L50 44
        L57 39
        C65 34 76 38 76 47
        L76 68
        L50 83
        L24 68
        Z
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 하트 뚜껑 */}
    <Path
      d="
        M50 48
        L29 30
        C20 22 26 12 36 13
        C43 13 48 18 50 24
        C52 18 57 13 64 13
        C74 12 80 22 71 30
        Z
      "
      fill="#FF91AD"
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 리본 */}
    <Path d="M46 39 L54 39 L54 76 L46 76 Z" fill="#FFD166" />

    <Circle
      cx="50"
      cy="39"
      r="5"
      fill="#F4A62A"
      stroke={OUTLINE}
      strokeWidth="2"
    />

    {/* 하이라이트 */}
    <Ellipse
      cx="33"
      cy="52"
      rx="5"
      ry="2.5"
      fill={WHITE}
      opacity={0.4}
      transform="rotate(-30 33 52)"
    />
  </Svg>
);
// ------------------------------------------------------------

// export const HeartLollipop = ({ colorHex = "#FF6B8A" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Path
//       d="
//         M50 67
//         C43 60 24 48 24 31
//         C24 18 39 15 50 28
//         C61 15 76 18 76 31
//         C76 48 57 60 50 67
//         Z
//       "
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />

//     <Path
//       d="
//         M38 37
//         C43 28 57 27 62 35
//         C67 43 55 51 47 45
//         C40 40 42 34 49 32
//       "
//       fill="none"
//       stroke="#FFD7E0"
//       strokeWidth="5"
//       strokeLinecap="round"
//     />

//     <Line
//       x1="50"
//       y1="67"
//       x2="50"
//       y2="91"
//       stroke="#D8A56B"
//       strokeWidth="7"
//       strokeLinecap="round"
//     />
//   </Svg>
// );

// ------------------------------------------------------------

export const HeartPillow = ({ colorHex = "#B897E8" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Path
      d="
        M50 83
        C41 75 18 59 19 37
        C20 22 37 17 50 32
        C63 17 80 22 81 37
        C82 59 59 75 50 83
        Z
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    <Path
      d="
        M50 73
        C43 67 29 56 29 43
        C30 34 40 31 50 42
        C60 31 70 34 71 43
        C71 56 57 67 50 73
      "
      fill="none"
      stroke={WHITE}
      strokeWidth="3"
      opacity={0.35}
    />
  </Svg>
);

// ------------------------------------------------------------

export const HeartCake = ({ colorHex = "#FFB6C1" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 케이크 옆면 (하트를 살짝 내려서 두께감 표현) */}
    <Path
      d="M50 90 C41 81 16 63 16 42 C16 25 36 21 50 37 C64 21 84 25 84 42 C84 63 59 81 50 90 Z"
      fill="#E8879E"
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 케이크 윗면 (프로스팅, colorHex) */}
    <Path
      d="M50 83 C42 75 18 59 18 39 C18 23 36 19 50 34 C64 19 82 23 82 39 C82 59 58 75 50 83 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 층 구분 크림 라인 */}
    <Path
      d="M25 50 Q33 46 41 50 Q50 54 59 50 Q67 46 75 50"
      fill="none"
      stroke={WHITE}
      strokeWidth="5"
      strokeLinecap="round"
    />

    {/* 하단 크림 물결 (옆면과 윗면 경계 장식) */}
    <Path
      d="M30 64 Q40 60 50 64 Q60 68 70 64"
      fill="none"
      stroke="#FFF0F3"
      strokeWidth="4"
      strokeLinecap="round"
      opacity={0.8}
    />

    {/* 체리 토핑 */}
    <Path
      d="M50 40 C50 40 40 31 40 25 C40 20 45 18 50 24 C55 18 60 20 60 25 C60 31 50 40 50 40 Z"
      fill="#F44355"
      stroke={OUTLINE}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <Path
      d="M50 21 Q55 12 60 14"
      stroke="#4CAF50"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />

    {/* 반짝임 */}
    <Ellipse
      cx="34"
      cy="46"
      rx="6"
      ry="2.5"
      fill={WHITE}
      opacity={0.45}
      transform="rotate(-30 34 46)"
    />
  </Svg>
);
// export const HeartCake = ({ colorHex = "#FF9EB4" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Path
//       d="M50 80 C42 73 20 59 20 40 C20 25 37 21 50 34 C63 21 80 25 80 40 C80 59 58 73 50 80 Z"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />

//     <Path
//       d="M27 48 Q33 44 39 48 Q45 52 50 48 Q55 44 61 48 Q67 52 73 48"
//       fill="none"
//       stroke="#FFF3E8"
//       strokeWidth="6"
//       strokeLinecap="round"
//     />
//     <Path
//       d="M32 62 Q40 58 48 62 Q56 66 64 62"
//       fill="none"
//       stroke="#E86B84"
//       strokeWidth="5"
//       strokeLinecap="round"
//     />
//     {/* 하트 모양 토핑 */}
//     <Path
//       d="M50 40 C50 40 38 31 38 23 C38 18 43 16 46 20 C50 24 50 24 50 24 C50 24 50 24 54 20 C57 16 62 18 62 23 C62 31 50 40 50 40 Z"
//       fill="#F44355"
//       stroke={OUTLINE}
//       strokeWidth="1.5"
//       strokeLinejoin="round"
//     />

//     {/* 하트 위로 Y축을 올려서 얹은 줄기 */}
//     <Path
//       d="M50 23 Q48 12 57 19"
//       stroke="#4CAF50"
//       strokeWidth="2"
//       fill="none"
//       strokeLinecap="round"
//     />
//     {/* <Circle
//       cx="50"
//       cy="33"
//       r="6"
//       fill="#F44355"
//       stroke={OUTLINE}
//       strokeWidth="1.5"
//     /> */}
//     {/* <Path
//       d="M50 27 Q53 22 57 24"
//       stroke="#4CAF50"
//       strokeWidth="2"
//       fill="none"
//       strokeLinecap="round"
//     /> */}
//   </Svg>
// );
// ============================================================
// STAR
// ============================================================

export const StarCookie = ({ colorHex = "#E5A64D" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Polygon
      points="
        50,10
        61,34
        87,37
        67,54
        73,81
        50,67
        27,81
        33,54
        13,37
        39,34
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    <Circle cx="43" cy="37" r="3" fill="#754421" />
    <Circle cx="61" cy="46" r="3" fill="#754421" />
    <Circle cx="38" cy="57" r="3" fill="#754421" />
    <Circle cx="54" cy="62" r="3" fill="#754421" />
  </Svg>
);

// ------------------------------------------------------------

// export const StarBalloon = ({ colorHex = "#FFD43B" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Polygon
//       points="
//         50,10
//         61,34
//         87,37
//         67,54
//         73,80
//         50,67
//         27,80
//         33,54
//         13,37
//         39,34
//       "
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />

//     <Polygon points="45,76 55,76 50,84" fill={colorHex} />

//     <Path
//       d="M50 84 C43 90 57 93 50 98"
//       fill="none"
//       stroke="#777777"
//       strokeWidth="3"
//     />

//     <Ellipse cx="38" cy="30" rx="5" ry="9" fill={WHITE} opacity={0.3} />
//   </Svg>
// );

// ------------------------------------------------------------

// export const StarGiftBox = ({ colorHex = "#4D96FF" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     <Rect
//       x="17"
//       y="32"
//       width="66"
//       height="52"
//       rx="6"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />

//     <Rect
//       x="13"
//       y="27"
//       width="74"
//       height="17"
//       rx="5"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />

//     <Rect x="45" y="29" width="10" height="55" fill="#FFD166" />

//     <Path d="M50 28 C39 17 30 19 31 26 C32 33 42 32 50 28" fill="#FFD166" />

//     <Path d="M50 28 C61 17 70 19 69 26 C68 33 58 32 50 28" fill="#FFD166" />

//     <Polygon
//       points="
//         50,47
//         55,57
//         66,58
//         58,66
//         60,77
//         50,71
//         40,77
//         42,66
//         34,58
//         45,57
//       "
//       fill="#FFD166"
//     />
//   </Svg>
// );
// export const StarGiftBox = ({ colorHex = "#FFD166" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     {/* 별 모양 상자 */}
//     <Path
//       d="
//         M50 15
//         L58 38
//         L83 39
//         L63 54
//         L70 78
//         L50 64
//         L30 78
//         L37 54
//         L17 39
//         L42 38
//         Z
//       "
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />

//     {/* 세로 리본 */}
//     <Path d="M46 32 L54 32 L54 69 L46 69 Z" fill="#F45B69" />

//     {/* 가로 리본 */}
//     <Path d="M25 39 L75 39 L75 47 L25 47 Z" fill="#F45B69" />

//     {/* 리본 매듭 */}
//     <Circle
//       cx="50"
//       cy="42"
//       r="5"
//       fill="#D9455A"
//       stroke={OUTLINE}
//       strokeWidth="2"
//     />

//     {/* 반짝임 */}
//     <Path d="M31 32 L34 32 L34 35 L31 35 Z" fill={WHITE} opacity={0.5} />
//   </Svg>
// );
export const StarGiftBox = ({ colorHex = "#FFD166" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 별 상자 */}
    <Path
      d="
        M50 13
        L59 37
        L85 39
        L65 55
        L72 80
        L50 66
        L28 80
        L35 55
        L15 39
        L41 37
        Z
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 뚜껑을 구분하는 선 */}
    <Path
      d="M22 44 L78 44"
      stroke="#E6A928"
      strokeWidth="4"
      strokeLinecap="round"
    />

    {/* 리본 세로 */}
    <Path d="M46 27 L54 27 L54 71 L46 71 Z" fill="#F45B69" />

    {/* 리본 가로 */}
    <Path d="M29 40 L71 40 L71 47 L29 47 Z" fill="#F45B69" />

    {/* 중앙 매듭 */}
    <Circle
      cx="50"
      cy="43"
      r="5"
      fill="#D9455A"
      stroke={OUTLINE}
      strokeWidth="2"
    />

    {/* 반짝임 */}
    <Path d="M32 31 L35 31 L35 34 L32 34 Z" fill={WHITE} opacity={0.5} />
  </Svg>
);
// ------------------------------------------------------------

export const StarWand = ({ colorHex = "#FFD43B" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Line
      x1="43"
      y1="57"
      x2="25"
      y2="88"
      stroke="#F278A1"
      strokeWidth="8"
      strokeLinecap="round"
    />

    <Polygon
      points="
        55,10
        63,28
        83,30
        68,43
        73,63
        55,52
        37,63
        42,43
        27,30
        47,28
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    <Circle cx="83" cy="20" r="3" fill="#FFD166" />
    <Circle cx="87" cy="38" r="3" fill="#FFD166" />
    <Circle cx="71" cy="14" r="3" fill="#FFD166" />
  </Svg>
);

export const StarBalloon = ({ colorHex = "#9B5DE5" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Line
      x1="50"
      y1="70"
      x2="50"
      y2="88"
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

// ------------------------------------------------------------

export const StarPillow = ({ colorHex = "#74C8FF" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Polygon
      points="
        50,11
        62,34
        87,38
        68,55
        73,81
        50,68
        27,81
        32,55
        13,38
        38,34
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    <Polygon
      points="
        50,22
        59,40
        78,43
        64,56
        67,70
        50,61
        33,70
        36,56
        22,43
        41,40
      "
      fill="none"
      stroke={WHITE}
      strokeWidth="3"
      opacity={0.35}
    />
  </Svg>
);

// ------------------------------------------------------------

export const Starfish = ({ colorHex = "#FF7F45" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Path
      d="
        M50 10
        C57 24 59 32 64 35
        C70 38 78 32 88 31
        C81 43 70 49 69 55
        C68 62 76 72 78 84
        C65 78 57 68 50 69
        C43 68 35 78 22 84
        C24 72 32 62 31 55
        C30 49 19 43 12 31
        C22 32 30 38 36 35
        C41 32 43 24 50 10
        Z
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    <Circle cx="42" cy="39" r="3" fill="#FFB078" />
    <Circle cx="60" cy="44" r="3" fill="#FFB078" />
    <Circle cx="49" cy="56" r="3" fill="#FFB078" />
    <Circle cx="35" cy="57" r="3" fill="#FFB078" />
    <Circle cx="63" cy="61" r="3" fill="#FFB078" />
  </Svg>
);

///////////추가시킴
// ============================================================
// CIRCLE
// ============================================================

// 🍭 막대사탕
export const Lollipop = ({ colorHex = "#FF6B8A" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 사탕 */}
    <Circle
      cx="50"
      cy="36"
      r="27"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 소용돌이 */}
    <Path
      d="
        M50 17
        C34 17 27 29 32 40
        C37 51 54 53 61 43
        C67 34 59 25 50 26
        C42 27 39 34 43 39
        C47 44 55 42 56 37
      "
      fill="none"
      stroke="#FFD7E2"
      strokeWidth="4"
      strokeLinecap="round"
    />

    {/* 막대 */}
    <Line
      x1="50"
      y1="63"
      x2="50"
      y2="89"
      stroke="#D8A56B"
      strokeWidth="7"
      strokeLinecap="round"
    />

    {/* 반짝임 */}
    <Ellipse
      cx="37"
      cy="27"
      rx="6"
      ry="3"
      fill={WHITE}
      opacity={0.35}
      transform="rotate(-35 37 27)"
    />
  </Svg>
);

// 🍰 케이크
// export const Cake = ({ colorHex = "#FF9EB5" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     {/* 케이크 본체 */}
//     <Path
//       d="M20 43 Q50 34 80 43 L76 75 Q50 85 24 75 Z"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//       strokeLinejoin="round"
//     />

//     {/* 크림 */}
//     <Path
//       d="
//         M20 43
//         Q28 35 36 43
//         Q43 51 50 43
//         Q57 35 64 43
//         Q72 51 80 43
//         L80 53
//         Q72 61 64 53
//         Q57 45 50 53
//         Q43 61 36 53
//         Q28 45 20 53
//         Z
//       "
//       fill={WHITE}
//       stroke={OUTLINE}
//       strokeWidth="3"
//     />

//     {/* 케이크 층 */}
//     <Path
//       d="M25 65 Q50 73 75 65"
//       fill="none"
//       stroke="#E86D82"
//       strokeWidth="4"
//       strokeLinecap="round"
//     />

//     {/* 딸기 */}
//     <Circle
//       cx="37"
//       cy="35"
//       r="8"
//       fill="#F44336"
//       stroke={OUTLINE}
//       strokeWidth="3"
//     />

//     <Path
//       d="M37 28 L34 23 M37 28 L40 23"
//       stroke="#4CAF50"
//       strokeWidth="3"
//       strokeLinecap="round"
//     />
//     <Circle
//       cx="63"
//       cy="35"
//       r="8"
//       fill="#F44336"
//       stroke={OUTLINE}
//       strokeWidth="3"
//     />

//     <Path
//       d="M63 28 L60 23 M63 28 L66 23"
//       stroke="#4CAF50"
//       strokeWidth="3"
//       strokeLinecap="round"
//     />

//     {/* 반짝임 */}
//     <Ellipse cx="34" cy="57" rx="5" ry="2.5" fill={WHITE} opacity={0.3} />
//   </Svg>
// );
export const Cake = ({ colorHex = "#FFB6C1" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 케이크 옆면 */}
    <Path
      d="M20 42 C20 35 80 35 80 42 L80 67 C80 74 20 74 20 67 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 케이크 윗면 */}
    <Ellipse
      cx="50"
      cy="42"
      rx="30"
      ry="13"
      fill="#FFF0F3"
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 크림 장식 */}
    <Path
      d="
        M25 44
        C30 39 35 47 40 42
        C45 37 50 47 55 42
        C60 37 65 47 70 42
        C74 39 77 42 77 44
      "
      fill="none"
      stroke={WHITE}
      strokeWidth="5"
      strokeLinecap="round"
    />

    {/* 촛불 */}
    <Rect
      x="46"
      y="19"
      width="8"
      height="17"
      rx="2"
      fill="#6EC5FF"
      stroke={OUTLINE}
      strokeWidth="2"
    />

    {/* 불꽃 */}
    <Path
      d="M50 18 C45 13 50 8 52 13 C55 17 53 20 50 22 C49 20 49 19 50 18 Z"
      fill="#FF9F1C"
      stroke={OUTLINE}
      strokeWidth="2"
    />

    {/* 하이라이트 */}
    <Ellipse
      cx="31"
      cy="52"
      rx="5"
      ry="2"
      fill={WHITE}
      opacity={0.4}
      transform="rotate(-20 31 52)"
    />
  </Svg>
);

// 🎁 동그란 선물상자
// 기존 square giftBox와 구분하기 위해 circleGiftBox 사용
// export const CircleGiftBox = ({ colorHex = "#FFD166" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     {/* 둥근 상자 */}
//     <Circle
//       cx="50"
//       cy="53"
//       r="29"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />

//     {/* 리본 세로 */}
//     <Path d="M45 27 Q50 33 55 27 L55 78 Q50 83 45 78 Z" fill="#F45B69" />

//     {/* 리본 가로 */}
//     <Path d="M22 46 Q50 40 78 46 L78 56 Q50 50 22 56 Z" fill="#F45B69" />

//     {/* 리본 */}
//     <Path
//       d="M70 28 C38 17 28 20 31 28 C34 35 44 34 50 28"
//       fill="#F45B69"
//       stroke={OUTLINE}
//       strokeWidth="2"
//     />

//     <Path
//       d="M50 28 C62 17 72 20 69 28 C66 35 56 34 50 28"
//       fill="#F45B69"
//       stroke={OUTLINE}
//       strokeWidth="2"
//     />

//     {/* 반짝임 */}
//     <Ellipse
//       cx="38"
//       cy="39"
//       rx="7"
//       ry="3"
//       fill={WHITE}
//       opacity={0.35}
//       transform="rotate(-30 38 39)"
//     />
//   </Svg>
// );
// export const CircleGiftBox = ({ colorHex = "#FFD166" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     {/* 둥근 상자 - 크게 키워서 원이 확실히 보이도록 */}
//     <Circle
//       cx="50"
//       cy="52"
//       r="30"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />

//     {/* 세로 리본 (원 안쪽에 맞춤) */}
//     <Rect x="44" y="24" width="12" height="56" rx="2" fill="#F45B69" />

//     {/* 가로 리본 */}
//     <Rect x="22" y="46" width="56" height="12" rx="2" fill="#F45B69" />

//     {/* 리본 매듭 - 작고 원 안쪽에 위치 */}
//     <Path
//       d="M50 40 C42 30 30 32 33 40 C35 46 45 45 50 40 Z"
//       fill="#F45B69"
//       stroke={OUTLINE}
//       strokeWidth="2"
//       strokeLinejoin="round"
//     />
//     <Path
//       d="M50 40 C58 30 70 32 67 40 C65 46 55 45 50 40 Z"
//       fill="#F45B69"
//       stroke={OUTLINE}
//       strokeWidth="2"
//       strokeLinejoin="round"
//     />
//     <Circle cx="50" cy="40" r="4.5" fill="#D9455A" />

//     {/* 반짝임 */}
//     <Ellipse
//       cx="35"
//       cy="42"
//       rx="6"
//       ry="2.5"
//       fill={WHITE}
//       opacity={0.35}
//       transform="rotate(-30 35 42)"
//     />
//   </Svg>
// );
export const Sunglasses = ({ colorHex = "#FF6B8A" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 왼쪽 동그란 렌즈 */}
    <Circle
      cx="34"
      cy="54"
      r="13"
      fill="#e0b80a"
      stroke={OUTLINE}
      strokeWidth="3"
    />
    {/* 오른쪽 동그란 렌즈 */}
    <Circle
      cx="66"
      cy="54"
      r="13"
      fill="#e0b80a"
      stroke={OUTLINE}
      strokeWidth="3"
    />

    {/* 코 다리 (더 아래로 이동) */}
    <Path
      d="M47 54 Q50 58 53 54"
      stroke={OUTLINE}
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />

    {/* 안경다리 (더 아래로 이동) */}
    <Line
      x1="21"
      y1="53"
      x2="12"
      y2="48"
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinecap="round"
    />
    <Line
      x1="79"
      y1="53"
      x2="88"
      y2="48"
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinecap="round"
    />

    {/* 렌즈 하이라이트 선 (더 아래로 이동) */}
    <Line
      x1="27"
      y1="54"
      x2="33"
      y2="57"
      stroke={WHITE}
      strokeWidth="2"
      opacity={0.45}
    />
    <Line
      x1="69"
      y1="54"
      x2="75"
      y2="57"
      stroke={WHITE}
      strokeWidth="2"
      opacity={0.45}
    />
  </Svg>
);
export const CircleGiftBox = ({ colorHex = "#FFD166" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 둥근 상자 */}
    <Circle
      cx="50"
      cy="52"
      r="31"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 세로 리본 - 위쪽 */}
    <Rect x="44" y="21" width="12" height="25" rx="2" fill="#F45B69" />

    {/* 세로 리본 - 아래쪽 */}
    <Rect x="44" y="54" width="12" height="27" rx="2" fill="#F45B69" />

    {/* 가로 리본 - 왼쪽 */}
    <Rect x="19" y="46" width="27" height="12" rx="2" fill="#F45B69" />

    {/* 가로 리본 - 오른쪽 */}
    <Rect x="54" y="46" width="27" height="12" rx="2" fill="#F45B69" />

    {/* 중앙 매듭 */}
    <Circle
      cx="50"
      cy="52"
      r="6"
      fill="#D9455A"
      stroke={OUTLINE}
      strokeWidth="2"
    />
    {/* 기존 위쪽 리본 (중앙 원과 함께 유지) */}
    <Circle
      cx="50"
      cy="52"
      r="6"
      fill="#D9455A"
      stroke={OUTLINE}
      strokeWidth="2"
    />
    <Path
      d="M47 47 C39 39 33 40 34 45 C35 49 42 50 47 47 Z"
      fill="#F45B69"
      stroke={OUTLINE}
      strokeWidth="2"
    />
    <Path
      d="M53 47 C61 39 67 40 66 45 C65 49 58 50 53 47 Z"
      fill="#F45B69"
      stroke={OUTLINE}
      strokeWidth="2"
    />

    {/* ——— 아래쪽 대칭 리본 추가 ——— */}

    {/* 아래쪽 왼쪽 리본 (위쪽 왼쪽의 대칭) */}
    <Path
      d="M47 57 C39 65 33 64 34 59 C35 55 42 54 47 57 Z"
      fill="#F45B69"
      stroke={OUTLINE}
      strokeWidth="2"
    />

    {/* 아래쪽 오른쪽 리본 (위쪽 오른쪽의 대칭) */}
    <Path
      d="M53 57 C61 65 67 64 66 59 C65 55 58 54 53 57 Z"
      fill="#F45B69"
      stroke={OUTLINE}
      strokeWidth="2"
    />

    {/* 작은 리본 위쪽 */}
    {/* <Path
      d="M47 47 C39 39 33 40 34 45 C35 49 42 50 47 47 Z"
      fill="#F45B69"
      stroke={OUTLINE}
      strokeWidth="2"
    /> */}

    {/* 작은 리본 오른쪽 */}
    {/* <Path
      d="M53 47 C61 39 67 40 66 45 C65 49 58 50 53 47 Z"
      fill="#F45B69"
      stroke={OUTLINE}
      strokeWidth="2"
    /> */}

    {/* 반짝임 */}
    <Ellipse
      cx="34"
      cy="39"
      rx="6"
      ry="2.5"
      fill={WHITE}
      opacity={0.4}
      transform="rotate(-30 34 39)"
    />
  </Svg>
);

export const Calculator = ({ colorHex = "#6C7A89" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 몸체 */}
    <Rect
      x="24"
      y="12"
      width="52"
      height="76"
      rx="8"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 화면 */}
    <Rect
      x="31"
      y="20"
      width="38"
      height="16"
      rx="3"
      fill="#C7F0D8"
      stroke={OUTLINE}
      strokeWidth="2"
    />
    <Line
      x1="35"
      y1="29"
      x2="55"
      y2="29"
      stroke="#3F8F5F"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* 버튼 3x3 + 연산 버튼 */}
    <Rect
      x="31"
      y="42"
      width="9"
      height="8"
      rx="2"
      fill={WHITE}
      opacity={0.9}
    />
    <Rect
      x="45"
      y="42"
      width="9"
      height="8"
      rx="2"
      fill={WHITE}
      opacity={0.9}
    />
    <Rect x="59" y="42" width="9" height="8" rx="2" fill="#FFB74D" />

    <Rect
      x="31"
      y="54"
      width="9"
      height="8"
      rx="2"
      fill={WHITE}
      opacity={0.9}
    />
    <Rect
      x="45"
      y="54"
      width="9"
      height="8"
      rx="2"
      fill={WHITE}
      opacity={0.9}
    />
    <Rect x="59" y="54" width="9" height="8" rx="2" fill="#FFB74D" />

    <Rect
      x="31"
      y="66"
      width="9"
      height="8"
      rx="2"
      fill={WHITE}
      opacity={0.9}
    />
    <Rect
      x="45"
      y="66"
      width="9"
      height="8"
      rx="2"
      fill={WHITE}
      opacity={0.9}
    />
    <Rect x="59" y="66" width="9" height="8" rx="2" fill="#F45B69" />
  </Svg>
);

export const Switch = ({ colorHex = "#F5F0E6" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 벽판 */}
    <Rect
      x="18"
      y="18"
      width="64"
      height="64"
      rx="10"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 안쪽 패널 */}
    {/* <Rect
      x="28"
      y="26"
      width="44"
      height="48"
      rx="6"
      fill="#E4DECC"
      stroke={OUTLINE}
      strokeWidth="2"
    /> */}

    {/* 토글 버튼 (위: ON) */}
    <Rect
      x="36"
      y="30"
      width="28"
      height="17"
      rx="4"
      fill="#FFD166"
      stroke={OUTLINE}
      strokeWidth="2.5"
    />

    {/* 토글 버튼 (아래: OFF, 살짝 어둡게) */}
    <Rect
      x="36"
      y="54"
      width="28"
      height="17"
      rx="4"
      fill="#B8AF9C"
      stroke={OUTLINE}
      strokeWidth="2"
    />

    {/* 고정 나사 (귀엽게 동그라미) */}
    <Circle cx="23" cy="23" r="2.5" fill="#9A9484" />
    <Circle cx="77" cy="23" r="2.5" fill="#9A9484" />
    <Circle cx="23" cy="77" r="2.5" fill="#9A9484" />
    <Circle cx="77" cy="77" r="2.5" fill="#9A9484" />

    {/* 반짝임 */}
    <Ellipse
      cx="44"
      cy="38"
      rx="5"
      ry="2"
      fill={WHITE}
      opacity={0.5}
      transform="rotate(-20 44 38)"
    />
  </Svg>
);

export const RemoteControl = ({ colorHex = "#4A4E5A" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 몸체 */}
    <Rect
      x="34"
      y="21"
      width="32"
      height="64"
      rx="6"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    {/* 상단 IR 표시등 */}
    <Rect
      x="41"
      y="28"
      width="7"
      height="6"
      rx="1.5"
      fill="#F45B69"
      stroke={OUTLINE}
      strokeWidth="1.5"
    />

    {/* 상단 버튼들 */}
    <Rect
      x="39"
      y="36"
      width="9"
      height="12"
      rx="3"
      fill="#FFB74D"
      stroke={OUTLINE}
      strokeWidth="1.5"
    />
    <Rect
      x="52"
      y="36"
      width="9"
      height="12"
      rx="3"
      fill="#6FCF97"
      stroke={OUTLINE}
      strokeWidth="1.5"
    />

    {/* 하단 버튼 2x2 */}
    <Rect
      x="39"
      y="58"
      width="9"
      height="8"
      rx="2"
      fill={WHITE}
      opacity={0.9}
    />
    <Rect
      x="52"
      y="58"
      width="9"
      height="8"
      rx="2"
      fill={WHITE}
      opacity={0.9}
    />
    <Rect x="39" y="70" width="9" height="8" rx="2" fill="#F45B69" />
    <Rect x="52" y="70" width="9" height="8" rx="2" fill="#6FCF97" />
  </Svg>
);

export const Phone = ({ colorHex = "#7C8CFF" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 몸체 */}
    <Rect
      x="27"
      y="8"
      width="46"
      height="84"
      rx="10"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 화면 */}
    <Rect
      x="32"
      y="18"
      width="36"
      height="58"
      rx="3"
      fill="#E8ECFF"
      stroke={OUTLINE}
      strokeWidth="2"
    />

    {/* 상단 스피커 */}
    <Rect
      x="43"
      y="12"
      width="14"
      height="3"
      rx="1.5"
      fill="#3A3F55"
      opacity={0.5}
    />

    {/* 화면 안 아이콘들 (귀엽게) */}
    <Circle cx="41" cy="30" r="4" fill="#FFB74D" />
    <Rect
      x="48"
      y="27"
      width="12"
      height="6"
      rx="2"
      fill={WHITE}
      opacity={0.85}
    />
    <Line
      x1="37"
      y1="44"
      x2="63"
      y2="44"
      stroke={WHITE}
      strokeWidth="3"
      opacity={0.85}
      strokeLinecap="round"
    />
    <Line
      x1="37"
      y1="52"
      x2="55"
      y2="52"
      stroke={WHITE}
      strokeWidth="3"
      opacity={0.85}
      strokeLinecap="round"
    />

    {/* 하단 홈버튼 */}
    <Circle cx="50" cy="84" r="4.5" fill="#3A3F55" opacity={0.4} />

    {/* 반짝임 */}
    <Ellipse
      cx="37"
      cy="22"
      rx="4"
      ry="2"
      fill={WHITE}
      opacity={0.5}
      transform="rotate(-30 37 22)"
    />
  </Svg>
);

// 🥁 북
// export const Drum = ({ colorHex = "#FF8A65" }: ItemSvgProps) => (
//   <Svg width="95" height="95" viewBox="0 0 100 100">
//     {/* 북 몸통 */}
//     <Rect
//       x="22"
//       y="30"
//       width="56"
//       height="42"
//       rx="7"
//       fill={colorHex}
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />

//     {/* 위쪽 북 */}
//     <Ellipse
//       cx="50"
//       cy="30"
//       rx="28"
//       ry="12"
//       fill="#FFF1D6"
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />

//     {/* 아래쪽 */}
//     <Ellipse
//       cx="50"
//       cy="72"
//       rx="28"
//       ry="10"
//       fill="#E66D55"
//       stroke={OUTLINE}
//       strokeWidth="4"
//     />

//     {/* 북 줄 */}
//     <Line x1="30" y1="38" x2="70" y2="38" stroke="#FFD166" strokeWidth="4" />

//     <Line x1="30" y1="62" x2="70" y2="62" stroke="#FFD166" strokeWidth="4" />

//     {/* 북채 */}
//     <Line
//       x1="17"
//       y1="20"
//       x2="36"
//       y2="37"
//       stroke="#A8733E"
//       strokeWidth="5"
//       strokeLinecap="round"
//     />

//     <Circle
//       cx="15"
//       cy="18"
//       r="5"
//       fill="#D89B57"
//       stroke={OUTLINE}
//       strokeWidth="2"
//     />

//     <Line
//       x1="83"
//       y1="20"
//       x2="64"
//       y2="37"
//       stroke="#A8733E"
//       strokeWidth="5"
//       strokeLinecap="round"
//     />

//     <Circle
//       cx="85"
//       cy="18"
//       r="5"
//       fill="#D89B57"
//       stroke={OUTLINE}
//       strokeWidth="2"
//     />
//   </Svg>
// );

// ============================================================
// SQUARE
// ============================================================
export const SquareSunglasses = ({ colorHex = "#FF6B8A" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 왼쪽 네모난 렌즈 */}
    <Path
      d="M21 41 H47 V67 H21 Z"
      fill="#49ec4c"
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    />
    {/* 오른쪽 네모난 렌즈 */}
    <Path
      d="M53 41 H79 V67 H53 Z"
      fill="#49ec4c"
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    />

    {/* 코 다리 (더 아래로 이동) */}
    <Path
      d="M47 54 Q50 58 53 54"
      stroke={OUTLINE}
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />

    {/* 안경다리 (더 아래로 이동) */}
    <Line
      x1="21"
      y1="53"
      x2="12"
      y2="48"
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinecap="round"
    />
    <Line
      x1="79"
      y1="53"
      x2="88"
      y2="48"
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinecap="round"
    />

    {/* 렌즈 하이라이트 선 (더 아래로 이동) */}
    <Line
      x1="27"
      y1="54"
      x2="33"
      y2="57"
      stroke={WHITE}
      strokeWidth="2"
      opacity={0.45}
    />
    <Line
      x1="69"
      y1="54"
      x2="75"
      y2="57"
      stroke={WHITE}
      strokeWidth="2"
      opacity={0.45}
    />
  </Svg>
);

// 🚪 문
export const Door = ({ colorHex = "#B97845" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 문 */}
    <Rect
      x="25"
      y="12"
      width="50"
      height="76"
      rx="4"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 문 패널 */}
    <Rect
      x="34"
      y="22"
      width="32"
      height="25"
      rx="3"
      fill="#D99A63"
      stroke="#8D5A32"
      strokeWidth="3"
    />

    <Rect
      x="34"
      y="53"
      width="32"
      height="25"
      rx="3"
      fill="#D99A63"
      stroke="#8D5A32"
      strokeWidth="3"
    />

    {/* 손잡이 */}
    <Circle
      cx="62"
      cy="51"
      r="4"
      fill="#FFD166"
      stroke={OUTLINE}
      strokeWidth="2"
    />
  </Svg>
);

// 📚 책장
export const Bookshelf = ({ colorHex = "#A8733E" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 책장 */}
    <Rect
      x="18"
      y="13"
      width="64"
      height="75"
      rx="4"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 선반 */}
    <Line x1="20" y1="38" x2="80" y2="38" stroke={OUTLINE} strokeWidth="4" />

    <Line x1="20" y1="63" x2="80" y2="63" stroke={OUTLINE} strokeWidth="4" />

    {/* 책 1 */}
    <Rect x="25" y="19" width="9" height="18" rx="1" fill="#F45B69" />

    {/* 책 2 */}
    <Rect x="35" y="22" width="10" height="15" rx="1" fill="#4D96FF" />

    {/* 책 3 */}
    <Rect x="47" y="17" width="9" height="20" rx="1" fill="#FFD166" />

    {/* 책 4 */}
    <Rect x="58" y="21" width="11" height="16" rx="1" fill="#65B95B" />

    {/* 아래 책들 */}
    <Rect x="25" y="44" width="11" height="18" rx="1" fill="#9C6ADE" />

    <Rect x="38" y="42" width="9" height="20" rx="1" fill="#FF8A65" />

    <Rect x="49" y="46" width="12" height="16" rx="1" fill="#4D96FF" />

    <Rect x="63" y="43" width="9" height="19" rx="1" fill="#FFD166" />

    {/* 바닥 */}
    <Rect x="14" y="85" width="72" height="7" rx="3" fill="#8D5A32" />
  </Svg>
);

// 🧊 냉장고
export const Refrigerator = ({ colorHex = "#C9DDE8" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 냉장고 */}
    <Rect
      x="22"
      y="10"
      width="56"
      height="80"
      rx="7"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 문 구분 */}
    <Line x1="24" y1="48" x2="76" y2="48" stroke="#AABFCB" strokeWidth="3" />

    {/* 손잡이 */}
    <Line
      x1="66"
      y1="25"
      x2="66"
      y2="40"
      stroke="#687780"
      strokeWidth="5"
      strokeLinecap="round"
    />

    <Line
      x1="66"
      y1="56"
      x2="66"
      y2="75"
      stroke="#687780"
      strokeWidth="5"
      strokeLinecap="round"
    />

    {/* 작은 냉기 표시 */}
    <Path
      d="M35 25 L35 36 M30 30 L40 30"
      stroke="#8AC6E8"
      strokeWidth="3"
      strokeLinecap="round"
    />

    <Ellipse
      cx="39"
      cy="20"
      rx="6"
      ry="3"
      fill={WHITE}
      opacity={0.4}
      transform="rotate(-30 39 20)"
    />
  </Svg>
);

// 💻 노트북
export const Laptop = ({ colorHex = "#78909C" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Rect
      x="18"
      y="17"
      width="64"
      height="48"
      rx="5"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
    <Rect x="25" y="24" width="50" height="34" rx="2" fill="#C8EEFF" />
    <Path
      d="M30 49 L44 32"
      stroke={WHITE}
      strokeWidth="5"
      opacity={0.35}
      strokeLinecap="round"
    />

    {/* 키보드 받침 - 윗변은 평평, 아랫변 모서리만 둥글게 */}
    <Path
      d="M14 66 L86 66 L82 77 Q81 80 78 80 L22 80 Q19 80 18 77 Z"
      fill="#AAB5BC"
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
    <Line
      x1="24"
      y1="80"
      x2="76"
      y2="80"
      stroke="#8B959B"
      strokeWidth="2"
      opacity={0.6}
    />

    <Rect x="43" y="70" width="14" height="6" rx="2" fill="#DDE3E7" />
    <Line x1="27" y1="70" x2="39" y2="70" stroke="#7B858B" strokeWidth="2" />
    <Line x1="61" y1="70" x2="73" y2="70" stroke="#7B858B" strokeWidth="2" />
  </Svg>
);
export const Mountain = ({ colorHex = "#72B86A" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 큰 산 */}
    <Polygon
      points="50,12 12,82 88,82"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 눈 */}
    <Polygon points="50,12 38,35 50,31 61,36" fill={WHITE} />

    {/* 작은 산 */}
    <Polygon
      points="73,38 50,82 94,82"
      fill="#8BCF7C"
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    />

    {/* 작은 눈 */}
    <Polygon points="73,38 66,52 73,49 80,53" fill={WHITE} />

    {/* 해 */}
    {/* <Circle cx="20" cy="25" r="8" fill="#FFD166" /> */}
  </Svg>
);

// ⛵ 범선
export const Sailboat = ({ colorHex = "#4D96FF" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 돛대 */}
    <Line
      x1="50"
      y1="13"
      x2="50"
      y2="67"
      stroke="#8D5A32"
      strokeWidth="4"
      strokeLinecap="round"
    />

    {/* 왼쪽 돛 */}
    <Polygon
      points="48,18 22,57 48,57"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    />

    {/* 오른쪽 돛 */}
    <Polygon
      points="53,23 53,57 78,57"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    />

    {/* 배 */}
    <Path
      d="M18 63 L82 63 L70 79 Q50 87 30 79 Z"
      fill="#A8733E"
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 파도 */}
    <Path
      d="M20 86 Q30 80 40 86 Q50 92 60 86 Q70 80 80 86"
      fill="none"
      stroke="#63C5E8"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </Svg>
);

// 🍪 세모 쿠키

export const TriangleCookie = ({ colorHex = "#D99A52" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Path
      d="M46.4 20.1 Q50 13 53.6 20.1 L80.4 72.9 Q84 80 76 80 L24 80 Q16 80 19.6 72.9 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* 1번 삼각형 (기존 cx="44" cy="38" r="4") */}
    <Path
      d="M44 33 L49 43 L39 43 Z"
      fill="#754421"
      stroke={OUTLINE}
      strokeWidth="1"
      strokeLinejoin="round"
    />

    {/* 2번 삼각형 (기존 cx="60" cy="46" r="4") */}
    <Path
      d="M60 41 L65 51 L55 51 Z"
      fill="#754421"
      stroke={OUTLINE}
      strokeWidth="1"
      strokeLinejoin="round"
    />

    {/* 3번 삼각형 (기존 cx="36" cy="56" r="4") */}
    <Path
      d="M36 51 L41 61 L31 61 Z"
      fill="#754421"
      stroke={OUTLINE}
      strokeWidth="1"
      strokeLinejoin="round"
    />

    {/* 4번 삼각형 (기존 cx="52" cy="63" r="4") */}
    <Path
      d="M52 58 L57 68 L47 68 Z"
      fill="#754421"
      stroke={OUTLINE}
      strokeWidth="1"
      strokeLinejoin="round"
    />

    {/* 5번 삼각형 (기존 cx="66" cy="65" r="4") */}
    <Path
      d="M66 60 L71 70 L61 70 Z"
      fill="#754421"
      stroke={OUTLINE}
      strokeWidth="1"
      strokeLinejoin="round"
    />

    {/* 6번 삼각형 (기존 cx="47" cy="72" r="3.5") */}
    <Path
      d="M47 67.5 L51.5 76.5 L42.5 76.5 Z"
      fill="#754421"
      stroke={OUTLINE}
      strokeWidth="1"
      strokeLinejoin="round"
    />
    {/* <Circle
      cx="44"
      cy="38"
      r="4"
      fill="#754421"
      stroke={OUTLINE}
      strokeWidth="1"
    />
    <Circle
      cx="60"
      cy="46"
      r="4"
      fill="#754421"
      stroke={OUTLINE}
      strokeWidth="1"
    />
    <Circle
      cx="36"
      cy="56"
      r="4"
      fill="#754421"
      stroke={OUTLINE}
      strokeWidth="1"
    />
    <Circle
      cx="52"
      cy="63"
      r="4"
      fill="#754421"
      stroke={OUTLINE}
      strokeWidth="1"
    />
    <Circle
      cx="66"
      cy="65"
      r="4"
      fill="#754421"
      stroke={OUTLINE}
      strokeWidth="1"
    />
    <Circle
      cx="47"
      cy="72"
      r="3.5"
      fill="#754421"
      stroke={OUTLINE}
      strokeWidth="1"
    /> */}

    <Ellipse
      cx="43"
      cy="29"
      rx="7"
      ry="3"
      fill={WHITE}
      opacity={0.25}
      transform="rotate(-30 43 29)"
    />
  </Svg>
);

// 📦 세모 상자
export const TriangleBox = ({ colorHex = "#FFB347" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 삼각기둥 몸통 */}
    <Path
      d="M20 67 L50 27 L80 67 L80 78 L50 90 L20 78 Z"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 앞쪽 삼각형 면 */}
    <Path
      d="M20 67 L50 27 L80 67 L50 80 Z"
      fill="#FFD166"
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 리본 */}
    <Path d="M47 34 L53 31 L59 72 L53 75 Z" fill="#F45B69" />

    <Circle
      cx="50"
      cy="35"
      r="5"
      fill="#D9455A"
      stroke={OUTLINE}
      strokeWidth="2"
    />

    {/* 반짝임 */}
    <Path
      d="M34 57 L38 51"
      stroke={WHITE}
      strokeWidth="3"
      strokeLinecap="round"
      opacity={0.45}
    />
  </Svg>
);

// ============================================================
// HEART
// ============================================================

// ❤️ 하트 단추
export const HeartButton = ({ colorHex = "#FF6B8A" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Path
      d="
        M50 82
        C42 74 19 59 19 38
        C19 22 37 18 50 33
        C63 18 81 22 81 38
        C81 59 58 74 50 82
        Z
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 단추 구멍 */}
    <Circle cx="40" cy="42" r="5" fill={WHITE} />
    <Circle cx="60" cy="42" r="5" fill={WHITE} />
    <Circle cx="40" cy="60" r="5" fill={WHITE} />
    <Circle cx="60" cy="60" r="5" fill={WHITE} />

    {/* 반짝임 */}
    <Ellipse
      cx="37"
      cy="30"
      rx="6"
      ry="3"
      fill={WHITE}
      opacity={0.4}
      transform="rotate(-30 37 30)"
    />
  </Svg>
);

// 🕐 하트 시계
export const HeartClock = ({ colorHex = "#FF8FAB" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Path
      d="
        M50 84
        C42 76 18 60 18 37
        C18 20 37 16 50 32
        C63 16 82 20 82 37
        C82 60 58 76 50 84
        Z
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />

    {/* 시계판 */}
    {/* <Circle
      cx="50"
      cy="49"
      r="19"
      fill={WHITE}
      stroke={OUTLINE}
      strokeWidth="3"
    /> */}
    <Path
      d="M50 66 C50 66 32 53 32 41 C32 33 40 29 45 35 C50 41 50 41 50 41 C50 41 50 41 55 35 C60 29 68 33 68 41 C68 53 50 66 50 66 Z"
      fill={WHITE}
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    />

    {/* 시계 바늘 */}
    <Line
      x1="50"
      y1="49"
      x2="50"
      y2="38"
      stroke={DARK}
      strokeWidth="3"
      strokeLinecap="round"
    />

    <Line
      x1="50"
      y1="49"
      x2="59"
      y2="54"
      stroke={DARK}
      strokeWidth="3"
      strokeLinecap="round"
    />

    <Circle cx="50" cy="49" r="3" fill="#FF9F43" />
  </Svg>
);

// 😎 하트 선글라스
export const HeartSunglasses = ({ colorHex = "#FF6B8A" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 왼쪽 하트 렌즈 (더 아래로 이동) */}
    <Path
      d="M34 72 C34 72 21 63 21 54 C21 47 28 44 34 51 C40 44 47 47 47 54 C47 63 34 72 34 72 Z"
      fill="#353B43"
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    />
    {/* 오른쪽 하트 렌즈 (더 아래로 이동) */}
    <Path
      d="M66 72 C66 72 53 63 53 54 C53 47 60 44 66 51 C72 44 79 47 79 54 C79 63 66 72 66 72 Z"
      fill="#353B43"
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    />

    {/* 코 다리 (더 아래로 이동) */}
    <Path
      d="M47 54 Q50 58 53 54"
      stroke={OUTLINE}
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />

    {/* 안경다리 (더 아래로 이동) */}
    <Line
      x1="21"
      y1="53"
      x2="12"
      y2="48"
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinecap="round"
    />
    <Line
      x1="79"
      y1="53"
      x2="88"
      y2="48"
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinecap="round"
    />

    {/* 렌즈 하이라이트 선 (더 아래로 이동) */}
    <Line
      x1="27"
      y1="54"
      x2="33"
      y2="57"
      stroke={WHITE}
      strokeWidth="2"
      opacity={0.45}
    />
    <Line
      x1="69"
      y1="54"
      x2="75"
      y2="57"
      stroke={WHITE}
      strokeWidth="2"
      opacity={0.45}
    />
  </Svg>
);
// 💎 하트 보석

export const HeartGem = ({ colorHex = "#B388FF" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 하트 보석 외곽 */}
    <Path
      d="
        M50 82
        L23 53
        C10 39 18 19 34 19
        C42 19 48 24 50 31
        C52 24 58 19 66 19
        C82 19 90 39 77 53
        Z
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 보석 컷 - 위쪽 */}
    <Path
      d="M25 30 L39 25 L50 32 L61 25 L75 30 L67 43 L50 37 L33 43 Z"
      fill="#FFFFFF"
      opacity={0.28}
      stroke={OUTLINE}
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* 가운데 컷 */}
    <Path
      d="M33 43 L50 37 L67 43 L58 64 L50 76 L42 64 Z"
      fill="#FFFFFF"
      opacity={0.18}
      stroke={OUTLINE}
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* 하이라이트 */}
    <Path d="M29 32 L37 28 L42 31 L35 39 Z" fill={WHITE} opacity={0.55} />
  </Svg>
);

// ============================================================
// STAR
// ============================================================

export const StarSunglasses = ({ colorHex = "#FF6B8A" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 왼쪽 별 모양 렌즈 */}
    <Polygon
      points="34,43 38,53 48,54 40,61 43,72 34,66 25,72 28,61 20,54 30,53"
      fill="#e0b80a"
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    />
    {/* 오른쪽 별 모양 렌즈 */}
    <Polygon
      points="66,43 70,53 80,54 72,61 75,72 66,66 57,72 60,61 52,54 62,53"
      fill="#e0b80a"
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    />

    {/* 코 다리 */}
    <Path
      d="M47 55 Q50 58 53 55"
      stroke={OUTLINE}
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />

    {/* 안경다리 */}
    <Line
      x1="20"
      y1="54"
      x2="12"
      y2="50"
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinecap="round"
    />
    <Line
      x1="80"
      y1="54"
      x2="88"
      y2="50"
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinecap="round"
    />

    {/* 렌즈 하이라이트 선 */}
    <Line
      x1="27"
      y1="59"
      x2="33"
      y2="62"
      stroke={WHITE}
      strokeWidth="2"
      opacity={0.45}
    />
    <Line
      x1="69"
      y1="59"
      x2="75"
      y2="62"
      stroke={WHITE}
      strokeWidth="2"
      opacity={0.45}
    />
  </Svg>
);
// ⭐ 별 단추
export const StarButton = ({ colorHex = "#FFD43B" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Polygon
      points="
        50,10
        61,34
        87,37
        67,54
        73,81
        50,67
        27,81
        33,54
        13,37
        39,34
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 단추 구멍 */}
    <Circle cx="42" cy="40" r="4" fill={WHITE} />
    <Circle cx="58" cy="40" r="4" fill={WHITE} />
    <Circle cx="42" cy="56" r="4" fill={WHITE} />
    <Circle cx="58" cy="56" r="4" fill={WHITE} />

    {/* 반짝임 */}
    <Ellipse
      cx="38"
      cy="29"
      rx="6"
      ry="3"
      fill={WHITE}
      opacity={0.4}
      transform="rotate(-30 38 29)"
    />
  </Svg>
);

// 🕐 별 시계
export const StarClock = ({ colorHex = "#FFD43B" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Polygon
      points="
        50,9
        61,33
        87,37
        67,54
        73,81
        50,67
        27,81
        33,54
        13,37
        39,33
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 시계판 */}
    {/* <Circle
      cx="50"
      cy="49"
      r="19"
      fill={WHITE}
      stroke={OUTLINE}
      strokeWidth="3"
    /> */}
    <Path
      d="M50 30 L55.5 40.5 L68 42.4 L59 51.4 L61.2 64 L50 58 L38.8 64 L41 51.4 L32 42.4 L44.5 40.5 Z"
      fill={WHITE}
      stroke={OUTLINE}
      strokeWidth="3"
      strokeLinejoin="round"
    />

    {/* 시계 바늘 */}
    <Line
      x1="50"
      y1="49"
      x2="50"
      y2="38"
      stroke={DARK}
      strokeWidth="3"
      strokeLinecap="round"
    />

    <Line
      x1="50"
      y1="49"
      x2="59"
      y2="54"
      stroke={DARK}
      strokeWidth="3"
      strokeLinecap="round"
    />

    <Circle cx="50" cy="49" r="3" fill="#FF6B6B" />
  </Svg>
);

// 🎂 별 케이크

export const StarCake = ({ colorHex = "#FF9EB5" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Polygon
      points="50,10 61,34 87,37 67,54 73,81 50,67 27,81 33,54 13,37 39,34"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* 크림 테두리 별 5개 (기존 r="3.5" 도트 대체) */}
    <Path
      d="M50 13 L51.2 15.5 L54 15.9 L52 17.9 L52.5 20.7 L50 19.4 L47.5 20.7 L48 17.9 L46 15.9 L48.8 15.5 Z"
      fill={WHITE}
      opacity={0.85}
      strokeLinejoin="round"
    />
    <Path
      d="M70 33 L71.2 35.5 L74 35.9 L72 37.9 L72.5 40.7 L70 39.4 L67.5 40.7 L68 37.9 L66 35.9 L68.8 35.5 Z"
      fill={WHITE}
      opacity={0.85}
      strokeLinejoin="round"
    />
    <Path
      d="M63 58 L64.2 60.5 L67 60.9 L65 62.9 L65.5 65.7 L63 64.4 L60.5 65.7 L61 62.9 L59 60.9 L61.8 60.5 Z"
      fill={WHITE}
      opacity={0.85}
      strokeLinejoin="round"
    />
    <Path
      d="M37 58 L38.2 60.5 L41 60.9 L39 62.9 L39.5 65.7 L37 64.4 L34.5 65.7 L35 62.9 L33 60.9 L35.8 60.5 Z"
      fill={WHITE}
      opacity={0.85}
      strokeLinejoin="round"
    />
    <Path
      d="M30 33 L31.2 35.5 L34 35.9 L32 37.9 L32.5 40.7 L30 39.4 L27.5 40.7 L28 37.9 L26 35.9 L28.8 35.5 Z"
      fill={WHITE}
      opacity={0.85}
      strokeLinejoin="round"
    />

    {/* 딸기 모양 별 (기존 cx="50" cy="42" r="7" 대형 별 대체) */}
    <Path
      d="M50 33 L52.5 38 L58 38.8 L54 42.7 L55 48.2 L50 45.6 L45 48.2 L46 42.7 L42 38.8 L47.5 38 Z"
      fill="#F44336"
      stroke={OUTLINE}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <Path
      d="M50 35 L47 31 M50 35 L53 31"
      stroke="#4CAF50"
      strokeWidth="2.5"
      strokeLinecap="round"
    />

    {/* 블루베리 별 2개 (기존 r="3.5" 도트 대체) */}
    <Path
      d="M40 47 L41.2 49.5 L44 49.9 L42 51.9 L42.5 54.7 L40 53.4 L37.5 54.7 L38 51.9 L36 49.9 L38.8 49.5 Z"
      fill="#4D96FF"
      strokeLinejoin="round"
    />
    <Path
      d="M60 47 L61.2 49.5 L64 49.9 L62 51.9 L62.5 54.7 L60 53.4 L57.5 54.7 L58 51.9 L56 49.9 L58.8 49.5 Z"
      fill="#4D96FF"
      strokeLinejoin="round"
    />

    {/* 크림 테두리 도트 */}
    {/* <Circle cx="50" cy="18" r="3.5" fill={WHITE} opacity={0.85} />
    <Circle cx="70" cy="38" r="3.5" fill={WHITE} opacity={0.85} />
    <Circle cx="63" cy="63" r="3.5" fill={WHITE} opacity={0.85} />
    <Circle cx="37" cy="63" r="3.5" fill={WHITE} opacity={0.85} />
    <Circle cx="30" cy="38" r="3.5" fill={WHITE} opacity={0.85} /> */}

    {/* 딸기 */}
    {/* <Circle
      cx="50"
      cy="42"
      r="7"
      fill="#F44336"
      stroke={OUTLINE}
      strokeWidth="1.5"
    />
    <Path
      d="M50 35 L47 31 M50 35 L53 31"
      stroke="#4CAF50"
      strokeWidth="2.5"
      strokeLinecap="round"
    /> */}

    {/* 블루베리 */}
    {/* <Circle cx="40" cy="52" r="3.5" fill="#4D96FF" />
    <Circle cx="60" cy="52" r="3.5" fill="#4D96FF" /> */}
  </Svg>
);

// 🎄 별 장식
export const StarOrnament = ({ colorHex = "#FF5C6C" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* 끈 */}
    <Line
      x1="50"
      y1="8"
      x2="50"
      y2="17"
      stroke="#8D5A32"
      strokeWidth="4"
      strokeLinecap="round"
    />

    {/* 작은 고리 */}
    {/* <Rect
      x="44"
      y="3"
      width="12"
      height="8"
      rx="4"
      fill="none"
      stroke="#8D5A32"
      strokeWidth="3"
    /> */}

    {/* 별 */}
    <Polygon
      points="
        50,15
        61,36
        85,39
        67,54
        72,78
        50,66
        28,78
        33,54
        15,39
        39,36
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 장식 무늬 */}
    {/* <Circle cx="40" cy="44" r="4" fill="#FFD166" />

    <Circle cx="61" cy="49" r="4" fill="#4D96FF" />

    <Circle cx="49" cy="61" r="4" fill="#65B95B" /> */}
    {/* 1번 별 (기존 cx="40" cy="44" r="4") */}
    <Path
      d="M40 38 L41.8 41.5 L45.5 42 L42.8 44.7 L43.5 48.5 L40 46.7 L36.5 48.5 L37.2 44.7 L34.5 42 L38.2 41.5 Z"
      fill="#FFD166"
      strokeLinejoin="round"
    />

    {/* 2번 별 (기존 cx="61" cy="49" r="4") */}
    <Path
      d="M61 43 L62.8 46.5 L66.5 47 L63.8 49.7 L64.5 53.5 L61 51.7 L57.5 53.5 L58.2 49.7 L55.5 47 L59.2 46.5 Z"
      fill="#4D96FF"
      strokeLinejoin="round"
    />

    {/* 3번 별 (기존 cx="49" cy="61" r="4") */}
    <Path
      d="M49 55 L50.8 58.5 L54.5 59 L51.8 61.7 L52.5 65.5 L49 63.7 L45.5 65.5 L46.2 61.7 L43.5 59 L47.2 58.5 Z"
      fill="#65B95B"
      strokeLinejoin="round"
    />

    {/* 반짝임 */}
    <Ellipse
      cx="39"
      cy="30"
      rx="6"
      ry="3"
      fill={WHITE}
      opacity={0.4}
      transform="rotate(-30 39 30)"
    />
  </Svg>
);

// ============================================================
// 💗 하트 목걸이
// ============================================================

export const HeartNecklace = ({ colorHex = "#F48FB1" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* --------------------------------------------------------
        목걸이 줄
    -------------------------------------------------------- */}
    <Path
      d="
        M22 18
        C25 34 32 45 50 50
        C68 45 75 34 78 18
      "
      fill="none"
      stroke="#D9A441"
      strokeWidth="3"
      strokeLinecap="round"
    />

    {/* 목걸이 줄의 작은 장식 */}
    {/* <Circle
      cx="22"
      cy="18"
      r="2.5"
      fill="#FFD166"
      stroke={OUTLINE}
      strokeWidth="1"
    />

    <Circle
      cx="78"
      cy="18"
      r="2.5"
      fill="#FFD166"
      stroke={OUTLINE}
      strokeWidth="1"
    /> */}

    {/* --------------------------------------------------------
        중앙 연결 고리
    -------------------------------------------------------- */}
    {/* <Circle
      cx="50"
      cy="49"
      r="5"
      fill="#FFD166"
      stroke={OUTLINE}
      strokeWidth="2"
    /> */}

    {/* --------------------------------------------------------
        하트 펜던트
    -------------------------------------------------------- */}
    <Path
      d="
        M50 78
        C47 75 29 63 29 52
        C29 43 39 39 46 46
        L50 50
        L54 46
        C61 39 71 43 71 52
        C71 63 53 75 50 78
        Z
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* 하트 안쪽 작은 하이라이트 */}
    <Path
      d="
        M39 50
        C40 47 43 46 46 49
      "
      fill="none"
      stroke={WHITE}
      strokeWidth="3"
      strokeLinecap="round"
      opacity={0.55}
    />

    {/* 하트 아래쪽 작은 반짝임 */}
    <Circle cx="61" cy="63" r="2.2" fill={WHITE} opacity={0.45} />
  </Svg>
);

// ============================================================
// ⭐ 별 목걸이
// ============================================================

export const StarNecklace = ({ colorHex = "#FFD166" }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    {/* --------------------------------------------------------
        목걸이 줄
    -------------------------------------------------------- */}
    {/* <Path
      d="
        M22 18
        C25 34 32 45 50 50
        C68 45 75 34 78 18
      "
      fill="none"
      stroke="#D9A441"
      strokeWidth="3"
      strokeLinecap="round"
    /> */}
    <Path
      d="
        M22 21
        C25 37 32 48 50 53
        C68 48 75 37 78 21
      "
      fill="none"
      stroke="#D9A441"
      strokeWidth="3"
      strokeLinecap="round"
    />

    {/* 양쪽 작은 구슬 */}
    {/* <Circle
      cx="22"
      cy="18"
      r="2.5"
      fill="#FFD166"
      stroke={OUTLINE}
      strokeWidth="1"
    />

    <Circle
      cx="78"
      cy="18"
      r="2.5"
      fill="#FFD166"
      stroke={OUTLINE}
      strokeWidth="1"
    /> */}

    {/* --------------------------------------------------------
        중앙 연결 고리
    -------------------------------------------------------- */}
    {/* <Circle
      cx="50"
      cy="49"
      r="5"
      fill="#FFD166"
      stroke={OUTLINE}
      strokeWidth="2"
    /> */}

    {/* --------------------------------------------------------
        별 펜던트
    -------------------------------------------------------- */}
    <Polygon
      points="
        50,55
        56,65
        68,67
        59,76
        61,88
        50,82
        39,88
        41,76
        32,67
        44,65
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />

    {/* --------------------------------------------------------
        별 중앙의 작은 반짝임
    -------------------------------------------------------- */}
    <Circle cx="50" cy="70" r="4" fill={WHITE} opacity={0.35} />

    {/* --------------------------------------------------------
        작은 반짝이 장식
    -------------------------------------------------------- */}
    <Path
      d="M28 48 L29.5 52 L33 53.5 L29.5 55 L28 59 L26.5 55 L23 53.5 L26.5 52 Z"
      fill="#FFD166"
      stroke={OUTLINE}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />

    <Path
      d="M73 48 L74.5 52 L78 53.5 L74.5 55 L73 59 L71.5 55 L68 53.5 L71.5 52 Z"
      fill="#FFD166"
      stroke={OUTLINE}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </Svg>
);

// ============================================================
// SVG REGISTRY
// ============================================================

export const SHAPE_ITEM_SVGS = {
  // Circle
  ball: Ball,
  tennisBall: TennisBall,
  baseball: Baseball,
  basketball: Basketball,
  tomato: Tomato,
  watermelon: Watermelon,
  cookie: Cookie,
  donut: Donut,
  button: Button,
  circleClock: CircleClock,
  wheel: Wheel,

  // Square
  book: Book,
  window: Window,
  calendar: Calendar,
  microwave: Microwave,
  pillow: Pillow,
  tv: Tv,
  giftBox: GiftBox,
  squareClock: SquareClock,
  sandwich: Sandwich,
  squareCakeSlice: SquareCakeSlice,
  squareSunglasses: SquareSunglasses,

  // Triangle
  pizzaSlice: PizzaSlice,
  watermelonSlice: WatermelonSlice,
  triangleInstrument: TriangleInstrument,
  partyHat: PartyHat,
  christmasTree: ChristmasTree,
  flag: Flag,
  triangleSandwich: TriangleSandwich,

  triangleKimbap: TriangleKimbap,
  pyramid: Pyramid,
  // triangleCakeSlice: TriangleCakeSlice,
  tent: Tent,

  // Heart
  heartCookie: HeartCookie,
  heartBalloon: HeartBalloon,
  heartGiftBox: HeartGiftBox,
  heartLollipop: HeartLollipop,
  heartPillow: HeartPillow,
  heartCake: HeartCake,

  // Star
  starCookie: StarCookie,
  starBalloon: StarBalloon,
  starGiftBox: StarGiftBox,
  starWand: StarWand,
  starPillow: StarPillow,
  starfish: Starfish,
  starSunglasses: StarSunglasses,

  ///////////////////////////추가
  // Circle
  lollipop: Lollipop,
  cake: Cake,
  circleGiftBox: CircleGiftBox,
  sunglasses: Sunglasses,
  // drum: Drum,

  // Square
  phone: Phone,
  switch: Switch,
  calculator: Calculator,
  remoteControl: RemoteControl,
  door: Door,
  bookshelf: Bookshelf,
  refrigerator: Refrigerator,
  laptop: Laptop,

  // Triangle
  mountain: Mountain,
  sailboat: Sailboat,
  triangleCookie: TriangleCookie,
  triangleBox: TriangleBox,

  // Heart
  heartButton: HeartButton,
  heartClock: HeartClock,
  heartSunglasses: HeartSunglasses,
  heartGem: HeartGem,
  heartNecklace: HeartNecklace,

  // Star
  starButton: StarButton,
  starClock: StarClock,
  starCake: StarCake,
  starOrnament: StarOrnament,
  starNecklace: StarNecklace,
} as const;

// ============================================================
// BASIC SHAPE SVG
// ============================================================

export const BasicCircle = ({ colorHex = DEFAULT_COLOR }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Circle
      cx="50"
      cy="50"
      r="32"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
  </Svg>
);

export const BasicSquare = ({ colorHex = DEFAULT_COLOR }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Rect
      x="18"
      y="18"
      width="64"
      height="64"
      rx="5"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
  </Svg>
);

export const BasicTriangle = ({ colorHex = DEFAULT_COLOR }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Polygon
      points="50,14 17,82 83,82"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
  </Svg>
);

export const BasicHeart = ({ colorHex = DEFAULT_COLOR }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Path
      d="
        M50 84
        C42 76 18 60 18 37
        C18 20 37 16 50 32
        C63 16 82 20 82 37
        C82 60 58 76 50 84
        Z
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
  </Svg>
);

export const BasicStar = ({ colorHex = DEFAULT_COLOR }: ItemSvgProps) => (
  <Svg width="95" height="95" viewBox="0 0 100 100">
    <Polygon
      points="
        50,10
        61,34
        87,37
        67,54
        73,81
        50,67
        27,81
        33,54
        13,37
        39,34
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
  </Svg>
);

// ============================================================
// BASIC SHAPE REGISTRY
// ============================================================

export const BASIC_SHAPE_SVGS = {
  basiccircle: BasicCircle,
  basicsquare: BasicSquare,
  basictriangle: BasicTriangle,
  basicheart: BasicHeart,
  basicstar: BasicStar,
} as const;

// ============================================================
// RENDER BASIC SHAPE
// ============================================================

const resolveColor = (colorHex?: string) => {
  if (!colorHex) {
    return undefined;
  }

  return COLOR_HEX_MAP[colorHex] ?? colorHex;
};
export const RenderBasicShapeSvg = ({
  shapeId,
  colorHex,
}: ItemSvgProps & { shapeId?: string }) => {
  const renderId = shapeId ? `basic${shapeId}` : undefined;

  const ShapeComponent = renderId
    ? BASIC_SHAPE_SVGS[renderId as keyof typeof BASIC_SHAPE_SVGS]
    : undefined;

  if (!ShapeComponent) {
    return null;
  }
  const resolvedColor = resolveColor(colorHex);

  return <ShapeComponent colorHex={resolvedColor} />;
};

// ============================================================
// RENDER ITEM
// ============================================================

export const RenderShapeItemSvg = ({
  itemId,
  colorHex,
}: ItemSvgProps & { itemId?: string }) => {
  const ItemComponent = itemId
    ? SHAPE_ITEM_SVGS[itemId as keyof typeof SHAPE_ITEM_SVGS]
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
