import React, { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";

interface CountdownOverlayProps {
  onFinish: () => void;
}

export default function CountdownOverlay({ onFinish }: CountdownOverlayProps) {
  const [count, setCount] = useState(3);

  const scale = useRef(new Animated.Value(0.5)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 숫자가 등장할 때마다 퐁!
    scale.setValue(0.5);
    opacity.setValue(0);

    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        tension: 120,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    if (count > 0) {
      const timer = setTimeout(() => {
        setCount((prev) => prev - 1);
      }, 800);

      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      onFinish();
    }, 700);

    return () => clearTimeout(timer);
  }, [count]);

  const message =
    count === 3
      ? "준비됐어?"
      : count === 2
        ? "두근두근!"
        : count === 1
          ? "거의 다 왔어!"
          : "색깔을 찾아볼까?";

  return (
    <Overlay>
      <Cloud>☁️</Cloud>

      <AnimatedContent
        style={{
          opacity,
          transform: [{ scale }],
        }}
      >
        {count > 0 ? (
          <>
            <CountText>{count}</CountText>
            <SubText>{message}</SubText>
          </>
        ) : (
          <>
            <StartText>✨ 시작! ✨</StartText>
            <SubText>{message}</SubText>
          </>
        )}
      </AnimatedContent>

      <Star>⭐</Star>
      <Heart>💖</Heart>
    </Overlay>
  );
}

const Overlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: #f8f9fe;

  justify-content: center;
  align-items: center;

  z-index: 999;
`;

const AnimatedContent = styled(Animated.View)`
  align-items: center;
`;

const CountText = styled.Text`
  font-size: 100px;
  font-family: "Jua";
  color: #0fa6dd;
`;

const StartText = styled.Text`
  font-size: 56px;
  font-family: "Jua";
  color: #fe9404;
`;

const SubText = styled.Text`
  margin-top: 8px;

  font-size: 24px;
  font-family: "Jua";
  color: #7569e8;
`;

const Cloud = styled.Text`
  position: absolute;
  top: 130px;
  left: 45px;

  font-size: 45px;
`;

const Star = styled.Text`
  position: absolute;
  right: 55px;
  top: 200px;

  font-size: 35px;
`;

const Heart = styled.Text`
  position: absolute;
  bottom: 220px;
  left: 60px;

  font-size: 32px;
`;
