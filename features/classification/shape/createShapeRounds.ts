// ==================================================
// Level → Rounds

import { createShapeRound } from "./shapeGenerators";
import { ShapeLevelConfig, ShapeRound } from "./type/types";

// ==================================================
const DEFAULT_ROUND_COUNT = 10;
export const createShapeRounds = (
  config: ShapeLevelConfig,
  roundCount = DEFAULT_ROUND_COUNT,
): ShapeRound[] => {
  return Array.from({ length: roundCount }, (_, index) =>
    createShapeRound(config, index + 1),
  );
};
