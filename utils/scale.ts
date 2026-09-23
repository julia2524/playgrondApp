// utils/scale.ts
import { Dimensions } from "react-native";

const DESIGN_WIDTH = 360;
const DESIGN_HEIGHT = 800;

export function getScale() {
  const { width, height } = Dimensions.get("window");
  // 0.92 = 좌우/상하 여유 (패딩·헤더 감안)
  return Math.min(
    1,
    (width * 0.92) / DESIGN_WIDTH,
    (height * 0.92) / DESIGN_HEIGHT,
  );
}

export function s(size: number) {
  return Math.round(size * getScale());
}
