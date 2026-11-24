import { useCallback, useMemo, useRef, useState } from "react";
import { PanResponder } from "react-native";

import type {
  DrawingPoint,
  DrawingStrokeData,
  DrawingGestureOptions,
} from "../types/drawing.types";

export const useDrawingGesture = (options: DrawingGestureOptions = {}) => {
  // 완성된 선들
  const [strokes, setStrokes] = useState<DrawingStrokeData[]>([]);

  // 현재 그리고 있는 선
  const [currentStroke, setCurrentStroke] = useState<DrawingStrokeData>([]);

  const [isDrawing, setIsDrawing] = useState(false);

  // 렌더링과 별개로 최신 좌표를 보관
  const currentStrokeRef = useRef<DrawingStrokeData>([]);

  // 실제 이동이 발생했는지 (터치만 하고 안 움직인 경우 별 차감 금지)
  const hasMovedRef = useRef(false);

  // 콜백이 변경되어도 PanResponder를 다시 만들지 않도록 보관
  const onStrokeCompleteRef = useRef(options.onStrokeComplete);
  onStrokeCompleteRef.current = options.onStrokeComplete;

  const onStrokeEndRef = useRef(options.onStrokeEnd);
  onStrokeEndRef.current = options.onStrokeEnd;

  const onStrokeCancelRef = useRef(options.onStrokeCancel);
  onStrokeCancelRef.current = options.onStrokeCancel;

  const onTouchPointRef = useRef(options.onTouchPoint);
  onTouchPointRef.current = options.onTouchPoint;

  // 좌표 유효성 검사
  const createPoint = useCallback(
    (x: number, y: number): DrawingPoint | null => {
      if (!Number.isFinite(x) || !Number.isFinite(y)) {
        return null;
      }

      return { x, y };
    },
    [],
  );

  // 그리기 시작
  const handleGrant = useCallback(
    (x: number, y: number) => {
      const point = createPoint(x, y);

      if (!point) return;

      const initialStroke = [point];

      currentStrokeRef.current = initialStroke;
      hasMovedRef.current = false;

      setCurrentStroke(initialStroke);
      setIsDrawing(true);

      onTouchPointRef.current?.(point);
    },
    [createPoint],
  );

  // 손가락 이동
  const handleMove = useCallback(
    (x: number, y: number) => {
      const point = createPoint(x, y);

      if (!point || !currentStrokeRef.current.length) {
        return;
      }

      const prev =
        currentStrokeRef.current[currentStrokeRef.current.length - 1];
      // 의미 있는 이동이 있었는지 확인 (단순 노이즈 제외)
      if (
        prev &&
        (Math.abs(prev.x - point.x) > 1.5 || Math.abs(prev.y - point.y) > 1.5)
      ) {
        hasMovedRef.current = true;
      }

      const nextStroke = [...currentStrokeRef.current, point];

      currentStrokeRef.current = nextStroke;
      setCurrentStroke(nextStroke);

      onTouchPointRef.current?.(point);
    },
    [createPoint],
  );

  // 정상 손가락 해제
  const handleRelease = useCallback(() => {
    const completedStroke = currentStrokeRef.current;
    const hadMovement = hasMovedRef.current;

    if (completedStroke.length > 0) {
      setStrokes((previous) => [...previous, completedStroke]);

      // 기존 호환 콜백 유지
      onStrokeCompleteRef.current?.(completedStroke);

      onStrokeEndRef.current?.(completedStroke, {
        wasTerminated: false,
        hadMovement,
      });
    }

    currentStrokeRef.current = [];
    hasMovedRef.current = false;

    setCurrentStroke([]);
    setIsDrawing(false);
  }, []);

  // 시스템 취소 (실패로 처리하지 않음)
  const handleTerminate = useCallback(() => {
    const completedStroke = currentStrokeRef.current;
    const hadMovement = hasMovedRef.current;

    // 기존 onStrokeComplete는 호출하지 않음 → 실패/성공 판정 방지
    onStrokeCancelRef.current?.();

    if (completedStroke.length > 0) {
      onStrokeEndRef.current?.(completedStroke, {
        wasTerminated: true,
        hadMovement,
      });
    }

    currentStrokeRef.current = [];
    hasMovedRef.current = false;

    setCurrentStroke([]);
    setIsDrawing(false);
  }, []);

  // 터치 이벤트 연결
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,

        onMoveShouldSetPanResponder: () => true,

        onPanResponderGrant: (event) => {
          const { locationX, locationY } = event.nativeEvent;

          handleGrant(locationX, locationY);
        },

        onPanResponderMove: (event) => {
          const { locationX, locationY } = event.nativeEvent;

          handleMove(locationX, locationY);
        },

        onPanResponderRelease: () => {
          handleRelease();
        },

        onPanResponderTerminate: () => {
          handleTerminate();
        },

        onPanResponderTerminationRequest: () => false,

        onShouldBlockNativeResponder: () => true,
      }),
    [handleGrant, handleMove, handleRelease, handleTerminate],
  );

  // 전체 선 초기화
  const clearStrokes = useCallback(() => {
    currentStrokeRef.current = [];
    hasMovedRef.current = false;

    setStrokes([]);
    setCurrentStroke([]);
    setIsDrawing(false);
  }, []);

  return {
    panResponder,
    strokes,
    currentStroke,
    isDrawing,
    clearStrokes,
  };
};
