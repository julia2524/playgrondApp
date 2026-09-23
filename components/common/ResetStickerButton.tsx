import React from "react";
import styled from "styled-components/native";
import { GAME_INFO } from "../../constants/GameInfo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { PASTEL_BG } from "../../design-system/tokens/colors";
import { AppText } from "../../utils/AppText";

interface ResetStickerButtonProps {
  gameType: "color" | "shape" | "category";
  onPress: () => void;
}

export default function ResetStickerButton({
  gameType,
  onPress,
}: ResetStickerButtonProps) {
  const { iconName, title, stickerDescription } = GAME_INFO[gameType];

  return (
    <ResetButtonContainer onPress={onPress} activeOpacity={0.8}>
      <GameIconWrapper>
        <Ionicons name={iconName as any} size={26} color={PASTEL_BG.neutral} />
      </GameIconWrapper>

      <GameInfo>
        <GameTitle>{title}</GameTitle>
        <GameDescription>{stickerDescription}</GameDescription>
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

const GameIconWrapper = styled.View`
  width: 46px;
  height: 46px;

  margin-right: 13px;

  align-items: center;
  justify-content: center;

  border-radius: 13px;
  background-color: #5b4b4b;
`;

const GameInfo = styled.View`
  flex: 1;
`;

const GameTitle = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.body}px;
  font-weight: 700;
  color: #5b4b4b;
`;

const GameDescription = styled(AppText)`
  margin-top: 4px;

  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.small}px;
  color: #9a8b84;
`;

const Arrow = styled(AppText)`
  margin-left: 8px;

  font-size: 27px;
  font-weight: 300;
  color: #b8aaa3;
`;
