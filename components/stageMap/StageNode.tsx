import React from "react";
import { ViewStyle } from "react-native";

import {
  NodeContainer,
  StageButton,
  StageNumber,
  StageName,
  LockIcon,
  StarRow,
} from "../../styles/stageMapStyles";

interface StageNodeProps {
  level: number;
  name: string;
  unlocked: boolean;
  completed: boolean;
  onPress: () => void;

  // ⭐ 위치를 StageMapScreen에서 결정
  style?: ViewStyle;
}

export default function StageNode({
  level,
  name,
  unlocked,
  completed,
  onPress,
  style,
}: StageNodeProps) {
  return (
    <NodeContainer style={style}>
      <StageButton
        unlocked={unlocked}
        completed={completed}
        onPress={onPress}
        activeOpacity={0.8}
      >
        {!unlocked ? (
          <LockIcon>🔒</LockIcon>
        ) : completed ? (
          <>
            <StageNumber>✓</StageNumber>

            <StarRow>
              <StageName>⭐ ⭐ ⭐</StageName>
            </StarRow>
          </>
        ) : (
          <StageNumber>{level}</StageNumber>
        )}
      </StageButton>

      <StageName>{name}</StageName>
    </NodeContainer>
  );
}
