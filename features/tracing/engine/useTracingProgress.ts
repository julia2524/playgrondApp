import { useCallback, useEffect, useRef, useState } from "react";
import {
  DrawingPoint,
  DrawingStrokeData,
  DrawingStrokeEndMeta,
} from "../types/drawing.types";
import { TracingGuide } from "../types/tracing.types";

import {
  createInitialTracingProgress,
  updateTracingProgress,
} from "./tracingProgress";

import type { TracingProgressState } from "./tracingProgress";
import { useDrawingGesture } from "./useDrawingGesture";

/**
 * Tracing Progress Hook 옵션
 */
interface UseTracingProgressOptions {
  onProgressChange?: (progress: number) => void;
  onComplete?: () => void;
  /**
   * 유효한 그리기 시도 후 경로를 완성하지 못하고 손가락을 뗐을 때
   * (시스템 취소 / 터치만 한 경우는 호출되지 않음)
   * 진행률·완성 구간은 유지되며, 상위에서는 별만 차감하고 이어 그리게 한다.
   */
  onFailedAttempt?: () => void;
  /** 손가락 좌표 (시각 효과 전용, 진행률 계산과 무관) */
  onTouchPoint?: (point: DrawingPoint) => void;
}

/**
 * 가이드 경로를 따라 그리는 진행 상황을 관리하는 Hook
 */
export const useTracingProgress = (
  guide: TracingGuide,
  options: UseTracingProgressOptions = {},
) => {
  // 현재 가이드 보관
  const guideRef = useRef(guide);
  guideRef.current = guide;

  // 외부 콜백 보관
  const onProgressChangeRef = useRef(options.onProgressChange);
  const onCompleteRef = useRef(options.onComplete);
  const onFailedAttemptRef = useRef(options.onFailedAttempt);

  onProgressChangeRef.current = options.onProgressChange;
  onCompleteRef.current = options.onComplete;
  onFailedAttemptRef.current = options.onFailedAttempt;

  // 초기 진행 상태
  const [progressState, setProgressState] = useState<TracingProgressState>(() =>
    createInitialTracingProgress(guide),
  );

  // 렌더링과 별개로 최신 진행 상태 보관
  const progressStateRef = useRef(progressState);

  // 완성 콜백 중복 실행 방지
  const isCompletedRef = useRef(false);

  // 동일 Stroke에 대해 성공/실패를 한 번만 결정
  const lastProcessedStrokeRef = useRef<DrawingStrokeData | null>(null);

  /**
   * Stroke 종료 시 진행률 갱신 + 성공/실패 판정
   * (정상 해제만 처리, 시스템 취소는 제외)
   */
  const handleStrokeEnd = useCallback(
    (stroke: DrawingStrokeData, meta: DrawingStrokeEndMeta) => {
      // 시스템 취소 → 실패로 처리하지 않음
      if (meta.wasTerminated) {
        return;
      }

      const currentGuide = guideRef.current;
      const previousState = progressStateRef.current;

      // 이미 완성했다면 추가 판정하지 않음
      if (previousState.progress.isCompleted || isCompletedRef.current) {
        return;
      }

      // 동일 Stroke 중복 처리 방지
      if (lastProcessedStrokeRef.current === stroke) {
        return;
      }
      lastProcessedStrokeRef.current = stroke;

      // 새로운 Stroke를 기존 진행 상태에 반영
      const nextState = updateTracingProgress(
        currentGuide,
        previousState,
        stroke,
      );

      // 최신 상태 갱신
      progressStateRef.current = nextState;
      setProgressState(nextState);

      // 진행률 변경 콜백
      onProgressChangeRef.current?.(nextState.progress.progress);

      // 성공 / 실패는 동일 Stroke에 대해 단 한 번만
      if (nextState.progress.isCompleted) {
        if (!isCompletedRef.current) {
          isCompletedRef.current = true;
          onCompleteRef.current?.();
        }
        return;
      }

      // 완성되지 않았고, 유효한 그리기 시도였을 때만 실패
      // (손가락을 대기만 하고 이동하지 않은 경우 별 차감 금지)
      if (meta.hadMovement && stroke.length >= 2) {
        onFailedAttemptRef.current?.();
      }
    },
    [],
  );

  /**
   * Drawing Engine 연결
   * 판정은 onStrokeEnd(정상 해제/시스템 취소 구분)로만 수행한다.
   * onStrokeComplete는 기존 호환용으로 유지하되, 여기서는 판정에 사용하지 않는다.
   */
  const { panResponder, strokes, currentStroke, isDrawing, clearStrokes } =
    useDrawingGesture({
      onStrokeEnd: handleStrokeEnd,
      onTouchPoint: options.onTouchPoint,
    });

  /**
   * 가이드가 변경되면 진행 상황 초기화
   */
  useEffect(() => {
    const initialState = createInitialTracingProgress(guideRef.current);

    progressStateRef.current = initialState;
    setProgressState(initialState);

    isCompletedRef.current = false;
    lastProcessedStrokeRef.current = null;

    clearStrokes();
  }, [
    guide.id,
    guide.points,
    guide.tolerance,
    guide.completionThreshold,
    clearStrokes,
  ]);

  /**
   * 현재 그리기 진행 상황 초기화
   */
  const resetTracing = useCallback(() => {
    const initialState = createInitialTracingProgress(guideRef.current);

    progressStateRef.current = initialState;
    setProgressState(initialState);

    isCompletedRef.current = false;
    lastProcessedStrokeRef.current = null;

    clearStrokes();
  }, [clearStrokes]);

  return {
    // Drawing Engine
    panResponder,
    strokes,
    currentStroke,
    isDrawing,

    // Tracing Engine
    progress: progressState.progress.progress,
    completedPoints: progressState.progress.completedPoints,
    totalPoints: progressState.progress.totalPoints,
    isCompleted: progressState.progress.isCompleted,

    // 진행 상태
    completedSegments: progressState.completedSegments,

    // 초기화
    resetTracing,
  };
};
