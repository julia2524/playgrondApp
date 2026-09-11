import { useEffect, useRef } from "react";

import { Animated, PanResponder, View } from "react-native";

import { clamp } from "../logic/judgeDropPosition";

import {
  BOARD_HORIZONTAL_PADDING,
  BOARD_VERTICAL_PADDING,
  CORRECT_ANIMATION_DURATION_MS,
  STICKER_SIZE,
} from "../../classification/assets/dragConstants";

import {
  COLORS,
  PASTEL_BG,
  SOFT_COLORS,
} from "../../../design-system/tokens/colors";

import { playSound, playStreakNote } from "../../../utils/sound";

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

import { RenderCategoryItemSvg } from "../category/assets/categoryItemSvgs";

export function DraggableObjectSticker({
  obj,
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
  soundEffect,
  soundSettingLoaded,
  roundAnsweredRef,
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
    obj: DisplayObject,
    stickerX: number,
    stickerY: number,
    width: number,
    height: number,
    callback: (result: DropResult) => void,
  ) => void;

  registerRef?: (el: View | null) => void;

  correctStreakCount: number;

  soundEffect: boolean;

  soundSettingLoaded: boolean;

  // ⭐⭐⭐ 모든 스티커가 공유하는
  // 이번 라운드 답변 여부
  roundAnsweredRef: React.MutableRefObject<boolean>;
}) {
  // ==================================================
  // Sticker ref
  // ==================================================

  const stickerRef = useRef<View>(null);

  const setStickerRef = (el: View | null) => {
    stickerRef.current = el;
    registerRef?.(el);
  };

  // ==================================================
  // ⭐ 개별 스티커가 이미 답변 처리됐는지
  // ==================================================

  const hasAnsweredRef = useRef(false);

  // ==================================================
  // ⭐ 현재 실제로 이 스티커를 잡고 있는지
  // ==================================================

  const isInteractingRef = useRef(false);

  // ==================================================
  // Animated values
  // ==================================================

  const position = useRef(new Animated.ValueXY()).current;

  const shakeX = useRef(new Animated.Value(0)).current;

  const scale = useRef(new Animated.Value(1)).current;

  const pressScale = useRef(new Animated.Value(1)).current;

  const opacity = useRef(new Animated.Value(1)).current;

  // ==================================================
  // Position
  // ==================================================

  const startPosition = useRef({
    x: 0,
    y: 0,
  });

  const startScreenPosition = useRef({
    x: 0,
    y: 0,
  });

  const isScreenPositionReadyRef = useRef(false);

  // ==================================================
  // Sound refs
  // ==================================================

  const soundEffectRef = useRef(soundEffect);

  const soundSettingLoadedRef = useRef(soundSettingLoaded);

  useEffect(() => {
    soundEffectRef.current = soundEffect;

    soundSettingLoadedRef.current = soundSettingLoaded;
  }, [soundEffect, soundSettingLoaded]);

  // ==================================================
  // Correct Animation
  // ==================================================

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

  // ==================================================
  // Wrong Animation
  // ==================================================

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

  // ==================================================
  // PanResponder
  // ==================================================

  const panResponder = useRef(
    PanResponder.create({
      // ==================================================
      // ⭐⭐⭐ 드래그 시작 가능 여부
      // ==================================================

      onStartShouldSetPanResponder: () => {
        // 이 스티커가 이미 답변했으면 안 됨
        if (hasAnsweredRef.current) {
          return false;
        }

        // ⭐ 다른 스티커가 이미 이번 라운드에서
        // 답변을 시작했으면 안 됨
        if (roundAnsweredRef.current) {
          return false;
        }

        return true;
      },

      onMoveShouldSetPanResponder: () => {
        if (hasAnsweredRef.current) {
          return false;
        }

        if (roundAnsweredRef.current) {
          return false;
        }

        return true;
      },

      // ==================================================
      // Grab
      // ==================================================

      onPanResponderGrant: () => {
        // --------------------------------------------------
        // ⭐ 이중 방어
        // --------------------------------------------------

        if (isInteractingRef.current) {
          return;
        }

        if (hasAnsweredRef.current) {
          return;
        }

        if (roundAnsweredRef.current) {
          return;
        }

        // --------------------------------------------------
        // ⭐⭐⭐⭐⭐ 핵심
        //
        // 이 스티커를 잡는 순간
        // 라운드 전체를 잠근다.
        //
        // 따라서 다른 스티커는
        // 이제 잡을 수 없다.
        // --------------------------------------------------

        roundAnsweredRef.current = true;

        isInteractingRef.current = true;

        // --------------------------------------------------
        // Sound
        // --------------------------------------------------

        if (soundSettingLoadedRef.current && soundEffectRef.current) {
          playSound("grab");
        }

        // --------------------------------------------------
        // Haptic
        // --------------------------------------------------

        triggerHaptic("light");

        // --------------------------------------------------
        // Parent
        // --------------------------------------------------

        onGrab(obj.id);

        // --------------------------------------------------
        // Screen position
        // --------------------------------------------------

        isScreenPositionReadyRef.current = false;

        // --------------------------------------------------
        // 시작 위치 저장
        // --------------------------------------------------

        startPosition.current = {
          x: (position.x as any)._value,

          y: (position.y as any)._value,
        };

        // --------------------------------------------------
        // Press animation
        // --------------------------------------------------

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

        // --------------------------------------------------
        // 현재 화면 위치 측정
        // --------------------------------------------------

        stickerRef.current?.measureInWindow((x, y) => {
          startScreenPosition.current = {
            x,
            y,
          };

          isScreenPositionReadyRef.current = true;
        });
      },

      // ==================================================
      // Move
      // ==================================================

      onPanResponderMove: (_, gesture) => {
        // --------------------------------------------------
        // ⭐⭐⭐ 중요
        //
        // 여기서는 roundAnsweredRef를 검사하지 않는다.
        //
        // 왜냐하면 내가 잡은 순간 이미
        // roundAnsweredRef = true가 되기 때문이다.
        //
        // 여기서 검사하면 현재 잡은 스티커까지
        // 움직이지 않게 된다.
        // --------------------------------------------------

        if (!isScreenPositionReadyRef.current) {
          return;
        }

        if (hasAnsweredRef.current) {
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

      // ==================================================
      // Release
      // ==================================================

      onPanResponderRelease: () => {
        isScreenPositionReadyRef.current = false;

        // --------------------------------------------------
        // Press animation 복귀
        // --------------------------------------------------

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

        // --------------------------------------------------
        // 위치 측정 후 판정
        // --------------------------------------------------

        stickerRef.current?.measureInWindow((x, y, width, height) => {
          onRelease(obj, x, y, width, height, (result) => {
            // --------------------------------------------------
            // ⭐ 이미 이 스티커가 처리됐다면 무시
            // --------------------------------------------------

            if (hasAnsweredRef.current) {
              return;
            }

            hasAnsweredRef.current = true;

            // ==================================================
            // CORRECT
            // ==================================================

            if (result === "correct") {
              if (soundSettingLoadedRef.current && soundEffectRef.current) {
                playStreakNote(correctStreakCount);
              }

              triggerHaptic("success");

              setTimeout(() => {
                playCorrectAnimation(() => {
                  onCorrectAnimationComplete(obj.id);

                  isInteractingRef.current = false;
                });
              }, 150);

              return;
            }

            // ==================================================
            // WRONG
            // ==================================================

            if (result === "wrong") {
              if (soundSettingLoadedRef.current && soundEffectRef.current) {
                playSound("wrong_sound");
              }

              triggerHaptic("error");

              setTimeout(() => {
                playWrongAnimation();

                onWrong();

                isInteractingRef.current = false;
              }, 150);

              return;
            }

            // ==================================================
            // OUTSIDE
            // ==================================================

            if (result === "outside") {
              if (soundSettingLoadedRef.current && soundEffectRef.current) {
                playSound("wrong_sound");
              }

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

      // ==================================================
      // Terminate
      // ==================================================

      onPanResponderTerminate: () => {
        isScreenPositionReadyRef.current = false;

        isInteractingRef.current = false;

        // --------------------------------------------------
        // ⭐ 실제 release/답변이 발생한 게 아니므로
        // 이번 라운드 잠금을 풀어준다.
        //
        // 그래야 제스처가 시스템에 의해 중단된 경우
        // 다시 잡을 수 있다.
        // --------------------------------------------------

        roundAnsweredRef.current = false;

        // --------------------------------------------------
        // Press animation 복귀
        // --------------------------------------------------

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

  // ==================================================
  // Render Color
  // ==================================================

  const colorHex =
    obj.kind === "category"
      ? obj.color
      : obj.color
        ? (COLORS[obj.color] ?? "#FFFFFF")
        : undefined;

  const softColor =
    obj.kind === "category"
      ? PASTEL_BG.neutral
      : obj.color
        ? SOFT_COLORS[obj.color]
        : PASTEL_BG.neutral;

  // ==================================================
  // Render SVG
  // ==================================================

  const renderSvg = () => {
    // --------------------------------------------------
    // Color
    // --------------------------------------------------

    if (obj.kind === "color") {
      return (
        <RenderColorItemSvg
          shapeId={obj.renderId}
          colorHex={colorHex ?? "#FFFFFF"}
        />
      );
    }

    // --------------------------------------------------
    // Shape Item
    // --------------------------------------------------

    if (obj.kind === "item") {
      return <RenderShapeItemSvg itemId={obj.renderId} colorHex={colorHex} />;
    }

    // --------------------------------------------------
    // Category
    // --------------------------------------------------

    if (obj.kind === "category") {
      return (
        <RenderCategoryItemSvg
          itemId={obj.renderId}
          colorHex={obj.variant?.primary ?? colorHex}
          primary={obj.variant?.primary}
          secondary={obj.variant?.secondary}
          accent={obj.variant?.accent}
          pattern={obj.variant?.pattern}
        />
      );
    }

    // --------------------------------------------------
    // Basic Shape
    // --------------------------------------------------

    return <RenderBasicShapeSvg shapeId={obj.renderId} colorHex={colorHex} />;
  };

  // ==================================================
  // Render
  // ==================================================

  return (
    <ObjectStickerShadowWrapper>
      <Animated.View
        ref={setStickerRef}
        {...panResponder.panHandlers}
        style={{
          transform: [
            {
              translateX: position.x,
            },
            {
              translateY: position.y,
            },
          ],

          zIndex: isActive ? 9999 : 1,

          elevation: isActive ? 99 : 1,
        }}
      >
        <ObjectSticker
          color={softColor ?? "transparent"}
          itemCount={itemCount}
          renderToHardwareTextureAndroid={true}
          needsOffscreenAlphaCompositing={true}
          style={{
            transform: [
              {
                translateX: shakeX,
              },
              {
                scale,
              },
              {
                scale: pressScale,
              },
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
