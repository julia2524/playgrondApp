import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";

import Mascot from "../../../../../../components/common/Mascot";
import {
  Overlay,
  Content,
  MascotWrapper,
  Title,
  Description,
  DemoArea,
  Finger,
  Arrow,
  Button,
  ButtonText,
} from "../../styles/_tutorialStyles";

interface WelcomeStepProps {
  onNext: () => void;
}

export default function WelcomeStep({ onNext }: WelcomeStepProps) {
  const fingerX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(fingerX, {
          toValue: 80,
          duration: 1000,
          useNativeDriver: true,
        }),

        Animated.delay(300),

        Animated.timing(fingerX, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),

        Animated.delay(500),
      ]),
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, []);
  return (
    <Overlay>
      <Content>
        <MascotWrapper>
          <Mascot size={120} />
        </MascotWrapper>

        <Title>색깔 찾기 모험에{"\n"}온 걸 환영해! 🎨</Title>

        <Description>같은 색깔을 찾아서{"\n"}쏙 넣어보는 게임이야!</Description>
        {/* 드래그 시범 */}
        <DemoArea>
          <Animated.View
            style={{
              transform: [
                {
                  translateX: fingerX,
                },
              ],
            }}
          >
            <Finger>👆</Finger>
          </Animated.View>

          <Arrow>→</Arrow>
        </DemoArea>

        <Description>
          손가락으로 꾹 누르고
          {"\n"}
          같은 색 빈칸으로 끌어다 놓아봐!
        </Description>

        <Button
          onPress={() => {
            if (typeof onNext === "function") {
              onNext();
            } else {
              console.warn("onNext 함수가 전달되지 않았습니다!");
            }
          }}
          activeOpacity={0.8}
        >
          <ButtonText>한번 해볼까? 🚀</ButtonText>
        </Button>
      </Content>
    </Overlay>
  );
}
