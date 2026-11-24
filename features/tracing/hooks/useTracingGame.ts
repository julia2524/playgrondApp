import { useCallback, useRef, useState } from "react";

/**
 * 게임 진행 상태
 * - playing: 진행 중
 * - success: 스테이지 성공 확정 + 음계 재생 중 (ResultModal 아직 안 띄움)
 * - result: 음계 재생 완료 → ResultModal 표시
 * - retry: 별 0개 → 재도전 대기
 * - completed: 20스테이지 전체 완료
 */
export type TracingGameStatus =
  | "playing"
  | "success"
  | "result"
  | "retry"
  | "completed";

/** 스테이지 성공 결과 (ResultModal / 완료 화면용) */
export interface TracingStageResult {
  stageIndex: number;
  stageNo: string;
  title: string;
  mission: string;
  remainingStars: number;
  /** 간단 점수: 남은 별 × 100 */
  score: number;
  isLastStage: boolean;
}

export interface UseTracingGameOptions {
  /**
   * 남은 별 개수만큼 음계 재생.
   * Promise를 반환하면 재생이 끝난 뒤 ResultModal을 연다.
   */
  playNotesForStars?: (remainingStars: number) => Promise<void> | void;
  totalStages?: number;
  initialStars?: number;
  /** 스테이지 결과 메타 정보 조회 (번호, 이름, 미션) */
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
  /** 방금 성공한 스테이지 결과 (result / completed 상태) */
  lastResult: TracingStageResult | null;

  handleFailedAttempt: () => void;
  handleStageComplete: () => void;
  handleRetry: () => void;
  /** ResultModal에서 「다음 스테이지」 */
  handleNextStage: () => void;
  handleResetGame: () => void;

  canvasResetKey: number;
  stageKey: number;
}

const DEFAULT_TOTAL = 20;
const DEFAULT_STARS = 5;

function calcScore(stars: number): number {
  return Math.max(0, stars) * 100;
}

/**
 * 스테이지마다 별 5개 + 20스테이지 연속 플레이
 * 성공 → 음계 → ResultModal → (버튼) 다음 스테이지 / 전체 완료
 */
export function useTracingGame(
  options: UseTracingGameOptions = {},
): UseTracingGameResult {
  const totalStages = options.totalStages ?? DEFAULT_TOTAL;
  const initialStars = options.initialStars ?? DEFAULT_STARS;

  const playNotesRef = useRef(options.playNotesForStars);
  playNotesRef.current = options.playNotesForStars;

  const getStageMetaRef = useRef(options.getStageMeta);
  getStageMetaRef.current = options.getStageMeta;

  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [remainingStars, setRemainingStars] = useState(initialStars);
  const [gameStatus, setGameStatus] = useState<TracingGameStatus>("playing");
  const [isProcessing, setIsProcessing] = useState(false);
  const [canvasResetKey, setCanvasResetKey] = useState(0);
  const [stageKey, setStageKey] = useState(0);
  const [lastResult, setLastResult] = useState<TracingStageResult | null>(null);

  const processingRef = useRef(false);
  const remainingStarsRef = useRef(remainingStars);
  remainingStarsRef.current = remainingStars;
  const gameStatusRef = useRef(gameStatus);
  gameStatusRef.current = gameStatus;
  const stageIndexRef = useRef(currentStageIndex);
  stageIndexRef.current = currentStageIndex;

  const bumpCanvasReset = useCallback(() => {
    setCanvasResetKey((k) => k + 1);
  }, []);

  /**
   * 미완성으로 손가락을 뗐을 때
   * - 별 1개 차감, 진행률 유지 (이어 그리기)
   * - 별 0 → 재도전 모달
   */
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

  /**
   * 경로 완성 성공
   * 1) 입력 잠금 + success 상태
   * 2) 결과 데이터 확정
   * 3) 음계 재생
   * 4) 재생 끝나면 result 상태 → ResultModal
   *    (마지막 스테이지도 일단 result로 두고, 버튼에서 completed로)
   */
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

    const run = async () => {
      try {
        const play = playNotesRef.current;
        if (play) {
          await Promise.resolve(play(starsSnapshot));
        } else {
          const ms = Math.max(300, starsSnapshot * 220 + 150);
          await new Promise((r) => setTimeout(r, ms));
        }
      } catch (e) {
        console.log("음계 재생 중 오류 (무시하고 진행):", e);
      }

      // 음계가 끝난 뒤에만 ResultModal 표시
      setGameStatus("result");
      // 버튼 누르기 전까지는 processing 유지(입력 잠금)
      // processingRef는 handleNextStage / handleResetGame 에서 해제
    };

    void run();
  }, [totalStages]);

  const handleRetry = useCallback(() => {
    setRemainingStars(initialStars);
    setGameStatus("playing");
    setLastResult(null);
    processingRef.current = false;
    setIsProcessing(false);
    bumpCanvasReset();
  }, [initialStars, bumpCanvasReset]);

  /**
   * ResultModal 「다음 스테이지」 / 마지막이면 전체 완료 화면으로
   */
  const handleNextStage = useCallback(() => {
    if (gameStatusRef.current !== "result") return;

    const idx = stageIndexRef.current;
    const nextIdx = idx + 1;

    if (nextIdx >= totalStages) {
      // 전체 게임 완료 화면
      setGameStatus("completed");
      processingRef.current = false;
      setIsProcessing(false);
      return;
    }

    // 다음 스테이지: 별 5개, 그리기 데이터 새로
    setCurrentStageIndex(nextIdx);
    setRemainingStars(initialStars);
    setGameStatus("playing");
    setLastResult(null);
    setStageKey((k) => k + 1);
    bumpCanvasReset();
    processingRef.current = false;
    setIsProcessing(false);
  }, [totalStages, initialStars, bumpCanvasReset]);

  const handleResetGame = useCallback(() => {
    setCurrentStageIndex(0);
    setRemainingStars(initialStars);
    setGameStatus("playing");
    setLastResult(null);
    processingRef.current = false;
    setIsProcessing(false);
    setStageKey((k) => k + 1);
    bumpCanvasReset();
  }, [initialStars, bumpCanvasReset]);

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
    canvasResetKey,
    stageKey,
  };
}
