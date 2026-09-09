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

// ---------- 오답 후보 필터 ----------
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
): GeneratedItem[] {
  const candidates = getWrongCandidates(targetObj, distance);

  const pool =
    candidates.length > 0
      ? candidates
      : CategoryGameObjects1.filter((o) => o.id !== targetObj.id);

  const selected = pickNRandom(pool, count);

  return selected.map((obj) => {
    const variant = pickRandom(obj.variants);
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
    wrongItems = createWrongItems(targetObj, wrongCount, config.wrongRelation);
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
