import { STAGE_CONFIGS } from "./stageConfigs";

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

// ==========================================
// 최초 게임 데이터 생성
// ==========================================

export function createInitialProgress(): GameProgress {
  return {
    levels: STAGE_CONFIGS.map((stage, index) => ({
      level: stage.level,

      // ⭐ Level 1만 처음부터 열기
      unlocked: index === 0,

      completed: false,

      stars: 0,

      maxStars: 5,
    })),
  };
}

// ==========================================
// 특정 레벨 찾기
// ==========================================

export function getLevelProgress(
  progress: GameProgress,
  level: number,
): LevelProgress | undefined {
  return progress.levels.find((item) => item.level === level);
}

// ==========================================
// 별 업데이트
// ==========================================

export function updateLevelStars(
  progress: GameProgress,
  level: number,
  stars: number,
): GameProgress {
  return {
    ...progress,

    levels: progress.levels.map((item) =>
      item.level === level
        ? {
            ...item,

            // ⭐ 기존 기록보다 높은 별만 저장
            stars: Math.max(item.stars, stars),

            completed: true,
          }
        : item,
    ),
  };
}

// ==========================================
// 다음 레벨 잠금 해제
// ==========================================

export function unlockNextLevel(
  progress: GameProgress,
  completedLevel: number,
): GameProgress {
  const nextLevel = completedLevel + 1;

  return {
    ...progress,

    levels: progress.levels.map((item) =>
      item.level === nextLevel
        ? {
            ...item,
            unlocked: true,
          }
        : item,
    ),
  };
}

// ==========================================
// 레벨 완료 처리
// ==========================================

export function completeLevel(
  progress: GameProgress,
  level: number,
  stars: number,
): GameProgress {
  // 1️⃣ 별 저장
  const updatedProgress = updateLevelStars(progress, level, stars);

  // 2️⃣ 다음 레벨 오픈
  const unlockedProgress = unlockNextLevel(updatedProgress, level);

  return unlockedProgress;
}
