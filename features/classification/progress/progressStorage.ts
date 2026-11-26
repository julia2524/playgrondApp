import AsyncStorage from "@react-native-async-storage/async-storage";
import type { GameProgress } from "./gameProgress";

export type GameType = "color" | "shape" | "category";

const getStorageKey = (gameType: GameType) =>
  `@classification_game_progress_${gameType}`;

// 메모리 캐시: 저장된 값이 null인 경우도 구분해야 하므로 Map 사용
const progressCache = new Map<GameType, GameProgress | null>();

// 중복 AsyncStorage 요청 방지
const pendingLoads = new Map<
  GameType,
  { version: number; promise: Promise<GameProgress | null> }
>();

// 저장/삭제 중 오래된 로딩 결과가 캐시를 덮지 않도록 버전 관리
const cacheVersions = new Map<GameType, number>();

const getVersion = (gameType: GameType) => cacheVersions.get(gameType) ?? 0;

const increaseVersion = (gameType: GameType) => {
  cacheVersions.set(gameType, getVersion(gameType) + 1);
};

export function hasCachedGameProgress(gameType: GameType): boolean {
  return progressCache.has(gameType);
}

export function getCachedGameProgress(gameType: GameType): GameProgress | null {
  return progressCache.get(gameType) ?? null;
}

// 분류 놀이터에서 미리 호출할 사전 로딩 함수
export function preloadGameProgress(
  gameType: GameType,
): Promise<GameProgress | null> {
  return loadGameProgress(gameType);
}

// ==================================================
// Progress 저장
// ==================================================

export async function saveGameProgress(
  gameType: GameType,
  progress: GameProgress,
): Promise<void> {
  // 저장 중 오래된 비동기 로딩 결과가 캐시를 덮지 않도록 먼저 갱신
  increaseVersion(gameType);
  progressCache.set(gameType, progress);

  try {
    await AsyncStorage.setItem(
      getStorageKey(gameType),
      JSON.stringify(progress),
    );
  } catch (error) {
    console.error("게임 진행 상황 저장 실패", error);
  }
}

// ==================================================
// Progress 불러오기
// ==================================================

export async function loadGameProgress(
  gameType: GameType,
): Promise<GameProgress | null> {
  // 캐시에 값이 있으면 AsyncStorage를 다시 읽지 않음
  if (progressCache.has(gameType)) {
    return progressCache.get(gameType) ?? null;
  }

  const version = getVersion(gameType);
  const pending = pendingLoads.get(gameType);

  // 같은 버전의 로딩이 이미 진행 중이면 기존 요청 재사용
  if (pending?.version === version) {
    return pending.promise;
  }

  const promise = (async () => {
    let progress: GameProgress | null = null;

    try {
      const savedProgress = await AsyncStorage.getItem(getStorageKey(gameType));

      progress = savedProgress
        ? (JSON.parse(savedProgress) as GameProgress)
        : null;
    } catch (error) {
      console.error("게임 진행 상황 불러오기 실패", error);
    }

    // 로딩 중 저장/삭제가 발생하지 않았을 때만 캐시에 반영
    if (getVersion(gameType) === version) {
      progressCache.set(gameType, progress);
    }

    return getVersion(gameType) === version
      ? (progressCache.get(gameType) ?? null)
      : progress;
  })().finally(() => {
    if (pendingLoads.get(gameType)?.promise === promise) {
      pendingLoads.delete(gameType);
    }
  });

  pendingLoads.set(gameType, { version, promise });

  return promise;
}

// ==================================================
// Progress 삭제
// ==================================================

export async function clearGameProgress(gameType: GameType): Promise<void> {
  increaseVersion(gameType);
  progressCache.delete(gameType);
  pendingLoads.delete(gameType);

  try {
    await AsyncStorage.removeItem(getStorageKey(gameType));
  } catch (error) {
    console.error("게임 진행 상황 삭제 실패", error);
  }
}
