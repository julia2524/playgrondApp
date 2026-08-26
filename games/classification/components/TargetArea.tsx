import { View } from "react-native";
import {
  BASIC_COLORS,
  COLORS,
  SHAPE_POOL,
  SOFT_COLORS,
} from "../../../constants/colors";
import {
  TargetBox,
  TargetItemCircle,
  TargetItemsGrid,
  TargetItemText,
  TargetSection,
} from "../styles/classificationStyles";
import { ClassificationRound, GameObject, GameTarget } from "../types";
import { RenderItemSvg } from "../../../constants/ColorItemSvgs";

interface TargetAreaProps {
  isFront: boolean;
  currentRound: ClassificationRound;
  objects: GameObject[];
  target: GameTarget;
  matchedObjectIds: string[];
  missingItemRef: React.RefObject<View | null>;
}

//정답을 넣는 상자(바구니/타겟) UI 컴포넌트.
export default function TargetArea({
  isFront,
  currentRound,
  objects,
  target,
  matchedObjectIds,
  missingItemRef,
}: TargetAreaProps) {
  return (
    <TargetSection isFront={isFront}>
      <TargetBox
      // ref={targetBoxRef}
      // color={target.color ? COLORS[target.color] : "#ccc"}
      >
        <TargetItemsGrid>
          {target.items?.map((shapeId: string, idx: number) => {
            const shapeDef = SHAPE_POOL.find((s) => s.id === shapeId);
            const displayLabel = shapeDef?.label ?? shapeId;
            // ------------------------------------
            // missing item인지
            // ------------------------------------
            const isMissingItem = shapeId === currentRound.missingItem;

            // ------------------------------------
            // 현재 object 중에서 해당 물건 찾기
            // ------------------------------------
            const matchingObject = objects.find((o) => o.name === shapeId);

            // ------------------------------------
            // 이 물건이 이미 정답 처리됐는지
            // ------------------------------------
            const isMatched = matchingObject
              ? matchedObjectIds.includes(matchingObject.id)
              : false;

            // ⭐ 아직 정답을 넣지 않은 빈칸
            const isEmptySlot = isMissingItem && !isMatched;

            // ------------------------------------
            // 아직 정답을 안 맞혔다면 회색, 맞히면 target 색상
            // ------------------------------------
            const shouldBeGray = isMissingItem && !isMatched;
            const circleColor = shouldBeGray
              ? "#E2E8F0"
              : target.color && COLORS[target.color]
                ? COLORS[target.color]
                : "#FFC0CB"; // 혹시 색상을 못 찾았을 때 보여줄 기본 색상(예: 연한 분홍)
            const textColor = shouldBeGray ? "#94A3B8" : BASIC_COLORS.TEXT;

            const targetColor = target.color ?? "blue";
            // 아직 정답을 맞히기 전(빈칸)이면 투명, 맞힌 후면 소프트 컬러 적용!
            const backgroundColor = isEmptySlot
              ? "transparent"
              : (SOFT_COLORS[targetColor] ?? "#E2E8F0");
            const svgColor = COLORS[targetColor] ?? "#FFFFFF";

            return (
              <TargetItemCircle
                ref={isMissingItem ? missingItemRef : undefined} // ⭐ 정답 원에만 ref
                style={{
                  // 🌟 [핵심] 정답이 맞춰진 순간(isMatched)에는 zIndex와 elevation을 최상단으로 폭발시킴!
                  zIndex: isMatched ? 9999 : 1,
                  elevation: isMatched ? 999 : 1,
                }}
                key={idx}
                color={backgroundColor}
                isMissing={isMissingItem && !isMatched}
              >
                {!isEmptySlot && (
                  <RenderItemSvg shapeId={shapeId} colorHex={svgColor} />
                )}
              </TargetItemCircle>
            );
          })}
        </TargetItemsGrid>
      </TargetBox>
    </TargetSection>
  );
}
