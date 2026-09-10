// utils/stickerStorage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const UNLOCKED_STICKERS_KEY = "@unlocked_stickers";

// 1. 해금된 스티커 목록 가져오기
export const getUnlockedStickers = async (): Promise<string[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(UNLOCKED_STICKERS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("스티커 데이터 불러오기 실패", e);
    return [];
  }
};

// 2. 새 스티커 획득하기 (게임 클리어 시 호출)
export const unlockSticker = async (stickerId: string): Promise<boolean> => {
  try {
    const currentList = await getUnlockedStickers();
    if (!currentList.includes(stickerId)) {
      const newList = [...currentList, stickerId];
      await AsyncStorage.setItem(
        UNLOCKED_STICKERS_KEY,
        JSON.stringify(newList),
      );
      return true; // 새로 해금됨 (축하 팝업용)
    }
    return false; // 이미 있던 스티커
  } catch (e) {
    console.error("스티커 저장 실패", e);
    return false;
  }
};
