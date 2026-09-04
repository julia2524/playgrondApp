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

  // ⭐ 추가: 스크롤 뷰포트(Content)의 실제 렌더링 높이
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

  const contentHeight =
    TOP_PADDING + BOTTOM_PADDING + (STAGE_CONFIGS.length - 1) * NODE_STEP_Y;

  const positions = STAGE_CONFIGS.map((stage, index) => {
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
  // ⭐ 진행 중인 Level 위치로 자동 스크롤 (실측 뷰포트 높이 사용)
  // ==================================================

  useEffect(() => {
    if (trackWidth === 0 || isLoading) return;

    const timer = setTimeout(() => {
      // ⭐ 실측값이 아직 0이면(레이아웃 전) 폴백값 사용
      const effectiveViewportHeight =
        viewportHeight > 0 ? viewportHeight : FALLBACK_VIEWPORT_HEIGHT;

      if (currentLevel == null) {
        scrollRef.current?.scrollToEnd({ animated: false });
        return;
      }

      const targetIndex = STAGE_CONFIGS.findIndex(
        (stage) => stage.level === currentLevel,
      );

      if (targetIndex === -1) {
        scrollRef.current?.scrollToEnd({ animated: false });
        return;
      }

      const targetY = positions[targetIndex].y;
      const scrollToY = Math.max(targetY - effectiveViewportHeight / 2, 0);

      scrollRef.current?.scrollTo({ y: scrollToY, animated: false });
    }, 50);

    return () => clearTimeout(timer);
  }, [trackWidth, isLoading, currentLevel, viewportHeight]);

  const handleStagePress = (level: number) => {
    const unlocked = isLevelUnlocked(level);
    if (!unlocked) return;
    navigation.navigate("ClassificationPlayScreen", { gameType, level });
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

      {/* ⭐ 로딩 중일 때는 컨텐츠 영역을 비워두거나 스피너만 띄워서 배경이 절대 리마운트되지 않게 유지! */}
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
              {trackWidth > 0 && (
                <MapTrail
                  width={trackWidth}
                  height={contentHeight}
                  points={STAGE_CONFIGS.map((stage, index) => ({
                    ...positions[index],
                    completed: isLevelCompleted(stage.level),
                  }))}
                />
              )}

              {STAGE_CONFIGS.map((stage, index) => {
                const pos = positions[index];
                const unlocked = isLevelUnlocked(stage.level);
                const completed = isLevelCompleted(stage.level);
                const levelProgress = progress.levels.find(
                  (item) => item.level === stage.level,
                );
                const stars = levelProgress?.stars ?? 0;

                return (
                  <StageNode
                    gameType={gameType} // 🌟 여기에 추가
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
