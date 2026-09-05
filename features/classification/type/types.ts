import { ColorLevelConfig, ColorRound } from "../color/type/types";
import { ShapeLevelConfig, ShapeRound } from "../shape/type/types";

export type DropResult = "correct" | "wrong" | "outside";

export type Layout = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type GameType = "color" | "shape";

// ⭐ 기존 걸 이름만 바꿔서 그대로 유지 — "이 타입 하나로 좁혀 쓰고 싶을 때" 용도
export type LevelConfigFor<T extends GameType = "color"> = T extends "shape"
  ? ShapeLevelConfig
  : ColorLevelConfig;

export type GameRoundFor<T extends GameType = "color"> = T extends "shape"
  ? ShapeRound
  : ColorRound;

// ⭐ 새로 추가 — "여러 게임 다 받아야 하는 곳"에 쓰는 진짜 유니온
export type LevelConfig = ColorLevelConfig | ShapeLevelConfig;
export type GameRound = ColorRound | ShapeRound;

// type/types.ts

export interface BaseGameObject {
  id: string;
  name: string; // 렌더링할 shape id — 색/모양 게임 둘 다 필요
}

export interface ColorGameObject extends BaseGameObject {
  color: string;
}

export interface ShapeGameObject extends BaseGameObject {
  // shape 게임 전용 필드가 있으면 여기에
}

export interface BaseGameTarget {
  id: string;
  items?: string[];
  color?: string; // shape 게임엔 없을 수 있으니 optional
}

export interface BaseRound {
  id: string;
  answer: Record<string, string>;
  missingItem: string;
}

// export interface ColorRound extends BaseRound {
//   game: "classification";
//   objects: ColorGameObject[];
//   targets: BaseGameTarget[];
// }

// export interface ShapeRound extends BaseRound {
//   game: "shape";
//   objects: ShapeGameObject[];
//   targets: BaseGameTarget[];
// }

export type GameObject = ColorGameObject | ShapeGameObject;
