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
export function calculateStars(correctCount: number): number {
  if (correctCount <= 0) {
    return 0;
  }

  return Math.min(Math.ceil(correctCount / 2), MAX_STARS);
}
