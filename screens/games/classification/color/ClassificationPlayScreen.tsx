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

// ⭐ Progress 관련
import { loadGameProgress, saveGameProgress } from "./process/progressStorage";
import { completeLevel, createInitialProgress } from "./process/gameProgress";

// ==================================================
// Navigation / Route 타입
// ==================================================

type PlayScreenRouteProp = RouteProp<
  RootStackParamList,
  "ClassificationPlayScreen"
>;

type PlayScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// ==================================================
// ⭐ 별 계산
// ==================================================

function calculateStars(correctRoundCount: number) {
  // 9라운드 성공 → ⭐⭐⭐⭐⭐
  if (correctRoundCount >= 9) return 5;

  // 7라운드 성공 → ⭐⭐⭐⭐
  if (correctRoundCount >= 7) return 4;

  // 5라운드 성공 → ⭐⭐⭐
  if (correctRoundCount >= 5) return 3;

  // 3라운드 성공 → ⭐⭐
  if (correctRoundCount >= 3) return 2;

  // 1라운드 성공 → ⭐
  if (correctRoundCount >= 1) return 1;

  return 0;
}

// ==================================================
// Screen
// ==================================================

export default function ClassificationPlayScreen() {
  const route = useRoute<PlayScreenRouteProp>();

  const navigation = useNavigation<PlayScreenNavigationProp>();

  const { level } = route.params;

  // --------------------------------------------------
  // Level / Round
  // --------------------------------------------------

  const [levelIndex, setLevelIndex] = useState(level - 1);

  const [roundIndex, setRoundIndex] = useState(0);

  const [feedback, setFeedback] = useState<string | null>(null);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [activeStickerId, setActiveStickerId] = useState<string | null>(null);

  const [matchedObjectIds, setMatchedObjectIds] = useState<string[]>([]);

  const [isTargetFront, setIsTargetFront] = useState(false);

  // --------------------------------------------------
  // ⭐ 별 개수
  // --------------------------------------------------

  const [earnedStars, setEarnedStars] = useState(0);

  // --------------------------------------------------
  // ⭐ Tutorial
  // --------------------------------------------------

  const [tutorialVisible, setTutorialVisible] = useState(level <= 2);

  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // --------------------------------------------------
  // Level Config
  // --------------------------------------------------

  const levelConfig =
    classificationLevels[levelIndex] ??
    classificationLevels[classificationLevels.length - 1];

  // ==================================================
  // ⭐ 무소조작 감지
  // ==================================================

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

  // --------------------------------------------------
  // 라운드 변경 시 Tutorial 타이머
  // --------------------------------------------------

  useEffect(() => {
    resetIdleTimer(500);

    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, [roundIndex, levelIndex]);

  // ==================================================
  // ⭐ 정답 Object Ref
  // ==================================================

  const correctObjectRef = useRef<View | null>(null);

  // ⭐ 정답 빈칸 Ref

  const missingItemRef = useRef<View | null>(null);

  // --------------------------------------------------
  // Processing
  // --------------------------------------------------

  const isProcessingRef = useRef(false);

  // --------------------------------------------------
  // GameBoard Layout
  // --------------------------------------------------

  const gameBoardRef = useRef<View>(null);

  const gameBoardLayout = useRef<Layout>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  // --------------------------------------------------
  // Rounds
  // --------------------------------------------------

  const [rounds, setRounds] = useState(() =>
    generateRounds(
      classificationLevels[level - 1] ??
        classificationLevels[classificationLevels.length - 1],
    ),
  );

  const currentRound = rounds[roundIndex] as ClassificationRound;

  const target = currentRound.targets[0];

  // --------------------------------------------------
  // ⭐ 정답 Object 찾기
  // --------------------------------------------------

  const correctObjectId = Object.keys(currentRound.answer)[0];

  const correctObject = currentRound.objects.find(
    (object) => object.id === correctObjectId,
  );

  // ==================================================
  // ⭐ Drop Judge
  // ==================================================

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

  // ==================================================
  // ⭐ Grab
  // ==================================================

  const handleGrab = (objectId: string) => {
    setActiveStickerId(objectId);

    // ------------------------------------------------
    // Tutorial 즉시 제거
    // ------------------------------------------------

    if (levelConfig.level <= 2) {
      setTutorialVisible(false);

      resetIdleTimer();
    }
  };

  // ==================================================
  // ⭐ Tutorial 다시 보여주기
  // ==================================================

  const showTutorialAgain = () => {
    if (levelConfig.level > 2) return;

    if (!correctObjectRef.current) return;

    setTutorialVisible(false);

    setTimeout(() => {
      setTutorialVisible(true);
    }, 250);
  };

  // ==================================================
  // ⭐ Level Progress 저장
  // ==================================================

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

      console.log("🌟 Level Progress 저장 완료", nextProgress);
    } catch (error) {
      console.error("❌ Level Progress 저장 실패", error);
    }
  };

  // ==================================================
  // ⭐ Correct
  // ==================================================

  const handleCorrect = (objectId: string) => {
    if (isProcessingRef.current) {
      return;
    }

    isProcessingRef.current = true;

    // ------------------------------------------------
    // Tutorial 즉시 제거
    // ------------------------------------------------

    setTutorialVisible(false);

    setIsTargetFront(true);

    setFeedback("참 잘했어요! 👏");

    // ------------------------------------------------
    // ⭐ 이번 성공까지 포함한 성공 라운드 수
    //
    // roundIndex = 0 → 1라운드 성공
    // 그래서 +1
    // ------------------------------------------------

    const correctRoundCount = roundIndex + 1;

    const newStars = calculateStars(correctRoundCount);

    // ⭐ 별 상태 업데이트

    setEarnedStars(newStars);

    // ------------------------------------------------
    // matched Object
    // ------------------------------------------------

    setMatchedObjectIds((prev) => {
      if (prev.includes(objectId)) {
        return prev;
      }

      return [...prev, objectId];
    });

    setTimeout(async () => {
      setFeedback(null);

      // ==============================================
      // ⭐ 다음 라운드
      // ==============================================

      if (roundIndex < rounds.length - 1) {
        setRoundIndex((prev) => prev + 1);

        setMatchedObjectIds([]);

        setIsTargetFront(false);

        setActiveStickerId(null);

        isProcessingRef.current = false;

        return;
      }

      // ==============================================
      // ⭐ 마지막 라운드
      // ==============================================

      // 마지막 라운드까지 성공했으므로
      // 별은 이미 5개 상태

      await saveCompletedLevel(levelConfig.level, newStars);

      setShowSuccessModal(true);

      setIsTargetFront(false);

      isProcessingRef.current = false;
    }, 1000);
  };

  // ==================================================
  // Wrong
  // ==================================================

  const handleWrong = () => {
    setFeedback("앗, 다른 색깔을 찾아볼까요?");

    setTimeout(() => {
      setFeedback(null);

      showTutorialAgain();
    }, 700);
  };

  // ==================================================
  // Outside
  // ==================================================

  const handleOutside = () => {
    setFeedback("빈칸에 쏙 넣어볼까요?");

    setTimeout(() => {
      setFeedback(null);

      showTutorialAgain();
    }, 700);
  };

  // ==================================================
  // ⭐ Restart
  // ==================================================

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

  // ==================================================
  // ⭐ Next Level
  // ==================================================

  const handleNextLevel = () => {
    const nextLevelIndex = levelIndex + 1;

    // 마지막 레벨이면 StageMap으로
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

    // ⭐ Level 1~2만 Tutorial
    setTutorialVisible(nextConfig.level <= 2);
  };

  // ==================================================
  // Render
  // ==================================================

  return (
    <Container>
      {/* ==============================================
          ⭐ Header
      ============================================== */}

      <GameHeader
        levelConfig={levelConfig}
        roundIndex={roundIndex}
        earnedStars={earnedStars}
      />

      {/* ==============================================
          Mission
      ============================================== */}

      <MissionBubbleArea feedback={feedback} target={target} />

      {/* ==============================================
          Game Board
      ============================================== */}

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
        {/* --------------------------------------------
            Target
        -------------------------------------------- */}

        <TargetArea
          isFront={isTargetFront}
          currentRound={currentRound}
          target={target}
          objects={currentRound.objects}
          matchedObjectIds={matchedObjectIds}
          missingItemRef={missingItemRef}
        />

        {/* --------------------------------------------
            Objects
        -------------------------------------------- */}

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

      {/* ==============================================
          ⭐ Tutorial
      ============================================== */}

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

      {/* ==============================================
          ⭐ Success Modal
      ============================================== */}

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
