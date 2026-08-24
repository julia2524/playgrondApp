import { useState } from "react";
import {
  ButtonText,
  SuccessButton,
  SuccessModalContent,
  SuccessModalOverlay,
  SuccessTitle,
} from "../styles/classificationStyles";

interface SuccessModalProps {
  show: boolean;
  onRestart: () => void;
  onNextLevel: () => void;
}

export default function SuccessModal({
  show,
  onRestart,
  onNextLevel,
}: SuccessModalProps) {
  if (!show) return null;
  return (
    <SuccessModalOverlay>
      <SuccessModalContent>
        <SuccessTitle>🎉 레벨 클리어! 🎉</SuccessTitle>
        <SuccessButton onPress={onRestart}>
          <ButtonText>다시 하기</ButtonText>
        </SuccessButton>
        <SuccessButton onPress={onNextLevel}>
          <ButtonText>다시 하기</ButtonText>
        </SuccessButton>
      </SuccessModalContent>
    </SuccessModalOverlay>
  );
}
