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

// 비슷한 계열(유사 색상)끼리 더 촘촘하게 묶은 색상 그룹 정의
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

// --------------------------------------------------
// 티어 4: 파스텔 톤 전용 풀 (Level 7~9, 13, 15 등)
// 채도가 낮고 부드러운 색들. primary/secondary와는
// 명확히 구분되면서도, 서로는 은은하게 비슷해서
// 손과 눈의 정밀한 변별력을 요구함
// --------------------------------------------------
export const PASTEL_COLORS = [
  "lightPink",
  "lightBlue",
  "lightGreen",
  "lightYellow",
  "lavender",
  "peach",
  "tan",
  "mint",
  "coral",
  "skyblue",
];

// --------------------------------------------------
// 티어 5: "모든 색" — primary + secondary + pastel 통합
// colorPool: "all"에서 사용
// --------------------------------------------------
export const ALL_COLORS = [
  ...PRIMARY_COLORS,
  ...SECONDARY_COLORS,
  ...PASTEL_COLORS,
];

export type ShapeDefinition = {
  id: string; // ItemSvg 컴포넌트 키와 매칭
  label: string; // 화면에 표시할 한글 이름
  description: string;
};
export const COLOR_ITEM_POOL: ShapeDefinition[] = [
  {
    id: "apple",
    label: "사과",
    description:
      "아삭아삭 맛있는 사과가 나타났어요! 오늘의 사과는 무슨 색일까요?",
  },
  {
    id: "strawberry",
    label: "딸기",
    description: "새콤달콤 딸기가 톡! 딸기는 무슨 색이 가장 잘 어울릴까요?",
  },
  {
    id: "balloon",
    label: "풍선",
    description:
      "둥실둥실 하늘로 날아가는 풍선이에요! 내가 좋아하는 색 풍선을 만들어 볼까요?",
  },
  {
    id: "fireTruck",
    label: "소방차",
    description:
      "씩씩한 소방차가 출동했어요! 오늘은 어떤 색 소방차가 멋질까요?",
  },
  {
    id: "cherry",
    label: "체리",
    description:
      "작고 동그란 체리가 두 알 콕! 오늘은 어떤 색 체리를 만들어 볼까요?",
  },
  {
    id: "fish",
    label: "물고기",
    description:
      "물속을 헤엄헤엄 다니는 물고기예요! 무지개 물고기를 만들어 볼까요?",
  },
  {
    id: "blueberry",
    label: "블루베리",
    description:
      "동글동글 블루베리예요! 이름은 블루베리인데 다른 색이면 어떨까요?",
  },
  {
    id: "umbrella",
    label: "우산",
    description:
      "비 오는 날 나를 지켜주는 우산이에요! 알록달록 우산을 만들어 보세요.",
  },
  {
    id: "bell",
    label: "종",
    description:
      "딸랑딸랑! 소리가 들리는 것 같지 않나요? 어떤 색 종을 만들어 볼까요?",
  },
  {
    id: "whale",
    label: "고래",
    description:
      "바다에서 아주아주 큰 고래가 나타났어요! 어떤 색 고래가 멋질까요?",
  },
  {
    id: "milk",
    label: "우유",
    description:
      "꼴깍꼴깍 맛있는 우유예요! 우유가 알록달록해진다면 어떤 맛일까요?",
  },
  {
    id: "banana",
    label: "바나나",
    description: "길쭉길쭉 달콤한 바나나예요! 바나나가 다른 색으로 변신했어요!",
  },
  {
    id: "bee",
    label: "벌",
    description: "붕붕! 꿀을 찾아 날아가는 벌이에요. 어떤 색 벌이 나타날까요?",
  },
  {
    id: "ship",
    label: "돛단배",
    description:
      "출렁출렁 바다를 달리는 돛단배예요! 알록달록 배를 타고 어디로 떠나볼까요?",
  },
  {
    id: "dog",
    label: "강아지",
    description:
      "멍멍! 꼬리를 살랑살랑 흔드는 강아지예요. 어떤 색 강아지가 귀여운가요?",
  },
  {
    id: "clock",
    label: "시계",
    description:
      "똑딱똑딱! 지금은 몇 시일까요? 시계 색깔도 마음대로 바꿔보세요.",
  },
  {
    id: "car",
    label: "자동차",
    description:
      "부릉부릉! 멋진 자동차가 출발합니다. 오늘은 어떤 색 자동차를 타고 갈까요?",
  },
  {
    id: "rocket",
    label: "로켓",
    description:
      "슈우웅! 로켓이 우주로 출발해요! 내가 만든 로켓을 타고 어디로 가볼까요?",
  },
  {
    id: "owl",
    label: "부엉이",
    description:
      "부엉! 밤하늘을 지켜보는 부엉이예요. 알록달록 부엉이를 만들어 볼까요?",
  },
  {
    id: "frog",
    label: "개구리",
    description:
      "개굴개굴! 연못에서 개구리가 폴짝 뛰었어요. 무슨 색 개구리가 나타날까요?",
  },
  {
    id: "grape",
    label: "포도",
    description: "포도알이 주렁주렁! 오늘은 무슨 색 포도를 먹어볼까요?",
  },
  {
    id: "koala",
    label: "코알라",
    description:
      "나무 위에서 꼬옥 안고 있는 코알라예요. 알록달록 코알라를 만들어 볼까요?",
  },
  {
    id: "ladybug",
    label: "무당벌레",
    description:
      "꼬물꼬물 무당벌레가 산책 중이에요! 오늘은 어떤 색 옷을 입혀줄까요?",
  },
  {
    id: "chick",
    label: "병아리",
    description:
      "삐약삐약! 귀여운 병아리가 나타났어요. 노란 병아리 말고 다른 색도 볼까요?",
  },
  {
    id: "sunflower",
    label: "해바라기",
    description:
      "햇님을 바라보는 해바라기예요! 해바라기가 다른 색으로 변신하면 어떨까요?",
  },
  {
    id: "flower",
    label: "꽃",
    description:
      "활짝 피어난 예쁜 꽃이에요! 세상에 하나뿐인 특별한 색 꽃을 만들어 보세요.",
  },
  {
    id: "star",
    label: "별",
    description:
      "반짝반짝 빛나는 별이에요! 오늘은 무슨 색 별이 하늘에 떠 있을까요?",
  },
  {
    id: "tree",
    label: "나무",
    description: "쑥쑥 자라는 나무예요! 알록달록 신기한 나무를 만들어 볼까요?",
  },
  {
    id: "broccoli",
    label: "브로콜리",
    description:
      "초록초록 브로콜리가 방긋! 오늘은 어떤 색 브로콜리를 먹어볼까요?",
  },
  {
    id: "butterfly",
    label: "나비",
    description:
      "팔랑팔랑 날아다니는 나비예요! 세상에 하나뿐인 나비를 만들어 보세요.",
  },
  {
    id: "cupcake",
    label: "컵케익",
    description: "달콤한 컵케익이 짠! 알록달록한 컵케익을 만들어 볼까요?",
  },
  {
    id: "cactus",
    label: "선인장",
    description:
      "뾰족뾰족 선인장이에요! 사막에 알록달록 선인장이 있다면 어떨까요?",
  },
  {
    id: "crow",
    label: "까마귀",
    description:
      "까악까악! 까마귀가 날아왔어요. 오늘은 어떤 색 깃털을 입혀볼까요?",
  },
  {
    id: "cat",
    label: "고양이",
    description:
      "야옹! 귀여운 고양이가 꼬리를 살랑살랑 흔들어요. 내가 좋아하는 색 고양이를 만들어 보세요.",
  },
  {
    id: "donut",
    label: "도넛",
    description:
      "동그란 도넛 하나 먹어볼까요? 오늘은 어떤 색 도넛이 제일 맛있어 보이나요?",
  },
  {
    id: "cloud",
    label: "구름",
    description:
      "둥실둥실 하늘을 떠다니는 구름이에요! 오늘 구름은 무슨 색일까요?",
  },
  {
    id: "snowman",
    label: "눈사람",
    description:
      "꽁꽁! 눈으로 만든 귀여운 눈사람이에요. 무지개 눈사람을 만들어 볼까요?",
  },
  {
    id: "rabbit",
    label: "토끼",
    description:
      "깡충깡충! 귀여운 토끼가 폴짝 뛰어왔어요. 어떤 색 토끼가 마음에 드나요?",
  },
  {
    id: "cottonCandy",
    label: "솜사탕",
    description:
      "폭신폭신 달콤한 솜사탕이에요! 내가 좋아하는 색 솜사탕을 만들어 보세요.",
  },
  {
    id: "mushroom",
    label: "버섯",
    description: "숲속에서 버섯이 쏙! 어떤 색 버섯이 숨어 있을까요?",
  },
  {
    id: "watermelon",
    label: "수박",
    description:
      "아삭아삭 시원한 수박이에요! 수박이 다른 색이라면 어떤 맛일까요?",
  },
  {
    id: "fox",
    label: "여우",
    description:
      "살금살금 숲속을 걷는 여우예요. 오늘은 어떤 색 여우가 나타났을까요?",
  },
  {
    id: "pig",
    label: "돼지",
    description:
      "꿀꿀! 귀여운 돼지가 꼬리를 빙글빙글 말았어요. 어떤 색 돼지를 만들어 볼까요?",
  },
  {
    id: "penguin",
    label: "펭귄",
    description: "뒤뚱뒤뚱! 귀여운 펭귄이 걸어와요. 오늘은 어떤 색 펭귄일까요?",
  },
  {
    id: "snail",
    label: "달팽이",
    description:
      "느릿느릿 달팽이가 지나가요. 달팽이의 집을 알록달록 꾸며볼까요?",
  },
];
// export const COLOR_ITEM_POOL: ShapeDefinition[] = [
//   { id: "apple", label: "사과" },
//   { id: "strawberry", label: "딸기" },
//   { id: "balloon", label: "풍선" },
//   { id: "fireTruck", label: "소방차" },
//   { id: "cherry", label: "체리" },
//   { id: "fish", label: "물고기" },
//   { id: "blueberry", label: "블루베리" },
//   { id: "umbrella", label: "우산" },
//   { id: "bell", label: "종" },
//   { id: "whale", label: "고래" },
//   { id: "milk", label: "우유" },
//   { id: "banana", label: "바나나" },
//   { id: "bee", label: "벌" },
//   { id: "ship", label: "돛단배" },
//   { id: "dog", label: "강아지" },
//   { id: "clock", label: "시계" },
//   { id: "car", label: "자동차" },
//   { id: "rocket", label: "로켓" },
//   { id: "owl", label: "부엉이" },
//   { id: "frog", label: "개구리" },
//   { id: "grape", label: "포도" },
//   { id: "koala", label: "코알라" },
//   { id: "ladybug", label: "무당벌레" },
//   { id: "chick", label: "병아리" },
//   { id: "sunflower", label: "해바라기" },
//   { id: "flower", label: "꽃" },
//   { id: "star", label: "별" },
//   { id: "tree", label: "나무" },
//   { id: "broccoli", label: "브로콜리" },
//   { id: "butterfly", label: "나비" },
//   { id: "cupcake", label: "컵케익" },
//   { id: "cactus", label: "선인장" },
//   { id: "crow", label: "까마귀" },
//   { id: "cat", label: "고양이" },
//   { id: "donut", label: "도넛" },
//   { id: "cloud", label: "구름" },
//   { id: "snowman", label: "눈사람" },
//   { id: "rabbit", label: "토끼" },
//   { id: "cottonCandy", label: "솜사탕" },
//   { id: "mushroom", label: "버섯" },
//   { id: "watermelon", label: "수박" },
//   { id: "fox", label: "여우" },
//   { id: "pig", label: "돼지" },
//   { id: "penguin", label: "펭귄" },
//   { id: "snail", label: "달팽이" },
// ];

// 2. 색상별 사물 이름 풀 (색상 키와 매칭)
export const COLOR_ITEM_POOLS: Record<string, string[]> = {
  red: ["빨간 사과", "딸기", "빨간 풍선", "소방차", "체리", "무당벌레", "수박"],
  pink: ["분홍 토끼", "복숭아", "발레복", "분홍 튤립", "솜사탕"],
  coral: ["코랄 조개", "자몽", "홍학", "연어 초밥", "장미꽃", "시계"],
  blue: ["파란 물고기", "블루베리", "파란 우산", "고래", "파란 바지"],
  skyblue: ["하늘색 새", "구름", "소라 껍데기", "풍선껌", "물방울", "돛단배"],
  navy: ["남색 교복", "밤하늘", "블루베리 잼", "남색 고래", "우주선"],
  green: ["초록 나무", "브로콜리", "선인장", "개구리", "자동차"],
  lime: ["연두색 잎사귀", "아보카도", "청포도", "풋사과", "피망"],
  mint: ["민트 아이스크림", "치약", "선인장 화분", "민트 사탕", "네잎클로버"],
  purple: ["포도", "가지", "보라 왕관", "고구마", "보라 나비"],
  violet: ["제비꽃", "라벤더", "포도젤리", "보라색 조개", "아네모네", "포도"],
  orange: ["오렌지", "당근", "농구공", "감", "주황 우산"],
  yellow: ["바나나", "벌", "병아리", "해바라기", "노란 별", "나비", "종"],
  brown: [
    "도토리",
    "초콜릿",
    "곰돌이 인형",
    "갈색 나뭇가지",
    "식빵",
    "컵케익",
    "코알라",
    "부엉이",
    "여우",
    "곰",
  ],
  chocolateBrown: ["초코케이크", "다크초콜릿", "밤", "코코아", "진한 커피"],
  lightBrown: [
    "카라멜",
    "곰돌이 쿠키",
    "밤색 머리끈",
    "라떼",
    "황토색 강아지",
    "달팽이",
  ],
  tan: ["카스텔라", "비스킷", "모래성", "황토빛 강아지", "누룽지"],
  crimson: ["잘 익은 체리", "진한 장미", "빨간 딸기잼", "루비", "붉은 벽돌"],
  lightPink: [
    "벚꽃",
    "솜사탕",
    "복숭아 아이스크림",
    "분홍 리본",
    "핑크 마카롱",
    "꽃",
    "돼지",
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
  black: ["까마귀", "검은 고양이", "도넛", "타이어", "검은 우산", "펭귄"],
  white: [
    "구름",
    "눈사람",
    "우유",
    "흰 토끼",
    "솜사탕",
    "버섯",
    "로켓",
    "강아지",
  ],
};
// 2. 모양별 사물 풀(Pool) 정의
export const SHAPE_ITEM_POOL: Record<string, string[]> = {
  square: ["네모 쿠키", "책", "네모 딱지", "창문", "선물 상자"],
  circle: ["단추", "수박", "도넛", "공", "동전"],
  triangle: ["샌드위치", "삼각김밥", "산", "깃발", "피자 조각"],
  heart: ["하트 풍선", "하트 사탕", "하트 쿠션", "하트 장식", "하트 카드"],
  star: ["별 쿠키", "별 스티커", "별 장식", "별 모양 풍선", "별 배지"],
};
