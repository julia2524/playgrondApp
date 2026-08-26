export const BASIC_COLORS = {
  BACKGROUND: "#F8F9FE", // 부드러운 배경 톤
  CARD: "#FFFFFF", // 깔끔한 카드/박스 배경
  PRIMARY: "#0FA6DD", // 메인 포인트 블루
  SECONDARY: "#7569E8", // 서브 퍼플/인디고
  SUCCESS: "#45B48B", // 성공/정답 초록
  ACCENT: "#FE9404", // 강조 주황/노랑
  TEXT: "#2C3E50", // 텍스트 진한 네이비/그레이
};

//어떤 색을 사용할 수 있는가

export const COLOR_POOL = ["red", "blue", "yellow", "green", "purple"] as const;

export type Color = (typeof COLOR_POOL)[number];

export const COLOR_NAMES: Record<string, string> = {
  red: "빨강",
  blue: "파랑",
  yellow: "노랑",
  green: "초록",
  purple: "보라",
};

// 1. 색상별 사물 풀(Pool) 정의
// 1. 비슷한 계열(유사 색상)끼리 더 촘촘하게 묶은 색상 그룹 정의
export const COLORS: Record<string, string> = {
  // 빨강 & 핑크 계열 — 색조를 확실히 벌림 (빨강→벽돌빛→코랄→마젠타핑크→파스텔핑크)
  red: "#F03E3E", // 선명한 빨강
  crimson: "#9A3412", // 어둡고 갈색 도는 벽돌빛 빨강 (red와 확실히 구분)
  coral: "#FF8787", // 밝은 코랄(주황 섞인 살구빛)
  pink: "#F06595", // 채도 높은 마젠타 핑크
  lightPink: "#FFD8E4", // 아주 옅은 파스텔 핑크

  // 파랑 & 하늘 & 남색 계열
  blue: "#1971C2", // 선명한 파랑
  navy: "#1A2B4C", // 거의 검정에 가까운 남색 (blue와 명도 차 크게)
  skyblue: "#4DABF7", // 밝고 채도 높은 하늘색
  lightBlue: "#BFE3FF", // 아주 옅은 하늘색

  // 초록 & 연두 & 민트 계열
  green: "#2F9E44", // 진한 잔디초록
  lime: "#B0D817", // 확실히 노란빛 강한 연두
  lightGreen: "#D3F9D8", // 아주 옅은 파스텔 초록 (lime과 명도 크게 차이)
  mint: "#20C997", // 초록 쪽으로 치우친 민트
  teal: "#0B7285", // 파랑 쪽으로 치우친 청록 (mint와 색조 방향을 반대로 벌림)

  // 보라 & 연보라 계열
  purple: "#AE3EC9", // 핑크 쪽으로 치우친 보라 (마젠타 느낌)
  violet: "#5F3DC4", // 파랑 쪽으로 치우친 보라 (남색에 가까움)
  lavender: "#E5DBFF", // 아주 옅은 연보라
  plum: "#8E4585", // 자두색 — violet보다 붉은기 강한 보라

  // 노랑 & 주황 계열
  yellow: "#F9C80E", // 선명한 노랑
  lightYellow: "#FFF3BF", // 아주 옅은 노랑
  orange: "#E8590C", // 빨강에 가까운 진한 주황 (yellow와 확실히 구분)
  peach: "#FFDCB4", // 아주 옅은 살구빛

  // 갈색 계열
  brown: "#5C3A21", // 짙은 커피색
  chocolateBrown: "#7B341E", // 붉은기 도는 초콜릿색 (brown보다 붉고 살짝 밝음)
  lightBrown: "#C89666", // 밝은 카멜색
  tan: "#E8C9A0", // 아주 밝은 베이지 황토색 (lightBrown보다 더 밝고 노란빛)

  // 무채색 (원색군에 포함)
  black: "#1A1A1A", // 완전한 검정보다 살짝 부드러운 다크그레이블랙 (눈부심 방지)
  white: "#FFFFFF",
};
// 실제 색상(COLORS)을 유아용 은은한 배경색으로 변환
export const SOFT_COLORS: Record<string, string> = {
  // --------------------------------------------------
  // 기본 색상
  // --------------------------------------------------
  red: "#FEF2F2",
  blue: "#EFF6FF",
  yellow: "#FEFCE8",
  green: "#F0FDF4",
  purple: "#FAF5FF",

  // --------------------------------------------------
  // 추가 색상
  // --------------------------------------------------
  pink: "#FDF2F8",
  orange: "#FFF7ED",
  brown: "#F5E6D3",

  // --------------------------------------------------
  // 빨강 계열
  // --------------------------------------------------
  crimson: "#FCE7E3",
  coral: "#FFF1F2",
  lightPink: "#FFF0F6",

  // --------------------------------------------------
  // 파랑 계열
  // --------------------------------------------------
  navy: "#E8EEF7",
  skyblue: "#F0F9FF",
  lightBlue: "#EFF8FF",

  // --------------------------------------------------
  // 초록 계열
  // --------------------------------------------------
  lime: "#F7FDDC",
  lightGreen: "#F0FDF4",
  mint: "#ECFDF8",
  teal: "#E8FAFA",

  // --------------------------------------------------
  // 보라 계열
  // --------------------------------------------------
  violet: "#F3F0FF",
  lavender: "#F5F3FF",
  plum: "#F8EDF7",

  // --------------------------------------------------
  // 노랑 / 주황 계열
  // --------------------------------------------------
  lightYellow: "#FFFBEA",
  peach: "#FFF4E8",

  // --------------------------------------------------
  // 갈색 계열
  // --------------------------------------------------
  chocolateBrown: "#F4E5D8",
  lightBrown: "#F7EDE2",
  tan: "#FAF3E8",

  // --------------------------------------------------
  // 무채색
  // --------------------------------------------------
  black: "#F1F3F5",
  white: "#F8FAFC",
};

// --------------------------------------------------
// 티어 1: 원색 (Level 1~2)
// 아이가 가장 먼저 배우는, 서로 절대 안 헷갈리는 기본 4색
// --------------------------------------------------
export const PRIMARY_COLORS = [
  "red",
  "blue",
  "yellow",
  "green",
  "black",
  "white",
];

// --------------------------------------------------
// 티어 2: 원색 이외의 새로운 색 (Level 3)
// 원색과는 확실히 구분되지만, 서로도 색조가 크게 다른 색들
// --------------------------------------------------
export const SECONDARY_COLORS = ["purple", "orange", "pink", "brown"];

// --------------------------------------------------
// 티어 3: 헷갈리는 유사 색상 계열 (Level 4~5)
// 같은 계열 안에서 정답/오답을 뽑아 변별력을 요구하는 그룹
// --------------------------------------------------
export const SIMILAR_COLOR_FAMILIES = {
  pinkRedFamily: ["pink", "lightPink", "red", "crimson"], // 의도: 분홍 vs 빨강, 연분홍 vs 진분홍처럼 "붉은 계열 안에서" 헷갈리게
  blueSkyFamily: ["blue", "skyblue", "lightBlue", "navy"], // 의도: 파랑 vs 하늘색, 파랑 vs 남색처럼 "밝기 차이"로 헷갈리게
  greenLimeFamily: ["green", "lime", "lightGreen", "mint"], // 의도: 초록 vs 연두, 초록 vs 민트처럼 "색조가 살짝 다른" 초록 계열
  purpleFamily: ["purple", "violet", "lavender", "plum"], // 의도: 보라 vs 연보라 (채도/명도 차이)
  orangeFamily: ["orange", "peach", "coral", "yellow"], // 의도: 주황 vs 살구색, 주황 vs 노랑처럼 "따뜻한 색" 안에서 헷갈리게
  brownFamily: ["brown", "chocolateBrown", "lightBrown", "tan"], // 의도: 갈색 vs 밝은 갈색 (명도 차이)
};

export type ShapeDefinition = {
  id: string; // ItemSvg 컴포넌트 키와 매칭
  label: string; // 화면에 표시할 한글 이름
};
export const SHAPE_POOL: ShapeDefinition[] = [
  { id: "apple", label: "사과" },
  { id: "strawberry", label: "딸기" },
  { id: "balloon", label: "풍선" },
  { id: "fireTruck", label: "소방차" },
  { id: "cherry", label: "체리" },
  { id: "fish", label: "물고기" },
  { id: "blueberry", label: "블루베리" },
  { id: "umbrella", label: "우산" },
  { id: "whale", label: "고래" },
  { id: "milk", label: "우유" },
  { id: "banana", label: "바나나" },
  { id: "lemon", label: "레몬" },
  { id: "chick", label: "병아리" },
  { id: "sunflower", label: "해바라기" },
  { id: "star", label: "별" },
  { id: "tree", label: "나무" },
  { id: "broccoli", label: "브로콜리" },
  { id: "crocodile", label: "악어" },
  { id: "peas", label: "완두콩" },
  { id: "cactus", label: "선인장" },
  { id: "crow", label: "까마귀" },
  { id: "cat", label: "고양이" },
  { id: "charcoal", label: "숯" },
  { id: "cloud", label: "구름" },
  { id: "snowman", label: "눈사람" },
  { id: "rabbit", label: "토끼" },
  { id: "cottonCandy", label: "솜사탕" },
];

// 2. 색상별 사물 이름 풀 (색상 키와 매칭)
export const COLOR_ITEM_POOL: Record<string, string[]> = {
  red: ["빨간 사과", "딸기", "빨간 풍선", "소방차", "체리"],
  pink: ["분홍 토끼", "복숭아", "발레복", "분홍 튤립", "솜사탕"],
  coral: ["코랄 조개", "자몽", "홍학", "연어 초밥", "장미꽃"],
  blue: ["파란 물고기", "블루베리", "파란 우산", "고래", "파란 바지"],
  skyblue: ["하늘색 새", "구름", "소라 껍데기", "풍선껌", "물방울"],
  navy: ["남색 교복", "밤하늘", "블루베리 잼", "남색 고래", "우주선"],
  green: ["초록 나무", "브로콜리", "악어", "완두콩", "선인장"],
  lime: ["연두색 잎사귀", "아보카도", "청포도", "풋사과", "피망"],
  mint: ["민트 아이스크림", "치약", "선인장 화분", "민트 사탕", "네잎클로버"],
  purple: ["포도", "가지", "보라 왕관", "고구마", "보라 나비"],
  violet: ["제비꽃", "라벤더", "포도젤리", "보라색 조개", "아네모네"],
  orange: ["오렌지", "당근", "농구공", "감", "주황 우산"],
  yellow: ["바나나", "레몬", "병아리", "해바라기", "노란 별"],
  brown: ["도토리", "초콜릿", "곰돌이 인형", "갈색 나뭇가지", "식빵"],
  chocolateBrown: ["초코케이크", "다크초콜릿", "밤", "코코아", "진한 커피"],
  lightBrown: ["카라멜", "곰돌이 쿠키", "밤색 머리끈", "라떼", "황토색 강아지"],
  tan: ["카스텔라", "비스킷", "모래성", "황토빛 강아지", "누룽지"],
  crimson: ["잘 익은 체리", "진한 장미", "빨간 딸기잼", "루비", "붉은 벽돌"],
  lightPink: [
    "벚꽃",
    "솜사탕",
    "복숭아 아이스크림",
    "분홍 리본",
    "핑크 마카롱",
  ],
  lightBlue: ["아기 이불", "물방울", "청록 조약돌", "하늘색 풍선", "민트초코"],
  lightGreen: ["새싹", "청포도", "여름 나뭇잎", "라임 젤리", "풀잎"],
  teal: ["공작새 깃털", "청록 보석", "열대어", "청록 리본", "민트잎"],
  lavender: [
    "라벤더 꽃",
    "보라 젤리빈",
    "연보라 풍선",
    "자수정",
    "포도맛 사탕",
  ],
  lightYellow: [
    "병아리 솜털",
    "레몬 셔벗",
    "옅은 해바라기",
    "버터",
    "바닐라 아이스크림",
  ],
  peach: ["복숭아", "살구", "연어살", "살구잼", "핑크빛 노을"],
  plum: ["자두", "가지", "보라 포도", "자수정", "보라 양파"],
  black: ["까마귀", "검은 고양이", "숯", "타이어", "검은 우산"],
  white: ["구름", "눈사람", "우유", "흰 토끼", "솜사탕"],
};
// 2. 모양별 사물 풀(Pool) 정의
export const SHAPE_ITEM_POOL: Record<string, string[]> = {
  square: ["네모 쿠키", "책", "네모 딱지", "창문", "선물 상자"],
  circle: ["단추", "수박", "도넛", "공", "동전"],
  triangle: ["샌드위치", "삼각김밥", "산", "깃발", "피자 조각"],
  heart: ["하트 풍선", "하트 사탕", "하트 쿠션", "하트 장식", "하트 카드"],
  star: ["별 쿠키", "별 스티커", "별 장식", "별 모양 풍선", "별 배지"],
};
