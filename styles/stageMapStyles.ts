import styled from "styled-components/native";
import { Animated } from "react-native";
import { BASIC_COLORS } from "../constants/colors";

export const Container = styled.View`
  flex: 1;
  background-color: ${BASIC_COLORS.BACKGROUND};
  position: relative; // 🌟 플로팅 버튼의 기준점
`;
// --------------------------------------------------
// Header
// --------------------------------------------------

export const Header = styled.View`
  /* 기존 height: 56px 삭제 또는 min-height로 변경 */
  min-height: 56px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding-horizontal: 12px;
  padding-bottom: 10px; // 하단 여백 추가

  background-color: #ffffff;

  border-bottom-width: 1px;
  border-bottom-color: #edf0f7;

  elevation: 3;
  z-index: 10;
`;
export const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 16px;
  width: 44px;
  height: 44px;

  align-items: center;
  justify-content: center;

  border-radius: 22px;
  background-color: rgba(255, 255, 255, 0.9); // 살짝 투명한 흰색 유리알 느낌

  elevation: 4;
  shadow-color: #64748b;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.15;
  shadow-radius: 6px;

  z-index: 99;
`;

export const BackText = styled.Text`
  font-family: "Jua";
  font-size: 32px;
  color: #2c3e50;
  margin-top: -3px;
`;

export const HeaderTitle = styled.Text`
  font-family: "Jua";
  font-size: 22px;
  color: #2c3e50;
`;

export const HeaderRight = styled.View`
  width: 44px;
`;

// --------------------------------------------------
// Stage Node
// --------------------------------------------------

export const NodeContainer = styled.View`
  position: absolute;
  width: 120px;
  align-items: center;
`;

// ⭐ 현재 도전 중인 스테이지에 은은하게 퍼지는 펄스 링
export const GlowRing = styled(Animated.View)`
  position: absolute;
  top: 0px;
  width: 86px;
  height: 86px;
  border-radius: 43px;
  background-color: #fe9404;
`;

export const StageButton = styled.TouchableOpacity<{
  unlocked: boolean;
  completed: boolean;
}>`
  width: 86px;
  height: 86px;
  border-radius: 43px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    !props.unlocked ? "#E3E7EF" : props.completed ? "#45B48B" : "#FE9404"};
  border-width: 5px;
  border-color: #ffffff;
  elevation: 7;
  shadow-color: #64748b;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.18;
  shadow-radius: 6px;
`;

export const StageNumber = styled.Text`
  font-family: "Jua";
  font-size: 32px;
  color: #ffffff;
`;

export const LockIcon = styled.Text`
  font-size: 28px;
`;

export const StageName = styled.Text`
  margin-top: 10px;
  font-family: "Jua";
  font-size: 14px;
  color: #2c3e50;
  background-color: rgba(255, 255, 255, 0.92);
  padding-horizontal: 11px;
  padding-vertical: 5px;
  border-radius: 14px;
  elevation: 2;
`;
