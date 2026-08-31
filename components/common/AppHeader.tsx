import React from "react";
import styled from "styled-components/native";
import { BASIC_COLORS } from "../../design-system/tokens/colors";

interface AppHeaderProps {
  onBack: () => void;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

export default function AppHeader({ onBack, center, right }: AppHeaderProps) {
  return (
    <Header>
      {/* 왼쪽 : 백버튼 */}
      <BackButton onPress={onBack} activeOpacity={0.7}>
        <BackText>‹</BackText>
      </BackButton>

      {/* 가운데 */}
      <Center>{center}</Center>

      {/* 오른쪽 */}
      <Right>{right}</Right>
    </Header>
  );
}

const Header = styled.View`
  height: 76px;
  position: relative;
  align-items: center;
  justify-content: center;
  padding-horizontal: 16px;
  background-color: transparent;
  z-index: 10;
  padding-top: 20px;
`;

const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 16px;
  top: 25px;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border-radius: 22px;
  background-color: rgba(255, 255, 255, 0.75);
  z-index: 20;
`;

const BackText = styled.Text`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.giant}px;
  color: ${BASIC_COLORS.TEXT_MAIN};
  margin-top: -3px;
`;

const Center = styled.View`
  align-items: center;
  justify-content: center;
`;

const Right = styled.View`
  position: absolute;
  right: 16px;
  top: 0px;
  width: 72px;
  height: 76px;
  align-items: center;
  justify-content: center;
  z-index: 20;
`;
