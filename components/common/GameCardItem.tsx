import React from "react";
import styled from "styled-components/native";
import { RADIUS } from "../../constants/radius";

interface GameCardItemProps {
  bgColor: string;
  emoji: string;
  title: string;
  desc: string;
  disabled?: boolean;
  onPress: () => void;
}

export default function GameCardItem({
  bgColor,
  emoji,
  title,
  desc,
  disabled = false,
  onPress,
}: GameCardItemProps) {
  return (
    <GameCard
      bgColor={bgColor}
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* 💧 우측 상단 몽글몽글 물방울 효과 */}
      <CardBubble />
      <GameEmoji>{emoji}</GameEmoji>
      <GameTitle>{title}</GameTitle>
      <GameDesc>{desc}</GameDesc>
    </GameCard>
  );
}
interface GameCardProps {
  bgColor: string;
  disabled?: boolean;
}
const GameCard = styled.TouchableOpacity<GameCardProps>`
  width: 47%;

  background-color: ${(props) => props.bgColor};
  border-radius: 24px; // 👈 상수가 자꾸 말썽 부리면 그냥 직접 숫자에 px 붙여서 쓰기!
  padding: 16px;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  elevation: 3;
  shadow-color: #64748b;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.12;
  shadow-radius: 8px;
`;

const CardBubble = styled.View`
  position: absolute;
  width: 90px;
  height: 90px;
  border-radius: ${RADIUS.circleMax};
  background-color: rgba(255, 255, 255, 0.2);
  right: -25px;
  top: -25px;
`;

const GameEmoji = styled.Text`
  font-size: 48px;
  margin-bottom: 12px;
`;

const GameTitle = styled.Text`
  font-size: 18px;
  color: #ffffff;
  font-weight: bold;
  margin-bottom: 4px;
`;

const GameDesc = styled.Text`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
`;
