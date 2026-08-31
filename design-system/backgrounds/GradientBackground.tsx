import React from "react";
import { Image, StyleSheet, Dimensions } from "react-native";
import styled from "styled-components/native";
import { ASSETS } from "../../constants/assets";
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function DecorativeBackground() {
  return (
    <Svg height="120%" width="100%" style={StyleSheet.absoluteFill}>
      <Defs>
        <LinearGradient id="skyGradient" x1="0" y1="1" x2="0" y2="0">
          <Stop offset="0" stopColor="#FFF3DE" />
          <Stop offset="1" stopColor="#D9EEFF" />
        </LinearGradient>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#skyGradient)" />
    </Svg>
  );
}
