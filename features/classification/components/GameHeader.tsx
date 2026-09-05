import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useNavigation } from "@react-navigation/native";

import { RootStackParamList } from "../../../navigation/types";
import Mascot from "../../../design-system/ui/Mascot";
import AppHeader from "../../../components/common/AppHeader";
import StarBadge from "../../../design-system/ui/StarBadge";
import GradientBackground from "../../../design-system/backgrounds/GradientBackground";
import { ColorLevelConfig } from "../color/type/types";
import {
  GameHeaderCenter,
  GameHeaders,
  MascotWrapper,
  StarRow,
  TitleText,
} from "../styles/classificationStyles";
import SunBadge from "../../../design-system/ui/SunBadge";
import GameRewardBadge from "./GameRewardBadge";

interface GameHeaderProps {
  gameType: "color" | "shape"; // 🌟 추가
  // levelConfig: ColorLevelConfig;
  // roundIndex: number;
  earnedStars: number; // ⭐ 실제 획득 별
}

type GameHeaderNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function GameHeader({
  gameType, // 🌟 받아서 사용
  earnedStars,
}: GameHeaderProps) {
  const totalStars = 5;

  const navigation = useNavigation<GameHeaderNavigationProp>();
  const headerTitle = gameType === "shape" ? "모양 찾기" : "색깔 찾기";

  // const renderSvg = (key: number, type: "full" | "half" | "empty") => {
  //   if (gameType === "color") {
  //     return <StarBadge key={key} type={type} />;
  //   }
  //   if (gameType === "shape") {
  //     return <SunBadge key={key} type={type} />;
  //   }
  //   return <StarBadge key={key} type={type} />;
  // };

  return (
    <GameHeaders>
      <GradientBackground />

      <AppHeader
        onBack={() => navigation.goBack()}
        center={
          <GameHeaderCenter>
            <TitleText>{headerTitle}</TitleText>
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

          return (
            <GameRewardBadge key={index} gameType={gameType} type={type} />
          );
        })}
      </StarRow>

      <MascotWrapper>
        <Mascot size={100} />
      </MascotWrapper>
    </GameHeaders>
  );
}
