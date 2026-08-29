import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";

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

type PlayScreenRouteProp = RouteProp<
  RootStackParamList,
  "ClassificationPlayScreen"
>;

export default function ClassificationPlayScreen() {
  const route = useRoute<PlayScreenRouteProp>();

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
  // ⭐ Tutorial
  // --------------------------------------------------
  // 🌟 Level 2까지 튜토리얼 보이기!
  const [tutorialVisible, setTutorialVisible] = useState(level <= 2);

  // 🌟 NodeJS.Timeout 대신 ReturnType<typeof setTimeout> 사용해서 타입 에러 깔끔하게 해결!
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // ==================================================
  // ⭐ 무소조작 감지 및 튜토리얼 트리거 함수 (대기 시간 매개변수 추가)
  // ==================================================
  const resetIdleTimer = (waitTime: number = 3000) => {
    // 🌟 기본값 3초
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }

    if (tutorialVisible) return;

    if (levelConfig.level <= 2) {
      idleTimerRef.current = setTimeout(() => {
        setTutorialVisible(true);
      }, waitTime); // ⏱️ 전달받은 대기 시간 적용
    }
  };

  // --------------------------------------------------
  // 컴포넌트 처음 켜졌거나 라운드 바뀔 때 타이머 시동
  // --------------------------------------------------
  useEffect(() => {
    // 🌟 라운드가 바뀌었을 때는 0.5초(500ms) 뒤에 즉시 튜토리얼 시작!
    resetIdleTimer(500);

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
    // 의존성 배열에는 roundIndex만 들어가는 게 맞음.
    // tutorialVisible은 resetIdleTimer 내부에서 체크하므로 제외.
  }, [roundIndex]);

  // ⭐ 항상 "정답 스티커"의 ref
  const correctObjectRef = useRef<View | null>(null);

  // ⭐ 정답 빈칸 ref
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
  // Level Config
  // --------------------------------------------------

  const levelConfig =
    classificationLevels[levelIndex] ??
    classificationLevels[classificationLevels.length - 1];

  // --------------------------------------------------
  // Rounds
  // --------------------------------------------------

  const [rounds, setRounds] = useState(() => generateRounds(levelConfig));

  const currentRound = rounds[roundIndex] as ClassificationRound;

  const target = currentRound.targets[0];

  // --------------------------------------------------
  // ⭐ 정답 Object 찾기
  // --------------------------------------------------

  const correctObjectId = Object.keys(currentRound.answer)[0];

  const correctObject = currentRound.objects.find(
    (object) => object.id === correctObjectId,
  );

  // --------------------------------------------------
  // Drop Judge
  // --------------------------------------------------

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

  // --------------------------------------------------
  // ⭐ Grab
  // 튜토리얼 즉시 제거
  // --------------------------------------------------

  const handleGrab = (objectId: string) => {
    setActiveStickerId(objectId);

    // ⭐⭐⭐ 가장 중요
    // 아이가 손을 대는 순간 튜토리얼 즉시 끄고 타이머 리셋
    if (levelConfig.level <= 2) {
      setTutorialVisible(false);
      resetIdleTimer();
    }
  };

  // --------------------------------------------------
  // ⭐ Tutorial 다시 보여주기
  // Level 1에서만 사용
  // --------------------------------------------------

  const showTutorialAgain = () => {
    if (levelConfig.level !== 1) return;

    // ⭐ 항상 정답 스티커가 존재하는지 확인
    if (!correctObjectRef.current) return;

    setTutorialVisible(false);

    // ⭐ 잠깐 끈 후 다시 켜야
    // Animated Overlay가 새로 시작됨
    setTimeout(() => {
      setTutorialVisible(true);
    }, 250);
  };

  // --------------------------------------------------
  // Correct
  // --------------------------------------------------

  // ==================================================

  const handleCorrect = (objectId: string) => {
    if (isProcessingRef.current) {
      return;
    }

    isProcessingRef.current = true;

    // ⭐ [핵심 수정] 정답 맞으면 튜토리얼을 즉시 끄고 위치 초기화!
    // 다음 라운드에서 새로운 위치를 측정하도록 보장함.
    setTutorialVisible(false);
    // (참고: 타이머 resetIdleTimer()는 useEffect가 roundIndex 변경을 감지하고 알아서 호출해 줄 거야)

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
        setActiveStickerId(null);

        // ⭐ [선택 사항] 여기 있던 setShowTutorial 로직은 지워도 됨.
        // 위에서 setTutorialVisible(false)를 했고,
        // 아래 useEffect([roundIndex])에서 resetIdleTimer가 호출되어
        // 3초 뒤에 자동으로 tutorialVisible을 true로 만들 것이기 때문.
      } else {
        // 마지막 라운드 성공 시 모달
        setShowSuccessModal(true);
        setIsTargetFront(false);
      }

      isProcessingRef.current = false;
    }, 1000);
  };

  // --------------------------------------------------
  // Wrong
  // --------------------------------------------------

  const handleWrong = () => {
    setFeedback("앗, 다른 색깔을 찾아볼까요?");

    setTimeout(() => {
      setFeedback(null);

      // ⭐ 항상 정답 스티커 → 정답칸
      showTutorialAgain();
    }, 700);
  };

  // --------------------------------------------------
  // Outside
  // --------------------------------------------------

  const handleOutside = () => {
    setFeedback("빈칸에 쏙 넣어볼까요?");

    setTimeout(() => {
      setFeedback(null);

      // ⭐ 항상 정답 스티커 → 정답칸
      showTutorialAgain();
    }, 700);
  };

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <Container>
      <GameHeader levelConfig={levelConfig} roundIndex={roundIndex} />

      <MissionBubbleArea feedback={feedback} target={target} />

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
        {/* -------------------------
            Target
        ------------------------- */}

        <TargetArea
          isFront={isTargetFront}
          currentRound={currentRound}
          target={target}
          objects={currentRound.objects}
          matchedObjectIds={matchedObjectIds}
          missingItemRef={missingItemRef}
        />

        {/* -------------------------
            Objects
        ------------------------- */}

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
          // ⭐⭐⭐ 정답 스티커 ref 등록
          registerFirstStickerRef={(el) => {
            correctObjectRef.current = el;
          }}
          correctObjectId={correctObjectId}
        />
      </GameBoard>

      {/* ==================================================
          ⭐ Tutorial
          항상 correctObjectRef → missingItemRef
      ================================================== */}

      {levelConfig.level <= 2 && correctObject && (
        <TutorialOverlay
          visible={tutorialVisible}
          onComplete={() => {
            // ⭐ 애니메이션 한 번 끝난 후에는
            // 그냥 아이가 직접 해보도록 둠
            setTutorialVisible(false);
          }}
          fromRef={correctObjectRef}
          toRef={missingItemRef}
          shapeId={correctObject.name}
          colorKey={correctObject.color}
        />
      )}

      {/* -------------------------
          Success
      ------------------------- */}

      <SuccessModal
        show={showSuccessModal}
        levelIndex={levelIndex}
        onRestart={() => {
          setRounds(generateRounds(levelConfig));

          setRoundIndex(0);

          setMatchedObjectIds([]);

          setShowSuccessModal(false);

          setTutorialVisible(levelConfig.level === 1);
        }}
        onNextLevel={() => {
          const nextLevelIndex = levelIndex + 1;

          const nextConfig =
            classificationLevels[nextLevelIndex] || levelConfig;

          setLevelIndex(nextLevelIndex);

          setRounds(generateRounds(nextConfig));

          setRoundIndex(0);

          setMatchedObjectIds([]);

          setShowSuccessModal(false);

          // ⭐ Level2부터 tutorial 없음
          setTutorialVisible(false);
        }}
      />
    </Container>
  );
}
