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
let isPreloaded = false;
let lastSuccessNoteIndex: number | null = null;
let isNotesReady = false;
let isPlayingNote = false; // ⭐ 연달아 재생 방지용

export async function preloadSounds() {
  // ⭐ 이미 생성했으면 다시 생성하지 않음
  if (isPreloaded) {
    return;
  }
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
    isPreloaded = true;
    isNotesReady = true; // ⭐⭐⭐ 이 줄 반드시 추가!

    console.log("🔊 사운드 프리로드 완료!");
  } catch (e) {
    console.log("사운드 프리로드 실패:", e);
    isPreloaded = false;
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
// export function playStreakNote(streakCount: number) {
//   try {
//     // 1~10으로 제한
//     const index = Math.min(Math.max(streakCount, 1), 10) - 1;

//     // 성공한 음을 기억
//     lastSuccessNoteIndex = index;

//     const player = players.notes[index];
//     if (!player) return;

//     player.seekTo(0);
//     player.play();
//   } catch (error) {
//     console.log("음계 재생 실패:", error);
//   }
// }

// // ⭐ 오답일 때 호출 → 직전에 성공했던 음 그대로 재생!
// export function playLastSuccessNote() {
//   try {
//     const player = players.notes[lastSuccessNoteIndex];
//     if (!player) return;

//     player.seekTo(0);
//     player.play();
//   } catch (error) {
//     console.log("이전 음계 재생 실패:", error);
//   }
// }

// ⭐ earnedStars 개수만큼 도 → 레 → 미 ... 순차 연주!
// ⭐ earnedStars 개수만큼 도 → 레 → 미 ... 깨끗하게 순차 연주
export function playEarnedNotes(earnedStars: number) {
  if (!players.notes || players.notes.length === 0) {
    console.log("음계 플레이어가 아직 준비되지 않음");
    return;
  }

  const count = Math.min(Math.max(earnedStars, 0), players.notes.length);
  if (count <= 0) return;

  // 이전 연주 중인 음들을 일단 전부 정지
  players.notes.forEach((player) => {
    try {
      if (player) {
        player.pause();
        player.seekTo(0);
      }
    } catch (e) {}
  });

  // 순차 재생 (간격을 충분히 줌)
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      try {
        const player = players.notes[i];
        if (player) {
          player.seekTo(0);
          player.play();
        }
      } catch (e) {
        console.log(`음계 ${i + 1} 재생 실패:`, e);
      }
    }, i * 150); // ← 여기가 핵심! 380~450ms 추천
  }
}
// ⭐ 리플레이 / 레벨 시작 시 호출해서 초기화
// export function resetLastSuccessNote() {
//   lastSuccessNoteIndex = 0;
// }
export function resetLastSuccessNote() {
  lastSuccessNoteIndex = 0;
}

// 안전하게 음 하나 재생
function playNoteByIndex(index: number) {
  if (!isNotesReady || !players.notes[index]) {
    console.log("음계 아직 준비 안 됨:", index);
    return;
  }

  // 이미 다른 음이 재생 중이면 잠시 무시 (마구 클릭 방지)
  if (isPlayingNote) {
    return;
  }

  try {
    isPlayingNote = true;
    const player = players.notes[index];
    player.seekTo(0);
    player.play();

    // 음 길이만큼 잠금 (0.35초 정도 추천)
    setTimeout(() => {
      isPlayingNote = false;
    }, 350);
  } catch (e) {
    console.log("음 재생 실패:", e);
    isPlayingNote = false;
  }
}

// 정답일 때
export function playStreakNote(streakCount: number) {
  const index = Math.min(Math.max(streakCount, 1), 10) - 1;
  lastSuccessNoteIndex = index;
  playNoteByIndex(index);
}

// 오답일 때 (이전 음 다시)
// export function playLastSuccessNote() {
//   playNoteByIndex(lastSuccessNoteIndex);
// }
export function playLastSuccessNote() {
  try {
    // ⭐ 아직 성공한 적이 없으면 아무 소리도 안 냄
    if (lastSuccessNoteIndex === null) {
      return;
    }

    const player = players.notes[lastSuccessNoteIndex];

    if (!player) return;

    player.seekTo(0);
    player.play();
  } catch (error) {
    console.log("이전 음계 재생 실패:", error);
  }
}
