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
