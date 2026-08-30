// rewardSystem.ts

export const TOTAL_ROUNDS = 10;

export const MAX_STARS = 5;

/**
 * 성공 횟수를 기준으로 별 계산
 *
 * 1번째 성공 → ⭐
 * 3번째 성공 → ⭐⭐
 * 5번째 성공 → ⭐⭐⭐
 * 7번째 성공 → ⭐⭐⭐⭐
 * 9번째 성공 → ⭐⭐⭐⭐⭐
 */

export function calculateStars(correctRoundCount: number): number {
  if (correctRoundCount >= 10) return 5;
  if (correctRoundCount >= 9) return 4.5;

  if (correctRoundCount >= 8) return 4;

  if (correctRoundCount >= 7) return 3.5;

  if (correctRoundCount >= 6) return 3;

  if (correctRoundCount >= 5) return 2.5;

  if (correctRoundCount >= 4) return 2;

  if (correctRoundCount >= 3) return 1.5;

  if (correctRoundCount >= 2) return 1;

  if (correctRoundCount >= 1) return 0.5;

  return 0;
}
