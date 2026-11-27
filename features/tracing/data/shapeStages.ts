export interface ShapeTracingStage {
  id: string;
  level: number;
  no: string;
  shortLabel: string;
  title: string;
  mission: string;
  hint: string;
  paths: string[];
  scale?: number;
}

const SHAPE_PATHS = {
  // 1.5배 확대된 원
  circle:
    "M 160 -12 C 233 -12 292 47 292 120 C 292 193 233 252 160 252 C 87 252 28 193 28 120 C 28 47 87 -12 160 -12 Z",

  // 1.5배 확대된 삼각형
  triangle: "M 160 -18 L 310 240 L 10 240 Z",

  // 1.5배 확대된 역삼각형
  invertedTriangle: "M 40 -22.5 L 280 -22.5 L 160 292.5 Z",

  // 1.5배 확대된 정사각형
  square: "M 28 -12 L 292 -12 L 292 252 L 28 252 Z",

  // 1.5배 확대된 직사각형
  rectangle: "M -27.5 37.5 L 347.5 37.5 L 347.5 202.5 L -27.5 202.5 Z",

  // 1.5배 확대된 하트
  heart:
    "M 160 255 C 137.5 234  -17 129  -17 52.5 C -17 -3 25 -30 71.5 -30 C 112 -30 142  -6 160 25.5 C 178 -6 208 -30 248.5 -30 C 295 -30 337  -3 337 52.5 C 337 129 182.5 234 160 255 Z",

  // 1.5배 확대된 별
  star: "M 160 -30 L 197.05 69 L 302.65 73.65 L 219.85 138.6 L 248.2 241.35 L 160 183 L 71.8 241.35 L 100.15 138.6 L 17.35 73.65 L 122.95 69 Z",
  // 큰 별 안에 작은 별이 들어간 모양
  starWithSmallStar: [
    // 바깥쪽 큰 별
    "M 160 -30 L 197.05 69 L 302.65 73.65 L 219.85 138.6 L 248.2 241.35 L 160 183 L 71.8 241.35 L 100.15 138.6 L 17.35 73.65 L 122.95 69 Z",

    // 안쪽 작은 별
    "M 160 75 L 174 108 L 210 111 L 183 135 L 191 170 L 160 152 L 129 170 L 137 135 L 110 111 L 146 108 Z",
  ],
};
export const SHAPE_STAGES: ShapeTracingStage[] = [
  {
    id: "large-circle",
    level: 1,
    no: "01",
    shortLabel: "큰 동그라미",
    title: "커다란 동그라미",
    mission: "동그랗게 한 바퀴 그려 봐요!",
    hint: "점선을 따라 동그랗게 그려 봐요",
    paths: [SHAPE_PATHS.circle],
  },
  {
    id: "three-circles",
    level: 2,
    no: "02",
    shortLabel: "동그라미 세 개",
    title: "동그라미 세 개",
    mission: "동그라미를 세 개 그려 봐요!",
    hint: "하나씩 차례대로 동그라미를 그려 봐요",
    paths: [
      "M 54 78 C 77.2 78 96 96.8 96 120 C 96 143.2 77.2 162 54 162 C 30.8 162 12 143.2 12 120 C 12 96.8 30.8 78 54 78 Z",
      "M 160 78 C 183.2 78 202 96.8 202 120 C 202 143.2 183.2 162 160 162 C 136.8 162 118 143.2 118 120 C 118 96.8 136.8 78 160 78 Z",
      "M 266 78 C 289.2 78 308 96.8 308 120 C 308 143.2 289.2 162 266 162 C 242.8 162 224 143.2 224 120 C 224 96.8 242.8 78 266 78 Z",
    ],
  },
  {
    id: "large-triangle",
    level: 3,
    no: "03",
    shortLabel: "큰 세모",
    title: "커다란 세모",
    mission: "세모를 따라 그려 봐요!",
    hint: "꼭짓점을 차례대로 이어 봐요",
    paths: [SHAPE_PATHS.triangle],
  },
  {
    id: "inverted-triangle",
    level: 4,
    no: "04",
    shortLabel: "거꾸로 세모",
    title: "거꾸로 세모",
    mission: "이번에는 거꾸로 세모를 그려 봐요!",
    hint: "위에서 시작해 아래쪽 꼭짓점으로 이어 봐요",
    paths: [SHAPE_PATHS.invertedTriangle],
  },
  {
    id: "large-square",
    level: 5,
    no: "05",
    shortLabel: "큰 네모",
    title: "커다란 네모",
    mission: "네모를 한 바퀴 그려 봐요!",
    hint: "네 변을 차례대로 이어 봐요",
    paths: [SHAPE_PATHS.square],
  },
  {
    id: "rectangle",
    level: 6,
    no: "06",
    shortLabel: "길쭉한 네모",
    title: "길쭉한 네모",
    mission: "길쭉한 네모를 그려 봐요!",
    hint: "긴 변과 짧은 변을 이어 봐요",
    paths: [SHAPE_PATHS.rectangle],
  },
  {
    id: "large-heart",
    level: 7,
    no: "07",
    shortLabel: "큰 하트",
    title: "커다란 하트",
    mission: "예쁜 하트를 그려 봐요!",
    hint: "하트 모양을 따라 천천히 그려 봐요",
    paths: [SHAPE_PATHS.heart],
  },
  {
    id: "small-heart",
    level: 8,
    no: "08",
    shortLabel: "하트 클로버",
    title: "하트 네 잎 클로버",
    mission: "하트 네 장으로 클로버를 만들어 봐요!",
    hint: "가운데를 향해 하트 네 개를 그려 봐요",
    paths: [
      // 위쪽 하트
      "M 160 92 C 140 74 103 50 103 22 C 103 0 134 -8 160 16 C 186 -8 217 0 217 22 C 217 50 180 74 160 92 Z",

      // 오른쪽 하트
      "M 188 120 C 206 100 230 63 258 63 C 280 63 288 94 264 120 C 288 146 280 177 258 177 C 230 177 206 140 188 120 Z",

      // 아래쪽 하트
      "M 160 148 C 140 166 103 190 103 218 C 103 240 134 248 160 224 C 186 248 217 240 217 218 C 217 190 180 166 160 148 Z",

      // 왼쪽 하트
      "M 132 120 C 114 100 90 63 62 63 C 40 63 32 94 56 120 C 32 146 40 177 62 177 C 90 177 114 140 132 120 Z",
    ],
  },
  {
    id: "large-star",
    level: 9,
    no: "09",
    shortLabel: "큰 별",
    title: "커다란 별",
    mission: "반짝이는 별을 그려 봐요!",
    hint: "뾰족한 꼭짓점을 이어 봐요",
    paths: [SHAPE_PATHS.star],
  },
  {
    id: "small-star",
    level: 10,
    no: "10",
    shortLabel: "큰 별 속 작은 별",
    title: "별 속의 작은 별",
    mission: "큰 별 안에 작은 별도 그려 봐요!",
    hint: "큰 별과 작은 별을 차례로 그려 봐요",
    paths: SHAPE_PATHS.starWithSmallStar,
  },
];
