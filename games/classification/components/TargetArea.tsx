import { View } from "react-native";
import { COLORS } from "../../../constants/colors";
import {
  TargetBox,
  TargetItemCircle,
  TargetItemsGrid,
  TargetItemText,
  TargetSection,
} from "../styles/classificationStyles";
import { ClassificationRound, GameObject, GameTarget } from "../types";
import { useState } from "react";

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
        color={target.color ? COLORS[target.color] : "#ccc"}
      >
        <TargetItemsGrid>
          {target.items?.map((itemName: string, idx: number) => {
            // ------------------------------------
            // missing item인지
            // ------------------------------------
            const isMissingItem = itemName === currentRound.missingItem;

            // ------------------------------------
            // 현재 object 중에서 해당 물건 찾기
            // ------------------------------------
            const matchingObject = objects.find((o) => o.name === itemName);

            // ------------------------------------
            // 이 물건이 이미 정답 처리됐는지
            // ------------------------------------
            const isMatched = matchingObject
              ? matchedObjectIds.includes(matchingObject.id)
              : false;

            // ------------------------------------
            // 아직 정답을 안 맞혔다면 회색, 맞히면 target 색상
            // ------------------------------------
            const shouldBeGray = isMissingItem && !isMatched;
            const circleColor = shouldBeGray
              ? "#E2E8F0"
              : target.color
                ? COLORS[target.color]
                : "#ccc";
            const textColor = shouldBeGray ? "#94A3B8" : "#FFFFFF";

            return (
              <TargetItemCircle
                ref={isMissingItem ? missingItemRef : undefined} // ⭐ 정답 원에만 ref
                style={{
                  // 🌟 [핵심] 정답이 맞춰진 순간(isMatched)에는 zIndex와 elevation을 최상단으로 폭발시킴!
                  zIndex: isMatched ? 9999 : 1,
                  elevation: isMatched ? 999 : 1,
                }}
                key={idx}
                color={circleColor}
              >
                <TargetItemText color={textColor}>{itemName}</TargetItemText>
              </TargetItemCircle>
            );
          })}
        </TargetItemsGrid>
      </TargetBox>
    </TargetSection>
  );
}
