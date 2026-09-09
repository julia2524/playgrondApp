import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ProgressRainbow from "../../components/stageMap/ProgressRainbow"; // 경로에 맞게 수정

export default function RainbowTestScreen() {
  const [progress, setProgress] = useState<number>(0);

  return (
    <View style={styles.container}>
      {/* 무지개 컴포넌트 출력 */}
      <ProgressRainbow progress={progress} size={200} />
      <Text style={styles.text}>현재 Progress: {progress} / 10</Text>

      {/* 테스트용 조작 버튼들 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setProgress(Math.max(0, progress - 1))}
        >
          <Text style={styles.buttonText}>-1</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setProgress(Math.min(10, progress + 1))}
        >
          <Text style={styles.buttonText}>+1</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, { marginTop: 10, width: 120 }]}
        onPress={() => setProgress(10)}
      >
        <Text style={styles.buttonText}>전부 채우기 (10)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFC",
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  button: {
    backgroundColor: "#42A5F5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
