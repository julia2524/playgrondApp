import { MissionBubble, MissionText } from "../styles/classificationStyles";
import { SHAPE_NAMES } from "../shape/constants/shapePool";
import { COLOR_NAMES } from "../color/constants/colorPool";

interface MissionBubbleProps {
  feedback: string | null;
  target: any;
  gameType: "color" | "shape" | "category";
}

export default function MissionBubbleArea({
  feedback,
  target,
  gameType,
}: MissionBubbleProps) {
  const getMessage = () => {
    if (feedback) return feedback;

    if (gameType === "color") {
      const colorName =
        target?.color && COLOR_NAMES[target.color]
          ? COLOR_NAMES[target.color]
          : "아래";
      return `${colorName}색이야! 같은 색을 찾아봐!`;
    }

    // items 배열의 첫 번째 값(또는 기존 속성들)에서 모양 키 추출
    const rawShapeKey =
      target?.items?.[0] || target?.shapeId || target?.shape || target?.kind;
    const shapeName =
      rawShapeKey && SHAPE_NAMES[rawShapeKey]
        ? SHAPE_NAMES[rawShapeKey]
        : "모양";

    return `${shapeName} 모양이야! 같은 모양을 쏙 넣어보자!`;
  };

  return (
    <MissionBubble>
      <MissionText>{getMessage()}</MissionText>
    </MissionBubble>
  );
}
