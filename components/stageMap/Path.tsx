import Svg, { Path as SvgPath } from "react-native-svg";

interface PathProps {
  height?: number;
  fromX: number;
  toX: number;
  completed?: boolean;
}

export default function Path({
  height = 120,
  fromX,
  toX,
  completed = false,
}: PathProps) {
  // SVG 좌표 안에서 사용할 수 있도록 살짝 보정
  const startX = fromX;
  const endX = toX;

  // 두 점 사이의 중간 X
  const middleX = (startX + endX) / 2;

  const pathData = `
    M ${startX} 0

    C ${middleX} ${height * 0.25},
      ${middleX} ${height * 0.75},
      ${endX} ${height}
  `;

  return (
    <Svg
      width="100%"
      height={height}
      viewBox={`0 0 300 ${height}`}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
      }}
      pointerEvents="none"
    >
      {/* 🌈 바깥쪽 폭신한 길 */}
      <SvgPath
        d={pathData}
        fill="none"
        stroke={completed ? "#B8E8D4" : "#D8EAF2"}
        strokeWidth={14}
        strokeLinecap="round"
      />

      {/* ✨ 길 안쪽 하이라이트 */}
      <SvgPath
        d={pathData}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray="8 10"
        opacity={0.8}
      />
    </Svg>
  );
}
