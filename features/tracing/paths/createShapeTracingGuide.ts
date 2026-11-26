import type { ShapeTracingStage } from "../data/shapeStages";
import type { TracingBoardSize, TracingGuide } from "../types/tracing.types";

import { createTracingPoints } from "../utils/tracingPathUtils";

const VIEWBOX_WIDTH = 320;
const VIEWBOX_HEIGHT = 240;

/**
 * 모양 스테이지의 SVG 경로를 TracingGuide로 변환한다.
 *
 * 여러 개의 모양은 각각 독립된 path로 유지한다.
 */
export const createShapeTracingGuide = (
  stage: ShapeTracingStage,
  size: TracingBoardSize,
): TracingGuide => {
  const padding = 34;

  const fitScale = Math.min(
    (size.width - padding * 2) / VIEWBOX_WIDTH,
    (size.height - padding * 2) / VIEWBOX_HEIGHT,
  );

  const scale = fitScale * (stage.scale ?? 1);

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
    completionThreshold: 0.85, //여기서 0.85는 윤곽의 약 85%를 따라 그리면 도형 하나를 완성한 것으로 인정한다는 뜻
    ordered: false,
  };
};
