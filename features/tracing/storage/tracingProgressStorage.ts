import AsyncStorage from "@react-native-async-storage/async-storage";

// ==================================================
// Storage Key
// ==================================================

const TRACING_PROGRESS_STORAGE_KEY = "@tracing_progress_line";

// ==================================================
// Types
// ==================================================

export interface TracingLevelProgress {
  level: number;
  unlocked: boolean;
  completed: boolean;
  stars: number;
  maxStars: number;
}

export interface TracingGameProgress {
  levels: TracingLevelProgress[];
}

// ==================================================
// Initial Progress
// ==================================================

export function createInitialTracingGameProgress(
  totalStages: number,
): TracingGameProgress {
  return {
    levels: Array.from({ length: totalStages }, (_, index) => ({
      level: index + 1,
      unlocked: index === 0,
      completed: false,
      stars: 0,
      maxStars: 5,
    })),
  };
}

// ==================================================
// Progress Normalizer
// ==================================================

export function normalizeTracingGameProgress(
  saved: unknown,
  totalStages: number,
): TracingGameProgress {
  const initial = createInitialTracingGameProgress(totalStages);

  if (
    !saved ||
    typeof saved !== "object" ||
    !("levels" in saved) ||
    !Array.isArray(saved.levels)
  ) {
    return initial;
  }

  const savedLevels = saved.levels as Partial<TracingLevelProgress>[];

  const levels = initial.levels.map((defaultLevel) => {
    const previous = savedLevels.find(
      (item) => item.level === defaultLevel.level,
    );

    if (!previous) {
      return defaultLevel;
    }

    return {
      level: defaultLevel.level,
      unlocked: Boolean(previous.unlocked),
      completed: Boolean(previous.completed),
      stars: Math.max(0, Math.min(5, Number(previous.stars) || 0)),
      maxStars: 5,
    };
  });

  if (levels.length > 0) {
    levels[0].unlocked = true;
  }

  levels.forEach((level, index) => {
    if (level.completed && index < levels.length - 1) {
      levels[index + 1].unlocked = true;
    }
  });

  return { levels };
}

// ==================================================
// Progress 저장
// ==================================================

export async function saveTracingGameProgress(
  progress: TracingGameProgress,
): Promise<void> {
  try {
    await AsyncStorage.setItem(
      TRACING_PROGRESS_STORAGE_KEY,
      JSON.stringify(progress),
    );
  } catch (error) {
    console.error("선 그리기 진행 상황 저장 실패", error);
  }
}

// ==================================================
// Progress 불러오기
// ==================================================

export async function loadTracingGameProgress(
  totalStages: number,
): Promise<TracingGameProgress> {
  try {
    const savedProgress = await AsyncStorage.getItem(
      TRACING_PROGRESS_STORAGE_KEY,
    );

    if (!savedProgress) {
      return createInitialTracingGameProgress(totalStages);
    }

    return normalizeTracingGameProgress(JSON.parse(savedProgress), totalStages);
  } catch (error) {
    console.error("선 그리기 진행 상황 불러오기 실패", error);

    return createInitialTracingGameProgress(totalStages);
  }
}

// ==================================================
// 스테이지 완료 기록
// ==================================================

export async function recordTracingStageResult(
  level: number,
  earnedStars: number,
  totalStages: number,
): Promise<void> {
  try {
    const progress = await loadTracingGameProgress(totalStages);

    const targetIndex = level - 1;

    if (targetIndex < 0 || targetIndex >= progress.levels.length) {
      return;
    }

    const previous = progress.levels[targetIndex];

    progress.levels[targetIndex] = {
      ...previous,
      unlocked: true,
      completed: true,
      stars: Math.max(previous.stars, Math.max(0, Math.min(5, earnedStars))),
      maxStars: 5,
    };

    // 다음 스테이지 잠금 해제
    if (targetIndex < progress.levels.length - 1) {
      progress.levels[targetIndex + 1] = {
        ...progress.levels[targetIndex + 1],
        unlocked: true,
      };
    }

    await saveTracingGameProgress(progress);
  } catch (error) {
    console.error("선 그리기 스테이지 기록 실패", error);
  }
}

// ==================================================
// Progress 삭제
// ==================================================

export async function clearTracingGameProgress(): Promise<void> {
  try {
    await AsyncStorage.removeItem(TRACING_PROGRESS_STORAGE_KEY);
  } catch (error) {
    console.error("선 그리기 진행 상황 삭제 실패", error);
  }
}
