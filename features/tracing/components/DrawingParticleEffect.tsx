import React, {
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  cancelAnimation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import styled from "styled-components/native";
import { DrawingPoint } from "../types/drawing.types";

/**
 * 손가락 주변에 반짝이는 파스텔 파티클.
 *
 * - 시각 효과 전용 레이어. 그리기 선/진행률/정답 판정에 관여하지 않는다.
 * - 고정 크기 풀(pool)을 돌려 쓰므로 입자 수가 항상 제한된다.
 * - emit()은 ref로 호출하므로 터치마다 React 리렌더링이 일어나지 않는다.
 */

export interface DrawingParticleEffectHandle {
  /** 손가락 좌표 전달 (내부에서 빈도/거리 제한) */
  emit: (point: DrawingPoint) => void;
  /** 모든 입자 즉시 제거 및 상태 초기화 */
  clear: () => void;
}

interface DrawingParticleEffectProps {
  ref?: React.Ref<DrawingParticleEffectHandle>;
  width: number;
  height: number;
}
// 민트, 스카이블루, 크림 옐로, 소프트 핑크
const PASTEL_COLORS = ["#75D6C2", "#A9DDF7", "#FFE29A", "#FFB8C8"];

const POOL_SIZE = 18; // 동시에 존재할 수 있는 최대 입자 수
const MIN_EMIT_INTERVAL_MS = 45; // 생성 최소 간격
const MIN_EMIT_DISTANCE = 9; // 이전 생성 위치에서 최소 이동 거리(px)
const PARTICLES_PER_EMIT = 2;
const LIFETIME_MS = 650;

interface ParticleHandle {
  spawn: (x: number, y: number, color: string, size: number) => void;
  clear: () => void;
}

interface ParticleProps {
  ref?: React.Ref<ParticleHandle>;
}

function Particle({ ref }: ParticleProps) {
  const progress = useSharedValue(1); // 1 = 끝난 상태(안 보임)
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const driftX = useSharedValue(0);
  const driftY = useSharedValue(0);
  const size = useSharedValue(8);
  const color = useSharedValue(PASTEL_COLORS[0]);

  useImperativeHandle(
    ref,
    () => ({
      spawn: (px, py, pColor, pSize) => {
        cancelAnimation(progress);

        x.value = px;
        y.value = py;
        color.value = pColor;
        size.value = pSize;

        // 살짝 위쪽으로 떠오르며 퍼진다
        driftX.value = (Math.random() - 0.5) * 28;
        driftY.value = -8 - Math.random() * 18;

        progress.value = 0;
        progress.value = withTiming(1, {
          duration: LIFETIME_MS,
          easing: Easing.out(Easing.quad),
        });
      },
      clear: () => {
        cancelAnimation(progress);
        progress.value = 1;
      },
    }),
    [progress, x, y, driftX, driftY, size, color],
  );

  const animatedStyle = useAnimatedStyle(() => {
    const p = progress.value;
    const s = size.value;

    return {
      width: s,
      height: s,
      borderRadius: s / 2,
      backgroundColor: color.value,
      opacity: interpolate(p, [0, 0.15, 1], [0, 0.95, 0]),
      transform: [
        { translateX: x.value - s / 2 + driftX.value * p },
        { translateY: y.value - s / 2 + driftY.value * p },
        { scale: interpolate(p, [0, 0.2, 1], [0.4, 1, 0.3]) },
      ],
    };
  });

  return <ParticleDot style={animatedStyle} />;
}

export default function DrawingParticleEffect({
  ref,
  width,
  height,
}: DrawingParticleEffectProps) {
  const particleRefs = useRef<(ParticleHandle | null)[]>([]);
  const nextIndexRef = useRef(0);
  const lastEmitTimeRef = useRef(0);
  const lastEmitPointRef = useRef<DrawingPoint | null>(null);

  const spawnOne = useCallback((x: number, y: number) => {
    const index = nextIndexRef.current;

    nextIndexRef.current = (index + 1) % POOL_SIZE;

    const color =
      PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)];
    const size = 6 + Math.random() * 6;

    // 손가락 바로 위가 아니라 약간 주변에 생성
    const offsetX = (Math.random() - 0.5) * 22;
    const offsetY = (Math.random() - 0.5) * 22;

    particleRefs.current[index]?.spawn(x + offsetX, y + offsetY, color, size);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      emit: (point) => {
        const now = Date.now();
        const last = lastEmitPointRef.current;

        if (now - lastEmitTimeRef.current < MIN_EMIT_INTERVAL_MS) return;

        if (last) {
          const distance = Math.hypot(point.x - last.x, point.y - last.y);

          if (distance < MIN_EMIT_DISTANCE) return;
        }

        lastEmitTimeRef.current = now;
        lastEmitPointRef.current = point;

        for (let i = 0; i < PARTICLES_PER_EMIT; i += 1) {
          spawnOne(point.x, point.y);
        }
      },

      clear: () => {
        lastEmitTimeRef.current = 0;
        lastEmitPointRef.current = null;
        nextIndexRef.current = 0;

        particleRefs.current.forEach((particle) => particle?.clear());
      },
    }),
    [spawnOne],
  );

  const slots = useMemo(
    () => Array.from({ length: POOL_SIZE }, (_, i) => i),
    [],
  );

  return (
    <ParticleOverlay
      pointerEvents="none"
      layerWidth={width}
      layerHeight={height}
    >
      {slots.map((slot) => (
        <Particle
          key={slot}
          ref={(handle) => {
            particleRefs.current[slot] = handle;
          }}
        />
      ))}
    </ParticleOverlay>
  );
}

interface ParticleOverlayProps {
  layerWidth: number;
  layerHeight: number;
}

const ParticleOverlay = styled(View).attrs<ParticleOverlayProps>(
  ({ layerWidth, layerHeight }) => ({
    style: {
      width: layerWidth,
      height: layerHeight,
    },
  }),
)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  z-index: 20;
`;

const ParticleDot = styled(Animated.View)`
  position: absolute;
  left: 0;
  top: 0;
`;
