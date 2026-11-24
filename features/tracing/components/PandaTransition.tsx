import React, { useEffect, useMemo, useRef, useState } from "react";
import { Image, View } from "react-native";
import type { ImageSourcePropType } from "react-native";
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

import { getMascotPosition } from "../utils/mascotPlacement";
import { DrawingPoint } from "../types/drawing.types";

/**
 * 완성 시 출발 팬더가 사라지고 목적지 팬더가 나타나는 전환 연출.
 *
 * - 진행률/터치 좌표 계산에는 관여하지 않는다 (시각 전용).
 * - isTraceCompleted의 false → true 전환에서 한 번만 실행한다.
 * - true → false (다시 하기)가 되면 처음 상태로 되돌린다.
 */

interface PandaTransitionProps {
  source: ImageSourcePropType;
  /** 윙크 전용 이미지. 없으면 윙크 단계를 건너뛴다. */
  winkSource?: ImageSourcePropType | null;
  startPoint: DrawingPoint;
  endPoint: DrawingPoint;
  /** 팬더가 경로를 가리지 않는 자리를 찾는 데 사용 */
  guidePoints: DrawingPoint[];
  isTraceCompleted: boolean;
  width: number;
  height: number;
  pandaWidth?: number;
  pandaHeight?: number;
  onTransitionComplete?: () => void;
}

const EXIT_DURATION = 350;
const ENTER_DELAY = 250;
const ENTER_DURATION = 400;
const WINK_DELAY = 800; // 등장 후 윙크까지 대기
const WINK_DURATION = 600;

export default function PandaTransition({
  source,
  winkSource = null,
  startPoint,
  endPoint,
  guidePoints,
  isTraceCompleted,
  width,
  height,
  pandaWidth = 112,
  pandaHeight = 140,
  onTransitionComplete,
}: PandaTransitionProps) {
  const startOpacity = useSharedValue(1);
  const startScale = useSharedValue(1);
  const endOpacity = useSharedValue(0);
  const endScale = useSharedValue(0.85);
  const flagOpacity = useSharedValue(1);

  const [isWinking, setIsWinking] = useState(false);

  const hasPlayedRef = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const onCompleteRef = useRef(onTransitionComplete);

  onCompleteRef.current = onTransitionComplete;

  useEffect(() => {
    const clearTimers = () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };

    // 완성 전/초기화: 처음 상태로 복귀
    if (!isTraceCompleted) {
      clearTimers();

      cancelAnimation(startOpacity);
      cancelAnimation(startScale);
      cancelAnimation(endOpacity);
      cancelAnimation(endScale);
      cancelAnimation(flagOpacity);

      startOpacity.value = 1;
      startScale.value = 1;
      endOpacity.value = 0;
      endScale.value = 0.85;
      flagOpacity.value = 1;

      hasPlayedRef.current = false;
      setIsWinking(false);

      return;
    }

    // 중복 실행 방지
    if (hasPlayedRef.current) return;

    hasPlayedRef.current = true;

    // 출발 팬더: 부드럽게 퇴장
    startOpacity.value = withTiming(0, {
      duration: EXIT_DURATION,
      easing: Easing.out(Easing.quad),
    });
    startScale.value = withTiming(0.92, { duration: EXIT_DURATION });

    // 목적지 표시(깃발): 팬더가 오기 전에 사라짐
    flagOpacity.value = withTiming(0, { duration: EXIT_DURATION });

    // 목적지 팬더: opacity + scale로 등장 후 부드럽게 정착
    endOpacity.value = withDelay(
      ENTER_DELAY,
      withTiming(1, { duration: ENTER_DURATION }),
    );
    endScale.value = withDelay(
      ENTER_DELAY,
      withSpring(1, { damping: 12, stiffness: 140, mass: 0.8 }),
    );

    // 윙크 (전용 이미지가 있을 때만)
    if (winkSource) {
      timersRef.current.push(
        setTimeout(
          () => {
            setIsWinking(true);
          },
          ENTER_DELAY + ENTER_DURATION + WINK_DELAY,
        ),
      );

      timersRef.current.push(
        setTimeout(
          () => {
            setIsWinking(false);
            onCompleteRef.current?.();
          },
          ENTER_DELAY + ENTER_DURATION + WINK_DELAY + WINK_DURATION,
        ),
      );
    } else {
      timersRef.current.push(
        setTimeout(
          () => {
            onCompleteRef.current?.();
          },
          ENTER_DELAY + ENTER_DURATION + 300,
        ),
      );
    }
    // 타이머 정리는 초기화 분기와 언마운트 효과가 담당한다.
    // (StrictMode의 개발용 이중 실행에서 타이머가 지워지는 것을 방지)
  }, [
    isTraceCompleted,
    winkSource,
    startOpacity,
    startScale,
    endOpacity,
    endScale,
    flagOpacity,
  ]);

  // 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []);

  const startStyle = useAnimatedStyle(() => ({
    opacity: startOpacity.value,
    transform: [{ scale: startScale.value }],
  }));

  const endStyle = useAnimatedStyle(() => ({
    opacity: endOpacity.value,
    transform: [{ scale: endScale.value }],
  }));

  const flagStyle = useAnimatedStyle(() => ({
    opacity: flagOpacity.value,
  }));

  // 선 유형이 바뀌면 출발/도착 팬더 위치를 다시 계산
  const { startPosition, endPosition } = useMemo(() => {
    const common = {
      guidePoints,
      boardWidth: width,
      boardHeight: height,
      mascotWidth: pandaWidth,
      mascotHeight: pandaHeight,
    };

    return {
      startPosition: getMascotPosition({ ...common, anchor: startPoint }),
      endPosition: getMascotPosition({ ...common, anchor: endPoint }),
    };
  }, [
    guidePoints,
    startPoint,
    endPoint,
    width,
    height,
    pandaWidth,
    pandaHeight,
  ]);

  return (
    <OverlayContainer
      pointerEvents="none"
      boardWidth={width}
      boardHeight={height}
    >
      {/* 목적지 표시 (완성 전) */}
      <FlagWrapper
        anchorLeft={endPoint.x - 5}
        anchorTop={endPoint.y - 24}
        style={flagStyle}
      >
        <Ionicons name="flag" size={22} color="#F2A65A" />
      </FlagWrapper>

      {/* 출발 팬더 */}
      <PandaWrapper
        pandaWidth={pandaWidth}
        pandaHeight={pandaHeight}
        posLeft={startPosition.left}
        posTop={startPosition.top}
        style={startStyle}
      >
        <PandaImage source={source} resizeMode="contain" />
      </PandaWrapper>

      {/* 목적지 팬더 */}
      <PandaWrapper
        pandaWidth={pandaWidth}
        pandaHeight={pandaHeight}
        posLeft={endPosition.left}
        posTop={endPosition.top}
        style={endStyle}
      >
        <PandaImage
          source={isWinking && winkSource ? winkSource : source}
          resizeMode="contain"
        />
      </PandaWrapper>
    </OverlayContainer>
  );
}

interface OverlayContainerProps {
  boardWidth: number;
  boardHeight: number;
}

const OverlayContainer = styled(View).attrs<OverlayContainerProps>(
  ({ boardWidth, boardHeight }) => ({
    style: {
      width: boardWidth,
      height: boardHeight,
    },
  }),
)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
`;

interface FlagWrapperProps {
  anchorLeft: number;
  anchorTop: number;
}

const FlagWrapper = styled(Animated.View).attrs<FlagWrapperProps>(
  ({ anchorLeft, anchorTop }) => ({
    style: {
      left: anchorLeft,
      top: anchorTop,
    },
  }),
)`
  position: absolute;
  z-index: 9;
`;

interface PandaWrapperProps {
  pandaWidth: number;
  pandaHeight: number;
  posLeft: number;
  posTop: number;
}

const PandaWrapper = styled(Animated.View).attrs<PandaWrapperProps>(
  ({ pandaWidth, pandaHeight, posLeft, posTop }) => ({
    style: {
      width: pandaWidth,
      height: pandaHeight,
      left: posLeft,
      top: posTop,
    },
  }),
)`
  position: absolute;
  z-index: 10;
`;

const PandaImage = styled(Image)`
  width: 100%;
  height: 100%;
`;
