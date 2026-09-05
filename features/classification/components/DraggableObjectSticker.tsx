import { useEffect, useRef } from "react";

import { Animated, PanResponder, View } from "react-native";

import { clamp } from "../logic/judgeDropPosition";

import {
  BOARD_HORIZONTAL_PADDING,
  BOARD_VERTICAL_PADDING,
  CORRECT_ANIMATION_DURATION_MS,
  STICKER_SIZE,
} from "../../classification/assets/dragConstants";
import { COLORS, SOFT_COLORS } from "../../../design-system/tokens/colors";

import {
  playLastSuccessNote,
  playSound,
  playStreakNote,
  preloadSounds,
} from "../../../utils/sound";
import { triggerHaptic } from "../../../utils/haptic";
import { RenderColorItemSvg } from "../../classification/color/assets/ColorItemSvgs";

import {
  ObjectSticker,
  ObjectStickerShadowWrapper,
} from "../styles/classificationStyles";
import { DropResult, Layout } from "../type/types";
import {
  RenderBasicShapeSvg,
  RenderShapeItemSvg,
} from "../shape/assets/shapeItemSvgs";
import { DisplayObject } from "../type/displayTypes";

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
  correctStreakCount,
}: {
  obj: DisplayObject;
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
  correctStreakCount: number;
}) {
  // ⭐ measureInWindow 대상은 이제 "바깥(position) 레이어"의 ref
  const stickerRef = useRef<View>(null);
  const isInteractingRef = useRef(false);

  // ⭐ 내부 ref + 외부 정답 ref 연결
  const setStickerRef = (el: View | null) => {
    stickerRef.current = el;
    registerRef?.(el);
  };

  // --------------------------------------------------
  // Animated Values
  // --------------------------------------------------
  // ⭐ position: 드래그 위치 전용 — 바깥 레이어에서만 사용
  const position = useRef(new Animated.ValueXY()).current;

  // ⭐ 아래 넷은 전부 "안쪽 비주얼 레이어" 전용 — native driver로 통일
  const shakeX = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const pressScale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const startPosition = useRef({ x: 0, y: 0 });
  const startScreenPosition = useRef({ x: 0, y: 0 });
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
        useNativeDriver: true,
      }),
      Animated.timing(shakeX, {
        toValue: 12,
        duration: 60,
        useNativeDriver: true,
      }),
      Animated.timing(shakeX, {
        toValue: -8,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeX, {
        toValue: 8,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.spring(shakeX, {
        toValue: 0,
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
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      // ⭐⭐⭐ 잡는 순간
      onPanResponderGrant: () => {
        if (isInteractingRef.current) return;
        isInteractingRef.current = true;

        playSound("grab");
        triggerHaptic("light");
        onGrab(obj.id);

        isScreenPositionReadyRef.current = false;

        startPosition.current = {
          x: (position.x as any)._value,
          y: (position.y as any)._value,
        };

        Animated.parallel([
          Animated.timing(pressScale, {
            toValue: 0.9,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.8,
            duration: 100,
            useNativeDriver: true,
          }),
        ]).start();

        stickerRef.current?.measureInWindow((x, y) => {
          startScreenPosition.current = { x, y };
          isScreenPositionReadyRef.current = true;
        });
      },

      // --------------------------------------------------
      // Move
      // --------------------------------------------------
      onPanResponderMove: (_, gesture) => {
        if (!isScreenPositionReadyRef.current) return;

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

        Animated.parallel([
          Animated.timing(pressScale, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
        ]).start();

        stickerRef.current?.measureInWindow((x, y, width, height) => {
          onRelease(obj, x, y, width, height, (result) => {
            if (result === "correct") {
              playStreakNote(correctStreakCount);
              triggerHaptic("success");

              setTimeout(() => {
                playCorrectAnimation(() => {
                  onCorrectAnimationComplete(obj.id);
                  isInteractingRef.current = false;
                });
              }, 150);
              return;
            }

            if (result === "wrong") {
              playSound("wrong_sound");
              triggerHaptic("error");

              setTimeout(() => {
                playWrongAnimation();
                onWrong();
                isInteractingRef.current = false;
              }, 150);
              return;
            }

            if (result === "outside") {
              playSound("wrong_sound");
              triggerHaptic("light");

              setTimeout(() => {
                playWrongAnimation();
                onOutside();
                isInteractingRef.current = false;
              }, 150);
              return;
            }
          });
        });
      },

      onPanResponderTerminate: () => {
        isScreenPositionReadyRef.current = false;
        isInteractingRef.current = false;

        Animated.parallel([
          Animated.timing(pressScale, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
        ]).start();
      },
    }),
  ).current;

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  const colorHex = COLORS[obj.color ?? "blue"] ?? "#FFFFFF";
  const softColor = obj.color ? SOFT_COLORS[obj.color] : undefined;

  const renderSvg = () => {
    if (obj.kind === "color") {
      return <RenderColorItemSvg shapeId={obj.renderId} colorHex={colorHex} />;
    }
    if (obj.kind === "item") {
      return <RenderShapeItemSvg itemId={obj.renderId} colorHex={colorHex} />;
    }
    return <RenderBasicShapeSvg shapeId={obj.renderId} colorHex={colorHex} />;
  };

  return (
    <ObjectStickerShadowWrapper>
      {/* ⭐⭐⭐ 바깥 레이어: 드래그 위치 전용
          - measureInWindow는 여기서 재기 때문에 native 애니메이션과 절대 안 섞임
          - panHandlers도 여기에 붙임 (제스처 감지 영역) */}
      <Animated.View
        ref={setStickerRef}
        {...panResponder.panHandlers}
        style={{
          transform: [{ translateX: position.x }, { translateY: position.y }],
          zIndex: isActive ? 9999 : 1,
          elevation: isActive ? 99 : 1,
        }}
      >
        {/* ⭐⭐⭐ 안쪽 레이어: 순수 비주얼 피드백 전용
            - shakeX / scale / pressScale / opacity 전부 native로 마음껏
            - ObjectSticker는 이미 styled(Animated.View)라 style prop이
              자체 스타일과 자동 병합됨 (추가 View 안 만들어도 됨) */}
        <ObjectSticker
          color={softColor ?? "transparent"}
          itemCount={itemCount}
          renderToHardwareTextureAndroid={true}
          needsOffscreenAlphaCompositing={true}
          style={{
            transform: [
              { translateX: shakeX },
              { scale },
              { scale: pressScale },
            ],
            opacity,
          }}
        >
          {renderSvg()}
        </ObjectSticker>
      </Animated.View>
    </ObjectStickerShadowWrapper>
  );
}
