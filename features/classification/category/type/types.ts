/**
 * 종류분류 (Category Classification) - 20단계 마스터 스펙
 *
 * 구조 요약
 * ---------
 * - TargetBox: 항상 3슬롯. "같은 종류(species/카테고리)"의 개체 3개로 구성됨.
 * - ObjectBox: 정답 1개 + 오답 N개(0~2개)로 구성됨.
 *
 * 레벨 그룹
 * ---------
 * 1) L1~L2   : 오답 없음(mode "single"). 순수 시각 변별 입문.
 *              - L1: TargetBox 완전 동일 3개 / 정답도 100% 동일 개체
 *              - L2: TargetBox 자연스러운 색상·무늬 변주 3개 / 정답은 그 변주들과 겹치지 않는 또 다른 자연 변주
 * 2) L3~L8   : TargetBox가 "완전 동일" 3개 (targetColorMode: "same").
 *              정답은 TargetBox와 동일 개체(same_as_target).
 *              오답 개수(2지선다→objectCount 2 / 3지선다→objectCount 3) ×
 *              오답 거리(대분류 / 중분류 / 세분류) 조합 = 2 × 3 = 6레벨
 * 3) L9~L14  : TargetBox가 "자연스러운 변주" 3개 (targetColorMode: "natural").
 *              정답은 TargetBox 안에 이미 있던 개체 중 하나(same_as_target).
 *              동일하게 오답 개수 × 오답 거리 조합 = 6레벨
 * 4) L15~L20 : TargetBox가 "자연스러운 변주" 3개는 동일하지만,
 *              정답은 TargetBox에 없던 완전히 새로운 개체(unseen_variant).
 *              동일하게 오답 개수 × 오답 거리 조합 = 6레벨
 *
 * 총 2 + 6 + 6 + 6 = 20레벨
 */

// TargetBox 3개가 서로 어떤 방식으로 구성되는지
// - "same"    : 완전히 동일한 형태/색상의 개체 3개 (예: 완전히 똑같은 강아지 3마리)
// - "natural" : 같은 종류지만 색상/무늬/디테일이 자연스럽게 다른 개체 3개 (예: 흰둥이/까망이/누렁이 강아지)
export type TargetColorMode = "same" | "natural";

// ObjectBox 정답 개체가 TargetBox와 어떤 관계인지
// - "same_as_target"  : 정답이 TargetBox에 있던 개체와 동일함
//                        (완전 동일 모드에서는 "완전 일치", 자연 변주 모드에서는 "이미 보여준 특정 개체와 일치")
// - "natural_variant"  : 정답이 TargetBox엔 없지만, 그 3개와 겹치지 않는 또 다른 "자연스러운" 색상/무늬의 같은 종 개체
// - "unseen_variant"  : 정답이 TargetBox에 전혀 없던, 완전히 새로운 개체(같은 종이지만 새로운 무늬/모습)
export type CorrectObjectMode =
  | "same_as_target"
  | "natural_variant"
  | "unseen_variant";

// 오답이 정답(=타겟 종류)과 얼마나 먼 카테고리인지
// - "different_category"    : 대분류 - 완전히 다른 카테고리 (예: 강아지 vs 빵, TV)
// - "different_subcategory" : 중분류 - 같은 동물군이지만 다른 종 (예: 강아지 vs 오리, 거북이, 펭귄, 문어)
// - "different_type"        : 세분류 - 매우 유사한 다른 동물 (예: 강아지 vs 고양이, 토끼)
export type WrongAnswerDistance =
  | "different_category"
  | "different_subcategory"
  | "different_type";

export type CategoryLevelConfig = {
  level: number;

  // "single": 오답 없이 정답만 고르는 단계 / "choice": 오답과 함께 정답을 골라내는 단계
  mode: "single" | "choice";

  // ObjectBox에 들어갈 전체 개체 "종류" 수 (정답 1종 + 오답 N종)
  objectCount: number;

  // TargetBox의 슬롯 수 (항상 3)
  targetSlotCount: number;

  // TargetBox 3개의 구성 방식
  targetColorMode: TargetColorMode;

  // ObjectBox 정답 개체가 TargetBox와 어떤 관계인지
  correctObjectMode: CorrectObjectMode;

  // 오답의 카테고리 거리. mode가 "single"이면 오답이 없으므로 undefined.
  wrongRelation?: WrongAnswerDistance;

  rule: "category_classification";
};

// ---------- 타입 정의 ----------
export type TopCategory =
  | "animal"
  | "food"
  | "drink"
  | "clothing"
  | "living"
  | "vehicle";

export type SubCategory =
  // 동물
  | "land_animal"
  | "insect"
  | "bird"
  | "sea_animal"
  // 먹는 것
  | "fruit"
  | "vegetable"
  | "meal"
  | "snack"
  // 마시는 것
  | "beverage"
  // 입는 것
  | "clothes"
  | "shoes"
  | "hat"
  // 생활
  | "furniture"
  | "electronics"
  | "stationery"
  | "daily"
  | "cleaning"
  | "bathroom"
  | "kitchen"
  // 탈것
  | "road_vehicle"
  | "rail_special"
  | "air_vehicle"
  | "water_vehicle";

export type CategoryVariant = {
  id: string; // "white", "brown", "spotted", "red" 등
  name?: string; // "흰둥이", "누렁이", "빨간사과" (선택)
  // SVG에 바로 넣을 수 있는 색상 값들
  primary: string; // 메인 색상 (fill)
  secondary?: string; // 보조 색상 (귀, 배, 무늬 등)
  accent?: string; // 포인트 색상 (코, 눈, 줄기 등)
  pattern?: "spots" | "stripes" | "patches"; // 간단한 무늬 타입
};

export type CategoryGameObject = {
  id: string; // "dog"
  name: string; // "개"
  topCategory: TopCategory;
  subCategory: SubCategory;
  // SVG를 그릴 때 사용할 기본 모양 키 (컴포넌트 매핑용)
  svgKey: string; // "dog", "apple", "car" 등
  // 이 종류의 자연스러운 색상 변주들
  variants: CategoryVariant[];
  description: string;
};

// category/type/types.ts (또는 공통 types)

export type GeneratedItem = {
  id: string; // 고유 ID (예: "obj-dog-white-1")
  objectId: string; // "dog"
  variantId: string; // "white"
  svgKey: string; // "dog"
  name: string; // "개"
  variant: CategoryVariant;
  isCorrect: boolean;
};

export type CategoryRound = {
  id: string;
  game: "category";
  level: number;
  round: number;
  type: "category_classification";
  rule: "category_classification";

  // Shape와 동일한 인터페이스
  objects: GeneratedItem[]; // 드래그할 스티커들 (정답 + 오답)
  targets: GeneratedItem[]; // TargetArea에 보여줄 것들 (3개 예시 + 1개 빈칸용)
  answer: Record<string, string>; // objectId → targetId

  correctObjectId: string;
  wrongObjectIds?: string[];

  // 디버깅/추가 정보용 (선택)
  targetBox?: GeneratedItem[]; // 원래 3개 예시
  correctIndex?: number;
};
