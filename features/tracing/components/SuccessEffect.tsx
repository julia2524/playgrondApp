import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import styled from "styled-components/native";

interface SuccessEffectProps {
  x: number;
  y: number;
  visible: boolean;
  size?: number;
  onComplete?: () => void;
}

export default function SuccessEffect({
  x,
  y,
  visible,
  size = 100,
  onComplete,
}: SuccessEffectProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.5)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    animationRef.current?.stop();

    if (!visible) {
      opacity.setValue(0);
      scale.setValue(0.5);
      return;
    }

    opacity.setValue(0);
    scale.setValue(0.5);

    const animation = Animated.sequence([
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          speed: 12,
          bounciness: 5,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(450),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
    ]);

    animationRef.current = animation;

    animation.start(({ finished }) => {
      if (finished) {
        onComplete?.();
      }
    });

    return () => {
      animation.stop();
    };
  }, [visible, opacity, scale, onComplete]);

  return (
    <EffectContainer
      pointerEvents="none"
      posLeft={x - size / 2}
      posTop={y - size / 2}
      effectSize={size}
      style={[
        {
          opacity,
          transform: [{ scale }],
        },
      ]}
    >
      <Svg width="100%" height="100%" viewBox="0 0 100 100">
        {/* 가운데 큰 별 */}
        <Path
          d="M50 7 L57 35 L84 24 L69 49 L94 63 L64 65 L61 94 L46 70 L22 86 L32 59 L6 45 L36 42 Z"
          fill="#FFD66E"
          opacity="0.95"
        />

        {/* 작은 별 */}
        <Path
          d="M17 13 L20 23 L30 26 L20 29 L17 39 L14 29 L4 26 L14 23 Z"
          fill="#FFB8C8"
        />
        <Path
          d="M82 12 L85 22 L95 25 L85 28 L82 38 L79 28 L69 25 L79 22 Z"
          fill="#9EDCF2"
        />
        <Path
          d="M82 69 L85 78 L94 81 L85 84 L82 93 L79 84 L70 81 L79 78 Z"
          fill="#B9DFA4"
        />

        {/* 반짝이는 점 */}
        <Circle cx="29" cy="72" r="3" fill="#FFD66E" />
        <Circle cx="68" cy="40" r="2.5" fill="#FFFFFF" />
        <Circle cx="39" cy="17" r="2" fill="#FFFFFF" />
      </Svg>
    </EffectContainer>
  );
}

interface EffectContainerProps {
  posLeft: number;
  posTop: number;
  effectSize: number;
}

const EffectContainer = styled(Animated.View).attrs<EffectContainerProps>(
  ({ posLeft, posTop, effectSize }) => ({
    style: {
      left: posLeft,
      top: posTop,
      width: effectSize,
      height: effectSize,
    },
  }),
)`
  position: absolute;
  z-index: 10;
`;
