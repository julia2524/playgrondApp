import { useCallback, useRef, useState } from "react";

// ==================================================
// Types
// ==================================================

export type TracingGameStatus =
  | "playing"
  | "success"
  | "result"
  | "retry"
  | "completed";

export interface TracingStageResult {
  stageIndex: number;
  stageNo: string;
  title: string;
  mission: string;
  remainingStars: number;
  score: number;
  isLastStage: boolean;
}

export interface UseTracingGameOptions {
  totalStages?: number;
  initialStars?: number;
  initialStage?: number;

  getStageMeta?: (stageIndex: number) => {
    stageNo: string;
    title: string;
    mission: string;
  };
}

export interface UseTracingGameResult {
  currentStageIndex: number;
  remainingStars: number;
  gameStatus: TracingGameStatus;
  isProcessing: boolean;
  totalStages: number;
  lastResult: TracingStageResult | null;

  handleFailedAttempt: () => void;
  handleStageComplete: () => void;
  handleRetry: () => void;
  handleNextStage: () => void;
  handleResetGame: () => void;

  handleDevPrevStage: () => void;
  handleDevSkipStage: () => void;

  canvasResetKey: number;
  stageKey: number;
}

// ==================================================
// Constants
// ==================================================

const DEFAULT_TOTAL = 20;
const DEFAULT_STARS = 5;

// ==================================================
// Helpers
// ==================================================

function calcScore(stars: number): number {
  return Math.max(0, stars) * 100;
}

function normalizeStage(
  stage: number | undefined,
  totalStages: number,
): number {
  const parsedStage = Math.floor(Number(stage) || 1);

  return Math.max(0, Math.min(totalStages - 1, parsedStage - 1));
}

// ==================================================
// Hook
// ==================================================

export function useTracingGame(
  options: UseTracingGameOptions = {},
): UseTracingGameResult {
  const totalStages = Math.max(1, options.totalStages ?? DEFAULT_TOTAL);

  const initialStars = options.initialStars ?? DEFAULT_STARS;

  const initialStage = options.initialStage ?? 1;

  // ==================================================
  // Stage Meta
  // ==================================================

  const getStageMetaRef = useRef(options.getStageMeta);

  getStageMetaRef.current = options.getStageMeta;

  // ==================================================
  // State
  // ==================================================

  const [currentStageIndex, setCurrentStageIndex] = useState(() =>
    normalizeStage(initialStage, totalStages),
  );

  const [remainingStars, setRemainingStars] = useState(initialStars);

  const [gameStatus, setGameStatus] = useState<TracingGameStatus>("playing");

  const [isProcessing, setIsProcessing] = useState(false);

  const [canvasResetKey, setCanvasResetKey] = useState(0);

  const [stageKey, setStageKey] = useState(0);

  const [lastResult, setLastResult] = useState<TracingStageResult | null>(null);

  // ==================================================
  // Refs
  // ==================================================

  const processingRef = useRef(false);

  const remainingStarsRef = useRef(remainingStars);

  remainingStarsRef.current = remainingStars;

  const gameStatusRef = useRef(gameStatus);

  gameStatusRef.current = gameStatus;

  const stageIndexRef = useRef(currentStageIndex);

  stageIndexRef.current = currentStageIndex;

  // ==================================================
  // Canvas Reset
  // ==================================================

  const bumpCanvasReset = useCallback(() => {
    setCanvasResetKey((key) => key + 1);
  }, []);

  // ==================================================
  // Failed Attempt
  // ==================================================

  const handleFailedAttempt = useCallback(() => {
    if (processingRef.current) return;

    if (gameStatusRef.current !== "playing") return;

    processingRef.current = true;

    setIsProcessing(true);

    setRemainingStars((prev) => {
      const next = Math.max(0, prev - 1);

      if (next <= 0) {
        setGameStatus("retry");
      }

      return next;
    });

    setTimeout(() => {
      processingRef.current = false;
      setIsProcessing(false);
    }, 120);
  }, []);

  // ==================================================
  // Stage Complete
  // ==================================================

  const handleStageComplete = useCallback(() => {
    if (processingRef.current) return;

    if (gameStatusRef.current !== "playing") return;

    processingRef.current = true;

    setIsProcessing(true);

    setGameStatus("success");

    const starsSnapshot = remainingStarsRef.current;

    const idx = stageIndexRef.current;

    const isLast = idx >= totalStages - 1;

    const meta = getStageMetaRef.current?.(idx) ?? {
      stageNo: String(idx + 1).padStart(2, "0"),
      title: `스테이지 ${idx + 1}`,
      mission: "",
    };

    const result: TracingStageResult = {
      stageIndex: idx,
      stageNo: meta.stageNo,
      title: meta.title,
      mission: meta.mission,
      remainingStars: starsSnapshot,
      score: calcScore(starsSnapshot),
      isLastStage: isLast,
    };

    setLastResult(result);

    // 현재 버전은 별도 음계 재생 없이 바로 결과 표시
    setGameStatus("result");
  }, [totalStages]);

  // ==================================================
  // Retry
  // ==================================================

  const handleRetry = useCallback(() => {
    setRemainingStars(initialStars);

    setGameStatus("playing");

    setLastResult(null);

    processingRef.current = false;

    setIsProcessing(false);

    bumpCanvasReset();
  }, [initialStars, bumpCanvasReset]);

  // ==================================================
  // Next Stage
  // ==================================================

  const handleNextStage = useCallback(() => {
    if (gameStatusRef.current !== "result") return;

    const idx = stageIndexRef.current;

    const nextIdx = idx + 1;

    // 마지막 스테이지 완료
    if (nextIdx >= totalStages) {
      setGameStatus("completed");

      processingRef.current = false;

      setIsProcessing(false);

      return;
    }

    setCurrentStageIndex(nextIdx);

    setRemainingStars(initialStars);

    setGameStatus("playing");

    setLastResult(null);

    setStageKey((key) => key + 1);

    bumpCanvasReset();

    processingRef.current = false;

    setIsProcessing(false);
  }, [totalStages, initialStars, bumpCanvasReset]);

  // ==================================================
  // Reset Game
  // ==================================================

  const handleResetGame = useCallback(() => {
    // 전체 게임을 처음부터 다시 시작
    setCurrentStageIndex(0);

    setRemainingStars(initialStars);

    setGameStatus("playing");

    setLastResult(null);

    processingRef.current = false;

    setIsProcessing(false);

    setStageKey((key) => key + 1);

    bumpCanvasReset();
  }, [initialStars, bumpCanvasReset]);

  // ==================================================
  // Developer: Previous Stage
  // ==================================================

  const handleDevPrevStage = useCallback(() => {
    if (!__DEV__) return;

    const prevIdx = stageIndexRef.current - 1;

    if (prevIdx < 0) return;

    setCurrentStageIndex(prevIdx);

    setRemainingStars(initialStars);

    setGameStatus("playing");

    setLastResult(null);

    processingRef.current = false;

    setIsProcessing(false);

    setStageKey((key) => key + 1);

    bumpCanvasReset();
  }, [initialStars, bumpCanvasReset]);

  // ==================================================
  // Developer: Skip Stage
  // ==================================================

  const handleDevSkipStage = useCallback(() => {
    if (!__DEV__) return;

    const idx = stageIndexRef.current;

    const nextIdx = idx + 1;

    if (nextIdx >= totalStages) return;

    setCurrentStageIndex(nextIdx);

    setRemainingStars(initialStars);

    setGameStatus("playing");

    setLastResult(null);

    processingRef.current = false;

    setIsProcessing(false);

    setStageKey((key) => key + 1);

    bumpCanvasReset();
  }, [totalStages, initialStars, bumpCanvasReset]);

  // ==================================================
  // Return
  // ==================================================

  return {
    currentStageIndex,
    remainingStars,
    gameStatus,
    isProcessing,
    totalStages,
    lastResult,

    handleFailedAttempt,
    handleStageComplete,
    handleRetry,
    handleNextStage,
    handleResetGame,

    handleDevPrevStage,
    handleDevSkipStage,

    canvasResetKey,
    stageKey,
  };
}
