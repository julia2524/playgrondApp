// shape/generator.ts

import { BABY_SHAPES, getShapeItems } from "./constants/shapePool";
import {
  ColorMode,
  ShapeGameObject,
  ShapeGameTarget,
  ShapeLevelConfig,
  ShapeRound,
} from "./type/types";

// ==================================================
// 기본 설정
// ==================================================
const SHAPE_COLOR_POOL = ["red", "blue", "yellow", "green", "black", "white"];

// ==================================================
// Random Helpers
// ==================================================
const pickRandom = <T>(items: T[]): T => {
  if (items.length === 0) throw new Error("pickRandom: empty array");
  return items[Math.floor(Math.random() * items.length)];
};

const pickN = <T>(items: T[], count: number): T[] => {
  if (items.length < count) {
    throw new Error(`pickN: ${count}개 필요하지만 ${items.length}개만 있음`);
  }
  const copied = [...items];
  for (let i = copied.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied.slice(0, count);
};

const shuffleArray = <T>(items: T[]): T[] => {
  const copied = [...items];
  for (let i = copied.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
};

// ==================================================
// Shape Helpers
// ==================================================
const pickShapeId = (): string => pickRandom(BABY_SHAPES).id;

const getOtherShapeIds = (excludeShapeId: string): string[] =>
  BABY_SHAPES.map((s) => s.id).filter((id) => id !== excludeShapeId);

// ==================================================
// Color Helpers
// ==================================================
const pickColor = (excluded: string[] = []): string => {
  const available = SHAPE_COLOR_POOL.filter((c) => !excluded.includes(c));
  if (available.length === 0) {
    return pickRandom(SHAPE_COLOR_POOL);
  }
  return pickRandom(available);
};

const createTargetColors = (
  mode: ColorMode,
  count: number,
): (string | undefined)[] => {
  // TODO: SVG 수정 후 undefined로 변경
  if (mode === "natural") {
    return Array.from({ length: count }, () => "brown");
  }
  if (mode === "same" || mode === "same_as_each_other") {
    const color = pickColor();
    return Array.from({ length: count }, () => color);
  }
  if (mode === "different") {
    return pickN(SHAPE_COLOR_POOL, count);
  }
  return Array.from({ length: count }, () => pickColor());
};

const resolveObjectColor = (params: {
  mode: ColorMode;
  targetColors: (string | undefined)[];
  correctColor?: string | undefined;
  avoidTargetColors?: boolean;
}): string | undefined => {
  const {
    mode,
    targetColors,
    correctColor,
    avoidTargetColors = false,
  } = params;

  // TODO: SVG 수정 후 undefined로 변경
  if (mode === "natural") return "brown";

  if (
    mode === "same_as_target" ||
    mode === "same_as_each_other" ||
    mode === "same_as_correct"
  ) {
    const first = targetColors.find((c): c is string => c !== undefined);
    return first ?? pickColor();
  }

  if (mode === "different_from_target" || mode === "not_in_target") {
    const excluded = targetColors.filter((c): c is string => c !== undefined);
    return pickColor(excluded);
  }

  if (mode === "different") {
    const excluded = correctColor !== undefined ? [correctColor] : [];
    return pickColor(excluded);
  }

  if (mode === "random") {
    const excluded = avoidTargetColors
      ? targetColors.filter((c): c is string => c !== undefined)
      : [];
    return pickColor(excluded);
  }

  return pickColor();
};

// ==================================================
// Object 생성
// ==================================================
const createShapeObject = (
  id: string,
  shapeId: string,
  color?: string,
): ShapeGameObject => ({
  id,
  kind: "shape",
  shapeId,
  color,
});

const createItemObject = (
  id: string,
  shapeId: string,
  color: string | undefined,
  excludedItemIds: string[] = [],
): ShapeGameObject => {
  const items = getShapeItems(shapeId as any).filter(
    (item) => !excludedItemIds.includes(item.id),
  );
  if (items.length === 0) {
    throw new Error(
      `shapeId=${shapeId}에서 사용 가능한 item이 없습니다. pool을 늘려주세요.`,
    );
  }
  const item = pickRandom(items);
  return {
    id,
    kind: "item",
    shapeId,
    itemId: item.id,
    color,
  };
};

// ==================================================
// 메인: Round 생성
// ==================================================
export const createShapeRound = (
  config: ShapeLevelConfig,
  round: number,
): ShapeRound => {
  const correctShapeId = pickShapeId();
  const slotCount = config.targetSlotCount;
  const usedItemIds = new Set<string>();

  // ------------------------------------------------
  // 1. Target 색상 결정
  // ------------------------------------------------
  const targetColors = createTargetColors(config.targetColorMode, slotCount);

  // ------------------------------------------------
  // 2. 정답 Object 색상 결정
  // ------------------------------------------------
  const correctColor = resolveObjectColor({
    mode: config.correctColorMode,
    targetColors,
    avoidTargetColors: config.avoidTargetColors,
  });

  // ------------------------------------------------
  // 3. 정답 Object 생성
  // ------------------------------------------------
  let correctObject: ShapeGameObject;

  if (config.correctKind === "item") {
    correctObject = createItemObject(
      "object-correct",
      correctShapeId,
      correctColor,
      Array.from(usedItemIds),
    );
    usedItemIds.add(correctObject.itemId!);
  } else {
    correctObject = createShapeObject(
      "object-correct",
      correctShapeId,
      correctColor,
    );
  }

  // ------------------------------------------------
  // 4. Target 4개 생성 (사물 중복 완전 방지)
  // ------------------------------------------------
  const targets: ShapeGameTarget[] = [];

  for (let i = 0; i < slotCount; i++) {
    if (config.targetKind === "shape") {
      targets.push({
        id: `target-${i + 1}`,
        kind: "shape",
        shapeId: correctShapeId,
        color: targetColors[i],
      });
    } else {
      const available = getShapeItems(correctShapeId as any).filter(
        (item) => !usedItemIds.has(item.id),
      );
      if (available.length === 0) {
        throw new Error(
          `shapeId=${correctShapeId}에서 target용 item이 부족합니다.`,
        );
      }
      const item = pickRandom(available);
      usedItemIds.add(item.id);

      targets.push({
        id: `target-${i + 1}`,
        kind: "item",
        shapeId: correctShapeId,
        itemId: item.id,
        color: targetColors[i],
      });
    }
  }

  // ------------------------------------------------
  // 5. ★ 정답 슬롯을 Object와 완전히 동일하게 덮어쓰기
  // ------------------------------------------------
  const correctIndex = Math.floor(Math.random() * slotCount);

  if (correctObject.kind === "item") {
    targets[correctIndex] = {
      id: targets[correctIndex].id,
      kind: "item",
      shapeId: correctObject.shapeId,
      itemId: correctObject.itemId!,
      color: correctObject.color,
    };
  } else {
    targets[correctIndex] = {
      id: targets[correctIndex].id,
      kind: "shape",
      shapeId: correctObject.shapeId,
      color: correctObject.color,
    };
  }

  // ------------------------------------------------
  // 6. 섞기
  // ------------------------------------------------
  const shuffledTargets = shuffleArray(targets);
  const correctTarget = shuffledTargets.find(
    (t) => t.id === targets[correctIndex].id,
  )!;

  // ------------------------------------------------
  // 7. Single 모드
  // ------------------------------------------------
  if (config.mode === "single") {
    return {
      id: `shape-${config.level}-${round}`,
      game: "shape",
      level: config.level,
      round,
      type: "single",
      rule: "shape_classification",
      objects: [correctObject],
      targets: shuffledTargets,
      answer: {
        [correctObject.id]: correctTarget.id,
      },
      correctObjectId: correctObject.id,
    };
  }

  // ------------------------------------------------
  // 8. Choice 모드 (Level 9~21)
  // ------------------------------------------------
  let wrongColor: string | undefined;

  if (config.sameChoiceColor) {
    // 정답/오답 색상 강제 동일
    wrongColor = correctColor;
  } else if (config.wrongColorMode) {
    wrongColor = resolveObjectColor({
      mode: config.wrongColorMode,
      targetColors: shuffledTargets.map((t) => t.color),
      correctColor,
      avoidTargetColors: config.avoidTargetColors,
    });
  } else {
    wrongColor = pickColor();
  }

  const wrongShapeId = pickRandom(getOtherShapeIds(correctShapeId));

  let wrongObject: ShapeGameObject;

  if (config.wrongKind === "item") {
    wrongObject = createItemObject(
      "object-wrong",
      wrongShapeId,
      wrongColor,
      Array.from(usedItemIds), // target + correct에 이미 쓰인 item 전부 제외
    );
  } else {
    wrongObject = createShapeObject("object-wrong", wrongShapeId, wrongColor);
  }

  const objects = shuffleArray([correctObject, wrongObject]);

  return {
    id: `shape-${config.level}-${round}`,
    game: "shape",
    level: config.level,
    round,
    type: "choice",
    rule: "shape_classification",
    objects,
    targets: shuffledTargets,
    answer: {
      [correctObject.id]: correctTarget.id,
    },
    correctObjectId: correctObject.id,
    wrongObjectIds: [wrongObject.id],
  };
};
