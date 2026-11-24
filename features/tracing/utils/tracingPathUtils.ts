import { DrawingPoint } from "../types/drawing.types";

interface PathCommand {
  type: string;
  values: number[];
}

interface PathParserResult {
  points: DrawingPoint[];
  isClosed: boolean;
}

const DEFAULT_CURVE_STEPS = 20;
const DEFAULT_LINE_STEPS = 1;

/**
 * SVG Path 문자열을 명령어 단위로 분리
 */
const tokenizePath = (path: string): string[] => {
  return path.match(/[a-zA-Z]|[-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi) ?? [];
};

/**
 * SVG Path 명령어 파싱
 */
const parsePathCommands = (path: string): PathCommand[] => {
  const tokens = tokenizePath(path);

  const commands: PathCommand[] = [];

  let index = 0;
  let currentCommand = "";

  const parameterCounts: Record<string, number> = {
    M: 2,
    L: 2,
    H: 1,
    V: 1,
    C: 6,
    Q: 4,
  };

  while (index < tokens.length) {
    const token = tokens[index];

    if (/^[a-zA-Z]$/.test(token)) {
      currentCommand = token;
      index++;

      if (currentCommand.toUpperCase() === "Z") {
        commands.push({
          type: currentCommand,
          values: [],
        });

        currentCommand = "";
        continue;
      }
    }

    if (!currentCommand) {
      throw new Error(`잘못된 SVG Path 명령어: ${token}`);
    }

    const commandType = currentCommand.toUpperCase();
    const parameterCount = parameterCounts[commandType];

    if (!parameterCount) {
      throw new Error(`지원하지 않는 SVG Path 명령어: ${currentCommand}`);
    }

    if (index + parameterCount > tokens.length) {
      throw new Error(`SVG Path 좌표가 부족합니다: ${currentCommand}`);
    }

    const values = tokens.slice(index, index + parameterCount).map(Number);

    if (values.some((value) => !Number.isFinite(value))) {
      throw new Error("SVG Path에 잘못된 좌표가 있습니다.");
    }

    commands.push({
      type: currentCommand,
      values,
    });

    index += parameterCount;

    // M 다음에 이어지는 좌표들은 L로 해석
    if (commandType === "M") {
      currentCommand = currentCommand === "M" ? "L" : "l";
    }
  }

  return commands;
};

/**
 * 두 점 사이의 거리
 */
const distance = (start: DrawingPoint, end: DrawingPoint): number => {
  const dx = end.x - start.x;
  const dy = end.y - start.y;

  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * 점 추가
 */
const appendPoint = (points: DrawingPoint[], point: DrawingPoint) => {
  const previous = points[points.length - 1];

  if (!previous || distance(previous, point) > 0.001) {
    points.push(point);
  }
};

/**
 * 3차 베지어 곡선
 */
const cubicBezier = (
  p0: DrawingPoint,
  p1: DrawingPoint,
  p2: DrawingPoint,
  p3: DrawingPoint,
  t: number,
): DrawingPoint => {
  const mt = 1 - t;

  const mt2 = mt * mt;
  const t2 = t * t;

  return {
    x:
      mt2 * mt * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t2 * t * p3.x,

    y:
      mt2 * mt * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t2 * t * p3.y,
  };
};

/**
 * 2차 베지어 곡선
 */
const quadraticBezier = (
  p0: DrawingPoint,
  p1: DrawingPoint,
  p2: DrawingPoint,
  t: number,
): DrawingPoint => {
  const mt = 1 - t;

  return {
    x: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,

    y: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y,
  };
};

/**
 * SVG Path를 좌표 배열로 변환
 */
export const parseSvgPath = (
  path: string,
  curveSteps = DEFAULT_CURVE_STEPS,
): PathParserResult => {
  const commands = parsePathCommands(path);

  const points: DrawingPoint[] = [];

  let currentPoint: DrawingPoint = { x: 0, y: 0 };
  let startPoint: DrawingPoint = { x: 0, y: 0 };

  let isClosed = false;

  for (const command of commands) {
    const { type, values } = command;

    const isRelative = type === type.toLowerCase();
    const commandType = type.toUpperCase();

    const getPoint = (x: number, y: number): DrawingPoint => ({
      x: isRelative ? currentPoint.x + x : x,
      y: isRelative ? currentPoint.y + y : y,
    });

    switch (commandType) {
      case "M": {
        currentPoint = getPoint(values[0], values[1]);
        startPoint = { ...currentPoint };

        appendPoint(points, currentPoint);
        break;
      }

      case "L": {
        currentPoint = getPoint(values[0], values[1]);

        appendPoint(points, currentPoint);
        break;
      }

      case "H": {
        currentPoint = {
          x: isRelative ? currentPoint.x + values[0] : values[0],
          y: currentPoint.y,
        };

        appendPoint(points, currentPoint);
        break;
      }

      case "V": {
        currentPoint = {
          x: currentPoint.x,
          y: isRelative ? currentPoint.y + values[0] : values[0],
        };

        appendPoint(points, currentPoint);
        break;
      }

      case "C": {
        const p0 = { ...currentPoint };
        const p1 = getPoint(values[0], values[1]);
        const p2 = getPoint(values[2], values[3]);
        const p3 = getPoint(values[4], values[5]);

        for (let i = 1; i <= curveSteps; i++) {
          const t = i / curveSteps;

          appendPoint(points, cubicBezier(p0, p1, p2, p3, t));
        }

        currentPoint = p3;
        break;
      }

      case "Q": {
        const p0 = { ...currentPoint };
        const p1 = getPoint(values[0], values[1]);
        const p2 = getPoint(values[2], values[3]);

        for (let i = 1; i <= curveSteps; i++) {
          const t = i / curveSteps;

          appendPoint(points, quadraticBezier(p0, p1, p2, t));
        }

        currentPoint = p2;
        break;
      }

      case "Z": {
        appendPoint(points, startPoint);

        currentPoint = { ...startPoint };
        isClosed = true;
        break;
      }

      default:
        throw new Error(`지원하지 않는 명령어: ${type}`);
    }
  }

  return {
    points,
    isClosed,
  };
};

/**
 * 경로를 일정한 간격으로 재샘플링
 *
 * 곡선 구간과 직선 구간의 점 밀도를 균일하게 만들어
 * 거리 판정의 편차를 줄여준다.
 */
export const resamplePath = (
  points: DrawingPoint[],
  spacing = 5,
): DrawingPoint[] => {
  if (points.length < 2 || spacing <= 0) {
    return points;
  }

  const result: DrawingPoint[] = [{ ...points[0] }];

  let distanceUntilNextPoint = spacing;

  for (let i = 0; i < points.length - 1; i++) {
    const start = points[i];
    const end = points[i + 1];

    const segmentLength = distance(start, end);

    if (segmentLength === 0) continue;

    let traveled = 0;

    while (traveled + distanceUntilNextPoint <= segmentLength) {
      traveled += distanceUntilNextPoint;

      const t = traveled / segmentLength;

      result.push({
        x: start.x + (end.x - start.x) * t,
        y: start.y + (end.y - start.y) * t,
      });

      distanceUntilNextPoint = spacing;
    }

    distanceUntilNextPoint -= segmentLength - traveled;
  }

  const lastPoint = points[points.length - 1];
  const resultLastPoint = result[result.length - 1];

  if (distance(resultLastPoint, lastPoint) > 0.001) {
    result.push({ ...lastPoint });
  }

  return result;
};

/**
 * SVG Path를 Tracing용 좌표 배열로 변환
 */
export const createTracingPoints = (
  path: string,
  options?: {
    curveSteps?: number;
    spacing?: number;
  },
): DrawingPoint[] => {
  const { points } = parseSvgPath(
    path,
    options?.curveSteps ?? DEFAULT_CURVE_STEPS,
  );

  return resamplePath(points, options?.spacing ?? 5);
};
