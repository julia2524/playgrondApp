import { createAudioPlayer, AudioPlayer } from "expo-audio";

const players = {
  grab: [] as AudioPlayer[],
  correct: [] as AudioPlayer[],
  wrong: [] as AudioPlayer[],
  correct_sound: [] as AudioPlayer[],
  wrong_sound: [] as AudioPlayer[],
  notes: [] as AudioPlayer[], // ⭐ 음계용
};
// ⭐ 마지막으로 성공한 음계 인덱스를 기억
let lastSuccessNoteIndex = 0; // 0 = 도

export async function preloadSounds() {
  try {
    players.grab = [createAudioPlayer(require("../assets/sounds/grab.wav"))];

    players.correct = [
      createAudioPlayer(require("../assets/sounds/correct_1.mp3")),
      createAudioPlayer(require("../assets/sounds/correct_2.mp3")),
      createAudioPlayer(require("../assets/sounds/correct_3.mp3")),
      createAudioPlayer(require("../assets/sounds/correct_4.mp3")),
    ];

    players.wrong = [
      createAudioPlayer(require("../assets/sounds/wrong_1.mp3")),
      createAudioPlayer(require("../assets/sounds/wrong_2.mp3")),
      createAudioPlayer(require("../assets/sounds/wrong_3.mp3")),
      createAudioPlayer(require("../assets/sounds/wrong_4.mp3")),
    ];

    players.correct_sound = [
      createAudioPlayer(require("../assets/sounds/correct_sound_1.wav")),
      createAudioPlayer(require("../assets/sounds/correct_sound_2.wav")),
    ];

    players.wrong_sound = [
      createAudioPlayer(require("../assets/sounds/wrong_sound_1.wav")),
      createAudioPlayer(require("../assets/sounds/wrong_sound_2.wav")),
    ];

    // ⭐ 음계 10개 미리 로드
    players.notes = [
      createAudioPlayer(require("../assets/sounds/note_1.wav")), // 도
      createAudioPlayer(require("../assets/sounds/note_2.wav")), // 레
      createAudioPlayer(require("../assets/sounds/note_3.wav")), // 미
      createAudioPlayer(require("../assets/sounds/note_4.wav")), // 파
      createAudioPlayer(require("../assets/sounds/note_5.wav")), // 솔
      createAudioPlayer(require("../assets/sounds/note_6.wav")), // 라
      createAudioPlayer(require("../assets/sounds/note_7.wav")), // 시
      createAudioPlayer(require("../assets/sounds/note_8.wav")), // 높은 도
      createAudioPlayer(require("../assets/sounds/note_9.wav")), // 높은 레
      createAudioPlayer(require("../assets/sounds/note_10.wav")), // 높은 미
    ];
  } catch (e) {
    console.log("사운드 프리로드 실패:", e);
  }
}

// 기존 랜덤 재생
export function playSound(
  soundType: "grab" | "correct" | "wrong" | "correct_sound" | "wrong_sound",
) {
  try {
    const list = players[soundType];
    if (!list || list.length === 0) return;

    const randomIndex = Math.floor(Math.random() * list.length);
    const player = list[randomIndex];
    player.seekTo(0);
    player.play();
  } catch (error) {
    console.log("오디오 재생 실패:", error);
  }
}

// ⭐ 정답일 때 호출 (스트릭에 따라 음계 올라감)
export function playStreakNote(streakCount: number) {
  try {
    // 1~10으로 제한
    const index = Math.min(Math.max(streakCount, 1), 10) - 1;

    // 성공한 음을 기억
    lastSuccessNoteIndex = index;

    const player = players.notes[index];
    if (!player) return;

    player.seekTo(0);
    player.play();
  } catch (error) {
    console.log("음계 재생 실패:", error);
  }
}

// ⭐ 오답일 때 호출 → 직전에 성공했던 음 그대로 재생
export function playLastSuccessNote() {
  try {
    const player = players.notes[lastSuccessNoteIndex];
    if (!player) return;

    player.seekTo(0);
    player.play();
  } catch (error) {
    console.log("이전 음계 재생 실패:", error);
  }
}
