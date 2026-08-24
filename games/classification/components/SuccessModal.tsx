import { useState } from "react";
import {
  ButtonText,
  SuccessButton,
  SuccessButtons,
  SuccessEmoji,
  SuccessModalContent,
  SuccessModalOverlay,
  SuccessSubtitle,
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
        <SuccessEmoji>🌟</SuccessEmoji>
        <SuccessTitle>최고야! 레벨 클리어!</SuccessTitle>
        <SuccessSubtitle>모든 물건을 완벽하게 분류했어요 👏</SuccessSubtitle>

        <SuccessButtons>
          <SuccessButton variant="secondary" onPress={onRestart}>
            <ButtonText>다시 하기</ButtonText>
          </SuccessButton>

          <SuccessButton variant="primary" onPress={onNextLevel}>
            <ButtonText>다음 레벨</ButtonText>
          </SuccessButton>
        </SuccessButtons>
      </SuccessModalContent>
    </SuccessModalOverlay>
  );
}
