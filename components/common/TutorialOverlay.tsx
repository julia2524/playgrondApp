import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, View } from "react-native";
import styled from "styled-components/native";

import { COLORS } from "../../constants/colors";
import { RenderItemSvg } from "../../constants/ColorItemSvgs";
import HandPointer from "./HandPointer";

interface TutorialOverlayProps {
  visible: boolean;
  onComplete: () => void;

  // ⭐ 항상 정답 스티커
  fromRef: React.RefObject<View | null>;

  // ⭐ 항상 정답 빈칸
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
  // --------------------------------------------------
  // Animation Values
  // --------------------------------------------------

  const opacity = useRef(new Animated.Value(0)).current;

  const moveX = useRef(new Animated.Value(0)).current;
  const moveY = useRef(new Animated.Value(0)).current;

  const fingerScale = useRef(new Animated.Value(1)).current;

  // --------------------------------------------------
  // 실제 시작 위치
  // --------------------------------------------------

  const [startPoint, setStartPoint] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const deltaRef = useRef({
    x: 0,
    y: 0,
  });

  // ==================================================
  // ⭐ visible → 실제 정답 스티커 / 빈칸 위치 측정
  // ==================================================

  useEffect(() => {
    if (!visible) {
      setStartPoint(null);

      opacity.stopAnimation();
      moveX.stopAnimation();
      moveY.stopAnimation();
      fingerScale.stopAnimation();

      return;
    }

    // --------------------------------------------------
    // 애니메이션 초기화
    // --------------------------------------------------

    opacity.setValue(0);

    moveX.setValue(0);
    moveY.setValue(0);

    fingerScale.setValue(1);

    // --------------------------------------------------
    // 실제 화면 위치 측정
    // --------------------------------------------------

    const timer = setTimeout(() => {
      if (!fromRef.current || !toRef.current) {
        return;
      }

      fromRef.current.measureInWindow((fx, fy, fw, fh) => {
        toRef.current?.measureInWindow((tx, ty, tw, th) => {
          const fromCenter = {
            x: fx + fw / 2,
            y: fy + fh / 2,
          };

          const toCenter = {
            x: tx + tw / 2,
            y: ty + th / 2,
          };

          deltaRef.current = {
            x: toCenter.x - fromCenter.x,
            y: toCenter.y - fromCenter.y,
          };

          setStartPoint(fromCenter);
        });
      });
    }, 150);

    return () => {
      clearTimeout(timer);
    };
  }, [visible, fromRef, toRef]);

  // ==================================================
  // ⭐ Animation
  // ==================================================

  useEffect(() => {
    if (!visible || !startPoint) {
      return;
    }

    const { x: deltaX, y: deltaY } = deltaRef.current;

    const animation = Animated.sequence([
      // --------------------------------
      // 1️⃣ 등장
      // --------------------------------

      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),

      Animated.delay(400),

      // --------------------------------
      // 2️⃣ 손가락 꾹
      // --------------------------------

      Animated.timing(fingerScale, {
        toValue: 0.85,
        duration: 150,
        useNativeDriver: true,
      }),

      Animated.delay(100),

      // --------------------------------
      // 3️⃣ SVG + 손가락 이동
      // --------------------------------

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

      // --------------------------------
      // 4️⃣ 정답칸 도착 → 즉시 사라짐
      // --------------------------------

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

    animation.start(({ finished }) => {
      if (finished) {
        onComplete();
      }
    });

    return () => {
      animation.stop();
    };
  }, [visible, startPoint, onComplete, opacity, moveX, moveY, fingerScale]);

  // --------------------------------------------------
  // 렌더링 조건
  // --------------------------------------------------

  if (!visible || !startPoint) {
    return null;
  }

  const svgColor = colorKey ? COLORS[colorKey] : "#EF4444";

  // ==================================================
  // Render
  // ==================================================

  return (
    <TutorialLayer pointerEvents="none">
      {/* ==========================================
          ⭐ 움직이는 SVG만!
          ObjectSticker 사용 ❌
      ========================================== */}

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

      {/* ==========================================
          👆 손가락
      ========================================== */}
      {/* <Animated.View
        style={{
          position: "absolute",
          // 🌟 SVG 크기와 중심을 고려하여 위치 미세 조정 (기존 이모지와 다를 수 있음)
          left: startPoint.x - 30, // (size 60의 절반)
          top: startPoint.y - 15, // (손가락 끝 위치에 맞게 조정)

          transform: [
            { translateX: moveX },
            { translateY: moveY },
            { scale: fingerScale }, // 꾹 누르는 애니메이션용
          ],

          opacity, // 등장/퇴장용
        }}
      >
       
        <HandPointer size={60} color="#ff0000" />
      </Animated.View> */}
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
        <Finger>👆</Finger>
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
