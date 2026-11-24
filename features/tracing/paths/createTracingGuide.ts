import type {
  TracingBoardSize,
  TracingGuide,
  TracingLineType,
  TracingPathConfig,
} from "../types/tracing.types";

import { PATH_GENERATORS } from "./pathGenerators";
import { getLineInfo } from "./lineCatalog";
import { getBaseTolerance } from "./tolerance";

/**
 * 스테이지(선 유형)와 보드 크기로 경로를 만든다.
 * 렌더링(가이드 선)과 터치 판정이 이 path 하나를 같이 사용한다.
 */
export const createTracingPath = (
  type: TracingLineType,
  size: TracingBoardSize,
): TracingPathConfig => {
  const path = PATH_GENERATORS[type](size);

  return {
    type,
    start: path[0],
    end: path[path.length - 1],
    path,
  };
};

/**
 * 경로를 기존 Tracing Engine이 쓰는 TracingGuide로 변환한다.
 */
export const createTracingGuide = (
  type: TracingLineType,
  size: TracingBoardSize,
): TracingGuide => {
  const config = createTracingPath(type, size);
  const info = getLineInfo(type);

  // 가로선의 기존 허용 거리(그림 영역 너비의 4%, 최대 14px)를 기준으로 삼는다.
  const baseTolerance = getBaseTolerance(size.width);

  return {
    id: type,
    points: config.path,
    tolerance: baseTolerance * info.toleranceScale,
    completionThreshold: 1,
    ordered: info.ordered,
  };
};
