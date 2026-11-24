import { DrawingPoint } from "../types/drawing.types";
import type { TracingBoardSize, TracingLineType } from "../types/tracing.types";

import { resamplePath } from "../utils/tracingPathUtils";
import { getCurveTolerance } from "./tolerance";

/**
 * 유형별 경로 생성기
 *
 * - 모두 보드 크기(width, height)에서 비율로 좌표를 계산한다.
 *   → 화면 크기가 달라져도 모양이 유지된다.
 * - 스테이지마다 독립된 생성기를 갖는다. 세로형은 가로형을 90° 돌린 것이 아니라
 *   세로 화면에 맞게 따로 설계한다.
 * - 대상은 만 1~2세: 크고, 넓고, 둥글게. 굴곡은 적게(약 2회), 간격은 넉넉하게.
 * - 경로의 시작점이 곧 출발점, 마지막 점이 도착점이다.
 */

type Generator = (size: TracingBoardSize) => DrawingPoint[];

const TWO_PI = Math.PI * 2;

// ─────────────────────────────── 공통 도구

const straight = (
  from: DrawingPoint,
  to: DrawingPoint,
  segmentCount = 60,
): DrawingPoint[] =>
  Array.from({ length: segmentCount + 1 }, (_, index) => {
    const t = index / segmentCount;

    return {
      x: from.x + (to.x - from.x) * t,
      y: from.y + (to.y - from.y) * t,
    };
  });

/** 촘촘한 점들을 경로 길이 기준으로 균일하게 다시 뽑는다. */
export const finalizeCurve = (dense: DrawingPoint[]): DrawingPoint[] => {
  let length = 0;

  for (let i = 0; i < dense.length - 1; i++) {
    length += Math.hypot(
      dense[i + 1].x - dense[i].x,
      dense[i + 1].y - dense[i].y,
    );
  }

  // 구간이 너무 많아지지 않도록 (최대 약 240개)
  const spacing = Math.max(5, length / 240);

  return resamplePath(dense, spacing);
};

/** 중심선이 부드러운 곡선(Catmull-Rom, centripetal)으로 통과하는 점들 */
const smoothThrough = (
  controls: DrawingPoint[],
  stepsPerSegment = 24,
): DrawingPoint[] => {
  const n = controls.length;

  const first = controls[0];
  const second = controls[1];
  const last = controls[n - 1];
  const beforeLast = controls[n - 2];

  const padded: DrawingPoint[] = [
    { x: 2 * first.x - second.x, y: 2 * first.y - second.y },
    ...controls,
    { x: 2 * last.x - beforeLast.x, y: 2 * last.y - beforeLast.y },
  ];

  const mix = (
    a: DrawingPoint,
    b: DrawingPoint,
    wa: number,
    wb: number,
  ): DrawingPoint => ({
    x: a.x * wa + b.x * wb,
    y: a.y * wa + b.y * wb,
  });

  const dist = (a: DrawingPoint, b: DrawingPoint) =>
    Math.max(Math.hypot(a.x - b.x, a.y - b.y), 0.0001);

  const result: DrawingPoint[] = [{ ...controls[0] }];

  for (let i = 1; i < padded.length - 2; i++) {
    const p0 = padded[i - 1];
    const p1 = padded[i];
    const p2 = padded[i + 1];
    const p3 = padded[i + 2];

    const t0 = 0;
    const t1 = t0 + Math.sqrt(dist(p0, p1));
    const t2 = t1 + Math.sqrt(dist(p1, p2));
    const t3 = t2 + Math.sqrt(dist(p2, p3));

    for (let s = 1; s <= stepsPerSegment; s++) {
      const t = t1 + ((t2 - t1) * s) / stepsPerSegment;

      const a1 = mix(p0, p1, (t1 - t) / (t1 - t0), (t - t0) / (t1 - t0));
      const a2 = mix(p1, p2, (t2 - t) / (t2 - t1), (t - t1) / (t2 - t1));
      const a3 = mix(p2, p3, (t3 - t) / (t3 - t2), (t - t2) / (t3 - t2));

      const b1 = mix(a1, a2, (t2 - t) / (t2 - t0), (t - t0) / (t2 - t0));
      const b2 = mix(a2, a3, (t3 - t) / (t3 - t1), (t - t1) / (t3 - t1));

      result.push(mix(b1, b2, (t2 - t) / (t2 - t1), (t - t1) / (t2 - t1)));
    }
  }

  return result;
};

/** 곡선 유형에서 굴곡/크기가 허용 거리보다 충분히 크도록 하는 보정 */
const atLeast = (
  preferred: number,
  tolerance: number,
  tolerances: number,
  max: number,
) => Math.min(Math.max(preferred, tolerance * tolerances), max);

/** 직선 꼭짓점(뾰족한 모서리)을 반지름 radius로 부드럽게 둥글린다 */
const roundCorners = (
  vertices: DrawingPoint[],
  radius: number,
  steps = 10,
): DrawingPoint[] => {
  const out: DrawingPoint[] = [{ ...vertices[0] }];

  for (let i = 1; i < vertices.length - 1; i++) {
    const prev = vertices[i - 1];
    const cur = vertices[i];
    const next = vertices[i + 1];

    const d1 = Math.hypot(prev.x - cur.x, prev.y - cur.y);
    const d2 = Math.hypot(next.x - cur.x, next.y - cur.y);
    const r = Math.min(radius, d1 * 0.45, d2 * 0.45);

    const a = {
      x: cur.x + ((prev.x - cur.x) / d1) * r,
      y: cur.y + ((prev.y - cur.y) / d1) * r,
    };
    const b = {
      x: cur.x + ((next.x - cur.x) / d2) * r,
      y: cur.y + ((next.y - cur.y) / d2) * r,
    };

    out.push(a);

    // 꼭짓점을 제어점으로 하는 2차 베지어
    for (let s = 1; s < steps; s++) {
      const t = s / steps;
      const u = 1 - t;

      out.push({
        x: u * u * a.x + 2 * u * t * cur.x + t * t * b.x,
        y: u * u * a.y + 2 * u * t * cur.y + t * t * b.y,
      });
    }

    out.push(b);
  }

  out.push({ ...vertices[vertices.length - 1] });

  return out;
};

// ─────────────────────────────── A. 기본 직선 (1~4)

// 1 가로선: 왼쪽 → 오른쪽 (기존 구현과 동일한 좌표/분할)
const horizontal: Generator = ({ width, height }) =>
  straight(
    { x: width * 0.16, y: height * 0.52 },
    { x: width * 0.84, y: height * 0.52 },
  );

// 2 세로선: 위 → 아래
const vertical: Generator = ({ width, height }) =>
  straight(
    { x: width * 0.5, y: height * 0.16 },
    { x: width * 0.5, y: height * 0.84 },
  );

// 3 올라가는 사선: 왼쪽 아래 → 오른쪽 위
const ascending: Generator = ({ width, height }) =>
  straight(
    { x: width * 0.16, y: height * 0.78 },
    { x: width * 0.84, y: height * 0.26 },
  );

// 4 내려가는 사선: 왼쪽 위 → 오른쪽 아래
const descending: Generator = ({ width, height }) =>
  straight(
    { x: width * 0.16, y: height * 0.26 },
    { x: width * 0.84, y: height * 0.78 },
  );

// ─────────────────────────────── B. 기본 곡선 (5~8)

// 세로 곡선: 위 → 아래로 가며 한 번 크게 휜다 (sign +1 = 오른쪽 볼록)
const makeVerticalCurve =
  (sign: 1 | -1): Generator =>
  ({ width, height }) => {
    const amplitude = width * 0.26;
    const y0 = height * 0.14;
    const y1 = height * 0.86;
    const steps = 160;

    return finalizeCurve(
      Array.from({ length: steps + 1 }, (_, index) => {
        const t = index / steps;

        return {
          x: width * 0.5 + sign * amplitude * Math.sin(Math.PI * t),
          y: y0 + (y1 - y0) * t,
        };
      }),
    );
  };

// 가로 곡선: 왼쪽 → 오른쪽으로 가며 한 번 크게 휜다 (sign -1 = 위로 볼록)
const makeHorizontalCurve =
  (sign: 1 | -1): Generator =>
  ({ width, height }) => {
    const amplitude = height * 0.22;
    const x0 = width * 0.12;
    const x1 = width * 0.88;
    const steps = 160;

    return finalizeCurve(
      Array.from({ length: steps + 1 }, (_, index) => {
        const t = index / steps;

        return {
          x: x0 + (x1 - x0) * t,
          y: height * 0.52 + sign * amplitude * Math.sin(Math.PI * t),
        };
      }),
    );
  };

// ─────────────────────────────── C. 반복적인 방향 전환 (9~16)

// 9 가로 구불구불선: 크기와 간격이 서로 다른 굴곡 2회 (위로 크게 한 번, 아래로 한 번)
const meanderHorizontal: Generator = ({ width, height }) => {
  const u = [0, 0.26, 0.62, 1];
  const v = [0, -0.85, 0.6, 0.05];
  const amplitude = atLeast(
    height * 0.2,
    getCurveTolerance(width),
    3,
    height * 0.24,
  );

  const controls = u.map((value, index) => ({
    x: width * 0.12 + value * width * 0.76,
    y: height * 0.52 + v[index] * amplitude,
  }));

  return finalizeCurve(smoothThrough(controls));
};

// 10 세로 구불구불선: 세로 화면에 맞춰 따로 설계 (오른쪽으로 크게, 왼쪽으로 한 번)
const meanderVertical: Generator = ({ width, height }) => {
  const u = [0, 0.3, 0.66, 1];
  const v = [0, 0.8, -0.7, -0.05];
  const amplitude = atLeast(
    width * 0.17,
    getCurveTolerance(width),
    3,
    width * 0.22,
  );

  const controls = u.map((value, index) => ({
    x: width * 0.5 + v[index] * amplitude,
    y: height * 0.14 + value * height * 0.72,
  }));

  return finalizeCurve(smoothThrough(controls));
};

// 11 가로 물결선: 크기와 간격이 일정한 사인 파형 2주기 (왼쪽 → 오른쪽)
const waveHorizontal: Generator = ({ width, height }) => {
  const cycles = 2;
  const amplitude = atLeast(
    height * 0.12,
    getCurveTolerance(width),
    2.6,
    height * 0.18,
  );
  const x0 = width * 0.12;
  const x1 = width * 0.88;
  const steps = 300;

  return finalizeCurve(
    Array.from({ length: steps + 1 }, (_, index) => {
      const t = index / steps;

      return {
        x: x0 + (x1 - x0) * t,
        y: height * 0.52 - amplitude * Math.sin(TWO_PI * cycles * t),
      };
    }),
  );
};

// 12 세로 물결선: 세로 화면에 맞춰 따로 설계 (위 → 아래, 2주기)
const waveVertical: Generator = ({ width, height }) => {
  const cycles = 2;
  const amplitude = atLeast(
    width * 0.14,
    getCurveTolerance(width),
    2.6,
    width * 0.2,
  );
  const y0 = height * 0.12;
  const y1 = height * 0.88;
  const steps = 300;

  return finalizeCurve(
    Array.from({ length: steps + 1 }, (_, index) => {
      const t = index / steps;

      return {
        x: width * 0.5 + amplitude * Math.sin(TWO_PI * cycles * t),
        y: y0 + (y1 - y0) * t,
      };
    }),
  );
};

// 깡충선: 커다란 반원 2개가 이어진다 (direction -1 = 위로 솟는 ∩, +1 = 아래로 파이는 U)
const makeBounce =
  (direction: -1 | 1): Generator =>
  ({ width, height }) => {
    const arcs = 2;
    const x0 = width * 0.1;
    const x1 = width * 0.9;
    const slot = (x1 - x0) / arcs;
    const radius = slot / 2;
    const archHeight = Math.min(radius, height * 0.3); // 가능하면 진짜 반원
    const arcSteps = 60;

    // 반원이 화면 가운데 오도록 기준선을 잡는다 (∩는 기준선 위로, U는 아래로)
    const baseY = height * 0.5 - (direction * archHeight) / 2;

    const dense: DrawingPoint[] = [{ x: x0, y: baseY }];

    for (let k = 0; k < arcs; k++) {
      const cx = x0 + slot * k + radius;

      // θ: π → 0 (왼쪽 끝 → 정상 → 오른쪽 끝)
      for (let s = 1; s <= arcSteps; s++) {
        const theta = Math.PI * (1 - s / arcSteps);

        dense.push({
          x: cx + radius * Math.cos(theta),
          y: baseY + direction * archHeight * Math.sin(theta),
        });
      }
    }

    return finalizeCurve(dense);
  };

// 15 가로 뾰족선: 봉우리 2개 (직선 구간 + 부드럽게 둥글린 꼭짓점)
const zigzagHorizontal: Generator = ({ width, height }) => {
  const legs = 4;
  const x0 = width * 0.12;
  const x1 = width * 0.88;
  const lowY = height * 0.68;
  const highY = height * 0.32;

  const vertices = Array.from({ length: legs + 1 }, (_, index) => ({
    x: x0 + ((x1 - x0) * index) / legs,
    y: index % 2 === 0 ? lowY : highY,
  }));

  const legLength = Math.hypot((x1 - x0) / legs, lowY - highY);

  return finalizeCurve(roundCorners(vertices, Math.min(legLength * 0.3, 28)));
};

// 16 세로 뾰족선: 세로 화면에 맞춰 따로 설계 (위 → 아래, 오른쪽으로 솟은 봉우리 2개)
const zigzagVertical: Generator = ({ width, height }) => {
  const legs = 4;
  const y0 = height * 0.12;
  const y1 = height * 0.88;
  const legRise = (y1 - y0) / legs;

  // 가로 폭이 세로 이동량보다 지나치게 넓어 눕지 않도록 제한
  const swing = Math.min(width * 0.36, legRise * 1.3);

  const vertices = Array.from({ length: legs + 1 }, (_, index) => ({
    x: width * 0.5 + (index % 2 === 0 ? -swing / 2 : swing / 2),
    y: y0 + legRise * index,
  }));

  const legLength = Math.hypot(swing, legRise);

  return finalizeCurve(roundCorners(vertices, Math.min(legLength * 0.3, 26)));
};

// ─────────────────────────────── D. 회전 및 나선 (17~20)

// 뱅글선: 위 → 아래로 이동하며 둥근 고리가 3번 반복 (prolate trochoid)
// 고리가 2개뿐이면 "S자 + 갈고리"로 보여서 뱅글로 느껴지지 않는다.
const loopDown: Generator = ({ width, height }) => {
  const travel = height * 0.74;

  // 고리 사이(한 바퀴 이동 거리)가 허용 거리의 4.6배 이상 되도록 고리 수를 정한다.
  // 영역이 아주 작으면 2개로 줄여 이웃 고리가 판정 범위 안으로 붙는 것을 막는다.
  const loops = Math.max(
    2,
    Math.min(3, Math.floor(travel / (getCurveTolerance(width) * 4.6))),
  );

  const a = travel / (TWO_PI * loops);
  const b = Math.min(a * 2.0, width * 0.2);

  const top = height * 0.13;
  const steps = loops * 120;

  return finalizeCurve(
    Array.from({ length: steps + 1 }, (_, index) => {
      const theta = (TWO_PI * loops * index) / steps;

      return {
        x: width * 0.5 + b * Math.sin(theta),
        // 이동량(aθ)에 되돌아가는 성분(-b cosθ)을 더해 고리를 만든다.
        // +b는 θ=0에서 y가 top이 되도록 맞추는 보정
        y: top + a * theta + b - b * Math.cos(theta),
      };
    }),
  );
};

// 달팽이 나선: 바깥 → 안쪽, 시계 방향, 2바퀴 (고리 사이를 넓게)
const spiralIn: Generator = ({ width, height }) => {
  const turns = 2;
  const outer = Math.min(width, height) * 0.42;
  const inner = outer * 0.12;
  const cx = width * 0.5;
  const cy = height * 0.5;
  const steps = turns * 150;

  return finalizeCurve(
    Array.from({ length: steps + 1 }, (_, index) => {
      const t = index / steps;
      const angle = Math.PI + TWO_PI * turns * t; // 왼쪽에서 시작, 화면 기준 시계 방향
      const radius = outer - (outer - inner) * t;

      return {
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle),
      };
    }),
  );
};

/** 같은 경로를 반대 방향으로 (17↔18, 19↔20은 같은 모양을 반대로 진행) */
const reversed =
  (generator: Generator): Generator =>
  (size) =>
    [...generator(size)].reverse();

export const PATH_GENERATORS: Record<TracingLineType, Generator> = {
  horizontal,
  vertical,
  ascending,
  descending,
  vertical_curve_right: makeVerticalCurve(1),
  vertical_curve_left: makeVerticalCurve(-1),
  horizontal_curve_up: makeHorizontalCurve(-1),
  horizontal_curve_down: makeHorizontalCurve(1),
  meander_horizontal: meanderHorizontal,
  meander_vertical: meanderVertical,
  wave_horizontal: waveHorizontal,
  wave_vertical: waveVertical,
  bounce_up: makeBounce(-1),
  bounce_down: makeBounce(1),
  zigzag_horizontal: zigzagHorizontal,
  zigzag_vertical: zigzagVertical,
  loop_down: loopDown,
  loop_up: reversed(loopDown),
  spiral_in: spiralIn,
  spiral_out: reversed(spiralIn),
};
