// import styled from "styled-components/native";
// import { BASIC_COLORS } from "../../design-system/tokens/colors";
// import { AppText } from "../../utils/AppText";
// export const Container = styled.View`
//   flex: 1;
//   padding: 24px;
// `;

// export const Header = styled.View`
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
//   margin-top: 10px;
// `;
// export const TitleContainer = styled.View`
//   margin-top: 10px;
// `;

// export const SubTitle = styled.View`
//   flex-direction: row;
//   align-items: center;
//   gap: 5px; /* 👈 아이콘과 텍스트 사이 간격 (원하는 만큼 조절) */
// `;

// export const SubTitleText = styled(AppText)`
//   font-family: ${(props) => props.theme.fontFamily};
//   font-size: ${(props) => props.theme.typography.small}px;
//   color: #0fa6dd;
// `;

// export const Title = styled(AppText)`
//   color: ${BASIC_COLORS.TEXT_MAIN};
//   font-family: ${(props) => props.theme.fontFamily};
//   font-size: ${(props) => props.theme.typography.title}px;

//   margin-top: 4px;
// `;

// // export const SettingButton = styled.TouchableOpacity`
// //   width: 44px;
// //   height: 44px;
// //   border-radius: 22px;
// //   background-color: #ffffff;
// //   border-width: 1px;
// //   border-color: #dce4ec;
// //   align-items: center;
// //   justify-content: center;
// //   elevation: 2;
// //   shadow-color: #64748b;
// //   shadow-offset: 0px 2px;
// //   shadow-opacity: 0.1;
// //   shadow-radius: 4px;
// // `;
// export const SettingButton = styled.TouchableOpacity`
//   width: 48px; /* 기존 44px에서 살짝 키움 */
//   height: 48px;
//   border-radius: 24px;
//   background-color: #ffffff;
//   border-width: 1.5px; /* 테두리를 조금 더 선명하게 */
//   border-color: #cbd5e1;
//   align-items: center;
//   justify-content: center;
//   elevation: 4; /* 그림자를 더 진하게 주어 입체감 강조 */
//   shadow-color: #0f172a;
//   shadow-offset: 0px 4px;
//   shadow-opacity: 0.15;
//   shadow-radius: 6px;
// `;

// export const SettingButtonText = styled(AppText)`
//   font-size: 20px;
// `;

// export const GuideTextContainer = styled.View`
//   align-items: center;
//   padding-top: 20px;
// `;

// export const GuideText = styled(AppText)`
//   font-family: ${(props) => props.theme.fontFamily};
//   font-size: ${(props) => props.theme.typography.body}px;
//   color: #94a3b8;
// `;

// export const GameGrid = styled.View`
//   flex-direction: row;
//   flex-wrap: wrap;
//   justify-content: center;

//   /* 🌟 위아래 패딩과 좌우 패딩을 따로 지정해주기 (예: 세로 16px, 가로 14px) */
//   padding-top: 16px;
//   padding-bottom: 20px;
//   padding-left: 14px;
//   padding-right: 14px;

//   gap: 14px; // 카드와 카드 사이의 간격
// `;

// export const GameGridWrapper = styled.View`
//   background-color: rgba(255, 255, 255, 0.58);

//   border-radius: 50px;
//   overflow: hidden;
//   border-width: 1px;
//   border-color: rgba(255, 255, 255, 0.75);
//   margin-top: 50px;
// `;

// export const Footer = styled(AppText)`
//   text-align: center;
//   font-family: ${(props) => props.theme.fontFamily};
//   font-size: ${(props) => props.theme.typography.small}px;
//   color: #94a3b8;
//   margin-top: auto;
// `;

// // 🌟 새롭게 추가할 하단 설정 버튼 스타일
// export const BottomSettingButton = styled.TouchableOpacity`
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//   background-color: #ffffff;
//   border-width: 1px;
//   border-color: #dce4ec;
//   padding-vertical: 12px;
//   padding-horizontal: 24px;
//   border-radius: 25px;
//   margin-top: 20px;
//   align-self: center;
//   gap: 8px;
//   elevation: 2;
//   shadow-color: #64748b;
//   shadow-offset: 0px 2px;
//   shadow-opacity: 0.1;
//   shadow-radius: 4px;
// `;

// export const BottomSettingButtonText = styled(AppText)`
//   font-family: ${(props) => props.theme.fontFamily};
//   font-size: ${(props) => props.theme.typography.body}px;
//   color: ${BASIC_COLORS.TEXT_MAIN};
//   font-weight: 600;
// `;
import styled from "styled-components/native";
import { BASIC_COLORS } from "../../design-system/tokens/colors";
import { AppText } from "../../utils/AppText";
import { I18nManager } from "react-native";

const isRTL = I18nManager.isRTL;

export const Container = styled.View`
  flex: 1;
  padding: 24px;
  /* 💡 핵심: 작은 폰이든 갤럭시탭이든 컨테이너가 우측으로 밀리지 않고 화면 정중앙에 오도록 고정 */
  width: 100%;
  align-self: center;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

export const TitleContainer = styled.View`
  margin-top: 10px;
  align-items: ${isRTL ? "flex-end" : "flex-start"};
`;

export const SubTitle = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

export const SubTitleText = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.small}px;
  color: #0fa6dd;
  text-align: ${isRTL ? "right" : "left"};
`;

export const Title = styled(AppText)`
  color: ${BASIC_COLORS.TEXT_MAIN};
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.title}px;
  margin-top: 4px;
  text-align: ${isRTL ? "right" : "left"};
`;

export const GuideTextContainer = styled.View`
  align-items: center;
  padding-top: 20px;
`;

export const GuideText = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.body}px;
  color: #94a3b8;
  text-align: center;
`;

export const GameGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  padding-top: 16px;
  padding-bottom: 20px;
  padding-left: 14px;
  padding-right: 14px;

  gap: 14px;
`;

export const GameGridWrapper = styled.View`
  background-color: rgba(255, 255, 255, 0.58);
  border-radius: 50px;
  overflow: hidden;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.75);
  margin-top: 50px;

  /* 💡 래퍼 박스 크기가 쪼그라들지 않고 기기 크기에 맞춰 꽉 차게 하되 우측 잘림 방지 */
  width: 100%;
  align-self: center;
`;

export const Footer = styled(AppText)`
  text-align: center;
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.small}px;
  color: #94a3b8;
  margin-top: auto;
`;

export const BottomSettingButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-width: 1px;
  border-color: #dce4ec;
  padding-vertical: 12px;
  padding-horizontal: 24px;
  border-radius: 25px;
  margin-top: 20px;
  align-self: center;
  gap: 8px;
  elevation: 2;
  shadow-color: #64748b;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const BottomSettingButtonText = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.body}px;
  color: ${BASIC_COLORS.TEXT_MAIN};
  font-weight: 600;
  text-align: ${isRTL ? "right" : "left"};
`;
