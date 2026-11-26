import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { ScrollView, View, useWindowDimensions } from "react-native";

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
import i18n from "../../i18n";

import {
  createInitialTracingGameProgress,
  getCachedTracingGameProgress,
  loadTracingGameProgress,
} from "../tracing/storage/tracingProgressStorage";

import type {
  TracingGameProgress,
  TracingLevelProgress,
} from "../tracing/storage/tracingProgressStorage";

// ==================================================
// Types
// ==================================================

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface TracingLineItem {
  shortLabel: string;
}

// ==================================================
// Constants
// ==================================================

const TOTAL_STAGES = TRACING_LINES.length;

const NODE_STEP_Y = 190;
const TOP_PADDING = 110;
const BOTTOM_PADDING = 130;

const NODE_RADIUS = 43;
const NODE_CONTAINER_WIDTH = 120;

const HORIZONTAL_SAFE_PADDING = 60;

const BANNER_AD_HEIGHT = 60;

// 첫 프레임에 현재 스테이지 주변 ±N개 노드만 먼저 그린다
const INITIAL_RENDER_RADIUS = 3;
// 나머지 노드를 그리기까지의 지연(ms)
const RENDER_REST_DELAY = 350;
// 스크롤 준비가 늦어져도 화면이 비어 있지 않도록 하는 안전장치(ms)
const SCROLL_READY_FALLBACK = 500;

// ==================================================
// Screen
// ==================================================

export default function TracingStageMapScreen() {
  const navigation = useNavigation<NavigationProp>();

  const insets = useSafeAreaInsets();
  const { width: windowWidth } = useWindowDimensions();

  const scrollRef = useRef<ScrollView>(null);

  // 0이 아니라 화면 너비로 시작 → 첫 렌더부터 정확한 위치로 그린다
  const [trackWidth, setTrackWidth] = useState(windowWidth);

  const [viewportHeight, setViewportHeight] = useState(0);

  const [progress, setProgress] = useState<TracingGameProgress>(
    () =>
      getCachedTracingGameProgress(TOTAL_STAGES) ??
      createInitialTracingGameProgress(TOTAL_STAGES),
  );

  const [isLoading, setIsLoading] = useState(
    () => getCachedTracingGameProgress(TOTAL_STAGES) === null,
  );

  // 첫 스크롤이 끝날 때까지 투명 (맨 위가 보였다가 점프하는 현상 방지)
  const [isMapPositioned, setIsMapPositioned] = useState(false);
  // 나머지 노드까지 전부 렌더링할지 여부
  const [renderAll, setRenderAll] = useState(false);

  const hasInitialScrollRef = useRef(false);

  // ==================================================
  // Load Progress
  // ==================================================

  const reloadProgress = useCallback(async () => {
    try {
      const savedProgress = await loadTracingGameProgress(TOTAL_STAGES);

      // 캐시와 같은 객체면 React가 알아서 재렌더를 건너뜀
      setProgress(savedProgress);
    } catch (error) {
      console.warn("Tracing progress load failed:", error);
      setProgress(createInitialTracingGameProgress(TOTAL_STAGES));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void reloadProgress();
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

  const contentHeight =
    TOP_PADDING + BOTTOM_PADDING + (availableStages.length - 1) * NODE_STEP_Y;

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

  // level → progress 조회를 O(1)로
  const levelMap = useMemo(() => {
    const map = new Map<number, TracingLevelProgress>();
    progress.levels.forEach((item) => map.set(item.level, item));
    return map;
  }, [progress]);

  const currentLevel = useMemo(
    () =>
      progress.levels.find((item) => item.unlocked && !item.completed)?.level ??
      TOTAL_STAGES,
    [progress],
  );

  const currentIndex = useMemo(
    () => availableStages.findIndex((stage) => stage.level === currentLevel),
    [availableStages, currentLevel],
  );

  const focusIndex = currentIndex === -1 ? 0 : currentIndex;

  const trailPoints = useMemo(
    () =>
      availableStages.map((stage, index) => ({
        ...positions[index],
        completed: levelMap.get(stage.level)?.completed ?? false,
      })),
    [availableStages, positions, levelMap],
  );

  // ==================================================
  // 나머지 노드는 첫 화면이 뜬 뒤에 렌더링
  // ==================================================

  useEffect(() => {
    const timer = setTimeout(() => setRenderAll(true), RENDER_REST_DELAY);
    return () => clearTimeout(timer);
  }, []);

  // ==================================================
  // Auto Scroll (최초 1회)
  // ==================================================

  useEffect(() => {
    if (hasInitialScrollRef.current) return;
    if (viewportHeight === 0 || isLoading) return;

    const frame = requestAnimationFrame(() => {
      if (hasInitialScrollRef.current) return;

      if (currentIndex === -1) {
        scrollRef.current?.scrollToEnd({ animated: false });
      } else {
        const targetY = positions[currentIndex]?.y ?? 0;
        const scrollToY = Math.max(targetY - viewportHeight / 2, 0);

        scrollRef.current?.scrollTo({ y: scrollToY, animated: false });
      }

      hasInitialScrollRef.current = true;
      setIsMapPositioned(true);
    });

    return () => cancelAnimationFrame(frame);
  }, [viewportHeight, isLoading, currentIndex, positions]);

  // 안전장치: 어떤 이유로든 스크롤 준비가 안 돼도 화면은 보이게
  useEffect(() => {
    const timer = setTimeout(
      () => setIsMapPositioned(true),
      SCROLL_READY_FALLBACK,
    );
    return () => clearTimeout(timer);
  }, []);

  // ==================================================
  // Stage Press
  // ==================================================

  const handleStagePress = (level: number) => {
    if (!(levelMap.get(level)?.unlocked ?? false)) {
      return;
    }

    triggerHaptic("light");

    navigation.navigate("TracingGameScreen", {
      stage: level,
    });
  };

  const handleBack = () => {
    triggerHaptic("light");
    navigation.goBack();
  };

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
            <StageMapTitle>{i18n.t("drawing_line_title")}</StageMapTitle>
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

      <Content
        onLayout={(event) => {
          const h = event.nativeEvent.layout.height;
          setViewportHeight((prev) => (Math.abs(prev - h) < 0.5 ? prev : h));
        }}
      >
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          style={{
            opacity: isMapPositioned ? 1 : 0,
          }}
          pointerEvents={isMapPositioned ? "auto" : "none"}
          onLayout={(event) => {
            const w = event.nativeEvent.layout.width;
            setTrackWidth((prev) => (Math.abs(prev - w) < 0.5 ? prev : w));
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
            {trackWidth > 0 && (
              <MapTrail
                width={trackWidth}
                height={contentHeight}
                points={trailPoints}
              />
            )}

            {availableStages.map((stage, index) => {
              // 첫 프레임에는 현재 스테이지 주변 노드만 렌더링
              if (
                !renderAll &&
                Math.abs(index - focusIndex) > INITIAL_RENDER_RADIUS
              ) {
                return null;
              }

              const position = positions[index];
              const levelProgress = levelMap.get(stage.level);

              return (
                <StageNode
                  key={stage.level}
                  gameType="color"
                  level={stage.level}
                  name={stage.name}
                  unlocked={levelProgress?.unlocked ?? false}
                  completed={levelProgress?.completed ?? false}
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

        <BannerAdContainer
          style={{
            height: BANNER_AD_HEIGHT + bottomSafeOffset,
            paddingBottom: bottomSafeOffset,
          }}
        >
          <BannerAd />
        </BannerAdContainer>
      </Content>
    </Container>
  );
}
