export const STICKER_SIZE = 110;
export const BOARD_HORIZONTAL_PADDING = 20;
export const BOARD_VERTICAL_PADDING = 20;
export const DROP_MARGIN = 70;

export const CORRECT_FEEDBACK_DELAY_MS = 1000;
export const WRONG_FEEDBACK_DELAY_MS = 1200;
export const CORRECT_ANIMATION_DURATION_MS = 300;

export const Z_INDEX = {
  default: 1,
  dragging: 9999,
  matched: 9999,
} as const;

export const ELEVATION = {
  default: 1,
  dragging: 99,
  matched: 999,
} as const;

export const MIN_BOARD_INNER_SIZE = 1; // 0-division 방어용
