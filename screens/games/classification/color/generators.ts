// // 뽑힌 재료로 실제 문제를 어떻게 만들 것인가

import {
  PRIMARY_COLORS,
  SECONDARY_COLORS,
  SHAPE_POOL,
  SIMILAR_COLOR_FAMILIES,
} from "../../../../constants/colors";
import { ClassificationRound } from "./types";

// import { COLOR_ITEM_POOL, COLOR_POOL } from "../../constants/colors";
// import { ClassificationRound } from "./types";

// // --- 1. 데이터 풀 및 유틸 함수 ---> colors.ts로 옮기면...!!?
// const COLORS = ["red", "blue", "yellow", "green", "purple"];
// const availableFruits = ["apple", "banana", "grape", "orange"];
// const availableVegetables = ["carrot", "broccoli", "corn", "cucumber"];

// const availableColors = ["red", "blue", "yellow", "green", "purple", "orange"];
// const availableShapes = ["circle", "square", "triangle", "star", "heart"];

// const shuffleArray = <T>(array: T[]): T[] =>
//   [...array].sort(() => Math.random() - 0.5);

// // --- 2. 규칙별 라운드 생성 함수들 ---

// export function createLevel1ColorRound(
//   levelConfig: any,
//   roundNumber: number,
// ): ClassificationRound {
//   // 1. 이번 라운드의 정답 색상 선정 (예: 분홍/빨강 등)
//   const shuffledColors = shuffleArray([...COLOR_POOL]);

//   const targetColor = shuffledColors[0]; // 정답 색상 (예: red)
//   //console.log("targetColor: ", targetColor);
//   const distractorColor = shuffledColors[1]; // 헷갈리는 오답 색상 (예: blue)

//   // 2. TargetBox (중앙): 정답 색상을 대표하는 물건들 (예: 복숭아, 인형 등 여러 개가 모여 있는 그룹)
//   // 2. 해당 색상의 풀에서 무작위로 사물들 골라내기
//   const targetItems = COLOR_ITEM_POOL[targetColor] || [
//     "물건1",
//     "물건2",
//     "물건3",
//     "물건4",
//   ];
//   const distractorItems = COLOR_ITEM_POOL[distractorColor] || [
//     "다른물건1",
//     "다른물건2",
//   ];

//   const shuffledTargetItems = shuffleArray(targetItems);
//   const shuffledDistractorItems = shuffleArray(distractorItems);

//   const targetBoxItems = shuffledTargetItems.slice(0, 4);

//   // 0, 1, 2, 3 중 무작위로 하나의 인덱스를 골라!
//   const randomMissingIndex = Math.floor(Math.random() * targetBoxItems.length);
//   const missingItem = targetBoxItems[randomMissingIndex]; // 랜덤한 위치의 아이템이 빈자리가 됨!

//   // TargetBox에는 정답 색상의 사물들 중 3개를 무작위로 모아서 보여줌
//   const targetId = `target-${roundNumber}-${targetColor}`;
//   const targets = [
//     {
//       id: targetId,
//       color: targetColor,
//       items: targetBoxItems,
//     },
//   ];

//   // ObjectBox: 정답 사물 1개 + 오답 사물 1개 (총 2개)를 랜덤으로 섞어서 배치
//   const rawObjects = [
//     {
//       id: `obj-${roundNumber}-correct`,
//       color: targetColor,
//       name: missingItem, // 위에서 쓴 것과 겹치지 않는 사물 선택
//     },
//     {
//       id: `obj-${roundNumber}-wrong`,
//       color: distractorColor,
//       name: shuffledDistractorItems[0],
//     },
//   ];
//   const objects = shuffleArray(rawObjects);

//   // 정답 매칭
//   const answer: Record<string, string> = {};
//   objects.forEach((obj) => {
//     if (obj.color === targetColor) {
//       answer[obj.id] = targetId;
//     }
//   });

//   return {
//     id: `classification-${levelConfig.level}-${roundNumber}`,
//     game: "classification",
//     level: levelConfig.level,
//     round: roundNumber,
//     type: "drag_sort",
//     objects,
//     targets,
//     answer,
//     rule: levelConfig.rule,
//     missingItem,
//   };
// }
// // 규칙 A: 같은 색상 매칭 (Level 1)
// export function createSameColorRound(
//   levelConfig: any,
//   roundNumber: number,
// ): ClassificationRound {
//   const objectCount = levelConfig.objectCount || 3;
//   const targetCount = levelConfig.targetCount || 3;
//   const selectedColors = shuffleArray(COLORS).slice(0, targetCount);

//   const objects = selectedColors.map((color, index) => ({
//     id: `${color}Ball-${roundNumber}-${index}`,
//     color,
//   }));

//   const targets = selectedColors.map((color, index) => ({
//     id: `${color}Box-${roundNumber}-${index}`,
//     color,
//   }));

//   const answer: Record<string, string> = {};
//   objects.forEach((object) => {
//     const target = targets.find((t) => t.color === object.color);
//     if (target) answer[object.id] = target.id;
//   });

//   return {
//     id: `classification-${levelConfig.level}-${roundNumber}`,
//     game: "classification",
//     level: levelConfig.level,
//     round: roundNumber,
//     type: "drag_sort",
//     objects,
//     targets,
//     answer,
//     rule: "color",
//   };
// }

// // 규칙 B: 색상 + 모양 매칭 (Level 2, Level 5 등)
// export function createRandomColorAndShapeRound(
//   levelConfig: any,
//   roundNumber: number,
// ): ClassificationRound {
//   const objectCount = levelConfig.objectCount || 3;

//   const shuffledColors = shuffleArray(availableColors).slice(0, objectCount);
//   const shuffledShapes = shuffleArray(availableShapes).slice(0, objectCount);

//   const baseSet: { color: string; shape: string }[] = [];
//   for (let i = 0; i < objectCount; i++) {
//     baseSet.push({
//       color: shuffledColors[i],
//       shape: shuffledShapes[i],
//     });
//   }

//   const objects = [];
//   for (let i = 0; i < objectCount; i++) {
//     const source = baseSet[i % baseSet.length];
//     objects.push({
//       id: `object-${roundNumber}-${i + 1}`,
//       color: source.color,
//       shape: source.shape,
//     });
//   }

//   const targets = baseSet.map((item, index) => ({
//     id: `target-${roundNumber}-${index + 1}`,
//     color: item.color,
//     shape: item.shape,
//   }));

//   const answer: Record<string, string> = {};
//   objects.forEach((object) => {
//     const target = targets.find(
//       (t) => t.color === object.color && t.shape === object.shape,
//     );
//     if (target) answer[object.id] = target.id;
//   });

//   return {
//     id: `classification-${levelConfig.level}-${roundNumber}`,
//     game: "classification",
//     level: levelConfig.level,
//     round: roundNumber,
//     type: "drag_sort",
//     objects,
//     targets,
//     answer,
//     rule: "same_color_and_shape",
//   };
// }

// // 규칙 C: 과일/채소 분류 (Level 3)
// export function createFruitVegetableRound(
//   levelConfig: any,
//   roundNumber: number,
// ): ClassificationRound {
//   const objectCount = levelConfig.objectCount || 4;
//   const halfCount = Math.floor(objectCount / 2);

//   const selectedFruits = shuffleArray(availableFruits)
//     .slice(0, halfCount)
//     .map((name) => ({ name, category: "fruit" }));

//   const selectedVegetables = shuffleArray(availableVegetables)
//     .slice(0, objectCount - halfCount)
//     .map((name) => ({ name, category: "vegetable" }));

//   const objects = shuffleArray([...selectedFruits, ...selectedVegetables]).map(
//     (item, index) => ({
//       id: `food-${roundNumber}-${index + 1}`,
//       name: item.name,
//       category: item.category,
//     }),
//   );

//   const targets = [
//     { id: "fruitBasket", category: "fruit" },
//     { id: "vegetableBasket", category: "vegetable" },
//   ];

//   const answer: Record<string, string> = {};
//   objects.forEach((object) => {
//     const target = targets.find((t) => t.category === object.category);
//     if (target) answer[object.id] = target.id;
//   });

//   return {
//     id: `classification-${levelConfig.level}-${roundNumber}`,
//     game: "classification",
//     level: levelConfig.level,
//     round: roundNumber,
//     type: "drag_sort",
//     objects,
//     targets,
//     answer,
//     rule: "fruit_or_vegetable",
//   };
// }

// // 규칙 D: 크기 분류 (색상은 랜덤) (Level 4)
// // 규칙 D: 크기 분류 (크기별 균등 배분 + 랜덤 색상)
// export function createSizeRound(
//   levelConfig: any,
//   roundNumber: number,
// ): ClassificationRound {
//   const objectCount = levelConfig.objectCount || 4;
//   const halfCount = Math.floor(objectCount / 2);

//   // large와 small을 개수에 맞춰 균등하게 생성
//   const sizesList = [
//     ...Array(halfCount).fill("large"),
//     ...Array(objectCount - halfCount).fill("small"),
//   ];

//   // 크기 목록을 랜덤하게 섞기
//   const shuffledSizes = shuffleArray(sizesList);

//   const objects = shuffledSizes.map((size, index) => {
//     const randomColor = shuffleArray(COLORS)[0]; // 색상은 랜덤 추출
//     return {
//       id: `object-${roundNumber}-${index + 1}`,
//       color: randomColor,
//       size: size,
//       shape: "circle", // 기본 모양
//     };
//   });

//   const targets = [
//     { id: "largeBox", size: "large" },
//     { id: "smallBox", size: "small" },
//   ];

//   const answer: Record<string, string> = {};
//   objects.forEach((object) => {
//     const target = targets.find((t) => t.size === object.size);
//     if (target) answer[object.id] = target.id;
//   });

//   return {
//     id: `classification-${levelConfig.level}-${roundNumber}`,
//     game: "classification",
//     level: levelConfig.level,
//     round: roundNumber,
//     type: "drag_sort",
//     objects,
//     targets,
//     answer,
//     rule: "size",
//   };
// }

// // --- 3. 규칙에 따라 알맞은 생성 함수를 골라주는 분기기 ---
// export function createRoundByRule(
//   levelConfig: any,
//   roundNumber: number,
// ): ClassificationRound {
//   switch (levelConfig.rule) {
//     case "same_color":
//       return createSameColorRound(levelConfig, roundNumber);

//     case "same_color_and_shape":
//       return createRandomColorAndShapeRound(levelConfig, roundNumber);

//     case "fruit_or_vegetable":
//       return createFruitVegetableRound(levelConfig, roundNumber);

//     case "size":
//       return createSizeRound(levelConfig, roundNumber);

//     default:
//       throw new Error(`지원하지 않는 규칙입니다: ${levelConfig.rule}`);
//   }
// }

// import { COLOR_GROUPS, COLOR_ITEM_POOL } from "../../constants/colors";
// import { ClassificationRound } from "./types";

// const shuffleArray = <T>(array: T[]): T[] =>
//   [...array].sort(() => Math.random() - 0.5);

// // --- 1. 통합 색깔 분류 라운드 생성 함수 (Level 1 ~ 5 지원) ---
// export function createColorClassificationRound(
//   levelConfig: any,
//   roundNumber: number,
// ): ClassificationRound {
//   const level = levelConfig.level || 1;
//   const allColors = Object.keys(COLOR_ITEM_POOL);

//   let targetColor = "";
//   let distractorColors: string[] = [];

//   // 레벨별 난이도 로직 적용
//   if (level === 5) {
//     // [Level 5: 유사 색상 변별력] 비슷한 색상 그룹에서 정답과 오답 추출
//     const groupKeys = Object.keys(
//       COLOR_GROUPS,
//     ) as (keyof typeof COLOR_GROUPS)[];
//     const selectedGroupKey =
//       groupKeys[Math.floor(Math.random() * groupKeys.length)];
//     const groupColors = COLOR_GROUPS[selectedGroupKey];

//     const shuffledGroup = shuffleArray(groupColors);
//     targetColor = shuffledGroup[0];
//     const distractorColor = shuffledGroup[1]; // 헷갈리는 유사 색상
//     distractorColors = [distractorColor];
//   } else {
//     // [Level 1 ~ 4: 확 다른 색상 매칭] 완전히 다른 색상 그룹에서 추출
//     const shuffledAll = shuffleArray(allColors);
//     targetColor = shuffledAll[0];

//     // 레벨에 따른 오답 개수 설정 (Lv 1은 오답 1개, Lv 2~4는 오답 2~3개)
//     const distractorCount = level === 1 ? 1 : level === 2 ? 2 : 3;
//     distractorColors = shuffledAll.slice(1, 1 + distractorCount);
//   }

//   // 2. 사물 아이템 무작위 추출
//   const targetItems = shuffleArray(
//     COLOR_ITEM_POOL[targetColor] || ["물건1", "물건2", "물건3", "물건4"],
//   );
//   const targetBoxItems = targetItems.slice(0, 4);

//   // 빈자리가 될 정답 사물 선택
//   const randomMissingIndex = Math.floor(Math.random() * targetBoxItems.length);
//   const missingItem = targetBoxItems[randomMissingIndex];

//   const targetId = `target-${roundNumber}-${targetColor}`;
//   const targets = [
//     {
//       id: targetId,
//       color: targetColor,
//       items: targetBoxItems,
//     },
//   ];

//   // 3. 오브젝트 박스 구성 (정답 1개 + 오답들)
//   const rawObjects = [
//     {
//       id: `obj-${roundNumber}-correct`,
//       color: targetColor,
//       name: missingItem,
//     },
//   ];

//   // 오답 오브젝트들 추가
//   distractorColors.forEach((dColor, idx) => {
//     const dItems = COLOR_ITEM_POOL[dColor] || ["다른물건"];
//     const shuffledDItems = shuffleArray(dItems);
//     rawObjects.push({
//       id: `obj-${roundNumber}-wrong-${idx + 1}`,
//       color: dColor,
//       name: shuffledDItems[0],
//     });
//   });

//   const objects = shuffleArray(rawObjects);

//   // 4. 정답 매칭 맵핑
//   const answer: Record<string, string> = {};
//   objects.forEach((obj) => {
//     if (obj.color === targetColor) {
//       answer[obj.id] = targetId;
//     }
//   });

//   return {
//     id: `classification-${level}-${roundNumber}`,
//     game: "classification",
//     level: level,
//     round: roundNumber,
//     type: "drag_sort",
//     objects,
//     targets,
//     answer,
//     rule: "color_classification",
//     missingItem,
//   };
// }

// // --- 2. 라우터 함수 (색깔 분류 앱 전용) ---
// export function createRoundByRule(
//   levelConfig: any,
//   roundNumber: number,
// ): ClassificationRound {
//   return createColorClassificationRound(levelConfig, roundNumber);
// }

const shuffleArray = <T>(array: T[]): T[] =>
  [...array].sort(() => Math.random() - 0.5);

// --------------------------------------------------
// 레벨별로 "어떤 색상 풀에서 뽑을지"를 결정하는 함수
// --------------------------------------------------
function pickColorPoolForLevel(level: number): string[] {
  switch (level) {
    case 1:
    case 2:
      // Level 1~2: 원색끼리만 (완전히 다른 색상, 헷갈리지 않음)
      return PRIMARY_COLORS;

    case 3:
      // Level 3: 원색 이외의 새로운 색상 (여전히 색조는 확실히 다름)
      return SECONDARY_COLORS;

    case 4:
    case 5: {
      // Level 4~5: 같은 계열(SIMILAR_COLOR_FAMILIES) 안에서 뽑음
      const familyKeys = Object.keys(
        SIMILAR_COLOR_FAMILIES,
      ) as (keyof typeof SIMILAR_COLOR_FAMILIES)[];
      const randomFamilyKey =
        familyKeys[Math.floor(Math.random() * familyKeys.length)];
      return SIMILAR_COLOR_FAMILIES[randomFamilyKey];
    }

    default:
      // 안전망: 정의 안 된 레벨은 원색으로 처리
      return PRIMARY_COLORS;
  }
}

// --------------------------------------------------
// 레벨별 오답 개수 결정
// --------------------------------------------------
function getDistractorCount(level: number): number {
  switch (level) {
    case 1:
      return 1; // 선택지 2개 (정답1 + 오답1)
    case 2:
    case 3:
    case 5:
      return 2; // 선택지 3개
    case 4:
      return 1; // 선택지 2개 (유사 색상 변별)
    default:
      return 1;
  }
}

// --------------------------------------------------
// 통합 색깔 분류 라운드 생성 함수 (Level 1 ~ 5 지원)
// --------------------------------------------------
export function createColorClassificationRound(
  levelConfig: any,
  roundNumber: number,
): ClassificationRound {
  const level = levelConfig.level || 1;

  // 1. 이번 라운드에서 사용할 색상 풀 결정 (레벨에 따라 다른 풀)
  const colorPool = pickColorPoolForLevel(level);
  const distractorCount = getDistractorCount(level);

  // ⭐ 풀 크기가 필요한 색상 개수(정답 1 + 오답 N)보다 작으면 안전하게 클램프
  const safeDistractorCount = Math.min(distractorCount, colorPool.length - 1);

  const shuffledPool = shuffleArray(colorPool);
  const targetColor = shuffledPool[0];
  const distractorColors = shuffledPool.slice(1, 1 + safeDistractorCount);

  // 2. ⭐ 모양(사물)은 색상과 무관하게 랜덤 추출
  const shuffledShapes = shuffleArray(SHAPE_POOL);
  const targetBoxShapes = shuffledShapes.slice(0, 4); // TargetBox에 보여줄 4칸

  const randomMissingIndex = Math.floor(Math.random() * targetBoxShapes.length);
  const missingShape = targetBoxShapes[randomMissingIndex];

  const targetId = `target-${roundNumber}-${targetColor}`;
  const targets = [
    {
      id: targetId,
      color: targetColor,
      items: targetBoxShapes.map((shape) => shape.id),
    },
  ];

  // 3. 오브젝트 박스 구성 (정답 1개 + 오답들)
  // // ⭐ 중요 ⭐
  // 모든 Object는 missingShape와 동일한 그림! 색상만 다르게 한다.
  const rawObjects = [
    {
      id: `obj-${roundNumber}-correct`,
      color: targetColor,
      name: missingShape.id,
    },
    ...distractorColors.map((color, index) => ({
      id: `obj-${roundNumber}-wrong-${index + 1}`,
      color,
      name: missingShape.id,
    })),
  ];
  // 오답은 타겟박스에 이미 등장한 모양과 안 겹치게 새로 뽑음
  // const usedShapeIds = new Set(targetBoxShapes.map((s) => s.id));
  // const remainingShapes = shuffleArray(
  //   SHAPE_POOL.filter((s) => !usedShapeIds.has(s.id)),
  // );
  // distractorColors.forEach((dColor, idx) => {
  //   const shape = remainingShapes[idx] ?? SHAPE_POOL[0]; // 안전망
  //   rawObjects.push({
  //     id: `obj-${roundNumber}-wrong-${idx + 1}`,
  //     color: dColor,
  //     name: shape.id,
  //   });
  // });

  const objects = shuffleArray(rawObjects);

  // 4. 정답 매칭 맵핑
  const answer: Record<string, string> = {};
  objects.forEach((obj) => {
    if (obj.color === targetColor) {
      answer[obj.id] = targetId;
    }
  });

  return {
    id: `classification-${level}-${roundNumber}`,
    game: "classification",
    level: level,
    round: roundNumber,
    type: "drag_sort",
    objects,
    targets,
    answer,
    rule: "color_classification",
    missingItem: missingShape.id, // ⭐ shapeId로 저장
  };
}

// --------------------------------------------------
// 라우터 함수 (색깔 분류 앱 전용)
// --------------------------------------------------
export function createRoundByRule(
  levelConfig: any,
  roundNumber: number,
): ClassificationRound {
  return createColorClassificationRound(levelConfig, roundNumber);
}
