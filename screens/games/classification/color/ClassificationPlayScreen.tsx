import { useRef, useState } from "react";
import { View } from "react-native";

import { RouteProp, useRoute } from "@react-navigation/native";

import { ClassificationRound, DropResult, Layout } from "./types";

import { isStickerInsideTarget } from "./logic/judgeDropPosition";

import TargetArea from "./components/TargetArea";
import SuccessModal from "./components/SuccessModal";
import MissionBubbleArea from "./components/MissionBubbleArea";
import GameHeader from "./components/GameHeader";
import ObjectArea from "./components/ObjectArea";

import TutorialOverlay from "../../../../components/common/TutorialOverlay";

import { generateRounds } from "./createRounds";
import { classificationLevels } from "./levels";

import { Container, GameBoard } from "./styles/classificationStyles";

import { RootStackParamList } from "../../../../navigation/types";

// ==================================================
// 타입
// ==================================================

type PlayScreenRouteProp = RouteProp<
  RootStackParamList,
  "ClassificationPlayScreen"
>;

type TutorialPoint = {
  x: number;
  y: number;
};

// ==================================================
// Screen
// ==================================================

export default function ClassificationPlayScreen() {
  const route = useRoute<PlayScreenRouteProp>();

  const { level } = route.params;

  // ==================================================
  // State
  // ==================================================

  const [levelIndex, setLevelIndex] = useState(level - 1);

  const [roundIndex, setRoundIndex] = useState(0);

  const [feedback, setFeedback] = useState<string | null>(null);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [activeStickerId, setActiveStickerId] = useState<string | null>(null);

  const [matchedObjectIds, setMatchedObjectIds] = useState<string[]>([]);

  const [isTargetFront, setIsTargetFront] = useState(false);

  // ==================================================
  // ⭐ Tutorial State
  // ==================================================

  // Level 1만 최초 Tutorial
  const [showTutorial, setShowTutorial] = useState(level === 1);

  // null
  // → 최초 Object 위치에서 Tutorial 시작
  //
  // { x, y }
  // → 실패한 release 위치에서 Tutorial 시작
  const [tutorialStartPoint, setTutorialStartPoint] =
    useState<TutorialPoint | null>(null);

  // ==================================================
  // Refs
  // ==================================================

  const missingItemRef = useRef<View>(null);

  // ⭐ 실제 Object 위치 측정용
  const tutorialObjectRef = useRef<View>(null);

  const isProcessingRef = useRef(false);

  const gameBoardRef = useRef<View>(null);

  const gameBoardLayout = useRef<Layout>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  // ==================================================
  // Level
  // ==================================================

  const levelConfig =
    classificationLevels[levelIndex] ??
    classificationLevels[classificationLevels.length - 1];

  // ==================================================
  // Rounds
  // ==================================================

  const [rounds, setRounds] = useState(() => generateRounds(levelConfig));

  const currentRound = rounds[roundIndex] as ClassificationRound;
  const correctObjectId = Object.keys(currentRound.answer)[0];

  const target = currentRound.targets[0];

  // ==================================================
  // ⭐ Tutorial에 보여줄 정답 Object
  // ==================================================

  const tutorialObject =
    currentRound.objects.find(
      (object) => currentRound.answer[object.id] !== undefined,
    ) ?? currentRound.objects[0];

  // ==================================================
  // ⭐ Grab
  // ==================================================

  const handleGrab = (objectId: string) => {
    setActiveStickerId(objectId);

    // ⭐ 아이가 직접 잡는 순간 Tutorial 제거
    if (levelConfig.level === 1) {
      setShowTutorial(false);
    }
  };

  // ==================================================
  // ⭐ Tutorial 다시 시작
  // ==================================================

  const showTutorialFromPoint = (point: TutorialPoint) => {
    if (levelConfig.level !== 1) return;

    setTutorialStartPoint(point);

    // release 직후 ObjectArea의 복귀와 겹치지 않도록
    setTimeout(() => {
      setShowTutorial(true);
    }, 250);
  };

  // ==================================================
  // Drop 판정
  // ==================================================

  const handleDrop = (
    item: any,
    stickerX: number,
    stickerY: number,
    stickerWidth: number,
    stickerHeight: number,
    callback: (result: DropResult) => void,
  ) => {
    // ⭐ 아이가 놓은 실제 위치의 중심

    const droppedCenter = {
      x: stickerX + stickerWidth / 2,
      y: stickerY + stickerHeight / 2,
    };

    // --------------------------------
    // Target 없음
    // --------------------------------

    if (!missingItemRef.current) {
      callback("outside");

      showTutorialFromPoint(droppedCenter);

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

        const targetArea = {
          x: targetX,
          y: targetY,
          width: targetWidth,
          height: targetHeight,
        };

        const isInside = isStickerInsideTarget(sticker, targetArea);

        // --------------------------------
        // ❌ Target 밖
        // --------------------------------

        if (!isInside) {
          callback("outside");

          // ⭐ 놓친 바로 그 위치에서 Tutorial
          showTutorialFromPoint(droppedCenter);

          return;
        }

        // --------------------------------
        // Target 안에 들어감
        // --------------------------------

        const correctTargetId = currentRound.answer[item.id];

        // --------------------------------
        // ⭕ 정답
        // --------------------------------

        if (correctTargetId) {
          callback("correct");
          return;
        }

        // --------------------------------
        // ❌ Target 안이지만 틀린 Object
        // --------------------------------

        callback("wrong");

        // ⭐ 틀린 위치에서 Tutorial
        showTutorialFromPoint(droppedCenter);
      },
    );
  };

  // ==================================================
  // 정답
  // ==================================================

  const handleCorrect = (objectId: string) => {
    if (isProcessingRef.current) {
      return;
    }

    isProcessingRef.current = true;

    // ⭐ 정답 맞으면 Tutorial 완전히 종료
    setShowTutorial(false);

    setIsTargetFront(true);

    setFeedback("참 잘했어요! 👏");

    setMatchedObjectIds((prev) => {
      if (prev.includes(objectId)) {
        return prev;
      }

      return [...prev, objectId];
    });

    setTimeout(() => {
      setFeedback(null);

      // --------------------------------
      // 다음 라운드
      // --------------------------------

      if (roundIndex < rounds.length - 1) {
        setRoundIndex((prev) => prev + 1);

        setMatchedObjectIds([]);

        setIsTargetFront(false);

        // ⭐ Level 1 다음 라운드
        // 다시 최초 Object 위치에서 Tutorial 시작

        if (levelConfig.level === 1) {
          setTutorialStartPoint(null);

          setTimeout(() => {
            setShowTutorial(true);
          }, 400);
        }
      } else {
        setShowSuccessModal(true);

        setIsTargetFront(false);
      }

      isProcessingRef.current = false;
    }, 1000);
  };

  // ==================================================
  // Wrong
  // ==================================================

  const handleWrong = () => {
    setFeedback("앗, 다른 곳을 찾아볼까요?");

    setTimeout(() => {
      setFeedback(null);
    }, 1200);
  };

  // ==================================================
  // Outside
  // ==================================================

  const handleOutside = () => {
    setFeedback("앗! 정답칸에 넣어볼까요?");

    setTimeout(() => {
      setFeedback(null);
    }, 1200);
  };

  // ==================================================
  // Render
  // ==================================================

  return (
    <Container>
      {/* --------------------------------
          Header
      -------------------------------- */}

      <GameHeader levelConfig={levelConfig} roundIndex={roundIndex} />

      {/* --------------------------------
          Mission
      -------------------------------- */}

      <MissionBubbleArea feedback={feedback} target={target} />

      {/* --------------------------------
          Game Board
      -------------------------------- */}

      <GameBoard
        ref={gameBoardRef}
        onLayout={() => {
          gameBoardRef.current?.measureInWindow((x, y, width, height) => {
            gameBoardLayout.current = {
              x,
              y,
              width,
              height,
            };
          });
        }}
      >
        {/* --------------------------------
            Target
        -------------------------------- */}

        <TargetArea
          isFront={isTargetFront}
          currentRound={currentRound}
          target={target}
          objects={currentRound.objects}
          matchedObjectIds={matchedObjectIds}
          missingItemRef={missingItemRef}
        />

        {/* --------------------------------
            Objects
        -------------------------------- */}
        <ObjectArea
          objects={currentRound.objects}
          gameBoardLayout={gameBoardLayout}
          activeStickerId={activeStickerId}
          roundIndex={roundIndex}
          onGrab={setActiveStickerId}
          onRelease={handleDrop}
          onCorrectAnimationComplete={handleCorrect}
          onWrong={handleWrong}
          onOutside={handleOutside}
          correctObjectId={correctObjectId}
          registerTutorialObjectRef={(el) => {
            tutorialObjectRef.current = el;
          }}
        />
      </GameBoard>

      {/* --------------------------------
          ⭐ Level 1 Tutorial
      -------------------------------- */}

      {levelConfig.level === 1 && tutorialObject && (
        <TutorialOverlay
          visible={showTutorial}
          fromRef={tutorialObjectRef}
          toRef={missingItemRef}
          // null = 최초 Object 위치
          // 값 있음 = 실패한 Release 위치
          startPoint={tutorialStartPoint}
          shapeId={tutorialObject.name}
          colorKey={tutorialObject.color}
          // ⭐ 한 번 보여주고 끝
          // 반복하지 않음!
          onComplete={() => {
            setShowTutorial(false);
          }}
        />
      )}

      {/* --------------------------------
          Success Modal
      -------------------------------- */}

      <SuccessModal
        show={showSuccessModal}
        levelIndex={levelIndex}
        onRestart={() => {
          setRounds(generateRounds(levelConfig));

          setRoundIndex(0);

          setMatchedObjectIds([]);

          setShowSuccessModal(false);

          // ⭐ Level 1이면 처음부터 Tutorial
          if (levelConfig.level === 1) {
            setTutorialStartPoint(null);
            setShowTutorial(true);
          }
        }}
        onNextLevel={() => {
          const nextLevelIndex = levelIndex + 1;

          setLevelIndex(nextLevelIndex);

          const nextConfig =
            classificationLevels[nextLevelIndex] ?? levelConfig;

          setRounds(generateRounds(nextConfig));

          setRoundIndex(0);

          setMatchedObjectIds([]);

          setShowSuccessModal(false);

          // ⭐ Level 2부터는 Tutorial 없음
          setShowTutorial(false);

          setTutorialStartPoint(null);
        }}
      />
    </Container>
  );
}
