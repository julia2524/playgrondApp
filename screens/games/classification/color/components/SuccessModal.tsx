import { useState } from "react";
import {
  ButtonText,
  MascotWrapper,
  SuccessButton,
  SuccessButtons,
  SuccessEmoji,
  SuccessEmojiRow,
  SuccessMascotWrapper,
  SuccessModalContent,
  SuccessModalOverlay,
  SuccessSubtitle,
  SuccessTitle,
} from "../styles/classificationStyles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../../navigation/types";
import { useNavigation } from "@react-navigation/native";
import Mascot from "../../../../../components/common/Mascot";

interface SuccessModalProps {
  show: boolean;
  levelIndex: number;
  onRestart: () => void;
  onNextLevel: () => void;
}

type GameOverNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export default function SuccessModal({
  show,
  levelIndex,
  onRestart,
  onNextLevel,
}: SuccessModalProps) {
  if (!show) return null;
  const navigation = useNavigation<GameOverNavigationProp>();
  const onGoHome = () => {
    navigation.navigate("Home"); // 👈 화살표로 감싸지 말고 곧바로 실행!
  };
  const filledStars = levelIndex + 1;
  return (
    <SuccessModalOverlay>
      <SuccessModalContent>
        <SuccessMascotWrapper>
          <Mascot size={100} />
        </SuccessMascotWrapper>
        <SuccessEmojiRow>
          {Array.from({ length: filledStars }).map((_, i) => (
            <SuccessEmoji key={i} style={{ fontSize: 28 }}>
              {i < filledStars ? "🌟" : ""}
            </SuccessEmoji>
          ))}
        </SuccessEmojiRow>

        <SuccessTitle>최고야! 레벨 클리어!</SuccessTitle>
        <SuccessSubtitle>모든 물건을 완벽하게 분류했어요 👏</SuccessSubtitle>

        <SuccessButtons>
          <SuccessButton variant="secondary" onPress={onRestart}>
            <ButtonText>다시 하기</ButtonText>
          </SuccessButton>

          {levelIndex !== 4 ? (
            <SuccessButton variant="primary" onPress={onNextLevel}>
              <ButtonText>다음 레벨</ButtonText>
            </SuccessButton>
          ) : (
            <SuccessButton variant="primary" onPress={onGoHome}>
              <ButtonText>홈으로</ButtonText>
            </SuccessButton>
          )}
        </SuccessButtons>
      </SuccessModalContent>
    </SuccessModalOverlay>
  );
}
