// "데이터가 어떤 모양이어야 하는가?"

// 실제로 화면에 등장하는 대상의 종류
export type ShapeObjectKind = "shape" | "item";

// 게임 방식
export type ShapeGameMode = "single" | "choice";

// Target의 색상 규칙
export type TargetColorMode = "same" | "different" | "natural";

// 실제 색상 팔레트
export type ColorPalette = "primary" | "pastel" | "natural" | "all";

// Object의 색상 규칙
export type ObjectColorMode =
  | "same_as_target"
  | "different_from_target"
  | "not_in_target"
  | "same_as_each_other"
  | "different"
  | "random"
  | "natural";

// 색상 규칙
export type ColorMode =
  | "same" // 모두 같은 색
  | "different" // 서로 다른 색
  | "natural" // 사물 본래 색
  | "random" // 완전 랜덤
  | "same_as_target" // 타겟 대표 색과 동일
  | "different_from_target" // 타겟 대표 색과 다름
  | "not_in_target" // 타겟에 없는 색
  | "same_as_each_other" // 서로 같은 색
  | "same_as_correct"; // 정답과 오답 색 동일 (2지선다용)

// ─────────────────────────────
// Shape Level 설정
// ─────────────────────────────

export type ShapeLevelConfig = {
  level: number;

  // 게임 방식
  mode: ShapeGameMode;

  // ObjectBox에 등장하는 개수
  objectCount: number;

  // TargetBox에 표시되는 전체 선택 슬롯 개수
  //
  // 예)
  // Level 1 → 4
  //   [힌트] [힌트] [정답] [힌트]
  //
  // 즉, targetSlotCount는
  // "정답을 포함한 TargetBox의 전체 자리 수"를 의미한다.
  targetSlotCount: number;

  // Target에 표시되는 대상의 종류
  targetKind: ShapeObjectKind;

  // 정답 Object의 종류
  correctKind: ShapeObjectKind;

  // 오답 Object의 종류
  wrongKind?: ShapeObjectKind;

  // Target의 색상 규칙
  targetColorMode: ColorMode;

  // 정답 Object의 색상 규칙
  correctColorMode: ColorMode;

  // 오답 Object의 색상 규칙
  wrongColorMode?: ColorMode;

  // Choice 모드에서 정답과 오답의 색상 관계
  sameChoiceColor?: boolean;

  // Target에 사용된 색상과 겹치면 안 되는지
  avoidTargetColors?: boolean;

  // 사용할 모양 풀
  shapePool?: "baby" | "basic" | "all";

  // 나중에 분석 / 밸런싱용
  difficulty?: "easy" | "medium" | "hard";

  // 게임 판별 규칙
  rule: "shape_classification";
};

// ─────────────────────────────
// Shape Game Object
// ─────────────────────────────

// ObjectBox에 등장하는 하나의 대상
export type ShapeGameObject = {
  id: string;

  // "shape" → 단순 도형
  // "item"  → 사물 스티커
  kind: ShapeObjectKind;

  // 분류 기준이 되는 모양
  // 예: circle, square, triangle...
  shapeId: string;

  // kind === "item"일 때 사용하는 사물 ID
  // 예: ball, cookie, box...
  itemId?: string;

  // 실제 렌더링 색상
  // natural인 경우 undefined일 수 있음
  color?: string;
};

// ─────────────────────────────
// Shape Game Target
// ─────────────────────────────

// TargetBox 안의 "한 칸"
export type ShapeGameTarget = {
  id: string;

  // Target에 표시되는 대상의 종류
  kind: ShapeObjectKind;

  // 이 Target이 나타내는 모양
  // 예: circle, square, triangle...
  shapeId: string;

  // kind === "item"일 때 사용하는 사물 ID
  itemId?: string;

  // 실제 렌더링 색상
  // natural인 경우 undefined일 수 있음
  color?: string;
};

// ─────────────────────────────
// Shape Round
// ─────────────────────────────

// 한 라운드의 게임 방식
export type ShapeRoundType =
  | "single" // Object 1개 + Target 선택 슬롯들
  | "choice"; // Object 여러 개/정답·오답 선택

// 한 라운드의 공통 정보
export type ShapeRoundBase = {
  id: string;

  game: "shape";

  level: number;

  round: number;

  type: ShapeRoundType;
};

// 실제 한 라운드의 데이터
export type ShapeRound = ShapeRoundBase & {
  rule: "shape_classification";

  // ObjectBox에 등장하는 대상들
  objects: ShapeGameObject[];

  // TargetBox에 표시되는 모든 선택 슬롯
  targets: ShapeGameTarget[];

  // 정답 관계
  // objectId → targetId
  //
  // 예)
  // {
  //   "object-correct": "target-3"
  // }
  //
  // Target이 화면에서 랜덤하게 섞여도
  // targetId로 정답 위치를 찾을 수 있다.
  answer: Record<string, string>;

  // single 모드에서 정답 Object를 빠르게 찾기 위한 값
  correctObjectId?: string;

  // choice 모드에서 오답 Object들을 빠르게 찾기 위한 값
  wrongObjectIds?: string[];
};
