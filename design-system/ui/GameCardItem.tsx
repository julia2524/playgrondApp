// import React from "react";
// import styled from "styled-components/native";
// import { RADIUS } from "../../design-system/tokens/radius";

// interface GameCardItemProps {
//   bgColor: string;
//   emoji: string;
//   title: string;
//   desc: string;
//   disabled?: boolean;
//   onPress: () => void;
// }

// export default function GameCardItem({
//   bgColor,
//   emoji,
//   title,
//   desc,
//   disabled = false,
//   onPress,
// }: GameCardItemProps) {
//   return (
//     <GameCard
//       bgColor={bgColor}
//       disabled={disabled}
//       onPress={onPress}
//       activeOpacity={0.9}
//     >
//       {/* 💧 우측 상단 몽글몽글 물방울 효과 */}
//       <CardBubble />
//       <GameEmoji>{emoji}</GameEmoji>
//       <GameTitle>{title}</GameTitle>
//       <GameDesc>{desc}</GameDesc>
//     </GameCard>
//   );
// }
// interface GameCardProps {
//   bgColor: string;
//   disabled?: boolean;
// }
// const GameCard = styled.TouchableOpacity<GameCardProps>`
//   width: 47%;
//   aspect-ratio: 1;
//   background-color: ${(props) => props.bgColor};
//   border-radius: 24px;
//   padding: 16px;
//   padding-top: 24px; // 🌟 상단 여백을 살짝 주어 위쪽부터 시작하게!
//   align-items: flex-start;
//   justify-content: center; // 🌟 중앙 정렬 대신 위쪽(flex-start)부터 차례대로 배치!
//   position: relative;
//   overflow: hidden;
//   opacity: ${(props) => (props.disabled ? 0.7 : 1)};
//   elevation: 3;
//   shadow-color: #64748b;
//   shadow-offset: 0px 4px;
//   shadow-opacity: 0.12;
//   shadow-radius: 8px;
// `;

// const CardBubble = styled.View`
//   position: absolute;
//   width: 90px;
//   height: 90px;
//   border-radius: ${RADIUS.circleMax}px;
//   background-color: rgba(255, 255, 255, 0.2);
//   right: -25px;
//   top: -25px;
// `;

// const GameEmoji = styled.Text`
//   font-size: 48px;
//   margin-bottom: 12px;
//   text-align: center; // 🌟 확실하게 가운데 정렬
// `;

// const GameTitle = styled.Text`
//   font-family: ${(props) => props.theme.fontFamily};
//   font-size: ${(props) => props.theme.typography.button}px;
//   color: #ffffff;
//   margin-bottom: 4px;
//   text-align: center; // 🌟 확실하게 가운데 정렬
// `;

// const GameDesc = styled.Text`
//   font-family: ${(props) => props.theme.fontFamily};
//   font-size: ${(props) => props.theme.typography.tiny}px;
//   color: rgba(255, 255, 255, 0.9);
//   text-align: center;
// `;

import React from "react";
import styled from "styled-components/native";
import { RADIUS } from "../../design-system/tokens/radius";
import { BASIC_COLORS } from "../tokens/colors";

interface GameCardItemProps {
  bgColor: string;
  // 💡 기존 string(이모지)도 되고, <Ionicons .../> 컴포넌트도 그대로 들어갈 수 있게 타입 설정!
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

      {/* 💡 이모지든 expo-vector-icons든 깨지지 않고 예쁘게 나오도록 감싸줌 */}
      <GameIconWrapper>
        {typeof emoji === "string" ? <EmojiText>{emoji}</EmojiText> : emoji}
      </GameIconWrapper>

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
  aspect-ratio: 1;
  background-color: ${(props) => props.bgColor};
  border-radius: 24px;
  padding: 16px;
  padding-top: 24px;
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

/* 💡 기존 GameEmoji 위치를 대체할 Icon Wrapper */
const GameIconWrapper = styled.View`
  margin-bottom: 12px;
  align-items: center;
  justify-content: center;
`;

const EmojiText = styled.Text`
  font-size: 40px;
  text-align: center;
`;

const GameTitle = styled.Text`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.button}px;
  color: ${BASIC_COLORS.BORDER};
  margin-bottom: 4px;
  text-align: center;
`;

const GameDesc = styled.Text`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.small}px;
  color: ${BASIC_COLORS.BORDER};
  text-align: center;
`;
