import { useCallback, useEffect, useState } from "react";

import { loadGameProgress, saveGameProgress } from "./progressStorage";

import {
  createInitialProgress,
  GameProgress,
  getLevelProgress,
  mergeProgressWithStages,
} from "./gameProgress";

// ==================================================
// Progress Hook
// ==================================================

export function useProgress() {
  const [progress, setProgress] = useState<GameProgress>(
    createInitialProgress(),
  );

  const [isLoading, setIsLoading] = useState(true);

  // ==================================================
  // Progress 불러오기
  // ==================================================

  const reloadProgress = useCallback(async () => {
    try {
      const savedProgress = await loadGameProgress();

      if (savedProgress) {
        const mergedProgress = mergeProgressWithStages(savedProgress);

        setProgress(mergedProgress);

        // Stage가 새로 추가됐을 수도 있으므로 다시 저장
        await saveGameProgress(mergedProgress);

        return mergedProgress;
      }

      const initialProgress = createInitialProgress();

      setProgress(initialProgress);

      await saveGameProgress(initialProgress);

      return initialProgress;
    } catch (error) {
      console.error("게임 진행 상황을 불러오지 못했습니다.", error);

      return null;
    }
  }, []);

  // ==================================================
  // 최초 로딩
  // ==================================================

  useEffect(() => {
    async function load() {
      await reloadProgress();

      setIsLoading(false);
    }

    load();
  }, [reloadProgress]);

  // ==================================================
  // 특정 Level
  // ==================================================

  const getLevel = useCallback(
    (level: number) => {
      return getLevelProgress(progress, level);
    },
    [progress],
  );

  // ==================================================
  // Unlock 여부
  // ==================================================

  const isLevelUnlocked = useCallback(
    (level: number) => {
      return getLevelProgress(progress, level)?.unlocked ?? false;
    },
    [progress],
  );

  // ==================================================
  // 완료 여부
  // ==================================================

  const isLevelCompleted = useCallback(
    (level: number) => {
      return getLevelProgress(progress, level)?.completed ?? false;
    },
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
