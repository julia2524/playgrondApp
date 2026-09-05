import { View } from "react-native";

import TargetSlotItem from "./TargetSlotItem";

import { COLORS, SOFT_COLORS } from "../../../design-system/tokens/colors";

import {
  TargetBox,
  TargetItemsGrid,
  TargetSection,
} from "../styles/classificationStyles";

import { DisplayObject, DisplayTarget } from "../type/displayTypes";

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
          {/* {target.items?.map((shapeId: string, idx: number) => {
            const isMissingItem =
              target.missingIndex !== undefined
                ? idx === target.missingIndex
                : shapeId === missingItem;

            const matchingObject = objects.find(
              (o) => o.renderId === shapeId && answer[o.id] === target.id,
            );

            const isMatched = matchingObject
              ? matchedObjectIds.includes(matchingObject.id)
              : false;

            const isEmptySlot = isMissingItem && !isMatched;

            const targetColor =
              target.slotColors?.[idx] ?? target.color ?? "blue";

            const backgroundColor = isEmptySlot
              ? "transparent"
              : (SOFT_COLORS[targetColor] ?? "#E2E8F0");

            const svgColor = COLORS[targetColor] ?? "#FFFFFF";

            return (
              <TargetSlotItem
                key={`${roundId}-${shapeId}-${idx}`}
                isMissingItem={isMissingItem}
                isMatched={isMatched}
                backgroundColor={backgroundColor}
                renderId={shapeId}
                kind={target.kind}
                svgColor={svgColor}
                missingItemRef={isMissingItem ? missingItemRef : undefined}
              />
            );
          })} */}
          {/* {target.items?.map((shapeId: string, idx: number) => {
            const isMissingItem =
              target.missingIndex !== undefined
                ? idx === target.missingIndex
                : shapeId === missingItem;

            const matchingObject = objects.find(
              (o) => o.renderId === shapeId && answer[o.id] === target.id,
            );

            const isMatched = matchingObject
              ? matchedObjectIds.includes(matchingObject.id)
              : false;

            const isEmptySlot = isMissingItem && !isMatched;

            // ★ 각 슬롯 색상 (힌트용)
            const slotColor =
              target.slotColors?.[idx] ?? target.color ?? "blue";

            // ★ 정답 칸이면 Object의 정보를 사용, 아니면 target 정보 사용
            const renderId =
              isMissingItem && correctObject ? correctObject.renderId : shapeId;

            const kind =
              isMissingItem && correctObject ? correctObject.kind : target.kind;

            // 빈칸이면 투명, 아니면 해당 슬롯 색
            const backgroundColor = isEmptySlot
              ? "transparent"
              : (SOFT_COLORS[slotColor] ?? "#E2E8F0");

            // SVG 색상: 빈칸일 때는 object 색, 아니면 슬롯 색
            const svgColor =
              isEmptySlot && correctObject?.color
                ? (COLORS[correctObject.color] ?? "#FFFFFF")
                : (COLORS[slotColor] ?? "#FFFFFF");

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
          })} */}
          {target.items?.map((shapeId: string, idx: number) => {
            const isMissingItem =
              target.missingIndex !== undefined
                ? idx === target.missingIndex
                : shapeId === missingItem;

            const matchingObject = objects.find(
              (o) => o.renderId === shapeId && answer[o.id] === target.id,
            );

            const isMatched = matchingObject
              ? matchedObjectIds.includes(matchingObject.id)
              : false;

            const isEmptySlot = isMissingItem && !isMatched;

            // 슬롯별 색상
            const slotColor =
              target.slotColors?.[idx] ?? target.color ?? "blue";

            // ★ 슬롯별 kind (정답 칸은 object 우선)
            const slotKind = target.slotKinds?.[idx] ?? target.kind;

            const renderId =
              isMissingItem && correctObject ? correctObject.renderId : shapeId;

            const kind =
              isMissingItem && correctObject ? correctObject.kind : slotKind;

            const backgroundColor = isEmptySlot
              ? "transparent"
              : (SOFT_COLORS[slotColor] ?? "#E2E8F0");

            const svgColor =
              isEmptySlot && correctObject?.color
                ? (COLORS[correctObject.color] ?? "#FFFFFF")
                : (COLORS[slotColor] ?? "#FFFFFF");

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
