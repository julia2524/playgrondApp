// ============================================================
// Category Classification Generator
// ============================================================

import { CategoryGameObjects1 } from "./constants/categoryPool";
import { categoryLevels } from "./constants/levels";
import {
  CategoryLevelConfig,
  CategoryGameObject,
  CategoryVariant,
  CorrectObjectMode,
  TargetColorMode,
  WrongAnswerDistance,
  CategoryRound,
  GeneratedItem,
} from "./type/types";

// ---------- 유틸 ----------
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickNRandom<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, Math.min(n, arr.length));
}

function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}
// ---------- 색상 유사도 유틸 ----------

type ColorFamily =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "brown"
  | "gray"
  | "white"
  | "black";

// function hexToRgb(hex: string): { r: number; g: number; b: number } {
//   const h = hex.replace("#", "");
//   const full =
//     h.length === 3
//       ? h
//           .split("")
//           .map((c) => c + c)
//           .join("")
//       : h;
//   return {
//     r: parseInt(full.slice(0, 2), 16),
//     g: parseInt(full.slice(2, 4), 16),
//     b: parseInt(full.slice(4, 6), 16),
//   };
// }

function getColorFamily(hex: string): ColorFamily {
  const { r, g, b } = hexToRgb(hex);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max === 0 ? 0 : (max - min) / max;
  const light = (max + min) / 2 / 255;

  // 무채색
  if (sat < 0.18) {
    if (light > 0.85) return "white";
    if (light < 0.25) return "black";
    return "gray";
  }

  // 갈색 계열 (채도 낮고 어두움 + 빨강/노랑 쪽)
  if (sat < 0.45 && light < 0.55 && r > g && g >= b) return "brown";

  // Hue 근사
  let hue = 0;
  const d = max - min;
  if (d !== 0) {
    if (max === r) hue = ((g - b) / d) % 6;
    else if (max === g) hue = (b - r) / d + 2;
    else hue = (r - g) / d + 4;
    hue *= 60;
    if (hue < 0) hue += 360;
  }

  if (hue < 15 || hue >= 345) return "red";
  if (hue < 40) return "orange";
  if (hue < 70) return "yellow";
  if (hue < 160) return "green";
  if (hue < 260) return "blue";
  if (hue < 310) return "purple";
  return "pink";
}

/** 두 색이 비슷한 계열인지 */
function isSimilarColor(a: string, b: string): boolean {
  const fa = getColorFamily(a);
  const fb = getColorFamily(b);
  if (fa === fb) return true;

  // 인접 계열도 허용
  const neighbors: Record<ColorFamily, ColorFamily[]> = {
    red: ["orange", "pink", "brown"],
    orange: ["red", "yellow", "brown"],
    yellow: ["orange", "green"],
    green: ["yellow", "blue"],
    blue: ["green", "purple"],
    purple: ["blue", "pink"],
    pink: ["red", "purple"],
    brown: ["red", "orange", "gray"],
    gray: ["white", "black", "brown"],
    white: ["gray", "yellow"],
    black: ["gray", "brown"],
  };
  return neighbors[fa]?.includes(fb) ?? false;
}

/** 기준 색과 가장 비슷한 variant 고르기 */
// function pickSimilarVariant(
//   variants: CategoryVariant[],
//   referencePrimary: string,
// ): CategoryVariant {
//   const similar = variants.filter((v) =>
//     isSimilarColor(v.primary, referencePrimary),
//   );
//   if (similar.length > 0) return pickRandom(similar);
//   return pickRandom(variants);
// }

// ---------- 오답 후보 필터 ----------
// ---------- 색상 유사도 유틸 (색상 거리 기반) ----------

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

/**
 * 사람 눈에 가까운 저비용 색상 거리 계산 (redmean 근사)
 * 값이 작을수록 두 색이 비슷함. 대략 0(동일) ~ 765(완전 반대색) 범위.
 */
function colorDistance(hexA: string, hexB: string): number {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  const rmean = (a.r + b.r) / 2;
  const dr = a.r - b.r;
  const dg = a.g - b.g;
  const db = a.b - b.b;
  return Math.sqrt(
    (2 + rmean / 256) * dr * dr +
      4 * dg * dg +
      (2 + (255 - rmean) / 256) * db * db,
  );
}

/**
 * 기준 색과 가장 비슷한 variant를 고르는 함수 (기존 시그니처 그대로 유지)
 * - 완전 랜덤 폴백 없이, 항상 "그나마 가장 가까운 색" 안에서만 뽑음
 * - topN(가까운 순 상위 후보) 안에서 랜덤성을 살짝 남겨서 매번 똑같지 않게 함
 */
function pickSimilarVariant(
  variants: CategoryVariant[],
  referencePrimary: string,
): CategoryVariant {
  const scored = variants
    .map((v) => ({
      variant: v,
      dist: colorDistance(v.primary, referencePrimary),
    }))
    .sort((a, b) => a.dist - b.dist);

  const topN = Math.max(1, Math.ceil(scored.length / 2)); // 절반 정도(최소 1개)만 후보로
  const topPool = scored.slice(0, topN);

  return pickRandom(topPool).variant;
}

function getWrongCandidates(
  target: CategoryGameObject,
  distance: WrongAnswerDistance,
): CategoryGameObject[] {
  switch (distance) {
    case "different_category":
      return CategoryGameObjects1.filter(
        (o) => o.topCategory !== target.topCategory,
      );
    case "different_subcategory":
      return CategoryGameObjects1.filter(
        (o) =>
          o.topCategory === target.topCategory &&
          o.subCategory !== target.subCategory,
      );
    case "different_type":
      return CategoryGameObjects1.filter(
        (o) => o.subCategory === target.subCategory && o.id !== target.id,
      );
    default:
      return [];
  }
}

// ---------- TargetBox 생성 ----------
function createTargetBox(
  targetObj: CategoryGameObject,
  mode: TargetColorMode,
  slotCount: number,
): GeneratedItem[] {
  if (mode === "same") {
    const variant = pickRandom(targetObj.variants);
    return Array.from({ length: slotCount }, (_, i) => ({
      id: createId(`target-${targetObj.id}`),
      objectId: targetObj.id,
      variantId: variant.id,
      svgKey: targetObj.svgKey,
      name: targetObj.name,
      variant,
      isCorrect: false,
    }));
  }

  // natural
  let selectedVariants = pickNRandom(targetObj.variants, slotCount);
  while (selectedVariants.length < slotCount) {
    selectedVariants.push(pickRandom(targetObj.variants));
  }

  return selectedVariants.map((variant) => ({
    id: createId(`target-${targetObj.id}`),
    objectId: targetObj.id,
    variantId: variant.id,
    svgKey: targetObj.svgKey,
    name: targetObj.name,
    variant,
    isCorrect: false,
  }));
}

// ---------- 정답 생성 ----------
function createCorrectItem(
  targetObj: CategoryGameObject,
  targetBox: GeneratedItem[],
  mode: CorrectObjectMode,
): GeneratedItem {
  if (mode === "same_as_target") {
    const picked = pickRandom(targetBox);
    return {
      ...picked,
      id: createId(`obj-${targetObj.id}`), // 새로운 id 부여
      isCorrect: true,
    };
  }

  // natural_variant | unseen_variant
  const usedIds = new Set(targetBox.map((t) => t.variantId));
  const available = targetObj.variants.filter((v) => !usedIds.has(v.id));
  const variant =
    available.length > 0
      ? pickRandom(available)
      : pickRandom(targetObj.variants);

  return {
    id: createId(`obj-${targetObj.id}`),
    objectId: targetObj.id,
    variantId: variant.id,
    svgKey: targetObj.svgKey,
    name: targetObj.name,
    variant,
    isCorrect: true,
  };
}

// ---------- 오답 생성 ----------
function createWrongItems(
  targetObj: CategoryGameObject,
  count: number,
  distance: WrongAnswerDistance,
  referencePrimary: string, // ⭐ 정답 색
): GeneratedItem[] {
  const candidates = getWrongCandidates(targetObj, distance);

  const pool =
    candidates.length > 0
      ? candidates
      : CategoryGameObjects1.filter((o) => o.id !== targetObj.id);

  const selected = pickNRandom(pool, count);

  return selected.map((obj) => {
    // ⭐ 정답과 비슷한 톤의 variant 우선
    const variant = pickSimilarVariant(obj.variants, referencePrimary);
    // const variant = pickRandom(obj.variants);
    return {
      id: createId(`obj-${obj.id}`),
      objectId: obj.id,
      variantId: variant.id,
      svgKey: obj.svgKey,
      name: obj.name,
      variant,
      isCorrect: false,
    };
  });
}

// ---------- 메인 Generator ----------
export function createCategoryRound(
  level: number,
  round: number = 1,
): CategoryRound {
  const config = categoryLevels.find((c) => c.level === level);
  if (!config) throw new Error(`Invalid level: ${level}`);

  // 1. 타겟 종류 선택
  const suitableObjects = CategoryGameObjects1.filter((o) => {
    if (
      config.targetColorMode === "natural" ||
      config.correctObjectMode === "unseen_variant" ||
      config.correctObjectMode === "natural_variant"
    ) {
      return o.variants.length >= 3;
    }
    return o.variants.length >= 1;
  });

  const targetObj =
    suitableObjects.length > 0
      ? pickRandom(suitableObjects)
      : pickRandom(CategoryGameObjects1);

  // 2. 예시 3개 (TargetBox에 보이는 것들)
  const exampleItems = createTargetBox(
    targetObj,
    config.targetColorMode,
    config.targetSlotCount, // 3
  );

  // 3. 정답 스티커
  const correctItem = createCorrectItem(
    targetObj,
    exampleItems,
    config.correctObjectMode,
  );

  // 4. 오답 스티커
  let wrongItems: GeneratedItem[] = [];
  if (config.mode === "choice" && config.wrongRelation) {
    const wrongCount = config.objectCount - 1;
    wrongItems = createWrongItems(
      targetObj,
      wrongCount,
      config.wrongRelation,
      correctItem.variant.primary,
    );
  }

  // 5. ★ targets = 예시 3개 + 빈칸용 정답 슬롯 1개
  //    빈칸 슬롯은 정답과 동일한 내용으로 만들되, UI에서 missing으로 처리
  const missingSlot: GeneratedItem = {
    ...correctItem,
    id: createId(`target-missing-${targetObj.id}`),
    isCorrect: true, // 이 슬롯이 정답 자리
  };

  // 예시 3개는 isCorrect: false로 유지
  const visibleTargets = exampleItems.map((item) => ({
    ...item,
    isCorrect: false,
  }));
  // ⭐ 빈칸 위치 랜덤
  const insertIndex = Math.floor(Math.random() * (visibleTargets.length + 1));
  const targets = [
    ...visibleTargets.slice(0, insertIndex),
    missingSlot,
    ...visibleTargets.slice(insertIndex),
  ];

  // 6. objects = 드래그할 것들
  const objects = shuffle([correctItem, ...wrongItems]);

  return {
    id: createId(`category-L${level}-R${round}`),
    game: "category",
    level,
    round,
    type: "category_classification",
    rule: "category_classification",

    objects,
    targets,
    answer: {
      [correctItem.id]: missingSlot.id, // 정답 스티커 → 빈칸 슬롯
    },

    correctObjectId: correctItem.id,
    wrongObjectIds:
      wrongItems.length > 0 ? wrongItems.map((w) => w.id) : undefined,

    // 참고용
    targetBox: exampleItems,
  };
}

// ---------- 여러 문제 한 번에 생성 (테스트용) ----------
export function generateMultipleProblems(
  level: number,
  count: number,
): CategoryRound[] {
  return Array.from({ length: count }, () => createCategoryRound(level));
}
