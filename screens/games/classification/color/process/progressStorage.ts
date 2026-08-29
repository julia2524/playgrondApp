import AsyncStorage from "@react-native-async-storage/async-storage";
import { GameProgress } from "./gameProgress";

// ==================================================
// Storage Key
// ==================================================

const PROGRESS_STORAGE_KEY = "@classification_game_progress";

// ==================================================
// Progress 저장
// ==================================================

export async function saveGameProgress(progress: GameProgress) {
  try {
    await AsyncStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error("게임 진행 상황 저장 실패", error);
  }
}

// ==================================================
// Progress 불러오기
// ==================================================

export async function loadGameProgress(): Promise<GameProgress | null> {
  try {
    const savedProgress = await AsyncStorage.getItem(PROGRESS_STORAGE_KEY);

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

export async function clearGameProgress() {
  try {
    await AsyncStorage.removeItem(PROGRESS_STORAGE_KEY);
  } catch (error) {
    console.error("게임 진행 상황 삭제 실패", error);
  }
}
