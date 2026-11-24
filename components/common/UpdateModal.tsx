import React from "react";

import { ActivityIndicator, Image, Modal, Platform } from "react-native";

import styled from "styled-components/native";

import { AppText } from "../../utils/AppText";

import i18n from "../../i18n";
import { ASSETS } from "../../assets/assets";

interface UpdateModalProps {
  visible: boolean;
  isUpdating: boolean;
  onUpdate: () => void | Promise<void>;
  onLater: () => void | Promise<void>;
}

export default function UpdateModal({
  visible,
  isUpdating,
  onUpdate,
  onLater,
}: UpdateModalProps) {
  const handleLater = () => {
    if (isUpdating) return;
    onLater();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={handleLater}
    >
      <Overlay>
        <ModalContainer>
          {/* 업데이트 마스코트 */}
          <UpdateMascot>
            <Image
              source={ASSETS.updateMascot}
              style={{
                width: 144,
                height: 144,
              }}
              resizeMode="contain"
            />
          </UpdateMascot>

          {/* 안내 문구 */}
          <Eyebrow>{i18n.t("updateModal_eyebrow")}</Eyebrow>

          <Title>{i18n.t("updateModal_title")}</Title>

          <Description>{i18n.t("updateModal_description")}</Description>

          {/* 업데이트 안내 */}
          <InfoBox>
            <InfoText>{i18n.t("updateModal_infoText")}</InfoText>
          </InfoBox>

          {/* 업데이트 버튼 */}
          <UpdateButton
            onPress={onUpdate}
            disabled={isUpdating}
            isUpdating={isUpdating}
          >
            {({ pressed }) =>
              isUpdating ? (
                <LoadingRow>
                  <ActivityIndicator color="#FFFFFF" size="small" />
                  <UpdateButtonText>
                    {i18n.t("updateModal_updating")}
                  </UpdateButtonText>
                </LoadingRow>
              ) : (
                <UpdateButtonText
                  style={{
                    opacity: pressed ? 0.86 : 1,
                  }}
                >
                  {i18n.t("updateModal_updateButton")}
                </UpdateButtonText>
              )
            }
          </UpdateButton>

          {/* 나중에 버튼 */}
          <LaterButton onPress={handleLater} disabled={isUpdating}>
            <LaterButtonText isUpdating={isUpdating}>
              {i18n.t("updateModal_laterButton")}
            </LaterButtonText>
          </LaterButton>

          <Footer>{i18n.t("updateModal_footer")}</Footer>
        </ModalContainer>
      </Overlay>
    </Modal>
  );
}

// ==========================================
// Styles
// ==========================================

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(65, 55, 75, 0.48);
  justify-content: center;
  align-items: center;
  padding-horizontal: 24px;
`;

const ModalContainer = styled.View`
  width: 100%;
  max-width: 370px;
  background-color: #fffdf9;
  border-radius: 32px;
  padding-horizontal: 26px;
  padding-top: 26px;
  padding-bottom: 24px;
  align-items: center;
  overflow: hidden;

  ${Platform.select({
    android: `
      elevation: 14;
    `,
    ios: `
      shadow-color: #786b83;
      shadow-offset: 0px 10px;
      shadow-opacity: 0.18;
      shadow-radius: 20px;
    `,
  })}
`;

const UpdateMascot = styled.View`
  width: 154px;
  height: 154px;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

const Eyebrow = styled(AppText)`
  color: #b49acb;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 2px;
  margin-bottom: 12px;
`;

const Title = styled(AppText)`
  color: #55465e;
  font-size: 24px;
  font-weight: 800;
  line-height: 34px;
  text-align: center;
  margin-bottom: 12px;
`;

const Description = styled(AppText)`
  color: #928795;
  font-size: 14px;
  font-weight: 500;
  line-height: 23px;
  text-align: center;
`;

const InfoBox = styled.View`
  width: 100%;
  min-height: 66px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #fff4e9;
  border-radius: 18px;
  padding-horizontal: 14px;
  padding-vertical: 12px;
  margin-top: 22px;
  margin-bottom: 20px;
`;

const InfoText = styled(AppText)`
  color: #a78670;
  font-size: 12px;
  font-weight: 700;
  line-height: 19px;
  text-align: center;
  flex-shrink: 1;
`;

interface UpdateButtonProps {
  isUpdating: boolean;
}

const UpdateButton = styled.Pressable<UpdateButtonProps>`
  width: 100%;
  min-height: 54px;
  background-color: #a995d5;
  border-radius: 19px;
  justify-content: center;
  align-items: center;
  opacity: ${({ isUpdating }) => (isUpdating ? 0.7 : 1)};
`;

const ButtonContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const UpdateButtonText = styled(AppText)`
  color: #ffffff;
  font-size: 16px;
  font-weight: 800;
`;

const LoadingRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const LaterButton = styled.Pressable`
  padding-horizontal: 24px;
  padding-vertical: 15px;
`;

interface LaterButtonTextProps {
  isUpdating: boolean;
}

const LaterButtonText = styled(AppText)<LaterButtonTextProps>`
  color: #aaa0ad;
  font-size: 13px;
  font-weight: 600;
  opacity: ${({ isUpdating }) => (isUpdating ? 0.4 : 1)};
`;

const Footer = styled(AppText)`
  color: #c6bbc8;
  font-size: 10px;
  font-weight: 500;
  margin-top: 3px;
`;
