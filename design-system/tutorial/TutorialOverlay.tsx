import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, View } from "react-native";
import styled from "styled-components/native";

import { COLORS } from "../tokens/colors";
import { RenderItemSvg } from "../../features/classification-color/assets/ColorItemSvgs";
import HandPointer from "../ui/HandPointer";

interface TutorialOverlayProps {
  visible: boolean;
  onComplete: () => void;

  // ⭐ 항상 현재 라운드의 정답 스티커
  fromRef: React.RefObject<View | null>;

  // ⭐ 항상 현재 라운드의 정답 빈칸
  toRef: React.RefObject<View | null>;

  shapeId?: string;
  colorKey?: string;
}

export default function TutorialOverlay({
  visible,
  onComplete,
  fromRef,
  toRef,
  shapeId,
  colorKey,
}: TutorialOverlayProps) {
  // ==================================================
  // ⭐ Animation Values
  // ==================================================

  const opacity = useRef(new Animated.Value(0)).current;

  const moveX = useRef(new Animated.Value(0)).current;
  const moveY = useRef(new Animated.Value(0)).current;

  const fingerScale = useRef(new Animated.Value(1)).current;

  // ==================================================
  // ⭐ 현재 튜토리얼 시작 위치
  // ==================================================

  const [startPoint, setStartPoint] = useState<{
    x: number;
    y: number;
  } | null>(null);

  // ==================================================
  // ⭐ 이동 거리
  // ==================================================

  const deltaRef = useRef({
    x: 0,
    y: 0,
  });

  // ==================================================
  // ⭐ 이전 타이머 관리
  // ==================================================

  const measureTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ==================================================
  // ⭐ 튜토리얼 세션 ID
  //
  // 이전 라운드의 measure 결과가
  // 다음 라운드에 적용되는 것을 완전히 차단
  // ==================================================

  const sessionIdRef = useRef(0);

  // ==================================================
  // ⭐ 애니메이션 완전 초기화 함수
  // ==================================================

  const resetAnimation = () => {
    opacity.stopAnimation();
    moveX.stopAnimation();
    moveY.stopAnimation();
    fingerScale.stopAnimation();

    opacity.setValue(0);

    moveX.setValue(0);
    moveY.setValue(0);

    fingerScale.setValue(1);

    deltaRef.current = {
      x: 0,
      y: 0,
    };
  };

  // ==================================================
  // ⭐ visible 변경
  // ==================================================

  useEffect(() => {
    // ⭐ 새로운 visible 변화마다 세션 증가
    sessionIdRef.current += 1;

    const currentSessionId = sessionIdRef.current;

    // ------------------------------------------------
    // ❌ visible false
    // ------------------------------------------------

    if (!visible) {
      // ⭐ 이전 측정 타이머 제거

      if (measureTimerRef.current) {
        clearTimeout(measureTimerRef.current);

        measureTimerRef.current = null;
      }

      // ⭐ 이전 애니메이션 완전 제거

      resetAnimation();

      // ⭐ 화면에서 시작 위치 제거
      setStartPoint(null);

      return;
    }

    // ------------------------------------------------
    // ⭐ visible true
    // ------------------------------------------------

    // ⭐ 혹시 이전 타이머가 남아있다면 제거

    if (measureTimerRef.current) {
      clearTimeout(measureTimerRef.current);

      measureTimerRef.current = null;
    }

    // ⭐ 이전 애니메이션 값 완전 초기화

    resetAnimation();

    // ⭐ 중요!!!
    //
    // 이전 라운드의 startPoint가 잠깐이라도
    // 화면에 남는 것을 막기 위해
    // 먼저 null 처리
    //

    setStartPoint(null);

    // ==================================================
    // ⭐ 현재 라운드 UI가 완전히 렌더링될 시간 확보
    // ==================================================

    measureTimerRef.current = setTimeout(() => {
      // ------------------------------------------------
      // ⭐ 이미 새로운 세션이 시작되었다면 무시
      // ------------------------------------------------

      if (sessionIdRef.current !== currentSessionId) {
        return;
      }

      // ------------------------------------------------
      // ⭐ Ref 확인
      // ------------------------------------------------

      if (!fromRef.current || !toRef.current) {
        return;
      }

      // ==================================================
      // ⭐ 현재 정답 스티커 위치 측정
      // ==================================================

      fromRef.current.measureInWindow((fx, fy, fw, fh) => {
        // ⭐ 이전 세션이면 완전히 무시

        if (sessionIdRef.current !== currentSessionId) {
          return;
        }

        // ⭐ 화면에 없는 경우 방지

        if (fw <= 0 || fh <= 0) {
          return;
        }

        // ==================================================
        // ⭐ 현재 정답 빈칸 위치 측정
        // ==================================================

        toRef.current?.measureInWindow((tx, ty, tw, th) => {
          // ⭐ 이전 세션이면 완전히 무시

          if (sessionIdRef.current !== currentSessionId) {
            return;
          }

          // ⭐ 화면에 없는 경우 방지

          if (tw <= 0 || th <= 0) {
            return;
          }

          // ==================================================
          // ⭐ 중심 좌표 계산
          // ==================================================

          const fromCenter = {
            x: fx + fw / 2,
            y: fy + fh / 2,
          };

          const toCenter = {
            x: tx + tw / 2,
            y: ty + th / 2,
          };

          // ==================================================
          // ⭐ 이동 거리 저장
          // ==================================================

          deltaRef.current = {
            x: toCenter.x - fromCenter.x,
            y: toCenter.y - fromCenter.y,
          };

          // ==================================================
          // ⭐ 현재 세션일 때만 시작 위치 설정
          // ==================================================

          if (sessionIdRef.current === currentSessionId) {
            setStartPoint(fromCenter);
          }
        });
      });
    }, 250);

    // ==================================================
    // Cleanup
    // ==================================================

    return () => {
      // ⭐ 이 effect가 끝나면
      // 이전 세션은 자동으로 무효화됨

      if (measureTimerRef.current) {
        clearTimeout(measureTimerRef.current);

        measureTimerRef.current = null;
      }
    };
  }, [visible, fromRef, toRef]);

  // ==================================================
  // ⭐ Animation
  // ==================================================

  useEffect(() => {
    // ------------------------------------------------
    // visible 또는 startPoint 없으면 실행 안 함
    // ------------------------------------------------

    if (!visible || !startPoint) {
      return;
    }

    // ⭐ 현재 애니메이션 세션 기억

    const animationSessionId = sessionIdRef.current;

    // ------------------------------------------------
    // 이동 거리
    // ------------------------------------------------

    const { x: deltaX, y: deltaY } = deltaRef.current;

    // ==================================================
    // ⭐ Animation Sequence
    // ==================================================

    const animation = Animated.sequence([
      // ----------------------------------------------
      // 1️⃣ 등장
      // ----------------------------------------------

      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),

      Animated.delay(400),

      // ----------------------------------------------
      // 2️⃣ 손가락 꾹
      // ----------------------------------------------

      Animated.timing(fingerScale, {
        toValue: 0.85,
        duration: 150,
        useNativeDriver: true,
      }),

      Animated.delay(100),

      // ----------------------------------------------
      // 3️⃣ SVG + 손가락 이동
      // ----------------------------------------------

      Animated.parallel([
        Animated.timing(moveX, {
          toValue: deltaX,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.timing(moveY, {
          toValue: deltaY,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),

      // ----------------------------------------------
      // 4️⃣ 도착 후 사라짐
      // ----------------------------------------------

      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),

        Animated.timing(fingerScale, {
          toValue: 0.8,
          duration: 150,
          useNativeDriver: true,
        }),
      ]),
    ]);

    // ==================================================
    // ⭐ Animation Start
    // ==================================================

    animation.start(({ finished }) => {
      // ⭐ 애니메이션이 중간에 취소됐으면 무시

      if (!finished) {
        return;
      }

      // ⭐ 이미 다음 라운드/다음 세션이면 무시

      if (sessionIdRef.current !== animationSessionId) {
        return;
      }

      onComplete();
    });

    // ==================================================
    // Cleanup
    // ==================================================

    return () => {
      animation.stop();
    };
  }, [visible, startPoint, onComplete, opacity, moveX, moveY, fingerScale]);

  // ==================================================
  // ⭐ Render 조건
  // ==================================================

  if (!visible || !startPoint) {
    return null;
  }

  // ==================================================
  // ⭐ 색상
  // ==================================================

  const svgColor = colorKey ? COLORS[colorKey] : "#EF4444";

  // ==================================================
  // ⭐ Render
  // ==================================================

  return (
    <TutorialLayer pointerEvents="none">
      {/* ==============================================
          ⭐ 움직이는 SVG
      ============================================== */}

      <Animated.View
        style={{
          position: "absolute",

          left: startPoint.x - 50,
          top: startPoint.y - 50,

          width: 100,
          height: 100,

          alignItems: "center",
          justifyContent: "center",

          transform: [
            {
              translateX: moveX,
            },
            {
              translateY: moveY,
            },
          ],

          opacity,
        }}
      >
        {shapeId && <RenderItemSvg shapeId={shapeId} colorHex={svgColor} />}
      </Animated.View>

      {/* ==============================================
          👆 손가락
      ============================================== */}

      <Animated.View
        style={{
          position: "absolute",

          left: startPoint.x - 18,
          top: startPoint.y - 5,

          transform: [
            {
              translateX: moveX,
            },
            {
              translateY: moveY,
            },
            {
              scale: fingerScale,
            },
          ],

          opacity,
        }}
      >
        {/* <Finger>👆</Finger> */}
        <HandPointer size={55} />
      </Animated.View>
    </TutorialLayer>
  );
}

// ==================================================
// Styles
// ==================================================

const TutorialLayer = styled.View`
  position: absolute;

  left: 0;
  right: 0;

  top: 0;
  bottom: 0;

  z-index: 500;

  elevation: 500;
`;

const Finger = styled.Text`
  font-size: 55px;
`;
