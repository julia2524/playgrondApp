import Ionicons from "@expo/vector-icons/Ionicons";

import styled from "styled-components/native";

interface SettingButtonProps {
  onPress: () => void;
}

export default function SettingButton({ onPress }: SettingButtonProps) {
  return (
    <SettingButtonContainer
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="설정"
    >
      <SettingIcon name="settings-outline" />
    </SettingButtonContainer>
  );
}
export const SettingButtonContainer = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
`;

const SettingIcon = styled(Ionicons).attrs({
  size: 22,
  color: "#475569",
})``;
