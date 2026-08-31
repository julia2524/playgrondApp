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
            손 전체 실루엣 (정상적인 5손가락 형태)
        ============================ */}
        <Path
          d="
            M45 22
            C45 15.5 50 11 56 11
            C62 11 67 15.5 67 22
            L67 52
            C73 52 78 57 78 63
            L78 75
            C78 85 68 93 56 93
            L44 93
            C34 93 26 85 26 75
            L26 62
            C26 57.5 29.5 54 34 54
            C38.5 54 42 57.5 42 62
            L42 66
            L42 22
            Z
          "
          fill={skinColor}
          stroke="#E8A968"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* ============================
            엄지 (옆으로 뻗은 형태)
        ============================ */}
        <Path
          d="
            M26 64
            C20 62 15 65 15 71
            C15 77 20 80 26 78
          "
          fill={skinColor}
          stroke="#E8A968"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* ============================
            검지 손가락 관절선
        ============================ */}
        <Path
          d="M56 22 L56 52"
          stroke="#E8A968"
          strokeWidth="2"
          strokeLinecap="round"
          opacity={0.5}
        />

        {/* ============================
            광택 하이라이트 (검지 위쪽)
        ============================ */}
        <Path
          d="M51 17 C51 15 53 13.5 55 13.5"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
          opacity={0.8}
        />

        {/* 전체적인 부드러운 광택 오버레이 */}
        <Path
          d="
            M45 22
            C45 15.5 50 11 56 11
            C62 11 67 15.5 67 22
            L67 52
            C73 52 78 57 78 63
            L78 75
            C78 85 68 93 56 93
            L44 93
            C34 93 26 85 26 75
            L26 62
            C26 57.5 29.5 54 34 54
            C38.5 54 42 57.5 42 62
            L42 66
            L42 22
            Z
          "
          fill="url(#handGradient)"
        />
      </Svg>
    </Animated.View>
  );
}
