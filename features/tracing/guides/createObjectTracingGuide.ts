import type { ObjectTracingStage } from "../data/objectStages";

import type { TracingBoardSize, TracingGuide } from "../types/tracing.types";

import { createTracingPoints } from "../utils/tracingPathUtils";

const VIEWBOX_WIDTH = 320;
const VIEWBOX_HEIGHT = 240;

/**
 * 사물 스테이지의 SVG 경로를 TracingGuide로 변환한다.
 *
 * 컬러 사물 일러스트와 동일한 320 x 240 좌표계를 사용한다.
 * 사물별 외곽선은 독립된 path로 유지한다.
 */
export const createObjectTracingGuide = (
  stage: ObjectTracingStage,
  size: TracingBoardSize,
): TracingGuide => {
  // 컬러 사물 일러스트가 전체 SVG 영역을 사용하므로 padding은 0
  const padding = 0;

  const fitScale = Math.min(
    (size.width - padding * 2) / VIEWBOX_WIDTH,
    (size.height - padding * 2) / VIEWBOX_HEIGHT,
  );

  //   const scale = fitScale * (stage.scale ?? 1);
  const scale = fitScale * 1.5 * (stage.scale ?? 1);

  const centerX = size.width / 2;
  const centerY = size.height / 2;

  const paths = stage.paths.map((svgPath) =>
    createTracingPoints(svgPath, {
      curveSteps: 24,
      spacing: 5,
    }).map((point) => ({
      x: centerX + (point.x - VIEWBOX_WIDTH / 2) * scale,
      y: centerY + (point.y - VIEWBOX_HEIGHT / 2) * scale,
    })),
  );

  return {
    id: stage.id,
    points: [],
    paths,
    tolerance: Math.min(size.width * 0.045, 15),
    completionThreshold: 0.85,
    ordered: false,
  };
};
