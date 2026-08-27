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
export const TitleContainer = styled.View`
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
  flex: 4;
  /* margin-auto: true; */
`;

interface GameCardProps {
  bgColor: string;
  disabled?: boolean;
}

export const Footer = styled.Text`
  text-align: center;
  font-size: 12px;
  color: #94a3b8;
  margin-top: 20px;
`;
