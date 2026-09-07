import React from "react";
import styled from "styled-components/native";

interface ResetButtonProps {
  gameType: "color" | "shape";
  onPress: () => void;
}

const GAME_INFO = {
  color: {
    icon: "🎨",
    title: "색깔 놀이",
    description: "색깔 놀이를 처음부터 다시 시작해요",
  },
  shape: {
    icon: "🔷",
    title: "모양 놀이",
    description: "모양 놀이를 처음부터 다시 시작해요",
  },
};

export default function ResetProgressButton({
  gameType,
  onPress,
}: ResetButtonProps) {
  const { icon, title, description } = GAME_INFO[gameType];

  return (
    <ResetButtonContainer onPress={onPress} activeOpacity={0.8}>
      <GameIcon>{icon}</GameIcon>

      <GameInfo>
        <GameTitle>{title}</GameTitle>
        <GameDescription>{description}</GameDescription>
      </GameInfo>

      <Arrow>›</Arrow>
    </ResetButtonContainer>
  );
}

const ResetButtonContainer = styled.TouchableOpacity`
  min-height: 76px;

  flex-direction: row;
  align-items: center;

  padding: 14px 16px;

  background-color: #fffdf9;

  border-radius: 18px;
  border-width: 1px;
  border-color: rgba(91, 75, 75, 0.08);
`;

const GameIcon = styled.Text`
  width: 46px;
  height: 46px;

  margin-right: 13px;

  font-size: 27px;
  text-align: center;
  text-align-vertical: center;
`;

const GameInfo = styled.View`
  flex: 1;
`;

const GameTitle = styled.Text`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.body}px;
  font-weight: 700;
  color: #5b4b4b;
`;

const GameDescription = styled.Text`
  margin-top: 4px;

  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.small}px;
  color: #9a8b84;
`;

const Arrow = styled.Text`
  margin-left: 8px;

  font-size: 27px;
  font-weight: 300;
  color: #b8aaa3;
`;
