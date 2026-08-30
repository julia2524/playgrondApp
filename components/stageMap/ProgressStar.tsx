import React from "react";
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Path,
  Polygon,
  ClipPath,
  G,
} from "react-native-svg";

interface ProgressStarProps {
  size?: number;
  // ⭐ 0 ~ 10
  progress?: number;
}

type Point = {
  x: number;
  y: number;
};

export default function ProgressStar({
  size = 90,
  progress = 0,
}: ProgressStarProps) {
  const safeProgress = Math.max(0, Math.min(10, progress));

  const center: Point = {
    x: 50,
    y: 50,
  };

  const starPoints: Point[] = [
    { x: 50, y: 4 },
    { x: 64, y: 30 },
    { x: 94, y: 34 },
    { x: 70, y: 54 },
    { x: 79, y: 88 },
    { x: 50, y: 72 },
    { x: 21, y: 88 },
    { x: 30, y: 54 },
    { x: 6, y: 34 },
    { x: 36, y: 30 },
  ];

  const getPointBetween = (from: Point, to: Point, amount: number): Point => {
    return {
      x: from.x + (to.x - from.x) * amount,
      y: from.y + (to.y - from.y) * amount,
    };
  };

  const roundAmount = 0.28;

  const createRoundedStarPath = () => {
    const firstPoint = starPoints[0];
    const previousPoint = starPoints[starPoints.length - 1];

    const startPoint = getPointBetween(firstPoint, previousPoint, roundAmount);

    let path = `M ${startPoint.x} ${startPoint.y}`;

    for (let index = 0; index < starPoints.length; index++) {
      const currentPoint = starPoints[index];
      const nextPoint = starPoints[(index + 1) % starPoints.length];

      const beforeCurrent = getPointBetween(
        currentPoint,
        starPoints[(index - 1 + starPoints.length) % starPoints.length],
        roundAmount,
      );

      const afterCurrent = getPointBetween(
        currentPoint,
        nextPoint,
        roundAmount,
      );

      if (index === 0) {
        path += ` L ${afterCurrent.x} ${afterCurrent.y} `;
        continue;
      }

      path += `
        L ${beforeCurrent.x} ${beforeCurrent.y}
        Q ${currentPoint.x} ${currentPoint.y}
          ${afterCurrent.x} ${afterCurrent.y}
      `;
    }

    const firstAfterPoint = getPointBetween(
      firstPoint,
      starPoints[1],
      roundAmount,
    );

    path += `
      L ${getPointBetween(firstPoint, previousPoint, roundAmount).x}
      ${getPointBetween(firstPoint, previousPoint, roundAmount).y}
      Q ${firstPoint.x} ${firstPoint.y}
        ${firstAfterPoint.x} ${firstAfterPoint.y}
      Z
    `;

    return path;
  };

  const starPath = createRoundedStarPath();
  const filledCount = Math.floor(safeProgress);

  const filledSegments = Array.from(
    {
      length: filledCount,
    },
    (_, index) => {
      const currentPoint = starPoints[index];
      const nextPoint = starPoints[(index + 1) % starPoints.length];

      return (
        <Polygon
          key={index}
          points={`
            ${center.x},${center.y}
            ${currentPoint.x},${currentPoint.y}
            ${nextPoint.x},${nextPoint.y}
          `}
          fill="url(#progressGrad)"
        />
      );
    },
  );

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Defs>
        <LinearGradient id="emptyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#F1F5F9" />
          <Stop offset="100%" stopColor="#CBD5E1" />
        </LinearGradient>

        {/* 🌟 누런빛/개나리빛을 완전히 뺀, 상큼하고 쨍한 레몬 형광 옐로우 톤 */}
        <LinearGradient id="progressGrad" x1="20%" y1="0%" x2="80%" y2="100%">
          <Stop offset="0%" stopColor="#FFEA00" />
          <Stop offset="50%" stopColor="#FFEA00" />
          <Stop offset="100%" stopColor="#FFEA00" />
        </LinearGradient>

        <ClipPath id="starClip">
          <Path d={starPath} />
        </ClipPath>
      </Defs>

      {/* 빈 별 */}
      <Path d={starPath} fill="url(#emptyGrad)" />

      {/* 진행된 조각 */}
      <G clipPath="url(#starClip)">{filledSegments}</G>

      {/* 둥글고 두툼한 입체 테두리 */}
      <Path
        d={starPath}
        fill="transparent"
        stroke="#FFFFFF"
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.9"
      />
    </Svg>
  );
}
