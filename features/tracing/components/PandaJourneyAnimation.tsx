import React, { useEffect, useRef, useState } from "react";
import { Animated, View } from "react-native";
import type { ImageSourcePropType } from "react-native";
import styled from "styled-components/native";

import PandaMover from "./PandaMover";
import type { PandaAnimationPhase } from "./PandaMover";

import SuccessEffect from "./SuccessEffect";
import { DrawingPoint } from "../types/drawing.types";
import BambooObject from "./BambooObject";

interface PandaJourneyAnimationProps {
  source: ImageSourcePropType;
  startPoint: DrawingPoint;
  endPoint: DrawingPoint;
  isTracing: boolean;
  isTraceCompleted: boolean;
  width?: number;
  height?: number;
  pandaWidth?: number;
  pandaHeight?: number;
  onJourneyComplete?: () => void;
}

export default function PandaJourneyAnimation({
  source,
  startPoint,
  endPoint,
  isTracing,
  isTraceCompleted,
  width = 320,
  height = 420,
  pandaWidth = 112,
  pandaHeight = 140,
  onJourneyComplete,
}: PandaJourneyAnimationProps) {
  const [phase, setPhase] = useState<PandaAnimationPhase>("WAITING");

  const journeyProgress = useRef(new Animated.Value(0)).current;
  const hasStartedRef = useRef(false);
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const onCompleteRef = useRef(onJourneyComplete);

  useEffect(() => {
    onCompleteRef.current = onJourneyComplete;
  }, [onJourneyComplete]);

  const translateX = journeyProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [startPoint.x - pandaWidth / 2, endPoint.x - pandaWidth / 2],
  });

  useEffect(() => {
    if (!isTraceCompleted) {
      animationRef.current?.stop();

      hasStartedRef.current = false;
      journeyProgress.setValue(0);

      setPhase(isTracing ? "TRACING" : "WAITING");
      return;
    }

    if (hasStartedRef.current) return;

    hasStartedRef.current = true;
    setPhase("WALKING");

    const walking = Animated.timing(journeyProgress, {
      toValue: 1,
      duration: 1800,
      useNativeDriver: true,
    });

    animationRef.current = walking;

    walking.start(({ finished }) => {
      if (!finished) return;

      const eatingSequence = Animated.sequence([
        Animated.delay(450),
        Animated.delay(2200),
      ]);

      setPhase("EATING");
      animationRef.current = eatingSequence;

      eatingSequence.start(({ finished: eatingFinished }) => {
        if (!eatingFinished) return;

        setPhase("COMPLETED");
        onCompleteRef.current?.();
      });
    });
  }, [isTracing, isTraceCompleted, journeyProgress]);

  useEffect(() => {
    return () => {
      animationRef.current?.stop();
    };
  }, []);

  return (
    <JourneyLayer pointerEvents="none" layerWidth={width} layerHeight={height}>
      <BambooObject
        left={endPoint.x - 38}
        top={endPoint.y - 100}
        width={76}
        height={100}
      />

      {/* 팬더곰은 교체하거나 숨기지 않고 계속 유지 */}
      <PandaMover
        source={source}
        translateX={translateX}
        pathY={startPoint.y}
        width={pandaWidth}
        height={pandaHeight}
        phase={phase}
      />

      <SuccessEffect
        x={endPoint.x + 35}
        y={endPoint.y - 110}
        visible={phase === "COMPLETED"}
      />
    </JourneyLayer>
  );
}

interface JourneyLayerProps {
  layerWidth: number;
  layerHeight: number;
}

const JourneyLayer = styled(View).attrs<JourneyLayerProps>(
  ({ layerWidth, layerHeight }) => ({
    style: {
      width: layerWidth,
      height: layerHeight,
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
