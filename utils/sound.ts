// utils/sound.ts
import { createAudioPlayer, AudioPlayer } from "expo-audio";

const players: Record<string, AudioPlayer | null> = {
  grab: null,
  correct: null,
  wrong: null,
  correct_sound: null, // 👈 정답 음성 추가
  wrong_sound: null, // 👈 오답 음성 추가
};

// 앱 시작할 때 한 번 호출 (App.tsx 또는 게임 화면 useEffect)
export async function preloadSounds() {
  try {
    players.grab = createAudioPlayer(require("../assets/sounds/grab.wav"));
    players.correct = createAudioPlayer(
      require("../assets/sounds/correct.mp3"),
    );
    players.wrong = createAudioPlayer(require("../assets/sounds/wrong.mp3"));
    // 👈 녹음한 음성 파일들도 미리 로드 (파일명은 실제 파일명에 맞춰줘!)
    players.correct_sound = createAudioPlayer(
      require("../assets/sounds/correct_sound.wav"),
    );
    players.wrong_sound = createAudioPlayer(
      require("../assets/sounds/wrong_sound.wav"),
    );
  } catch (e) {
    console.log("사운드 프리로드 실패:", e);
  }
}

export async function playSound(
  soundType: "grab" | "correct" | "wrong" | "correct_sound" | "wrong_sound",
) {
  try {
    const player = players[soundType];
    if (!player) {
      console.log("플레이어가 아직 준비 안 됨:", soundType);
      return;
    }

    // 이미 재생 중이면 처음부터 다시
    player.seekTo(0);
    player.play();
  } catch (error) {
    console.log("오디오 재생 실패:", error);
  }
}
