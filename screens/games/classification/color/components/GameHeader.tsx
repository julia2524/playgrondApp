import { TouchableOpacity } from "react-native";
import {
  BackText,
  Header,
  RoundIndicator,
  TitleText,
} from "../styles/classificationStyles";
import { ClassificationLevel } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../../navigation/types";
import { useNavigation } from "@react-navigation/native";

interface GameHeaderProps {
  levelConfig: ClassificationLevel;
  roundIndex: number;
}
type GameHeaderNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export default function GameHeader({
  levelConfig,
  roundIndex,
}: GameHeaderProps) {
  const navigation = useNavigation<GameHeaderNavigationProp>();
  const goToHome = () => {
    navigation.goBack();
  };
  return (
    <Header>
      <TouchableOpacity onPress={goToHome} activeOpacity={0.7}>
        <BackText>‹</BackText>
      </TouchableOpacity>
      <TitleText>🎨 색깔 분류 (LEVEL {levelConfig.level})</TitleText>
      <RoundIndicator>{roundIndex + 1} / 5</RoundIndicator>
    </Header>
  );
}
