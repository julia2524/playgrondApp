import { DrawingPoint } from "../types/drawing.types";
import type { TracingGuide, TracingProgress } from "../types/tracing.types";

import { getDistanceToSegment } from "./tracingGeometry";

/**
 * 기본 판정 설정
 */
const DEFAULT_TOLERANCE = 36;

/**
 * 가이드 경로를 구성하는 선분 정보
 */
interface GuideSegment {
  start: DrawingPoint;
  end: DrawingPoint;
  length: number;
  startDistance: number;
  endDistance: number;
}

/**
 * 내부 진행 상태
 */
export interface TracingProgressState {
  progress: TracingProgress;
  completedSegments: boolean[];
}

/**
 * 가이드 경로를 선분 단위로 분리한다.
 */
const createGuideSegments = (points: DrawingPoint[]): GuideSegment[] => {
  const segments: GuideSegment[] = [];
  let accumulatedDistance = 0;

  for (let i = 0; i < points.length - 1; i++) {
    const start = points[i];
    const end = points[i + 1];

    const length = Math.hypot(end.x - start.x, end.y - start.y);

    segments.push({
      start,
      end,
      length,
      startDistance: accumulatedDistance,
      endDistance: accumulatedDistance + length,
    });

    accumulatedDistance += length;
  }

  return segments;
};

/**
 * 초기 진행 상태 생성
 */
export const createInitialTracingProgress = (
  guide: TracingGuide,
): TracingProgressState => {
  const segments = createGuideSegments(guide.points);
  const totalLength = segments.reduce(
    (total, segment) => total + segment.length,
    0,
  );

  return {
    progress: {
      progress: 0,
      completedPoints: 0,
      totalPoints: segments.length,
      isCompleted: false,
    },
    completedSegments: Array(segments.length).fill(false),
  };
};

/**
 * 한 번의 그리기에서 통과한 가이드 구간을 찾는다.
 */
const findTouchedSegments = (
  stroke: DrawingPoint[],
  guideSegments: GuideSegment[],
  tolerance: number,
): boolean[] => {
  const touched = Array(guideSegments.length).fill(false);

  if (stroke.length === 0) {
    return touched;
  }

  for (let i = 0; i < guideSegments.length; i++) {
    const guideSegment = guideSegments[i];

    // 길이가 0인 구간은 판정에서 제외
    if (guideSegment.length === 0) {
      touched[i] = true;
      continue;
    }

    // 한 점만 찍은 경우
    if (stroke.length === 1) {
      const distance = getDistanceToSegment(
        stroke[0],
        guideSegment.start,
        guideSegment.end,
      );

      touched[i] = distance <= tolerance;
      continue;
    }

    // 손가락 이동 경로를 일정 간격으로 샘플링
    for (let j = 0; j < stroke.length - 1; j++) {
      const strokeStart = stroke[j];
      const strokeEnd = stroke[j + 1];

      const strokeLength = Math.hypot(
        strokeEnd.x - strokeStart.x,
        strokeEnd.y - strokeStart.y,
      );

      const sampleCount = Math.max(
        1,
        Math.ceil(strokeLength / Math.max(tolerance / 2, 1)),
      );

      for (let k = 0; k <= sampleCount; k++) {
        const t = k / sampleCount;

        const samplePoint: DrawingPoint = {
          x: strokeStart.x + (strokeEnd.x - strokeStart.x) * t,
          y: strokeStart.y + (strokeEnd.y - strokeStart.y) * t,
        };

        const distance = getDistanceToSegment(
          samplePoint,
          guideSegment.start,
          guideSegment.end,
        );

        if (distance <= tolerance) {
          touched[i] = true;
          break;
        }
      }

      if (touched[i]) {
        break;
      }
    }
  }

  return touched;
};

/**
 * 순서 판정에서 "지금까지 완성한 곳 바로 앞"으로 인정하는 거리 (허용 거리의 배수)
 *
 * 너무 작으면 손가락이 조금만 앞서가도 놓치고,
 * 너무 크면 교차하는 고리의 다음 갈래를 먼저 채울 수 있다.
 */
const ORDERED_LOOKAHEAD_FACTOR = 3.5;

/**
 * 순서 판정: 경로를 앞에서부터 따라온 구간만 인정한다.
 *
 * - 가장 앞까지 완성한 구간(maxIndex)의 끝에서 look-ahead 거리 안쪽 구간만 판정 대상
 * - 뒤쪽(이미 지나온 구간)은 언제든 다시 채울 수 있다 (놓친 구간 보완)
 * - 출발점 근처가 아닌 곳에서 시작한 선은 인정되지 않는다 (방향 강제)
 * - 스트로크의 점을 순서대로 처리하므로 한 번에 길게 그어도 정상 동작한다
 */
const findOrderedTouchedSegments = (
  stroke: DrawingPoint[],
  guideSegments: GuideSegment[],
  tolerance: number,
  previousCompleted: boolean[],
): boolean[] => {
  const touched = Array(guideSegments.length).fill(false);

  if (stroke.length === 0) {
    return touched;
  }

  const lookahead = tolerance * ORDERED_LOOKAHEAD_FACTOR;

  let maxIndex = -1;

  previousCompleted.forEach((completed, index) => {
    if (completed) maxIndex = index;
  });

  const handleSample = (sample: DrawingPoint) => {
    const reach =
      (maxIndex >= 0 ? guideSegments[maxIndex].endDistance : 0) + lookahead;

    for (let i = 0; i < guideSegments.length; i++) {
      const segment = guideSegments[i];

      // 구간은 시작 거리 순으로 정렬되어 있으므로 범위를 넘으면 중단
      if (segment.startDistance > reach) break;

      if (touched[i] || previousCompleted[i]) continue;

      if (
        segment.length === 0 ||
        getDistanceToSegment(sample, segment.start, segment.end) <= tolerance
      ) {
        touched[i] = true;

        if (i > maxIndex) maxIndex = i;
      }
    }
  };

  if (stroke.length === 1) {
    handleSample(stroke[0]);

    return touched;
  }

  for (let j = 0; j < stroke.length - 1; j++) {
    const strokeStart = stroke[j];
    const strokeEnd = stroke[j + 1];

    const strokeLength = Math.hypot(
      strokeEnd.x - strokeStart.x,
      strokeEnd.y - strokeStart.y,
    );

    const sampleCount = Math.max(
      1,
      Math.ceil(strokeLength / Math.max(tolerance / 2, 1)),
    );

    // 이전 선분의 끝점과 중복되는 t=0은 첫 선분에서만 처리
    for (let k = j === 0 ? 0 : 1; k <= sampleCount; k++) {
      const t = k / sampleCount;

      handleSample({
        x: strokeStart.x + (strokeEnd.x - strokeStart.x) * t,
        y: strokeStart.y + (strokeEnd.y - strokeStart.y) * t,
      });
    }
  }

  return touched;
};

/**
 * 새로운 그리기 데이터를 기존 진행 상태에 반영한다.
 *
 * 이미 완성한 구간은 유지하고,
 * 새롭게 통과한 구간만 추가한다.
 *
 * 모든 구간이 완성되어야 100%가 된다.
 */
export const updateTracingProgress = (
  guide: TracingGuide,
  previousState: TracingProgressState,
  stroke: DrawingPoint[],
): TracingProgressState => {
  const segments = createGuideSegments(guide.points);

  if (segments.length === 0) {
    return createInitialTracingProgress(guide);
  }

  const tolerance = guide.tolerance ?? DEFAULT_TOLERANCE;

  // ordered 가이드만 순서 판정을 사용하고, 그 외에는 기존 판정 그대로
  const touchedSegments = guide.ordered
    ? findOrderedTouchedSegments(
        stroke,
        segments,
        tolerance,
        previousState.completedSegments,
      )
    : findTouchedSegments(stroke, segments, tolerance);

  // 기존 완성 구간 + 이번에 새롭게 완성한 구간
  const completedSegments = segments.map((_, index) => {
    const wasCompleted = previousState.completedSegments[index] ?? false;

    return wasCompleted || touchedSegments[index];
  });

  // 완성된 선분 개수
  const completedPoints = completedSegments.filter(Boolean).length;

  // 전체 가이드 길이
  const totalLength = segments.reduce(
    (total, segment) => total + segment.length,
    0,
  );

  // 실제 완성된 선분의 길이
  const completedLength = segments.reduce((total, segment, index) => {
    return completedSegments[index] ? total + segment.length : total;
  }, 0);

  // 모든 구간이 완성되었는지 확인
  const isCompleted = segments.length > 0 && completedSegments.every(Boolean);

  // 실제 완성된 길이를 기준으로 진행률 계산
  const progress = isCompleted
    ? 1
    : totalLength > 0
      ? Math.min(1, completedLength / totalLength)
      : 0;

  return {
    progress: {
      progress,
      completedPoints,
      totalPoints: segments.length,
      isCompleted,
    },
    completedSegments,
  };
};
