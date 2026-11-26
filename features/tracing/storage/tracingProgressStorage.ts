// import AsyncStorage from "@react-native-async-storage/async-storage";

// // ==================================================
// // Storage Key
// // ==================================================

// const TRACING_PROGRESS_STORAGE_KEY = "@tracing_progress_line";

// // ==================================================
// // Types
// // ==================================================

// export interface TracingLevelProgress {
//   level: number;
//   unlocked: boolean;
//   completed: boolean;
//   stars: number;
//   maxStars: number;
// }

// export interface TracingGameProgress {
//   levels: TracingLevelProgress[];
// }

// type ProgressCache = {
//   totalStages: number;
//   progress: TracingGameProgress;
// };

// type ProgressLoadRequest = {
//   totalStages: number;
//   promise: Promise<TracingGameProgress>;
// };

// // ==================================================
// // Memory Cache
// // ==================================================

// let cachedProgress: ProgressCache | null = null;
// let pendingLoad: ProgressLoadRequest | null = null;
// let cacheVersion = 0;

// /**
//  * 메모리에 저장된 진행 상황을 즉시 반환해.
//  * 아직 불러오지 않았다면 null을 반환해.
//  */
// export function getCachedTracingGameProgress(
//   totalStages: number,
// ): TracingGameProgress | null {
//   if (cachedProgress?.totalStages !== totalStages) {
//     return null;
//   }

//   return cachedProgress.progress;
// }

// // ==================================================
// // Initial Progress
// // ==================================================

// export function createInitialTracingGameProgress(
//   totalStages: number,
// ): TracingGameProgress {
//   return {
//     levels: Array.from({ length: totalStages }, (_, index) => ({
//       level: index + 1,
//       unlocked: index === 0,
//       completed: false,
//       stars: 0,
//       maxStars: 5,
//     })),
//   };
// }

// // ==================================================
// // Progress Normalizer
// // ==================================================

// export function normalizeTracingGameProgress(
//   saved: unknown,
//   totalStages: number,
// ): TracingGameProgress {
//   const initial = createInitialTracingGameProgress(totalStages);

//   if (
//     !saved ||
//     typeof saved !== "object" ||
//     !("levels" in saved) ||
//     !Array.isArray(saved.levels)
//   ) {
//     return initial;
//   }

//   const savedLevels = saved.levels as Partial<TracingLevelProgress>[];

//   const levels = initial.levels.map((defaultLevel) => {
//     const previous = savedLevels.find(
//       (item) => item.level === defaultLevel.level,
//     );

//     if (!previous) {
//       return defaultLevel;
//     }

//     return {
//       level: defaultLevel.level,
//       unlocked: Boolean(previous.unlocked),
//       completed: Boolean(previous.completed),
//       stars: Math.max(0, Math.min(5, Number(previous.stars) || 0)),
//       maxStars: 5,
//     };
//   });

//   if (levels.length > 0) {
//     levels[0].unlocked = true;
//   }

//   levels.forEach((level, index) => {
//     if (level.completed && index < levels.length - 1) {
//       levels[index + 1].unlocked = true;
//     }
//   });

//   return { levels };
// }

// // ==================================================
// // Progress Preload
// // ==================================================

// /**
//  * 진행 상황을 미리 불러와 메모리에 보관해.
//  * 같은 진행 상황을 동시에 요청하면 하나의 로딩 작업을 공유해.
//  */
// export function preloadTracingGameProgress(
//   totalStages: number,
// ): Promise<TracingGameProgress> {
//   const cached = getCachedTracingGameProgress(totalStages);

//   if (cached) {
//     return Promise.resolve(cached);
//   }

//   if (pendingLoad?.totalStages === totalStages) {
//     return pendingLoad.promise;
//   }

//   const requestVersion = cacheVersion;

//   const promise = (async () => {
//     let progress: TracingGameProgress;

//     try {
//       const savedProgress = await AsyncStorage.getItem(
//         TRACING_PROGRESS_STORAGE_KEY,
//       );

//       progress = savedProgress
//         ? normalizeTracingGameProgress(JSON.parse(savedProgress), totalStages)
//         : createInitialTracingGameProgress(totalStages);
//     } catch (error) {
//       console.error("선 그리기 진행 상황 불러오기 실패", error);
//       progress = createInitialTracingGameProgress(totalStages);
//     }

//     // 불러오는 동안 저장 또는 삭제가 발생했다면
//     // 이전 데이터가 최신 캐시를 덮어쓰지 않도록 해.
//     if (requestVersion === cacheVersion) {
//       cachedProgress = {
//         totalStages,
//         progress,
//       };
//     }

//     return getCachedTracingGameProgress(totalStages) ?? progress;
//   })().finally(() => {
//     if (pendingLoad?.promise === promise) {
//       pendingLoad = null;
//     }
//   });

//   pendingLoad = {
//     totalStages,
//     promise,
//   };

//   return promise;
// }

// // ==================================================
// // Progress 저장
// // ==================================================

// export async function saveTracingGameProgress(
//   progress: TracingGameProgress,
// ): Promise<void> {
//   // 저장이 끝나기 전에 StageMap이 돌아와도 최신 값을 읽도록 캐시를 먼저 갱신
//   cacheVersion += 1;

//   cachedProgress = {
//     totalStages: progress.levels.length,
//     progress,
//   };

//   try {
//     await AsyncStorage.setItem(
//       TRACING_PROGRESS_STORAGE_KEY,
//       JSON.stringify(progress),
//     );
//   } catch (error) {
//     console.error("선 그리기 진행 상황 저장 실패", error);
//   }
// }

// // ==================================================
// // Progress 불러오기
// // ==================================================

// export async function loadTracingGameProgress(
//   totalStages: number,
// ): Promise<TracingGameProgress> {
//   return preloadTracingGameProgress(totalStages);
// }

// // ==================================================
// // 스테이지 완료 기록
// // ==================================================

// export async function recordTracingStageResult(
//   level: number,
//   earnedStars: number,
//   totalStages: number,
// ): Promise<void> {
//   try {
//     const progress = await loadTracingGameProgress(totalStages);

//     const targetIndex = level - 1;

//     if (targetIndex < 0 || targetIndex >= progress.levels.length) {
//       return;
//     }

//     const updatedLevels = [...progress.levels];
//     const previous = updatedLevels[targetIndex];

//     updatedLevels[targetIndex] = {
//       ...previous,
//       unlocked: true,
//       completed: true,
//       stars: Math.max(previous.stars, Math.max(0, Math.min(5, earnedStars))),
//       maxStars: 5,
//     };

//     // 다음 스테이지 잠금 해제
//     if (targetIndex < updatedLevels.length - 1) {
//       updatedLevels[targetIndex + 1] = {
//         ...updatedLevels[targetIndex + 1],
//         unlocked: true,
//       };
//     }

//     await saveTracingGameProgress({
//       levels: updatedLevels,
//     });
//   } catch (error) {
//     console.error("선 그리기 스테이지 기록 실패", error);
//   }
// }

// // ==================================================
// // Progress 삭제
// // ==================================================

// export async function clearTracingGameProgress(): Promise<void> {
//   try {
//     await AsyncStorage.removeItem(TRACING_PROGRESS_STORAGE_KEY);

//     cacheVersion += 1;
//     cachedProgress = null;
//   } catch (error) {
//     console.error("선 그리기 진행 상황 삭제 실패", error);
//   }
// }

import AsyncStorage from "@react-native-async-storage/async-storage";

// ==================================================
// Storage Keys
// ==================================================

export type TracingProgressGameType = "line" | "shape" | "object";

const TRACING_PROGRESS_STORAGE_KEYS: Record<TracingProgressGameType, string> = {
  line: "@tracing_progress_line",
  shape: "@tracing_progress_shape",
  object: "@tracing_progress_object",
};

function getStorageKey(gameType: TracingProgressGameType): string {
  return TRACING_PROGRESS_STORAGE_KEYS[gameType];
}

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

type ProgressCache = {
  totalStages: number;
  progress: TracingGameProgress;
};

type ProgressLoadRequest = {
  totalStages: number;
  promise: Promise<TracingGameProgress>;
};

// ==================================================
// Memory Cache
// ==================================================

const cachedProgress: Partial<Record<TracingProgressGameType, ProgressCache>> =
  {};

const pendingLoads: Partial<
  Record<TracingProgressGameType, ProgressLoadRequest>
> = {};

const cacheVersions: Record<TracingProgressGameType, number> = {
  line: 0,
  shape: 0,
  object: 0,
};

/**
 * 메모리에 저장된 진행 상황을 즉시 반환해.
 * 아직 불러오지 않았다면 null을 반환해.
 *
 * gameType 기본값은 line이므로 기존 호출부와 호환돼.
 */
export function getCachedTracingGameProgress(
  totalStages: number,
  gameType: TracingProgressGameType = "line",
): TracingGameProgress | null {
  const cached = cachedProgress[gameType];

  if (!cached || cached.totalStages !== totalStages) {
    return null;
  }

  return cached.progress;
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
// Progress Preload
// ==================================================

/**
 * 진행 상황을 미리 불러와 메모리에 보관해.
 * 같은 게임의 진행 상황을 동시에 요청하면 하나의 로딩 작업을 공유해.
 */
export function preloadTracingGameProgress(
  totalStages: number,
  gameType: TracingProgressGameType = "line",
): Promise<TracingGameProgress> {
  const cached = getCachedTracingGameProgress(totalStages, gameType);

  if (cached) {
    return Promise.resolve(cached);
  }

  const pending = pendingLoads[gameType];

  if (pending?.totalStages === totalStages) {
    return pending.promise;
  }

  const requestVersion = cacheVersions[gameType];

  const promise = (async () => {
    let progress: TracingGameProgress;

    try {
      const savedProgress = await AsyncStorage.getItem(getStorageKey(gameType));

      progress = savedProgress
        ? normalizeTracingGameProgress(JSON.parse(savedProgress), totalStages)
        : createInitialTracingGameProgress(totalStages);
    } catch (error) {
      console.error(`${gameType} 그리기 진행 상황 불러오기 실패`, error);

      progress = createInitialTracingGameProgress(totalStages);
    }

    // 불러오는 동안 저장 또는 삭제가 발생했다면
    // 이전 데이터가 최신 캐시를 덮어쓰지 않도록 해.
    if (requestVersion === cacheVersions[gameType]) {
      cachedProgress[gameType] = {
        totalStages,
        progress,
      };
    }

    return getCachedTracingGameProgress(totalStages, gameType) ?? progress;
  })().finally(() => {
    if (pendingLoads[gameType]?.promise === promise) {
      delete pendingLoads[gameType];
    }
  });

  pendingLoads[gameType] = {
    totalStages,
    promise,
  };

  return promise;
}

// ==================================================
// Progress Save
// ==================================================

export async function saveTracingGameProgress(
  progress: TracingGameProgress,
  gameType: TracingProgressGameType = "line",
): Promise<void> {
  // 저장이 끝나기 전에 StageMap이 돌아와도 최신 값을 읽도록 캐시를 먼저 갱신
  cacheVersions[gameType] += 1;

  cachedProgress[gameType] = {
    totalStages: progress.levels.length,
    progress,
  };

  try {
    await AsyncStorage.setItem(
      getStorageKey(gameType),
      JSON.stringify(progress),
    );
  } catch (error) {
    console.error(`${gameType} 그리기 진행 상황 저장 실패`, error);
  }
}

// ==================================================
// Progress Load
// ==================================================

export async function loadTracingGameProgress(
  totalStages: number,
  gameType: TracingProgressGameType = "line",
): Promise<TracingGameProgress> {
  return preloadTracingGameProgress(totalStages, gameType);
}

// ==================================================
// Stage Result
// ==================================================

export async function recordTracingStageResult(
  level: number,
  earnedStars: number,
  totalStages: number,
  gameType: TracingProgressGameType = "line",
): Promise<void> {
  try {
    const progress = await loadTracingGameProgress(totalStages, gameType);

    const targetIndex = level - 1;

    if (targetIndex < 0 || targetIndex >= progress.levels.length) {
      return;
    }

    const updatedLevels = [...progress.levels];
    const previous = updatedLevels[targetIndex];

    updatedLevels[targetIndex] = {
      ...previous,
      unlocked: true,
      completed: true,
      stars: Math.max(previous.stars, Math.max(0, Math.min(5, earnedStars))),
      maxStars: 5,
    };

    // 다음 스테이지 잠금 해제
    if (targetIndex < updatedLevels.length - 1) {
      updatedLevels[targetIndex + 1] = {
        ...updatedLevels[targetIndex + 1],
        unlocked: true,
      };
    }

    await saveTracingGameProgress(
      {
        levels: updatedLevels,
      },
      gameType,
    );
  } catch (error) {
    console.error(`${gameType} 그리기 스테이지 기록 실패`, error);
  }
}

// ==================================================
// Progress Clear
// ==================================================

export async function clearTracingGameProgress(
  gameType: TracingProgressGameType = "line",
): Promise<void> {
  try {
    cacheVersions[gameType] += 1;

    await AsyncStorage.removeItem(getStorageKey(gameType));

    cachedProgress[gameType] = {
      totalStages: 0,
      progress: createInitialTracingGameProgress(0),
    };

    delete cachedProgress[gameType];
  } catch (error) {
    console.error(`${gameType} 그리기 진행 상황 삭제 실패`, error);
  }
}
