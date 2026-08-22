// ==================================================
// styled-components
// ==================================================

import { Animated, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f8f9fe;
  padding-top: 40px;
`;

export const Header = styled.View`
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 20px;
  background-color: #ffffff;
`;

export const BackText = styled.Text`
  font-size: 28px;
  color: #2c3e50;
`;

export const TitleText = styled.Text`
  font-size: 17px;
  font-weight: 800;
  color: #2c3e50;
`;

export const RoundIndicator = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: #0fa6dd;
`;

export const MissionBubble = styled.View`
  align-items: center;
  margin-vertical: 20px;
`;

export const MissionText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #34495e;
  background-color: #ffffff;
  padding-horizontal: 20px;
  padding-vertical: 10px;
  border-radius: 20px;
  overflow: hidden;
  elevation: 2;
`;

export const GameBoard = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-around;
  padding-horizontal: 20px;
  padding-vertical: 20px;
  z-index: 1;
`;

export const TargetSection = styled.View<{ isFront?: boolean }>`
  align-items: center;
  justify-content: center;
  z-index: ${(props) => (props.isFront ? 300 : 0)};
  elevation: ${(props) => (props.isFront ? 30 : 0)};
`;

export const TargetBox = styled.View<{
  color: string;
}>`
  width: 330px;
  height: 330px;
  align-items: center;
  justify-content: center;
`;

export const TargetItemsGrid = styled.View`
  width: 290px;
  height: 290px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
`;

export const TargetItemCircle = styled(Animated.View)<{
  color: string;
}>`
  width: 130px;
  height: 130px;
  background-color: ${(props) => props.color};
  border-radius: 65px;
  align-items: center;
  justify-content: center;
`;

export const TargetItemText = styled.Text<{
  color?: string;
}>`
  font-size: 15px;
  font-weight: 800;
  color: ${(props) => props.color || "#2c3e50"};
  text-align: center;
`;

export const ObjectSection = styled.View`
  align-items: center;
  margin-bottom: 20px;
  z-index: 100;
`;

export const SectionLabel = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: #94a3b8;
  margin-bottom: 15px;
`;

export const ObjectsContainer = styled.View`
  flex-direction: row;
  gap: 30px;
`;

export const ObjectSticker = styled(Animated.View)<{
  color: string;
}>`
  width: 110px;
  height: 110px;
  background-color: ${(props) => props.color || "#ccc"};
  border-radius: 55px;
  align-items: center;
  justify-content: center;
  elevation: 5;
`;

export const StickerText = styled.Text`
  font-size: 14px;
  font-weight: 800;
  color: #ffffff;
  text-align: center;
`;

export const SuccessModalOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  align-items: center;
  justify-content: center;
  z-index: 999;
  elevation: 999;
`;

export const SuccessModalContent = styled.View`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 24px;
  align-items: center;
`;

export const SuccessTitle = styled.Text`
  font-size: 22px;
  font-weight: 800;
  color: #2c3e50;
  margin-bottom: 20px;
`;

export const SuccessButton = styled(TouchableOpacity)`
  background-color: #0fa6dd;
  padding-horizontal: 24px;
  padding-vertical: 12px;
  border-radius: 14px;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
`;
