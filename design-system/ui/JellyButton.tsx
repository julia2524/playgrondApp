import React from "react";
import styled from "styled-components/native";
import { COLORS } from "../tokens/colors"; // 경로 확인!
import { RADIUS } from "../tokens/radius";

interface JellyButtonProps {
  title: string;
  onPress: () => void;
  bgColor?: string;
  textColor?: string;
  icon?: string;
}

export default function JellyButton({
  title,
  onPress,
  bgColor = COLORS.ACCENT,
  textColor = "#FFFFFF",
  icon,
}: JellyButtonProps) {
  return (
    <StyledButton bgColor={bgColor} onPress={onPress} activeOpacity={0.85}>
      {icon ? <ButtonIcon>{icon}</ButtonIcon> : null}
      <ButtonText color={textColor}>{title}</ButtonText>
    </StyledButton>
  );
}

const StyledButton = styled.TouchableOpacity<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  border-radius: ${RADIUS.full}px;
  padding-vertical: 16px;
  padding-horizontal: 28px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ButtonIcon = styled.Text`
  font-size: 20px;
  margin-right: 8px;
`;

const ButtonText = styled.Text<{ color: string }>`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.color};
`;
