import React from "react";
import { Image, StyleSheet, Dimensions } from "react-native";
import styled from "styled-components/native";
import { ASSETS } from "../../constants/assets";
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function DecorativeBackground() {
  return (
    <Background pointerEvents="none">
      {/* 🌟 화면 전체를 덮는 그라데이션 SVG 배경 */}
      {/* <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id="skyGradient" x1="0" y1="1" x2="0" y2="0">
            <Stop offset="0" stopColor="#FFF3DE" />
            <Stop offset="1" stopColor="#D9EEFF" />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#skyGradient)" />
      </Svg> */}

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
