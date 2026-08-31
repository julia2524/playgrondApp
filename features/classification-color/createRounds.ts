import {
  createColorClassificationRound,
  createRoundByRule,
} from "./generators";
import { ClassificationLevel, ClassificationRound } from "./types";

export function createRounds(
  levelConfig: ClassificationLevel,
  roundCount = 10,
): ClassificationRound[] {
  const rounds: ClassificationRound[] = [];

  for (let i = 0; i < roundCount; i++) {
    // 밖에서 정한 rule에 맞게 라운드 데이터를 동적으로 생성
    const round = createRoundByRule(levelConfig, i + 1);
    rounds.push(round);
  }

  return rounds;
}

export const generateRounds = (config: any) => {
  return Array.from({ length: 10 }, (_, i) =>
    createColorClassificationRound(config, i + 1),
  );
};
