// 뽑힌 재료로 실제 문제를 어떻게 만들 것인가

import { COLOR_ITEM_POOL, COLOR_POOL } from "../../constants/colors";
import { ClassificationRound } from "./types";

// --- 1. 데이터 풀 및 유틸 함수 ---> colors.ts로 옮기면...!!?
const COLORS = ["red", "blue", "yellow", "green", "purple"];
const availableFruits = ["apple", "banana", "grape", "orange"];
const availableVegetables = ["carrot", "broccoli", "corn", "cucumber"];

const availableColors = ["red", "blue", "yellow", "green", "purple", "orange"];
const availableShapes = ["circle", "square", "triangle", "star", "heart"];

const shuffleArray = <T>(array: T[]): T[] =>
  [...array].sort(() => Math.random() - 0.5);

// --- 2. 규칙별 라운드 생성 함수들 ---

export function createLevel1ColorRound(
  levelConfig: any,
  roundNumber: number,
): ClassificationRound {
  // 1. 이번 라운드의 정답 색상 선정 (예: 분홍/빨강 등)
  const shuffledColors = shuffleArray([...COLOR_POOL]);

  const targetColor = shuffledColors[0]; // 정답 색상 (예: red)
  //console.log("targetColor: ", targetColor);
  const distractorColor = shuffledColors[1]; // 헷갈리는 오답 색상 (예: blue)

  // 2. TargetBox (중앙): 정답 색상을 대표하는 물건들 (예: 복숭아, 인형 등 여러 개가 모여 있는 그룹)
  // 2. 해당 색상의 풀에서 무작위로 사물들 골라내기
  const targetItems = COLOR_ITEM_POOL[targetColor] || [
    "물건1",
    "물건2",
    "물건3",
    "물건4",
  ];
  const distractorItems = COLOR_ITEM_POOL[distractorColor] || [
    "다른물건1",
    "다른물건2",
  ];

  const shuffledTargetItems = shuffleArray(targetItems);
  const shuffledDistractorItems = shuffleArray(distractorItems);

  const targetBoxItems = shuffledTargetItems.slice(0, 4);

  // 0, 1, 2, 3 중 무작위로 하나의 인덱스를 골라!
  const randomMissingIndex = Math.floor(Math.random() * targetBoxItems.length);
  const missingItem = targetBoxItems[randomMissingIndex]; // 랜덤한 위치의 아이템이 빈자리가 됨!

  // TargetBox에는 정답 색상의 사물들 중 3개를 무작위로 모아서 보여줌
  const targetId = `target-${roundNumber}-${targetColor}`;
  const targets = [
    {
      id: targetId,
      color: targetColor,
      items: targetBoxItems,
    },
  ];

  // ObjectBox: 정답 사물 1개 + 오답 사물 1개 (총 2개)를 랜덤으로 섞어서 배치
  const rawObjects = [
    {
      id: `obj-${roundNumber}-correct`,
      color: targetColor,
      name: missingItem, // 위에서 쓴 것과 겹치지 않는 사물 선택
    },
    {
      id: `obj-${roundNumber}-wrong`,
      color: distractorColor,
      name: shuffledDistractorItems[0],
    },
  ];
  const objects = shuffleArray(rawObjects);

  // 정답 매칭
  const answer: Record<string, string> = {};
  objects.forEach((obj) => {
    if (obj.color === targetColor) {
      answer[obj.id] = targetId;
    }
  });

  return {
    id: `classification-${levelConfig.level}-${roundNumber}`,
    game: "classification",
    level: levelConfig.level,
    round: roundNumber,
    type: "drag_sort",
    objects,
    targets,
    answer,
    rule: levelConfig.rule,
    missingItem,
  };
}
// 규칙 A: 같은 색상 매칭 (Level 1)
export function createSameColorRound(
  levelConfig: any,
  roundNumber: number,
): ClassificationRound {
  const objectCount = levelConfig.objectCount || 3;
  const targetCount = levelConfig.targetCount || 3;
  const selectedColors = shuffleArray(COLORS).slice(0, targetCount);

  const objects = selectedColors.map((color, index) => ({
    id: `${color}Ball-${roundNumber}-${index}`,
    color,
  }));

  const targets = selectedColors.map((color, index) => ({
    id: `${color}Box-${roundNumber}-${index}`,
    color,
  }));

  const answer: Record<string, string> = {};
  objects.forEach((object) => {
    const target = targets.find((t) => t.color === object.color);
    if (target) answer[object.id] = target.id;
  });

  return {
    id: `classification-${levelConfig.level}-${roundNumber}`,
    game: "classification",
    level: levelConfig.level,
    round: roundNumber,
    type: "drag_sort",
    objects,
    targets,
    answer,
    rule: "color",
  };
}

// 규칙 B: 색상 + 모양 매칭 (Level 2, Level 5 등)
export function createRandomColorAndShapeRound(
  levelConfig: any,
  roundNumber: number,
): ClassificationRound {
  const objectCount = levelConfig.objectCount || 3;

  const shuffledColors = shuffleArray(availableColors).slice(0, objectCount);
  const shuffledShapes = shuffleArray(availableShapes).slice(0, objectCount);

  const baseSet: { color: string; shape: string }[] = [];
  for (let i = 0; i < objectCount; i++) {
    baseSet.push({
      color: shuffledColors[i],
      shape: shuffledShapes[i],
    });
  }

  const objects = [];
  for (let i = 0; i < objectCount; i++) {
    const source = baseSet[i % baseSet.length];
    objects.push({
      id: `object-${roundNumber}-${i + 1}`,
      color: source.color,
      shape: source.shape,
    });
  }

  const targets = baseSet.map((item, index) => ({
    id: `target-${roundNumber}-${index + 1}`,
    color: item.color,
    shape: item.shape,
  }));

  const answer: Record<string, string> = {};
  objects.forEach((object) => {
    const target = targets.find(
      (t) => t.color === object.color && t.shape === object.shape,
    );
    if (target) answer[object.id] = target.id;
  });

  return {
    id: `classification-${levelConfig.level}-${roundNumber}`,
    game: "classification",
    level: levelConfig.level,
    round: roundNumber,
    type: "drag_sort",
    objects,
    targets,
    answer,
    rule: "same_color_and_shape",
  };
}

// 규칙 C: 과일/채소 분류 (Level 3)
export function createFruitVegetableRound(
  levelConfig: any,
  roundNumber: number,
): ClassificationRound {
  const objectCount = levelConfig.objectCount || 4;
  const halfCount = Math.floor(objectCount / 2);

  const selectedFruits = shuffleArray(availableFruits)
    .slice(0, halfCount)
    .map((name) => ({ name, category: "fruit" }));

  const selectedVegetables = shuffleArray(availableVegetables)
    .slice(0, objectCount - halfCount)
    .map((name) => ({ name, category: "vegetable" }));

  const objects = shuffleArray([...selectedFruits, ...selectedVegetables]).map(
    (item, index) => ({
      id: `food-${roundNumber}-${index + 1}`,
      name: item.name,
      category: item.category,
    }),
  );

  const targets = [
    { id: "fruitBasket", category: "fruit" },
    { id: "vegetableBasket", category: "vegetable" },
  ];

  const answer: Record<string, string> = {};
  objects.forEach((object) => {
    const target = targets.find((t) => t.category === object.category);
    if (target) answer[object.id] = target.id;
  });

  return {
    id: `classification-${levelConfig.level}-${roundNumber}`,
    game: "classification",
    level: levelConfig.level,
    round: roundNumber,
    type: "drag_sort",
    objects,
    targets,
    answer,
    rule: "fruit_or_vegetable",
  };
}

// 규칙 D: 크기 분류 (색상은 랜덤) (Level 4)
// 규칙 D: 크기 분류 (크기별 균등 배분 + 랜덤 색상)
export function createSizeRound(
  levelConfig: any,
  roundNumber: number,
): ClassificationRound {
  const objectCount = levelConfig.objectCount || 4;
  const halfCount = Math.floor(objectCount / 2);

  // large와 small을 개수에 맞춰 균등하게 생성
  const sizesList = [
    ...Array(halfCount).fill("large"),
    ...Array(objectCount - halfCount).fill("small"),
  ];

  // 크기 목록을 랜덤하게 섞기
  const shuffledSizes = shuffleArray(sizesList);

  const objects = shuffledSizes.map((size, index) => {
    const randomColor = shuffleArray(COLORS)[0]; // 색상은 랜덤 추출
    return {
      id: `object-${roundNumber}-${index + 1}`,
      color: randomColor,
      size: size,
      shape: "circle", // 기본 모양
    };
  });

  const targets = [
    { id: "largeBox", size: "large" },
    { id: "smallBox", size: "small" },
  ];

  const answer: Record<string, string> = {};
  objects.forEach((object) => {
    const target = targets.find((t) => t.size === object.size);
    if (target) answer[object.id] = target.id;
  });

  return {
    id: `classification-${levelConfig.level}-${roundNumber}`,
    game: "classification",
    level: levelConfig.level,
    round: roundNumber,
    type: "drag_sort",
    objects,
    targets,
    answer,
    rule: "size",
  };
}

// --- 3. 규칙에 따라 알맞은 생성 함수를 골라주는 분기기 ---
export function createRoundByRule(
  levelConfig: any,
  roundNumber: number,
): ClassificationRound {
  switch (levelConfig.rule) {
    case "same_color":
      return createSameColorRound(levelConfig, roundNumber);

    case "same_color_and_shape":
      return createRandomColorAndShapeRound(levelConfig, roundNumber);

    case "fruit_or_vegetable":
      return createFruitVegetableRound(levelConfig, roundNumber);

    case "size":
      return createSizeRound(levelConfig, roundNumber);

    default:
      throw new Error(`지원하지 않는 규칙입니다: ${levelConfig.rule}`);
  }
}
