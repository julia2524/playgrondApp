import React from "react";
import { View } from "react-native";
import Svg, { Ellipse, Path, Rect } from "react-native-svg";
import styled from "styled-components/native";

interface BambooObjectProps {
  left: number;
  top: number;
  width?: number;
  height?: number;
}

export default function BambooObject({
  left,
  top,
  width = 76,
  height = 100,
}: BambooObjectProps) {
  return (
    <BambooContainer
      pointerEvents="none"
      posLeft={left}
      posTop={top}
      bambooWidth={width}
      bambooHeight={height}
    >
      <Svg width="100%" height="100%" viewBox="0 0 100 130">
        {/* 왼쪽 대나무 */}
        <Rect x="17" y="34" width="15" height="88" rx="7" fill="#78B96B" />
        <Rect x="17" y="57" width="15" height="4" rx="2" fill="#4D9654" />
        <Rect x="17" y="91" width="15" height="4" rx="2" fill="#4D9654" />

        {/* 가운데 대나무 */}
        <Rect x="42" y="12" width="17" height="110" rx="8" fill="#91CC79" />
        <Rect x="42" y="42" width="17" height="4" rx="2" fill="#5AA45E" />
        <Rect x="42" y="78" width="17" height="4" rx="2" fill="#5AA45E" />

        {/* 오른쪽 대나무 */}
        <Rect x="69" y="42" width="14" height="80" rx="7" fill="#70B768" />
        <Rect x="69" y="67" width="14" height="4" rx="2" fill="#4D9654" />
        <Rect x="69" y="96" width="14" height="4" rx="2" fill="#4D9654" />

        {/* 대나무 줄기 하이라이트 */}
        <Path
          d="M22 42 L22 112 M47 21 L47 112 M74 49 L74 113"
          stroke="#C5E9A8"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* 위쪽 잎사귀 */}
        <Path d="M49 16 Q25 -1 14 13 Q30 22 49 16" fill="#65B86C" />
        <Path d="M51 17 Q68 -7 87 5 Q73 20 51 17" fill="#83C978" />

        {/* 옆으로 뻗은 잎사귀 */}
        <Path d="M25 39 Q5 25 2 39 Q13 48 25 39" fill="#82C878" />
        <Path d="M75 43 Q91 25 99 38 Q91 49 75 43" fill="#5EAD65" />
        <Path d="M52 30 Q57 8 70 8 Q69 24 52 30" fill="#A1D88B" />

        {/* 잎맥 */}
        <Path
          d="M49 16 Q31 12 18 14 M51 17 Q69 10 83 7"
          stroke="#D0EBAE"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* 바닥 그림자 */}
        <Ellipse
          cx="50"
          cy="123"
          rx="38"
          ry="5"
          fill="#6B9D62"
          opacity="0.15"
        />
      </Svg>
    </BambooContainer>
  );
}

interface BambooContainerProps {
  posLeft: number;
  posTop: number;
  bambooWidth: number;
  bambooHeight: number;
}

const BambooContainer = styled(View).attrs<BambooContainerProps>(
  ({ posLeft, posTop, bambooWidth, bambooHeight }) => ({
    style: {
      left: posLeft,
      top: posTop,
      width: bambooWidth,
      height: bambooHeight,
    },
  }),
)`
  position: absolute;
`;
