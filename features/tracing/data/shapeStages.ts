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

// const SHAPE_PATHS = {
//   circle:
//     "M 160 28 C 231 28 282 78 282 120 C 282 177 228 212 160 212 C 92 212 38 177 38 120 C 38 78 89 28 160 28 Z",
//   triangle: "M 160 28 L 286 205 L 34 205 Z",
//   invertedTriangle: "M 34 35 L 286 35 L 160 212 Z",
//   square: "M 66 30 L 254 30 L 254 218 L 66 218 Z",
//   rectangle: "M 28 66 L 292 66 L 292 184 L 28 184 Z",
//   heart:
//     "M 160 218 C 137 194 35 126 35 76 C 35 30 91 13 129 39 C 143 48 153 61 160 72 C 167 61 177 48 191 39 C 229 13 285 30 285 76 C 285 126 183 194 160 218 Z",
//   star: "M 160 18 L 195 91 L 276 101 L 216 158 L 231 224 L 160 188 L 89 224 L 104 158 L 44 101 L 125 91 Z",
// };

const SHAPE_PATHS = {
  // 반지름 88px의 정원
  circle:
    "M 160 32 C 208.6 32 248 71.4 248 120 C 248 168.6 208.6 208 160 208 C 111.4 208 72 168.6 72 120 C 72 71.4 111.4 32 160 32 Z",

  // 균형 잡힌 정삼각형에 가까운 세모
  triangle: "M 160 28 L 260 200 L 60 200 Z",

  // 위아래가 뒤집힌 삼각형
  invertedTriangle: "M 60 40 L 260 40 L 160 212 Z",

  // 정사각형
  square: "M 72 32 L 248 32 L 248 208 L 72 208 Z",

  // 가로로 긴 직사각형
  rectangle: "M 35 65 L 285 65 L 285 175 L 35 175 Z",

  // 좌우 대칭의 통통한 하트
  heart:
    "M 160 210 C 145 196 42 126 42 75 C 42 38 70 20 101 20 C 128 20 148 36 160 57 C 172 36 192 20 219 20 C 250 20 278 38 278 75 C 278 126 175 196 160 210 Z",

  // 좌우 대칭의 별
  star: "M 160 20 L 184.7 86 L 255.1 89.1 L 199.9 132.4 L 218.8 200.9 L 160 162 L 101.2 200.9 L 120.1 132.4 L 64.9 89.1 L 135.3 86 Z",
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
    shortLabel: "작은 하트",
    title: "작은 하트",
    mission: "이번에는 작은 하트를 그려 봐요!",
    hint: "작은 하트도 꼼꼼하게 그려 봐요",
    paths: [SHAPE_PATHS.heart],
    scale: 0.68,
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
    shortLabel: "작은 별",
    title: "작은 별",
    mission: "작은 별도 반짝이게 그려 봐요!",
    hint: "작은 별의 꼭짓점도 놓치지 말아요",
    paths: [SHAPE_PATHS.star],
    scale: 0.68,
  },
];
