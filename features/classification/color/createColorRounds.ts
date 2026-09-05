import { createColorRound, createColorRoundByRule } from "./colorGenerators";
import { ColorLevelConfig, ColorRound } from "./type/types";

export function createColorRounds(
  levelConfig: ColorLevelConfig,
  roundCount = 10,
): ColorRound[] {
  const rounds: ColorRound[] = [];

  for (let i = 0; i < roundCount; i++) {
    // 밖에서 정한 rule에 맞게 라운드 데이터를 동적으로 생성
    const round = createColorRoundByRule(levelConfig, i + 1);
    rounds.push(round);
  }

  return rounds;
}

export const generateColorRounds = (config: any) => {
  return Array.from({ length: 10 }, (_, i) => createColorRound(config, i + 1));
};
