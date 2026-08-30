import styled from "styled-components/native";
import CandyStar from "./CandyStar";

interface StarBadgeProps {
  type?: "full" | "half" | "empty";
}

export default function StarBadge({ type = "empty" }: StarBadgeProps) {
  return (
    <Badge>
      <CandyStar size={30} type={type} />
    </Badge>
  );
}

const Badge = styled.View`
  flex-direction: row;
  align-items: center;
`;
