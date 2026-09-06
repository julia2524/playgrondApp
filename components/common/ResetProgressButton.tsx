import React from "react";
import { TouchableOpacity, Text, Alert, StyleSheet } from "react-native";
import { clearGameProgress } from "../../features/classification/progress/progressStorage";

interface ResetButtonProps {
  gameType: "color" | "shape";
  onResetComplete: () => void; // 초기화 후 화면 상태를 갱신할 콜백 함수
}

export default function ResetProgressButton({
  gameType,
  onResetComplete,
}: ResetButtonProps) {
  const handleResetPress = () => {
    // 사용자 실수 방지를 위한 확인 팝업 (선택사항)
    Alert.alert("진행 상황 초기화", "정말 처음부터 다시 시작하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "초기화",
        style: "destructive",
        onPress: async () => {
          // 1. AsyncStorage에 저장된 해당 gameType의 데이터 삭제
          await clearGameProgress(gameType);

          // 2. 부모 컴포넌트의 스테이지/상태값도 기본값으로 리셋
          onResetComplete();

          Alert.alert("완료", "게임 기록이 초기화되었습니다.");
        },
      },
    ]);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleResetPress}>
      <Text
        style={styles.buttonText}
      >{`${gameType}처음부터 다시 시작하기`}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FF5B5B",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
