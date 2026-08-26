import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f8f9fe;
  padding: 24px;
  justify-content: space-between;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

export const SubTitle = styled.Text`
  font-size: 14px;
  color: #0fa6dd;
  font-weight: bold;
`;

export const Title = styled.Text`
  font-size: 26px;
  color: #2c3e50;
  font-weight: 900;
  margin-top: 4px;
`;

export const SettingButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: #ffffff;
  border-width: 1px;
  border-color: #dce4ec;
  align-items: center;
  justify-content: center;
  elevation: 2;
  shadow-color: #64748b;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const SettingButtonText = styled.Text`
  font-size: 20px;
`;

export const GuideTextContainer = styled.View`
  margin-top: 40px;
  margin-bottom: 15px;
  align-items: center;
  flex: 1;
`;

export const GuideText = styled.Text`
  font-size: 14px;
  font-weight: 900;
  color: #94a3b8;
`;

export const GameGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
  flex: 3;
  /* margin-auto: true; */
`;

interface GameCardProps {
  bgColor: string;
  disabled?: boolean;
}

export const GameCard = styled.TouchableOpacity<GameCardProps>`
  width: 47%;
  background-color: ${(props) => props.bgColor};
  border-radius: 24px;
  padding: 20px;
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

// 🌟 카드 우측 상단에 박힐 몽글몽글 물방울/광채 효과
export const CardBubble = styled.View`
  position: absolute;
  width: 90px;
  height: 90px;
  border-radius: 45px;
  background-color: rgba(255, 255, 255, 0.18);
  right: -25px;
  top: -25px;
`;

export const GameEmoji = styled.Text`
  font-size: 48px;
  margin-bottom: 12px;
`;

export const GameTitle = styled.Text`
  font-size: 18px;
  color: #ffffff;
  font-weight: bold;
  margin-bottom: 4px;
`;

export const GameDesc = styled.Text`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  font-weight: bold;
`;

export const Footer = styled.Text`
  text-align: center;
  font-size: 12px;
  color: #94a3b8;
  margin-top: 20px;
`;
