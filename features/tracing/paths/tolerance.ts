/**
 * 판정 허용 거리 계산 (경로 생성기와 가이드 생성이 같은 기준을 쓴다)
 *
 * 가로선의 기존 허용 거리(그림 영역 너비의 4%, 최대 14px)가 기준이다.
 */
export const getBaseTolerance = (width: number): number =>
  Math.min(width * 0.04, 14);

/** 곡선 유형의 허용 거리 배율 (lineCatalog의 toleranceScale과 맞춘다) */
export const CURVE_TOLERANCE_SCALE = 1.2;

/** 곡선 경로를 만들 때 "굴곡/고리가 허용 거리보다 충분히 큰가"를 판단하는 기준값 */
export const getCurveTolerance = (width: number): number =>
  getBaseTolerance(width) * CURVE_TOLERANCE_SCALE;
