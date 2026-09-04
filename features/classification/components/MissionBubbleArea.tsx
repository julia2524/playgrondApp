import { MissionBubble, MissionText } from "../styles/classificationStyles";
import { ColorGameTarget } from "../color/type/types";
import { COLOR_NAMES } from "../color/constants/colorPool";

interface MissionBubbleProps {
  feedback: string | null;
  target: ColorGameTarget;
  gameType: "color" | "shape";
}
export default function MissionBubbleArea({
  feedback,
  target,
  gameType,
}: MissionBubbleProps) {
  return (
    <MissionBubble>
      <MissionText>
        {feedback || gameType === "color"
          ? `${
              target.color && COLOR_NAMES[target.color]
                ? COLOR_NAMES[target.color]
                : "아래"
            }색이야! 같은 색을 찾아봐!`
          : `{모양} 모양이야! 같은 모양을 쏙 넣어보자!`}
      </MissionText>
    </MissionBubble>
  );
}

//  target: ShapeColorGameTarget;
// const shapeLabel =
//   target.shape && SHAPE_NAMES[target.shape]
//     ? SHAPE_NAMES[target.shape]
//     : "여기";
