import { Text } from "react-native";
import {
  GameHeaderCenter,
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
    <AppHeader
      onBack={() => navigation.goBack()}
      center={
        <GameHeaderCenter>
          <TitleText>색깔 찾기</TitleText>

          <StarRow>
            {Array.from({ length: totalRounds }).map((_, i) => (
              <Text key={i} style={{ fontSize: 18 }}>
                {i < filledStars ? "⭐" : "☆"}
              </Text>
            ))}
          </StarRow>
        </GameHeaderCenter>
      }
      right={
        <MascotWrapper>
          <Mascot size={72} />
        </MascotWrapper>
      }
    />
  );
}
