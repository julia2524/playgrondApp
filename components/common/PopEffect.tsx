import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

type PopEffectProps = {
  x: number;
  y: number;
  color: string;
  variant: "bubble" | "paint";
  onComplete: () => void;
};

const PARTICLES = [
  { x: 0, y: -1, size: 11 },
  { x: 0.7, y: -0.7, size: 9 },
  { x: 1, y: 0, size: 12 },
  { x: 0.7, y: 0.7, size: 8 },
  { x: 0, y: 1, size: 10 },
  { x: -0.7, y: 0.7, size: 12 },
  { x: -1, y: 0, size: 8 },
  { x: -0.7, y: -0.7, size: 10 },
];

export default function PopEffect({
  x,
  y,
  color,
  variant,
  onComplete,
}: PopEffectProps) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: 360,
      useNativeDriver: true,
    });

    animation.start(({ finished }) => {
      if (finished) onComplete();
    });

    return () => {
      animation.stop();
    };
  }, [progress, onComplete]);

  const isBubble = variant === "bubble";

  const ringScale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 5.5],
  });

  const ringOpacity = progress.interpolate({
    inputRange: [0, 0.15, 1],
    outputRange: [0, 0.75, 0],
  });

  const secondRingScale = progress.interpolate({
    inputRange: [0, 0.25, 1],
    outputRange: [0.2, 0.8, 4.5],
  });

  const particleOpacity = progress.interpolate({
    inputRange: [0, 0.12, 0.75, 1],
    outputRange: [0, 1, 1, 0],
  });

  const particleScale = progress.interpolate({
    inputRange: [0, 0.25, 1],
    outputRange: [0.3, 1.15, 0.65],
  });

  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        left: x,
        top: y,
        zIndex: 100,
        elevation: 100,
      }}
    >
      {/* 비눗방울 원형 파동 */}
      {isBubble && (
        <>
          <Animated.View
            style={{
              position: "absolute",
              width: 30,
              height: 30,
              left: -15,
              top: -15,
              borderRadius: 15,
              borderWidth: 2.5,
              borderColor: color,
              opacity: ringOpacity,
              transform: [{ scale: ringScale }],
            }}
          />

          <Animated.View
            style={{
              position: "absolute",
              width: 20,
              height: 20,
              left: -10,
              top: -10,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: "#FFFFFF",
              opacity: ringOpacity,
              transform: [{ scale: secondRingScale }],
            }}
          />
        </>
      )}

      {/* 사방으로 튀는 물방울 / 물감 조각 */}
      {PARTICLES.map((particle, index) => {
        const distance = isBubble ? 65 : 78;

        const translateX = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, particle.x * distance],
        });

        const translateY = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, particle.y * distance],
        });

        const particleColor = isBubble
          ? index % 2 === 0
            ? "#FFFFFF"
            : color
          : color;

        return (
          <Animated.View
            key={index}
            style={{
              position: "absolute",
              width: particle.size,
              height: isBubble ? particle.size : particle.size * 1.25,
              left: -particle.size / 2,
              top: -particle.size / 2,
              borderRadius: isBubble ? particle.size / 2 : 999,
              backgroundColor: particleColor,
              opacity: particleOpacity,
              transform: [
                { translateX },
                { translateY },
                { scale: particleScale },
                {
                  rotate: `${index * 45}deg`,
                },
              ],
            }}
          />
        );
      })}
    </View>
  );
}
