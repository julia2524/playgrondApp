// import React, {
//   useCallback,
//   useImperativeHandle,
//   useMemo,
//   useRef,
// } from "react";
// import { View } from "react-native";
// import Animated, {
//   Easing,
//   cancelAnimation,
//   interpolate,
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
// } from "react-native-reanimated";
// import styled from "styled-components/native";
// import { DrawingPoint } from "../types/drawing.types";

// /**
//  * 손가락 주변에 반짝이는 파스텔 파티클.
//  *
//  * - 시각 효과 전용 레이어. 그리기 선/진행률/정답 판정에 관여하지 않는다.
//  * - 고정 크기 풀(pool)을 돌려 쓰므로 입자 수가 항상 제한된다.
//  * - emit()은 ref로 호출하므로 터치마다 React 리렌더링이 일어나지 않는다.
//  */

// export interface DrawingParticleEffectHandle {
//   /** 손가락 좌표 전달 (내부에서 빈도/거리 제한) */
//   emit: (point: DrawingPoint) => void;
//   /** 모든 입자 즉시 제거 및 상태 초기화 */
//   clear: () => void;
// }

// interface DrawingParticleEffectProps {
//   ref?: React.Ref<DrawingParticleEffectHandle>;
//   width: number;
//   height: number;
// }
// // 민트, 스카이블루, 크림 옐로, 소프트 핑크
// const PASTEL_COLORS = ["#75D6C2", "#A9DDF7", "#FFE29A", "#FFB8C8"];

// const POOL_SIZE = 18; // 동시에 존재할 수 있는 최대 입자 수
// const MIN_EMIT_INTERVAL_MS = 45; // 생성 최소 간격
// const MIN_EMIT_DISTANCE = 9; // 이전 생성 위치에서 최소 이동 거리(px)
// const PARTICLES_PER_EMIT = 2;
// const LIFETIME_MS = 650;

// interface ParticleHandle {
//   spawn: (x: number, y: number, color: string, size: number) => void;
//   clear: () => void;
// }

// interface ParticleProps {
//   ref?: React.Ref<ParticleHandle>;
// }

// function Particle({ ref }: ParticleProps) {
//   const progress = useSharedValue(1); // 1 = 끝난 상태(안 보임)
//   const x = useSharedValue(0);
//   const y = useSharedValue(0);
//   const driftX = useSharedValue(0);
//   const driftY = useSharedValue(0);
//   const size = useSharedValue(8);
//   const color = useSharedValue(PASTEL_COLORS[0]);

//   useImperativeHandle(
//     ref,
//     () => ({
//       spawn: (px, py, pColor, pSize) => {
//         cancelAnimation(progress);

//         x.value = px;
//         y.value = py;
//         color.value = pColor;
//         size.value = pSize;

//         // 살짝 위쪽으로 떠오르며 퍼진다
//         driftX.value = (Math.random() - 0.5) * 28;
//         driftY.value = -8 - Math.random() * 18;

//         progress.value = 0;
//         progress.value = withTiming(1, {
//           duration: LIFETIME_MS,
//           easing: Easing.out(Easing.quad),
//         });
//       },
//       clear: () => {
//         cancelAnimation(progress);
//         progress.value = 1;
//       },
//     }),
//     [progress, x, y, driftX, driftY, size, color],
//   );

//   const animatedStyle = useAnimatedStyle(() => {
//     const p = progress.value;
//     const s = size.value;

//     return {
//       width: s,
//       height: s,
//       borderRadius: s / 2,
//       backgroundColor: color.value,
//       opacity: interpolate(p, [0, 0.15, 1], [0, 0.95, 0]),
//       transform: [
//         { translateX: x.value - s / 2 + driftX.value * p },
//         { translateY: y.value - s / 2 + driftY.value * p },
//         { scale: interpolate(p, [0, 0.2, 1], [0.4, 1, 0.3]) },
//       ],
//     };
//   });

//   return <ParticleDot style={animatedStyle} />;
// }

// export default function DrawingParticleEffect({
//   ref,
//   width,
//   height,
// }: DrawingParticleEffectProps) {
//   const particleRefs = useRef<(ParticleHandle | null)[]>([]);
//   const nextIndexRef = useRef(0);
//   const lastEmitTimeRef = useRef(0);
//   const lastEmitPointRef = useRef<DrawingPoint | null>(null);

//   const spawnOne = useCallback((x: number, y: number) => {
//     const index = nextIndexRef.current;

//     nextIndexRef.current = (index + 1) % POOL_SIZE;

//     const color =
//       PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)];
//     const size = 6 + Math.random() * 6;

//     // 손가락 바로 위가 아니라 약간 주변에 생성
//     const offsetX = (Math.random() - 0.5) * 22;
//     const offsetY = (Math.random() - 0.5) * 22;

//     particleRefs.current[index]?.spawn(x + offsetX, y + offsetY, color, size);
//   }, []);

//   useImperativeHandle(
//     ref,
//     () => ({
//       emit: (point) => {
//         const now = Date.now();
//         const last = lastEmitPointRef.current;

//         if (now - lastEmitTimeRef.current < MIN_EMIT_INTERVAL_MS) return;

//         if (last) {
//           const distance = Math.hypot(point.x - last.x, point.y - last.y);

//           if (distance < MIN_EMIT_DISTANCE) return;
//         }

//         lastEmitTimeRef.current = now;
//         lastEmitPointRef.current = point;

//         for (let i = 0; i < PARTICLES_PER_EMIT; i += 1) {
//           spawnOne(point.x, point.y);
//         }
//       },

//       clear: () => {
//         lastEmitTimeRef.current = 0;
//         lastEmitPointRef.current = null;
//         nextIndexRef.current = 0;

//         particleRefs.current.forEach((particle) => particle?.clear());
//       },
//     }),
//     [spawnOne],
//   );

//   const slots = useMemo(
//     () => Array.from({ length: POOL_SIZE }, (_, i) => i),
//     [],
//   );

//   return (
//     <ParticleOverlay
//       pointerEvents="none"
//       layerWidth={width}
//       layerHeight={height}
//     >
//       {slots.map((slot) => (
//         <Particle
//           key={slot}
//           ref={(handle) => {
//             particleRefs.current[slot] = handle;
//           }}
//         />
//       ))}
//     </ParticleOverlay>
//   );
// }

// interface ParticleOverlayProps {
//   layerWidth: number;
//   layerHeight: number;
// }

// const ParticleOverlay = styled(View).attrs<ParticleOverlayProps>(
//   ({ layerWidth, layerHeight }) => ({
//     style: {
//       width: layerWidth,
//       height: layerHeight,
//     },
//   }),
// )`
//   position: absolute;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   left: 0;
//   overflow: hidden;
//   z-index: 20;
// `;

// const ParticleDot = styled(Animated.View)`
//   position: absolute;
//   left: 0;
//   top: 0;
// `;

import React, {
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

import { StyleSheet, View } from "react-native";

import { Canvas, Picture, Skia } from "@shopify/react-native-skia";

import {
  useDerivedValue,
  useFrameCallback,
  useSharedValue,
} from "react-native-reanimated";

import { scheduleOnUI } from "react-native-worklets";

import type { DrawingPoint } from "../types/drawing.types";

export interface DrawingParticleEffectHandle {
  emit: (point: DrawingPoint) => void;
  clear: () => void;
}

interface DrawingParticleEffectProps {
  ref?: React.Ref<DrawingParticleEffectHandle>;
  width: number;
  height: number;
}

const PARTICLE_COLORS = [
  [255, 145, 155],
  [255, 198, 115],
  [255, 225, 125],
  [135, 215, 180],
  [125, 195, 245],
  [175, 155, 245],
  [245, 155, 205],
  [255, 245, 220],
] as const;

const POOL_SIZE = 64;

// 생성 간격
const PATH_SPACING = 13;

// 한 지점에서 생성할 입자 수
const PARTICLES_PER_POINT = 3;

// 생존 시간
const LIFETIME_MS = 850;

// 바깥으로 퍼지는 속도
const MIN_SPEED = 45;
const MAX_SPEED = 105;

// 시작 위치의 퍼짐
const MIN_SPREAD = 5;
const MAX_SPREAD = 17;

// 중력
const GRAVITY = 16;

interface Particle {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  g: number;
  b: number;
  size: number;
  age: number;
  life: number;
  sparkle: boolean;
}

interface SpawnPoint {
  x: number;
  y: number;
  directionX: number;
  directionY: number;
}

const createEmptyParticle = (): Particle => ({
  active: false,
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  r: 255,
  g: 255,
  b: 255,
  size: 4,
  age: 0,
  life: LIFETIME_MS,
  sparkle: false,
});

export default function DrawingParticleEffect({
  ref,
  width,
  height,
}: DrawingParticleEffectProps) {
  const lastEmitPointRef = useRef<DrawingPoint | null>(null);

  const particles = useSharedValue<Particle[]>(
    Array.from({ length: POOL_SIZE }, createEmptyParticle),
  );

  const nextIndex = useSharedValue(0);

  /**
   * UI Runtime에서 파티클 생성
   */
  const addParticlesOnUI = useCallback(
    (points: SpawnPoint[]) => {
      "worklet";

      const next = particles.value.slice();
      let cursor = nextIndex.value;

      for (const point of points) {
        for (let i = 0; i < PARTICLES_PER_POINT; i += 1) {
          const colorIndex = Math.floor(Math.random() * PARTICLE_COLORS.length);

          const color = PARTICLE_COLORS[colorIndex];

          // 사방으로 퍼지는 방향
          const angle = Math.random() * Math.PI * 2;

          // 시작 위치부터 바깥으로 넓게 분산
          const spread = MIN_SPREAD + Math.random() * (MAX_SPREAD - MIN_SPREAD);

          const x = point.x + Math.cos(angle) * spread;
          const y = point.y + Math.sin(angle) * spread;

          const speed = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED);

          // 드래그 방향 관성
          const drift = 10;

          const vx = Math.cos(angle) * speed + point.directionX * drift;

          const vy = Math.sin(angle) * speed + point.directionY * drift;

          const size = 2.5 + Math.random() * 4;

          next[cursor] = {
            active: true,
            x,
            y,
            vx,
            vy,
            r: color[0],
            g: color[1],
            b: color[2],
            size,
            age: 0,
            life: LIFETIME_MS + Math.random() * 140,
            sparkle: Math.random() > 0.58,
          };

          cursor = (cursor + 1) % POOL_SIZE;
        }
      }

      nextIndex.value = cursor;
      particles.value = next;
    },
    [particles, nextIndex],
  );

  /**
   * 전체 파티클 애니메이션
   */
  useFrameCallback((frameInfo) => {
    "worklet";

    const dt = Math.min((frameInfo.timeSincePreviousFrame ?? 16) / 1000, 0.032);

    const current = particles.value;
    let hasActiveParticle = false;

    const next = current.map((particle) => {
      if (!particle.active) {
        return particle;
      }

      const age = particle.age + dt * 1000;

      if (age >= particle.life) {
        return {
          ...particle,
          active: false,
          age: particle.life,
        };
      }

      hasActiveParticle = true;

      const friction = Math.pow(0.985, dt * 60);

      return {
        ...particle,
        x: particle.x + particle.vx * dt,
        y: particle.y + particle.vy * dt,
        vx: particle.vx * friction,
        vy: particle.vy * friction + GRAVITY * dt,
        age,
      };
    });

    if (hasActiveParticle) {
      particles.value = next;
    }
  });

  /**
   * Skia Picture
   */
  const recorder = useMemo(() => Skia.PictureRecorder(), []);
  const paint = useMemo(() => Skia.Paint(), []);

  const picture = useDerivedValue(() => {
    "worklet";

    const canvas = recorder.beginRecording(
      Skia.XYWHRect(0, 0, Math.max(width, 1), Math.max(height, 1)),
    );

    const current = particles.value;

    for (let i = 0; i < current.length; i += 1) {
      const particle = current[i];

      if (!particle.active) continue;

      const progress = Math.min(particle.age / particle.life, 1);

      const fade =
        progress < 0.12 ? progress / 0.12 : 1 - (progress - 0.12) / 0.88;

      const alpha = Math.max(0, fade);

      const radius = particle.size * (1 - progress * 0.55);

      if (radius <= 0) continue;

      paint.setColor(
        Skia.Color(`rgba(${particle.r},${particle.g},${particle.b},${alpha})`),
      );

      canvas.drawCircle(particle.x, particle.y, radius, paint);

      // 작은 흰색 반짝임
      if (particle.sparkle && progress < 0.75) {
        paint.setColor(Skia.Color(`rgba(255,255,255,${alpha})`));

        canvas.drawCircle(
          particle.x - radius * 0.25,
          particle.y - radius * 0.25,
          Math.max(0.8, radius * 0.3),
          paint,
        );
      }
    }

    return recorder.finishRecordingAsPicture();
  }, [width, height]);

  /**
   * 외부 emit()
   */
  const emit = useCallback(
    (point: DrawingPoint) => {
      const last = lastEmitPointRef.current;

      if (!last) {
        lastEmitPointRef.current = point;

        scheduleOnUI(addParticlesOnUI, [
          {
            x: point.x,
            y: point.y,
            directionX: 0,
            directionY: 0,
          },
        ]);

        return;
      }

      const dx = point.x - last.x;
      const dy = point.y - last.y;
      const distance = Math.hypot(dx, dy);

      if (distance < 3) return;

      const steps = Math.max(1, Math.ceil(distance / PATH_SPACING));

      const directionX = dx / distance;
      const directionY = dy / distance;

      const spawnPoints: SpawnPoint[] = [];

      for (let i = 1; i <= steps; i += 1) {
        const ratio = i / steps;

        spawnPoints.push({
          x: last.x + dx * ratio,
          y: last.y + dy * ratio,
          directionX,
          directionY,
        });
      }

      lastEmitPointRef.current = point;

      scheduleOnUI(addParticlesOnUI, spawnPoints);
    },
    [addParticlesOnUI],
  );

  /**
   * 파티클 초기화
   */
  const clear = useCallback(() => {
    lastEmitPointRef.current = null;

    scheduleOnUI(() => {
      "worklet";

      const empty: Particle[] = [];

      for (let i = 0; i < POOL_SIZE; i += 1) {
        empty.push({
          active: false,
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          r: 255,
          g: 255,
          b: 255,
          size: 4,
          age: 0,
          life: LIFETIME_MS,
          sparkle: false,
        });
      }

      particles.value = empty;
      nextIndex.value = 0;
    });
  }, [particles, nextIndex]);

  useImperativeHandle(
    ref,
    () => ({
      emit,
      clear,
    }),
    [emit, clear],
  );

  return (
    <View
      pointerEvents="none"
      style={[
        StyleSheet.absoluteFillObject,
        {
          zIndex: 20,
          overflow: "hidden",
        },
      ]}
    >
      <Canvas style={StyleSheet.absoluteFillObject}>
        <Picture picture={picture} />
      </Canvas>
    </View>
  );
}
