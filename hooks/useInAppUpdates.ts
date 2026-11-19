import { useCallback, useEffect, useRef, useState } from "react";

import { AppState, Platform } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import * as InAppUpdates from "expo-in-app-updates";

const DISMISSED_VERSION_KEY = "@baby_playground/dismissed_update_version";

interface UseInAppUpdatesReturn {
  isUpdateModalVisible: boolean;
  isUpdating: boolean;
  onUpdate: () => Promise<void>;
  onLater: () => Promise<void>;
}

export function useInAppUpdates(enabled: boolean): UseInAppUpdatesReturn {
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);

  const availableVersionRef = useRef<string | null>(null);

  const isCheckingRef = useRef(false);

  const checkForUpdates = useCallback(async () => {
    if (
      !enabled ||
      __DEV__ ||
      Platform.OS !== "android" ||
      isCheckingRef.current
    ) {
      return;
    }

    isCheckingRef.current = true;

    try {
      const result = await InAppUpdates.checkForUpdate();

      if (!result.updateAvailable || !result.storeVersion) {
        return;
      }

      const storeVersion = String(result.storeVersion);

      const dismissedVersion = await AsyncStorage.getItem(
        DISMISSED_VERSION_KEY,
      );

      if (dismissedVersion === storeVersion) {
        return;
      }

      availableVersionRef.current = storeVersion;

      setIsUpdateModalVisible(true);
    } catch (error) {
      console.warn("[Baby Playground] 업데이트 확인 실패:", error);
    } finally {
      isCheckingRef.current = false;
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    checkForUpdates();

    const subscription = AppState.addEventListener("change", (nextState) => {
      if (nextState === "active") {
        checkForUpdates();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [enabled, checkForUpdates]);

  const onUpdate = useCallback(async () => {
    if (isUpdating) return;

    setIsUpdating(true);

    try {
      const started = await InAppUpdates.startUpdate();

      if (started) {
        setIsUpdateModalVisible(false);
      }
    } catch (error) {
      console.warn("[Baby Playground] 업데이트 시작 실패:", error);
    } finally {
      setIsUpdating(false);
    }
  }, [isUpdating]);

  const onLater = useCallback(async () => {
    if (isUpdating) return;

    const version = availableVersionRef.current;

    try {
      if (version) {
        await AsyncStorage.setItem(DISMISSED_VERSION_KEY, version);
      }
    } catch (error) {
      console.warn("[Baby Playground] 업데이트 설정 저장 실패:", error);
    }

    setIsUpdateModalVisible(false);
  }, [isUpdating]);

  return {
    isUpdateModalVisible,
    isUpdating,
    onUpdate,
    onLater,
  };
}
