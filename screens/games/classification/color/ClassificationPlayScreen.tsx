import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/types";
import { ClassificationRound, DropResult, Layout } from "./types";
import { isStickerInsideTarget } from "./logic/judgeDropPosition";
import TargetArea from "./components/TargetArea";
import ObjectArea from "./components/ObjectArea";
import SuccessModal from "./components/SuccessModal";
import MissionBubbleArea from "./components/MissionBubbleArea";
import GameHeader from "./components/GameHeader";
import TutorialOverlay from "../../../../components/common/TutorialOverlay";
import { generateRounds } from "./createRounds";
import { Container, GameBoard } from "./styles/classificationStyles";
import { classificationLevels } from "./constants/levels";
import { loadGameProgress, saveGameProgress } from "./process/progressStorage";
import { completeLevel, createInitialProgress } from "./process/gameProgress";

type PlayScreenRouteProp = RouteProp<
  RootStackParamList,
  "ClassificationPlayScreen"
>;
type PlayScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

function calculateStars(correctRoundCount: number) {
  if (correctRoundCount >= 9) return 5;
  if (correctRoundCount >= 7) return 4;
  if (correctRoundCount >= 5) return 3;
  if (correctRoundCount >= 3) return 2;
  if (correctRoundCount >= 1) return 1;
  return 0;
}

export default function ClassificationPlayScreen() {
  const route = useRoute<PlayScreenRouteProp>();
  const navigation = useNavigation<PlayScreenNavigationProp>();
  const { level } = route.params;

  const [levelIndex, setLevelIndex] = useState(level - 1);
  const [roundIndex, setRoundIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [activeStickerId, setActiveStickerId] = useState<string | null>(null);
  const [matchedObjectIds, setMatchedObjectIds] = useState<string[]>([]);
  const [isTargetFront, setIsTargetFront] = useState(false);
  const [earnedStars, setEarnedStars] = useState(0);

  const [tutorialVisible, setTutorialVisible] = useState(level <= 2);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const levelConfig =
    classificationLevels[levelIndex] ??
    classificationLevels[classificationLevels.length - 1];

  const resetIdleTimer = (waitTime: number = 3000) => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    if (tutorialVisible) return;
    if (levelConfig.level <= 2) {
      idleTimerRef.current = setTimeout(() => {
        setTutorialVisible(true);
      }, waitTime);
    }
  };

  useEffect(() => {
    resetIdleTimer(500);
    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, [roundIndex, levelIndex]);

  const correctObjectRef = useRef<View | null>(null);
  const missingItemRef = useRef<View | null>(null);
  const isProcessingRef = useRef(false);

  const gameBoardRef = useRef<View>(null);
  const gameBoardLayout = useRef<Layout>({ x: 0, y: 0, width: 0, height: 0 });

  const [rounds, setRounds] = useState(() =>
    generateRounds(
      classificationLevels[level - 1] ??
        classificationLevels[classificationLevels.length - 1],
    ),
  );
  const currentRound = rounds[roundIndex] as ClassificationRound;
  const target = currentRound.targets[0];

  const correctObjectId = Object.keys(currentRound.answer)[0];
  const correctObject = currentRound.objects.find(
    (object) => object.id === correctObjectId,
  );

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
        const targetLayout = {
          x: targetX,
          y: targetY,
          width: targetWidth,
          height: targetHeight,
        };
        const isInside = isStickerInsideTarget(sticker, targetLayout);
        if (!isInside) {
          callback("outside");
          return;
        }
        const correctTargetId = currentRound.answer[item.id];
        if (correctTargetId) {
          callback("correct");
          return;
        }
        callback("wrong");
      },
    );
  };

  const handleGrab = (objectId: string) => {
    setActiveStickerId(objectId);
    if (levelConfig.level <= 2) {
      setTutorialVisible(false);
      resetIdleTimer();
    }
  };

  const showTutorialAgain = () => {
    if (levelConfig.level > 2) return;
    if (!correctObjectRef.current) return;
    setTutorialVisible(false);
    setTimeout(() => {
      setTutorialVisible(true);
    }, 250);
  };

  const saveCompletedLevel = async (completedLevel: number, stars: number) => {
    try {
      const savedProgress = await loadGameProgress();
      const currentProgress = savedProgress ?? createInitialProgress();
      const nextProgress = completeLevel(
        currentProgress,
        completedLevel,
        stars,
      );
      await saveGameProgress(nextProgress);
    } catch (error) {
      console.error("Level Progress 저장 실패", error);
    }
  };

  const handleCorrect = (objectId: string) => {
    if (isProcessingRef.current) {
      return;
    }
    isProcessingRef.current = true;
    setTutorialVisible(false);
    setIsTargetFront(true);
    setFeedback("참 잘했어요! 👏");

    const correctRoundCount = roundIndex + 1;
    const newStars = calculateStars(correctRoundCount);
    setEarnedStars(newStars);

    setMatchedObjectIds((prev) => {
      if (prev.includes(objectId)) {
        return prev;
      }
      return [...prev, objectId];
    });

    setTimeout(async () => {
      setFeedback(null);
      if (roundIndex < rounds.length - 1) {
        setRoundIndex((prev) => prev + 1);
        setMatchedObjectIds([]);
        setIsTargetFront(false);
        setActiveStickerId(null);
        isProcessingRef.current = false;
        return;
      }
      await saveCompletedLevel(levelConfig.level, newStars);
      setShowSuccessModal(true);
      setIsTargetFront(false);
      isProcessingRef.current = false;
    }, 1000);
  };

  const handleWrong = () => {
    setFeedback("앗, 다른 색깔을 찾아볼까요?");
    setTimeout(() => {
      setFeedback(null);
      showTutorialAgain();
    }, 700);
  };

  const handleOutside = () => {
    setFeedback("빈칸에 쏙 넣어볼까요?");
    setTimeout(() => {
      setFeedback(null);
      showTutorialAgain();
    }, 700);
  };

  const handleRestart = () => {
    setRounds(generateRounds(levelConfig));
    setRoundIndex(0);
    setEarnedStars(0);
    setMatchedObjectIds([]);
    setShowSuccessModal(false);
    setActiveStickerId(null);
    setIsTargetFront(false);
    setTutorialVisible(levelConfig.level <= 2);
  };

  const handleNextLevel = () => {
    const nextLevelIndex = levelIndex + 1;
    if (nextLevelIndex >= classificationLevels.length) {
      navigation.goBack();
      return;
    }
    const nextConfig = classificationLevels[nextLevelIndex];
    setLevelIndex(nextLevelIndex);
    setRounds(generateRounds(nextConfig));
    setRoundIndex(0);
    setEarnedStars(0);
    setMatchedObjectIds([]);
    setShowSuccessModal(false);
    setActiveStickerId(null);
    setIsTargetFront(false);
    setTutorialVisible(nextConfig.level <= 2);
  };

  return (
    <Container>
      <GameHeader
        levelConfig={levelConfig}
        roundIndex={roundIndex}
        earnedStars={earnedStars}
      />
      <MissionBubbleArea feedback={feedback} target={target} />
      <GameBoard
        ref={gameBoardRef}
        onLayout={() => {
          gameBoardRef.current?.measureInWindow((x, y, width, height) => {
            gameBoardLayout.current = { x, y, width, height };
          });
        }}
      >
        <TargetArea
          isFront={isTargetFront}
          currentRound={currentRound}
          target={target}
          objects={currentRound.objects}
          matchedObjectIds={matchedObjectIds}
          missingItemRef={missingItemRef}
        />
        <ObjectArea
          objects={currentRound.objects}
          gameBoardLayout={gameBoardLayout}
          activeStickerId={activeStickerId}
          roundIndex={roundIndex}
          onGrab={handleGrab}
          onRelease={handleDrop}
          onCorrectAnimationComplete={handleCorrect}
          onWrong={handleWrong}
          onOutside={handleOutside}
          registerFirstStickerRef={(el) => {
            correctObjectRef.current = el;
          }}
          correctObjectId={correctObjectId}
        />
      </GameBoard>
      {levelConfig.level <= 2 && correctObject && (
        <TutorialOverlay
          visible={tutorialVisible}
          onComplete={() => {
            setTutorialVisible(false);
          }}
          fromRef={correctObjectRef}
          toRef={missingItemRef}
          shapeId={correctObject.name}
          colorKey={correctObject.color}
        />
      )}
      <SuccessModal
        show={showSuccessModal}
        level={levelConfig.level}
        earnedStars={earnedStars}
        onRestart={handleRestart}
        onNextLevel={handleNextLevel}
      />
    </Container>
  );
}
