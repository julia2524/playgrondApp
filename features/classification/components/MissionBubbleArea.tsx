import { MissionBubble, MissionText } from "../styles/classificationStyles";
import { GameTarget } from "../color/type/types";
import { COLOR_NAMES } from "../color/constants/colorPool";

interface MissionBubbleProps {
  feedback: string | null;
  target: GameTarget;
}
export default function MissionBubbleArea({
  feedback,
  target,
}: MissionBubbleProps) {
  return (
    <MissionBubble>
      <MissionText>
        {feedback ||
          `중앙에 모여 있는 ${
            target.color && COLOR_NAMES[target.color]
              ? COLOR_NAMES[target.color]
              : "아래"
          } 물건들과 같은 색을 찾아봐!`}
      </MissionText>
    </MissionBubble>
  );
}
