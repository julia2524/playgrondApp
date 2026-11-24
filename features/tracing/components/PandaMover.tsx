import React, { useEffect, useRef } from "react";

import { Animated, Image } from "react-native";

import type { ImageSourcePropType } from "react-native";
import styled from "styled-components/native";

export type PandaAnimationPhase =
  | "WAITING"
  | "TRACING"
  | "WALKING"
  | "EATING"
  | "COMPLETED";

interface PandaMoverProps {
  source: ImageSourcePropType;
  translateX: Animated.AnimatedInterpolation<number>;
  pathY: number;
  width?: number;
  height?: number;
  phase: PandaAnimationPhase;
}

export default function PandaMover({
  source,
  translateX,
  pathY,
  width = 112,
  height = 140,
  phase,
}: PandaMoverProps) {
  const bounceY = useRef(new Animated.Value(0)).current;
  const rotation = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    animationRef.current?.stop();

    bounceY.setValue(0);
    rotation.setValue(0);
    scale.setValue(1);

    if (phase === "WALKING") {
      const walking = Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(bounceY, {
              toValue: -4,
              duration: 180,
              useNativeDriver: true,
            }),
            Animated.timing(rotation, {
              toValue: 1,
              duration: 180,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(bounceY, {
              toValue: 0,
              duration: 180,
              useNativeDriver: true,
            }),
            Animated.timing(rotation, {
              toValue: 0,
              duration: 180,
              useNativeDriver: true,
            }),
          ]),
        ]),
      );

      animationRef.current = walking;
      walking.start();
    }

    if (phase === "EATING") {
      // 먹을 때는 몸 전체를 위아래로 튀기지 않고
      // 살짝 좌우로 흔들며 오물오물하는 느낌만 표현
      const eating = Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(rotation, {
              toValue: 1,
              duration: 260,
              useNativeDriver: true,
            }),
            Animated.timing(scale, {
              toValue: 1.025,
              duration: 260,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(rotation, {
              toValue: -1,
              duration: 260,
              useNativeDriver: true,
            }),
            Animated.timing(scale, {
              toValue: 1,
              duration: 260,
              useNativeDriver: true,
            }),
          ]),
        ]),
      );

      animationRef.current = eating;
      eating.start();
    }

    return () => {
      animationRef.current?.stop();
    };
  }, [phase, bounceY, rotation, scale]);

  const rotate = rotation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ["-2deg", "0deg", "2deg"],
  });

  const top = pathY - height + 8;

  return (
    <MoverContainer
      pointerEvents="none"
      moverWidth={width}
      moverHeight={height}
      moverTop={top}
      style={[
        {
          transform: [
            { translateX },
            { translateY: bounceY },
            { rotate },
            { scale },
          ],
        },
      ]}
    >
      <PandaSprite source={source} resizeMode="contain" />
    </MoverContainer>
  );
}

interface MoverContainerProps {
  moverWidth: number;
  moverHeight: number;
  moverTop: number;
}

const MoverContainer = styled(Animated.View).attrs<MoverContainerProps>(
  ({ moverWidth, moverHeight, moverTop }) => ({
    style: {
      width: moverWidth,
      height: moverHeight,
      top: moverTop,
    },
  }),
)`
  position: absolute;
  left: 0;
  z-index: 10;
  align-items: center;
  justify-content: center;
`;

const PandaSprite = styled(Image)`
  width: 100%;
  height: 100%;
`;
