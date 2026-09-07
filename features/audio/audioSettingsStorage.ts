import AsyncStorage from "@react-native-async-storage/async-storage";

const SOUND_ENABLED_KEY = "@classification_sound_enabled";

export async function getSoundEnabled(): Promise<boolean> {
  const value = await AsyncStorage.getItem(SOUND_ENABLED_KEY);

  // 저장된 값이 없으면 기본값 ON
  if (value === null) {
    return true;
  }

  return value === "true";
}

export async function setSoundEnabled(enabled: boolean): Promise<void> {
  await AsyncStorage.setItem(SOUND_ENABLED_KEY, String(enabled));
}
