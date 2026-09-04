// 실제 색상 팔레트
export type ColorPalette = "primary" | "pastel" | "natural" | "all";

//분류게임에서 분류해야 하는 하나의 대상
export type ColorGameObject = {
  id: string;

  color?: string;
  shape?: string;
  size?: string;
  number?: number;
  type?: string;
  category?: string;
  pattern?: string;
  name?: string; // 추가!
};

export type ColorGameTarget = {
  id: string;

  color?: string;
  shape?: string;
  size?: string;
  number?: number;
  type?: string;
  category?: string;
  pattern?: string;
  items?: string[]; // 추가!
};

export type ColorRoundType =
  | "drag_sort"
  | "multi_target_sort"
  | "filter_select"
  | "elimination"
  | "relative_position"
  | "multi_step_filter";
export type ClassificationDragSortRule =
  | "color"
  | "category"
  | "size"
  | "color_shape";
export type ColorRoundBase = {
  id: string;
  game: "classification";
  level: number;
  round: number;
  type: ColorRoundType;
};

export type ColorRound = {
  id: string;
  game: "classification";
  level: number;
  round: number;
  type: ColorRoundType;
  rule: string;
  objects: ColorGameObject[];
  targets: ColorGameTarget[];
  answer: Record<string, string>;
  missingItem?: string; // [추가] 라운드별 회색 빈자리 아이템 이름
};

export type ColorLevelConfig = {
  level: number;
  type: "drag_sort";
  objectCount: number;
  targetCount: number;
  colorPool: ColorPalette;
  margin: number;
  features: {
    color: boolean;
    shape: boolean;
    size: boolean;
    number: boolean;
    hat: boolean;
    pattern: boolean;
    category: boolean;
  };

  rule: string;
};
