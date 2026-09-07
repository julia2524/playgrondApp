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

// SHAPE_NAMES
export const SHAPE_NAMES: Record<string, string> = {
  circle: "동그라미",
  square: "네모",
  triangle: "세모",
  heart: "하트",
  star: "별",
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
      "ball",
      "tomato",
      "watermelon",
      "cookie",
      "donut",
      "donut1",
      "button1",
      "button2",
      "circleClock",
      "wheel",
      "lollipop",
      "cake",
      "sunglasses",
      "basketball",
      "baseball",
      "tennisBall",
      "plate",
      "fullMoon",
      "orange",
      "roundBalloon",
      "sun",
    ],
  },
  {
    id: "square",
    label: "네모",
    matchItemIds: [
      "envelop",
      "cheese",
      "chocolateBar",
      "box",
      "book",
      "window",
      "window1",
      "calendar",
      "bread",
      "microwave",
      "pillow",
      "tv",
      "giftBox",
      "giftBox1",
      "squareClock",
      "door",
      "bookshelf",
      "refrigerator",
      "laptop",
      "calculator",
      "squareCakeSlice",
      "sandwich",
      "squareSunglasses",
      "phone",
      "remoteControl",
      "switch",
      "frame",
    ],
  },
  {
    id: "triangle",
    label: "세모",
    matchItemIds: [
      "ruller",
      "triangleInstrument",
      "partyHat",
      "christmasTree",
      "flag",
      "triangleSandwich",
      "triangleKimbap",
      "pyramid",
      "tent",
      "mountain",
      "sailboat",
      "triangleCookie",
      "watermelonSlice",
      "pizzaSlice",
    ],
  },
  {
    id: "heart",
    label: "하트",
    matchItemIds: [
      "heartCookie",
      "heartBalloon",
      "heartLollipop",
      "heartPillow",
      "heartCake",
      "heartButton",
      "heartClock",
      "heartSunglasses",
      "heartGem",
      "heartNecklace",
    ],
  },
  {
    id: "star",
    label: "별",
    matchItemIds: [
      "starCookie",
      "starBalloon",
      "starBalloon1",
      "starWand",
      "starPillow",
      "starfish",
      "starButton",
      "starClock",
      "starCake",
      "starOrnament",
      "starSunglasses",
      "starNecklace",
      "medal",
    ],
  },
];

/**
 * 실제 SVG renderer에서 사용하는 itemId와 반드시 동일하게 맞춰야 한다.
 * 자연스러운 기본 색상은 여기서 관리하지 않는다.natural일 경우 SVG가 자기 기본 색상을 사용한다.
 */
export const SHAPE_ITEM_POOL: ShapeItem[] = [
  // ==================================================
  // CIRCLE
  // ==================================================
  { id: "ball", label: "공", shapeId: "circle" },
  { id: "tomato", label: "토마토", shapeId: "circle" },
  { id: "watermelon", label: "수박", shapeId: "circle" },
  { id: "cookie", label: "쿠키", shapeId: "circle" },
  { id: "donut", label: "도넛", shapeId: "circle" },
  { id: "donut1", label: "도넛", shapeId: "circle" },
  { id: "button1", label: "단추", shapeId: "circle" },
  { id: "button2", label: "단추", shapeId: "circle" },
  { id: "circleClock", label: "동그란 시계", shapeId: "circle" },
  { id: "wheel", label: "바퀴", shapeId: "circle" },
  { id: "lollipop", label: "막대사탕", shapeId: "circle" },
  { id: "cake", label: "케이크", shapeId: "circle" },

  { id: "sunglasses", label: "선글라스", shapeId: "circle" },
  { id: "basketball", label: "농구공", shapeId: "circle" },
  { id: "baseball", label: "야구공", shapeId: "circle" },
  { id: "tennisBall", label: "테니스공", shapeId: "circle" },
  { id: "plate", label: "접시", shapeId: "circle" },
  { id: "fullMoon", label: "보름달", shapeId: "circle" },
  { id: "orange", label: "오렌지", shapeId: "circle" },
  { id: "roundBalloon", label: "풍선", shapeId: "circle" },
  { id: "sun", label: "해", shapeId: "circle" },

  // ==================================================
  // SQUARE
  // ==================================================
  { id: "envelop", label: "편지봉투", shapeId: "square" },
  { id: "cheese", label: "치즈", shapeId: "square" },
  { id: "chocolateBar", label: "초콜릿", shapeId: "square" },

  { id: "box", label: "상자", shapeId: "square" },
  { id: "book", label: "책", shapeId: "square" },
  { id: "window", label: "창문", shapeId: "square" },
  { id: "window1", label: "창문", shapeId: "square" },
  { id: "calendar", label: "달력", shapeId: "square" },
  { id: "bread", label: "식빵", shapeId: "square" },
  { id: "microwave", label: "전자레인지", shapeId: "square" },
  { id: "pillow", label: "쿠션", shapeId: "square" },
  { id: "tv", label: "텔레비전", shapeId: "square" },
  { id: "giftBox", label: "선물상자", shapeId: "square" },
  { id: "giftBox1", label: "선물상자", shapeId: "square" },
  { id: "squareClock", label: "네모 시계", shapeId: "square" },
  { id: "door", label: "문", shapeId: "square" },
  { id: "bookshelf", label: "책장", shapeId: "square" },
  { id: "refrigerator", label: "냉장고", shapeId: "square" },
  { id: "laptop", label: "노트북", shapeId: "square" },
  { id: "calculator", label: "계산기", shapeId: "square" },
  { id: "squareCakeSlice", label: "조각케이크", shapeId: "square" },
  { id: "sandwich", label: "샌드위치", shapeId: "square" },
  { id: "squareSunglasses", label: "사각 선글라스", shapeId: "square" },
  { id: "phone", label: "휴대폰", shapeId: "square" },
  { id: "remoteControl", label: "리모콘", shapeId: "square" },
  { id: "switch", label: "스위치", shapeId: "square" },
  { id: "frame", label: "액자", shapeId: "square" },

  // ==================================================
  // TRIANGLE
  // ==================================================
  { id: "ruller", label: "삼각자", shapeId: "triangle" },
  { id: "triangleInstrument", label: "트라이앵글", shapeId: "triangle" },
  { id: "partyHat", label: "파티모자", shapeId: "triangle" },
  { id: "christmasTree", label: "크리스마스 트리", shapeId: "triangle" },
  { id: "flag", label: "삼각 깃발", shapeId: "triangle" },
  { id: "triangleSandwich", label: "샌드위치", shapeId: "triangle" },
  { id: "triangleKimbap", label: "삼각김밥", shapeId: "triangle" },
  // { id: "triangleCakeSlice", label: "조각케익", shapeId: "triangle" },
  { id: "pyramid", label: "피라미드", shapeId: "triangle" },
  { id: "tent", label: "텐트", shapeId: "triangle" },
  { id: "mountain", label: "산", shapeId: "triangle" },
  { id: "sailboat", label: "범선", shapeId: "triangle" },
  { id: "triangleCookie", label: "세모 쿠키", shapeId: "triangle" },
  { id: "watermelonSlice", label: "수박 조각", shapeId: "triangle" },
  { id: "pizzaSlice", label: "피자 조각", shapeId: "triangle" },

  // ==================================================
  // HEART
  // ==================================================
  { id: "heartCookie", label: "하트 쿠키", shapeId: "heart" },
  { id: "heartBalloon", label: "하트 풍선", shapeId: "heart" },
  { id: "heartLollipop", label: "하트 사탕", shapeId: "heart" },
  { id: "heartPillow", label: "하트 쿠션", shapeId: "heart" },
  { id: "heartCake", label: "하트 케이크", shapeId: "heart" },
  { id: "heartButton", label: "하트 단추", shapeId: "heart" },
  { id: "heartClock", label: "하트 시계", shapeId: "heart" },
  { id: "heartSunglasses", label: "하트 선글라스", shapeId: "heart" },
  { id: "heartGem", label: "하트 보석", shapeId: "heart" },

  { id: "heartNecklace", label: "하트 목걸이", shapeId: "heart" },

  // ==================================================
  // STAR
  // ==================================================
  { id: "starCookie", label: "별 쿠키", shapeId: "star" },
  { id: "starBalloon", label: "별 풍선", shapeId: "star" },
  { id: "starBalloon1", label: "별 풍선", shapeId: "star" },

  { id: "starWand", label: "요술봉", shapeId: "star" },
  { id: "starPillow", label: "별 쿠션", shapeId: "star" },
  { id: "starfish", label: "불가사리", shapeId: "star" },
  { id: "starButton", label: "별 단추", shapeId: "star" },
  { id: "starClock", label: "별 시계", shapeId: "star" },
  { id: "starCake", label: "별 케이크", shapeId: "star" },
  { id: "starOrnament", label: "별 장식", shapeId: "star" },
  { id: "starSunglasses", label: "별 선글라스", shapeId: "star" },
  { id: "starNecklace", label: "별 목걸이", shapeId: "star" },
  { id: "medal", label: "메달", shapeId: "star" },
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
