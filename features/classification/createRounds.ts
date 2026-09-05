// // import { createColorRound, createRoundByRule } from "./color/colorGenerators";
// // import { ColorLevelConfig, ColorRound } from "./color/type/types";

// // export function createRounds(
// //   levelConfig: ColorLevelConfig,
// //   roundCount = 10,
// // ): ColorRound[] {
// //   const rounds: ColorRound[] = [];

// //   for (let i = 0; i < roundCount; i++) {
// //     // 밖에서 정한 rule에 맞게 라운드 데이터를 동적으로 생성
// //     const round = createRoundByRule(levelConfig, i + 1);
// //     rounds.push(round);
// //   }

// //   return rounds;
// // }

// // export const generateRounds = (config: any) => {
// //   return Array.from({ length: 10 }, (_, i) => createColorRound(config, i + 1));
// // };

// import {
//   createColorRound,
//   createColorRoundByRule,
// } from "./color/colorGenerators";
// import { ColorLevelConfig, ColorRound } from "./color/type/types";
// import { ShapeLevelConfig, ShapeRound } from "./shape/type/types";
// import { createShapeRound } from "./shape/shapeGenerators"; // 모양 라운드 생성기
// import { GameType, LevelConfig } from "./type/types";

// // 1. rule이나 gameType을 판별하여 동적으로 라운드들을 생성하는 함수
// export function createRounds(
//   levelConfig: LevelConfig,
//   gameType: GameType = "color",
//   roundCount = 10,
// ): (ColorRound | ShapeRound)[] {
//   const rounds: (ColorRound | ShapeRound)[] = [];

//   for (let i = 0; i < roundCount; i++) {
//     let round: ColorRound | ShapeRound;

//     if (gameType === "shape") {
//       round = createShapeRound(levelConfig as ShapeLevelConfig, i + 1);
//     } else {
//       // 기존 색깔 분류 규칙별 생성 로직
//       round = createColorRoundByRule(levelConfig as ColorLevelConfig, i + 1);
//     }

//     rounds.push(round);
//   }

//   return rounds;
// }

// // 2. 일괄로 10라운드를 뚝딱 만들어내는 함수
// export const generateRounds = (
//   config: ColorLevelConfig | ShapeLevelConfig,
//   gameType: "color" | "shape" = "color",
//   roundCount = 10,
// ) => {
//   return Array.from({ length: roundCount }, (_, i) => {
//     if (gameType === "shape") {
//       return createShapeRound(config as ShapeLevelConfig, i + 1);
//     }
//     return createColorRound(config as ColorLevelConfig, i + 1);
//   });
// };

// createRounds.ts (통합 파일)
import { createColorRounds } from "./color/createColorRounds";
import { createShapeRounds } from "./shape/createShapeRounds";
import { ColorLevelConfig, ColorRound } from "./color/type/types";
import { ShapeLevelConfig, ShapeRound } from "./shape/type/types";
import { GameType, LevelConfig, GameRound } from "./type/types"; // 유니온 타입들

export const generateRounds = (
  config: LevelConfig,
  gameType: GameType = "color",
  roundCount = 10,
): GameRound[] => {
  if (gameType === "shape") {
    return createShapeRounds(config as ShapeLevelConfig, roundCount);
  }
  return createColorRounds(config as ColorLevelConfig, roundCount);
};
