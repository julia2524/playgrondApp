import React, { useEffect, useRef } from "react";
import { Animated, ViewStyle } from "react-native";

import {
  NodeContainer,
  StageButton,
  StageNumber,
  StageName,
  LockIcon,
  GlowRing,
  StageStarsRow,
  StageStar,
} from "../../styles/stageMapStyles";
import CandyStar from "../common/CandyStar";

interface StageNodeProps {
  level: number;
  name: string;

  unlocked: boolean;
  completed: boolean;

  isCurrent?: boolean;

  // ⭐ 획득한 별
  stars: number;

  // ⭐ 최대 별
  maxStars: number;

  onPress: () => void;

  style?: ViewStyle;
}

export default function StageNode({
  level,
  name,
  unlocked,
  completed,
  stars,
  maxStars,
  isCurrent = false,
  onPress,
  style,
}: StageNodeProps) {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isCurrent) {
      pulse.setValue(0);
      return;
    }

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

    return () => {
      loop.stop();
    };
  }, [isCurrent, pulse]);

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
      {/* ⭐ 현재 진행 중인 스테이지 Glow */}
      {isCurrent && (
        <GlowRing
          style={{
            transform: [{ scale: glowScale }],
            opacity: glowOpacity,
          }}
        />
      )}

      {/* ⭐ 스테이지 버튼 */}
      <StageButton
        unlocked={unlocked}
        completed={completed}
        onPress={onPress}
        activeOpacity={0.8}
      >
        {!unlocked ? (
          <LockIcon>🔒</LockIcon>
        ) : (
          <StageNumber>{level}</StageNumber>
        )}
      </StageButton>

      {/* ⭐⭐⭐ 캔디크러쉬 느낌의 작은 별 */}
      {unlocked && (
        <StageStarsRow>
          {Array.from({ length: maxStars }).map((_, index) => {
            const starPosition = index + 1;

            let type: "full" | "half" | "empty" = "empty";

            // ⭐ 꽉 찬 별
            if (stars >= starPosition) {
              type = "full";
            }

            // ⭐ 반개 별
            else if (stars >= starPosition - 0.5) {
              type = "half";
            }

            return <CandyStar key={index} size={16} type={type} />;
          })}
        </StageStarsRow>
      )}

      <StageName>{name}</StageName>
    </NodeContainer>
  );
}
