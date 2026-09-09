import { GameRound } from "../type/types";
import { DisplayObject, DisplayTarget } from "../type/displayTypes";
import { CategoryRound } from "../category/type/types";

// ---------- 타입 가드 ----------
function isCategoryRound(round: GameRound): round is CategoryRound {
  return round.game === "category";
}
export function toDisplayObjects(round: GameRound): DisplayObject[] {
  // ⭐ Category
  if (round.game === "category") {
    return round.objects.map((item) => ({
      id: item.id,
      renderId: item.svgKey,
      kind: "category" as const,
      color: item.variant.primary, // hex 문자열
      name: item.name,
      variant: item.variant,
      isCorrect: item.isCorrect,
    }));
  }
  // ⭐ Color (classification)
  if (round.game === "classification") {
    return round.objects.map((o) => ({
      id: o.id,
      renderId: o.name ?? (o as any).shape ?? "",
      kind: "color" as const,
      color: o.color,
    }));
  }

  // ⭐ Shape
  return round.objects.map((o) => ({
    id: o.id,
    renderId: o.kind === "item" ? (o.itemId ?? o.shapeId) : o.shapeId,
    kind: o.kind, // "shape" | "item"
    color: o.color,
  }));
}

// ---------- Targets ----------
export function toDisplayTargets(round: GameRound): DisplayTarget[] {
  // ⭐ Category
  if (round.game === "category") {
    const targets = round.targets;

    // 빈칸 = isCorrect: true 인 슬롯 (또는 answer의 value)
    const missingTargetId = Object.values(round.answer)[0];
    const missingIndex = targets.findIndex((t) => t.id === missingTargetId);
    return [
      {
        id: "category-target",
        items: targets.map((t) => t.svgKey),
        kind: "category" as const,
        missingIndex,
        slotColors: targets.map((t) => t.variant.primary), // hex 배열
        slotKinds: targets.map(() => "category" as const),
        slotVariants: targets.map((t) => t.variant), // ⭐ 핵심
      },
    ];
  }
  // ⭐ Color
  if (round.game === "classification") {
    return round.targets.map((t) => ({
      id: t.id,
      items: t.items ?? [],
      kind: "color" as const,
      color: t.color,
    }));
  }

  // ⭐ Shape
  // ⭐ Shape
  if (!round.targets || round.targets.length === 0) return [];

  const correctTargetId = Object.values(round.answer)[0];
  const correctTarget = round.targets.find((t) => t.id === correctTargetId);

  if (!correctTarget) {
    console.warn("⚠️ 정답 target을 찾을 수 없습니다", round);
    return [];
  }

  const missingIndex = round.targets.findIndex((t) => t.id === correctTargetId);

  const items = round.targets.map((t) =>
    t.kind === "item" ? (t.itemId ?? t.shapeId ?? "") : (t.shapeId ?? ""),
  );

  const slotColors: string[] = round.targets.map((t) => t.color ?? "");
  const slotKinds = round.targets.map((t) => t.kind ?? "shape");

  const displayTarget: DisplayTarget = {
    id: correctTarget.id,
    items,
    kind: correctTarget.kind,
    color: correctTarget.color,
    missingIndex,
    slotColors,
    slotKinds,
  };

  return [displayTarget];
}

// ⭐ "이 라운드에서 빈칸으로 표시할 아이템의 renderId"
// ---------- missingItem ----------
export function toMissingItem(round: GameRound): string | undefined {
  // ⭐ Category
  if (round.game === "category") {
    const missingId = Object.values(round.answer)[0];
    const missing = round.targets.find((t) => t.id === missingId);
    return missing?.svgKey;
  }

  // ⭐ Color
  if (round.game === "classification") {
    return (round as any).missingItem;
  }

  // ⭐ Shape
  const correctTargetId = Object.values(round.answer || {})[0];
  const correctTarget = round.targets?.find((t) => t.id === correctTargetId);

  if (!correctTarget) return undefined;

  return correctTarget.kind === "item"
    ? (correctTarget.itemId ?? correctTarget.shapeId)
    : correctTarget.shapeId;
}

export function getCorrectObjectId(round: GameRound): string | undefined {
  // ⭐ Category
  if (round.game === "category") {
    return round.correctObjectId;
  }

  // ⭐ Shape
  if (round.game === "shape") {
    return round.correctObjectId ?? Object.keys(round.answer || {})[0];
  }

  // ⭐ Color
  return Object.keys(round.answer || {})[0];
}
