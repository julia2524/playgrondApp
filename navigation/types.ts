// 1. 전체 라우트 파라미터 타입 정의 (Home과 게임 화면 추가)
export type RootStackParamList = {
  Home: undefined;
  // 🌟 StageMapScreen에서 어떤 게임(색깔 vs 모양)인지와 레벨을 관리할 수 있도록 확장
  StageMapScreen: { gameType: "color" | "shape" };
  // 🌟 level(number 타입)을 파라미터로 받겠다고 정의!
  ClassificationPlayScreen: { gameType: "color" | "shape"; level: number };
  StickerGalleryScreen: undefined;
};
