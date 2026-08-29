import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, View } from "react-native";
import styled from "styled-components/native";

import { COLORS } from "../../constants/colors";
import { RenderItemSvg } from "../../constants/ColorItemSvgs";

type Point = {
  x: number;
  y: number;
};

interface TutorialOverlayProps {
  visible: boolean;

  // ⭐ 처음 Tutorial 시작할 때 사용하는 실제 Object
  fromRef: React.RefObject<View | null>;

  // ⭐ 실제 정답칸
  toRef: React.RefObject<View | null>;

  // ⭐ null이면 fromRef에서 시작
  // ⭐ 값이 있으면 실패한 release 위치에서 시작
  startPoint?: Point | null;

  shapeId?: string;
  colorKey?: string;

  // ⭐ 한 번의 Tutorial 애니메이션이 끝났을 때
  onComplete?: () => void;
}

export default function TutorialOverlay({
  visible,
  fromRef,
  toRef,
  startPoint,
  shapeId,
  colorKey,
  onComplete,
}: TutorialOverlayProps) {
  const opacity = useRef(new Animated.Value(0)).current;

  const moveX = useRef(new Animated.Value(0)).current;
  const moveY = useRef(new Animated.Value(0)).current;

  const fingerScale = useRef(new Animated.Value(1)).current;
  const stickerScale = useRef(new Animated.Value(1)).current;

  const [actualStartPoint, setActualStartPoint] = useState<Point | null>(null);

  const deltaRef = useRef({
    x: 0,
    y: 0,
  });

  // ==================================================
  // 1️⃣ Tutorial 시작 위치 결정
  // ==================================================

  useEffect(() => {
    if (!visible) {
      setActualStartPoint(null);
      return;
    }

    // --------------------------------
    // ⭐ 실패 후 Tutorial
    // release 위치에서 시작
    // --------------------------------

    if (startPoint) {
      setActualStartPoint(startPoint);
      return;
    }

    // --------------------------------
    // ⭐ 최초 Tutorial
    // 실제 Object 위치에서 시작
    // --------------------------------

    const timer = setTimeout(() => {
      if (!fromRef.current) return;

      fromRef.current.measureInWindow((x, y, width, height) => {
        setActualStartPoint({
          x: x + width / 2,
          y: y + height / 2,
        });
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [visible, startPoint, fromRef]);

  // ==================================================
  // 2️⃣ Target 위치 측정 + 이동 거리 계산
  // ==================================================

  useEffect(() => {
    if (!visible) return;
    if (!actualStartPoint) return;
    if (!toRef.current) return;

    const timer = setTimeout(() => {
      toRef.current?.measureInWindow((x, y, width, height) => {
        const targetCenter = {
          x: x + width / 2,
          y: y + height / 2,
        };

        deltaRef.current = {
          x: targetCenter.x - actualStartPoint.x,
          y: targetCenter.y - actualStartPoint.y,
        };
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [visible, actualStartPoint, toRef]);

  // ==================================================
  // 3️⃣ Tutorial 애니메이션
  // ==================================================

  useEffect(() => {
    if (!visible) return;
    if (!actualStartPoint) return;

    // Target 좌표가 아직 없으면 기다림
    if (!toRef.current) return;

    opacity.setValue(0);
    moveX.setValue(0);
    moveY.setValue(0);
    fingerScale.setValue(1);
    stickerScale.setValue(1);

    // ⭐ target 위치를 다시 실제로 측정한 뒤 시작
    const timer = setTimeout(() => {
      if (!toRef.current) return;

      toRef.current.measureInWindow((tx, ty, tw, th) => {
        const targetCenter = {
          x: tx + tw / 2,
          y: ty + th / 2,
        };

        const deltaX = targetCenter.x - actualStartPoint.x;
        const deltaY = targetCenter.y - actualStartPoint.y;

        deltaRef.current = {
          x: deltaX,
          y: deltaY,
        };

        Animated.sequence([
          // --------------------------------
          // 1️⃣ 시작 위치에서 등장
          // --------------------------------

          Animated.timing(opacity, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
          }),

          Animated.delay(400),

          // --------------------------------
          // 2️⃣ 손가락이 꾹 누르기
          // --------------------------------

          Animated.timing(fingerScale, {
            toValue: 0.85,
            duration: 180,
            useNativeDriver: true,
          }),

          Animated.delay(100),

          // --------------------------------
          // 3️⃣ 실제 시작 위치 → 실제 Target
          // --------------------------------

          Animated.parallel([
            Animated.timing(moveX, {
              toValue: deltaX,
              duration: 1000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),

            Animated.timing(moveY, {
              toValue: deltaY,
              duration: 1000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ]),

          // --------------------------------
          // 4️⃣ Target 도착
          // --------------------------------

          Animated.parallel([
            Animated.timing(fingerScale, {
              toValue: 1,
              duration: 150,
              useNativeDriver: true,
            }),

            Animated.sequence([
              Animated.timing(stickerScale, {
                toValue: 0.9,
                duration: 100,
                useNativeDriver: true,
              }),

              Animated.timing(stickerScale, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
              }),
            ]),
          ]),

          Animated.delay(450),

          // --------------------------------
          // 5️⃣ Tutorial만 사라짐
          // 실제 게임 Object는 건드리지 않음
          // --------------------------------

          Animated.timing(opacity, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
        ]).start(({ finished }) => {
          if (finished) {
            onComplete?.();
          }
        });
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      opacity.stopAnimation();
      moveX.stopAnimation();
      moveY.stopAnimation();
    };
  }, [
    visible,
    actualStartPoint,
    opacity,
    moveX,
    moveY,
    fingerScale,
    stickerScale,
    onComplete,
    toRef,
  ]);

  // ==================================================
  // 렌더링
  // ==================================================

  if (!visible || !actualStartPoint) {
    return null;
  }

  const svgColor = colorKey ? COLORS[colorKey] : "#EF4444";

  return (
    <TutorialLayer pointerEvents="none">
      {/* --------------------------------
          움직이는 가짜 Object
      -------------------------------- */}

      <Animated.View
        style={{
          position: "absolute",

          left: actualStartPoint.x - 45,
          top: actualStartPoint.y - 45,

          opacity,

          transform: [
            {
              translateX: moveX,
            },
            {
              translateY: moveY,
            },
            {
              scale: stickerScale,
            },
          ],
        }}
      >
        <TutorialSticker>
          {shapeId && <RenderItemSvg shapeId={shapeId} colorHex={svgColor} />}
        </TutorialSticker>
      </Animated.View>

      {/* --------------------------------
          손가락
      -------------------------------- */}

      <Animated.View
        style={{
          position: "absolute",

          left: actualStartPoint.x - 18,
          top: actualStartPoint.y - 8,

          opacity,

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
        }}
      >
        <Finger>👆</Finger>
      </Animated.View>
    </TutorialLayer>
  );
}

// ==================================================
// styles
// ==================================================

const TutorialLayer = styled.View`
  position: absolute;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: 999;
  elevation: 999;
`;

const TutorialSticker = styled.View`
  width: 90px;
  height: 90px;

  align-items: center;
  justify-content: center;
`;

const Finger = styled.Text`
  font-size: 52px;
`;
