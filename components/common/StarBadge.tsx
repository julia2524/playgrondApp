import styled from "styled-components/native";

interface StarBadgeProps {
  filled?: boolean; // 🌟 채워진 별인지 여부
}

export default function StarBadge({ filled = false }: StarBadgeProps) {
  return (
    <Badge>
      <Star>{filled ? "⭐" : "☆"}</Star>
    </Badge>
  );
}

const Badge = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Star = styled.Text`
  font-size: 30px;
`;

const Count = styled.Text`
  margin-left: 5px;

  font-size: 16px;
  font-weight: bold;
  color: #2c3e50;
`;
