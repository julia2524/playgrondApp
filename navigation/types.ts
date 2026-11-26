// // 1. 전체 라우트 파라미터 타입 정의 (Home과 게임 화면 추가)
// export type RootStackParamList = {
//   Home: undefined;
//   ClassificationSectionScreen: undefined;
//   DrawingSectionScreen: undefined;
//   StageMapScreen: { gameType: "color" | "shape" | "category" };
//   TracingStageMapScreen: undefined;
//   TracingGameScreen: {
//     stage: number;
//   };
//   // 🌟 level(number 타입)을 파라미터로 받겠다고 정의!
//   ClassificationPlayScreen: {
//     gameType: "color" | "shape" | "category";
//     level: number;
//   };
//   // TracingGameScreen: undefined;
//   StickerGalleryScreen: undefined;
//   ShapeStickerGalleryScreen: undefined;
//   CategoryStickerGalleryScreen: undefined;
//   SettingScreen: undefined;
//   IntegratedStickerGalleryScreen:
//     | { initialTab?: "color" | "shape" | "category" }
//     | undefined;
//   StickerDetailScreen: {
//     gameType: "color" | "shape" | "category";
//     stickerId: string;
//     stickerName: string;
//   };
//   LanguageScreen: undefined;
// };

export type TracingGameType = "line" | "shape" | "object";

export type RootStackParamList = {
  Home: undefined;

  ClassificationSectionScreen: undefined;
  DrawingSectionScreen: undefined;

  StageMapScreen: {
    gameType: "color" | "shape" | "category";
  };

  // 그리기 게임 공통 스테이지 맵
  TracingStageMapScreen:
    | {
        gameType?: TracingGameType;
      }
    | undefined;

  // 그리기 게임 공통 플레이 화면
  TracingGameScreen: {
    stage: number;
    gameType?: TracingGameType;
  };

  ClassificationPlayScreen: {
    gameType: "color" | "shape" | "category";
    level: number;
  };

  StickerGalleryScreen: undefined;
  ShapeStickerGalleryScreen: undefined;
  CategoryStickerGalleryScreen: undefined;
  SettingScreen: undefined;

  IntegratedStickerGalleryScreen:
    | { initialTab?: "color" | "shape" | "category" }
    | undefined;

  StickerDetailScreen: {
    gameType: "color" | "shape" | "category";
    stickerId: string;
    stickerName: string;
  };

  LanguageScreen: undefined;
};
