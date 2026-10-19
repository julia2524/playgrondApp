import React from "react";
import styled from "styled-components/native";
import { RADIUS } from "../../design-system/tokens/radius";
import { BASIC_COLORS } from "../tokens/colors";
import { AppText } from "../../utils/AppText";

interface GameCardItemProps {
  bgColor: string;
  emoji: React.ReactNode;
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

      {/* 💡 아이콘 Wrapper */}
      <GameIconWrapper>
        {typeof emoji === "string" ? <EmojiText>{emoji}</EmojiText> : emoji}
      </GameIconWrapper>

      {/* 💡 제목: 길어지면 폰트 크기를 자동으로 조정하여 전체 출력 */}
      <GameTitle numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.75}>
        {title}
      </GameTitle>

      {/* 💡 설명: 말줄임표(...) 없이 글자 크기를 자동으로 줄여 문장 전체 표시 */}
      <GameDesc numberOfLines={3} adjustsFontSizeToFit minimumFontScale={0.7}>
        {desc}
      </GameDesc>
    </GameCard>
  );
}

interface GameCardProps {
  bgColor: string;
  disabled?: boolean;
}

const GameCard = styled.TouchableOpacity<GameCardProps>`
  width: 46%;
  min-height: 155px;
  background-color: ${(props) => props.bgColor};
  border-radius: 24px;
  padding: 16px 10px 14px 10px;
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
  border-radius: ${RADIUS.circleMax}px;
  background-color: rgba(255, 255, 255, 0.2);
  right: -25px;
  top: -25px;
`;

const GameIconWrapper = styled.View`
  margin-bottom: 6px;
  align-items: center;
  justify-content: center;
`;

const EmojiText = styled(AppText)`
  font-size: 34px;
  text-align: center;
`;

const GameTitle = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.button}px;
  color: ${BASIC_COLORS.BORDER};
  margin-bottom: 4px;
  text-align: center;
  width: 100%;
`;

const GameDesc = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.small}px;
  color: ${BASIC_COLORS.BORDER};
  text-align: center;
  width: 100%;
  opacity: 0.9;
  line-height: 16px;
`;
