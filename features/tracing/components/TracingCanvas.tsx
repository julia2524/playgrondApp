import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Pressable, StyleSheet } from "react-native";
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
import { AppText } from "../../../utils/AppText";
import DrawingStroke from "./DrawingStroke";

/** 그림 영역 크기가 정해지기 전에 쓰는 빈 가이드 */
const EMPTY_GUIDE: TracingGuide = { id: "empty", points: [] };

interface TracingCanvasProps {
  /**
   * 실제 그림 영역(진행률 막대, 버튼을 뺀 부분)의 크기를 받아 가이드를 만든다.
   * 경로와 터치 좌표가 같은 영역을 기준으로 하도록 캔버스가 크기를 직접 잰다.
   */
  createGuide: (size: TracingBoardSize) => TracingGuide;

  style?: StyleProp<ViewStyle>;
  guideColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  onComplete?: () => void;
  /** 유효한 그리기 시도 후 미완성으로 손가락을 뗐을 때 */
  onFailedAttempt?: () => void;
  resetKey: number;

  // 팬더 표시 여부
  showPanda?: boolean;
  /** true면 터치 입력을 막음 (모달/성공 처리 중) */
  inputLocked?: boolean;

  onProgressLabelChange?: (label: string) => void;
}

export const TracingCanvas: React.FC<TracingCanvasProps> = ({
  createGuide,
  style,
  guideColor = "#D9CBEF",
  strokeColor = "#9B7AEA",
  strokeWidth = 10,
  onComplete,
  onFailedAttempt,
  resetKey,
  showPanda = false,
  inputLocked = false,
  onProgressLabelChange,
}) => {
  const particleRef = useRef<DrawingParticleEffectHandle>(null);

  const tutorialTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 실제 그림 영역 크기
  const [canvasSize, setCanvasSize] = useState<TracingBoardSize | null>(null);

  // 튜토리얼 표시 상태
  const [tutorialVisible, setTutorialVisible] = useState(false);

  // 같은 캔버스에서 레이아웃이 변경되어도 튜토리얼 중복 실행 방지
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
    progress,
    isCompleted,
    completedSegments,
    resetTracing,
  } = useTracingProgress(guide, {
    onComplete,
    onFailedAttempt,

    // 파티클은 시각 효과만 담당
    onTouchPoint: (point) => particleRef.current?.emit(point),
  });

  const guidePoints = guide.points;

  const guidePath = guidePoints
    .map((point, index) => {
      return `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`;
    })
    .join(" ");

  // 시작점과 도착점
  const firstPoint = guidePoints[0];
  const endPoint = guidePoints[guidePoints.length - 1];

  // 팬더 크기
  const pandaWidth = Math.min(112, Math.round(width * 0.3));
  const pandaHeight = Math.round(pandaWidth * 1.25);

  // 완성된 구간은 이어진 구간끼리 하나의 Path로 합친다
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

  // ==================================================
  // 튜토리얼 시작
  // ==================================================

  useEffect(() => {
    if (!tutorialStartedRef.current && guidePoints.length >= 2) {
      tutorialStartedRef.current = true;
      setTutorialVisible(true);
    }
  }, [guidePoints]);

  // 튜토리얼 완료
  const handleTutorialComplete = useCallback(() => {
    setTutorialVisible(false);
  }, []);

  // ==================================================
  // 터치 이벤트에 따른 튜토리얼 제어
  // ==================================================

  // 타이머 초기화
  const clearTutorialTimer = useCallback(() => {
    if (tutorialTimerRef.current) {
      clearTimeout(tutorialTimerRef.current);
      tutorialTimerRef.current = null;
    }
  }, []);

  // 아이가 터치하면 튜토리얼 즉시 중단
  const handleTouchStart = useCallback(() => {
    clearTutorialTimer();
    setTutorialVisible(false);
  }, [clearTutorialTimer]);

  // 손가락을 뗀 후 3초 동안 재터치가 없으면 튜토리얼 재생
  const handleTouchEnd = useCallback(() => {
    clearTutorialTimer();

    tutorialTimerRef.current = setTimeout(() => {
      setTutorialVisible(true);
      tutorialTimerRef.current = null;
    }, 3000);
  }, [clearTutorialTimer]);

  // 컴포넌트가 사라질 때 타이머 정리
  useEffect(() => {
    return () => {
      clearTutorialTimer();
    };
  }, [clearTutorialTimer]);

  // ==================================================
  // 초기화
  // ==================================================

  const handleReset = useCallback(() => {
    particleRef.current?.clear();
    resetTracing();
  }, [resetTracing]);

  useEffect(() => {
    if (resetKey > 0) {
      handleReset();
    }
  }, [resetKey, handleReset]);

  const progressPercent = Math.round(progress * 100);

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
      {/* 진행률 */}
      <ProgressContainer>
        {/* <ProgressLabel>
          {isCompleted
            ? "참 잘했어요! 🎉"
            : tutorialVisible
              ? "이렇게 그려봐요!"
              : "길을 따라가 볼까요?"}
        </ProgressLabel> */}

        <ProgressTrack>
          <ProgressFill progressPercent={progressPercent} />
        </ProgressTrack>

        <ProgressText>{progressPercent}%</ProgressText>
      </ProgressContainer>

      {/* 그리기 영역 */}
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
              {/* 1. 원래 안내선 */}
              <Path
                d={guidePath}
                fill="none"
                stroke={guideColor}
                strokeWidth={4}
                strokeDasharray="0.1 9"
                strokeLinecap="round"
              />

              {/* 2. 완성된 구간 */}
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

              {/* 3. 현재 손가락을 따라가는 임시 선 */}
              {currentStroke.length > 0 && (
                <DrawingStroke
                  points={currentStroke}
                  color={strokeColor}
                  strokeWidth={strokeWidth}
                  opacity={0.65}
                />
              )}

              {/* 4. 시작점 */}
              <Circle
                cx={firstPoint.x}
                cy={firstPoint.y}
                r={7}
                fill={strokeColor}
              />

              {/* 5. 도착점 */}
              <Circle cx={endPoint.x} cy={endPoint.y} r={7} fill="#F7C978" />
            </Svg>

            {/* 팬더 */}
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

            {/* 파티클 */}
            <DrawingParticleEffect
              ref={particleRef}
              width={width}
              height={height}
            />

            {/* 성공 이펙트 (경로 완성 시) */}
            {endPoint && (
              <SuccessEffect
                x={endPoint.x}
                y={endPoint.y}
                visible={isCompleted}
                size={Math.min(120, Math.round(width * 0.35))}
              />
            )}

            {/* 튜토리얼 */}
            <TracingTutorial
              visible={tutorialVisible}
              points={guidePoints}
              onComplete={handleTutorialComplete}
            />
          </>
        )}
      </CanvasArea>

      {/* 다시 그리기 */}
      <ResetButton onPress={handleReset}>
        <ResetButtonText>다시 그리기 ↻</ResetButtonText>
      </ResetButton>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: stretch;
  gap: 12px;
  padding-horizontal: 16px;
  padding-top: 14px;
  padding-bottom: 12px;
`;

const ProgressContainer = styled.View`
  width: 100%;
  gap: 8px;
`;

const ProgressLabel = styled(AppText)`
  font-size: 17px;
  font-weight: 700;
  color: #655b75;
  text-align: center;
`;

const ProgressTrack = styled.View`
  height: 12px;
  border-radius: 20px;
  background-color: #ede6f5;
  overflow: hidden;
`;

const ProgressFill = styled.View.attrs<{ progressPercent: number }>(
  ({ progressPercent }) => ({
    style: {
      width: `${progressPercent}%`,
    },
  }),
)`
  height: 100%;
  border-radius: 20px;
  background-color: #a78bfa;
`;

const ProgressText = styled(AppText)`
  font-size: 13px;
  font-weight: 600;
  color: #8b7ba6;
  text-align: right;
`;

const CanvasArea = styled.View`
  flex: 1;
  position: relative;
  overflow: hidden;
  background-color: #ffffff;
  border-radius: 24px;
`;

const ResetButton = styled(Pressable)`
  align-self: center;
  padding-horizontal: 24px;
  padding-vertical: 12px;
  background-color: #f0eaf7;
  border-radius: 20px;
`;

const ResetButtonText = styled(AppText)`
  font-size: 14px;
  font-weight: 700;
  color: #8067a5;
`;
