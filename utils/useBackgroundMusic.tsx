import { useEffect } from "react";
import { useAudioPlayer } from "expo-audio";

const BGM_LIST = [
  require("../assets/sounds/bgm_1.mp3"),
  require("../assets/sounds/bgm_2.mp3"),
  require("../assets/sounds/bgm_3.mp3"),
];

export function useBackgroundMusic() {
  // 기본 첫 번째 곡으로 플레이어 생성
  const player = useAudioPlayer(BGM_LIST[0]);

  useEffect(() => {
    if (player) {
      player.loop = true;
      player.volume = 0.4;
      player.play();
    }

    return () => {
      player?.pause();
    };
  }, [player]);

  // 만약 특정 곡으로 바꾸고 싶을 때 쓸 수 있는 함수
  const changeTrack = (index: number) => {
    if (player && BGM_LIST[index]) {
      player.replace(BGM_LIST[index]);
      player.play();
    }
  };

  return { player, changeTrack };
}
