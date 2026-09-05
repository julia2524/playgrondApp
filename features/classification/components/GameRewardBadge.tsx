import StarBadge from "../../../design-system/ui/StarBadge";
import SunBadge from "../../../design-system/ui/SunBadge";

interface GameRewardBadgeProps {
  gameType: "color" | "shape";
  type: "full" | "half" | "empty";
  size?: number;
}

export default function GameRewardBadge({
  gameType,
  type,
  size,
}: GameRewardBadgeProps) {
  if (gameType === "shape") {
    return <SunBadge type={type} size={size} />;
  }
  return <StarBadge type={type} />;
}
