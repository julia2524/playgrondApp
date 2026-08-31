// 1. 전체 라우트 파라미터 타입 정의 (Home과 게임 화면 추가)
export type RootStackParamList = {
  Home: undefined;
  StageMapScreen: undefined;
  // 🌟 level(number 타입)을 파라미터로 받겠다고 정의!
  ClassificationPlayScreen: { level: number };
  StickerGalleryScreen: undefined;
};
