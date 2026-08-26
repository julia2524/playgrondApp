import { COLORS } from "../../../constants/colors";
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
}: ObjectAreaProps) {
  return (
    <ObjectSection>
      <SectionLabel>아래 스티커를 골라봐요!</SectionLabel>
      <ObjectsContainer>
        {objects.map((obj) => (
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
          />
        ))}
      </ObjectsContainer>
    </ObjectSection>
  );
}
