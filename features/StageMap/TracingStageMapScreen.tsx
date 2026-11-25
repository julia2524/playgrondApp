import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { ScrollView, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect, useNavigation } from "@react-navigation/native";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { RootStackParamList } from "../../navigation/types";

import MapTrail from "../StageMap/components/MapTrail";
import StageNode from "../StageMap/components/StageNode";

import AppHeader from "../../components/common/AppHeader";
import SettingButton from "../../components/common/SettingButton";

import GradientBackground from "../../design-system/backgrounds/GradientBackground";
import DecorativeBackground from "../../design-system/backgrounds/DecorativeBackground";

import {
  BannerAdContainer,
  Container,
  Content,
  StageMapHeaderCenter,
  StageMapTitle,
} from "../StageMap/stageMapStyles";

import { STAGE_CONFIGS } from "../StageMap/stageConfigs";

import BannerAd from "../../services/BannerAd";

import { triggerHaptic } from "../../utils/haptic";
import { TRACING_LINES } from "../tracing/paths/lineCatalog";

// ==================================================
// Types
// ==================================================

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface TracingLevelProgress {
  level: number;
  unlocked: boolean;
  completed: boolean;
  stars: number;
  maxStars: number;
}

interface TracingProgress {
  levels: TracingLevelProgress[];
}

interface TracingLineItem {
  shortLabel: string;
}

// ==================================================
// Constants
// ==================================================

const TOTAL_STAGES = TRACING_LINES.length;

const STORAGE_KEY = "@tracing_progress_line";

const NODE_STEP_Y = 190;
const TOP_PADDING = 110;
const BOTTOM_PADDING = 130;

const NODE_RADIUS = 43;
const NODE_CONTAINER_WIDTH = 120;

const HORIZONTAL_SAFE_PADDING = 60;

const BANNER_AD_HEIGHT = 60;

const FALLBACK_VIEWPORT_HEIGHT = 560;

// ==================================================
// Initial Progress
// ==================================================

const createInitialProgress = (): TracingProgress => ({
  levels: Array.from({ length: TOTAL_STAGES }, (_, index) => ({
    level: index + 1,
    unlocked: index === 0,
    completed: false,
    stars: 0,
    maxStars: 5,
  })),
});

// ==================================================
// Progress Normalizer
// ==================================================

const normalizeProgress = (saved: unknown): TracingProgress => {
  const initial = createInitialProgress();

  if (
    !saved ||
    typeof saved !== "object" ||
    !("levels" in saved) ||
    !Array.isArray(saved.levels)
  ) {
    return initial;
  }

  const savedLevels = saved.levels as Partial<TracingLevelProgress>[];

  const levels = initial.levels.map((defaultLevel) => {
    const savedLevel = savedLevels.find(
      (item) => item.level === defaultLevel.level,
    );

    if (!savedLevel) {
      return defaultLevel;
    }

    return {
      level: defaultLevel.level,
      unlocked: Boolean(savedLevel.unlocked),
      completed: Boolean(savedLevel.completed),
      stars: Math.max(0, Math.min(5, Number(savedLevel.stars) || 0)),
      maxStars: 5,
    };
  });

  // 첫 번째 스테이지는 항상 열려 있어야 함
  levels[0].unlocked = true;

  // 완료한 스테이지의 다음 스테이지도 열려 있어야 함
  levels.forEach((level, index) => {
    if (level.completed && index < levels.length - 1) {
      levels[index + 1].unlocked = true;
    }
  });

  return { levels };
};

// ==================================================
// Screen
// ==================================================

export default function TracingStageMapScreen() {
  const navigation = useNavigation<NavigationProp>();

  const insets = useSafeAreaInsets();

  const scrollRef = useRef<ScrollView>(null);

  const [trackWidth, setTrackWidth] = useState(0);

  const [viewportHeight, setViewportHeight] = useState(0);

  const [progress, setProgress] = useState<TracingProgress>(
    createInitialProgress,
  );

  const [isLoading, setIsLoading] = useState(true);

  // ==================================================
  // Load Progress
  // ==================================================

  const reloadProgress = useCallback(async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);
        setProgress(normalizeProgress(parsed));
      } else {
        setProgress(createInitialProgress());
      }
    } catch (error) {
      console.warn("Tracing progress load failed:", error);
      setProgress(createInitialProgress());
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      reloadProgress();
    }, [reloadProgress]),
  );

  // ==================================================
  // Stage Configs
  // ==================================================

  const availableStages = useMemo(
    () =>
      (TRACING_LINES as TracingLineItem[]).map((line, index) => ({
        level: index + 1,
        name: line.shortLabel,
        xOffset: STAGE_CONFIGS[index]?.xOffset ?? 0,
      })),
    [],
  );

  // ==================================================
  // Content Height
  // ==================================================

  const contentHeight =
    TOP_PADDING + BOTTOM_PADDING + (availableStages.length - 1) * NODE_STEP_Y;

  // ==================================================
  // Stage Positions
  // ==================================================

  const positions = useMemo(() => {
    return availableStages.map((stage, index) => {
      const y = contentHeight - BOTTOM_PADDING - index * NODE_STEP_Y;

      const usableHalfWidth = Math.max(
        trackWidth / 2 - HORIZONTAL_SAFE_PADDING,
        0,
      );

      const x = trackWidth / 2 + stage.xOffset * usableHalfWidth;

      return { x, y };
    });
  }, [availableStages, contentHeight, trackWidth]);

  // ==================================================
  // Progress Helpers
  // ==================================================

  const getLevelProgress = useCallback(
    (level: number) => {
      return progress.levels.find((item) => item.level === level);
    },
    [progress],
  );

  const isLevelUnlocked = useCallback(
    (level: number) => {
      return getLevelProgress(level)?.unlocked ?? false;
    },
    [getLevelProgress],
  );

  const isLevelCompleted = useCallback(
    (level: number) => {
      return getLevelProgress(level)?.completed ?? false;
    },
    [getLevelProgress],
  );

  const currentLevel =
    progress.levels.find((item) => item.unlocked && !item.completed)?.level ??
    TOTAL_STAGES;

  // ==================================================
  // Auto Scroll
  // ==================================================

  useEffect(() => {
    if (trackWidth === 0 || isLoading) {
      return;
    }

    const timer = setTimeout(() => {
      const effectiveViewportHeight =
        viewportHeight > 0 ? viewportHeight : FALLBACK_VIEWPORT_HEIGHT;

      const targetIndex = availableStages.findIndex(
        (stage) => stage.level === currentLevel,
      );

      if (targetIndex === -1) {
        scrollRef.current?.scrollToEnd({
          animated: false,
        });
        return;
      }

      const targetY = positions[targetIndex]?.y ?? 0;

      const scrollToY = Math.max(targetY - effectiveViewportHeight / 2, 0);

      scrollRef.current?.scrollTo({
        y: scrollToY,
        animated: false,
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [
    trackWidth,
    isLoading,
    currentLevel,
    viewportHeight,
    availableStages,
    positions,
  ]);

  // ==================================================
  // Stage Press
  // ==================================================

  const handleStagePress = (level: number) => {
    if (!isLevelUnlocked(level)) {
      return;
    }

    triggerHaptic("light");

    // stage는 1부터 시작하는 스테이지 번호
    // navigation/types.ts에 stage 파라미터를 추가할 예정
    navigation.navigate("TracingGameScreen", { stage: level });
  };

  // ==================================================
  // Back
  // ==================================================

  const handleBack = () => {
    triggerHaptic("light");
    navigation.goBack();
  };

  // ==================================================
  // Layout
  // ==================================================

  const bottomSafeOffset = Math.max(insets.bottom, 4);

  // ==================================================
  // Render
  // ==================================================

  return (
    <Container>
      <GradientBackground />

      <DecorativeBackground />

      <AppHeader
        onBack={handleBack}
        center={
          <StageMapHeaderCenter>
            <StageMapTitle>꼬불꼬불 선 따라가기</StageMapTitle>
          </StageMapHeaderCenter>
        }
        right={
          <SettingButton
            onPress={() => {
              triggerHaptic("light");
              navigation.navigate("SettingScreen" as never);
            }}
          />
        }
      />

      {!isLoading && (
        <Content
          onLayout={(event) => {
            setViewportHeight(event.nativeEvent.layout.height);
          }}
        >
          <ScrollView
            ref={scrollRef}
            showsVerticalScrollIndicator={false}
            onLayout={(event) => {
              setTrackWidth(event.nativeEvent.layout.width);
            }}
            contentContainerStyle={{
              minHeight: contentHeight,
              paddingBottom: BANNER_AD_HEIGHT + bottomSafeOffset + 16,
            }}
          >
            <View
              style={{
                height: contentHeight,
                direction: "ltr",
              }}
            >
              {/* ======================================
                  Map Trail
              ====================================== */}

              {trackWidth > 0 && (
                <MapTrail
                  width={trackWidth}
                  height={contentHeight}
                  points={availableStages.map((stage, index) => ({
                    ...positions[index],
                    completed: isLevelCompleted(stage.level),
                  }))}
                />
              )}

              {/* ======================================
                  Stage Nodes
              ====================================== */}

              {availableStages.map((stage, index) => {
                const position = positions[index];

                const unlocked = isLevelUnlocked(stage.level);

                const completed = isLevelCompleted(stage.level);

                const levelProgress = getLevelProgress(stage.level);

                return (
                  <StageNode
                    key={stage.level}
                    // color는 기존 별 모양 진행도를 재사용하기 위한 값
                    gameType="color"
                    level={stage.level}
                    name={stage.name}
                    unlocked={unlocked}
                    completed={completed}
                    stars={levelProgress?.stars ?? 0}
                    maxStars={levelProgress?.maxStars ?? 5}
                    isCurrent={stage.level === currentLevel}
                    onPress={() => handleStagePress(stage.level)}
                    style={{
                      left: position.x - NODE_CONTAINER_WIDTH / 2,
                      top: position.y - NODE_RADIUS,
                    }}
                  />
                );
              })}
            </View>
          </ScrollView>

          {/* ======================================
              Bottom Banner Ad
          ====================================== */}

          <BannerAdContainer
            style={{
              height: BANNER_AD_HEIGHT + bottomSafeOffset,
              paddingBottom: bottomSafeOffset,
            }}
          >
            <BannerAd />
          </BannerAdContainer>
        </Content>
      )}
    </Container>
  );
}
