// utils/stickerStorage.ts
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const UNLOCKED_STICKERS_KEY = "@unlocked_stickers";

// // 1. 해금된 스티커 목록 가져오기
// export const getUnlockedStickers = async (): Promise<string[]> => {
//   try {
//     const jsonValue = await AsyncStorage.getItem(UNLOCKED_STICKERS_KEY);
//     return jsonValue != null ? JSON.parse(jsonValue) : [];
//   } catch (e) {
//     console.error("스티커 데이터 불러오기 실패", e);
//     return [];
//   }
// };

// // 2. 새 스티커 획득하기 (게임 클리어 시 호출)
// export const unlockSticker = async (stickerId: string): Promise<boolean> => {
//   try {
//     const currentList = await getUnlockedStickers();
//     if (!currentList.includes(stickerId)) {
//       const newList = [...currentList, stickerId];
//       await AsyncStorage.setItem(
//         UNLOCKED_STICKERS_KEY,
//         JSON.stringify(newList),
//       );
//       return true; // 새로 해금됨 (축하 팝업용)
//     }
//     return false; // 이미 있던 스티커
//   } catch (e) {
//     console.error("스티커 저장 실패", e);
//     return false;
//   }
// };

import AsyncStorage from "@react-native-async-storage/async-storage";

export type GameType = "color" | "shape" | "category";

// 게임 타입별 AsyncStorage Key 생성
const getStickerKey = (gameType: GameType) => `@unlocked_stickers_${gameType}`;

/**
 * 1. 특정 게임 모드의 해금된 스티커 목록 가져오기
 */
export const getUnlockedStickers = async (
  gameType: GameType,
): Promise<string[]> => {
  try {
    const key = getStickerKey(gameType);
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error(`[${gameType}] 스티커 데이터 불러오기 실패`, e);
    return [];
  }
};

/**
 * 2. 특정 게임 모드의 새 스티커 획득하기
 */
export const unlockSticker = async (
  gameType: GameType,
  stickerId: string,
): Promise<boolean> => {
  try {
    const currentList = await getUnlockedStickers(gameType);
    if (!currentList.includes(stickerId)) {
      const newList = [...currentList, stickerId];
      const key = getStickerKey(gameType);
      await AsyncStorage.setItem(key, JSON.stringify(newList));
      return true; // 새로 해금됨
    }
    return false; // 이미 보유 중
  } catch (e) {
    console.error(`[${gameType}] 스티커 저장 실패`, e);
    return false;
  }
};

/**
 * 3. [추가] 모든 게임 모드의 스티커 현황 한 번에 가져오기 (통합 스티커북용)
 */
export const getAllUnlockedStickers = async (): Promise<
  Record<GameType, string[]>
> => {
  try {
    const [color, shape, category] = await Promise.all([
      getUnlockedStickers("color"),
      getUnlockedStickers("shape"),
      getUnlockedStickers("category"),
    ]);

    return { color, shape, category };
  } catch (e) {
    console.error("전체 스티커 데이터 불러오기 실패", e);
    return { color: [], shape: [], category: [] };
  }
};
