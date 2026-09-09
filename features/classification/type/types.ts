import {
  CategoryGameObject,
  CategoryLevelConfig,
  CategoryRound,
} from "../category/type/types";
import { ColorLevelConfig, ColorRound } from "../color/type/types";
import { ShapeLevelConfig, ShapeRound } from "../shape/type/types";

export type DropResult = "correct" | "wrong" | "outside";

export type Layout = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type GameType = "color" | "shape" | "category";

export type LevelConfigFor<T extends GameType = "color"> = T extends "color"
  ? ColorLevelConfig
  : T extends "shape"
    ? ShapeLevelConfig
    : CategoryLevelConfig;

export type GameRoundFor<T extends GameType = "color"> = T extends "color"
  ? ColorRound
  : T extends "shape"
    ? ShapeRound
    : CategoryRound;

// 유니온
export type LevelConfig =
  | ColorLevelConfig
  | ShapeLevelConfig
  | CategoryLevelConfig;
export type GameRound = ColorRound | ShapeRound | CategoryRound;

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

export type GameObject = ColorGameObject | ShapeGameObject | CategoryGameObject;
