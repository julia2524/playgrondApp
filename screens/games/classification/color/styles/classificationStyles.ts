// ==================================================
// styled-components
// ==================================================

import { Animated, Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { BASIC_COLORS } from "../../../../../constants/colors";
import { RADIUS } from "../../../../../constants/radius";

// ==================================================
// Game Header
// ==================================================
export const GameHeaders = styled.View`
  position: relative;
`;

export const GameHeaderCenter = styled.View`
  align-items: center;
  justify-content: center;
  gap: 2px;
`;

export const TitleText = styled.Text`
  font-family: "Jua";
  font-size: 20px;
  color: ${BASIC_COLORS.TEXT_MAIN};
  text-align: center;
`;

export const StarRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2px;
  margin-top: -10px;
`;

export const MascotWrapper = styled.View`
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 8px;
  top: 15px;
`;
export const Star = styled(Image)`
  position: absolute;
  width: 55px;
  height: 55px;
  top: 170px;
  left: 15px;
  opacity: 0.45;
`;

export const Container = styled.View`
  flex: 1;
  background-color: ${BASIC_COLORS.BACKGROUND};
`;

export const Content = styled.View`
  flex: 1;
`;
// export const Header = styled.View`
//   height: 76px;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-around;
//   padding-horizontal: 20px;

//   background-color: #ffffff;
//   border-bottom-left-radius: 28px;
//   border-bottom-right-radius: 28px;

//   elevation: 3;
//   shadow-color: #6ba3d6;
//   shadow-offset: 0px 3px;
//   shadow-opacity: 0.1;
//   shadow-radius: 8px;

//   overflow: visible; /* ⭐ 곰돌이가 헤더 밖으로 살짝 삐져나오게 */
// `;

// export const HeaderCenter = styled.View`
//   gap: 4px;
// `;
// export const StarRow = styled.View`
//   flex-direction: row;
//   gap: 4px;
// `;

// export const MascotCorner = styled.View`
//   position: absolute;
//   right: 8px;
//   top: -18px; /* ⭐ 헤더 위로 살짝 걸치기 */
//   z-index: 20;
// `;

export const MascotEmoji = styled.Text`
  font-size: 48px;
`;

// export const BackText = styled.Text`
//   font-size: 28px;
//   color: ${BASIC_COLORS.TEXT_MAIN};
// `;

// export const TitleText = styled.Text`
//   font-size: 17px;
//   font-weight: 800;
//   color: ${BASIC_COLORS.TEXT_MAIN};
// `;

export const RoundIndicator = styled.Text`
  font-size: 15px;
  font-weight: 700;

  color: ${BASIC_COLORS.PRIMARY};
  background-color: #f0f7ff;

  padding-horizontal: 12px;
  padding-vertical: 4px;
  border-radius: ${RADIUS.sm}px;
`;

export const MissionBubble = styled.View`
  align-items: center;
  margin-vertical: 16px;
`;

export const MissionText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: ${BASIC_COLORS.TEXT_MAIN};
  background-color: ${BASIC_COLORS.CARD_BG};
  padding-horizontal: 22px;
  padding-vertical: 12px;
  border-radius: ${RADIUS.md}px;
  overflow: hidden;
  elevation: 3;
  border-width: 1px;
  border-color: #edf1f5;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.04;
  shadow-radius: 4px;
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

export const TargetBox = styled.View`
  width: 320px;
  height: 320px;
  align-items: center;
  justify-content: center;
`;

export const TargetItemsGrid = styled.View`
  width: 280px;
  height: 280px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
`;

export const TargetItemCircle = styled(Animated.View)<{
  color: string;
  isMissing?: boolean;
}>`
  width: 125px;
  height: 125px;
  border-radius: ${RADIUS.full}px;
  align-items: center;
  justify-content: center;

  /* 🌟 완전 투명("transparent") 대신, 측정이 가능하도록 아주 미세한 투명 흰색을 주거나 백그라운드 유지 */
  background-color: ${(props) =>
    props.isMissing ? "rgba(255, 255, 255, 0.01)" : props.color};

  /* 🌟 빈칸(isMissing)일 때 점선 테두리, 채워지면 투명 테두리 */
  border-width: 3px;
  border-style: ${(props) => (props.isMissing ? "dashed" : "solid")};
  border-color: ${(props) => (props.isMissing ? "#94A3B8" : "transparent")};

  /* 🌟 핵심: 빈칸(isMissing)일 때는 그림자와 elevation을 완전히 없앰! */
  elevation: ${(props) => (props.isMissing ? 0 : 3)};
  shadow-color: ${(props) => (props.isMissing ? "transparent" : "#64748b")};

  shadow-offset: 0px 2px;
  shadow-opacity: ${(props) => (props.isMissing ? 0 : 0.08)};
  shadow-radius: 4px;
`;

export const TargetItemText = styled.Text<{
  color?: string;
}>`
  font-size: 14px;
  font-weight: 800;
  color: ${(props) => props.color || BASIC_COLORS.TEXT_MAIN};
  text-align: center;
`;

export const ObjectSection = styled.View`
  align-items: center;
  margin-bottom: 10px;
  z-index: 100;
`;

export const SectionLabel = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #8a94a6;
  margin-bottom: 12px;
`;

export const ObjectsContainer = styled.View`
  flex-direction: row;
  justify-content: center;

  align-items: center;
  gap: 16px; /* 아이템 간격 */
`;

export const ObjectSticker = styled(Animated.View)<{
  color: string;
  itemCount: number;
}>`
  width: ${(props) =>
    props.itemCount === 2 ? "120px" : props.itemCount === 3 ? "100px" : "80px"};
  height: ${(props) =>
    props.itemCount === 2 ? "120px" : props.itemCount === 3 ? "100px" : "80px"};
  border-radius: ${(props) =>
    props.itemCount === 2 ? "60px" : props.itemCount === 3 ? "50px" : "40px"};
  background-color: ${(props) => props.color};

  /* 🎨 물건의 색상은 테두리 */
  border-width: 5px;
  border-color: ${(props) => props.color};

  align-items: center;
  justify-content: center;
  elevation: 3;

  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.08;
  shadow-radius: 4px;
`;

export const StickerText = styled.Text<{ itemCount: number }>`
  font-size: ${(props) =>
    props.itemCount === 2 ? "14px" : props.itemCount === 3 ? "13px" : "11px"};
  font-weight: 800;
  color: ${BASIC_COLORS.TEXT_MAIN};
  text-align: center;
`;

export const SuccessModalOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(
    44,
    62,
    80,
    0.5
  ); /* 어둡기만 한 회색 대신 부드러운 네이비 투명 톤 */
  align-items: center;
  justify-content: center;
  z-index: 999;
  elevation: 999;
`;

export const SuccessModalContent = styled.View`
  background-color: ${BASIC_COLORS.CARD_BG};
  width: 85%;
  max-width: 340px;
  padding: 32px 24px;
  border-radius: ${RADIUS.xl}px;
  align-items: center;
  /* border-width: 2px;
  border-color: #edf1f5; */
  /* 그림자 속성을 RN 스타일에 맞게 수정 */
  elevation: 12;
  shadow-color: ${BASIC_COLORS.PRIMARY};
  shadow-offset: 0px 6px;
  shadow-opacity: 0.2;
  shadow-radius: 12px;
  position: relative;
`;

export const SuccessEmojiRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;
export const SuccessEmoji = styled.Text`
  font-size: 40px;
  margin-bottom: 10px;
  text-align: center;
`;

export const SuccessTitle = styled.Text`
  font-size: 24px;
  font-weight: 800;
  color: ${BASIC_COLORS.PRIMARY};
  text-align: center;
  margin-bottom: 6px;
`;

export const SuccessSubtitle = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: ${BASIC_COLORS.TEXT_MAIN};
  text-align: center;
  margin-bottom: 24px;
`;

export const SuccessButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  gap: 12px;
`;

// variant prop으로 버튼 색상 구분 (primary: 다음 레벨, secondary: 다시 하기)
export const SuccessButton = styled(TouchableOpacity)<{
  variant?: "primary" | "secondary";
}>`
  flex: 1;
  background-color: ${(props) =>
    props.variant === "primary" ? BASIC_COLORS.SUCCESS : BASIC_COLORS.ACCENT};
  padding-vertical: 14px;
  border-radius: ${RADIUS.md}px;
  align-items: center;
  elevation: 4;
  shadow-color: #000;
  shadow-offset: 0px 3px;
  shadow-opacity: 0.12;
  shadow-radius: 5px;
  border-bottom-width: 4px;
  border-bottom-color: ${(props) =>
    props.variant === "primary" ? "#34986b" : "#d97c00"};
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: 800;
  color: #ffffff;
  text-align: center;
  line-height: 20px;
`;

export const SuccessMascotWrapper = styled.View`
  position: absolute;
  /* 모달 박스의 정가운데 가로 위치 맞추기 */
  align-self: center;
  /* 모달 콘텐츠 박스 위쪽 테두리에 걸치도록 위로 띄우기 (마스코트 크기의 절반 정도) */
  top: -80px;
  z-index: 10;
`;
