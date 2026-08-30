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

  // ⭐ 실제 획득 별
  earnedStars: number;
}

type GameHeaderNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function GameHeader({
  levelConfig,
  roundIndex,
  earnedStars,
}: GameHeaderProps) {
  const totalStars = 5;

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
        {Array.from({ length: totalStars }).map((_, index) => {
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

          return <StarBadge key={index} type={type} />;
        })}
      </StarRow>

      <MascotWrapper>
        <Mascot size={100} />
      </MascotWrapper>
    </GameHeaders>
  );
}
