import React, { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { TracingCanvas } from "./TracingCanvas";
import type { TracingBoardSize, TracingGuide } from "../types/tracing.types";

const createThreeCirclesGuide = (size: TracingBoardSize): TracingGuide => {
  const radius = Math.min(size.width * 0.105, size.height * 0.16, 44);

  const centerY = size.height / 2;

  const centers = [size.width * 0.18, size.width * 0.5, size.width * 0.82];

  const paths = centers.map((centerX) => {
    const points = Array.from({ length: 49 }, (_, index) => {
      const angle = (index / 48) * Math.PI * 2;

      return {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
      };
    });

    return points;
  });

  return {
    id: "three-circles-test",
    points: [],
    paths,
    tolerance: Math.min(size.width * 0.045, 15),
    completionThreshold: 1,
    ordered: true,
  };
};

const ThreeCirclesTestScreen: React.FC = () => {
  const [resetKey, setResetKey] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [failedCount, setFailedCount] = useState(0);
  const [progressLabel, setProgressLabel] = useState(
    "동그라미 세 개를 하나씩 그려 봐요!",
  );

  const createGuide = useCallback(
    (size: TracingBoardSize) => createThreeCirclesGuide(size),
    [],
  );

  const handleComplete = useCallback(() => {
    setIsCompleted(true);
    setProgressLabel("동그라미 세 개 완성! 🎉");
  }, []);

  const handleFailedAttempt = useCallback(() => {
    setFailedCount((count) => count + 1);
  }, []);

  const handleReset = useCallback(() => {
    setResetKey((key) => key + 1);
    setIsCompleted(false);
    setFailedCount(0);
    setProgressLabel("동그라미 세 개를 하나씩 그려 봐요!");
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>동그라미 세 개</Text>

        <Text style={styles.mission}>
          동그라미를 하나씩 차례대로 그려 봐요!
        </Text>

        <Text style={styles.progress}>{progressLabel}</Text>
      </View>

      <TracingCanvas
        createGuide={createGuide}
        resetKey={resetKey}
        guideColor="#CDEFE8"
        strokeColor="#55BFA9"
        strokeWidth={10}
        tutorialEnabled={false}
        showPanda={false}
        onComplete={handleComplete}
        onFailedAttempt={handleFailedAttempt}
        onProgressLabelChange={setProgressLabel}
      />

      <View style={styles.footer}>
        <Text style={styles.status}>
          {isCompleted
            ? "세 개의 경로를 모두 완성했어요!"
            : `실패 판정 횟수: ${failedCount}`}
        </Text>

        <Pressable style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>다시 그리기</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F1",
  },
  header: {
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 16,
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#51436B",
  },
  mission: {
    fontSize: 15,
    fontWeight: "600",
    color: "#8A7B9D",
  },
  progress: {
    fontSize: 14,
    fontWeight: "700",
    color: "#55A995",
  },
  footer: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 12,
  },
  status: {
    fontSize: 14,
    fontWeight: "700",
    color: "#51436B",
  },
  resetButton: {
    backgroundColor: "#8D78C8",
    paddingHorizontal: 28,
    paddingVertical: 13,
    borderRadius: 18,
  },
  resetButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
});

export default ThreeCirclesTestScreen;
