import { GameRound } from "../type/types";
import { DisplayObject, DisplayTarget } from "../type/displayTypes";

export function toDisplayObjects(round: GameRound): DisplayObject[] {
  if (round.game === "classification") {
    return round.objects.map((o) => ({
      id: o.id,
      renderId: o.name ?? o.shape ?? "",
      kind: "color",
      color: o.color,
    }));
  }
  // shape
  return round.objects.map((o) => ({
    id: o.id,
    renderId: o.kind === "item" ? (o.itemId ?? o.shapeId) : o.shapeId,
    kind: o.kind, // "shape" | "item"
    color: o.color,
  }));
}

export function toDisplayTargets(round: GameRound): DisplayTarget[] {
  if (round.game === "classification") {
    return round.targets.map((t) => ({
      id: t.id,
      items: t.items ?? [],
      kind: "color",
      color: t.color,
    }));
  }

  // shape
  if (!round.targets || round.targets.length === 0) return [];

  const correctTargetId = Object.values(round.answer)[0];
  const correctTarget = round.targets.find((t) => t.id === correctTargetId);

  if (!correctTarget) {
    console.warn("⚠️ 정답 target을 찾을 수 없습니다", round);
    return [];
  }

  // ★ 정답 슬롯의 index (shuffle된 순서 기준)
  const missingIndex = round.targets.findIndex((t) => t.id === correctTargetId);

  const items = round.targets.map((t) =>
    t.kind === "item" ? (t.itemId ?? t.shapeId) : t.shapeId,
  );

  const slotColors = round.targets.map((t) => t.color); // ★ 추가
  const slotKinds = round.targets.map((t) => t.kind); // ★ 추가
  const displayTarget: DisplayTarget = {
    id: correctTarget.id,
    items,
    kind: correctTarget.kind,
    color: correctTarget.color,
    missingIndex, // ★ 추가
    slotColors, // ★ 추가
    slotKinds, // ★ 추가
  };

  return [displayTarget];
}
// ⭐ "이 라운드에서 빈칸으로 표시할 아이템의 renderId"
export function toMissingItem(round: GameRound): string | undefined {
  if (round.game === "classification") {
    return round.missingItem;
  }

  // shape에서는 더 이상 shapeId로 비교하지 않음 (index 사용)
  // 호환성을 위해 남겨둠
  const correctTargetId = Object.values(round.answer)[0];
  const correctTarget = round.targets.find((t) => t.id === correctTargetId);

  if (!correctTarget) return undefined;

  return correctTarget.kind === "item"
    ? (correctTarget.itemId ?? correctTarget.shapeId)
    : correctTarget.shapeId;
}

export function getCorrectObjectId(round: GameRound): string | undefined {
  if (round.game === "shape") {
    return round.correctObjectId ?? Object.keys(round.answer)[0];
  }
  return Object.keys(round.answer)[0];
}
