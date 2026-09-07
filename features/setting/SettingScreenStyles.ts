// ==================================================
// Container
// ==================================================

import styled from "styled-components/native";
import { BASIC_COLORS } from "../../design-system/tokens/colors";
import { Switch } from "react-native";

export const Container = styled.View`
  flex: 1;
`;

// ==================================================
// Header
// ==================================================

export const HeaderCenter = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-family: ${(props) => props.theme.fontFamily};

  font-size: ${(props) => props.theme.typography.heading}px;

  color: ${BASIC_COLORS.TEXT_MAIN};

  text-align: center;
`;

// ==================================================
// Content
// ==================================================

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

// ==================================================
// Section
// ==================================================

export const Section = styled.View`
  margin-bottom: 28px;
`;

export const SectionTitle = styled.Text`
  margin-bottom: 8px;
  padding-left: 20px;
  font-family: ${(props) => props.theme.fontFamily};

  font-size: ${(props) => props.theme.typography.subheading}px;

  font-weight: 700;

  color: ${BASIC_COLORS.TEXT_MAIN};
`;

// ==================================================
// Setting Card
// ==================================================

export const SettingCard = styled.View`
  padding: 16px;
  gap: 8px;
  background-color: rgba(255, 255, 255, 0.9);

  border-radius: 22px;

  border-width: 1px;
  border-color: rgba(91, 75, 75, 0.08);
`;

// ==================================================
// Setting Row
// ==================================================

export const SettingRow = styled.View`
  min-height: 76px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SettingInfo = styled.View`
  flex: 1;

  flex-direction: row;
  align-items: center;
`;

export const SettingIcon = styled.Text`
  width: 38px;

  margin-right: 10px;

  font-size: ${(props) => props.theme.typography.heading}px;

  text-align: center;
`;

export const SettingTextWrapper = styled.View`
  flex: 1;
`;

export const SettingTitle = styled.Text`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.body}px;
  font-weight: 700;

  color: ${BASIC_COLORS.TEXT_MAIN};
`;

export const SettingDescription = styled.Text`
  margin-top: 3px;

  font-family: ${(props) => props.theme.fontFamily};

  font-size: ${(props) => props.theme.typography.small}px;

  color: #8b7b7b;
`;

// ==================================================
// Divider
// ==================================================

export const Divider = styled.View`
  height: 1px;

  background-color: rgba(91, 75, 75, 0.08);
`;

// ==================================================
// Switch
// ==================================================

export const StyledSwitch = styled(Switch).attrs({
  trackColor: {
    false: "#D8D0CC",
    true: "#9ED6A5",
  },
  thumbColor: "#FFFFFF",
  ios_backgroundColor: "#D8D0CC",
})``;
