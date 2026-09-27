import React from "react";
import { Modal, Pressable } from "react-native";
import styled from "styled-components/native";
import { useLanguage } from "../context/LanguageContext";
import i18n from "../i18n";
import Ionicons from "@expo/vector-icons/Ionicons";

interface GuardianNoticeModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function GuardianNoticeModal({
  visible,
  onClose,
}: GuardianNoticeModalProps) {
  useLanguage();
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Overlay>
        <NoticeCard>
          {/* ==============================
              Header
          ============================== */}
          <Header>
            <Title>{i18n.t("guardian_notice_title")}</Title>

            <CloseButton
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="닫기"
            >
              <Ionicons name="close" size={28} color="#90A4AE" />
            </CloseButton>
          </Header>

          {/* ==============================
              Content
          ============================== */}
          <Content>
            <NoticeText>{i18n.t("guardian_notice_p1")}</NoticeText>

            <NoticeText>{i18n.t("guardian_notice_p2")}</NoticeText>

            <NoticeText>{i18n.t("guardian_notice_p3")}</NoticeText>

            <GuideText>{i18n.t("guardian_notice_guide")}</GuideText>

            <SettingGuide>
              {i18n.t("guardian_notice_setting_1")}
              <SettingGuideBold>
                {i18n.t("guardian_notice_setting_2")}
              </SettingGuideBold>
            </SettingGuide>
          </Content>

          {/* ==============================
              Confirm
          ============================== */}
          <ConfirmButton onPress={onClose}>
            <ConfirmText>{i18n.t("confirm")}</ConfirmText>
          </ConfirmButton>
        </NoticeCard>
      </Overlay>
    </Modal>
  );
}

/* ==================================================
   Styles
================================================== */

const Overlay = styled.View`
  flex: 1;

  background-color: rgba(0, 0, 0, 0.45);

  align-items: center;
  justify-content: center;

  padding: 24px;
`;

const NoticeCard = styled.View`
  width: 100%;
  max-width: 360px;

  background-color: #ffffff;

  border-radius: 24px;

  padding: 24px;

  elevation: 10;

  shadow-color: #000000;
  shadow-opacity: 0.15;
  shadow-radius: 16px;
  shadow-offset: 0px 6px;
`;

const Header = styled.View`
  flex-direction: row;

  align-items: center;
  justify-content: space-between;

  margin-bottom: 20px;
`;

const Title = styled.Text`
  font-size: 22px;
  font-weight: 700;

  color: #263238;
`;

const CloseButton = styled(Pressable)`
  width: 36px;
  height: 36px;

  align-items: center;
  justify-content: center;
`;

const Content = styled.View`
  margin-bottom: 20px;
`;

const NoticeText = styled.Text`
  font-size: 15px;
  line-height: 23px;

  color: #455a64;

  margin-bottom: 14px;
`;

const GuideText = styled.Text`
  font-size: 13px;
  line-height: 20px;

  color: #78909c;

  margin-bottom: 16px;
`;

const SettingGuide = styled.Text`
  font-size: 13px;
  line-height: 20px;

  color: #78909c;

  background-color: #f7f8fa;

  border-radius: 12px;

  padding: 12px;
`;

const SettingGuideBold = styled.Text`
  font-weight: 700;

  color: #5c6bc0;
`;

const ConfirmButton = styled(Pressable)`
  height: 50px;

  border-radius: 16px;

  align-items: center;
  justify-content: center;

  background-color: #5c6bc0;
`;

const ConfirmText = styled.Text`
  font-size: 16px;
  font-weight: 700;

  color: #ffffff;
`;
