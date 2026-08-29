import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, View } from "react-native";
import styled from "styled-components/native";

import { COLORS } from "../../constants/colors";
import { RenderItemSvg } from "../../constants/ColorItemSvgs";

interface TutorialOverlayProps {
  visible: boolean;
  onComplete: () => void;

  fromRef: React.RefObject<View | null>;
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
  const opacity = useRef(new Animated.Value(0)).current;

  const moveX = useRef(new Animated.Value(0)).current;
  const moveY = useRef(new Animated.Value(0)).current;

  const fingerScale = useRef(new Animated.Value(1)).current;

  // ⭐ 정답칸 도착 후 사라지는 애니메이션
  const stickerScale = useRef(new Animated.Value(1)).current;

  const [startPoint, setStartPoint] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const deltaRef = useRef({
    x: 0,
    y: 0,
  });

  // --------------------------------------------------
  // 1️⃣ 실제 스티커 / 실제 빈칸 위치 측정
  // --------------------------------------------------

  useEffect(() => {
    if (!visible) {
      setStartPoint(null);
      return;
    }

    const timer = setTimeout(() => {
      if (!fromRef.current || !toRef.current) return;

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
    }, 100);

    return () => clearTimeout(timer);
  }, [visible, fromRef, toRef]);

  // --------------------------------------------------
  // 2️⃣ 튜토리얼 애니메이션
  // --------------------------------------------------

  useEffect(() => {
    if (!visible || !startPoint) return;

    opacity.setValue(0);

    moveX.setValue(0);
    moveY.setValue(0);

    fingerScale.setValue(1);
    stickerScale.setValue(1);

    const { x: deltaX, y: deltaY } = deltaRef.current;

    const animation = Animated.sequence([
      // --------------------------------
      // 1. 등장
      // --------------------------------

      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),

      Animated.delay(500),

      // --------------------------------
      // 2. 손가락 꾹!
      // --------------------------------

      Animated.timing(fingerScale, {
        toValue: 0.85,
        duration: 180,
        useNativeDriver: true,
      }),

      Animated.delay(120),

      // --------------------------------
      // 3. 실제 스티커 → 실제 빈칸으로 이동
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
      // 4. 손가락 뗌
      // --------------------------------

      Animated.parallel([
        Animated.timing(fingerScale, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),

        // ⭐ 스티커를 살짝 작게
        Animated.timing(stickerScale, {
          toValue: 0.9,
          duration: 180,
          useNativeDriver: true,
        }),
      ]),

      Animated.delay(250),

      // --------------------------------
      // 5. ⭐ 정답칸에서 부드럽게 사라짐
      // --------------------------------

      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
        }),

        Animated.timing(stickerScale, {
          toValue: 0.7,
          duration: 350,
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
  }, [
    visible,
    startPoint,
    opacity,
    moveX,
    moveY,
    fingerScale,
    stickerScale,
    onComplete,
  ]);

  if (!visible || !startPoint) {
    return null;
  }

  const svgColor = colorKey ? COLORS[colorKey] : "#EF4444";

  return (
    <TutorialLayer pointerEvents="none">
      {/* --------------------------------
          🎯 움직이는 실제 모양
      -------------------------------- */}

      <Animated.View
        style={{
          position: "absolute",

          left: startPoint.x - 45,
          top: startPoint.y - 45,

          opacity,

          transform: [
            { translateX: moveX },
            { translateY: moveY },
            { scale: stickerScale },
          ],
        }}
      >
        <TutorialItem>
          {shapeId && <RenderItemSvg shapeId={shapeId} colorHex={svgColor} />}
        </TutorialItem>
      </Animated.View>

      {/* --------------------------------
          👆 손가락
      -------------------------------- */}

      <Animated.View
        style={{
          position: "absolute",

          left: startPoint.x - 20,
          top: startPoint.y - 10,

          opacity,

          transform: [
            { translateX: moveX },
            { translateY: moveY },
            { scale: fingerScale },
          ],
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

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: 999;
  elevation: 999;
`;

const TutorialItem = styled.View`
  width: 90px;
  height: 90px;

  align-items: center;
  justify-content: center;
`;

const Finger = styled.Text`
  font-size: 52px;
`;
