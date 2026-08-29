// --------------------------------------------------
// 부모: "정답이야? 오답이야?"를 담당 화면
// --------------------------------------------------

import { useEffect, useRef, useState } from "react";

import { View } from "react-native";
import { ClassificationRound, DropResult, Layout } from "./types";
import { isStickerInsideTarget } from "./logic/judgeDropPosition";

import TargetArea from "./components/TargetArea";
import SuccessModal from "./components/SuccessModal";
import MissionBubbleArea from "./components/MissionBubbleArea";
import GameHeader from "./components/GameHeader";
import ObjectArea from "./components/ObjectArea";
import { generateRounds } from "./createRounds";
import { classificationLevels } from "./levels";
import { Container, GameBoard } from "./styles/classificationStyles";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../../navigation/types";
import TutorialOverlay from "../../../../components/common/TutorialOverlay";

type PlayScreenRouteProp = RouteProp<
  RootStackParamList,
  "ClassificationPlayScreen"
>;
type TutorialStep = "welcome" | "demo" | "playing" | "complete" | "done";

// --------------------------------------------------
export default function ClassificationPlayScreen() {
  const route = useRoute<PlayScreenRouteProp>();
  const { level } = route.params;

  // --------------------------------------------------
  // State
  // --------------------------------------------------

  const [levelIndex, setLevelIndex] = useState(level - 1);
  const [roundIndex, setRoundIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [activeStickerId, setActiveStickerId] = useState<string | null>(null);

  // 정답으로 처리된 object ID
  const [matchedObjectIds, setMatchedObjectIds] = useState<string[]>([]);
  const [isTargetFront, setIsTargetFront] = useState(false);

  const tutorialFromRef = useRef<View>(null); // ⭐ 추가: 첫 스티커 가리킬 ref
  const [showTutorial, setShowTutorial] = useState(false); // ⭐ 추가

  // --------------------------------------------------
  // 레벨
  // --------------------------------------------------
  const levelConfig =
    classificationLevels[levelIndex] ??
    classificationLevels[classificationLevels.length - 1];

  // ⭐ 추가: 레벨/라운드가 바뀔 때마다 튜토리얼 노출 여부 결정
  useEffect(() => {
    if (levelConfig.level === 1) {
      setShowTutorial(true); // level1이면 매 라운드 다시 노출
    } else {
      setShowTutorial(false); // level2부터는 아예 안 뜸
    }
  }, [levelConfig.level, roundIndex]);

  // 부모 컴포넌트 상단에 추가
  const missingItemRef = useRef<View>(null);

  // 중복 판정 방지
  const isProcessingRef = useRef(false);

  // 부모 컴포넌트 상단에 영역 저장용 ref 추가
  const gameBoardRef = useRef<View>(null);
  const gameBoardLayout = useRef<Layout>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  // --------------------------------------------------
  // 5개의 라운드 생성
  // --------------------------------------------------
  const [rounds, setRounds] = useState(() => generateRounds(levelConfig));
  // --------------------------------------------------
  // 현재 라운드
  // --------------------------------------------------
  const currentRound = rounds[roundIndex] as ClassificationRound;
  const target = currentRound.targets[0];

  // ⭐ 추가: 현재 라운드의 정답 오브젝트 id
  const correctObjectId = Object.keys(currentRound.answer)[0];

  // ⭐ 추가: 정답 오브젝트 자체 (색상/모양 정보 필요)
  const correctObject = currentRound.objects.find(
    (o) => o.id === correctObjectId,
  );
  // --------------------------------------------------
  // 드롭 판정
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
        const target = {
          x: targetX,
          y: targetY,
          width: targetWidth,
          height: targetHeight,
        };
        const isInside = isStickerInsideTarget(sticker, target);
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
  // 정답 처리: ⭐ 여기서는 애니메이션을 직접 실행하지 않는다. 자식이 애니메이션을 담당하고, 부모는 "정답 이후 무엇을 할지"만 담당한다.
  // --------------------------------------------------
  const handleCorrect = (objectId: string) => {
    // 이미 처리 중이면 무시
    if (isProcessingRef.current) {
      return;
    }

    isProcessingRef.current = true;
    // console.log("🎯 handleCorrect 호출됨, objectId:", objectId);
    // console.log("🎯 현재 objects 목록:", currentRound.objects);
    // // ⭐ 정답 순간 TargetSection을 맨 앞으로
    setIsTargetFront(true);
    // ----------------------------------------------
    // 1. 먼저 성공 메시지
    // ----------------------------------------------
    setFeedback("참 잘했어요! 👏");

    // ----------------------------------------------
    // 2. TargetBox의 회색 칸을 색칠: 이게 부모의 state 변경
    // ----------------------------------------------
    setMatchedObjectIds((prev) => {
      const next = prev.includes(objectId) ? prev : [...prev, objectId];
      //   console.log("🎯 matchedObjectIds 갱신:", { prev, objectId, next });
      return next;
    });

    // ----------------------------------------------
    // 3. 1초 후 다음 라운드
    // ----------------------------------------------
    setTimeout(() => {
      setFeedback(null);
      if (roundIndex < rounds.length - 1) {
        setRoundIndex((prev) => prev + 1);
        // 다음 라운드에서는 초기화
        setMatchedObjectIds([]);
        // ⭐ 다음 라운드에서는 Target을 다시 원래 레이어로
        setIsTargetFront(false);
      } else {
        setShowSuccessModal(true);
        // ⭐ 다음 라운드에서는 Target을 다시 원래 레이어로
        setIsTargetFront(false);
      }
      isProcessingRef.current = false;
    }, 1000);
  };

  // --------------------------------------------------
  // 오답 처리 (타겟 안에 넣었지만 틀렸을 때)
  // --------------------------------------------------
  const handleWrong = () => {
    setFeedback("앗, 이 색이 아니에요! 다른 곳을 찾아볼까요?");
    setTimeout(() => {
      setFeedback(null);
    }, 1200);
  };

  // --------------------------------------------------
  // 영역 밖 처리 (타겟이 아닌 엉뚱한 곳에 놓았을 때)
  // --------------------------------------------------
  const handleOutside = () => {
    setFeedback("앗, 빈 곳에 놓았네요! 회색 빈칸에 쏙 넣어봐요!");
    setTimeout(() => {
      setFeedback(null);
    }, 1200);
  };
  // console.log("🎮 GAME START", {
  //   requestedLevel: level,
  //   levelIndex,
  //   levelConfig: levelConfig.level,
  // });

  return (
    <Container>
      <GameHeader levelConfig={levelConfig} roundIndex={roundIndex} />
      <MissionBubbleArea feedback={feedback} target={target} />
      <GameBoard
        ref={gameBoardRef}
        onLayout={(event) => {
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
          onGrab={setActiveStickerId}
          onRelease={handleDrop}
          onCorrectAnimationComplete={handleCorrect}
          onWrong={handleWrong}
          onOutside={handleOutside}
          correctObjectId={correctObjectId} // ⭐ 추가
          registerFirstStickerRef={(el) => {
            // ⭐ 추가: 첫 번째 스티커의 실제 View를 tutorialFromRef에 저장
            tutorialFromRef.current = el;
          }}
        />
      </GameBoard>
      {/* ⭐ 추가: 튜토리얼 오버레이 (GameBoard 밖, Container 안 아무 데나) */}
      <TutorialOverlay
        visible={showTutorial}
        onComplete={() => setShowTutorial(false)}
        fromRef={tutorialFromRef}
        toRef={missingItemRef}
        shapeId={correctObject?.name} // ⭐ 추가: 실제 모양
        colorKey={correctObject?.color} // ⭐ 추가: 실제 색상
      />
      <SuccessModal
        show={showSuccessModal}
        levelIndex={levelIndex}
        onRestart={() => {
          setRounds(generateRounds(levelConfig));
          setRoundIndex(0);
          setMatchedObjectIds([]);
          setShowSuccessModal(false);
        }}
        onNextLevel={() => {
          const nextLevelIndex = levelIndex + 1;
          setLevelIndex((prev) => prev + 1); // 레벨 번호를 다음 단계로 올리고! (예: 1 -> 2)
          const nextConfig =
            classificationLevels[nextLevelIndex] || levelConfig;
          setRounds(generateRounds(nextConfig));
          setRoundIndex(0); // 새 레벨의 첫 번째 라운드(0)부터 시작!
          setMatchedObjectIds([]); // 맞춘 기록 초기화
          setShowSuccessModal(false); // 모달 닫기
        }}
      />
      {/* ⭐ Level 1에서만 튜토리얼 */}
      {/* {showTutorial && (
        <TutorialOverlay
          onStart={() => {
            setShowTutorial(false);
          }}
        />
      )} */}
    </Container>
  );
}
