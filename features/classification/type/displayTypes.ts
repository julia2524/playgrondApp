// 화면 렌더링 전용 공통 모델 (도메인 타입과 분리)
export interface DisplayObject {
  id: string;
  renderId: string; // SVG 그릴 때 쓰는 shapeId (color의 name, shape의 shapeId 통합)
  color?: string;
}

// export interface DisplayTarget {
//   id: string;
//   items: string[]; // 항상 배열로 통일 (shape는 [shapeId] 하나짜리 배열)
//   color?: string;
// }

export interface DisplayRound {
  id: string;
  answer: Record<string, string>;
  missingItem?: string; // shape는 undefined로 둠 (아래 로직에서 대응)
}
// type/displayTypes.ts

export type DisplayItemKind = "color" | "shape" | "item";

export interface DisplayObject {
  id: string;
  renderId: string; // 이 kind에 맞는 asset을 찾을 때 쓰는 id
  kind: DisplayItemKind; // ⭐ 추가: 어떤 SVG 렌더러를 써야 하는지
  color?: string;
}

export interface DisplayTarget {
  id: string;
  items: string[];
  kind: DisplayItemKind;
  color?: string;
  missingIndex?: number;
  slotColors?: (string | undefined)[];
  slotKinds?: DisplayItemKind[];
}
