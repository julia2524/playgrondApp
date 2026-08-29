import React, { useEffect, useRef, useState } from "react";

import { ScrollView, View } from "react-native";

import { useNavigation } from "@react-navigation/native";

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
import { createInitialProgress, GameProgress } from "./gameProgress";
import { STAGE_CONFIGS } from "./stageConfigs";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "StageMapScreen"
>;

// ==========================================
// 맵 레이아웃 설정
// ==========================================

const NODE_STEP_Y = 190;

const TOP_PADDING = 110;

const BOTTOM_PADDING = 130;

const NODE_RADIUS = 43;

const NODE_CONTAINER_WIDTH = 120;

const HORIZONTAL_SAFE_PADDING = 60;

// ==========================================
// Screen
// ==========================================

export default function StageMapScreen() {
  const navigation = useNavigation<NavigationProp>();

  const scrollRef = useRef<ScrollView>(null);

  const [trackWidth, setTrackWidth] = useState(0);

  // ==========================================
  // ⭐ 게임 Progress
  // 나중에 AsyncStorage에서 불러올 예정
  // ==========================================

  const [progress] = useState<GameProgress>(() => createInitialProgress());

  // ==========================================
  // ⭐ StageConfig + Progress 결합
  // ==========================================

  const stages = STAGE_CONFIGS.map((stage) => {
    const levelProgress = progress.levels.find(
      (item) => item.level === stage.level,
    );

    return {
      ...stage,

      unlocked: levelProgress?.unlocked ?? false,

      completed: levelProgress?.completed ?? false,

      stars: levelProgress?.stars ?? 0,

      maxStars: levelProgress?.maxStars ?? 5,
    };
  });

  // ==========================================
  // 전체 맵 높이
  // ==========================================

  const contentHeight =
    TOP_PADDING + BOTTOM_PADDING + (stages.length - 1) * NODE_STEP_Y;

  // ==========================================
  // ⭐ Stage 실제 위치 계산
  // ==========================================

  const positions = stages.map((stage, index) => {
    const y = contentHeight - BOTTOM_PADDING - index * NODE_STEP_Y;

    const usableHalfWidth = Math.max(
      trackWidth / 2 - HORIZONTAL_SAFE_PADDING,
      0,
    );

    const x = trackWidth / 2 + stage.xOffset * usableHalfWidth;

    return {
      x,
      y,
    };
  });

  // ==========================================
  // 처음 진입하면 Level 1 위치로
  // ==========================================

  useEffect(() => {
    if (trackWidth === 0) return;

    const timer = setTimeout(() => {
      scrollRef.current?.scrollToEnd({
        animated: false,
      });
    }, 0);

    return () => clearTimeout(timer);
  }, [trackWidth]);

  // ==========================================
  // 스테이지 클릭
  // ==========================================

  const handleStagePress = (level: number, unlocked: boolean) => {
    if (!unlocked) return;

    navigation.navigate("ClassificationPlayScreen", {
      level,
    });
  };

  // ==========================================
  // 현재 진행 중인 레벨
  // ==========================================

  const currentLevel =
    stages.find((stage) => stage.unlocked && !stage.completed)?.level ?? null;

  // ==========================================
  // Render
  // ==========================================

  return (
    <Container>
      {/* Background */}

      <GradientBackground />

      <DecorativeBackground />

      {/* Header */}

      <AppHeader
        onBack={() => navigation.goBack()}
        center={
          <StageMapHeaderCenter>
            <StageMapTitle>색깔 분류 모험</StageMapTitle>
          </StageMapHeaderCenter>
        }
      />

      {/* Map */}

      <Content>
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
          <View
            style={{
              height: contentHeight,
            }}
          >
            {/* ======================================
                길
            ====================================== */}

            {trackWidth > 0 && (
              <MapTrail
                width={trackWidth}
                height={contentHeight}
                points={positions.map((position, index) => ({
                  ...position,

                  completed: stages[index].completed,
                }))}
              />
            )}

            {/* ======================================
                Stage
            ====================================== */}

            {stages.map((stage, index) => {
              const position = positions[index];

              return (
                <StageNode
                  key={stage.level}
                  level={stage.level}
                  name={stage.name}
                  unlocked={stage.unlocked}
                  completed={stage.completed}
                  isCurrent={stage.level === currentLevel}
                  onPress={() => handleStagePress(stage.level, stage.unlocked)}
                  style={{
                    left: position.x - NODE_CONTAINER_WIDTH / 2,

                    top: position.y - NODE_RADIUS,
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
