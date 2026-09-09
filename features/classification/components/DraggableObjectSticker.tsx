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
  soundEffect: boolean;
  soundSettingLoaded: boolean;
}) {
  const stickerRef = useRef<View>(null);
  const isInteractingRef = useRef(false);

  // ⭐⭐⭐ 새로 추가: 이 스티커가 "이미 답변 처리됨" 상태인지 영구적으로 기억
  // 한 번 true가 되면 다음 라운드(리마운트)까지 절대 false로 안 돌아옴
  const hasAnsweredRef = useRef(false);

  const setStickerRef = (el: View | null) => {
    stickerRef.current = el;
    registerRef?.(el);
  };

  const position = useRef(new Animated.ValueXY()).current;
  const shakeX = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const pressScale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const startPosition = useRef({ x: 0, y: 0 });
  const startScreenPosition = useRef({ x: 0, y: 0 });
  const isScreenPositionReadyRef = useRef(false);

  // 1. ref 선언
  const soundEffectRef = useRef(soundEffect);
  const soundSettingLoadedRef = useRef(soundSettingLoaded);

  // 2. props가 바뀔 때마다 ref 갱신
  useEffect(() => {
    soundEffectRef.current = soundEffect;
    soundSettingLoadedRef.current = soundSettingLoaded;
  }, [soundEffect, soundSettingLoaded]);

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
      // ⭐⭐⭐ 이미 답변 처리됐으면 애초에 제스처 자체를 안 잡음
      // → onPanResponderGrant/Move/Release가 아예 호출 안 됨
      onStartShouldSetPanResponder: () => !hasAnsweredRef.current,
      onMoveShouldSetPanResponder: () => !hasAnsweredRef.current,

      // ⭐⭐⭐ 잡는 순간
      onPanResponderGrant: () => {
        // ⭐ 방어 코드 (Should*에서 이미 막지만 이중 안전장치)
        if (isInteractingRef.current || hasAnsweredRef.current) return;
        isInteractingRef.current = true;
        if (soundSettingLoadedRef.current && soundEffectRef.current) {
          playSound("grab");
        }
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
        if (hasAnsweredRef.current) return; // ⭐ 방어 코드

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
            // ⭐⭐⭐ 핵심: 이 콜백이 이미 한 번 실행됐으면 완전히 무시
            // (result 판정 자체는 정상 처리되지만, 그 이후의 재시도는 여기서 걸러짐)
            if (hasAnsweredRef.current) return;
            hasAnsweredRef.current = true; // ⭐ 영구 잠금 시작

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

      onPanResponderTerminate: () => {
        isScreenPositionReadyRef.current = false;
        isInteractingRef.current = false;
        // ⭐ terminate는 "답변 안 하고 제스처가 끊긴 것"이므로
        //    hasAnsweredRef는 여기서 true로 만들지 않음 → 다시 잡을 수 있어야 정상

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

  const colorHex =
    obj.kind === "category"
      ? obj.color // 이미 hex
      : obj.color
        ? (COLORS[obj.color] ?? "#FFFFFF")
        : undefined;
  const softColor =
    obj.kind === "category"
      ? PASTEL_BG.neutral // ⭐ 배경 제거
      : obj.color
        ? SOFT_COLORS[obj.color]
        : PASTEL_BG.neutral;
  // const softColor =
  //   obj.kind === "category"
  //     ? (obj.color ?? "#E2E8F0") + "55"
  //     : obj.color
  //       ? SOFT_COLORS[obj.color]
  //       : PASTEL_BG.neutral;

  const renderSvg = () => {
    if (obj.kind === "color") {
      return (
        <RenderColorItemSvg
          shapeId={obj.renderId}
          colorHex={colorHex ?? "#FFFFFF"}
        />
      );
    }
    if (obj.kind === "item") {
      return <RenderShapeItemSvg itemId={obj.renderId} colorHex={colorHex} />;
    }
    // ⭐ Category 추가
    if (obj.kind === "category") {
      return (
        <RenderCategoryItemSvg
          itemId={obj.renderId}
          colorHex={colorHex}
          primary={colorHex}
        />
      );
    }
    return <RenderBasicShapeSvg shapeId={obj.renderId} colorHex={colorHex} />;
  };

  return (
    <ObjectStickerShadowWrapper>
      <Animated.View
        ref={setStickerRef}
        {...panResponder.panHandlers}
        style={{
          transform: [{ translateX: position.x }, { translateY: position.y }],
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
