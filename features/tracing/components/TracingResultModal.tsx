import React from "react";
import { Modal, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type { TracingStageResult } from "../hooks/useTracingGame";

import { AppText } from "../../../utils/AppText";
import { BASIC_COLORS, PASTEL_BG } from "../../../design-system/tokens/colors";
import Mascot from "../../../design-system/ui/Mascot";
import StarBadge from "../../../design-system/ui/StarBadge";
import CloudLevelBadge from "../../../components/common/CloudLevelBadge";
import { RootStackParamList } from "../../../navigation/types";
import { triggerHaptic } from "../../../utils/haptic";

interface TracingResultModalProps {
  visible: boolean;
  result: TracingStageResult | null;
  onNext: () => void;
  onRestart: () => void;
  onClose: () => void;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function TracingResultModal({
  visible,
  result,
  onNext,
  onRestart,
  onClose,
}: TracingResultModalProps) {
  const navigation = useNavigation<NavigationProp>();

  if (!visible || !result) return null;

  const isLastStage = result.isLastStage;

  const handleRestart = () => {
    triggerHaptic("light");
    onRestart();
  };

  const handleNext = () => {
    triggerHaptic("light");
    onNext();
  };

  const handleClose = () => {
    triggerHaptic("light");
    onClose();
  };

  const handleHome = () => {
    triggerHaptic("light");
    navigation.navigate("Home");
  };

  const starOffsets = [18, 6, 0, 6, 18];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <Overlay>
        <ModalContent>
          {/* X 버튼 */}
          <CloseButton onPress={handleClose} activeOpacity={0.7}>
            <Ionicons name="close" size={26} color={BASIC_COLORS.PRIMARY} />
          </CloseButton>

          {/* 구름 스테이지 배지 */}
          <CloudBadgeWrapper>
            <CloudLevelBadge size={300} />
            <LevelText>STAGE {result.stageNo}</LevelText>
          </CloudBadgeWrapper>

          <ModalInner>
            {/* 별 */}
            <StarRow>
              {Array.from({ length: 5 }).map((_, index) => (
                <StarWrapper
                  key={index}
                  style={{ marginTop: starOffsets[index] }}
                >
                  <StarBadge
                    type={index < result.remainingStars ? "full" : "empty"}
                    size={33}
                  />
                </StarWrapper>
              ))}
            </StarRow>

            {/* 성공 메시지 */}
            {/* <SuccessTitle>참 잘했어요!</SuccessTitle> */}

            {/* 마스코트 */}
            <MascotWrapper>
              <Mascot size={120} />
            </MascotWrapper>

            {/* 다시 하기 / 다음 스테이지 */}
            <SuccessButtons>
              <SuccessButton
                variant="secondary"
                onPress={handleRestart}
                activeOpacity={0.85}
              >
                <Ionicons
                  name="refresh"
                  size={30}
                  color={BASIC_COLORS.CARD_BG}
                />
              </SuccessButton>

              <SuccessButton
                variant="primary"
                onPress={handleNext}
                activeOpacity={0.85}
              >
                <Ionicons
                  name={isLastStage ? "trophy" : "arrow-forward"}
                  size={30}
                  color={BASIC_COLORS.CARD_BG}
                />
              </SuccessButton>
            </SuccessButtons>

            {/* 홈 버튼 */}
            <HomeButton onPress={handleHome} activeOpacity={0.85}>
              <Ionicons name="home" size={22} color={BASIC_COLORS.CARD_BG} />
            </HomeButton>
          </ModalInner>
        </ModalContent>
      </Overlay>
    </Modal>
  );
}

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(44, 62, 80, 0.45);
  align-items: center;
  justify-content: center;
  padding-horizontal: 28px;
`;

const ModalContent = styled.View`
  width: 86%;
  max-width: 360px;
  background-color: ${PASTEL_BG.blue};
  border-radius: 34px;
  padding: 6px;
  border-width: 3px;
  border-color: ${BASIC_COLORS.PRIMARY};
  elevation: 14;
  shadow-color: ${BASIC_COLORS.PRIMARY};
  shadow-offset: 0px 6px;
  shadow-opacity: 0.22;
  shadow-radius: 10px;
  position: relative;
`;

const ModalInner = styled.View`
  width: 100%;
  background-color: ${BASIC_COLORS.CARD_BG};
  border-radius: 28px;
  padding: 24px 22px 22px;
  align-items: center;
  border-width: 2px;
  border-color: #ffffff;
`;

const CloseButton = styled(TouchableOpacity)`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  z-index: 30;
  border-width: 1.5px;
  border-color: #dbe4ee;
  elevation: 3;
`;

const CloudBadgeWrapper = styled.View`
  position: absolute;
  top: -90px;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const LevelText = styled(AppText)`
  position: absolute;
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.heading}px;
  color: ${BASIC_COLORS.PRIMARY};
  text-align: center;
  top: 50px;
`;

const StarRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  /* margin-bottom: 18px; */
`;

const StarWrapper = styled.View`
  margin-horizontal: 1px;
  align-items: center;
  justify-content: center;
`;

const SuccessTitle = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.title}px;
  color: ${BASIC_COLORS.PRIMARY};
  text-align: center;
  margin-top: -25px;
`;

const MascotWrapper = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: -10px;
`;

const SuccessButtons = styled.View`
  flex-direction: row;
  justify-content: center;
  width: 100%;
  gap: 14px;
  margin-top: 4px;
`;

const SuccessButton = styled(TouchableOpacity)<{
  variant?: "primary" | "secondary";
}>`
  flex: 1;
  min-height: 58px;
  align-items: center;
  justify-content: center;
  border-radius: 28px;
  background-color: ${(props) =>
    props.variant === "primary" ? BASIC_COLORS.SUCCESS : BASIC_COLORS.ACCENT};
  border-width: 2px;
  border-color: ${(props) =>
    props.variant === "primary" ? "#6AC8A3" : "#FFB54A"};
  border-bottom-width: 5px;
  border-bottom-color: ${(props) =>
    props.variant === "primary" ? "#2E8F69" : "#D97900"};
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.16;
  shadow-radius: 5px;
`;

const HomeButton = styled(TouchableOpacity)`
  width: 100%;
  height: 48px;
  margin-top: 10px;
  border-radius: 24px;
  background-color: ${BASIC_COLORS.PRIMARY};
  align-items: center;
  justify-content: center;
  flex-direction: row;
  border-width: 2px;
  border-color: #7b9fcf;
  border-bottom-width: 4px;
  border-bottom-color: #5277aa;
  elevation: 4;
`;
