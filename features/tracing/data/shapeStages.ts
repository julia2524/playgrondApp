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
  circle:
    "M 160 28 C 231 28 282 78 282 120 C 282 177 228 212 160 212 C 92 212 38 177 38 120 C 38 78 89 28 160 28 Z",
  triangle: "M 160 28 L 286 205 L 34 205 Z",
  invertedTriangle: "M 34 35 L 286 35 L 160 212 Z",
  square: "M 66 30 L 254 30 L 254 218 L 66 218 Z",
  rectangle: "M 28 66 L 292 66 L 292 184 L 28 184 Z",
  heart:
    "M 160 218 C 137 194 35 126 35 76 C 35 30 91 13 129 39 C 143 48 153 61 160 72 C 167 61 177 48 191 39 C 229 13 285 30 285 76 C 285 126 183 194 160 218 Z",
  star: "M 160 18 L 195 91 L 276 101 L 216 158 L 231 224 L 160 188 L 89 224 L 104 158 L 44 101 L 125 91 Z",
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
      "M 53 72 C 79 72 98 91 98 117 C 98 143 79 162 53 162 C 27 162 8 143 8 117 C 8 91 27 72 53 72 Z",
      "M 160 72 C 186 72 205 91 205 117 C 205 143 186 162 160 162 C 134 162 115 143 115 117 C 115 91 134 72 160 72 Z",
      "M 267 72 C 293 72 312 91 312 117 C 312 143 293 162 267 162 C 241 162 222 143 222 117 C 222 91 241 72 267 72 Z",
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
