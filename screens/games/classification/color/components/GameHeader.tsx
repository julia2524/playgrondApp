import {
  GameHeaderCenter,
  GameHeaders,
  MascotWrapper,
  StarRow,
  TitleText,
} from "../styles/classificationStyles";

import { ClassificationLevel } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../../navigation/types";
import { useNavigation } from "@react-navigation/native";
import Mascot from "../../../../../components/common/Mascot";
import AppHeader from "../../../../../components/common/AppHeader";
import StarBadge from "../../../../../components/common/StarBadge";
import GradientBackground from "../../../../../components/common/GradientBackground";

interface GameHeaderProps {
  levelConfig: ClassificationLevel;
  roundIndex: number;
}

type GameHeaderNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function GameHeader({
  levelConfig,
  roundIndex,
}: GameHeaderProps) {
  const totalRounds = 5;

  const filledStars = roundIndex + 1;

  const navigation = useNavigation<GameHeaderNavigationProp>();

  return (
    <GameHeaders>
      <GradientBackground />
      <AppHeader
        onBack={() => navigation.goBack()}
        center={
          <GameHeaderCenter>
            <TitleText>색깔 찾기</TitleText>
          </GameHeaderCenter>
        }
      />
      <StarRow>
        {Array.from({ length: totalRounds }).map((_, i) => (
          <StarBadge key={i} filled={i < filledStars} />
        ))}
      </StarRow>
      <MascotWrapper>
        <Mascot size={100} />
      </MascotWrapper>
    </GameHeaders>
  );
}
