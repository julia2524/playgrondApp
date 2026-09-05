import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { TargetItemCircle } from "../styles/classificationStyles";
import { RenderColorItemSvg } from "../color/assets/ColorItemSvgs";
import {
  RenderShapeItemSvg,
  RenderBasicShapeSvg,
} from "../shape/assets/shapeItemSvgs"; // 경로 확인
import { DisplayItemKind } from "../type/displayTypes";

interface TargetSlotItemProps {
  isMissingItem: boolean;
  isMatched: boolean;
  backgroundColor: string;
  renderId: string;
  kind: DisplayItemKind;
  svgColor: string;
  missingItemRef?: React.RefObject<any>;
}

export default function TargetSlotItem({
  isMissingItem,
  isMatched,
  backgroundColor,
  renderId,
  kind,
  svgColor,
  missingItemRef,
}: TargetSlotItemProps) {
  const isEmptySlot = isMissingItem && !isMatched;

  const reveal = useRef(new Animated.Value(isEmptySlot ? 0 : 1)).current;
  const prevMatchedRef = useRef(isMatched);

  useEffect(() => {
    const wasMatched = prevMatchedRef.current;
    prevMatchedRef.current = isMatched;

    if (!wasMatched && isMatched) {
      reveal.setValue(0);
      Animated.spring(reveal, {
        toValue: 1,
        friction: 5,
        tension: 140,
        useNativeDriver: true,
      }).start();
    }
  }, [isMatched]);

  // ==================================================
  // SVG 렌더러 선택
  // ==================================================
  const renderSvg = () => {
    // 1. 색깔 분류 게임
    if (kind === "color") {
      return <RenderColorItemSvg shapeId={renderId} colorHex={svgColor} />;
    }

    // 2. 모양 분류 - 아이템 (ball, cookie, pizzaSlice 등)
    if (kind === "item") {
      return <RenderShapeItemSvg itemId={renderId} colorHex={svgColor} />;
    }

    // 3. 모양 분류 - 기본 도형 (circle, triangle, star 등)
    return <RenderBasicShapeSvg shapeId={renderId} colorHex={svgColor} />;
  };

  return (
    <TargetItemCircle
      ref={isMissingItem ? missingItemRef : undefined}
      style={{
        zIndex: isMatched ? 9999 : 1,
        elevation: isMatched ? 999 : 1,
      }}
      color={backgroundColor}
      isMissing={isEmptySlot}
    >
      <Animated.View
        style={{
          opacity: reveal,
          transform: [
            {
              scale: reveal.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 1],
              }),
            },
          ],
        }}
      >
        {renderSvg()}
      </Animated.View>
    </TargetItemCircle>
  );
}
