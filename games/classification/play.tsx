// 화면 조립만 (얇게!)
import React, { useMemo, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components/native";

import { classificationLevels } from "./levels";
import { ClassificationRound } from "./types";
import { createLevel1ColorRound } from "./generators";
import { COLOR_NAMES, COLORS } from "../../constants/colors";
import {
  BackText,
  ButtonText,
  Container,
  GameBoard,
  Header,
  MissionBubble,
  MissionText,
  ObjectsContainer,
  ObjectSection,
  ObjectSticker,
  RoundIndicator,
  SectionLabel,
  StickerText,
  SuccessButton,
  SuccessModalContent,
  SuccessModalOverlay,
  SuccessTitle,
  TargetBox,
  TargetItemCircle,
  TargetItemsGrid,
  TargetItemText,
  TargetSection,
  TitleText,
} from "./styles/classificationStyles";
import { clamp, isStickerInsideTarget } from "./logic/judgeDropPosition";
import {
  BOARD_HORIZONTAL_PADDING,
  BOARD_VERTICAL_PADDING,
  CORRECT_ANIMATION_DURATION_MS,
  STICKER_SIZE,
} from "../../constants/dragConstants";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// --------------------------------------------------
// 타입
// --------------------------------------------------

type DropResult = "correct" | "wrong" | "outside";
type Layout = {
  x: number;
  y: number;
  width: number;
  height: number;
};
// --------------------------------------------------
// DraggableObjectSticker
//
// "나는 어떻게 움직일까?"를 담당
// --------------------------------------------------

function DraggableObjectSticker({
  obj,
  color,
  gameBoardLayout,
  onRelease,
  onCorrectAnimationComplete,
}: {
  obj: any;
  color: string;
  gameBoardLayout: React.MutableRefObject<Layout>;
  onCorrectAnimationComplete: (objectId: string) => void;
  onRelease: (
    obj: any,
    stickerX: number,
    stickerY: number,
    width: number,
    height: number,
    callback: (result: DropResult) => void,
  ) => void;
}) {
  const stickerRef = useRef<View>(null);

  // 드래그 위치
  const position = useRef(new Animated.ValueXY()).current;

  // 정답 애니메이션
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  // 이번 드래그가 시작된 위치
  const startPosition = useRef({
    x: 0,
    y: 0,
  });
  const startScreenPosition = useRef({
    x: 0,
    y: 0,
  });

  const isDraggingRef = useRef(false);
  const isScreenPositionReadyRef = useRef(false);

  // --------------------------------------------------a
  // 정답 애니메이션
  //
  // 현재 위치에서
  // 작아짐 + 투명해짐
  //      ↓
  // 애니메이션 완료
  //      ↓
  // 부모에게 완료 전달
  // --------------------------------------------------

  const playCorrectAnimation = (onComplete: () => void) => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 0,
        duration: CORRECT_ANIMATION_DURATION_MS,
        useNativeDriver: true,
      }),

      Animated.timing(opacity, {
        toValue: 0,
        duration: CORRECT_ANIMATION_DURATION_MS,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        onComplete();
      }
    });
  };

  // --------------------------------------------------
  // 오답 애니메이션
  //
  // "현재 위치"를 기준으로 흔들기
  //
  // 원래 위치로 돌아가지 않는다!
  // --------------------------------------------------

  const playWrongAnimation = () => {
    const currentX = (position.x as any)._value;
    const currentY = (position.y as any)._value;

    Animated.sequence([
      // 왼쪽
      Animated.timing(position, {
        toValue: {
          x: currentX - 12,
          y: currentY,
        },
        duration: 60,
        useNativeDriver: true,
      }),

      // 오른쪽
      Animated.timing(position, {
        toValue: {
          x: currentX + 12,
          y: currentY,
        },
        duration: 60,
        useNativeDriver: true,
      }),

      // 다시 왼쪽
      Animated.timing(position, {
        toValue: {
          x: currentX - 8,
          y: currentY,
        },
        duration: 50,
        useNativeDriver: true,
      }),

      // 다시 오른쪽
      Animated.timing(position, {
        toValue: {
          x: currentX + 8,
          y: currentY,
        },
        duration: 50,
        useNativeDriver: true,
      }),

      // 정확히 현재 위치
      Animated.spring(position, {
        toValue: {
          x: currentX,
          y: currentY,
        },
        friction: 4,
        tension: 120,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // --------------------------------------------------
  // PanResponder
  // --------------------------------------------------

  const panResponder = useRef(
    PanResponder.create({
      // 손가락을 대면 드래그 시작
      onStartShouldSetPanResponder: () => true,

      onMoveShouldSetPanResponder: () => true,

      // ------------------------------------------------
      // 드래그 시작
      // ------------------------------------------------

      onPanResponderGrant: () => {
        isDraggingRef.current = true;

        // ⭐ 아직 화면 좌표 측정 안 됨
        isScreenPositionReadyRef.current = false;

        // 현재 위치를 이번 드래그의 시작 위치로 저장
        startPosition.current = {
          x: (position.x as any)._value,
          y: (position.y as any)._value,
        };
        //경계 제한까지 하려면 화면상 시작 위치가 필요
        stickerRef.current?.measureInWindow((x, y) => {
          startScreenPosition.current = {
            x,
            y,
          };
          // ⭐ 이제부터 드래그 이동 허용
          isScreenPositionReadyRef.current = true;
        });
        stickerRef.current?.setNativeProps({
          style: { zIndex: 9999, elevation: 99 },
        });

        // console.log("🟡 DRAG START", startPosition.current);
      },

      // ------------------------------------------------
      // 드래그 중
      // ------------------------------------------------

      onPanResponderMove: (_, gesture) => {
        // position.setValue({
        //   x: startPosition.current.x + gesture.dx,
        //   y: startPosition.current.y + gesture.dy,
        // });
        // ⭐ 화면 좌표 측정이 끝나기 전에는 position을 절대로 건드리지 않는다.
        if (!isScreenPositionReadyRef.current) {
          return;
        }

        const board = gameBoardLayout.current;

        // GameBoard의 실제 화면 영역
        const boardLeft = board.x + BOARD_HORIZONTAL_PADDING;

        const boardTop = board.y + BOARD_VERTICAL_PADDING;

        const boardRight = board.x + board.width - BOARD_HORIZONTAL_PADDING;

        const boardBottom = board.y + board.height - BOARD_VERTICAL_PADDING;

        // ------------------------------------------------
        // 현재 스티커의 실제 화면 위치
        // ------------------------------------------------

        const currentScreenX = startScreenPosition.current.x + gesture.dx;

        const currentScreenY = startScreenPosition.current.y + gesture.dy;

        // ------------------------------------------------
        // circle 전체가 board 안에 있도록 제한
        // ------------------------------------------------

        const minScreenX = boardLeft;

        const maxScreenX = boardRight - STICKER_SIZE;

        const minScreenY = boardTop;

        const maxScreenY = boardBottom - STICKER_SIZE;

        // ------------------------------------------------
        // 실제 화면좌표를 안전한 화면좌표로 제한
        // ------------------------------------------------

        const clampedScreenX = clamp(currentScreenX, minScreenX, maxScreenX);

        const clampedScreenY = clamp(currentScreenY, minScreenY, maxScreenY);

        // ------------------------------------------------
        // 화면좌표 → position의 상대 이동값으로 변환
        // ------------------------------------------------

        const deltaX = clampedScreenX - startScreenPosition.current.x;

        const deltaY = clampedScreenY - startScreenPosition.current.y;

        position.setValue({
          x: startPosition.current.x + deltaX,

          y: startPosition.current.y + deltaY,
        });
      },

      // ------------------------------------------------
      // 손을 뗌
      // ------------------------------------------------

      onPanResponderRelease: () => {
        isDraggingRef.current = false;
        // ⭐ 이번 드래그 종료
        isScreenPositionReadyRef.current = false;
        // 🌟 [핵심 2] 손을 뗄 때 zIndex를 다시 제자리로 돌려놓음 (중요!)
        stickerRef.current?.setNativeProps({
          style: { zIndex: 1, elevation: 1 },
        });

        // 손을 뗀 순간의 실제 화면 좌표를 측정
        stickerRef.current?.measureInWindow((x, y, width, height) => {
          // 부모에게 판정을 맡긴다.
          onRelease(
            obj,
            x,
            y,
            width,
            height,

            // ------------------------------------------
            // 부모가 판정 결과를 알려준다.
            // ------------------------------------------

            (result) => {
              // ----------------------------------------
              // 정답
              // ----------------------------------------

              if (result === "correct") {
                playCorrectAnimation(() => {
                  console.log("✨ CORRECT ANIMATION FINISHED:", obj.id);
                  // ⭐ 여기까지 왔다는 건 스티커가 사라졌다는 뜻!
                  onCorrectAnimationComplete(obj.id);
                });

                return;
              }

              // ----------------------------------------
              // 오답
              // ----------------------------------------

              if (result === "wrong") {
                playWrongAnimation();

                return;
              }

              // ----------------------------------------
              // 타겟 밖
              //
              // 아무 애니메이션도 하지 않는다.
              // 현재 위치 그대로 유지.
              // ----------------------------------------

              if (result === "outside") {
                return;
              }
            },
          );
        });
      },
    }),
  ).current;

  // --------------------------------------------------
  // 화면
  // --------------------------------------------------

  return (
    <Animated.View
      ref={stickerRef}
      {...panResponder.panHandlers}
      style={{
        transform: [
          {
            translateX: position.x,
          },
          {
            translateY: position.y,
          },
          {
            scale,
          },
        ],
        opacity,
        // 🌟 [핵심 3] 기본 스타일의 zIndex를 999 고정이 아니라 1로 낮춰서 평소엔 형제끼리 평등하게 만듦
        zIndex: 1,
        elevation: 1,
      }}
    >
      <ObjectSticker color={color}>
        <StickerText>{obj.name ?? "물건"}</StickerText>
      </ObjectSticker>
    </Animated.View>
  );
}

// --------------------------------------------------
// 부모
//
// "정답이야? 오답이야?"를 담당
// --------------------------------------------------

export default function ClassificationPlayScreen() {
  // --------------------------------------------------
  // 레벨
  // --------------------------------------------------

  const levelConfig = classificationLevels[0];

  // --------------------------------------------------
  // TargetBox
  // --------------------------------------------------

  const targetBoxRef = useRef<View>(null);

  // 중복 판정 방지
  const isProcessingRef = useRef(false);

  // --------------------------------------------------
  // State
  // --------------------------------------------------

  const [roundIndex, setRoundIndex] = useState(0);

  const [feedback, setFeedback] = useState<string | null>(null);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // 정답으로 처리된 object ID
  const [matchedObjectIds, setMatchedObjectIds] = useState<string[]>([]);
  const [isTargetFront, setIsTargetFront] = useState(false);

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

  const rounds = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) =>
      createLevel1ColorRound(levelConfig, i + 1),
    );
  }, [levelConfig]);

  // --------------------------------------------------
  // 현재 라운드
  // --------------------------------------------------

  const currentRound = rounds[roundIndex] as ClassificationRound;

  const target = currentRound.targets[0];

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
    // TargetBox가 없으면 종료
    if (!targetBoxRef.current) {
      callback("outside");
      return;
    }

    targetBoxRef.current.measureInWindow(
      (targetX, targetY, targetWidth, targetHeight) => {
        // ----------------------------------------------
        // 스티커 중심점
        // ----------------------------------------------

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

        // ----------------------------------------------
        // 1. 타겟 밖
        // ----------------------------------------------

        if (!isInside) {
          callback("outside");
          return;
        }

        // ----------------------------------------------
        // 2. 타겟 안
        //
        // 이제 진짜 정답인지 확인
        // ----------------------------------------------

        const correctTargetId = currentRound.answer[item.id];

        // ----------------------------------------------
        // 정답
        // ----------------------------------------------

        if (correctTargetId) {
          callback("correct");
          return;
        }

        // ----------------------------------------------
        // 타겟 안이지만 오답
        // ----------------------------------------------

        callback("wrong");
      },
    );
  };

  // --------------------------------------------------
  // 정답 처리
  //
  // ⭐ 여기서는 애니메이션을 직접 실행하지 않는다.
  //
  // 자식이 애니메이션을 담당하고,
  // 부모는 "정답 이후 무엇을 할지"만 담당한다.
  // --------------------------------------------------

  const handleCorrect = (objectId: string) => {
    // 이미 처리 중이면 무시
    if (isProcessingRef.current) {
      return;
    }

    isProcessingRef.current = true;
    // ⭐ 정답 순간 TargetSection을 맨 앞으로
    setIsTargetFront(true);
    console.log("🎉 CORRECT:", objectId);

    // ----------------------------------------------
    // 1. 먼저 성공 메시지
    // ----------------------------------------------

    setFeedback("참 잘했어요! 👏");

    // ----------------------------------------------
    // 2. TargetBox의 회색 칸을 색칠
    //
    // 이게 부모의 state 변경
    // ----------------------------------------------

    setMatchedObjectIds((prev) => {
      if (prev.includes(objectId)) {
        return prev;
      }

      return [...prev, objectId];
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
  // 오답 처리
  // --------------------------------------------------

  const handleWrong = () => {
    console.log("❌ WRONG");

    setFeedback("앗, 이 색이 아니에요! 다시 해볼까요?");

    // 오답은 잠시 후 메시지만 없앤다.
    // 스티커 위치는 그대로!
    setTimeout(() => {
      setFeedback(null);
    }, 1200);
  };

  // --------------------------------------------------
  // 실제 결과 연결
  //
  // 자식 → handleDrop → 판정 → 여기
  // --------------------------------------------------

  const handleStickerResult = (item: any, result: DropResult) => {
    console.log("📦 RESULT:", result, "ITEM:", item.id);

    if (result === "correct") {
      handleCorrect(item.id);
      return;
    }

    if (result === "wrong") {
      handleWrong();
      return;
    }

    // outside
    // 아무것도 하지 않음
  };

  // --------------------------------------------------
  // 화면
  // --------------------------------------------------

  return (
    <Container>
      {/* ---------------------------------------------- */}
      {/* Header */}
      {/* ---------------------------------------------- */}

      <Header>
        <BackText>‹</BackText>

        <TitleText>🎨 오늘의 분류 (LEVEL {levelConfig.level})</TitleText>

        <RoundIndicator>{roundIndex + 1} / 5</RoundIndicator>
      </Header>

      {/* ---------------------------------------------- */}
      {/* Mission */}
      {/* ---------------------------------------------- */}

      <MissionBubble>
        <MissionText>
          {feedback ||
            `중앙에 모여 있는 ${
              target.color && COLOR_NAMES[target.color]
                ? COLOR_NAMES[target.color]
                : "아래"
            } 물건들과 같은 색을 찾아봐!`}
        </MissionText>
      </MissionBubble>

      {/* ---------------------------------------------- */}
      {/* Game Board */}
      {/* ---------------------------------------------- */}

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
        {/* -------------------------------------------- */}
        {/* Target */}
        {/* -------------------------------------------- */}

        <TargetSection isFront={isTargetFront}>
          <TargetBox
            ref={targetBoxRef}
            color={target.color ? COLORS[target.color] : "#ccc"}
          >
            <TargetItemsGrid>
              {target.items?.map((itemName: string, idx: number) => {
                // ------------------------------------
                // missing item인지
                // ------------------------------------

                const isMissingItem = itemName === currentRound.missingItem;

                // ------------------------------------
                // 현재 object 중에서 해당 물건 찾기
                // ------------------------------------

                const matchingObject = currentRound.objects.find(
                  (o) => o.name === itemName,
                );

                // ------------------------------------
                // 이 물건이 이미 정답 처리됐는지
                // ------------------------------------

                const isMatched = matchingObject
                  ? matchedObjectIds.includes(matchingObject.id)
                  : false;

                // ------------------------------------
                // 아직 정답을 안 맞혔다면 회색
                // 맞히면 target 색상
                // ------------------------------------

                const shouldBeGray = isMissingItem && !isMatched;

                const circleColor = shouldBeGray
                  ? "#E2E8F0"
                  : target.color
                    ? COLORS[target.color]
                    : "#ccc";

                const textColor = shouldBeGray ? "#94A3B8" : "#FFFFFF";

                return (
                  <TargetItemCircle
                    style={{
                      // 🌟 [핵심] 정답이 맞춰진 순간(isMatched)에는 zIndex와 elevation을 최상단으로 폭발시킴!
                      zIndex: isMatched ? 9999 : 1,
                      elevation: isMatched ? 999 : 1,
                    }}
                    key={idx}
                    color={circleColor}
                  >
                    <TargetItemText color={textColor}>
                      {itemName}
                    </TargetItemText>
                  </TargetItemCircle>
                );
              })}
            </TargetItemsGrid>
          </TargetBox>
        </TargetSection>

        {/* -------------------------------------------- */}
        {/* Objects */}
        {/* -------------------------------------------- */}

        <ObjectSection>
          <SectionLabel>아래 스티커를 골라봐요!</SectionLabel>

          <ObjectsContainer>
            {currentRound.objects.map((obj) => (
              <DraggableObjectSticker
                gameBoardLayout={gameBoardLayout}
                // ⭐ roundIndex까지 key에 넣어서
                // 새로운 라운드가 시작되면
                // 스티커 애니메이션 state도 새로 생성
                key={`${roundIndex}-${obj.id}`}
                obj={obj}
                color={obj.color ? COLORS[obj.color] : "#ccc"}
                onRelease={handleDrop}
                onCorrectAnimationComplete={handleCorrect}
              />
            ))}
          </ObjectsContainer>
        </ObjectSection>
      </GameBoard>

      {/* ---------------------------------------------- */}
      {/* Success Modal */}
      {/* ---------------------------------------------- */}

      {showSuccessModal && (
        <SuccessModalOverlay>
          <SuccessModalContent>
            <SuccessTitle>🎉 레벨 클리어! 🎉</SuccessTitle>

            <SuccessButton
              onPress={() => {
                setRoundIndex(0);
                setShowSuccessModal(false);
                setMatchedObjectIds([]);
              }}
            >
              <ButtonText>다시 하기</ButtonText>
            </SuccessButton>
          </SuccessModalContent>
        </SuccessModalOverlay>
      )}
    </Container>
  );
}
