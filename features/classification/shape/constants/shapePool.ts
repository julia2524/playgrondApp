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
  description: string;
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

export const BASIC_SHAPE_LIST = [
  { id: "circle", name: "동그라미" },
  { id: "square", name: "네모" },
  { id: "triangle", name: "세모" },
  { id: "heart", name: "하트" },
  { id: "star", name: "별" },
];
export const SHAPE_ITEM_POOL: ShapeItem[] = [
  // ==================================================
  // CIRCLE
  // ==================================================

  {
    id: "ball",
    label: "공",
    shapeId: "circle",
    description: "데굴데굴 굴러가는 공이에요! 어떤 공을 만들어 볼까요?",
  },

  {
    id: "tomato",
    label: "토마토",
    shapeId: "circle",
    description: "동글동글 빨간 토마토가 쏙! 맛있는 토마토를 만들어 볼까요?",
  },

  {
    id: "watermelon",
    label: "수박",
    shapeId: "circle",
    description: "동글동글 시원한 수박이에요! 한입 베어 물고 싶지 않나요?",
  },

  {
    id: "cookie",
    label: "쿠키",
    shapeId: "circle",
    description: "바삭바삭 맛있는 쿠키예요! 어떤 모양의 쿠키가 제일 좋아요?",
  },

  {
    id: "donut",
    label: "도넛",
    shapeId: "circle",
    description: "가운데가 뽕 뚫린 달콤한 도넛이에요! 어떤 도넛을 먹어볼까요?",
  },

  {
    id: "donut1",
    label: "도넛",
    shapeId: "circle",
    description: "동글동글 달콤한 도넛이 또 나타났어요! 알록달록 꾸며볼까요?",
  },

  {
    id: "button1",
    label: "단추",
    shapeId: "circle",
    description:
      "옷에 꼭 붙어 있는 동그란 단추예요! 내 옷에는 어떤 단추가 있을까요?",
  },

  {
    id: "button2",
    label: "단추",
    shapeId: "circle",
    description: "동글동글 귀여운 단추예요! 어떤 색 옷에 달아볼까요?",
  },

  {
    id: "circleClock",
    label: "동그란 시계",
    shapeId: "circle",
    description: "똑딱똑딱! 동그란 시계가 지금 몇 시인지 알려주고 있어요.",
  },

  {
    id: "wheel",
    label: "바퀴",
    shapeId: "circle",
    description: "데굴데굴 굴러가는 바퀴예요! 이 바퀴는 어디에 달려 있을까요?",
  },

  {
    id: "lollipop",
    label: "막대사탕",
    shapeId: "circle",
    description: "달콤한 막대사탕이 짠! 어떤 맛의 사탕처럼 보이나요?",
  },

  {
    id: "cake",
    label: "케이크",
    shapeId: "circle",
    description: "맛있는 케이크가 동글동글! 어떤 케이크를 만들어 볼까요?",
  },

  {
    id: "sunglasses",
    label: "선글라스",
    shapeId: "circle",
    description: "햇빛을 쏙 가려주는 멋진 선글라스예요! 누가 써볼까요?",
  },

  {
    id: "basketball",
    label: "농구공",
    shapeId: "circle",
    description: "통통 튀는 농구공이에요! 골대에 슛! 넣어볼까요?",
  },

  {
    id: "baseball",
    label: "야구공",
    shapeId: "circle",
    description: "힘껏 휙! 날아가는 야구공이에요. 누가 멋지게 쳐볼까요?",
  },

  {
    id: "tennisBall",
    label: "테니스공",
    shapeId: "circle",
    description: "통통! 튀어 오르는 테니스공이에요. 어디까지 날아갈까요?",
  },

  {
    id: "plate",
    label: "접시",
    shapeId: "circle",
    description: "동그란 접시가 준비됐어요! 접시에 맛있는 음식을 담아볼까요?",
  },

  {
    id: "fullMoon",
    label: "보름달",
    shapeId: "circle",
    description: "둥근 보름달이 밤하늘에 두둥실! 달님에게 인사해 볼까요?",
  },

  {
    id: "orange",
    label: "오렌지",
    shapeId: "circle",
    description: "상큼하고 달콤한 오렌지예요! 톡 하고 껍질을 벗겨볼까요?",
  },

  {
    id: "roundBalloon",
    label: "풍선",
    shapeId: "circle",
    description: "둥실둥실 동그란 풍선이 날아가요! 어디까지 올라갈까요?",
  },

  {
    id: "sun",
    label: "해",
    shapeId: "circle",
    description: "반짝반짝 빛나는 해가 떴어요! 오늘도 따뜻하게 비춰줄까요?",
  },

  // ==================================================
  // SQUARE
  // ==================================================

  {
    id: "envelop",
    label: "편지봉투",
    shapeId: "square",
    description:
      "소중한 마음을 담아 보내는 편지봉투예요! 누구에게 편지를 써볼까요?",
  },

  {
    id: "cheese",
    label: "치즈",
    shapeId: "square",
    description: "쭉쭉 늘어나는 맛있는 치즈예요! 한 조각 냠냠 먹어볼까요?",
  },

  {
    id: "chocolateBar",
    label: "초콜릿",
    shapeId: "square",
    description: "달콤한 초콜릿 한 조각! 몇 조각을 냠냠 먹어볼까요?",
  },

  {
    id: "box",
    label: "상자",
    shapeId: "square",
    description: "무엇이 들어 있을까요? 두근두근 상자를 열어볼까요?",
  },

  {
    id: "book",
    label: "책",
    shapeId: "square",
    description:
      "재미있는 이야기가 가득한 책이에요! 어떤 이야기가 숨어 있을까요?",
  },

  {
    id: "window",
    label: "창문",
    shapeId: "square",
    description: "창문 밖으로 무엇이 보이나요? 살짝 들여다볼까요?",
  },

  {
    id: "window1",
    label: "창문",
    shapeId: "square",
    description: "네모난 창문이 활짝 열렸어요! 창밖에는 무엇이 있을까요?",
  },

  {
    id: "calendar",
    label: "달력",
    shapeId: "square",
    description: "오늘은 며칠일까요? 달력에서 오늘 날짜를 찾아볼까요?",
  },

  {
    id: "bread",
    label: "식빵",
    shapeId: "square",
    description: "폭신폭신 고소한 식빵이에요! 한 조각 냠냠 먹어볼까요?",
  },

  {
    id: "microwave",
    label: "전자레인지",
    shapeId: "square",
    description: "윙윙! 맛있는 음식을 따뜻하게 데워주는 전자레인지예요.",
  },

  {
    id: "pillow",
    label: "쿠션",
    shapeId: "square",
    description: "폭신폭신 편안한 쿠션이에요! 포근하게 안아볼까요?",
  },

  {
    id: "tv",
    label: "텔레비전",
    shapeId: "square",
    description: "재미있는 이야기가 나오는 텔레비전이에요! 무엇을 보고 싶나요?",
  },

  {
    id: "giftBox",
    label: "선물상자",
    shapeId: "square",
    description: "두근두근! 예쁜 선물상자 안에는 무엇이 들어 있을까요?",
  },

  {
    id: "giftBox1",
    label: "선물상자",
    shapeId: "square",
    description: "짜잔! 선물상자가 도착했어요. 얼른 열어보고 싶지 않나요?",
  },

  {
    id: "squareClock",
    label: "네모 시계",
    shapeId: "square",
    description: "똑딱똑딱! 네모난 시계가 시간을 알려주고 있어요.",
  },

  {
    id: "door",
    label: "문",
    shapeId: "square",
    description: "문 뒤에는 무엇이 있을까요? 살짝 열어볼까요?",
  },

  {
    id: "bookshelf",
    label: "책장",
    shapeId: "square",
    description: "책이 차곡차곡 모여 있는 책장이에요! 어떤 책을 골라볼까요?",
  },

  {
    id: "refrigerator",
    label: "냉장고",
    shapeId: "square",
    description: "시원한 음식들이 가득한 냉장고예요! 안에는 무엇이 있을까요?",
  },

  {
    id: "laptop",
    label: "노트북",
    shapeId: "square",
    description: "톡톡! 재미있는 이야기를 만들 수 있는 노트북이에요.",
  },

  {
    id: "calculator",
    label: "계산기",
    shapeId: "square",
    description: "숫자를 톡톡 누르면 계산을 척척 해주는 계산기예요!",
  },

  {
    id: "squareCakeSlice",
    label: "조각케이크",
    shapeId: "square",
    description: "달콤한 케이크 한 조각이에요! 어떤 맛일 것 같나요?",
  },

  {
    id: "sandwich",
    label: "샌드위치",
    shapeId: "square",
    description: "맛있는 재료가 차곡차곡! 샌드위치 한입 먹어볼까요?",
  },

  {
    id: "squareSunglasses",
    label: "사각 선글라스",
    shapeId: "square",
    description: "네모난 선글라스를 쓰면 멋쟁이로 변신! 누가 써볼까요?",
  },

  {
    id: "phone",
    label: "휴대폰",
    shapeId: "square",
    description: "띠링띠링! 누가 전화를 걸어왔을까요?",
  },

  {
    id: "remoteControl",
    label: "리모콘",
    shapeId: "square",
    description: "톡톡 버튼을 누르면 TV가 움직여요! 무엇을 틀어볼까요?",
  },

  {
    id: "switch",
    label: "스위치",
    shapeId: "square",
    description: "딸깍! 스위치를 누르면 불이 켜지고 꺼져요.",
  },

  {
    id: "frame",
    label: "액자",
    shapeId: "square",
    description:
      "소중한 사진이나 그림을 쏙 넣어두는 액자예요! 무엇을 담아볼까요?",
  },

  // ==================================================
  // TRIANGLE
  // ==================================================

  {
    id: "ruller",
    label: "삼각자",
    shapeId: "triangle",
    description: "삐죽삐죽 세모 모양 삼각자예요! 어떤 그림을 그려볼까요?",
  },

  {
    id: "triangleInstrument",
    label: "트라이앵글",
    shapeId: "triangle",
    description: "딩동댕! 맑고 신나는 소리를 내는 트라이앵글이에요.",
  },

  {
    id: "partyHat",
    label: "파티모자",
    shapeId: "triangle",
    description: "파티할 준비 완료! 뾰족한 파티모자를 써볼까요?",
  },

  {
    id: "christmasTree",
    label: "크리스마스 트리",
    shapeId: "triangle",
    description:
      "반짝반짝 크리스마스 트리가 나타났어요! 어떤 장식을 달아볼까요?",
  },

  {
    id: "flag",
    label: "삼각 깃발",
    shapeId: "triangle",
    description: "펄럭펄럭! 바람을 타고 삼각 깃발이 춤을 춰요.",
  },

  {
    id: "triangleSandwich",
    label: "샌드위치",
    shapeId: "triangle",
    description: "세모로 자른 맛있는 샌드위치예요! 한입 크게 냠냠!",
  },

  {
    id: "triangleKimbap",
    label: "삼각김밥",
    shapeId: "triangle",
    description: "뾰족한 삼각김밥이 짠! 속에는 무엇이 들어 있을까요?",
  },

  {
    id: "pyramid",
    label: "피라미드",
    shapeId: "triangle",
    description:
      "아주 오래된 피라미드가 나타났어요! 안에는 어떤 비밀이 있을까요?",
  },

  {
    id: "tent",
    label: "텐트",
    shapeId: "triangle",
    description: "숲속에 아늑한 텐트가 있어요! 여기서 하룻밤 자볼까요?",
  },

  {
    id: "mountain",
    label: "산",
    shapeId: "triangle",
    description: "높고 멋진 산이 우뚝! 정상까지 올라가 볼까요?",
  },

  {
    id: "sailboat",
    label: "범선",
    shapeId: "triangle",
    description: "바람을 타고 출렁출렁! 범선을 타고 어디로 떠나볼까요?",
  },

  {
    id: "triangleCookie",
    label: "세모 쿠키",
    shapeId: "triangle",
    description: "세모 모양의 바삭바삭 쿠키예요! 냠냠 한입 먹어볼까요?",
  },

  {
    id: "watermelonSlice",
    label: "수박 조각",
    shapeId: "triangle",
    description: "시원한 수박 한 조각이에요! 아삭! 한입 먹어볼까요?",
  },

  {
    id: "pizzaSlice",
    label: "피자 조각",
    shapeId: "triangle",
    description: "치즈가 쭈욱 늘어나는 피자 한 조각! 냠냠 먹어볼까요?",
  },

  // ==================================================
  // HEART
  // ==================================================

  {
    id: "heartCookie",
    label: "하트 쿠키",
    shapeId: "heart",
    description: "사랑을 담은 하트 쿠키예요! 누구에게 선물하고 싶나요?",
  },

  {
    id: "heartBalloon",
    label: "하트 풍선",
    shapeId: "heart",
    description: "하트 모양 풍선이 둥실둥실! 사랑을 가득 담아 날려볼까요?",
  },

  {
    id: "heartLollipop",
    label: "하트 사탕",
    shapeId: "heart",
    description: "달콤한 하트 사탕이에요! 누구와 나눠 먹고 싶나요?",
  },

  {
    id: "heartPillow",
    label: "하트 쿠션",
    shapeId: "heart",
    description: "폭신폭신 하트 쿠션이에요! 꼭 안아보고 싶지 않나요?",
  },

  {
    id: "heartCake",
    label: "하트 케이크",
    shapeId: "heart",
    description: "사랑이 듬뿍 담긴 하트 케이크예요! 누구와 함께 먹을까요?",
  },

  {
    id: "heartButton",
    label: "하트 단추",
    shapeId: "heart",
    description: "앙증맞은 하트 단추예요! 어떤 옷에 달아볼까요?",
  },

  {
    id: "heartClock",
    label: "하트 시계",
    shapeId: "heart",
    description: "하트 모양 시계가 똑딱똑딱! 지금은 몇 시일까요?",
  },

  {
    id: "heartSunglasses",
    label: "하트 선글라스",
    shapeId: "heart",
    description: "하트 뿅뿅! 멋지고 귀여운 선글라스를 써볼까요?",
  },

  {
    id: "heartGem",
    label: "하트 보석",
    shapeId: "heart",
    description: "반짝반짝 빛나는 하트 보석이에요! 보물을 찾은 것 같아요!",
  },

  {
    id: "heartNecklace",
    label: "하트 목걸이",
    shapeId: "heart",
    description: "반짝이는 하트 목걸이예요! 누구에게 예쁘게 걸어줄까요?",
  },

  // ==================================================
  // STAR
  // ==================================================

  {
    id: "starCookie",
    label: "별 쿠키",
    shapeId: "star",
    description: "반짝이는 별 모양 쿠키예요! 별 하나 냠냠 먹어볼까요?",
  },

  {
    id: "starBalloon",
    label: "별 풍선",
    shapeId: "star",
    description: "별 모양 풍선이 둥실둥실! 하늘까지 날아갈 수 있을까요?",
  },

  {
    id: "starBalloon1",
    label: "별 풍선",
    shapeId: "star",
    description: "반짝반짝 별 풍선이 나타났어요! 어디로 데려가 볼까요?",
  },

  {
    id: "starWand",
    label: "요술봉",
    shapeId: "star",
    description: "반짝! 요술봉을 휘두르면 어떤 마법이 나타날까요?",
  },

  {
    id: "starPillow",
    label: "별 쿠션",
    shapeId: "star",
    description: "폭신폭신 별 쿠션이에요! 꼭 안고 꿈나라로 가볼까요?",
  },

  {
    id: "starfish",
    label: "불가사리",
    shapeId: "star",
    description:
      "바닷속에 별처럼 생긴 불가사리가 있어요! 어디에 숨어 있을까요?",
  },

  {
    id: "starButton",
    label: "별 단추",
    shapeId: "star",
    description: "반짝이는 별 단추예요! 어떤 옷에 달아주면 예쁠까요?",
  },

  {
    id: "starClock",
    label: "별 시계",
    shapeId: "star",
    description: "별 모양 시계가 똑딱똑딱! 오늘은 몇 시일까요?",
  },

  {
    id: "starCake",
    label: "별 케이크",
    shapeId: "star",
    description: "별처럼 반짝이는 케이크예요! 특별한 날에 먹고 싶어요!",
  },

  {
    id: "starOrnament",
    label: "별 장식",
    shapeId: "star",
    description: "반짝반짝 예쁜 별 장식이에요! 어디에 걸어볼까요?",
  },

  {
    id: "starSunglasses",
    label: "별 선글라스",
    shapeId: "star",
    description: "별 모양 선글라스를 쓰면 나도 반짝반짝 스타!",
  },

  {
    id: "starNecklace",
    label: "별 목걸이",
    shapeId: "star",
    description: "반짝이는 별 목걸이예요! 목에 걸면 멋진 별처럼 변신!",
  },

  {
    id: "medal",
    label: "메달",
    shapeId: "star",
    description: "짜잔! 멋진 메달을 받았어요. 오늘의 최고 주인공은 누구일까요?",
  },
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
