import { View } from "react-native";

import { COLORS } from "../../../../../constants/colors";

import {
  ObjectsContainer,
  ObjectSection,
  SectionLabel,
} from "../styles/classificationStyles";

import { GameObject, Layout } from "../types";

import { DraggableObjectSticker } from "./DraggableObjectSticker";

interface ObjectAreaProps {
  objects: GameObject[];

  gameBoardLayout: React.MutableRefObject<Layout>;

  activeStickerId: string | null;

  roundIndex: number;

  onGrab: (objectId: string) => void;

  onRelease: (
    obj: GameObject,
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
}: ObjectAreaProps) {
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
            // ⭐ Grab 순간 부모에서
            // tutorialVisible = false
            onGrab={onGrab}
            onRelease={onRelease}
            onCorrectAnimationComplete={onCorrectAnimationComplete}
            onWrong={onWrong}
            onOutside={onOutside}
            // ⭐⭐⭐ 핵심
            // 정답 스티커만 ref 등록
            registerRef={
              obj.id === correctObjectId ? registerFirstStickerRef : undefined
            }
          />
        ))}
      </ObjectsContainer>
    </ObjectSection>
  );
}
