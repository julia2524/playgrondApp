// // 뽑힌 재료로 실제 문제를 어떻게 만들 것인가

import {
  PRIMARY_COLORS,
  SECONDARY_COLORS,
  SHAPE_POOL,
  SIMILAR_COLOR_FAMILIES,
} from "./constants/colorPool";
import { ClassificationRound } from "./types";

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
