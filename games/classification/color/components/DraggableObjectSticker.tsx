//PanResponder와 애니메이션(Animated.ValueXY)을 전담해서 처리하는 컴포넌트.
// --------------------------------------------------
// DraggableObjectSticker
// "나는 어떻게 움직일까?"를 담당

import { useRef } from "react";

import { Animated, PanResponder, View } from "react-native";

import { clamp } from "../logic/judgeDropPosition";
import { ObjectSticker } from "../styles/classificationStyles";
import { DropResult, Layout } from "../types";
import {
  BOARD_HORIZONTAL_PADDING,
  BOARD_VERTICAL_PADDING,
  CORRECT_ANIMATION_DURATION_MS,
  STICKER_SIZE,
} from "../../../../constants/dragConstants";
import { COLORS, SHAPE_POOL, SOFT_COLORS } from "../../../../constants/colors";
import { RenderItemSvg } from "../../../../constants/ColorItemSvgs";

// --------------------------------------------------
export function DraggableObjectSticker({
  obj,
  color,
  itemCount,
  gameBoardLayout,
  isActive,
  onGrab,
  onRelease,
  onCorrectAnimationComplete,
  onWrong,
  onOutside,
}: {
  obj: any;
  color: string;
  itemCount: number;
  gameBoardLayout: React.MutableRefObject<Layout>;
  isActive: boolean;
  onGrab: (objectId: string) => void;
  onCorrectAnimationComplete: (objectId: string) => void;
  onWrong: () => void;
  onOutside: () => void;
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
  const isReadyRef = useRef(false);

  // 드래그 위치
  const position = useRef(new Animated.ValueXY()).current;
  // ⭐ 오답 흔들림 전용
  const shakeX = useRef(new Animated.Value(0)).current;

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
  // 정답 애니메이션: 현재 위치에서 작아짐 + 투명해짐 애니메이션 완료 + 부모에게 완료 전달
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
  // 오답 애니메이션: "현재 위치"를 기준으로 흔들기 + 원래 위치로 돌아가지 않는다!
  // --------------------------------------------------
  const playWrongAnimation = () => {
    shakeX.setValue(0);

    Animated.sequence([
      Animated.timing(shakeX, {
        toValue: -12,
        duration: 60,
        useNativeDriver: false,
      }),

      Animated.timing(shakeX, {
        toValue: 12,
        duration: 60,
        useNativeDriver: false,
      }),

      Animated.timing(shakeX, {
        toValue: -8,
        duration: 50,
        useNativeDriver: false,
      }),

      Animated.timing(shakeX, {
        toValue: 8,
        duration: 50,
        useNativeDriver: false,
      }),

      Animated.spring(shakeX, {
        toValue: 0,
        friction: 4,
        tension: 120,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      // 손가락을 대면 드래그 시작
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      // ------------------------------------------------
      // 드래그 시작
      // ------------------------------------------------

      onPanResponderGrant: () => {
        onGrab(obj.id);
        isDraggingRef.current = true;
        isReadyRef.current = false;

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
        // stickerRef.current?.setNativeProps({
        //   style: { zIndex: 9999, elevation: 99 },
        // });
      },

      // ------------------------------------------------
      // 드래그 중
      // ------------------------------------------------

      onPanResponderMove: (_, gesture) => {
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
        // stickerRef.current?.setNativeProps({
        //   style: { zIndex: 1, elevation: 1 },
        // });

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
                  // console.log("✨ CORRECT ANIMATION FINISHED:", obj.id);
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
                onWrong();
                return;
              }

              // ----------------------------------------
              // 타겟 밖: 아무 애니메이션도 하지 않는다. + 현재 위치 그대로 유지.
              // ----------------------------------------

              if (result === "outside") {
                playWrongAnimation();
                onOutside(); // 새로 만든 handleOutside 연결!
                return;
              }
            },
          );
        });
      },
      onPanResponderTerminate: (_, gesture) => {
        isDraggingRef.current = false;
        isScreenPositionReadyRef.current = false;
      },
    }),
  ).current;

  const shapeDef = SHAPE_POOL.find((s) => s.id === obj.name);
  const displayLabel = shapeDef?.label ?? obj.name;

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
            translateX: shakeX,
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
        // ⭐ setNativeProps 대신 isActive prop 하나로 결정
        zIndex: isActive ? 9999 : 1,
        elevation: isActive ? 99 : 1,
      }}
    >
      <ObjectSticker color={SOFT_COLORS[obj.color]} itemCount={itemCount}>
        {/* //신버전 */}
        {/* <RenderItemSvg
          itemName={obj.name}
          colorHex={COLORS[obj.color] || "#FFF"}
        /> */}
        <RenderItemSvg
          shapeId={obj.name}
          colorHex={COLORS[obj.color] || "#FFF"}
        />
        {/* <StickerText itemCount={itemCount}>
          {displayLabel ?? "물건"}
        </StickerText> */}
      </ObjectSticker>
    </Animated.View>
  );
}
