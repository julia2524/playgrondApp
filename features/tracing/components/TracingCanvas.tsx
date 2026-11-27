import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { StyleSheet, View } from "react-native";
import type { LayoutChangeEvent, StyleProp, ViewStyle } from "react-native";
import styled from "styled-components/native";

import Svg, { Circle, Path } from "react-native-svg";

import { useTracingProgress } from "../engine/useTracingProgress";
import type { TracingBoardSize, TracingGuide } from "../types/tracing.types";

import PandaTransition from "./PandaTransition";
import DrawingParticleEffect from "./DrawingParticleEffect";
import TracingTutorial from "./TracingTutorial";
import SuccessEffect from "./SuccessEffect";
import DrawingStroke from "./DrawingStroke";

import type { DrawingParticleEffectHandle } from "./DrawingParticleEffect";

import { PANDA_SOURCE, PANDA_WINK_SOURCE } from "../constants/pandaAssets";
import { useLanguage } from "../../../context/LanguageContext";
import i18n from "../../../i18n";

/** 그림 영역 크기가 정해지기 전에 쓰는 빈 가이드 */
const EMPTY_GUIDE: TracingGuide = {
  id: "empty",
  points: [],
};

interface TracingCanvasProps {
  createGuide: (size: TracingBoardSize) => TracingGuide;
  style?: StyleProp<ViewStyle>;

  // 사물 그리기용 컬러 일러스트
  artwork?: React.ReactNode;

  guideColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  onComplete?: () => void;
  onFailedAttempt?: () => void;
  resetKey: number;
  showPanda?: boolean;
  inputLocked?: boolean;
  onProgressLabelChange?: (label: string) => void;
  tutorialEnabled?: boolean;
  onDrawingStart?: () => void;
}

export const TracingCanvas: React.FC<TracingCanvasProps> = ({
  createGuide,
  style,
  artwork,
  guideColor = "#A0DED2",
  strokeColor = "#278F7B",
  strokeWidth = 10,
  onComplete,
  onFailedAttempt,
  resetKey,
  showPanda = false,
  inputLocked = false,
  tutorialEnabled = true,
  onProgressLabelChange,
  onDrawingStart,
}) => {
  const particleRef = useRef<DrawingParticleEffectHandle>(null);
  const tutorialTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [canvasSize, setCanvasSize] = useState<TracingBoardSize | null>(null);
  const [tutorialVisible, setTutorialVisible] = useState(false);

  const tutorialEnabledRef = useRef(tutorialEnabled);

  tutorialEnabledRef.current = tutorialEnabled;

  const guide = useMemo<TracingGuide>(
    () => (canvasSize ? createGuide(canvasSize) : EMPTY_GUIDE),
    [canvasSize, createGuide],
  );

  const width = canvasSize?.width ?? 0;
  const height = canvasSize?.height ?? 0;

  /**
   * 기존 단일 경로와 신규 다중 경로를 공통 배열로 변환한다.
   *
   * line:
   *   guide.points -> [points]
   *
   * shape:
   *   guide.paths -> [path1, path2, path3 ...]
   */
  const guidePaths = useMemo(
    () =>
      guide.paths && guide.paths.length > 0
        ? guide.paths
        : guide.points.length > 0
          ? [guide.points]
          : [],
    [guide.paths, guide.points],
  );

  /** 튜토리얼은 첫 번째 경로를 기준으로 표시 */
  // const tutorialPoints = guidePaths[0] ?? [];

  /** 첫 번째 경로의 시작점과 마지막 경로의 끝점 */
  const firstPoint = guidePaths[0]?.[0];
  const lastPath = guidePaths[guidePaths.length - 1];
  const endPoint = lastPath?.[lastPath.length - 1];

  const pandaWidth = Math.min(112, Math.round(width * 0.3));
  const pandaHeight = Math.round(pandaWidth * 1.25);

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
    isCompleted,
    completedSegments,
    resetTracing,
  } = useTracingProgress(guide, {
    onComplete,
    onFailedAttempt,
    onTouchPoint: (point) => particleRef.current?.emit(point),
  });

  /**
   * 완료 구간을 경로별 배열로 정리한다.
   *
   * 지원 형태:
   * - boolean[][] : 경로별 완료 구간
   * - boolean[]   : 전체 경로의 완료 구간을 순서대로 평탄화한 형태
   *
   * 경로별로 분리하여 SVG Path 사이에 연결선이 생기지 않도록 한다.
   */
  const completedSegmentsByPath = useMemo<boolean[][]>(() => {
    const rawSegments: unknown = completedSegments;

    if (!Array.isArray(rawSegments)) {
      return guidePaths.map((path) =>
        Array(Math.max(0, path.length - 1)).fill(false),
      );
    }

    // 엔진이 경로별 배열을 반환하는 경우
    if (rawSegments.length > 0 && Array.isArray(rawSegments[0])) {
      return guidePaths.map((path, pathIndex) => {
        const segmentCount = Math.max(0, path.length - 1);
        const pathSegments = rawSegments[pathIndex];

        if (!Array.isArray(pathSegments)) {
          return Array(segmentCount).fill(false);
        }

        return Array.from({ length: segmentCount }, (_, index) =>
          Boolean(pathSegments[index]),
        );
      });
    }

    // 엔진이 하나의 배열로 반환하는 경우
    const flatSegments = rawSegments as boolean[];
    let cursor = 0;

    return guidePaths.map((path) => {
      const segmentCount = Math.max(0, path.length - 1);

      const pathSegments = Array.from({ length: segmentCount }, (_, index) =>
        Boolean(flatSegments[cursor + index]),
      );

      cursor += segmentCount;

      return pathSegments;
    });
  }, [completedSegments, guidePaths]);

  /**
   * 아직 완성되지 않은 첫 번째 경로를 찾는다.
   *
   * 현재 차례의 경로를 튜토리얼이 안내한다.
   */
  const activePathIndex = completedSegmentsByPath.findIndex(
    (segments) => segments.length > 0 && !segments.every(Boolean),
  );

  /** 현재 차례의 튜토리얼 경로 */
  const tutorialPoints =
    activePathIndex >= 0 ? (guidePaths[activePathIndex] ?? []) : [];

  /**
   * 경로 하나의 완료된 구간만 SVG Path로 만든다.
   *
   * 완료되지 않은 구간을 만나면 새 구간을 시작한다.
   * 따라서 떨어져 있는 완료 구간끼리도 연결되지 않는다.
   */
  const createCompletedPath = useCallback(
    (points: TracingGuide["points"], segments: boolean[]) => {
      let d = "";
      let isOpen = false;

      segments.forEach((completed, index) => {
        const start = points[index];
        const end = points[index + 1];

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
    },
    [],
  );

  /**
   * 각 가이드 경로의 SVG 정보를 독립적으로 생성한다.
   */
  const renderedPaths = useMemo(
    () =>
      guidePaths.map((points, pathIndex) => {
        const guidePath = points
          .map(
            (point, index) =>
              `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`,
          )
          .join(" ");

        const completedPath = createCompletedPath(
          points,
          completedSegmentsByPath[pathIndex] ?? [],
        );

        return {
          id: `${guide.id}-${pathIndex}`,
          points,
          guidePath,
          completedPath,
          startPoint: points[0],
          endPoint: points[points.length - 1],
        };
      }),
    [guide.id, guidePaths, completedSegmentsByPath, createCompletedPath],
  );

  /** 내부 초기화 기능 */
  const handleReset = useCallback(() => {
    particleRef.current?.clear();
    resetTracing();
  }, [resetTracing]);

  useEffect(() => {
    if (resetKey > 0) {
      handleReset();
    }
  }, [resetKey, handleReset]);

  /** 튜토리얼 타이머 정리 */
  const clearTutorialTimer = useCallback(() => {
    if (tutorialTimerRef.current) {
      clearTimeout(tutorialTimerRef.current);
      tutorialTimerRef.current = null;
    }
  }, []);

  /** 튜토리얼 활성화 시 표시 */
  useEffect(() => {
    clearTutorialTimer();

    if (tutorialEnabled && tutorialPoints.length >= 2) {
      setTutorialVisible(true);
    } else {
      setTutorialVisible(false);
    }

    return clearTutorialTimer;
  }, [tutorialEnabled, tutorialPoints, clearTutorialTimer]);

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
    onDrawingStart?.();
  }, [clearTutorialTimer, onDrawingStart]);

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

  /** 언어 변경 시 라벨 갱신 */
  const { locale } = useLanguage();

  const progressLabel = isCompleted
    ? i18n.t("drawing_progress_complete")
    : tutorialVisible
      ? i18n.t("drawing_progress_tutorial")
      : i18n.t("drawing_progress_follow_path");

  useEffect(() => {
    onProgressLabelChange?.(progressLabel);
  }, [progressLabel, onProgressLabelChange, locale]);

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
        {canvasSize && renderedPaths.length > 0 && (
          <>
            {/* 기존 컬러 사물 일러스트: 가장 아래 레이어 */}
            {artwork && (
              <View pointerEvents="none" style={StyleSheet.absoluteFill}>
                {artwork}
              </View>
            )}

            {/* 점선 가이드와 실제 그리기 선 */}
            <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
              {/*
                안내 경로 + 완료 구간 + 시작점 + 도착점

                각각 별도의 SVG Path로 렌더링한다.
                서로 다른 경로를 하나의 Path로 합치지 않는다.
              */}
              {renderedPaths.map((path) => (
                <React.Fragment key={path.id}>
                  {/* 안내 경로 */}
                  <Path
                    d={path.guidePath}
                    fill="none"
                    stroke={guideColor}
                    strokeWidth={4}
                    strokeDasharray="0.1 9"
                    strokeLinecap="round"
                  />

                  {/* 완성된 구간 */}
                  {path.completedPath.length > 0 && (
                    <Path
                      d={path.completedPath}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}

                  {/* 각 경로의 시작점 */}
                  {path.startPoint && (
                    <Circle
                      cx={path.startPoint.x}
                      cy={path.startPoint.y}
                      r={7}
                      fill={strokeColor}
                    />
                  )}

                  {/* 각 경로의 도착점 */}
                  {path.endPoint && (
                    <Circle
                      cx={path.endPoint.x}
                      cy={path.endPoint.y}
                      r={7}
                      fill="#F7C978"
                    />
                  )}
                </React.Fragment>
              ))}

              {/* 현재 손가락을 따라가는 선 */}
              {currentStroke.length > 0 && (
                <DrawingStroke
                  points={currentStroke}
                  color={strokeColor}
                  strokeWidth={strokeWidth}
                  opacity={0.65}
                />
              )}
            </Svg>

            {/*
              판다 애니메이션은 기존 선 그리기에서만 사용한다.
              여러 경로를 이동하는 판다 동작은 별도 설계가 필요하다.
            */}
            {showPanda && guidePaths.length === 1 && firstPoint && endPoint && (
              <PandaTransition
                source={PANDA_SOURCE}
                winkSource={PANDA_WINK_SOURCE}
                startPoint={firstPoint}
                endPoint={endPoint}
                guidePoints={guidePaths[0]}
                isTraceCompleted={isCompleted}
                width={width}
                height={height}
                pandaWidth={pandaWidth}
                pandaHeight={pandaHeight}
              />
            )}

            {/* 그리기 파티클 효과 */}
            <DrawingParticleEffect
              ref={particleRef}
              width={width}
              height={height}
            />

            {/* 전체 경로 완성 시 성공 효과 */}
            {endPoint && (
              <SuccessEffect
                x={endPoint.x}
                y={endPoint.y}
                visible={isCompleted}
                size={Math.min(120, Math.round(width * 0.35))}
              />
            )}

            {/* 튜토리얼은 첫 번째 경로를 안내 */}
            {tutorialPoints.length >= 2 && (
              <TracingTutorial
                visible={tutorialEnabled && tutorialVisible}
                points={tutorialPoints}
                onComplete={handleTutorialComplete}
              />
            )}
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
