export type ShapeObjectKind = "shape" | "item";

export type ShapeGameMode = "single" | "choice";

export type TargetColorMode = "same" | "different" | "natural";

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
  | "not_in_target" // 타겟에 없는 색
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
  targetColorMode: TargetColorMode;

  // 정답 색상 규칙
  correctColorMode: ObjectColorMode;

  // 오답 색상 규칙
  wrongColorMode?: ObjectColorMode;

  // 정답과 오답의 색상 관계
  sameChoiceColor?: boolean;

  // Target에 사용된 색상과 겹치면 안 되는지
  avoidTargetColors?: boolean;

  // 게임 판별 규칙
  rule: "shape_classification";
};
