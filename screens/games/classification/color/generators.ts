import {
  ALL_COLORS,
  PASTEL_COLORS,
  PRIMARY_COLORS,
  SHAPE_POOL,
} from "./constants/colorPool";
import { ClassificationLevel } from "./constants/levels";
import { ClassificationRound } from "./types";

// ==================================================
// 배열 섞기
// ==================================================

const shuffleArray = <T>(array: T[]): T[] =>
  [...array].sort(() => Math.random() - 0.5);

// ==================================================
// ⭐ colorPool 필드로 실제 색상 풀 결정
// (레벨 숫자로 분기하던 방식 완전히 제거)
// ==================================================

function pickColorPoolForLevel(
  colorPool: ClassificationLevel["colorPool"],
): string[] {
  switch (colorPool) {
    case "primary":
      return PRIMARY_COLORS;

    case "pastel":
      return PASTEL_COLORS;

    case "all":
      return ALL_COLORS;

    default:
      return PRIMARY_COLORS;
  }
}

// ==================================================
// 색깔 분류 라운드 생성
// ==================================================

export function createColorClassificationRound(
  levelConfig: ClassificationLevel,
  roundNumber: number,
): ClassificationRound {
  const level = levelConfig.level || 1;

  // ==================================================
  // ⭐ Level 설정값에서 실제 오브젝트 개수 가져오기
  // ==================================================

  const objectCount = levelConfig.objectCount || 1;

  // ==================================================
  // ⭐ 정답 1개를 제외한 나머지는 오답
  // ==================================================

  const distractorCount = Math.max(0, objectCount - 1);

  // ==================================================
  // 1️⃣ 색상 풀 결정 (⭐ levelConfig.colorPool 기준)
  // ==================================================

  const colorPool = pickColorPoolForLevel(levelConfig.colorPool);

  // 풀보다 오답이 많아지는 것 방지
  const safeDistractorCount = Math.min(distractorCount, colorPool.length - 1);

  const shuffledPool = shuffleArray(colorPool);

  // ==================================================
  // ⭐ 정답 색상
  // ==================================================

  const targetColor = shuffledPool[0];

  // ==================================================
  // ⭐ 오답 색상
  // ==================================================

  const distractorColors = shuffledPool.slice(1, 1 + safeDistractorCount);

  // ==================================================
  // 2️⃣ Target 안에 들어갈 도형 선택
  // ==================================================

  const shuffledShapes = shuffleArray(SHAPE_POOL);

  const targetBoxShapes = shuffledShapes.slice(0, 4);

  const randomMissingIndex = Math.floor(Math.random() * targetBoxShapes.length);

  const missingShape = targetBoxShapes[randomMissingIndex];

  // ==================================================
  // Target ID
  // ==================================================

  const targetId = `target-${roundNumber}-${targetColor}`;

  const targets = [
    {
      id: targetId,
      color: targetColor,
      items: targetBoxShapes.map((shape) => shape.id),
    },
  ];

  // ==================================================
  // 3️⃣ 오브젝트 생성
  // ==================================================

  // ⭐ 항상 정답 하나
  const rawObjects = [
    {
      id: `obj-${roundNumber}-correct`,
      color: targetColor,
      name: missingShape.id,
    },

    // ⭐ 나머지는 오답
    ...distractorColors.map((color, index) => ({
      id: `obj-${roundNumber}-wrong-${index + 1}`,
      color,
      name: missingShape.id,
    })),
  ];

  // ==================================================
  // ⭐ 선택지 순서 랜덤
  // ==================================================

  const objects = shuffleArray(rawObjects);

  // ==================================================
  // 4️⃣ 정답 맵 생성
  // ==================================================

  const answer: Record<string, string> = {};

  objects.forEach((obj) => {
    if (obj.color === targetColor) {
      answer[obj.id] = targetId;
    }
  });

  // ==================================================
  // Return
  // ==================================================

  return {
    id: `classification-${level}-${roundNumber}`,
    game: "classification",
    level,
    round: roundNumber,
    type: "drag_sort",
    objects,
    targets,
    answer,
    rule: "color_classification",
    missingItem: missingShape.id,
  };
}

// ==================================================
// Router
// ==================================================

export function createRoundByRule(
  levelConfig: ClassificationLevel,
  roundNumber: number,
): ClassificationRound {
  return createColorClassificationRound(levelConfig, roundNumber);
}
