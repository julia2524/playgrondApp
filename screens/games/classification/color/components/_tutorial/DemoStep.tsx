import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import {
  Overlay,
  Content,
  Title,
  Description,
  DemoStage,
  DemoBallWrapper,
  DemoBall,
  DemoSlot,
  FingerIcon,
  Button,
  ButtonText,
} from "../../styles/_tutorialStyles";

interface DemoStepProps {
  onNext: () => void;
}

const START_X = 0;
const END_X = 110; // 슬롯까지의 이동 거리 (실제 레이아웃에 맞춰 조정)

export default function DemoStep({ onNext }: DemoStepProps) {
  const progress = useRef(new Animated.Value(0)).current; // 0(시작) ~ 1(도착)
  const fingerScale = useRef(new Animated.Value(1)).current; // 손가락 "꾹 누르기" 표현

  useEffect(() => {
    const cycle = Animated.sequence([
      // 1. 손가락이 공 위에 도착해서 "꾹" 누름
      Animated.timing(fingerScale, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),

      Animated.delay(150),

      // 2. 잡은 채로 슬롯까지 이동
      Animated.timing(progress, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),

      // 3. 도착해서 살짝 튕기며 안착 (스프링)
      Animated.spring(fingerScale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),

      Animated.delay(500),

      // 4. 손가락 놓고 처음 위치로 리셋
      Animated.timing(progress, {
        toValue: 0,
        duration: 0, // 순간 리셋 (페이드 처리는 opacity로)
        useNativeDriver: true,
      }),

      Animated.delay(400),
    ]);

    const loop = Animated.loop(cycle);
    loop.start();

    return () => loop.stop();
  }, []);

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [START_X, END_X],
  });

  return (
    <Overlay>
      <Content>
        <Title>이렇게 옮기는 거야!</Title>

        <DemoStage>
          {/* 목표 슬롯 (빈 파란 원) */}
          <DemoSlot />

          {/* 움직이는 공 + 손가락 */}
          <DemoBallWrapper style={{ transform: [{ translateX }] }}>
            <DemoBall />
            <Animated.View style={{ transform: [{ scale: fingerScale }] }}>
              <FingerIcon>👆</FingerIcon>
            </Animated.View>
          </DemoBallWrapper>
        </DemoStage>

        <Description>
          👆 손가락으로 꾹 누르고{"\n"}같은 색 빈칸으로 끌어다 놓아봐!
        </Description>

        <Button onPress={onNext} activeOpacity={0.8}>
          <ButtonText>알겠어! 🚀</ButtonText>
        </Button>
      </Content>
    </Overlay>
  );
}
