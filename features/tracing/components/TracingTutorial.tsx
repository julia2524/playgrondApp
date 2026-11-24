import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import styled from "styled-components/native";
import HandPointer from "../../../design-system/ui/HandPointer";

interface TracingPoint {
  x: number;
  y: number;
}

interface TracingTutorialProps {
  visible: boolean;
  points: TracingPoint[];
  onComplete: () => void;
}

const POINTER_SIZE = 70;

// SVG 검지 끝의 실제 위치를 고려한 보정값
const POINTER_TIP_X = 27;
const POINTER_TIP_Y = 5;

export default function TracingTutorial({
  visible,
  points,
  onComplete,
}: TracingTutorialProps) {
  // 손가락 위치
  const moveX = useRef(new Animated.Value(0)).current;
  const moveY = useRef(new Animated.Value(0)).current;

  // 손가락 등장/퇴장
  const opacity = useRef(new Animated.Value(0)).current;

  // 손가락 누르기 효과
  const fingerScale = useRef(new Animated.Value(1)).current;

  // 애니메이션 세션 관리
  const sessionRef = useRef(0);

  // 콜백 최신 상태 유지
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    sessionRef.current += 1;
    const currentSession = sessionRef.current;

    // 이전 애니메이션 초기화
    moveX.stopAnimation();
    moveY.stopAnimation();
    opacity.stopAnimation();
    fingerScale.stopAnimation();

    opacity.setValue(0);
    fingerScale.setValue(1);

    if (!visible || points.length < 2) {
      return;
    }

    const firstPoint = points[0];

    // moveX.setValue(firstPoint.x - POINTER_SIZE / 2);
    // moveY.setValue(firstPoint.y - POINTER_SIZE / 2);

    moveX.setValue(firstPoint.x - POINTER_TIP_X);
    moveY.setValue(firstPoint.y - POINTER_TIP_Y);

    // 너무 촘촘한 좌표는 이동 구간을 합쳐 애니메이션 부담 감소
    const animationPoints: TracingPoint[] = [firstPoint];

    let accumulatedDistance = 0;
    let previousPoint = firstPoint;

    for (let i = 1; i < points.length; i++) {
      const point = points[i];

      const dx = point.x - previousPoint.x;
      const dy = point.y - previousPoint.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      accumulatedDistance += distance;

      // 약 12px 이상 이동했을 때 다음 애니메이션 지점 추가
      if (accumulatedDistance >= 12 || i === points.length - 1) {
        animationPoints.push(point);
        accumulatedDistance = 0;
      }

      previousPoint = point;
    }

    // 마지막 점은 반드시 포함
    const lastPoint = points[points.length - 1];
    const lastAnimationPoint = animationPoints[animationPoints.length - 1];

    if (
      lastAnimationPoint.x !== lastPoint.x ||
      lastAnimationPoint.y !== lastPoint.y
    ) {
      animationPoints.push(lastPoint);
    }

    // 선의 모든 구간을 따라 이동
    const moveAnimations: Animated.CompositeAnimation[] = [];

    for (let i = 1; i < animationPoints.length; i++) {
      const previous = animationPoints[i - 1];
      const current = animationPoints[i];

      const dx = current.x - previous.x;
      const dy = current.y - previous.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // 이동 거리에 따라 속도를 일정하게 유지
      const duration = Math.max(25, Math.min(100, distance * 3));

      moveAnimations.push(
        Animated.parallel([
          Animated.timing(moveX, {
            toValue: current.x - POINTER_TIP_X,
            duration,
            easing: Easing.linear,
            useNativeDriver: true,
          }),

          Animated.timing(moveY, {
            toValue: current.y - POINTER_TIP_Y,
            duration,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          // Animated.timing(moveX, {
          //   toValue: current.x - POINTER_SIZE / 2,
          //   duration,
          //   easing: Easing.linear,
          //   useNativeDriver: true,
          // }),
          // Animated.timing(moveY, {
          //   toValue: current.y - POINTER_SIZE / 2,
          //   duration,
          //   easing: Easing.linear,
          //   useNativeDriver: true,
          // }),
        ]),
      );
    }

    // 튜토리얼 전체 순서
    const animation = Animated.sequence([
      // 1. 손가락 등장
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),

      // 2. 출발점에서 잠깐 대기
      Animated.delay(350),

      // 3. 손가락을 살짝 눌렀다가 이동
      Animated.timing(fingerScale, {
        toValue: 0.85,
        duration: 150,
        useNativeDriver: true,
      }),

      Animated.delay(100),

      Animated.timing(fingerScale, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),

      // 4. 실제 안내선을 따라 이동
      Animated.sequence(moveAnimations),

      // 5. 도착 후 사라짐
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fingerScale, {
          toValue: 0.8,
          duration: 250,
          useNativeDriver: true,
        }),
      ]),
    ]);

    animation.start(({ finished }) => {
      if (!finished) return;

      // 이전 라운드 애니메이션이면 무시
      if (sessionRef.current !== currentSession) return;

      onCompleteRef.current();
    });

    return () => {
      // 현재 세션 무효화
      sessionRef.current += 1;

      animation.stop();

      moveX.stopAnimation();
      moveY.stopAnimation();
      opacity.stopAnimation();
      fingerScale.stopAnimation();
    };
  }, [visible, points, moveX, moveY, opacity, fingerScale]);

  if (!visible || points.length < 2) {
    return null;
  }

  return (
    <TutorialOverlay pointerEvents="none">
      <PointerContainer
        style={{
          opacity,
          transform: [
            { translateX: moveX },
            { translateY: moveY },
            { scale: fingerScale },
          ],
        }}
      >
        <HandPointer size={60} tapping={false} />
      </PointerContainer>
    </TutorialOverlay>
  );
}

const TutorialOverlay = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const PointerContainer = styled(Animated.View)`
  position: absolute;
  left: 0;
  top: 0;
  width: ${POINTER_SIZE}px;
  height: ${POINTER_SIZE}px;
  align-items: center;
  justify-content: center;
`;

const PointerEmoji = styled.Text`
  font-size: 56px;
  include-font-padding: false;
`;
