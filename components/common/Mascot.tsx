import React from "react";
import { Image, ImageSourcePropType } from "react-native";
import styled from "styled-components/native";
import { ASSETS } from "../../constants/assets";

interface MascotProps {
  size?: number;
}

export default function Mascot({ size = 150 }: MascotProps) {
  return (
    <MascotContainer>
      <Bear
        source={ASSETS.mascotBear as ImageSourcePropType}
        size={size}
        resizeMode="contain"
      />
    </MascotContainer>
  );
}

const MascotContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const Bear = styled(Image)<{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;
