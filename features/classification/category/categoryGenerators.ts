// ============================================================
// Category Classification Generator
// ============================================================

import { categoryObjects } from "./constants/categoryPool";
import { categoryLevels } from "./constants/levels";
import {
  CategoryLevelConfig,
  CategoryObject,
  ColorVariant,
  CorrectObjectMode,
  TargetColorMode,
  WrongAnswerDistance,
} from "./type/types";

// ---------- 결과 타입 ----------
export type GeneratedItem = {
  objectId: string; // "dog"
  variantId: string; // "white"
  svgKey: string; // "dog"
  name: string; // "개"
  variant: ColorVariant; // 색상 정보
  isCorrect: boolean;
};

export type CategoryProblem = {
  level: number;
  config: CategoryLevelConfig;
  targetBox: GeneratedItem[]; // 항상 3개
  objectBox: GeneratedItem[]; // 1~3개 (정답 + 오답)
  correctIndex: number; // objectBox에서 정답 위치
};

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
  return shuffle(arr).slice(0, n);
}

// ---------- 오답 후보 필터 ----------
function getWrongCandidates(
  target: CategoryObject,
  distance: WrongAnswerDistance,
): CategoryObject[] {
  switch (distance) {
    case "different_category":
      // 대분류가 다른 것
      return categoryObjects.filter(
        (o) => o.topCategory !== target.topCategory,
      );

    case "different_subcategory":
      // 같은 대분류 + 다른 중분류
      return categoryObjects.filter(
        (o) =>
          o.topCategory === target.topCategory &&
          o.subCategory !== target.subCategory,
      );

    case "different_type":
      // 같은 중분류 + 다른 종류 (개 vs 고양이)
      return categoryObjects.filter(
        (o) => o.subCategory === target.subCategory && o.id !== target.id,
      );

    default:
      return [];
  }
}

// ---------- TargetBox 생성 ----------
function createTargetBox(
  targetObj: CategoryObject,
  mode: TargetColorMode,
  slotCount: number,
): GeneratedItem[] {
  if (mode === "same") {
    // 완전히 동일한 variant 3개
    const variant = pickRandom(targetObj.variants);
    return Array.from({ length: slotCount }, () => ({
      objectId: targetObj.id,
      variantId: variant.id,
      svgKey: targetObj.svgKey,
      name: targetObj.name,
      variant,
      isCorrect: false, // TargetBox는 정답 표시 안 함
    }));
  }

  // natural: 서로 다른 variant 3개
  const selectedVariants = pickNRandom(targetObj.variants, slotCount);
  // variants가 부족하면 중복 허용 (안전장치)
  while (selectedVariants.length < slotCount) {
    selectedVariants.push(pickRandom(targetObj.variants));
  }

  return selectedVariants.map((variant) => ({
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
  targetObj: CategoryObject,
  targetBox: GeneratedItem[],
  mode: CorrectObjectMode,
): GeneratedItem {
  if (mode === "same_as_target") {
    // TargetBox에 이미 있는 variant 중 하나 재사용
    const picked = pickRandom(targetBox);
    return {
      ...picked,
      isCorrect: true,
    };
  }

  if (mode === "natural_variant" || mode === "unseen_variant") {
    // TargetBox에 없는 새로운 variant
    const usedIds = new Set(targetBox.map((t) => t.variantId));
    const available = targetObj.variants.filter((v) => !usedIds.has(v.id));

    // 사용 가능한 게 없으면 아무거나 (거의 발생 안 함)
    const variant =
      available.length > 0
        ? pickRandom(available)
        : pickRandom(targetObj.variants);

    return {
      objectId: targetObj.id,
      variantId: variant.id,
      svgKey: targetObj.svgKey,
      name: targetObj.name,
      variant,
      isCorrect: true,
    };
  }

  // fallback
  const variant = pickRandom(targetObj.variants);
  return {
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
  targetObj: CategoryObject,
  count: number,
  distance: WrongAnswerDistance,
): GeneratedItem[] {
  const candidates = getWrongCandidates(targetObj, distance);

  if (candidates.length === 0) {
    console.warn(`No candidates for distance: ${distance}`);
    // fallback: 아무거나
    return pickNRandom(categoryObjects, count).map((obj) => {
      const variant = pickRandom(obj.variants);
      return {
        objectId: obj.id,
        variantId: variant.id,
        svgKey: obj.svgKey,
        name: obj.name,
        variant,
        isCorrect: false,
      };
    });
  }

  const selected = pickNRandom(candidates, count);

  return selected.map((obj) => {
    const variant = pickRandom(obj.variants);
    return {
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
export function generateCategoryProblem(level: number): CategoryProblem {
  const config = categoryLevels.find((c) => c.level === level);
  if (!config) {
    throw new Error(`Invalid level: ${level}`);
  }

  // 1. 타겟 종류 선택 (variants가 충분한 것 우선)
  // natural / unseen을 위해 variants가 4개 이상인 것을 선호
  const suitableObjects = categoryObjects.filter((o) => {
    if (
      config.targetColorMode === "natural" ||
      config.correctObjectMode === "unseen_variant"
    ) {
      return o.variants.length >= 4;
    }
    return o.variants.length >= 1;
  });

  const targetObj =
    suitableObjects.length > 0
      ? pickRandom(suitableObjects)
      : pickRandom(categoryObjects);

  // 2. TargetBox 생성
  const targetBox = createTargetBox(
    targetObj,
    config.targetColorMode,
    config.targetSlotCount,
  );

  // 3. 정답 생성
  const correctItem = createCorrectItem(
    targetObj,
    targetBox,
    config.correctObjectMode,
  );

  // 4. 오답 생성
  let wrongItems: GeneratedItem[] = [];
  if (config.mode === "choice" && config.wrongRelation) {
    const wrongCount = config.objectCount - 1;
    wrongItems = createWrongItems(targetObj, wrongCount, config.wrongRelation);
  }

  // 5. ObjectBox 섞기
  const objectBox = shuffle([correctItem, ...wrongItems]);
  const correctIndex = objectBox.findIndex((item) => item.isCorrect);

  return {
    level,
    config,
    targetBox,
    objectBox,
    correctIndex,
  };
}

// ---------- 여러 문제 한 번에 생성 (테스트용) ----------
export function generateMultipleProblems(
  level: number,
  count: number,
): CategoryProblem[] {
  return Array.from({ length: count }, () => generateCategoryProblem(level));
}
