import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

interface HandPointerProps {
  size?: number;
  skinColor?: string;
  tapping?: boolean; // ⭐ 톡톡 누르는 애니메이션 on/off
}

export default function HandPointer({
  size = 60,
  skinColor = "#FFD9A8", // 살구빛 살색 (기본값)
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
    outputRange: [1, 0.88], // ⭐ 살짝 눌리는 느낌
  });

  const translateY = press.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 4],
  });

  return (
    <Animated.View style={{ transform: [{ scale }, { translateY }] }}>
      <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <Defs>
          <LinearGradient id="handGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
            <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </LinearGradient>
        </Defs>

        {/* ============================
            손 전체 실루엣
            검지만 펴고 나머지 손가락은 주먹 쥔 형태
        ============================ */}
        <Path
          d="
            M45 20
            C45 14.5 49.5 10 55 10
            C60.5 10 65 14.5 65 20
            L65 45
            L68 45
            C74 45 79 50 79 56
            L79 72
            C79 84 69 94 57 94
            L45 94
            C35 94 27 86 27 76
            L27 58
            C27 54.5 29.5 51 33 51
            C36.5 51 39 54.5 39 58
            L39 62
            L39 30
            C39 26.5 41.5 23 45 23
            Z
          "
          fill={skinColor}
          stroke="#E8A968"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* ============================
            검지 손가락 관절선 (디테일)
        ============================ */}
        <Path
          d="M45 30 L45 45"
          stroke="#E8A968"
          strokeWidth="2"
          strokeLinecap="round"
          opacity={0.5}
        />
        <Path
          d="M55 20 L55 45"
          stroke="#E8A968"
          strokeWidth="2"
          strokeLinecap="round"
          opacity={0.5}
        />

        {/* ============================
            엄지 (옆으로 살짝 나온 형태)
        ============================ */}
        <Path
          d="
            M27 62
            C21 60 16 63 16 69
            C16 75 21 78 27 76
          "
          fill={skinColor}
          stroke="#E8A968"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* ============================
            광택 하이라이트 (검지 위쪽)
        ============================ */}
        <Path
          d="M48 16 C48 14 50 12.5 52 12.5"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
          opacity={0.8}
        />

        {/* 전체적인 부드러운 광택 오버레이 */}
        <Path
          d="
            M45 20
            C45 14.5 49.5 10 55 10
            C60.5 10 65 14.5 65 20
            L65 45
            L68 45
            C74 45 79 50 79 56
            L79 72
            C79 84 69 94 57 94
            L45 94
            C35 94 27 86 27 76
            L27 58
            C27 54.5 29.5 51 33 51
            C36.5 51 39 54.5 39 58
            L39 62
            L39 30
            C39 26.5 41.5 23 45 23
            Z
          "
          fill="url(#handGradient)"
        />
      </Svg>
    </Animated.View>
  );
}
