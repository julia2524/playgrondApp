import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import Svg, { Path, G, Defs, ClipPath, Use } from "react-native-svg";

interface HandPointerProps {
  size?: number;
  skinColor?: string;
  tapping?: boolean;
}

export default function HandPointer({
  size = 60,
  skinColor = "#FFD9A8",
  tapping = true,
}: HandPointerProps) {
  const press = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!tapping) return;

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(press, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(press, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(500),
      ]),
    );

    loop.start();
    return () => loop.stop();
  }, [tapping]);

  const scale = press.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.88],
  });

  const translateY = press.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 4],
  });

  // 피부색 기반 음영 색상 자동 생성
  const shadowColor = adjustColor(skinColor, -25);
  const darkShadow = adjustColor(skinColor, -55);

  return (
    <Animated.View style={{ transform: [{ scale }, { translateY }] }}>
      <Svg width={size} height={size} viewBox="0 0 128 128">
        {/* 메인 손 실루엣 */}
        <Path
          d="M42.8 71c0.1-10.8 0.4-53.3 0.4-54.9c0.3-12.8 16.8-12.7 17-0.7c0 1.5 1.1 25 1.3 32.2c2-5.2 11.9-7.5 14.9 3.1c2.6-5 12.9-6.4 14.7 4.2c2.5-3.8 10.9-4.3 14.2 6c2.7 8.4 2 28.2-2.3 40.3c-3.3 9.1-5.8 8.4-5.6 16.7c0 1.4-1.1 2.1-2.4 2.4c-5.9 1.3-26.3 1.9-33.8 0.3c-1.6-0.4-1.8-1.7-1.9-2.2c-0.4-2.1-2.5-4.2-4.3-5c-6.4-3.2-12.8-12.8-18.2-23.4C34 84.5 28 80.8 18.5 79.6c-6.3-0.8-7.7-8.6-2.5-11.8c3.6-2.2 7-2.9 10.4-2.9C32.5 64.7 36.4 66.6 42.8 71z"
          fill={skinColor}
        />

        {/* 중간 톤 음영 */}
        {/* <Path
          d="M61.2 56.4c1.6-0.1 2.9-2.8 6.4-2.8c3.7 0 4.7 3 7.5 3.1c2.7 0.1 3.8-2 7.7-1.5c4.5 0.6 4 4.1 7.1 4.2c2.7 0 3.2-1.8 6.6-1.8c3.1 0 5.8 3 7 5.5c1.2 2.5 3.4 1.2 3.4 0s-1.3-11.9-8.2-14.5c-8-3-29.6-11-36.9-8.8c-1 7.1-1.6 11.5-1.8 13.7C59.9 54.2 59.4 56.5 61.2 56.4z"
          fill={shadowColor}
        />
        <Path
          d="M42.4 69.6c0.9 0 1.5-0.1 1.5-1c0-1 2.1-43.6 2.3-51.6c0.2-9.2 7.6-8.7 10.1-5.9c1.7 1.9 4-0.6 2.6-2.2s-3.4-4.4-8.4-4.3S41.9 9 41.6 13C41.3 16.8 42.4 69.6 42.4 69.6z"
          fill={shadowColor}
        />
        <Path
          d="M63.4 121.5c0-15.9-11.7-14.1-18.9-25.2C34.4 81 33.4 80.1 19.3 76.7c-4.9-1.2-4.4-5.7-2.1-7.7s-1.3-4.9-2.7-3.6s-7.7 7.8-1.1 14.8s46.2 42 46.2 42L63.4 121.5z"
          fill={shadowColor}
        /> */}

        {/* 진한 음영 (손가락 사이 + 엄지 쪽) */}
        {/* <Path
          d="M42.8 71c0 0.6 0 1.5 0 1.9s-0.4 0.8-1.3 0.2c-0.9-0.6-8-5.8-15-5.8c-3.2 0-7.7 0.5-12.4 3.4c-0.9 0.6-1.4-0.2-1-0.9c0.5-0.7 3.2-6.4 13.4-6.5C36.8 63.3 42.8 71 42.8 71z"
          fill={darkShadow}
        />
        <Path
          d="M51.6 5.9c0 0.5-0.2 1.1 1 1.7c1.5 0.7 4.4 3.1 4.7 8.4s2.5 38.1 2.5 38.9c0 1.1 1.9 1.2 1.8-0.1c-0.1-1.7-0.2-7.2-0.2-7.2s1.8-30.9-0.6-36.9S51.6 5.9 51.6 5.9z"
          fill={darkShadow}
        />
        <Path
          d="M70.2 43.1c-0.1 0.3-0.1 0.7 0.3 1c2 1.5 3.5 4.6 3.3 10.6c0 1.4 2.7 1.6 2.7-0.1c0-0.7-0.1-4-0.1-4L76.2 44L70.2 43.1z"
          fill={darkShadow}
        />
        <Path
          d="M85.3 46.7c-0.1 0.3-0.1 0.7 0.4 1.1c2 1.5 2.8 3.5 3 9.7c0.1 1.5 2.6 1.4 2.6-0.2c0-1.1-0.1-2.4-0.1-2.4l-0.6-7L85.3 46.7z"
          fill={darkShadow}
        />
        <Path
          d="M98 52.1c-0.1 0.3-0.2 0.8 0.4 1.2c1.1 0.8 3 2.9 4.4 7.5c1.1 3.7 1.9 21.3-0.7 32.5c-0.5 2.3-3 9.9-5.3 13.6s-1.6 7.3-1.4 8.3c0.1 1 0.7 6.3 0.7 6.3l3.7-2.5l8.6-27l-0.6-38.5L98 52.1z"
          fill={darkShadow}
        /> */}
      </Svg>
    </Animated.View>
  );
}

// 간단한 색상 어둡게 만드는 유틸
function adjustColor(hex: string, amount: number): string {
  const clamp = (n: number) => Math.max(0, Math.min(255, n));
  const num = parseInt(hex.replace("#", ""), 16);
  const r = clamp((num >> 16) + amount);
  const g = clamp(((num >> 8) & 0x00ff) + amount);
  const b = clamp((num & 0x0000ff) + amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
