//어떤 색을 사용할 수 있는가

export const COLOR_POOL = ["red", "blue", "yellow", "green", "purple"] as const;

export type Color = (typeof COLOR_POOL)[number];

export const COLORS: Record<string, string> = {
  red: "#FF5C6C",
  blue: "#4D9EFF",
  yellow: "#FFC83D",
  green: "#4CCB8A",
  purple: "#9B72E8",
};

export const COLOR_NAMES: Record<string, string> = {
  red: "빨강",
  blue: "파랑",
  yellow: "노랑",
  green: "초록",
  purple: "보라",
};

// 1. 색상별 사물 풀(Pool) 정의
export const COLOR_ITEM_POOL: Record<string, string[]> = {
  red: ["빨간 사과", "딸기", "빨간 풍선", "소방차", "체리"],
  blue: ["파란 물고기", "블루베리", "파란 우산", "고래", "파란 바지"],
  yellow: ["바나나", "레몬", "병아리", "해바라기", "노란 별"],
  green: ["초록 나무", "수박", "브로콜리", "악어", "완두콩"],
  purple: ["포도", "가지", "보라 왕관", "고구마", "보라 나비"],
};
