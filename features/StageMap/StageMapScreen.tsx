import React, { useCallback, useEffect, useRef, useState } from "react";

import { ScrollView, View } from "react-native";

import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../navigation/types";

import MapTrail from "./components/MapTrail";

import StageNode from "./components/StageNode";

import DecorativeBackground from "../../design-system/backgrounds/DecorativeBackground";

import AppHeader from "../../components/common/AppHeader";

import GradientBackground from "../../design-system/backgrounds/GradientBackground";

import { STAGE_CONFIGS } from "./stageConfigs";

import {
  Container,
  Content,
  StageMapHeaderCenter,
  StageMapTitle,
} from "./stageMapStyles";

import { useProgress } from "../classification/progress/useProgress";

import { colorLevels } from "../classification/color/constants/levels";
import { shapeLevels } from "../classification/shape/constants/levels";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "StageMapScreen"
>;

const NODE_STEP_Y = 190;
const TOP_PADDING = 110;
const BOTTOM_PADDING = 130;
const NODE_RADIUS = 43;
const NODE_CONTAINER_WIDTH = 120;
const HORIZONTAL_SAFE_PADDING = 60;

// ⭐ Content 레이아웃이 아직 측정되기 전(0일 때) 사용할 폴백값
const FALLBACK_VIEWPORT_HEIGHT = 560;

export default function StageMapScreen() {
  const route = useRoute<RouteProp<RootStackParamList, "StageMapScreen">>();
  const { gameType } = route.params || { gameType: "color" };

  const headerTitle =
    gameType === "shape" ? "모양 분류 모험" : "색깔 분류 모험";

  const navigation = useNavigation<NavigationProp>();
  const scrollRef = useRef<ScrollView>(null);

  const [trackWidth, setTrackWidth] = useState(0);

  // ⭐ ScrollView 뷰포트의 실제 높이
  const [viewportHeight, setViewportHeight] = useState(0);

  const {
    progress,
    isLevelUnlocked,
    isLevelCompleted,
    isLoading,
    reloadProgress,
  } = useProgress(gameType);

  useFocusEffect(
    useCallback(() => {
      reloadProgress();
    }, [reloadProgress]),
  );

  // ==================================================
  // ⭐ 현재 게임에 실제로 존재하는 Level 가져오기
  // ==================================================

  const levels = gameType === "color" ? colorLevels : shapeLevels;

  // ⭐ STAGE_CONFIGS 중에서 실제 게임에 존재하는 스테이지만 사용
  const availableStages = STAGE_CONFIGS.filter((stage) =>
    levels.some((levelConfig) => levelConfig.level === stage.level),
  );

  // ==================================================
  // ⭐ 실제 스테이지 개수에 맞춰 Content 높이 계산
  // ==================================================

  const contentHeight =
    TOP_PADDING + BOTTOM_PADDING + (availableStages.length - 1) * NODE_STEP_Y;

  // ==================================================
  // ⭐ 실제 스테이지 개수에 맞춰 위치 계산
  // ==================================================

  const positions = availableStages.map((stage, index) => {
    const y = contentHeight - BOTTOM_PADDING - index * NODE_STEP_Y;

    const usableHalfWidth = Math.max(
      trackWidth / 2 - HORIZONTAL_SAFE_PADDING,
      0,
    );

    const x = trackWidth / 2 + stage.xOffset * usableHalfWidth;

    return { x, y };
  });

  // ==================================================
  // ⭐ 현재 도전 중인 Level
  // ==================================================

  const currentLevel = progress.levels.find(
    (item) => item.unlocked && !item.completed,
  )?.level;

  // ==================================================
  // ⭐ 진행 중인 Level 위치로 자동 스크롤
  // ==================================================

  useEffect(() => {
    if (trackWidth === 0 || isLoading) return;

    const timer = setTimeout(() => {
      const effectiveViewportHeight =
        viewportHeight > 0 ? viewportHeight : FALLBACK_VIEWPORT_HEIGHT;

      if (currentLevel == null) {
        scrollRef.current?.scrollToEnd({ animated: false });
        return;
      }

      // ⭐ availableStages에서 현재 Level의 위치를 찾는다
      const targetIndex = availableStages.findIndex(
        (stage) => stage.level === currentLevel,
      );

      if (targetIndex === -1) {
        scrollRef.current?.scrollToEnd({ animated: false });
        return;
      }

      const targetY = positions[targetIndex].y;

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
  // ⭐ Stage 클릭
  // ==================================================

  const handleStagePress = (level: number) => {
    const unlocked = isLevelUnlocked(level);

    if (!unlocked) return;

    navigation.navigate("ClassificationPlayScreen", {
      gameType,
      level,
    });
  };

  return (
    <Container>
      <GradientBackground />

      <DecorativeBackground />

      <AppHeader
        onBack={() => navigation.goBack()}
        center={
          <StageMapHeaderCenter>
            <StageMapTitle>{headerTitle}</StageMapTitle>
          </StageMapHeaderCenter>
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
            }}
          >
            <View style={{ height: contentHeight }}>
              {/* ==========================================
                  ⭐ MapTrail
                 ========================================== */}

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

              {/* ==========================================
                  ⭐ StageNode
                 ========================================== */}

              {availableStages.map((stage, index) => {
                const pos = positions[index];

                const unlocked = isLevelUnlocked(stage.level);
                const completed = isLevelCompleted(stage.level);

                const levelProgress = progress.levels.find(
                  (item) => item.level === stage.level,
                );

                const stars = levelProgress?.stars ?? 0;

                return (
                  <StageNode
                    gameType={gameType}
                    key={stage.level}
                    level={stage.level}
                    name={stage.name}
                    unlocked={unlocked}
                    completed={completed}
                    stars={stars}
                    maxStars={levelProgress?.maxStars ?? 5}
                    isCurrent={stage.level === currentLevel}
                    onPress={() => handleStagePress(stage.level)}
                    style={{
                      left: pos.x - NODE_CONTAINER_WIDTH / 2,
                      top: pos.y - NODE_RADIUS,
                    }}
                  />
                );
              })}
            </View>
          </ScrollView>
        </Content>
      )}
    </Container>
  );
}
