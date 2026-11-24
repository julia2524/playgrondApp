import { DrawingPoint } from "../types/drawing.types";

/**
 * 두 점 사이의 거리
 */
export const getDistance = (a: DrawingPoint, b: DrawingPoint): number => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;

  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * 점과 선분 사이의 최단 거리
 *
 * 선분의 시작점과 끝점 사이에서
 * 가장 가까운 위치를 찾아 거리를 계산한다.
 */
export const getDistanceToSegment = (
  point: DrawingPoint,
  start: DrawingPoint,
  end: DrawingPoint,
): number => {
  const dx = end.x - start.x;
  const dy = end.y - start.y;

  const lengthSquared = dx * dx + dy * dy;

  // 선분의 길이가 0이면 시작점과의 거리 반환
  if (lengthSquared === 0) {
    return getDistance(point, start);
  }

  // 점을 선분 위에 투영했을 때의 위치 비율
  const t =
    ((point.x - start.x) * dx + (point.y - start.y) * dy) / lengthSquared;

  // 선분 바깥으로 벗어나지 않도록 제한
  const clampedT = Math.max(0, Math.min(1, t));

  // 선분 위에서 가장 가까운 점
  const closestPoint: DrawingPoint = {
    x: start.x + clampedT * dx,
    y: start.y + clampedT * dy,
  };

  return getDistance(point, closestPoint);
};

/**
 * 한 점이 가이드 경로의 허용 범위 안에 있는지 확인
 */
export const isPointNearGuide = (
  point: DrawingPoint,
  guidePoints: DrawingPoint[],
  tolerance: number,
): boolean => {
  if (guidePoints.length === 0 || tolerance < 0) {
    return false;
  }

  // 가이드 점이 하나뿐인 경우
  if (guidePoints.length === 1) {
    return getDistance(point, guidePoints[0]) <= tolerance;
  }

  // 가이드의 모든 선분 중 가장 가까운 거리 확인
  for (let i = 0; i < guidePoints.length - 1; i++) {
    const distance = getDistanceToSegment(
      point,
      guidePoints[i],
      guidePoints[i + 1],
    );

    if (distance <= tolerance) {
      return true;
    }
  }

  return false;
};

/**
 * 가이드 경로의 전체 길이 계산
 */
export const getGuideLength = (points: DrawingPoint[]): number => {
  if (points.length < 2) {
    return 0;
  }

  let totalLength = 0;

  for (let i = 0; i < points.length - 1; i++) {
    totalLength += getDistance(points[i], points[i + 1]);
  }

  return totalLength;
};
