import { MissionBubble, MissionText } from "../styles/classificationStyles";
import { SHAPE_NAMES } from "../shape/constants/shapePool";
import { COLOR_NAMES } from "../color/constants/colorPool";
import { CategoryGameObjects } from "../category/constants/categoryPool";
import { appendJosa } from "../../../utils/appendJosa";

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
    // ==========================================
    // 정답 / 오답 피드백이 있으면 최우선
    // ==========================================
    if (feedback) return feedback;

    // ==========================================
    // 색깔 찾기
    // ==========================================
    if (gameType === "color") {
      const colorName =
        target?.color && COLOR_NAMES[target.color]
          ? COLOR_NAMES[target.color]
          : "색";

      return `${colorName}색이야! 같은 색을 찾아봐!`;
    }

    // ==========================================
    // 종류 분류
    // ==========================================
    if (gameType === "category") {
      // target.items[0]이 svgKey (또는 id)이므로 그걸로 원본 찾기
      const rawKey = target?.items?.[0];
      const originalTarget = CategoryGameObjects.find(
        (object) => object.id === rawKey || object.svgKey === rawKey,
      );

      const categoryName = originalTarget?.name || "종류";
      // 받침 있음 -> "과일이야!", 받침 없음 -> "채소야!"
      const categoryWithJosa = appendJosa(categoryName, ["이야", "야"]);

      return `${categoryWithJosa}! 같은 종류를 쏙 넣어보자!`;
    }

    // ==========================================
    // 모양 찾기
    // ==========================================
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
