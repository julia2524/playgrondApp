export type ShapeObjectKind = "shape" | "item";

export type ShapeGameMode = "single" | "choice";

export type TargetColorMode = "same" | "different" | "natural";
// 실제 색상 팔레트
export type ColorPalette = "primary" | "pastel" | "natural" | "all";

export type ObjectColorMode =
  | "same_as_target"
  | "different_from_target"
  | "not_in_target"
  | "same_as_each_other"
  | "different"
  | "random"
  | "natural";
export type ColorMode =
  | "same" // 모두 같은 색
  | "different" // 서로 다른 색
  | "natural" // 사물 본래 색
  | "random" // 완전 랜덤
  | "same_as_target" // 타겟 대표 색과 동일
  | "different_from_target"
  | "not_in_target" // 타겟에 없는 색
  | "same_as_each_other"
  | "same_as_correct"; // 정답과 오답 색 동일 (2지선다용)

export type ShapeLevelConfig = {
  level: number;

  // 게임 방식
  mode: ShapeGameMode;

  // ObjectBox에 등장하는 개수
  objectCount: number;

  // TargetBox에 항상 들어가는 개수
  targetCount: number;

  // Target에 표시되는 종류
  targetKind: ShapeObjectKind;

  // 정답 Object 종류
  correctKind: ShapeObjectKind;

  // 오답 Object 종류
  wrongKind?: ShapeObjectKind;

  // Target 색상 규칙
  targetColorMode: ColorMode;

  // 정답 색상 규칙
  correctColorMode: ColorMode;

  // 오답 색상 규칙
  wrongColorMode?: ColorMode;

  // 정답과 오답의 색상 관계
  sameChoiceColor?: boolean;

  // Target에 사용된 색상과 겹치면 안 되는지
  avoidTargetColors?: boolean;
  // 추가하면 좋은 것들
  shapePool?: "baby" | "basic" | "all"; // 사용할 모양 풀 (BABY_SHAPES 등)
  difficulty?: "easy" | "medium" | "hard"; // 나중에 분석/밸런싱용

  // 게임 판별 규칙
  rule: "shape_classification";
};

export type ShapeGameObject = {
  id: string;
  kind: ShapeObjectKind; // "shape" | "item"
  shapeId: string; // "circle" | "square" | ...
  itemId?: string; // kind === "item"일 때
  color?: string; // 실제 렌더링 색
  // 필요하면 나중에 확장
  // size?: string;
  // pattern?: string;
  // name?: string;               // 접근성/음성용
};

export type ShapeGameTarget = {
  id: string;
  kind: ShapeObjectKind;
  shapeId: string; // 타겟이 대표하는 모양
  itemId?: string; // kind === "item"일 때
  color?: string;
  // items?: string[];            // 나중에 multi-item 타겟 필요하면
};
export type ShapeRoundType =
  | "single" // 지금 mode: "single"
  | "choice"; // 지금 mode: "choice" (2지선다)
// 나중에 확장 여지
// | "drag_sort"
// | "multi_target"
// | "elimination"
export type ShapeRoundBase = {
  id: string;
  game: "shape";
  level: number;
  round: number;
  type: ShapeRoundType;
};
export type ShapeRound = ShapeRoundBase & {
  rule: "shape_classification";
  objects: ShapeGameObject[];
  targets: ShapeGameTarget[];
  answer: Record<string, string>; // objectId → targetId
  // 선택적으로
  correctObjectId?: string; // single 모드일 때 편의용
  wrongObjectIds?: string[]; // choice 모드일 때
};
