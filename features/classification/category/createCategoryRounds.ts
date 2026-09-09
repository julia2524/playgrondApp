// ============================================================
// Category Classification Rounds
// ============================================================

import { createCategoryRound } from "./categoryGenerators";
import { CategoryLevelConfig, CategoryRound } from "./type/types";

const DEFAULT_ROUND_COUNT = 10;

export const createCategoryRounds = (
  config: CategoryLevelConfig, // ← number → CategoryLevelConfig로 변경
  roundCount = DEFAULT_ROUND_COUNT,
): CategoryRound[] => {
  return Array.from(
    { length: roundCount },
    (_, i) => createCategoryRound(config.level, i + 1), // config.level 사용
  );
};
