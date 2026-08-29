import React, { useRef, useState } from "react";
import { View } from "react-native";
import TargetArea from "../TargetArea";
import ObjectArea from "../ObjectArea";
import { isStickerInsideTarget } from "../../logic/judgeDropPosition";
import Mascot from "../../../../../../components/common/Mascot";

import { ClassificationRound, DropResult, Layout } from "../../types";

import {
  Overlay,
  Content,
  MascotWrapper,
  Title,
  Description,
  PracticeBoard,
} from "../../styles/_tutorialStyles";

interface PracticeStepProps {
  onSuccess: () => void;
}

// ⭐ 튜토리얼 전용 고정 라운드: 파란 공 하나만
const TUTORIAL_ROUND: ClassificationRound = {
  id: "tutorial-round",
  game: "classification",
  level: 0,
  round: 0,
  type: "drag_sort",
  objects: [{ id: "tutorial-obj-correct", color: "blue", name: "ball" }],
  targets: [
    {
      id: "tutorial-target",
      color: "blue",
      items: ["ball"],
    },
  ],
  answer: {
    "tutorial-obj-correct": "tutorial-target",
  },
  rule: "color_classification",
  missingItem: "ball",
};

export default function PracticeStep({ onSuccess }: PracticeStepProps) {
  const [feedback, setFeedback] = useState("파란 공을 파란 빈칸에 넣어봐!");
  const [matchedObjectIds, setMatchedObjectIds] = useState<string[]>([]);
  const [showCelebrate, setShowCelebrate] = useState(false);
  const [activeStickerId, setActiveStickerId] = useState<string | null>(null);

  const missingItemRef = useRef<View>(null);
  const gameBoardRef = useRef<View>(null);
  const gameBoardLayout = useRef<Layout>({ x: 0, y: 0, width: 0, height: 0 });
  const isProcessingRef = useRef(false);

  const handleDrop = (
    item: any,
    stickerX: number,
    stickerY: number,
    stickerWidth: number,
    stickerHeight: number,
    callback: (result: DropResult) => void,
  ) => {
    if (!missingItemRef.current) {
      callback("outside");
      return;
    }

    missingItemRef.current.measureInWindow(
      (targetX, targetY, targetWidth, targetHeight) => {
        const sticker = {
          x: stickerX,
          y: stickerY,
          width: stickerWidth,
          height: stickerHeight,
        };
        const target = {
          x: targetX,
          y: targetY,
          width: targetWidth,
          height: targetHeight,
        };

        if (!isStickerInsideTarget(sticker, target)) {
          callback("outside");
          return;
        }

        const correctTargetId = TUTORIAL_ROUND.answer[item.id];
        callback(correctTargetId ? "correct" : "wrong");
      },
    );
  };

  const handleCorrect = (objectId: string) => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;

    setMatchedObjectIds((prev) => [...prev, objectId]);
    setFeedback("🎉 완벽해!");

    setTimeout(() => {
      setShowCelebrate(true);
    }, 600);

    setTimeout(() => {
      onSuccess(); // ⭐ 진짜 게임 시작
    }, 2000);
  };

  const handleWrong = () => {
    setFeedback("다시 한번 해볼까? 파란 원을 찾아봐!");
    setTimeout(() => setFeedback("파란 공을 파란 빈칸에 넣어봐!"), 1400);
  };

  const handleOutside = () => {
    setFeedback("빈칸 위로 옮겨볼까? 조금만 더!");
    setTimeout(() => setFeedback("파란 공을 파란 빈칸에 넣어봐!"), 1400);
  };

  return (
    <Overlay>
      <Content>
        <MascotWrapper>
          <Mascot size={90} />
        </MascotWrapper>

        <Title>
          {showCelebrate
            ? "이제 혼자서도 할 수 있겠지?"
            : "자, 한번 해볼까? 🐻"}
        </Title>
        <Description>{feedback}</Description>

        <PracticeBoard
          ref={gameBoardRef}
          onLayout={() => {
            gameBoardRef.current?.measureInWindow((x, y, width, height) => {
              gameBoardLayout.current = { x, y, width, height };
            });
          }}
        >
          <TargetArea
            isFront={false}
            currentRound={TUTORIAL_ROUND}
            target={TUTORIAL_ROUND.targets[0]}
            objects={TUTORIAL_ROUND.objects}
            matchedObjectIds={matchedObjectIds}
            missingItemRef={missingItemRef}
          />

          <ObjectArea
            objects={TUTORIAL_ROUND.objects.filter(
              (o) => !matchedObjectIds.includes(o.id),
            )}
            gameBoardLayout={gameBoardLayout}
            activeStickerId={activeStickerId}
            roundIndex={0}
            onGrab={setActiveStickerId}
            onRelease={handleDrop}
            onCorrectAnimationComplete={handleCorrect}
            onWrong={handleWrong}
            onOutside={handleOutside}
          />
        </PracticeBoard>
      </Content>
    </Overlay>
  );
}
