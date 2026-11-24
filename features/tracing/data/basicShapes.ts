export type BasicShapeId =
  | "horizontal"
  | "diagonal"
  | "circle"
  | "square"
  | "triangle"
  | "star"
  | "heart";

export interface BasicShape {
  id: BasicShapeId;
  name: string;
  description: string;

  // SVG 원본 경로
  path: string;

  // 시작점과 끝점
  startPoint: {
    x: number;
    y: number;
  };

  endPoint: {
    x: number;
    y: number;
  };

  // 도형이 그려지는 영역
  viewBox: {
    width: number;
    height: number;
  };

  tolerance: number;
  completionThreshold: number;
  isClosed: boolean;
}

export const BASIC_SHAPES: BasicShape[] = [
  {
    id: "horizontal",
    name: "직선",
    description: "옆으로 쭉 그어 봐요!",
    path: "M 30 100 L 290 100",
    startPoint: { x: 30, y: 100 },
    endPoint: { x: 290, y: 100 },
    viewBox: { width: 320, height: 200 },
    tolerance: 28,
    completionThreshold: 0.85,
    isClosed: false,
  },
  {
    id: "diagonal",
    name: "사선",
    description: "대각선으로 그어 봐요!",
    path: "M 30 160 L 290 30",
    startPoint: { x: 30, y: 160 },
    endPoint: { x: 290, y: 30 },
    viewBox: { width: 320, height: 200 },
    tolerance: 28,
    completionThreshold: 0.85,
    isClosed: false,
  },
  {
    id: "circle",
    name: "동그라미",
    description: "동그랗게 그려 봐요!",
    path: "M 160 35 C 226 35 265 78 265 110 C 265 150 220 180 160 180 C 100 180 55 150 55 110 C 55 70 100 35 160 35 Z",
    startPoint: { x: 160, y: 35 },
    endPoint: { x: 160, y: 35 },
    viewBox: { width: 320, height: 220 },
    tolerance: 28,
    completionThreshold: 0.9,
    isClosed: true,
  },
  {
    id: "square",
    name: "네모",
    description: "네모를 따라 그려 봐요!",
    path: "M 80 40 L 240 40 L 240 200 L 80 200 Z",
    startPoint: { x: 80, y: 40 },
    endPoint: { x: 80, y: 40 },
    viewBox: { width: 320, height: 240 },
    tolerance: 28,
    completionThreshold: 0.9,
    isClosed: true,
  },
  {
    id: "triangle",
    name: "세모",
    description: "세모를 따라 그려 봐요!",
    path: "M 160 30 L 280 190 L 40 190 Z",
    startPoint: { x: 160, y: 30 },
    endPoint: { x: 160, y: 30 },
    viewBox: { width: 320, height: 230 },
    tolerance: 28,
    completionThreshold: 0.9,
    isClosed: true,
  },
  {
    id: "star",
    name: "별",
    description: "반짝반짝 별을 그려 봐요!",
    path: "M 160 20 L 195 95 L 275 105 L 215 160 L 230 225 L 160 190 L 90 225 L 105 160 L 45 105 L 125 95 Z",
    startPoint: { x: 160, y: 20 },
    endPoint: { x: 160, y: 20 },
    viewBox: { width: 320, height: 250 },
    tolerance: 28,
    completionThreshold: 0.9,
    isClosed: true,
  },
  {
    id: "heart",
    name: "하트",
    description: "하트를 그려 봐요!",
    path: "M 160 210 C 135 185 45 125 45 75 C 45 25 110 15 160 75 C 210 15 275 25 275 75 C 275 125 185 185 160 210 Z",
    startPoint: { x: 160, y: 210 },
    endPoint: { x: 160, y: 210 },
    viewBox: { width: 320, height: 240 },
    tolerance: 28,
    completionThreshold: 0.9,
    isClosed: true,
  },
];
