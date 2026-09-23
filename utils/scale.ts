// utils/scale.ts
import { Dimensions } from "react-native";

const DESIGN_WIDTH = 360;
const DESIGN_HEIGHT = 800;

export function getScale() {
  const { width, height } = Dimensions.get("window");
  // 높이 여유를 더 크게 (헤더·제스처바 감안)
  return Math.min(
    1,
    width / DESIGN_WIDTH,
    (height * 0.88) / DESIGN_HEIGHT, // ← 높이 쪽을 더 세게
  );
}

export function s(size: number) {
  return Math.round(size * getScale());
}

/** 세로 전용 (패딩·마진·타겟 높이) */
export function vs(size: number) {
  const { height } = Dimensions.get("window");
  const ratio = Math.min(1, (height * 0.88) / DESIGN_HEIGHT);
  return Math.round(size * ratio);
}
