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
} from "../../../../../constants/dragConstants";

import { COLORS, SOFT_COLORS } from "../../../../../constants/colors";

import { RenderItemSvg } from "../../../../../constants/ColorItemSvgs";

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
  registerRef,
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

  registerRef?: (el: View | null) => void;
}) {
  const stickerRef = useRef<View>(null);

  // ⭐ 내부 ref + 외부 정답 ref 연결
  const setStickerRef = (el: View | null) => {
    stickerRef.current = el;

    registerRef?.(el);
  };

  const position = useRef(new Animated.ValueXY()).current;

  const shakeX = useRef(new Animated.Value(0)).current;

  const scale = useRef(new Animated.Value(1)).current;

  const opacity = useRef(new Animated.Value(1)).current;

  const startPosition = useRef({
    x: 0,
    y: 0,
  });

  const startScreenPosition = useRef({
    x: 0,
    y: 0,
  });

  const isScreenPositionReadyRef = useRef(false);

  // --------------------------------------------------
  // Correct Animation
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
  // Wrong Animation
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

  // --------------------------------------------------
  // PanResponder
  // --------------------------------------------------

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onMoveShouldSetPanResponder: () => true,

      // ⭐⭐⭐ 잡는 순간
      onPanResponderGrant: () => {
        // 부모에게 알려서 tutorial 즉시 제거
        onGrab(obj.id);

        isScreenPositionReadyRef.current = false;

        startPosition.current = {
          x: (position.x as any)._value,
          y: (position.y as any)._value,
        };

        stickerRef.current?.measureInWindow((x, y) => {
          startScreenPosition.current = {
            x,
            y,
          };

          isScreenPositionReadyRef.current = true;
        });
      },

      // --------------------------------------------------
      // Move
      // --------------------------------------------------

      onPanResponderMove: (_, gesture) => {
        if (!isScreenPositionReadyRef.current) {
          return;
        }

        const board = gameBoardLayout.current;

        const boardLeft = board.x + BOARD_HORIZONTAL_PADDING;

        const boardTop = board.y + BOARD_VERTICAL_PADDING;

        const boardRight = board.x + board.width - BOARD_HORIZONTAL_PADDING;

        const boardBottom = board.y + board.height - BOARD_VERTICAL_PADDING;

        const currentScreenX = startScreenPosition.current.x + gesture.dx;

        const currentScreenY = startScreenPosition.current.y + gesture.dy;

        const minScreenX = boardLeft;

        const maxScreenX = boardRight - STICKER_SIZE;

        const minScreenY = boardTop;

        const maxScreenY = boardBottom - STICKER_SIZE;

        const clampedScreenX = clamp(currentScreenX, minScreenX, maxScreenX);

        const clampedScreenY = clamp(currentScreenY, minScreenY, maxScreenY);

        const deltaX = clampedScreenX - startScreenPosition.current.x;

        const deltaY = clampedScreenY - startScreenPosition.current.y;

        position.setValue({
          x: startPosition.current.x + deltaX,

          y: startPosition.current.y + deltaY,
        });
      },

      // --------------------------------------------------
      // Release
      // --------------------------------------------------

      onPanResponderRelease: () => {
        isScreenPositionReadyRef.current = false;

        stickerRef.current?.measureInWindow((x, y, width, height) => {
          onRelease(
            obj,
            x,
            y,
            width,
            height,

            (result) => {
              // ---------------------
              // Correct
              // ---------------------

              if (result === "correct") {
                playCorrectAnimation(() => {
                  onCorrectAnimationComplete(obj.id);
                });

                return;
              }

              // ---------------------
              // Wrong
              // ---------------------

              if (result === "wrong") {
                playWrongAnimation();

                onWrong();

                return;
              }

              // ---------------------
              // Outside
              // ---------------------

              if (result === "outside") {
                playWrongAnimation();

                onOutside();

                return;
              }
            },
          );
        });
      },

      onPanResponderTerminate: () => {
        isScreenPositionReadyRef.current = false;
      },
    }),
  ).current;

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <Animated.View
      ref={setStickerRef}
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

        zIndex: isActive ? 9999 : 1,

        elevation: isActive ? 99 : 1,
      }}
    >
      <ObjectSticker color={SOFT_COLORS[obj.color]} itemCount={itemCount}>
        <RenderItemSvg
          shapeId={obj.name}
          colorHex={COLORS[obj.color] || "#FFF"}
        />
      </ObjectSticker>
    </Animated.View>
  );
}
