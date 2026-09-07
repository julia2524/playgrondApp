import React from "react";
import { Modal } from "react-native";
import styled from "styled-components/native";

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;

  // 확인 버튼을 눌렀을 때
  onClose: () => void;

  // 취소/확인 두 버튼이 필요한 경우
  showCancel?: boolean;
  onCancel?: () => void;

  // 확인 버튼에 표시할 글자
  confirmText?: string;
}

export default function CustomAlert({
  visible,
  title,
  message,
  onClose,
  showCancel = false,
  onCancel,
  confirmText = "확인",
}: CustomAlertProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <Overlay>
        <AlertBox>
          <AlertTitle>{title}</AlertTitle>

          <AlertMessage>{message}</AlertMessage>

          <ButtonContainer>
            {showCancel && (
              <CancelButton onPress={onCancel} activeOpacity={0.8}>
                <CancelButtonText>취소</CancelButtonText>
              </CancelButton>
            )}

            <ConfirmButton onPress={onClose} activeOpacity={0.8}>
              <ConfirmButtonText>{confirmText}</ConfirmButtonText>
            </ConfirmButton>
          </ButtonContainer>
        </AlertBox>
      </Overlay>
    </Modal>
  );
}

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
`;

const AlertBox = styled.View`
  width: 80%;
  max-width: 320px;
  background-color: #ffffff;
  border-radius: 24px;
  padding: 24px;
  align-items: center;
  border-width: 2px;
  border-color: #dce4ec;
`;

const AlertTitle = styled.Text`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.heading}px;
  color: #333333;
  margin-bottom: 8px;
  text-align: center;
`;

const AlertMessage = styled.Text`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.button}px;
  color: #64748b;
  margin-bottom: 20px;
  text-align: center;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const ConfirmButton = styled.TouchableOpacity`
  background-color: #0fa6dd;
  padding-vertical: 12px;
  padding-horizontal: 28px;
  border-radius: 16px;
  align-items: center;
`;

const ConfirmButtonText = styled.Text`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.button}px;
  color: #ffffff;
`;

const CancelButton = styled.TouchableOpacity`
  background-color: #eef2f5;
  padding-vertical: 12px;
  padding-horizontal: 28px;
  border-radius: 16px;
  align-items: center;
`;

const CancelButtonText = styled.Text`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.button}px;
  color: #64748b;
`;
