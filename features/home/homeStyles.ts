import styled from "styled-components/native";
import { BASIC_COLORS } from "../../design-system/tokens/colors";
export const Container = styled.View`
  flex: 1;
  padding: 24px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;
export const TitleContainer = styled.View`
  margin-top: 10px;
`;
export const SubTitle = styled.Text`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.body}px;
  color: #0fa6dd;
`;

export const Title = styled.Text`
  color: ${BASIC_COLORS.TEXT_MAIN};
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.title}px;

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
  align-items: center;
  padding-top: 20px;
`;

export const GuideText = styled.Text`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.body}px;
  color: #94a3b8;
`;

export const GameGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  /* 🌟 위아래 패딩과 좌우 패딩을 따로 지정해주기 (예: 세로 16px, 가로 14px) */
  padding-top: 16px;
  padding-bottom: 20px;
  padding-left: 14px;
  padding-right: 14px;

  gap: 14px; // 카드와 카드 사이의 간격
`;

export const GameGridWrapper = styled.View`
  background-color: rgba(255, 255, 255, 0.58);

  border-radius: 50px;
  overflow: hidden;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.75);
  margin-top: 50px;
`;

export const Footer = styled.Text`
  text-align: center;
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.small}px;
  color: #94a3b8;
  margin-top: auto;
`;
