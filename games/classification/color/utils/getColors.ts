import { COLOR_POOL } from "../../../../constants/colors";
import { ClassificationLevel } from "../types";

//이번 문제에서 어떤 색을 뽑을 것인가
function getColors(level: ClassificationLevel, roundIndex: number) {
  const start = roundIndex % COLOR_POOL.length;

  return Array.from(
    { length: level.objectCount },
    (_, index) => COLOR_POOL[(start + index) % COLOR_POOL.length],
  );
}
