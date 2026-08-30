import React, { useCallback, useEffect, useRef, useState } from "react";

import { ScrollView, View } from "react-native";

import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../navigation/types";

import {
  Container,
  Content,
  StageMapHeaderCenter,
  StageMapTitle,
} from "../../styles/stageMapStyles";

import MapTrail from "../../components/stageMap/MapTrail";

import StageNode from "../../components/stageMap/StageNode";

import DecorativeBackground from "../../components/common/DecorativeBackground";

import AppHeader from "../../components/common/AppHeader";

import GradientBackground from "../../components/common/GradientBackground";

import { STAGE_CONFIGS } from "./stageConfigs";
import { useProgress } from "../games/classification/color/process/useProgress";

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
  } = useProgress();

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
    navigation.navigate("ClassificationPlayScreen", { level });
  };

  if (isLoading) {
    return (
      <Container>
        <GradientBackground />
        <DecorativeBackground />
      </Container>
    );
  }

  return (
    <Container>
      <GradientBackground />
      <DecorativeBackground />

      <AppHeader
        onBack={() => navigation.goBack()}
        center={
          <StageMapHeaderCenter>
            <StageMapTitle>색깔 분류 모험</StageMapTitle>
          </StageMapHeaderCenter>
        }
      />

      {/* ⭐ Content에 onLayout 추가: 실제 뷰포트 높이 측정 */}
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

              // ⭐ 현재 레벨의 저장된 Progress 찾기
              const levelProgress = progress.levels.find(
                (item) => item.level === stage.level,
              );

              // ⭐ 저장된 별 개수
              const stars = levelProgress?.stars ?? 0;

              return (
                <StageNode
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
    </Container>
  );
}
