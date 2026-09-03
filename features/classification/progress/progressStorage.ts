import AsyncStorage from "@react-native-async-storage/async-storage";
import { GameProgress } from "./gameProgress";

// ==================================================
// Storage Key
// ==================================================

const PROGRESS_STORAGE_KEY = "@classification_game_progress";
// gameType에 따라 동적으로 키를 생성
const getStorageKey = (gameType: "color" | "shape") => {
  return `@classification_game_progress_${gameType}`;
};

// ==================================================
// Progress 저장
// ==================================================

export async function saveGameProgress(
  gameType: "color" | "shape",
  progress: GameProgress,
) {
  try {
    const key = getStorageKey(gameType);
    await AsyncStorage.setItem(key, JSON.stringify(progress));
  } catch (error) {
    console.error("게임 진행 상황 저장 실패", error);
  }
}

// ==================================================
// Progress 불러오기
// ==================================================

export async function loadGameProgress(
  gameType: "color" | "shape",
): Promise<GameProgress | null> {
  try {
    const key = getStorageKey(gameType);
    const savedProgress = await AsyncStorage.getItem(key);

    if (!savedProgress) {
      return null;
    }

    return JSON.parse(savedProgress);
  } catch (error) {
    console.error("게임 진행 상황 불러오기 실패", error);

    return null;
  }
}

// ==================================================
// Progress 삭제
// ==================================================

export async function clearGameProgress(gameType: "color" | "shape") {
  try {
    const key = getStorageKey(gameType);
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("게임 진행 상황 삭제 실패", error);
  }
}
