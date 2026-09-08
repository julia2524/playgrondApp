import React, { createContext, useContext, useEffect, useState } from "react";
import { useAudioPlayer } from "expo-audio";
import { getBGMEnabled, setBGMEnabled } from "./audioSettingsStorage";

const BGM_LIST = [
  require("../../assets/sounds/bgm_1.mp3"),
  require("../../assets/sounds/bgm_2.mp3"),
  require("../../assets/sounds/bgm_3.mp3"),
];

interface BackgroundMusicContextType {
  backgroundMusic: boolean;
  setBackgroundMusic: (enabled: boolean) => Promise<void>;
  changeTrack: (index: number) => void;
}

const BackgroundMusicContext = createContext<BackgroundMusicContextType | null>(
  null,
);

export function BackgroundMusicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const player = useAudioPlayer(BGM_LIST[0]);

  const [backgroundMusic, setBackgroundMusicState] = useState(true);

  // 앱 시작할 때 저장된 BGM 설정 불러오기
  useEffect(() => {
    const loadSetting = async () => {
      const enabled = await getBGMEnabled();

      setBackgroundMusicState(enabled);

      if (enabled) {
        player.loop = true;
        player.volume = 0.4;
        player.play();
      }
    };

    loadSetting();

    return () => {
      player.pause();
    };
  }, [player]);

  // ⭐ SettingScreen에서 호출하는 함수
  const setBackgroundMusic = async (enabled: boolean) => {
    // 상태 저장
    setBackgroundMusicState(enabled);

    // AsyncStorage 저장
    await setBGMEnabled(enabled);

    // ⭐ 바로 재생 / 정지
    if (enabled) {
      player.loop = true;
      player.volume = 0.4;
      player.play();
    } else {
      player.pause();
    }
  };

  const changeTrack = (index: number) => {
    if (!BGM_LIST[index]) return;

    player.replace(BGM_LIST[index]);
    player.loop = true;
    player.volume = 0.4;

    if (backgroundMusic) {
      player.play();
    }
  };

  return (
    <BackgroundMusicContext.Provider
      value={{
        backgroundMusic,
        setBackgroundMusic,
        changeTrack,
      }}
    >
      {children}
    </BackgroundMusicContext.Provider>
  );
}

export function useBackgroundMusic() {
  const context = useContext(BackgroundMusicContext);

  if (!context) {
    throw new Error(
      "useBackgroundMusic must be used inside BackgroundMusicProvider",
    );
  }

  return context;
}
