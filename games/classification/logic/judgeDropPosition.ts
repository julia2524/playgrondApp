//"스티커 중심점 계산 + margin 체크 + isInside" 로직은 React나 state랑 전혀 상관없는 순수 계산

type Rect = { x: number; y: number; width: number; height: number };

export function isStickerInsideTarget(sticker: Rect, target: Rect): boolean {
  const centerX = sticker.x + sticker.width / 2;
  const centerY = sticker.y + sticker.height / 2;

  return (
    centerX > target.x &&
    centerX < target.x + target.width &&
    centerY > target.y &&
    centerY < target.y + target.height
  );
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
