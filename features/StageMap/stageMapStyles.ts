import styled from "styled-components/native";
import { Animated, TouchableOpacity } from "react-native";
import { BASIC_COLORS, PASTEL_BG } from "../../design-system/tokens/colors";

export const Container = styled.View`
  flex: 1;
  background-color: ${BASIC_COLORS.BACKGROUND};
`;

export const Content = styled.View`
  flex: 1;
`;

// --------------------------------------------------
// Header
// --------------------------------------------------

// --------------------------------------------------
// Map Header
// --------------------------------------------------

export const StageMapHeaderCenter = styled.View`
  align-items: center;
  justify-content: center;
`;

export const StageMapTitle = styled.Text`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.heading}px;
  color: ${BASIC_COLORS.TEXT_MAIN};
  text-align: center;
`;

export const MapBackText = styled.Text`
  font-family: "Jua";

  font-size: 32px;

  color: ${BASIC_COLORS.TEXT_MAIN};

  margin-top: -3px;
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
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: #fff;
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
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.giant}px;
  color: #ffffff;
`;

export const LockIcon = styled.Text`
  font-size: 28px;
`;

export const StageName = styled.Text`
  margin-top: 10px;
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.small}px;
  color: #2c3e50;
  background-color: rgba(255, 255, 255, 0.92);
  padding-horizontal: 11px;
  padding-vertical: 5px;
  border-radius: 14px;
  elevation: 2;
`;

export const StageStarsRow = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin-top: 4px;
`;
export const StageStar = styled.Text<{ filled: boolean }>`
  font-size: 13px;

  margin-horizontal: 1px;

  color: ${({ filled }) => (filled ? "#FFD84D" : "#D7DCE5")};

  text-shadow-color: ${({ filled }) => (filled ? "#E7A900" : "transparent")};

  text-shadow-offset: 0px 1px;

  text-shadow-radius: 1px;
`;

export const BannerAdContainer = styled.View`
  height: 60px;
  align-items: center;
  justify-content: center;
  background-color: ${BASIC_COLORS.CARD_BG};
`;

export const HeaderRightContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px; /* 버튼 사이 간격 */
`;

export const StickerBookHeaderButton = styled(TouchableOpacity)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;

  /* 부드러운 그림자 효과 */
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

export const StickerButtonEmoji = styled.Text`
  font-size: 20px;
`;

// --------------------------------------------------
// Floating StickerBook Button (하단 플로팅 버튼)
// --------------------------------------------------

export const StickerBookFloatingButton = styled(TouchableOpacity)`
  position: absolute;
  /* 💡 하단 광고 높이(60px) + 여백(16px) = 76px 위쪽으로 배치 */
  bottom: 68px;

  /* 👈 좌측 아래 배치를 원할 경우 */
  left: 20px;

  /* 👉 만약 우측 아래로 바꾸고 싶다면 위 left를 주석처리하고 아래 right를 켜기! */
  /* right: 20px; */

  width: 52px;
  height: 52px;
  border-radius: 26px;
  background-color: ${PASTEL_BG.purple};
  align-items: center;
  justify-content: center;
  z-index: 10;

  /* 통통 튀는 입체감 테두리 & 그림자 */
  border-width: 3px;
  border-color: #ffffff;
  elevation: 8;
  shadow-color: #1e3a8a;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 6px;
`;
