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
import CandyStar from "../../../../../components/common/CandyStar";

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
          {Array.from({ length: 5 }).map((_, index) => {
            const starPosition = index + 1;

            let type: "full" | "half" | "empty" = "empty";

            // ⭐ 꽉 찬 별
            if (earnedStars >= starPosition) {
              type = "full";
            }

            // ⭐ 반개 별
            else if (earnedStars >= starPosition - 0.5) {
              type = "half";
            }

            // // ⭐ 획득하지 않은 별은 표시하지 않음
            if (type === "empty") {
              return null;
            }

            return <CandyStar key={index} size={36} type={type} />;
          })}
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
