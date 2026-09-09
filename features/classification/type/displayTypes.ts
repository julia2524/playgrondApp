import { CategoryVariant } from "../category/type/types";

export interface DisplayRound {
  id: string;
  answer: Record<string, string>;
  missingItem?: string; // shape는 undefined로 둠 (아래 로직에서 대응)
}
// type/displayTypes.ts

export type DisplayItemKind = "color" | "shape" | "item" | "category";
// displayTypes.ts 예시
export type DisplayObject = {
  id: string;
  renderId: string;
  kind: "color" | "shape" | "item" | "category";
  color?: string;
  name?: string;
  variant?: CategoryVariant; // Category용
  isCorrect?: boolean; // Category용
};

export type DisplayTarget = {
  id: string;
  items: string[];
  kind: "color" | "shape" | "item" | "category";
  color?: string;
  missingIndex?: number;
  slotColors?: string[];
  slotKinds?: string[];
  slotItems?: any[]; // Category용 (targetBox 내용)
  slotVariants?: CategoryVariant[];
};
