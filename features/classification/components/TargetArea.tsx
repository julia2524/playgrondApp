import { View } from "react-native";

import TargetSlotItem from "./TargetSlotItem";

import { COLORS, SOFT_COLORS } from "../../../design-system/tokens/colors";

import {
  TargetBox,
  TargetItemsGrid,
  TargetSection,
} from "../styles/classificationStyles";
import { SHAPE_POOL } from "../color/constants/colorPool";
import {
  ColorRound,
  ColorGameObject,
  ColorGameTarget,
} from "../color/type/types";

interface TargetAreaProps {
  isFront: boolean;
  currentRound: ColorRound;
  objects: ColorGameObject[];
  target: ColorGameTarget;
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
  //console.log(target.items);
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

            // ⭐ 같은 모양의 오브젝트가 여러 개 있어도 answer가 현재 target을 가리키는 "정답 object"만 찾는다.
            const matchingObject = objects.find(
              (o) =>
                o.name === shapeId && currentRound.answer[o.id] === target.id,
            );
            // if (shapeId === currentRound.missingItem) {
            //   // // ⭐ 정답 슬롯에 한해서만 자세히 로그
            //   // console.log("🔍 정답슬롯 디버그", {
            //   //   shapeId,
            //   //   missingItem: currentRound.missingItem,
            //   //   matchingObject,
            //   //   matchedObjectIds,
            //   // });
            // }

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
            //  const textColor = shouldBeGray ? "#94A3B8" : BASIC_COLORS.TEXT;

            const targetColor = target.color ?? "blue";
            // 아직 정답을 맞히기 전(빈칸)이면 투명, 맞힌 후면 소프트 컬러 적용!
            const backgroundColor = isEmptySlot
              ? "transparent"
              : (SOFT_COLORS[targetColor] ?? "#E2E8F0");
            const svgColor = COLORS[targetColor] ?? "#FFFFFF";
            const key = `${currentRound.id}-${shapeId}-${idx}`;
            // console.log("🔑 KEY CHECK", key); // ⭐ 이 key가 같은 슬롯에서 매번 동일하게 나오는지 확인

            return (
              <TargetSlotItem
                key={`${currentRound.id}-${shapeId}-${idx}`}
                isMissingItem={isMissingItem}
                isMatched={isMatched}
                backgroundColor={backgroundColor}
                shapeId={shapeId}
                svgColor={svgColor}
                missingItemRef={missingItemRef}
              />
            );
          })}
        </TargetItemsGrid>
      </TargetBox>
    </TargetSection>
  );
}
