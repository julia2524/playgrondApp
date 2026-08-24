import {
  BackText,
  Header,
  RoundIndicator,
  TitleText,
} from "../styles/classificationStyles";
import { ClassificationLevel } from "../types";

interface GameHeaderProps {
  levelConfig: ClassificationLevel;
  roundIndex: number;
}
export default function GameHeader({
  levelConfig,
  roundIndex,
}: GameHeaderProps) {
  return (
    <Header>
      <BackText>‹</BackText>
      <TitleText>🎨 오늘의 분류 (LEVEL {levelConfig.level})</TitleText>
      <RoundIndicator>{roundIndex + 1} / 5</RoundIndicator>
    </Header>
  );
}
