export interface StageConfig {
  level: number;
  name: string;
  xOffset: number;
}

export const STAGE_CONFIGS: StageConfig[] = [
  {
    level: 1,
    name: "알록달록 앵두 밭",
    xOffset: 0,
  },

  {
    level: 2,
    name: "싱그러운 풀숲",
    xOffset: -0.62,
  },

  {
    level: 3,
    name: "무지개 언덕",
    xOffset: 0.68,
  },

  {
    level: 4,
    name: "별빛 호수",
    xOffset: -0.55,
  },

  {
    level: 5,
    name: "캔디 공장",
    xOffset: 0.3,
  },
  {
    level: 6,
    name: "구름 위 정원",
    xOffset: -0.7,
  },
];
