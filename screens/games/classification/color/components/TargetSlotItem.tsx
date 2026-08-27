import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { TargetItemCircle } from "../styles/classificationStyles";
import { RenderItemSvg } from "../../../../../constants/ColorItemSvgs";

interface TargetSlotItemProps {
  isMissingItem: boolean;
  isMatched: boolean;
  backgroundColor: string;
  shapeId: string;
  svgColor: string;
  missingItemRef?: React.RefObject<any>;
}

export default function TargetSlotItem({
  isMissingItem,
  isMatched,
  backgroundColor,
  shapeId,
  svgColor,
  missingItemRef,
}: TargetSlotItemProps) {
  const isEmptySlot = isMissingItem && !isMatched;

  // ⭐ 0(숨김) ~ 1(등장) 하나의 값으로 opacity+scale을 같이 제어
  // 정답이 아닌 원래부터 채워진 슬롯은 처음부터 1로 시작
  const reveal = useRef(new Animated.Value(isEmptySlot ? 0 : 1)).current;

  const prevMatchedRef = useRef(isMatched);
  // ⭐ 렌더링될 때마다 찍음 (몇 번 렌더되는지, isMatched가 뭔지)
  //console.log("🎯 RENDER", shapeId, { isMatched, isEmptySlot });
  // ⭐ 마운트/언마운트 감지용
  // useEffect(() => {
  //   console.log("🟢 MOUNT", shapeId);
  //   return () => {
  //     console.log("🔴 UNMOUNT", shapeId);
  //   };
  // }, []); // 빈 배열: 마운트/언마운트 시에만
  useEffect(() => {
    const wasMatched = prevMatchedRef.current;
    prevMatchedRef.current = isMatched;

    // console.log("⚡ EFFECT(isMatched)", shapeId, { wasMatched, isMatched });
    if (!wasMatched && isMatched) {
      //    console.log("✨ TRIGGER ANIMATION", shapeId);
      reveal.setValue(0);
      Animated.spring(reveal, {
        toValue: 1,
        friction: 5,
        tension: 140,
        useNativeDriver: true,
      }).start();
    }
  }, [isMatched]);

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
      {/* ⭐ 조건부 마운트(!isEmptySlot &&) 완전히 제거.
          항상 마운트해두고, opacity/scale로만 보이고 안 보이고를 제어 */}
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
        <RenderItemSvg shapeId={shapeId} colorHex={svgColor} />
      </Animated.View>
    </TargetItemCircle>
  );
}
