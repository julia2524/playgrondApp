import styled from "styled-components/native";
import { Switch } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import AppHeader from "../../components/common/AppHeader";
import ResetProgressButton from "../../components/common/ResetProgressButton";

import { RootStackParamList } from "../../navigation/types";
import { BASIC_COLORS } from "../../design-system/tokens/colors";

import DecorativeBackground from "../../design-system/backgrounds/DecorativeBackground";
import GradientBackground from "../../design-system/backgrounds/GradientBackground";

import { clearGameProgress } from "../classification/progress/progressStorage";
import { useEffect, useState } from "react";
import {
  Container,
  Content,
  Divider,
  HeaderCenter,
  Section,
  SectionTitle,
  SettingCard,
  SettingDescription,
  SettingIcon,
  SettingInfo,
  SettingRow,
  SettingTextWrapper,
  SettingTitle,
  StyledSwitch,
  Title,
} from "./SettingScreenStyles";
import CustomAlert from "../../components/common/CustomAlert";
import {
  getSoundEnabled,
  setSoundEnabled,
} from "../audio/audioSettingsStorage";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SettingScreen"
>;

export default function SettingScreen() {
  const navigation = useNavigation<NavigationProp>();

  // =========================
  // 게임 진행 상황 초기화
  // =========================
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertConfirmAction, setAlertConfirmAction] = useState<
    (() => void) | undefined
  >();
  const [alertShowCancel, setAlertShowCancel] = useState(false);
  const [alertConfirmText, setAlertConfirmText] = useState("확인"); // 알럿 띄우는 헬퍼 함수
  const showAlert = (
    title: string,
    message: string,
    onConfirm?: () => void,
    options?: { showCancel?: boolean; confirmText?: string },
  ) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertConfirmAction(() => onConfirm);
    setAlertShowCancel(options?.showCancel ?? false);
    setAlertConfirmText(options?.confirmText ?? "확인");
    setAlertVisible(true);
  };
  // 알럿 확인 버튼
  const handleAlertConfirm = () => {
    setAlertVisible(false);
    alertConfirmAction?.();
  };
  // 알럿 취소 버튼
  const handleAlertCancel = () => {
    setAlertVisible(false);
  };
  // 색깔 놀이 초기화
  const handleResetColor = () => {
    showAlert(
      "처음부터 다시 시작할까요?",
      `색깔 놀이의 진행 상황이\n 모두 사라져요.`,
      async () => {
        await clearGameProgress("color");
        showAlert(
          "초기화 완료",
          `색깔 놀이를\n 처음부터 다시 시작할 수 있어요!`,
        );
      },
      { showCancel: true, confirmText: "다시 시작" },
    );
  };
  // 모양 놀이 초기화
  const handleResetShape = () => {
    showAlert(
      "처음부터 다시 시작할까요?",
      `모양 놀이의 진행 상황이\n 모두 사라져요.`,
      async () => {
        await clearGameProgress("shape");
        showAlert(
          "초기화 완료",
          `모양 놀이를\n 처음부터 다시 시작할 수 있어요!`,
        );
      },
      { showCancel: true, confirmText: "다시 시작" },
    );
  };

  // =========================
  // 임시 소리 설정
  // =========================

  const [soundEffect, setSoundEffect] = useState(true);
  const [backgroundMusic, setBackgroundMusic] = useState(true);
  const [correctEffect, setCorrectEffect] = useState(true);

  useEffect(() => {
    const loadSoundSetting = async () => {
      const enabled = await getSoundEnabled();
      setSoundEffect(enabled);
    };

    loadSoundSetting();
  }, []);

  const handleSoundToggle = async (value: boolean) => {
    setSoundEffect(value);
    await setSoundEnabled(value);
  };

  return (
    <Container>
      <GradientBackground />

      <AppHeader
        onBack={() => navigation.goBack()}
        center={
          <HeaderCenter>
            <Title>설정</Title>
          </HeaderCenter>
        }
      />

      <Content>
        {/* =========================
            소리 설정
           ========================= */}

        <Section>
          <SectionTitle>소리 설정</SectionTitle>

          <SettingCard>
            <SettingRow>
              <SettingInfo>
                <SettingIcon>🔊</SettingIcon>

                <SettingTextWrapper>
                  <SettingTitle>효과음</SettingTitle>
                  <SettingDescription>
                    버튼을 누르거나 게임할 때 나는 소리
                  </SettingDescription>
                </SettingTextWrapper>
              </SettingInfo>

              <StyledSwitch
                value={soundEffect}
                onValueChange={handleSoundToggle}
              />
            </SettingRow>

            <Divider />

            <SettingRow>
              <SettingInfo>
                <SettingIcon>🎵</SettingIcon>

                <SettingTextWrapper>
                  <SettingTitle>배경음악</SettingTitle>
                  <SettingDescription>
                    게임을 하는 동안 음악을 재생해요
                  </SettingDescription>
                </SettingTextWrapper>
              </SettingInfo>

              <StyledSwitch
                value={backgroundMusic}
                onValueChange={setBackgroundMusic}
              />
            </SettingRow>

            <Divider />

            <SettingRow>
              <SettingInfo>
                <SettingIcon>✨</SettingIcon>

                <SettingTextWrapper>
                  <SettingTitle>정답 효과</SettingTitle>
                  <SettingDescription>
                    정답을 맞혔을 때 효과음을 재생해요
                  </SettingDescription>
                </SettingTextWrapper>
              </SettingInfo>

              <StyledSwitch
                value={correctEffect}
                onValueChange={setCorrectEffect}
              />
            </SettingRow>
          </SettingCard>
        </Section>

        {/* =========================
            진행 상황 초기화
           ========================= */}

        <Section>
          <SectionTitle>게임 기록</SectionTitle>
          <SettingCard>
            <ResetProgressButton gameType="color" onPress={handleResetColor} />
            <ResetProgressButton gameType="shape" onPress={handleResetShape} />
          </SettingCard>
          <CustomAlert
            visible={alertVisible}
            title={alertTitle}
            message={alertMessage}
            onClose={handleAlertConfirm}
            showCancel={alertShowCancel}
            onCancel={handleAlertCancel}
            confirmText={alertConfirmText}
          />
        </Section>
      </Content>
    </Container>
  );
}
