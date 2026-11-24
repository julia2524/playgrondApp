import { DrawingPoint } from "../types/drawing.types";

export interface MascotRect {
  left: number;
  top: number;
}

interface MascotPlacementOptions {
  anchor: DrawingPoint;
  guidePoints: DrawingPoint[];
  boardWidth: number;
  boardHeight: number;
  mascotWidth: number;
  mascotHeight: number;
}

/**
 * 팬더를 놓을 위치를 고른다.
 *
 * 선 유형마다 출발/도착 위치가 달라서(세로선은 맨 위, 나선은 중심 등)
 * 항상 "점 위에 서 있게" 두면 경로를 가리거나 보드 밖으로 나간다.
 *
 * 후보(위 → 오른쪽 → 왼쪽 → 아래)를 보드 안으로 보정한 뒤
 * 가이드 경로와 겹치는 점이 가장 적은 곳을 고른다. 겹침이 같으면
 * 원래 자리(점 위)에서 가장 가까운 후보, 그래도 같으면 앞선 후보를 쓴다.
 * 가로선은 기존처럼 점 위에 서게 된다.
 */
export const getMascotPosition = ({
  anchor,
  guidePoints,
  boardWidth,
  boardHeight,
  mascotWidth,
  mascotHeight,
}: MascotPlacementOptions): MascotRect => {
  const gap = 12;

  const candidates: MascotRect[] = [
    // 위: 기존 방식 (발이 점에 닿음)
    { left: anchor.x - mascotWidth / 2, top: anchor.y - mascotHeight + 8 },
    // 오른쪽
    { left: anchor.x + gap, top: anchor.y - mascotHeight / 2 },
    // 왼쪽
    { left: anchor.x - gap - mascotWidth, top: anchor.y - mascotHeight / 2 },
    // 아래
    { left: anchor.x - mascotWidth / 2, top: anchor.y + gap },
  ];

  const maxLeft = Math.max(0, boardWidth - mascotWidth);
  const maxTop = Math.max(0, boardHeight - mascotHeight);

  // 겹침 판정은 몸통 부분만 (좌우 12%, 위 6%, 발 쪽 14%는 제외)
  const bodyOf = (rect: MascotRect) => ({
    left: rect.left + mascotWidth * 0.12,
    right: rect.left + mascotWidth * 0.88,
    top: rect.top + mascotHeight * 0.06,
    bottom: rect.top + mascotHeight * 0.86,
  });

  let best: MascotRect | null = null;
  let bestScore = Number.POSITIVE_INFINITY;

  for (const candidate of candidates) {
    const clamped: MascotRect = {
      left: Math.min(Math.max(candidate.left, 0), maxLeft),
      top: Math.min(Math.max(candidate.top, 0), maxTop),
    };

    const body = bodyOf(clamped);

    const overlap = guidePoints.reduce((count, point) => {
      const inside =
        point.x >= body.left &&
        point.x <= body.right &&
        point.y >= body.top &&
        point.y <= body.bottom;

      return inside ? count + 1 : count;
    }, 0);

    const moved = Math.hypot(
      clamped.left - candidate.left,
      clamped.top - candidate.top,
    );

    // 겹침이 가장 중요, 그다음이 원래 자리에서 밀려난 거리
    const score = overlap * 1000 + moved;

    if (score < bestScore) {
      bestScore = score;
      best = clamped;
    }
  }

  return best ?? candidates[0];
};
