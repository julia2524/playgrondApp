import { createRoundByRule } from "./generators";
import { ClassificationLevel, ClassificationRound } from "./types";

export function createRounds(
  levelConfig: ClassificationLevel,
  roundCount = 5,
): ClassificationRound[] {
  const rounds: ClassificationRound[] = [];

  for (let i = 0; i < roundCount; i++) {
    // 밖에서 정한 rule에 맞게 라운드 데이터를 동적으로 생성
    const round = createRoundByRule(levelConfig, i + 1);
    rounds.push(round);
  }

  return rounds;
}
