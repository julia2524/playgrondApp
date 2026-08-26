//"스티커 중심점 계산 + margin 체크 + isInside" 로직은 React나 state랑 전혀 상관없는 순수 계산

type Rect = { x: number; y: number; width: number; height: number };

export function isStickerInsideTarget(
  sticker: Rect,
  target: Rect,
  margin: number = 30, // ⭐ 필요하면 살짝만
): boolean {
  const centerX = sticker.x + sticker.width / 2;
  const centerY = sticker.y + sticker.height / 2;

  return (
    centerX > target.x - margin &&
    centerX < target.x + target.width + margin &&
    centerY > target.y - margin &&
    centerY < target.y + target.height + margin
  );
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
