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
