import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import Svg, {
  Circle,
  Defs,
  RadialGradient,
  LinearGradient,
  Stop,
} from "react-native-svg";

interface CloudLevelBadgeProps {
  size?: number;
  floating?: boolean;
}

export default function CloudLevelBadge({
  size = 120,
  floating = true,
}: CloudLevelBadgeProps) {
  const bob = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!floating) return;

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bob, {
          toValue: 1,
          duration: 1600,
          useNativeDriver: true,
        }),
        Animated.timing(bob, {
          toValue: 0,
          duration: 1600,
          useNativeDriver: true,
        }),
      ]),
    );

    loop.start();

    return () => loop.stop();
  }, [floating, bob]);

  const translateY = bob.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -5],
  });

  return (
    <Animated.View
      style={{
        transform: [{ translateY }],
      }}
    >
      <Svg width={size} height={size * 0.46} viewBox="0 0 280 120">
        <Defs>
          {/* ☁️ 구름 본체 */}
          <LinearGradient id="cloudBody" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#FFFFFF" />
            <Stop offset="65%" stopColor="#F4FAFF" />
            <Stop offset="100%" stopColor="#E6F2FF" />
          </LinearGradient>

          {/* ✨ 살짝 부드러운 광택 */}
          <RadialGradient id="glossHighlight" cx="30%" cy="20%" r="60%">
            <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {/* ==================================================
            ☁️ 메인 구름
            좌우를 일부러 비대칭으로 구성
            + 기존보다 살짝 통통하게
        ================================================== */}

        {/* 왼쪽 낮은 몽글 */}
        <Circle cx="48" cy="70" r="27" fill="url(#cloudBody)" />

        {/* 왼쪽 큰 봉우리 */}
        <Circle cx="82" cy="51" r="34" fill="url(#cloudBody)" />

        {/* 왼쪽과 중앙 사이 작은 몽글 */}
        <Circle cx="112" cy="65" r="25" fill="url(#cloudBody)" />

        {/* ⭐ 중앙 가장 큰 봉우리 */}
        <Circle cx="148" cy="47" r="38" fill="url(#cloudBody)" />

        {/* 중앙 오른쪽 몽글 */}
        <Circle cx="181" cy="61" r="27" fill="url(#cloudBody)" />

        {/* 오른쪽 봉우리 */}
        <Circle cx="207" cy="48" r="30" fill="url(#cloudBody)" />

        {/* 오른쪽 끝은 조금 낮고 작게 */}
        <Circle cx="235" cy="69" r="23" fill="url(#cloudBody)" />

        {/* ==================================================
            ☁️ 아래쪽을 조금 더 통통하게 연결
        ================================================== */}

        <Circle cx="70" cy="76" r="25" fill="url(#cloudBody)" />

        <Circle cx="105" cy="78" r="27" fill="url(#cloudBody)" />

        <Circle cx="145" cy="80" r="30" fill="url(#cloudBody)" />

        <Circle cx="184" cy="78" r="27" fill="url(#cloudBody)" />

        <Circle cx="218" cy="76" r="24" fill="url(#cloudBody)" />
      </Svg>
    </Animated.View>
  );
}
