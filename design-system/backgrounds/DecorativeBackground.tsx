import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";
import { ASSETS } from "../../assets/assets";

export default function DecorativeBackground() {
  return (
    <Background pointerEvents="none">
      <Cloud source={ASSETS.decorCloud} resizeMode="contain" />
      <Star source={ASSETS.decorStar} resizeMode="contain" />
      <Sparkle source={ASSETS.decorSparkle} resizeMode="contain" />
    </Background>
  );
}

const Background = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 1;
`;

const Cloud = styled(Image)`
  position: absolute;
  width: 150px;
  height: 100px;
  top: 80px;
  right: -30px;
  opacity: 0.35;
`;

const Star = styled(Image)`
  position: absolute;
  width: 55px;
  height: 55px;
  top: 170px;
  left: 15px;
  opacity: 0.45;
`;

const Sparkle = styled(Image)`
  position: absolute;
  width: 45px;
  height: 45px;
  bottom: 120px;
  right: 25px;
  opacity: 0.4;
`;
