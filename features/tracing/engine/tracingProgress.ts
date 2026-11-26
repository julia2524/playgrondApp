import type { DrawingPoint } from "../types/drawing.types";
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
 * 하나의 경로를 선분 단위로 분리한다.
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
 * TracingGuide의 실제 경로 목록을 반환한다.
 *
 * paths가 있으면 독립 경로들을 사용하고,
 * 없으면 기존 points를 하나의 경로로 사용한다.
 */
const getGuidePaths = (guide: TracingGuide): DrawingPoint[][] => {
  if (guide.paths && guide.paths.length > 0) {
    return guide.paths;
  }

  return [guide.points];
};

/**
 * 경로별 선분 정보
 *
 * flatStartIndex는 전체 completedSegments 배열에서
 * 해당 경로가 시작되는 위치다.
 */
interface GuidePathGroup {
  segments: GuideSegment[];
  flatStartIndex: number;
}

/**
 * 여러 경로를 각각 선분으로 변환한다.
 *
 * 경로 사이에는 선분을 만들지 않는다.
 */
const createGuidePathGroups = (guide: TracingGuide): GuidePathGroup[] => {
  const paths = getGuidePaths(guide);

  let flatStartIndex = 0;

  return paths.map((points) => {
    const segments = createGuideSegments(points);

    const group: GuidePathGroup = {
      segments,
      flatStartIndex,
    };

    flatStartIndex += segments.length;

    return group;
  });
};

/**
 * 초기 진행 상태 생성
 */
export const createInitialTracingProgress = (
  guide: TracingGuide,
): TracingProgressState => {
  const groups = createGuidePathGroups(guide);

  const totalPoints = groups.reduce(
    (total, group) => total + group.segments.length,
    0,
  );

  return {
    progress: {
      progress: 0,
      completedPoints: 0,
      totalPoints,
      isCompleted: false,
    },
    completedSegments: Array(totalPoints).fill(false),
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
 * 순서 판정에서 인정하는 거리 (허용 거리의 배수)
 */
const ORDERED_LOOKAHEAD_FACTOR = 3.5;

/**
 * 하나의 경로 안에서 앞에서부터 따라온 구간만 인정한다.
 *
 * 각 독립 경로마다 별도로 실행한다.
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
    if (completed) {
      maxIndex = index;
    }
  });

  const handleSample = (sample: DrawingPoint) => {
    const reach =
      (maxIndex >= 0 ? guideSegments[maxIndex].endDistance : 0) + lookahead;

    for (let i = 0; i < guideSegments.length; i++) {
      const segment = guideSegments[i];

      // 구간은 시작 거리 순으로 정렬되어 있으므로 범위를 넘으면 중단
      if (segment.startDistance > reach) {
        break;
      }

      if (touched[i] || previousCompleted[i]) {
        continue;
      }

      if (
        segment.length === 0 ||
        getDistanceToSegment(sample, segment.start, segment.end) <= tolerance
      ) {
        touched[i] = true;

        if (i > maxIndex) {
          maxIndex = i;
        }
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
 * - 기존 완성 구간 유지
 * - 새롭게 통과한 구간 추가
 * - 독립 경로는 각각 별도로 판정
 * - 전체 경로가 완성되어야 성공
 */
// export const updateTracingProgress = (
//   guide: TracingGuide,
//   previousState: TracingProgressState,
//   stroke: DrawingPoint[],
// ): TracingProgressState => {
//   const groups = createGuidePathGroups(guide);

//   const totalPoints = groups.reduce(
//     (total, group) => total + group.segments.length,
//     0,
//   );

//   if (totalPoints === 0) {
//     return createInitialTracingProgress(guide);
//   }

//   const tolerance = guide.tolerance ?? DEFAULT_TOLERANCE;

//   // 기존 완성 상태를 복사한다.
//   const completedSegments = Array(totalPoints)
//     .fill(false)
//     .map((_, index) => previousState.completedSegments[index] ?? false);

//   // 각 독립 경로를 별도로 판정한다.
//   // for (const group of groups) {
//   //   const { segments, flatStartIndex } = group;

//   //   if (segments.length === 0) {
//   //     continue;
//   //   }

//   //   const previousCompleted = segments.map(
//   //     (_, index) => completedSegments[flatStartIndex + index],
//   //   );

//   //   // ordered 가이드는 경로별 순서 판정,
//   //   // 그 외에는 기존 비순서 판정을 사용한다.
//   //   const touchedSegments = guide.ordered
//   //     ? findOrderedTouchedSegments(
//   //         stroke,
//   //         segments,
//   //         tolerance,
//   //         previousCompleted,
//   //       )
//   //     : findTouchedSegments(stroke, segments, tolerance);

//   //   touchedSegments.forEach((touched, index) => {
//   //     if (touched) {
//   //       completedSegments[flatStartIndex + index] = true;
//   //     }
//   //   });
//   // }

//   // 각 독립 경로를 순서대로 판정한다.
//   if (guide.ordered) {
//     // 아직 완성되지 않은 첫 번째 경로를 찾는다.
//     const activeGroup = groups.find((group) => {
//       if (group.segments.length === 0) {
//         return false;
//       }

//       return group.segments.some(
//         (_, index) => !completedSegments[group.flatStartIndex + index],
//       );
//     });

//     // 현재 진행 중인 경로만 판정한다.
//     if (activeGroup) {
//       const { segments, flatStartIndex } = activeGroup;

//       const previousCompleted = segments.map(
//         (_, index) => completedSegments[flatStartIndex + index],
//       );

//       const touchedSegments = findOrderedTouchedSegments(
//         stroke,
//         segments,
//         tolerance,
//         previousCompleted,
//       );

//       touchedSegments.forEach((touched, index) => {
//         if (touched) {
//           completedSegments[flatStartIndex + index] = true;
//         }
//       });
//     }
//   } else {
//     // ordered가 아닌 기존 가이드는 기존 판정 유지
//     for (const group of groups) {
//       const { segments, flatStartIndex } = group;

//       if (segments.length === 0) {
//         continue;
//       }

//       const previousCompleted = segments.map(
//         (_, index) => completedSegments[flatStartIndex + index],
//       );

//       const touchedSegments = findTouchedSegments(stroke, segments, tolerance);

//       touchedSegments.forEach((touched, index) => {
//         if (touched) {
//           completedSegments[flatStartIndex + index] = true;
//         }
//       });
//     }
//   }

//   // 완성된 선분 개수
//   const completedPoints = completedSegments.filter(Boolean).length;

//   // 전체 경로 길이
//   const totalLength = groups.reduce(
//     (total, group) =>
//       total +
//       group.segments.reduce(
//         (groupTotal, segment) => groupTotal + segment.length,
//         0,
//       ),
//     0,
//   );

//   // 실제 완성된 선분의 길이
//   let flatIndex = 0;
//   let completedLength = 0;

//   for (const group of groups) {
//     for (const segment of group.segments) {
//       if (completedSegments[flatIndex]) {
//         completedLength += segment.length;
//       }

//       flatIndex += 1;
//     }
//   }

//   // 모든 경로의 모든 구간이 완성되어야 성공
//   const isCompleted = totalPoints > 0 && completedSegments.every(Boolean);

//   const progress = isCompleted
//     ? 1
//     : totalLength > 0
//       ? Math.min(1, completedLength / totalLength)
//       : 0;

//   return {
//     progress: {
//       progress,
//       completedPoints,
//       totalPoints,
//       isCompleted,
//     },
//     completedSegments,
//   };
// };

/**
 * 새로운 그리기 데이터를 기존 진행 상태에 반영한다.
 *
 * ordered = true
 * - 기존 선 그리기 판정
 * - 경로의 진행 순서 유지
 *
 * ordered = false
 * - 모양 그리기 판정
 * - 시작 위치와 진행 방향 무관
 * - 각 도형의 윤곽 커버리지로 완성 판단
 * - 도형별로 독립 판정
 */
export const updateTracingProgress = (
  guide: TracingGuide,
  previousState: TracingProgressState,
  stroke: DrawingPoint[],
): TracingProgressState => {
  const groups = createGuidePathGroups(guide);

  const totalPoints = groups.reduce(
    (total, group) => total + group.segments.length,
    0,
  );

  if (totalPoints === 0) {
    return createInitialTracingProgress(guide);
  }

  const tolerance = guide.tolerance ?? DEFAULT_TOLERANCE;

  const completedSegments = Array(totalPoints)
    .fill(false)
    .map((_, index) => previousState.completedSegments[index] ?? false);

  if (guide.ordered) {
    // ------------------------------------------
    // 선 그리기: 기존 순서 기반 판정
    // ------------------------------------------

    const group = groups.find(({ segments, flatStartIndex }) => {
      if (segments.length === 0) return false;

      return segments.some(
        (_, index) => !completedSegments[flatStartIndex + index],
      );
    });

    if (group) {
      const { segments, flatStartIndex } = group;

      const previousCompleted = segments.map(
        (_, index) => completedSegments[flatStartIndex + index],
      );

      const touchedSegments = findOrderedTouchedSegments(
        stroke,
        segments,
        tolerance,
        previousCompleted,
      );

      touchedSegments.forEach((touched, index) => {
        if (touched) {
          completedSegments[flatStartIndex + index] = true;
        }
      });
    }
  } else {
    // ------------------------------------------
    // 모양 그리기: 방향과 시작점에 관계없는 판정
    // ------------------------------------------

    const completionThreshold = Math.max(
      0,
      Math.min(1, guide.completionThreshold ?? 0.85),
    );

    groups.forEach(({ segments, flatStartIndex }) => {
      if (segments.length === 0) return;

      const previousCompleted = segments.map(
        (_, index) => completedSegments[flatStartIndex + index],
      );

      // 이번 손가락 움직임이 지나간 구간
      const touchedSegments = findTouchedSegments(stroke, segments, tolerance);

      // 이전에 그린 구간도 누적
      touchedSegments.forEach((touched, index) => {
        if (touched) {
          completedSegments[flatStartIndex + index] = true;
        }
      });

      // 현재 도형의 윤곽 커버리지 계산
      const totalLength = segments.reduce(
        (sum, segment) => sum + segment.length,
        0,
      );

      const completedLength = segments.reduce(
        (sum, segment, index) =>
          sum +
          (completedSegments[flatStartIndex + index] ? segment.length : 0),
        0,
      );

      const coverage = totalLength > 0 ? completedLength / totalLength : 0;

      // 도형 하나의 윤곽을 충분히 따라 그렸으면 완성
      if (coverage >= completionThreshold) {
        segments.forEach((_, index) => {
          completedSegments[flatStartIndex + index] = true;
        });
      }
    });
  }

  // ------------------------------------------
  // 전체 진행률 계산
  // ------------------------------------------

  const completedPoints = completedSegments.filter(Boolean).length;

  const totalLength = groups.reduce(
    (total, group) =>
      total +
      group.segments.reduce(
        (groupTotal, segment) => groupTotal + segment.length,
        0,
      ),
    0,
  );

  let flatIndex = 0;
  let completedLength = 0;

  for (const group of groups) {
    for (const segment of group.segments) {
      if (completedSegments[flatIndex]) {
        completedLength += segment.length;
      }

      flatIndex += 1;
    }
  }

  const isCompleted = totalPoints > 0 && completedSegments.every(Boolean);

  const progress = isCompleted
    ? 1
    : totalLength > 0
      ? Math.min(1, completedLength / totalLength)
      : 0;

  return {
    progress: {
      progress,
      completedPoints,
      totalPoints,
      isCompleted,
    },
    completedSegments,
  };
};
