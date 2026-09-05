// shape/generator.ts (또는 해당 파일)

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
// Random
// ==================================================

const pickRandom = <T>(items: T[]): T => {
  if (items.length === 0) {
    throw new Error("pickRandom: empty array");
  }
  return items[Math.floor(Math.random() * items.length)];
};

const pickN = <T>(items: T[], count: number): T[] => {
  if (items.length < count) {
    throw new Error(
      `pickN: ${count}개를 뽑으려고 했지만 ${items.length}개밖에 없습니다.`,
    );
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
// Shape
// ==================================================

const pickShapeId = (): string => {
  return pickRandom(BABY_SHAPES).id;
};

const getOtherShapeIds = (excludeShapeId: string): string[] => {
  return BABY_SHAPES.map((s) => s.id).filter((id) => id !== excludeShapeId);
};

// ==================================================
// Color
// ==================================================

const pickColor = (excludedColors: string[] = []): string => {
  const availableColors = SHAPE_COLOR_POOL.filter(
    (color) => !excludedColors.includes(color),
  );

  if (availableColors.length === 0) {
    throw new Error("사용 가능한 색상이 없습니다. colorPool을 확인해주세요.");
  }

  return pickRandom(availableColors);
};

// ==================================================
// Target Color
// ==================================================

const createTargetColors = (
  mode: ColorMode,
  count: number,
): (string | undefined)[] => {
  if (mode === "natural") {
    return Array.from({ length: count }, () => undefined);
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

// ==================================================
// Object Color
// ==================================================

type ResolveObjectColorParams = {
  mode: ColorMode;
  targetColors: (string | undefined)[];
  correctColor?: string;
  avoidTargetColors?: boolean;
};

const resolveObjectColor = ({
  mode,
  targetColors,
  correctColor,
  avoidTargetColors = false,
}: ResolveObjectColorParams): string | undefined => {
  if (mode === "natural") {
    return undefined;
  }

  if (
    mode === "same_as_target" ||
    mode === "same_as_each_other" ||
    mode === "same_as_correct"
  ) {
    if (correctColor !== undefined) {
      return correctColor;
    }

    const firstTargetColor = targetColors.find(
      (color): color is string => color !== undefined,
    );

    if (firstTargetColor !== undefined) {
      return firstTargetColor;
    }

    return pickColor();
  }

  if (mode === "different_from_target" || mode === "not_in_target") {
    const targetColorsOnly = targetColors.filter(
      (color): color is string => color !== undefined,
    );
    return pickColor(targetColorsOnly);
  }

  if (mode === "different") {
    const excludedColors = correctColor !== undefined ? [correctColor] : [];
    return pickColor(excludedColors);
  }

  if (mode === "random") {
    const excludedColors = avoidTargetColors
      ? targetColors.filter((color): color is string => color !== undefined)
      : [];
    return pickColor(excludedColors);
  }

  return pickColor();
};

// ==================================================
// Target 생성
// 4자리 전부 같은 모양 (3개 힌트 + 1개 빈칸 정답)
// 정답 위치는 shuffle로 랜덤
// ==================================================

const createTargets = (
  config: ShapeLevelConfig,
  correctShapeId: string,
): ShapeGameTarget[] => {
  const slotCount = config.targetSlotCount;

  // 1. 모든 슬롯을 동일한 모양으로
  const targetShapeIds = Array.from(
    { length: slotCount },
    () => correctShapeId,
  );

  // 2. 색상 결정
  const colors = createTargetColors(config.targetColorMode, slotCount);

  // 3. Target 생성
  const targets: ShapeGameTarget[] = targetShapeIds.map((shapeId, index) => {
    if (config.targetKind === "shape") {
      return {
        id: `target-${index + 1}`,
        kind: "shape" as const,
        shapeId,
        color: colors[index],
      };
    }

    const items = getShapeItems(shapeId as Parameters<typeof getShapeItems>[0]);
    const item = pickRandom(items);

    return {
      id: `target-${index + 1}`,
      kind: "item" as const,
      shapeId,
      itemId: item.id,
      color: colors[index],
    };
  });

  // 4. 순서 섞기 → 빈칸 위치 랜덤
  return shuffleArray(targets);
};

// ==================================================
// Object 생성
// ==================================================

type CreateObjectParams = {
  id: string;
  kind: "shape" | "item";
  shapeId: string;
  color?: string;
};

const createObject = ({
  id,
  kind,
  shapeId,
  color,
}: CreateObjectParams): ShapeGameObject => {
  if (kind === "shape") {
    return {
      id,
      kind: "shape",
      shapeId,
      color,
    };
  }

  const items = getShapeItems(shapeId as Parameters<typeof getShapeItems>[0]);
  const item = pickRandom(items);

  return {
    id,
    kind: "item",
    shapeId,
    itemId: item.id,
    color,
  };
};

const createItemObject = (
  id: string,
  shapeId: string,
  color?: string,
  excludedItemIds: string[] = [],
): ShapeGameObject => {
  const items = getShapeItems(
    shapeId as Parameters<typeof getShapeItems>[0],
  ).filter((item) => !excludedItemIds.includes(item.id));

  if (items.length === 0) {
    throw new Error(`shapeId=${shapeId}에서 사용할 수 있는 item이 없습니다.`);
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
// Round 생성
// ==================================================

export const createShapeRound = (
  config: ShapeLevelConfig,
  round: number,
): ShapeRound => {
  const correctShapeId = pickShapeId();
  const slotCount = config.targetSlotCount;

  // ------------------------------------------------
  // 1. 일단 4개의 target 색상 미리 결정
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
  // 3. 정답 Object 먼저 생성
  // ------------------------------------------------
  let correctObject: ShapeGameObject;

  if (config.correctKind === "item") {
    correctObject = createItemObject(
      "object-correct",
      correctShapeId,
      correctColor,
    );
  } else {
    correctObject = createObject({
      id: "object-correct",
      kind: "shape",
      shapeId: correctShapeId,
      color: correctColor,
    });
  }

  // ------------------------------------------------
  // 4. Target 4개 생성
  //    - 3개는 힌트
  //    - 1개는 Object와 최대한 동일한 정답 슬롯
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
      const items = getShapeItems(correctShapeId as any);
      const item = pickRandom(items);
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
  // 5. 정답 슬롯 하나를 Object와 동일하게 만들기
  // ------------------------------------------------
  const correctIndex = Math.floor(Math.random() * slotCount);
  // ★ Object의 kind를 그대로 사용
  if (correctObject.kind === "item") {
    targets[correctIndex] = {
      id: targets[correctIndex].id,
      kind: "item",
      shapeId: correctObject.shapeId,
      itemId: (correctObject as any).itemId,
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

  // 정답 슬롯을 Object와 최대한 같게 덮어쓰기
  // if (config.targetKind === "shape") {
  //   targets[correctIndex] = {
  //     id: targets[correctIndex].id,
  //     kind: "shape",
  //     shapeId: correctObject.shapeId,
  //     color: correctObject.color, // ★ Object와 같은 색
  //   };
  // } else {
  //   // targetKind === "item"
  //   targets[correctIndex] = {
  //     id: targets[correctIndex].id,
  //     kind: "item",
  //     shapeId: correctObject.shapeId,
  //     itemId: (correctObject as any).itemId,
  //     color: correctObject.color,
  //   };
  // }

  // ------------------------------------------------
  // 6. 순서 섞기 (정답 위치 랜덤)
  // ------------------------------------------------
  const shuffledTargets = shuffleArray(targets);

  // shuffle 후에 정답 target 다시 찾기
  const correctTarget = shuffledTargets.find(
    (t) => t.id === targets[correctIndex].id,
  )!;

  // ------------------------------------------------
  // Single / Choice 분기
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

  // Choice 모드 (기존 로직 유지)
  const wrongColor = config.sameChoiceColor
    ? correctColor
    : config.wrongColorMode
      ? resolveObjectColor({
          mode: config.wrongColorMode,
          targetColors: shuffledTargets.map((t) => t.color),
          correctColor,
          avoidTargetColors: config.avoidTargetColors,
        })
      : pickColor();

  const otherShapeIds = getOtherShapeIds(correctShapeId);
  const wrongShapeId = pickRandom(otherShapeIds);

  let wrongObject: ShapeGameObject;

  if (config.wrongKind === "item") {
    wrongObject = createItemObject("object-wrong", wrongShapeId, wrongColor);
  } else {
    wrongObject = createObject({
      id: "object-wrong",
      kind: "shape",
      shapeId: wrongShapeId,
      color: wrongColor,
    });
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
