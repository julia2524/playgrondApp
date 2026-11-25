import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { StyleSheet } from "react-native";
import type { LayoutChangeEvent, StyleProp, ViewStyle } from "react-native";
import styled from "styled-components/native";

import Svg, { Circle, Path } from "react-native-svg";

import { useTracingProgress } from "../hooks/useTracingProgress";
import type { TracingBoardSize, TracingGuide } from "../types/tracing.types";

import PandaTransition from "./PandaTransition";
import DrawingParticleEffect from "./DrawingParticleEffect";
import TracingTutorial from "./TracingTutorial";
import SuccessEffect from "./SuccessEffect";

import type { DrawingParticleEffectHandle } from "./DrawingParticleEffect";

import { PANDA_SOURCE, PANDA_WINK_SOURCE } from "../constants/pandaAssets";
import DrawingStroke from "./DrawingStroke";

/** 그림 영역 크기가 정해지기 전에 쓰는 빈 가이드 */
const EMPTY_GUIDE: TracingGuide = { id: "empty", points: [] };

interface TracingCanvasProps {
  /** 실제 그림 영역의 크기를 받아 가이드를 만든다. */
  createGuide: (size: TracingBoardSize) => TracingGuide;

  style?: StyleProp<ViewStyle>;
  guideColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  onComplete?: () => void;
  /** 유효한 그리기 시도 후 미완성으로 손가락을 뗐을 때 */
  onFailedAttempt?: () => void;
  resetKey: number;

  showPanda?: boolean;
  inputLocked?: boolean;

  onProgressLabelChange?: (label: string) => void;

  tutorialEnabled?: boolean;
}

export const TracingCanvas: React.FC<TracingCanvasProps> = ({
  createGuide,
  style,
  guideColor = "#CDEFE8",
  strokeColor = "#55BFA9",
  strokeWidth = 10,
  onComplete,
  onFailedAttempt,
  resetKey,
  showPanda = false,
  inputLocked = false,
  tutorialEnabled = true,
  onProgressLabelChange,
}) => {
  const particleRef = useRef<DrawingParticleEffectHandle>(null);
  const tutorialTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [canvasSize, setCanvasSize] = useState<TracingBoardSize | null>(null);
  const [tutorialVisible, setTutorialVisible] = useState(false);

  const tutorialStartedRef = useRef(false);

  const guide = useMemo<TracingGuide>(
    () => (canvasSize ? createGuide(canvasSize) : EMPTY_GUIDE),
    [canvasSize, createGuide],
  );

  const width = canvasSize?.width ?? 0;
  const height = canvasSize?.height ?? 0;

  const handleCanvasLayout = useCallback((event: LayoutChangeEvent) => {
    const { width: w, height: h } = event.nativeEvent.layout;

    setCanvasSize((previous) =>
      previous && previous.width === w && previous.height === h
        ? previous
        : { width: w, height: h },
    );
  }, []);

  const {
    panResponder,
    currentStroke,
    strokes,
    isDrawing,
    isCompleted,
    completedSegments,
    resetTracing,
  } = useTracingProgress(guide, {
    onComplete,
    onFailedAttempt,
    onTouchPoint: (point) => particleRef.current?.emit(point),
  });

  const guidePoints = guide.points;

  const guidePath = guidePoints
    .map((point, index) => {
      return `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`;
    })
    .join(" ");

  const firstPoint = guidePoints[0];
  const endPoint = guidePoints[guidePoints.length - 1];

  const pandaWidth = Math.min(112, Math.round(width * 0.3));
  const pandaHeight = Math.round(pandaWidth * 1.25);

  const completedPath = useMemo(() => {
    let d = "";
    let isOpen = false;

    completedSegments.forEach((completed, index) => {
      const start = guidePoints[index];
      const end = guidePoints[index + 1];

      if (!completed || !start || !end) {
        isOpen = false;
        return;
      }

      d += isOpen
        ? ` L ${end.x} ${end.y}`
        : ` M ${start.x} ${start.y} L ${end.x} ${end.y}`;

      isOpen = true;
    });

    return d;
  }, [completedSegments, guidePoints]);

  // // 튜토리얼 시작
  // useEffect(() => {
  //   if (!tutorialStartedRef.current && guidePoints.length >= 2) {
  //     tutorialStartedRef.current = true;
  //     setTutorialVisible(true);
  //   }
  // }, [guidePoints]);

  // const handleTutorialComplete = useCallback(() => {
  //   setTutorialVisible(false);
  // }, []);

  // const clearTutorialTimer = useCallback(() => {
  //   if (tutorialTimerRef.current) {
  //     clearTimeout(tutorialTimerRef.current);
  //     tutorialTimerRef.current = null;
  //   }
  // }, []);

  // const handleTouchStart = useCallback(() => {
  //   clearTutorialTimer();
  //   setTutorialVisible(false);
  // }, [clearTutorialTimer]);

  // const handleTouchEnd = useCallback(() => {
  //   clearTutorialTimer();

  //   tutorialTimerRef.current = setTimeout(() => {
  //     setTutorialVisible(true);
  //     tutorialTimerRef.current = null;
  //   }, 3000);
  // }, [clearTutorialTimer]);

  // useEffect(() => {
  //   return () => {
  //     clearTutorialTimer();
  //   };
  // }, [clearTutorialTimer]);

  // 내부 초기화 기능은 유지
  const handleReset = useCallback(() => {
    particleRef.current?.clear();
    resetTracing();
  }, [resetTracing]);

  useEffect(() => {
    if (resetKey > 0) {
      handleReset();
    }
  }, [resetKey, handleReset]);
  const tutorialEnabledRef = useRef(tutorialEnabled);

  // 렌더링 시점에 최신 상태 반영
  tutorialEnabledRef.current = tutorialEnabled;

  const clearTutorialTimer = useCallback(() => {
    if (tutorialTimerRef.current) {
      clearTimeout(tutorialTimerRef.current);
      tutorialTimerRef.current = null;
    }
  }, []);

  // 튜토리얼 활성화 시 표시
  useEffect(() => {
    clearTutorialTimer();

    if (tutorialEnabled && guidePoints.length >= 2) {
      setTutorialVisible(true);
    } else {
      setTutorialVisible(false);
    }

    return clearTutorialTimer;
  }, [tutorialEnabled, guidePoints, clearTutorialTimer]);
  const handleTutorialComplete = useCallback(() => {
    setTutorialVisible(false);

    clearTutorialTimer();

    if (!tutorialEnabledRef.current) return;

    tutorialTimerRef.current = setTimeout(() => {
      tutorialTimerRef.current = null;

      if (tutorialEnabledRef.current) {
        setTutorialVisible(true);
      }
    }, 3000);
  }, [clearTutorialTimer]);

  const handleTouchStart = useCallback(() => {
    clearTutorialTimer();
    setTutorialVisible(false);
  }, [clearTutorialTimer]);

  const handleTouchEnd = useCallback(() => {
    clearTutorialTimer();

    if (!tutorialEnabledRef.current) return;

    tutorialTimerRef.current = setTimeout(() => {
      tutorialTimerRef.current = null;

      if (tutorialEnabledRef.current) {
        setTutorialVisible(true);
      }
    }, 3000);
  }, [clearTutorialTimer]);

  useEffect(() => {
    return () => {
      clearTutorialTimer();
    };
  }, [clearTutorialTimer]);

  const progressLabel = isCompleted
    ? "참 잘했어요! 🎉"
    : tutorialVisible
      ? "이렇게 그려봐요!"
      : "길을 따라가 볼까요!";

  useEffect(() => {
    onProgressLabelChange?.(progressLabel);
  }, [progressLabel, onProgressLabelChange]);

  return (
    <Container style={style}>
      <CanvasArea
        onLayout={handleCanvasLayout}
        onTouchStart={inputLocked ? undefined : handleTouchStart}
        onTouchEnd={inputLocked ? undefined : handleTouchEnd}
        onTouchCancel={inputLocked ? undefined : handleTouchEnd}
        pointerEvents={inputLocked ? "none" : "auto"}
        {...(inputLocked ? {} : panResponder.panHandlers)}
      >
        {canvasSize && firstPoint && endPoint && (
          <>
            <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
              {/* 안내 경로 */}
              <Path
                d={guidePath}
                fill="none"
                stroke={guideColor}
                strokeWidth={4}
                strokeDasharray="0.1 9"
                strokeLinecap="round"
              />

              {/* 완성된 구간 */}
              {completedPath.length > 0 && (
                <Path
                  d={completedPath}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* 현재 손가락을 따라가는 선 */}
              {currentStroke.length > 0 && (
                <DrawingStroke
                  points={currentStroke}
                  color={strokeColor}
                  strokeWidth={strokeWidth}
                  opacity={0.65}
                />
              )}

              {/* 시작점 */}
              <Circle
                cx={firstPoint.x}
                cy={firstPoint.y}
                r={7}
                fill={strokeColor}
              />

              {/* 도착점 */}
              <Circle cx={endPoint.x} cy={endPoint.y} r={7} fill="#F7C978" />
            </Svg>

            {showPanda && (
              <PandaTransition
                source={PANDA_SOURCE}
                winkSource={PANDA_WINK_SOURCE}
                startPoint={firstPoint}
                endPoint={endPoint}
                guidePoints={guidePoints}
                isTraceCompleted={isCompleted}
                width={width}
                height={height}
                pandaWidth={pandaWidth}
                pandaHeight={pandaHeight}
              />
            )}

            <DrawingParticleEffect
              ref={particleRef}
              width={width}
              height={height}
            />

            <SuccessEffect
              x={endPoint.x}
              y={endPoint.y}
              visible={isCompleted}
              size={Math.min(120, Math.round(width * 0.35))}
            />

            {/* <TracingTutorial
              visible={tutorialVisible}
              points={guidePoints}
              onComplete={handleTutorialComplete}
            /> */}
            <TracingTutorial
              visible={tutorialEnabled && tutorialVisible}
              points={guidePoints}
              onComplete={handleTutorialComplete}
            />
          </>
        )}
      </CanvasArea>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: stretch;
  padding-horizontal: 16px;
  padding-top: 14px;
  padding-bottom: 12px;
`;

const CanvasArea = styled.View`
  flex: 1;
  position: relative;
  overflow: hidden;
  background-color: #ffffff;
  border-radius: 24px;
`;
