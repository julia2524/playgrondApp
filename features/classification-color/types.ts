//분류게임에서 분류해야 하는 하나의 대상
export type GameObject = {
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

export type GameTarget = {
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

//나중에 일반화
// export type ClassificationItem = {
//   id: string;
//   color?: string;
//   shape?: string;
//   size?: string;
//   number?: number;
// };
// export type GameObject = ClassificationItem;
// export type GameTarget = ClassificationItem;

export type ClassificationRoundType =
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
export type ClassificationRoundBase = {
  id: string;
  game: "classification";
  level: number;
  round: number;
  type: ClassificationRoundType;
};

export type ClassificationRound = {
  id: string;
  game: "classification";
  level: number;
  round: number;
  type: ClassificationRoundType;
  rule: string;
  objects: GameObject[];
  targets: GameTarget[];
  answer: Record<string, string>;
  missingItem?: string; // [추가] 라운드별 회색 빈자리 아이템 이름
};
// export type FilterSelectRound = ClassificationRoundBase & {
//   type: "filter_select";

//   objects: GameObject[];

//   answer: string[];
// };
// export type FilterSelectRound = ClassificationRoundBase & {
//   type: "filter_select";

//   objects: FilterObject[];

//   answer: string[];
// };
export type ClassificationLevel = {
  level: number;
  type: "drag_sort";
  objectCount: number;
  targetCount: number;
  colorPool: "primary" | "all" | "pastel";
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

export type DropResult = "correct" | "wrong" | "outside";
export type Layout = {
  x: number;
  y: number;
  width: number;
  height: number;
};
