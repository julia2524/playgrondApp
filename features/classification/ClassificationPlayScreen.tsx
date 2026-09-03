import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { ClassificationRound, DropResult, Layout } from "./color/type/types";
import { isStickerInsideTarget } from "./logic/judgeDropPosition";
import TutorialOverlay from "../../design-system/tutorial/TutorialOverlay";

import { calculateStars } from "../../components/common/rewardSystem";
import { generateRounds } from "./createRounds";

import { Container, GameBoard } from "./styles/classificationStyles";
import { loadGameProgress, saveGameProgress } from "./progress/progressStorage";
import { completeLevel, createInitialProgress } from "./progress/gameProgress";
import { preloadSounds, resetLastSuccessNote } from "../../utils/sound";
import GameHeader from "./components/GameHeader";
import MissionBubbleArea from "./components/MissionBubbleArea";
import TargetArea from "./components/TargetArea";
import ObjectArea from "./components/ObjectArea";
import SuccessModal from "./components/SuccessModal";
import { colorLevels } from "./color/constants/levels";

// ==================================================
// Navigation 타입
// ==================================================

type PlayScreenRouteProp = RouteProp<
  RootStackParamList,
  "ClassificationPlayScreen"
>;

type PlayScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// ==================================================
// ⭐ 별 계산
// ==================================================

// ==================================================
// Screen
// ==================================================

export default function ClassificationPlayScreen() {
  const route = useRoute<PlayScreenRouteProp>();

  const navigation = useNavigation<PlayScreenNavigationProp>();

  useEffect(() => {
    preloadSounds(); // 한 번만 호출
  }, []);

  const { gameType = "color", level } = route.params;

  // ==================================================
  // ⭐ Level / Round
  // ==================================================

  const [levelIndex, setLevelIndex] = useState(level - 1);
  const [roundIndex, setRoundIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [activeStickerId, setActiveStickerId] = useState<string | null>(null);
  const [matchedObjectIds, setMatchedObjectIds] = useState<string[]>([]);
  const [isTargetFront, setIsTargetFront] = useState(false);

  // ==================================================
  // ⭐ 별
  // ==================================================

  const [earnedStars, setEarnedStars] = useState(0);

  // ⭐ 실제 성공한 라운드 수
  const [correctRoundCount, setCorrectRoundCount] = useState(0);

  // ==================================================
  // ⭐ Tutorial
  // ==================================================

  // ⭐ Level 1만 Tutorial
  const [tutorialVisible, setTutorialVisible] = useState(level === 1);

  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ==================================================
  // ⭐ Level Config
  // ==================================================

  const levelConfig =
    colorLevels[levelIndex] ?? colorLevels[colorLevels.length - 1];

  // ==================================================
  // ⭐ Tutorial Timer
  // ==================================================

  const clearIdleTimer = () => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);

      idleTimerRef.current = null;
    }
  };

  const startIdleTimer = () => {
    // ⭐ Level 1이 아니면 Tutorial 없음
    if (levelConfig.level !== 1) {
      return;
    }

    clearIdleTimer();

    // ⭐ 2초 동안 아무 조작 없으면 Tutorial
    idleTimerRef.current = setTimeout(() => {
      setTutorialVisible(true);
    }, 1000);
  };

  // ==================================================
  // ⭐ 라운드 변경 시
  // ==================================================

  useEffect(() => {
    // ⭐ Level 1에서만
    if (levelConfig.level === 1) {
      // 새 라운드 시작 시 Tutorial은 일단 숨김
      setTutorialVisible(false);

      // ⭐ 2초 후 Tutorial
      startIdleTimer();
    } else {
      setTutorialVisible(false);
      clearIdleTimer();
    }

    return () => {
      clearIdleTimer();
    };
  }, [roundIndex, levelIndex]);

  // ==================================================
  // ⭐ Tutorial Ref
  // ==================================================

  const correctObjectRef = useRef<View | null>(null);

  const missingItemRef = useRef<View | null>(null);

  // ==================================================
  // Processing
  // ==================================================

  const isProcessingRef = useRef(false);

  // ==================================================
  // GameBoard Layout
  // ==================================================

  const gameBoardRef = useRef<View>(null);

  const gameBoardLayout = useRef<Layout>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  // ==================================================
  // Rounds
  // ==================================================

  const [rounds, setRounds] = useState(() =>
    generateRounds(
      colorLevels[level - 1] ?? colorLevels[colorLevels.length - 1],
    ),
  );

  const currentRound = rounds[roundIndex];
  // ⭐ 안전하게 처리
  if (
    !currentRound ||
    !currentRound.targets ||
    currentRound.targets.length === 0
  ) {
    console.log("⚠️ currentRound 없음", {
      roundsLength: rounds.length,
      roundIndex,
      rounds,
    });
    return null; // 또는 로딩 화면
  }

  const target = currentRound.targets[0];
  if (!target) {
    console.log("⚠️ target 없음", currentRound);

    return null;
  }

  // ==================================================
  // ⭐ 정답 Object
  // ==================================================

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

    // ⭐ 아이가 만지는 순간 Tutorial 제거
    if (levelConfig.level === 1) {
      clearIdleTimer();

      setTutorialVisible(false);
    }
  };

  // ==================================================
  // ⭐ Progress 저장
  // ==================================================

  const saveCompletedLevel = async (completedLevel: number, stars: number) => {
    try {
      // ⭐ loadGameProgress와 saveGameProgress에 gameType 전달!
      const savedProgress = await loadGameProgress(gameType);

      const currentProgress = savedProgress ?? createInitialProgress();

      const nextProgress = completeLevel(
        currentProgress,
        completedLevel,
        stars,
      );

      await saveGameProgress(gameType, nextProgress);

      console.log("🌟 Level Progress 저장 완료", nextProgress);
    } catch (error) {
      console.error("❌ Level Progress 저장 실패", error);
    }
  };

  // ==================================================
  // ⭐ 다음 라운드
  // ==================================================

  const goToNextRound = async (finalStars: number) => {
    setFeedback(null);
    // ⭐ 이미 마지막 라운드를 넘어간 상태면 그냥 모달만 띄우고 끝
    if (roundIndex >= rounds.length - 1) {
      clearIdleTimer();
      setTutorialVisible(false);
      await saveCompletedLevel(levelConfig.level, finalStars);
      setShowSuccessModal(true);
      setIsTargetFront(false);
      setActiveStickerId(null);
      isProcessingRef.current = false;
      return;
    }
    // 아직 남은 라운드가 있을 때만 증가
    setRoundIndex((prev) => {
      const next = prev + 1;
      // 혹시라도 넘어가지 못하게 한 번 더 방어
      return next >= rounds.length ? prev : next;
    });
    setMatchedObjectIds([]);
    setIsTargetFront(false);
    setActiveStickerId(null);
    isProcessingRef.current = false;
  };

  // ==================================================
  // ⭐ Correct
  // ==================================================

  const handleCorrect = (objectId: string) => {
    if (isProcessingRef.current) {
      return;
    }

    isProcessingRef.current = true;

    clearIdleTimer();

    setTutorialVisible(false);
    setIsTargetFront(true);
    setFeedback("참 잘했어요! 👏");

    // ⭐ 성공 횟수 증가
    const nextCorrectRoundCount = correctRoundCount + 1;
    setCorrectRoundCount(nextCorrectRoundCount);

    // ⭐ 성공 횟수로 별 계산
    const newStars = calculateStars(nextCorrectRoundCount);
    setEarnedStars(newStars);

    // ⭐ 정답 Object 처리
    setMatchedObjectIds((prev) => {
      if (prev.includes(objectId)) {
        return prev;
      }

      return [...prev, objectId];
    });

    setTimeout(() => {
      goToNextRound(newStars);
    }, 1000);
  };

  // ==================================================
  // ❌ Wrong
  // ==================================================

  const handleWrong = () => {
    if (isProcessingRef.current) {
      return;
    }

    isProcessingRef.current = true;

    clearIdleTimer();

    setTutorialVisible(false);
    setFeedback("괜찮아요! 다음 문제도 해볼까요? 😊");

    // ⭐ 실패해도 다음 라운드
    setTimeout(() => {
      goToNextRound(earnedStars);
    }, 1000);
  };

  // ==================================================
  // ❌ Outside
  // ==================================================

  const handleOutside = () => {
    if (isProcessingRef.current) {
      return;
    }

    isProcessingRef.current = true;

    clearIdleTimer();

    setTutorialVisible(false);

    setFeedback("괜찮아요! 다음 문제로 넘어가 볼까요? 😊");

    // ⭐ 밖에 놓아도 다음 라운드
    setTimeout(() => {
      goToNextRound(earnedStars);
    }, 1000);
  };

  // ==================================================
  // ⭐ Restart
  // ==================================================

  const handleRestart = () => {
    clearIdleTimer();
    resetLastSuccessNote(); // ⭐ 여기 추가

    setRounds(generateRounds(levelConfig));
    setRoundIndex(0);
    setEarnedStars(0);
    setCorrectRoundCount(0);
    setMatchedObjectIds([]);
    setShowSuccessModal(false);
    setActiveStickerId(null);
    setIsTargetFront(false);

    // ⭐ Level 1만 Tutorial
    setTutorialVisible(levelConfig.level === 1);

    isProcessingRef.current = false;
  };

  // ==================================================
  // ⭐ Next Level
  // ==================================================

  const handleNextLevel = () => {
    clearIdleTimer();
    resetLastSuccessNote(); // ⭐ 여기 추가
    const nextLevelIndex = levelIndex + 1;

    // 마지막 레벨이면 Map으로
    if (nextLevelIndex >= colorLevels.length) {
      navigation.goBack();

      return;
    }

    const nextConfig = colorLevels[nextLevelIndex];

    setLevelIndex(nextLevelIndex);
    setRounds(generateRounds(nextConfig));
    setRoundIndex(0);
    setEarnedStars(0);
    setCorrectRoundCount(0);
    setMatchedObjectIds([]);
    setShowSuccessModal(false);
    setActiveStickerId(null);
    setIsTargetFront(false);

    // ⭐ Level 1만 Tutorial
    setTutorialVisible(nextConfig.level === 1);

    isProcessingRef.current = false;
  };

  // ==================================================
  // Render
  // ==================================================

  return (
    <Container>
      {/* ==========================================
          Header
      ========================================== */}
      <GameHeader
        levelConfig={levelConfig}
        roundIndex={roundIndex}
        earnedStars={earnedStars}
      />

      {/* ==========================================
          Mission
      ========================================== */}
      <MissionBubbleArea feedback={feedback} target={target} />

      {/* ==========================================
          Game Board
      ========================================== */}
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
        {/* Target */}
        <TargetArea
          isFront={isTargetFront}
          currentRound={currentRound}
          target={target}
          objects={currentRound.objects}
          matchedObjectIds={matchedObjectIds}
          missingItemRef={missingItemRef}
        />

        {/* Objects */}
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
          correctStreakCount={correctRoundCount + 1} // ⭐ 추가: "이번에 맞히면 몇 번째인지"
        />
      </GameBoard>

      {/* ==========================================
          ⭐ Tutorial
      ========================================== */}
      {levelConfig.level === 1 && correctObject && (
        <TutorialOverlay
          visible={tutorialVisible}
          onComplete={() => {
            setTutorialVisible(false);

            // ⭐ Tutorial 끝난 뒤 다시
            // 3초 무조작 감지 시작
            startIdleTimer();
          }}
          fromRef={correctObjectRef}
          toRef={missingItemRef}
          shapeId={correctObject.name}
          colorKey={correctObject.color}
        />
      )}

      {/* ==========================================
          ⭐ Success Modal
      ========================================== */}
      <SuccessModal
        show={showSuccessModal}
        level={levelConfig.level}
        earnedStars={earnedStars}
        onRestart={handleRestart}
        onNextLevel={handleNextLevel}
        correctStreakCount={correctRoundCount} // ⭐ 추가: "이번에 맞히면 몇 번째인지"
      />
    </Container>
  );
}
