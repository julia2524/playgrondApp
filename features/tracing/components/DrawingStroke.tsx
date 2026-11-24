import React, { useMemo } from "react";
import { Path } from "react-native-svg";

import type { DrawingStrokeData } from "../types/drawing.types";

interface DrawingStrokeProps {
  points: DrawingStrokeData;
  color?: string;
  strokeWidth?: number;
  opacity?: number;
}

const DrawingStroke = ({
  points,
  color = "#8B6CF6",
  strokeWidth = 12,
  opacity = 1,
}: DrawingStrokeProps) => {
  const pathData = useMemo(() => {
    if (points.length === 0) return "";

    const firstPoint = points[0];

    let path = `M ${firstPoint.x} ${firstPoint.y}`;

    if (points.length === 1) {
      return path;
    }

    for (let i = 1; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];

      const midX = (current.x + next.x) / 2;
      const midY = (current.y + next.y) / 2;

      path += ` Q ${current.x} ${current.y} ${midX} ${midY}`;
    }

    const lastPoint = points[points.length - 1];

    path += ` L ${lastPoint.x} ${lastPoint.y}`;

    return path;
  }, [points]);

  if (!pathData) return null;

  return (
    <Path
      d={pathData}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={opacity}
    />
  );
};

export default React.memo(DrawingStroke);
