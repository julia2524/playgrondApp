import {
  ButtonText,
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
import { STAGE_CONFIGS } from "../../../../StageMap/stageConfigs";

interface SuccessModalProps {
  show: boolean;

  level: number;

  earnedStars: number;

  onRestart: () => void;

  onNextLevel: () => void;
}

type GameOverNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SuccessModal({
  show,
  level,
  earnedStars,
  onRestart,
  onNextLevel,
}: SuccessModalProps) {
  const navigation = useNavigation<GameOverNavigationProp>();

  if (!show) return null;

  const currentStageIndex = STAGE_CONFIGS.findIndex(
    (stage) => stage.level === level,
  );

  const isLastLevel = currentStageIndex === STAGE_CONFIGS.length - 1;

  const onGoHome = () => {
    navigation.navigate("Home");
  };

  return (
    <SuccessModalOverlay>
      <SuccessModalContent>
        <SuccessMascotWrapper>
          <Mascot size={100} />
        </SuccessMascotWrapper>

        <SuccessEmojiRow>
          {Array.from({ length: earnedStars }).map((_, index) => (
            <SuccessEmoji key={index} style={{ fontSize: 28 }}>
              🌟
            </SuccessEmoji>
          ))}
        </SuccessEmojiRow>

        <SuccessTitle>최고야! 레벨 클리어!</SuccessTitle>

        <SuccessSubtitle>10개의 문제를 모두 완료했어요 👏</SuccessSubtitle>

        <SuccessButtons>
          <SuccessButton variant="secondary" onPress={onRestart}>
            <ButtonText>다시 하기</ButtonText>
          </SuccessButton>

          {!isLastLevel ? (
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
