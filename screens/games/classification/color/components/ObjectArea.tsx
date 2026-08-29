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
  registerFirstStickerRef?: (el: View | null) => void; // ⭐ 추가
  correctObjectId?: string; // ⭐ 추가: 이 id를 가진 오브젝트에만 ref 연결
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
  registerFirstStickerRef, // ⭐ 추가
  correctObjectId, // ⭐ 추가
}: ObjectAreaProps) {
  return (
    <ObjectSection>
      <SectionLabel>아래 스티커를 골라봐요!</SectionLabel>
      <ObjectsContainer>
        {objects.map((obj, index) => (
          <DraggableObjectSticker
            gameBoardLayout={gameBoardLayout}
            // ⭐ roundIndex까지 key에 넣어서 새로운 라운드가 시작되면 스티커 애니메이션 state도 새로 생성
            key={`${roundIndex}-${obj.id}`}
            isActive={obj.id === activeStickerId} // ⭐ 추가
            onGrab={onGrab}
            obj={obj}
            color={obj.color ? COLORS[obj.color] : "#ccc"}
            itemCount={objects.length}
            onRelease={onRelease}
            onCorrectAnimationComplete={onCorrectAnimationComplete}
            onWrong={onWrong}
            onOutside={onOutside}
            registerRef={
              obj.id === correctObjectId ? registerFirstStickerRef : undefined
            } // ⭐ index 0 대신 "정답 오브젝트"에만 연결
          />
        ))}
      </ObjectsContainer>
    </ObjectSection>
  );
}
