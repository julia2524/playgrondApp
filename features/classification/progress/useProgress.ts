// import { useCallback, useEffect, useState } from "react";

// import {
//   getCachedGameProgress,
//   hasCachedGameProgress,
//   loadGameProgress,
//   saveGameProgress,
// } from "./progressStorage";

// import {
//   createInitialProgress,
//   GameProgress,
//   getLevelProgress,
//   mergeProgressWithStages,
// } from "./gameProgress";

// import type { GameType } from "./progressStorage";

// // ==================================================
// // Progress Hook
// // ==================================================

// export function useProgress(gameType: GameType = "color") {
//   const [progress, setProgress] = useState<GameProgress>(() => {
//     const cached = getCachedGameProgress(gameType);
//     return cached ? mergeProgressWithStages(cached) : createInitialProgress();
//   });

//   const [isLoading, setIsLoading] = useState(
//     () => !hasCachedGameProgress(gameType),
//   );

//   // ==================================================
//   // Progress 불러오기
//   // ==================================================

//   const reloadProgress = useCallback(async () => {
//     try {
//       const savedProgress = await loadGameProgress(gameType);

//       const mergedProgress = savedProgress
//         ? mergeProgressWithStages(savedProgress)
//         : createInitialProgress();

//       setProgress(mergedProgress);

//       void saveGameProgress(gameType, mergedProgress);

//       return mergedProgress;
//     } catch (error) {
//       console.error("게임 진행 상황을 불러오지 못했습니다.", error);

//       const initialProgress = createInitialProgress();
//       setProgress(initialProgress);

//       return initialProgress;
//     } finally {
//       setIsLoading(false);
//     }
//   }, [gameType]);

//   // ==================================================
//   // 최초 로딩
//   // ==================================================

//   useEffect(() => {
//     void reloadProgress();
//   }, [reloadProgress]);

//   // ==================================================
//   // 특정 Level
//   // ==================================================

//   const getLevel = useCallback(
//     (level: number) => getLevelProgress(progress, level),
//     [progress],
//   );

//   // ==================================================
//   // Unlock 여부
//   // ==================================================

//   const isLevelUnlocked = useCallback(
//     (level: number) => getLevelProgress(progress, level)?.unlocked ?? false,
//     [progress],
//   );

//   // ==================================================
//   // 완료 여부
//   // ==================================================

//   const isLevelCompleted = useCallback(
//     (level: number) => getLevelProgress(progress, level)?.completed ?? false,
//     [progress],
//   );

//   return {
//     progress,
//     isLoading,
//     getLevel,
//     isLevelUnlocked,
//     isLevelCompleted,
//     reloadProgress,
//   };
// }

import { useCallback, useEffect, useState } from "react";

import {
  getCachedGameProgress,
  hasCachedGameProgress,
  loadGameProgress,
  saveGameProgress,
} from "./progressStorage";

import {
  createInitialProgress,
  GameProgress,
  getLevelProgress,
  mergeProgressWithStages,
} from "./gameProgress";

import type { GameType } from "./progressStorage";

// ==================================================
// Progress Hook
// ==================================================

export function useProgress(gameType: GameType = "color") {
  const [progress, setProgress] = useState<GameProgress>(() => {
    const cached = getCachedGameProgress(gameType);
    return cached ? mergeProgressWithStages(cached) : createInitialProgress();
  });

  const [isLoading, setIsLoading] = useState(
    () => !hasCachedGameProgress(gameType),
  );

  // ==================================================
  // Progress 불러오기
  // ==================================================

  const reloadProgress = useCallback(async () => {
    try {
      const savedProgress = await loadGameProgress(gameType);

      const mergedProgress = savedProgress
        ? mergeProgressWithStages(savedProgress)
        : createInitialProgress();

      setProgress(mergedProgress);

      void saveGameProgress(gameType, mergedProgress);

      return mergedProgress;
    } catch (error) {
      console.error("게임 진행 상황을 불러오지 못했습니다.", error);

      const initialProgress = createInitialProgress();
      setProgress(initialProgress);

      return initialProgress;
    } finally {
      setIsLoading(false);
    }
  }, [gameType]);

  // ==================================================
  // 최초 로딩
  // ==================================================

  useEffect(() => {
    void reloadProgress();
  }, [reloadProgress]);

  // ==================================================
  // 특정 Level
  // ==================================================

  const getLevel = useCallback(
    (level: number) => getLevelProgress(progress, level),
    [progress],
  );

  // ==================================================
  // Unlock 여부
  // ==================================================

  const isLevelUnlocked = useCallback(
    (level: number) => getLevelProgress(progress, level)?.unlocked ?? false,
    [progress],
  );

  // ==================================================
  // 완료 여부
  // ==================================================

  const isLevelCompleted = useCallback(
    (level: number) => getLevelProgress(progress, level)?.completed ?? false,
    [progress],
  );

  return {
    progress,
    isLoading,
    getLevel,
    isLevelUnlocked,
    isLevelCompleted,
    reloadProgress,
  };
}
