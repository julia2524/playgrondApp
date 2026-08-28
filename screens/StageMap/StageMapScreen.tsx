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
import { useSafeAreaInsets } from "react-native-safe-area-context";

import DecorativeBackground from "../../components/common/DecorativeBackground";
import AppHeader from "../../components/common/AppHeader";
import GradientBackground from "../../components/common/GradientBackground";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "StageMapScreen"
>;

interface Stage {
  level: number;
  name: string;
  unlocked: boolean;
  completed: boolean;
  xOffset: number; // -1(왼쪽) ~ 1(오른쪽) 사이, 중앙 기준 상대 위치
}

const stages: Stage[] = [
  {
    level: 1,
    name: "알록달록 앵두 밭",
    unlocked: true,
    completed: false,
    xOffset: 0,
  },
  {
    level: 2,
    name: "싱그러운 풀숲",
    unlocked: true,
    completed: false,
    xOffset: -0.62,
  },
  {
    level: 3,
    name: "무지개 언덕",
    unlocked: false,
    completed: false,
    xOffset: 0.68,
  },
  {
    level: 4,
    name: "별빛 호수",
    unlocked: false,
    completed: false,
    xOffset: -0.55,
  },
  {
    level: 5,
    name: "캔디 공장",
    unlocked: false,
    completed: false,
    xOffset: 0.3,
  },
];

const NODE_STEP_Y = 190;
const TOP_PADDING = 110;
const BOTTOM_PADDING = 130;
const NODE_RADIUS = 43;
const NODE_CONTAINER_WIDTH = 120;
const HORIZONTAL_SAFE_PADDING = 60;

export default function StageMapScreen() {
  const insets = useSafeAreaInsets(); // ⭐ 추가
  const navigation = useNavigation<NavigationProp>();
  const scrollRef = useRef<ScrollView>(null);
  const [trackWidth, setTrackWidth] = useState(0);

  const contentHeight =
    TOP_PADDING + BOTTOM_PADDING + (stages.length - 1) * NODE_STEP_Y;

  // ⭐ 핵심: 모든 위치를 "실제 픽셀" 기준, 하나의 좌표계에서 계산
  // index 0(레벨1) = 화면 맨 아래, 마지막 index(레벨5) = 맨 위
  const positions = stages.map((stage, index) => {
    const y = contentHeight - BOTTOM_PADDING - index * NODE_STEP_Y;

    const usableHalfWidth = Math.max(
      trackWidth / 2 - HORIZONTAL_SAFE_PADDING,
      0,
    );
    const x = trackWidth / 2 + stage.xOffset * usableHalfWidth;

    return { x, y };
  });

  // ⭐ 처음 진입 시 맨 아래(레벨1)가 보이도록 스크롤
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: false });
    }, 0);
    return () => clearTimeout(timer);
  }, [trackWidth]);

  const handleStagePress = (level: number, unlocked: boolean) => {
    if (!unlocked) return;
    navigation.navigate("ClassificationPlayScreen", { level });
  };

  // "지금 도전 중" = 잠금 해제됐지만 아직 완료 안 한 첫 스테이지
  const currentLevel = stages.find((s) => s.unlocked && !s.completed)?.level;

  return (
    <Container>
      <GradientBackground />
      <DecorativeBackground />
      {/* 🌟 헤더에 안전영역(상태바 높이)만큼 패딩을 주어 카메라 홀 침범 방지 */}

      <AppHeader
        onBack={() => navigation.goBack()}
        center={
          <StageMapHeaderCenter>
            <StageMapTitle>색깔 분류 모험</StageMapTitle>
          </StageMapHeaderCenter>
        }
      />

      <Content>
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width)}
          contentContainerStyle={{
            minHeight: contentHeight,
          }}
        >
          <View style={{ height: contentHeight }}>
            {trackWidth > 0 && (
              <MapTrail
                width={trackWidth}
                height={contentHeight}
                points={positions.map((pos, index) => ({
                  ...pos,
                  completed: stages[index].completed,
                }))}
              />
            )}

            {stages.map((stage, index) => {
              const pos = positions[index];

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
