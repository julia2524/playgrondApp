import { View } from "react-native";

import TargetSlotItem from "./TargetSlotItem";

import {
  COLORS,
  PASTEL_BG,
  SOFT_COLORS,
} from "../../../design-system/tokens/colors";

import {
  TargetBox,
  TargetItemsGrid,
  TargetSection,
} from "../styles/classificationStyles";

import {
  DisplayItemKind,
  DisplayObject,
  DisplayTarget,
} from "../type/displayTypes";

interface TargetAreaProps {
  isFront: boolean;
  roundId: string;
  answer: Record<string, string>;
  missingItem?: string;
  objects: DisplayObject[];
  target: DisplayTarget;
  matchedObjectIds: string[];
  missingItemRef: React.RefObject<View | null>;
  correctObject?: DisplayObject; // ★ 추가
}

// 정답을 넣는 상자(바구니/타겟) UI 컴포넌트.
export default function TargetArea({
  isFront,
  roundId,
  answer,
  missingItem,
  objects,
  target,
  matchedObjectIds,
  missingItemRef,
  correctObject,
}: TargetAreaProps) {
  return (
    <TargetSection isFront={isFront}>
      <TargetBox>
        <TargetItemsGrid>
          {target.items?.map((shapeId: string, idx: number) => {
            const isMissingItem =
              target.missingIndex !== undefined
                ? idx === target.missingIndex
                : shapeId === missingItem;
            // ⭐ Category / 기존 분기
            let isMatched = false;

            if (target.kind === "category") {
              // 빈칸이고, 정답 object가 이미 맞춰졌으면 matched
              isMatched =
                isMissingItem &&
                !!correctObject &&
                matchedObjectIds.includes(correctObject.id);
            } else {
              const matchingObject = objects.find(
                (o) => o.renderId === shapeId && answer[o.id] === target.id,
              );
              isMatched = matchingObject
                ? matchedObjectIds.includes(matchingObject.id)
                : false;
            }

            // const matchingObject = objects.find(
            //   (o) => o.renderId === shapeId && answer[o.id] === target.id,
            // );

            // const isMatched = matchingObject
            //   ? matchedObjectIds.includes(matchingObject.id)
            //   : false;

            const isEmptySlot = isMissingItem && !isMatched;

            const slotColor = target.slotColors?.[idx] ?? target.color;
            const slotKind = (target.slotKinds?.[idx] ??
              target.kind) as DisplayItemKind;

            const renderId =
              isMissingItem && correctObject ? correctObject.renderId : shapeId;

            const kind: DisplayItemKind =
              isMissingItem && correctObject
                ? (correctObject.kind as DisplayItemKind)
                : slotKind;

            const isCategory = target.kind === "category";

            const backgroundColor = isEmptySlot
              ? "transparent"
              : isCategory
                ? PASTEL_BG.neutral // hex + 투명도, 또는 고정 파스텔
                : slotColor
                  ? (SOFT_COLORS[slotColor] ?? "#E2E8F0")
                  : PASTEL_BG.neutral;

            const svgColor = isCategory
              ? slotColor // hex 그대로
              : slotColor
                ? (COLORS[slotColor] ?? "#FFFFFF")
                : undefined;

            return (
              <TargetSlotItem
                key={`${roundId}-${shapeId}-${idx}`}
                isMissingItem={isMissingItem}
                isMatched={isMatched}
                backgroundColor={backgroundColor}
                renderId={renderId}
                kind={kind}
                svgColor={svgColor}
                missingItemRef={isMissingItem ? missingItemRef : undefined}
              />
            );
          })}
        </TargetItemsGrid>
      </TargetBox>
    </TargetSection>
  );
}
