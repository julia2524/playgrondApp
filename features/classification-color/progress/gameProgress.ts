// ==================================================
// 타입 + 순수 Progress 로직
// ==================================================

import { STAGE_CONFIGS } from "../../StageMap/stageConfigs";

// ==================================================
// 타입
// ==================================================

export interface LevelProgress {
  level: number;

  unlocked: boolean;

  completed: boolean;

  stars: number;

  maxStars: number;
}

export interface GameProgress {
  levels: LevelProgress[];
}

// ==================================================
// 최초 Progress 생성
// ==================================================

export function createInitialProgress(): GameProgress {
  return {
    levels: STAGE_CONFIGS.map((stage, index) => ({
      level: stage.level,

      // ⭐ 첫 번째 레벨만 처음부터 열림
      unlocked: index === 0,

      completed: false,

      stars: 0,

      maxStars: 5,
    })),
  };
}

// ==================================================
// 특정 Level Progress 찾기
// ==================================================

export function getLevelProgress(
  progress: GameProgress,
  level: number,
): LevelProgress | undefined {
  return progress.levels.find((item) => item.level === level);
}

// ==================================================
// Level 완료 처리
// ==================================================

export function completeLevel(
  progress: GameProgress,
  level: number,
  earnedStars: number,
): GameProgress {
  const currentStageIndex = STAGE_CONFIGS.findIndex(
    (stage) => stage.level === level,
  );

  const nextStage = STAGE_CONFIGS[currentStageIndex + 1];

  return {
    ...progress,

    levels: progress.levels.map((item) => {
      // ------------------------------------------
      // ⭐ 현재 완료한 레벨
      // ------------------------------------------

      if (item.level === level) {
        return {
          ...item,

          completed: true,

          // 최고 별 기록만 유지
          stars: Math.max(item.stars, earnedStars),
        };
      }

      // ------------------------------------------
      // ⭐ 다음 레벨 Unlock
      // ------------------------------------------

      if (nextStage && item.level === nextStage.level) {
        return {
          ...item,

          unlocked: true,
        };
      }

      return item;
    }),
  };
}

// ==================================================
// 별 업데이트
// ==================================================

export function updateLevelStars(
  progress: GameProgress,
  level: number,
  earnedStars: number,
): GameProgress {
  return {
    ...progress,

    levels: progress.levels.map((item) => {
      if (item.level !== level) {
        return item;
      }

      return {
        ...item,

        // ⭐ 이전 최고 기록보다 높을 때만 업데이트
        stars: Math.max(item.stars, earnedStars),
      };
    }),
  };
}

// ==================================================
// Progress 초기화
// ==================================================

export function resetGameProgress(): GameProgress {
  return createInitialProgress();
}

// ==================================================
// Stage 추가 시 저장 데이터 병합
// ==================================================

export function mergeProgressWithStages(
  savedProgress: GameProgress,
): GameProgress {
  return {
    levels: STAGE_CONFIGS.map((stage, index) => {
      const savedLevel = savedProgress.levels.find(
        (item) => item.level === stage.level,
      );

      if (savedLevel) {
        return savedLevel;
      }

      return {
        level: stage.level,

        unlocked: index === 0,

        completed: false,

        stars: 0,

        maxStars: 5,
      };
    }),
  };
}
