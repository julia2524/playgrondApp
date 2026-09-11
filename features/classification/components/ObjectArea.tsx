import { useEffect, useRef } from "react";
import { View } from "react-native";

import { DraggableObjectSticker } from "./DraggableObjectSticker";
import { COLORS } from "../../../design-system/tokens/colors";

import {
  ObjectsContainer,
  ObjectSection,
  SectionLabel,
} from "../styles/classificationStyles";

import { Layout } from "../type/types";
import { DisplayObject } from "../type/displayTypes";

interface ObjectAreaProps {
  objects: DisplayObject[];

  gameBoardLayout: React.MutableRefObject<Layout>;

  activeStickerId: string | null;

  roundIndex: number;

  onGrab: (objectId: string) => void;

  onRelease: (
    obj: DisplayObject,
    stickerX: number,
    stickerY: number,
    width: number,
    height: number,
    callback: (result: "correct" | "wrong" | "outside") => void,
  ) => void;

  onCorrectAnimationComplete: (objectId: string) => void;

  onWrong: () => void;

  onOutside: () => void;

  // ⭐ 정답 스티커 ref 등록
  registerFirstStickerRef?: (el: View | null) => void;

  // ⭐ 현재 라운드의 정답 Object ID
  correctObjectId?: string;

  correctStreakCount: number;

  soundEffect: boolean;

  soundSettingLoaded: boolean;
}

export default function ObjectArea({
  objects,
  gameBoardLayout,
  activeStickerId,
  roundIndex,
  onGrab,
  onRelease,
  onCorrectAnimationComplete,
  onWrong,
  onOutside,
  registerFirstStickerRef,
  correctObjectId,
  correctStreakCount,
  soundEffect,
  soundSettingLoaded,
}: ObjectAreaProps) {
  // ==================================================
  // ⭐⭐⭐ 이번 라운드 전체의 드래그/답변 여부
  //
  // 모든 DraggableObjectSticker가
  // 이 ref 하나를 공유한다.
  //
  // false = 아직 아무 스티커도 안 잡음
  // true  = 이번 라운드에서 이미 스티커를 잡음
  // ==================================================

  const roundAnsweredRef = useRef(false);

  // ==================================================
  // ⭐ 라운드가 바뀌면 다시 드래그 가능하도록 초기화
  // ==================================================

  useEffect(() => {
    roundAnsweredRef.current = false;
  }, [roundIndex]);

  return (
    <ObjectSection>
      <SectionLabel>아래 스티커를 골라봐요!</SectionLabel>

      <ObjectsContainer>
        {objects.map((obj) => (
          <DraggableObjectSticker
            key={`${roundIndex}-${obj.id}`}
            obj={obj}
            color={obj.color ? COLORS[obj.color] : "#ccc"}
            itemCount={objects.length}
            gameBoardLayout={gameBoardLayout}
            isActive={obj.id === activeStickerId}
            // ⭐ Grab 순간 부모에서 tutorialVisible = false
            onGrab={onGrab}
            onRelease={onRelease}
            onCorrectAnimationComplete={onCorrectAnimationComplete}
            onWrong={onWrong}
            onOutside={onOutside}
            // ⭐⭐⭐ 정답 스티커 ref
            // 기존 로직 그대로 유지
            registerRef={
              obj.id === correctObjectId ? registerFirstStickerRef : undefined
            }
            correctStreakCount={correctStreakCount}
            soundEffect={soundEffect}
            soundSettingLoaded={soundSettingLoaded}
            // ⭐⭐⭐ 핵심
            // 모든 스티커가 같은 ref를 공유한다.
            roundAnsweredRef={roundAnsweredRef}
          />
        ))}
      </ObjectsContainer>
    </ObjectSection>
  );
}
