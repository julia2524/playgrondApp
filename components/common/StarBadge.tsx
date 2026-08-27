import styled from "styled-components/native";

interface StarBadgeProps {
  count?: number;
}

export default function StarBadge({ count = 0 }: StarBadgeProps) {
  return (
    <Badge>
      <Star>⭐</Star>
      <Count>{count}</Count>
    </Badge>
  );
}

const Badge = styled.View`
  flex-direction: row;
  align-items: center;

  padding: 8px 14px;

  border-radius: 20px;

  background-color: #fff7d6;
`;

const Star = styled.Text`
  font-size: 18px;
`;

const Count = styled.Text`
  margin-left: 5px;

  font-size: 16px;
  font-weight: bold;
  color: #2c3e50;
`;
