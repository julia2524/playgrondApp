import React from "react";
import { Modal, View } from "react-native";
import styled from "styled-components/native";

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

export default function CustomAlert({
  visible,
  title,
  message,
  onClose,
}: CustomAlertProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <Overlay>
        <AlertBox>
          <AlertTitle>{title}</AlertTitle>
          <AlertMessage>{message}</AlertMessage>
          <ConfirmButton onPress={onClose} activeOpacity={0.8}>
            <ConfirmButtonText>확인</ConfirmButtonText>
          </ConfirmButton>
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
  font-size: ${(props) => props.theme.typography.title}px;
  color: #333333;
  margin-bottom: 8px;
  text-align: center;
`;

const AlertMessage = styled.Text`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.subheading}px;
  color: #64748b;
  margin-bottom: 20px;
  text-align: center;
`;

const ConfirmButton = styled.TouchableOpacity`
  background-color: #0fa6dd;
  padding-vertical: 12px;
  padding-horizontal: 32px;
  border-radius: 16px;
  align-items: center;
`;

const ConfirmButtonText = styled.Text`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.button}px;
  color: #ffffff;
`;
