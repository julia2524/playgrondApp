//"어떤 도형/사물이 존재하는가?"
export type ShapeDefinition = {
  id: string;
  label: string;
  matchItemIds: string[];
};

export type ShapeItem = {
  id: string;
  label: string;
  shapeId: string;
};

// --------------------------------------------------
// 티어 0: 초초보 (만 1세 ~ 2세 초반)
// 사물 형태가 가장 단순하고 명확한 기본형
// --------------------------------------------------
export const BABY_SHAPES: ShapeDefinition[] = [
  {
    id: "circle",
    label: "동그라미",
    matchItemIds: [
      "basiccircle",
      "ball", // "공",
      "wheel", //"바퀴",
      "clock", //"시계",
      "plate", //"접시",
      "cookie", //"쿠키",
      "button", //"단추",
      "fullMoon", // "보름달",
    ],
  },

  {
    id: "square",
    label: "네모",
    matchItemIds: [
      "basicsquare",
      "box", // "상자",
      "block", // "블록",
      "window", // "창문",
      "bread", // "식빵",
      "frame", // "액자",
      "giftBox", // "선물상자",
      "tile", // "타일",
    ],
  },

  {
    id: "triangle",
    label: "세모",
    matchItemIds: [
      "basictriangle",
      "triangleRiceBall", //   "삼각김밥",
      "cakeSlice", //      "조각케이크",
      "roof", //      "지붕",
      "pizzaSlice", //      "피자 한 조각",
      "mountain", //      "산",
      "partyHat", //      "파티모자",
    ],
  },

  {
    id: "heart",
    label: "하트",
    matchItemIds: [
      "basicheart",
      "heartCookie", //  "하트 쿠키",
      "heartBalloon", //      "하트 풍선",
      "heartGlasses", //      "하트 안경",
      "heartChocolate", //      "하트 초콜릿",
    ],
  },

  {
    id: "star",
    label: "별",
    matchItemIds: [
      "basicstar",
      "starSticker", //  "별 스티커",
      "magicWand", //      "요술봉",
      "starfish", //      "불가사리",
      "starCandy", //      "별사탕",
      "nightStar", //      "밤하늘 별",
    ],
  },
];

/**
 * 실제 SVG renderer에서 사용하는 itemId와
 * 반드시 동일하게 맞춰야 한다.
 *
 * 자연스러운 기본 색상은 여기서 관리하지 않는다.
 * natural일 경우 SVG가 자기 기본 색상을 사용한다.
 */

export const SHAPE_ITEM_POOL: ShapeItem[] = [
  // 🔵 동그라미
  { id: "ball", label: "공", shapeId: "circle" },
  { id: "wheel", label: "바퀴", shapeId: "circle" },
  { id: "clock", label: "시계", shapeId: "circle" },
  { id: "plate", label: "접시", shapeId: "circle" },
  { id: "cookie", label: "쿠키", shapeId: "circle" },
  { id: "button", label: "단추", shapeId: "circle" },
  { id: "fullMoon", label: "보름달", shapeId: "circle" },

  // 🟦 네모
  { id: "box", label: "상자", shapeId: "square" },
  { id: "block", label: "블록", shapeId: "square" },
  { id: "window", label: "창문", shapeId: "square" },
  { id: "bread", label: "식빵", shapeId: "square" },
  { id: "frame", label: "액자", shapeId: "square" },
  { id: "giftBox", label: "선물상자", shapeId: "square" },
  { id: "tile", label: "타일", shapeId: "square" },

  // 🔺 세모
  { id: "triangleRiceBall", label: "삼각김밥", shapeId: "triangle" },
  { id: "cakeSlice", label: "조각케이크", shapeId: "triangle" },
  { id: "roof", label: "지붕", shapeId: "triangle" },
  { id: "pizzaSlice", label: "피자 한 조각", shapeId: "triangle" },
  { id: "mountain", label: "산", shapeId: "triangle" },
  { id: "partyHat", label: "파티모자", shapeId: "triangle" },

  // ❤️ 하트
  { id: "heartCookie", label: "하트 쿠키", shapeId: "heart" },
  { id: "heartBalloon", label: "하트 풍선", shapeId: "heart" },
  { id: "heartGlasses", label: "하트 안경", shapeId: "heart" },
  { id: "heartChocolate", label: "하트 초콜릿", shapeId: "heart" },

  // ⭐ 별
  { id: "starSticker", label: "별 스티커", shapeId: "star" },
  { id: "magicWand", label: "요술봉", shapeId: "star" },
  { id: "starfish", label: "불가사리", shapeId: "star" },
  { id: "starCandy", label: "별사탕", shapeId: "star" },
  { id: "nightStar", label: "밤하늘 별", shapeId: "star" },
];
export type ShapeId = "circle" | "square" | "triangle" | "heart" | "star";
export const getShapeDefinition = (shapeId: ShapeId): ShapeDefinition => {
  const shape = BABY_SHAPES.find((item) => item.id === shapeId);

  if (!shape) {
    throw new Error(`Unknown shapeId: ${shapeId}`);
  }

  return shape;
};

export const getShapeItems = (shapeId: ShapeId): ShapeItem[] => {
  return SHAPE_ITEM_POOL.filter((item) => item.shapeId === shapeId);
};

// --------------------------------------------------
// 티어 1: 기본형 (만 2세 ~ 3세 초반)
// 아이들이 주변에서 흔히 보고 확실히 구분하는 사물들
// --------------------------------------------------
export const PRIMARY_SHAPES = [
  ...BABY_SHAPES,
  {
    id: "heart",
    label: "하트",
    matchItems: ["하트 쿠키", "하트 풍선", "하트 안경", "하트 초콜릿"],
  },
  {
    id: "star",
    label: "별",
    matchItems: ["별 스티커", "요술봉", "불가사리", "별사탕", "밤하늘 별"],
  },
];

// --------------------------------------------------
// 티어 2: 조금 확장 (만 3세 ~ 4세)
// 사물로 매칭했을 때 실루엣이 직관적인 것들
// --------------------------------------------------
export const SECONDARY_SHAPES = [
  {
    id: "rectangle",
    label: "긴네모",
    matchItems: ["문", "책", "스마트폰", "연필", "버스", "냉장고"],
  },
  {
    id: "oval",
    label: "길쭉한 동그라미",
    matchItems: ["달걀", "수박", "럭비공", "거울", "포도알"],
  },
  {
    id: "semicircle",
    label: "반원",
    matchItems: ["반달", "모자", "터널", "수박 조각", "아기 침대"],
  },
  {
    id: "crescent",
    label: "초승달",
    matchItems: ["바나나", "초승달", "크루아상", "나뭇잎"],
  },
  {
    id: "cross",
    label: "십자가",
    matchItems: ["구급상자 표시", "반창고", "더하기", "십자 드라이버"],
  },
  {
    id: "diamond",
    label: "다이아몬드",
    matchItems: ["보석", "연", "마름모 표지판", "다이아몬드 반지"],
  },
  {
    id: "arrow",
    label: "화살표",
    matchItems: ["길 안내 표지판", "화살표 버튼", "방향 표시"],
  },
  {
    id: "cloud",
    label: "구름",
    matchItems: ["뭉게구름", "목욕 거품", "솜사탕", "구름 쿠션"],
  },
  {
    id: "flower",
    label: "꽃",
    matchItems: ["꽃", "데이지", "해바라기", "꽃 모양 쿠키"],
  },
];

// --------------------------------------------------
// 티어 3: 응용형 (만 4세 ~ 5세)
// 사물화하기 조금 더 디테일이 필요한 형태들
// --------------------------------------------------
export const VARIABLE_SHAPES = [
  {
    id: "pentagon",
    label: "오각형",
    matchItems: ["오각형 집", "야구 홈베이스", "오각형 보석"],
  },
  {
    id: "hexagon",
    label: "육각형",
    matchItems: ["벌집", "육각 너트", "거북이 등껍질"],
  },
  {
    id: "trapezoid",
    label: "사다리꼴",
    matchItems: ["가방", "램프갓", "치마", "사다리꼴 지붕"],
  },
  {
    id: "parallelogram",
    label: "평행사변형",
    matchItems: ["기울어진 상자", "평행사변형 블록"],
  },
  {
    id: "rhombus",
    label: "마름모",
    matchItems: ["마름모 표지판", "다이아몬드 무늬", "마름모 쿠션"],
  },
  {
    id: "rightTriangle",
    label: "직각삼각형",
    matchItems: ["삼각자", "피자 조각", "직각 지붕"],
  },
  {
    id: "octagon",
    label: "팔각형",
    matchItems: ["정지 표지판", "팔각 거울", "팔각 상자"],
  },
  {
    id: "ring",
    label: "도넛",
    matchItems: ["도넛", "반지", "구명튜브", "수영 튜브"],
  },
  {
    id: "teardrop",
    label: "물방울",
    matchItems: ["물방울", "눈물", "빗방울", "아보카도"],
  },
];

// --------------------------------------------------
// 전체 도형 및 사물 통합
// --------------------------------------------------
export const ALL_SHAPES = [
  ...PRIMARY_SHAPES,
  ...SECONDARY_SHAPES,
  ...VARIABLE_SHAPES,
];
