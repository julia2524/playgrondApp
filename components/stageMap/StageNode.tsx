import React, { useEffect, useRef } from "react";
import { Animated, ViewStyle } from "react-native";
import {
  NodeContainer,
  StageButton,
  StageNumber,
  StageName,
  LockIcon,
  GlowRing,
} from "../../styles/stageMapStyles";

interface StageNodeProps {
  level: number;
  name: string;
  unlocked: boolean;
  completed: boolean;
  isCurrent?: boolean; // ⭐ "지금 도전 중인" 스테이지 여부
  onPress: () => void;
  style?: ViewStyle;
}

export default function StageNode({
  level,
  name,
  unlocked,
  completed,
  isCurrent = false,
  onPress,
  style,
}: StageNodeProps) {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isCurrent) return;

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1100,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    );

    loop.start();
    return () => loop.stop();
  }, [isCurrent]);

  const glowScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.35],
  });
  const glowOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.45, 0],
  });

  return (
    <NodeContainer style={style}>
      {isCurrent && (
        <GlowRing
          style={{ transform: [{ scale: glowScale }], opacity: glowOpacity }}
        />
      )}

      <StageButton
        unlocked={unlocked}
        completed={completed}
        onPress={onPress}
        activeOpacity={0.8}
      >
        {!unlocked ? (
          <LockIcon>🔒</LockIcon>
        ) : completed ? (
          <StageNumber>✓</StageNumber>
        ) : (
          <StageNumber>{level}</StageNumber>
        )}
      </StageButton>

      <StageName>{name}</StageName>
    </NodeContainer>
  );
}
