// import React from "react";
// import Svg, { Circle, G, Path, Polygon } from "react-native-svg";

// interface ProgressSunProps {
//   progress: number; // 0 ~ 10
//   size?: number;
// }

// const TOTAL_PARTS = 10;

// export default function ProgressSun({ progress, size = 80 }: ProgressSunProps) {
//   const safeProgress = Math.max(0, Math.min(progress, TOTAL_PARTS));

//   const center = size / 2;

//   // 해의 가운데 원 크기
//   const sunRadius = size * 0.25;

//   // 햇살 삼각형의 시작 위치
//   const innerRadius = size * 0.31;

//   // 햇살 끝부분
//   const outerRadius = size * 0.46;

//   const rays = Array.from({ length: TOTAL_PARTS }, (_, index) => {
//     const angle = index * 36 - 90;

//     const radian = (angle * Math.PI) / 180;

//     // 햇살의 중심점
//     const centerX = center + Math.cos(radian) * innerRadius;

//     const centerY = center + Math.sin(radian) * innerRadius;

//     // 삼각형의 양쪽 각도
//     const sideAngle = 11;

//     const leftRadian = ((angle - sideAngle) * Math.PI) / 180;

//     const rightRadian = ((angle + sideAngle) * Math.PI) / 180;

//     // 삼각형 밑변 왼쪽
//     const leftX = center + Math.cos(leftRadian) * innerRadius;

//     const leftY = center + Math.sin(leftRadian) * innerRadius;

//     // 삼각형 밑변 오른쪽
//     const rightX = center + Math.cos(rightRadian) * innerRadius;

//     const rightY = center + Math.sin(rightRadian) * innerRadius;

//     // 삼각형 꼭짓점
//     const tipX = center + Math.cos(radian) * outerRadius;

//     const tipY = center + Math.sin(radian) * outerRadius;

//     const isFilled = index < safeProgress;

//     return {
//       points: `
//           ${leftX},${leftY}
//           ${tipX},${tipY}
//           ${rightX},${rightY}
//         `,
//       isFilled,
//     };
//   });

//   return (
//     <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
//       {/* 햇살 */}
//       <G>
//         {rays.map((ray, index) => (
//           <Polygon
//             key={index}
//             points={ray.points}
//             fill={ray.isFilled ? "#FFD85C" : "#F3F4F8"}
//             stroke="#FFFFFF"
//             strokeWidth="1"
//             strokeLinejoin="round"
//             strokeLinecap="round"
//           />
//         ))}
//       </G>
//       {/* 해 가운데 - 10조각 */}
//       <G>
//         {Array.from({ length: TOTAL_PARTS }, (_, index) => {
//           const startAngle = index * 36 - 90;
//           const endAngle = startAngle + 36;

//           const startRadian = (startAngle * Math.PI) / 180;
//           const endRadian = (endAngle * Math.PI) / 180;

//           const x1 = center + Math.cos(startRadian) * sunRadius;

//           const y1 = center + Math.sin(startRadian) * sunRadius;

//           const x2 = center + Math.cos(endRadian) * sunRadius;

//           const y2 = center + Math.sin(endRadian) * sunRadius;

//           const isFilled = index < safeProgress;

//           return (
//             <Path
//               key={index}
//               d={`
//           M ${center} ${center}
//           L ${x1} ${y1}
//           A ${sunRadius} ${sunRadius}
//             0 0 1
//             ${x2} ${y2}
//           Z
//         `}
//               fill={isFilled ? "#FFD85C" : "#F3F4F8"}
//               stroke="none"
//             />
//           );
//         })}

//         {/* 가운데 원의 외곽선 */}
//         <Circle
//           cx={center}
//           cy={center}
//           r={sunRadius}
//           fill="none"
//           stroke="#FFFFFF"
//           strokeWidth="2"
//           strokeLinejoin="round"
//           strokeLinecap="round"
//         />
//       </G>

//       {/* 해 가운데 */}
//       {/* <Circle
//         cx={center}
//         cy={center}
//         r={sunRadius}
//         fill="#FFD85C"
//         stroke="#E8C94F"
//         strokeWidth={1.5}
//       />*/}
//     </Svg>
//   );
// }

import React, { memo, useMemo } from "react";
import Svg, { Circle, G, Path, Polygon } from "react-native-svg";

interface ProgressSunProps {
  progress: number;
  size?: number;
}

const TOTAL_PARTS = 10;

const ProgressSun = memo(function ProgressSun({
  progress,
  size = 80,
}: ProgressSunProps) {
  const safeProgress = Math.max(0, Math.min(Math.floor(progress), TOTAL_PARTS));

  const center = size / 2;
  const sunRadius = size * 0.25;
  const innerRadius = size * 0.31;
  const outerRadius = size * 0.46;

  // 진행도와 무관한 햇살 좌표는 재사용
  const rays = useMemo(() => {
    return Array.from({ length: TOTAL_PARTS }, (_, index) => {
      const angle = index * 36 - 90;
      const radian = (angle * Math.PI) / 180;

      const leftRadian = ((angle - 11) * Math.PI) / 180;
      const rightRadian = ((angle + 11) * Math.PI) / 180;

      const leftX = center + Math.cos(leftRadian) * innerRadius;
      const leftY = center + Math.sin(leftRadian) * innerRadius;

      const rightX = center + Math.cos(rightRadian) * innerRadius;
      const rightY = center + Math.sin(rightRadian) * innerRadius;

      const tipX = center + Math.cos(radian) * outerRadius;
      const tipY = center + Math.sin(radian) * outerRadius;

      return {
        points: `${leftX},${leftY} ${tipX},${tipY} ${rightX},${rightY}`,
      };
    });
  }, [center, innerRadius, outerRadius]);

  // 가운데 원은 10개 Path 대신 하나의 원과 진행도용 Path만 사용
  const progressPath = useMemo(() => {
    if (safeProgress <= 0) return "";
    if (safeProgress >= TOTAL_PARTS) return "";

    const angle = safeProgress * 36 - 90;
    const radian = (angle * Math.PI) / 180;

    const endX = center + Math.cos(radian) * sunRadius;
    const endY = center + Math.sin(radian) * sunRadius;

    const largeArcFlag = safeProgress > 5 ? 1 : 0;

    return [
      `M ${center} ${center}`,
      `L ${center} ${center - sunRadius}`,
      `A ${sunRadius} ${sunRadius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
      "Z",
    ].join(" ");
  }, [safeProgress, center, sunRadius]);

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* 햇살 */}
      <G>
        {rays.map((ray, index) => (
          <Polygon
            key={index}
            points={ray.points}
            fill={index < safeProgress ? "#FFD85C" : "#F3F4F8"}
            stroke="#FFFFFF"
            strokeWidth={1}
            strokeLinejoin="round"
          />
        ))}
      </G>

      {/* 가운데 원의 기본 배경 */}
      <Circle cx={center} cy={center} r={sunRadius} fill="#F3F4F8" />

      {/* 진행도에 따른 노란색 영역 */}
      {safeProgress > 0 && (
        <Path
          d={
            safeProgress === TOTAL_PARTS
              ? `M ${center} ${center} m ${-sunRadius} 0 a ${sunRadius} ${sunRadius} 0 1 0 ${sunRadius * 2} 0 a ${sunRadius} ${sunRadius} 0 1 0 ${-sunRadius * 2} 0`
              : progressPath
          }
          fill="#FFD85C"
        />
      )}

      {/* 가운데 원 외곽선 */}
      <Circle
        cx={center}
        cy={center}
        r={sunRadius}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={2}
      />
    </Svg>
  );
});

export default ProgressSun;
