import React, { useEffect, useRef } from "react";
import { Animated, TouchableOpacity, ViewStyle } from "react-native";

import ProgressStar from "../../../components/stageMap/ProgressStar";

import {
  NodeContainer,
  StageNumber,
  LockIcon,
  GlowRing,
} from "../stageMapStyles";
import ProgressSun from "../../../components/stageMap/ProgressSun";

interface StageNodeProps {
  gameType: "color" | "shape"; // 🌟 추가
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
  gameType,
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

  // ==================================================
  // ⭐ 별 점수 → 10조각 진행도 변환
  // ==================================================

  const progress =
    unlocked && maxStars > 0 ? Math.round((stars / maxStars) * 10) : 0;

  return (
    <NodeContainer style={style}>
      {/* ==========================================
          ⭐ 현재 진행 중인 스테이지 Glow
      ========================================== */}
      {isCurrent && (
        <GlowRing
          style={{
            transform: [{ scale: glowScale }],
            opacity: glowOpacity,
          }}
        />
      )}

      {/* ==========================================
          ⭐ 스테이지 별 버튼
      ========================================== */}
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={{
          width: 120,
          height: 120,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* 🌟 gameType에 따라 별 또는 다른 형태(해 등)로 분기 */}
        {gameType === "shape" ? (
          <ProgressSun size={120} progress={progress} /> // 예시: 해 조각 컴포넌트
        ) : (
          <ProgressStar size={120} progress={progress} /> // 기존 별 조각 컴포넌트
        )}

        {/* ⭐ 잠긴 스테이지 */}
        {!unlocked && (
          <LockIcon
            style={{
              position: "absolute",
            }}
          >
            🔒
          </LockIcon>
        )}

        {/* ⭐ 열린 스테이지 → 가운데 레벨 */}
        {unlocked && (
          <StageNumber
            style={{
              position: "absolute",
            }}
          >
            {level}
          </StageNumber>
        )}
      </TouchableOpacity>
    </NodeContainer>
  );
}
