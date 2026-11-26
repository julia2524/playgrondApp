// import React, {
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import { ScrollView, View } from "react-native";
// import {
//   RouteProp,
//   useFocusEffect,
//   useNavigation,
//   useRoute,
// } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { RootStackParamList } from "../../navigation/types";
// import MapTrail from "./components/MapTrail";
// import StageNode from "./components/StageNode";
// import AppHeader from "../../components/common/AppHeader";
// import { STAGE_CONFIGS } from "./stageConfigs";
// import {
//   BannerAdContainer,
//   Container,
//   Content,
//   StageMapHeaderCenter,
//   StageMapTitle,
//   StickerBookFloatingButton,
// } from "./stageMapStyles";
// import { useProgress } from "../classification/progress/useProgress";
// import { colorLevels } from "../classification/color/constants/levels";
// import { shapeLevels } from "../classification/shape/constants/levels";
// import SettingButton from "../../components/common/SettingButton";
// import GradientBackground from "../../design-system/backgrounds/GradientBackground";
// import DecorativeBackground from "../../design-system/backgrounds/DecorativeBackground";
// import { categoryLevels } from "../classification/category/constants/levels";
// import BannerAd from "../../services/BannerAd";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import { BASIC_COLORS } from "../../design-system/tokens/colors";
// import i18n from "../../i18n";
// import { triggerHaptic } from "../../utils/haptic";

// type NavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   "StageMapScreen"
// >;

// const NODE_STEP_Y = 190;
// const TOP_PADDING = 110;
// const BOTTOM_PADDING = 130;
// const NODE_RADIUS = 43;
// const NODE_CONTAINER_WIDTH = 120;
// const HORIZONTAL_SAFE_PADDING = 60;
// const BANNER_AD_HEIGHT = 60;

// // ⭐ Content 레이아웃이 아직 측정되기 전(0일 때) 사용할 폴백값
// const FALLBACK_VIEWPORT_HEIGHT = 560;

// export default function StageMapScreen() {
//   const route = useRoute<RouteProp<RootStackParamList, "StageMapScreen">>();
//   const { gameType } = route.params || { gameType: "color" };
//   const insets = useSafeAreaInsets();

//   const headerTitle = i18n.t(`adventure_title_${gameType}`);

//   const navigation = useNavigation<NavigationProp>();
//   const scrollRef = useRef<ScrollView>(null);

//   const [trackWidth, setTrackWidth] = useState(0);

//   // ⭐ ScrollView 뷰포트의 실제 높이
//   const [viewportHeight, setViewportHeight] = useState(0);

//   const {
//     progress,
//     isLevelUnlocked,
//     isLevelCompleted,
//     isLoading,
//     reloadProgress,
//   } = useProgress(gameType);

//   const hasFocusedOnceRef = useRef(false);

//   useFocusEffect(
//     useCallback(() => {
//       if (!hasFocusedOnceRef.current) {
//         hasFocusedOnceRef.current = true;
//         return;
//       }

//       void reloadProgress();
//     }, [reloadProgress]),
//   );

//   // ==================================================
//   // 현재 게임에 실제로 존재하는 Level
//   // ==================================================

//   const levels = useMemo(() => {
//     if (gameType === "color") return colorLevels;
//     if (gameType === "shape") return shapeLevels;
//     return categoryLevels;
//   }, [gameType]);

//   const availableStages = useMemo(
//     () =>
//       STAGE_CONFIGS.filter((stage) =>
//         levels.some((levelConfig) => levelConfig.level === stage.level),
//       ),
//     [levels],
//   );

//   // ==================================================
//   // Content 높이
//   // ==================================================

//   const contentHeight =
//     TOP_PADDING + BOTTOM_PADDING + (availableStages.length - 1) * NODE_STEP_Y;

//   // ==================================================
//   // Stage 위치
//   // ==================================================

//   const positions = useMemo(
//     () =>
//       availableStages.map((stage, index) => {
//         const y = contentHeight - BOTTOM_PADDING - index * NODE_STEP_Y;

//         const usableHalfWidth = Math.max(
//           trackWidth / 2 - HORIZONTAL_SAFE_PADDING,
//           0,
//         );

//         const x = trackWidth / 2 + stage.xOffset * usableHalfWidth;

//         return { x, y };
//       }),
//     [availableStages, contentHeight, trackWidth],
//   );

//   // ==================================================
//   // ⭐ 현재 도전 중인 Level
//   // ==================================================

//   const currentLevel = progress.levels.find(
//     (item) => item.unlocked && !item.completed,
//   )?.level;

//   const hasInitialScrollRef = useRef(false);

//   // ==================================================
//   // 첫 진입 시 현재 Level로 초기 스크롤
//   // ==================================================

//   useEffect(() => {
//     if (
//       trackWidth === 0 ||
//       viewportHeight === 0 ||
//       isLoading ||
//       hasInitialScrollRef.current
//     ) {
//       return;
//     }

//     const timer = setTimeout(() => {
//       const targetIndex = availableStages.findIndex(
//         (stage) => stage.level === currentLevel,
//       );

//       if (targetIndex === -1) {
//         scrollRef.current?.scrollToEnd({
//           animated: false,
//         });
//       } else {
//         const targetY = positions[targetIndex]?.y ?? 0;

//         const scrollToY = Math.max(targetY - viewportHeight / 2, 0);

//         scrollRef.current?.scrollTo({
//           y: scrollToY,
//           animated: false,
//         });
//       }

//       hasInitialScrollRef.current = true;
//     }, 30);

//     return () => clearTimeout(timer);
//   }, [
//     trackWidth,
//     viewportHeight,
//     isLoading,
//     currentLevel,
//     availableStages,
//     positions,
//   ]);

//   // ==================================================
//   // ⭐ Stage 클릭
//   // ==================================================

//   const handleStagePress = (level: number) => {
//     const unlocked = isLevelUnlocked(level);

//     if (!unlocked) return;

//     navigation.navigate("ClassificationPlayScreen", {
//       gameType,
//       level,
//     });
//   };

//   const handleGoStickerBook = () => {
//     triggerHaptic("light");
//     navigation.navigate("IntegratedStickerGalleryScreen", {
//       initialTab: gameType,
//     });
//   };
//   const handleBack = () => {
//     triggerHaptic("light");
//     navigation.goBack();
//   };
//   const bottomSafeOffset = Math.max(insets.bottom, 4);

//   return (
//     <Container>
//       <GradientBackground />
//       <DecorativeBackground />
//       <AppHeader
//         onBack={handleBack}
//         center={
//           <StageMapHeaderCenter>
//             <StageMapTitle>{headerTitle}</StageMapTitle>
//           </StageMapHeaderCenter>
//         }
//         right={
//           <SettingButton
//             onPress={() => {
//               triggerHaptic("light");
//               navigation.navigate("SettingScreen" as never);
//             }}
//           />
//         }
//       />

//       <Content
//         onLayout={(event) => {
//           setViewportHeight(event.nativeEvent.layout.height);
//         }}
//       >
//         <ScrollView
//           ref={scrollRef}
//           showsVerticalScrollIndicator={false}
//           onLayout={(event) => {
//             setTrackWidth(event.nativeEvent.layout.width);
//           }}
//           contentContainerStyle={{
//             minHeight: contentHeight,
//             paddingBottom: BANNER_AD_HEIGHT + bottomSafeOffset + 16,
//           }}
//         >
//           <View style={{ height: contentHeight, direction: "ltr" }}>
//             {/* ==========================================
//                   ⭐ MapTrail
//                  ========================================== */}

//             {trackWidth > 0 && (
//               <MapTrail
//                 width={trackWidth}
//                 height={contentHeight}
//                 points={availableStages.map((stage, index) => ({
//                   ...positions[index],
//                   completed: isLevelCompleted(stage.level),
//                 }))}
//               />
//             )}

//             {/* ==========================================
//                   ⭐ StageNode
//                  ========================================== */}

//             {availableStages.map((stage, index) => {
//               const pos = positions[index];

//               const unlocked = isLevelUnlocked(stage.level);
//               const completed = isLevelCompleted(stage.level);

//               const levelProgress = progress.levels.find(
//                 (item) => item.level === stage.level,
//               );

//               const stars = levelProgress?.stars ?? 0;

//               return (
//                 <StageNode
//                   gameType={gameType}
//                   key={stage.level}
//                   level={stage.level}
//                   name={stage.name}
//                   unlocked={unlocked}
//                   completed={completed}
//                   stars={stars}
//                   maxStars={levelProgress?.maxStars ?? 5}
//                   isCurrent={stage.level === currentLevel}
//                   onPress={() => {
//                     triggerHaptic("light");
//                     handleStagePress(stage.level);
//                   }}
//                   style={{
//                     left: pos.x - NODE_CONTAINER_WIDTH / 2,
//                     top: pos.y - NODE_RADIUS,
//                   }}
//                 />
//               );
//             })}
//           </View>
//         </ScrollView>

//         {/* 📖 화면 하단 동동 떠 있는 플로팅 스티커북 버튼 */}
//         <StickerBookFloatingButton
//           onPress={handleGoStickerBook}
//           activeOpacity={0.8}
//           style={{
//             bottom: BANNER_AD_HEIGHT + bottomSafeOffset + 12,
//           }}
//         >
//           <Ionicons
//             name="book-outline"
//             size={26}
//             color={BASIC_COLORS.SECONDARY}
//           />
//         </StickerBookFloatingButton>

//         {/* ⭐ 화면 하단 고정 광고 */}
//         <BannerAdContainer
//           style={{
//             height: BANNER_AD_HEIGHT + bottomSafeOffset,
//             paddingBottom: bottomSafeOffset,
//           }}
//         >
//           <BannerAd />
//         </BannerAdContainer>
//       </Content>
//     </Container>
//   );
// }
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ScrollView, View, useWindowDimensions } from "react-native";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootStackParamList } from "../../navigation/types";
import MapTrail from "./components/MapTrail";
import StageNode from "./components/StageNode";
import AppHeader from "../../components/common/AppHeader";
import { STAGE_CONFIGS } from "./stageConfigs";
import {
  BannerAdContainer,
  Container,
  Content,
  StageMapHeaderCenter,
  StageMapTitle,
  StickerBookFloatingButton,
} from "./stageMapStyles";
import { useProgress } from "../classification/progress/useProgress";
import { colorLevels } from "../classification/color/constants/levels";
import { shapeLevels } from "../classification/shape/constants/levels";
import SettingButton from "../../components/common/SettingButton";
import GradientBackground from "../../design-system/backgrounds/GradientBackground";
import DecorativeBackground from "../../design-system/backgrounds/DecorativeBackground";
import { categoryLevels } from "../classification/category/constants/levels";
import BannerAd from "../../services/BannerAd";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BASIC_COLORS } from "../../design-system/tokens/colors";
import i18n from "../../i18n";
import { triggerHaptic } from "../../utils/haptic";
import type { LevelProgress } from "../classification/progress/gameProgress";

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
const BANNER_AD_HEIGHT = 60;

// 첫 프레임에 현재 스테이지 주변 ±N개 노드만 먼저 그린다
const INITIAL_RENDER_RADIUS = 3;
// 나머지 노드를 그리기까지의 지연(ms)
const RENDER_REST_DELAY = 350;
// 스크롤 준비가 늦어져도 화면이 비어 있지 않도록 하는 안전장치(ms)
const SCROLL_READY_FALLBACK = 500;

export default function StageMapScreen() {
  const route = useRoute<RouteProp<RootStackParamList, "StageMapScreen">>();
  const { gameType } = route.params || { gameType: "color" };
  const insets = useSafeAreaInsets();
  const { width: windowWidth } = useWindowDimensions();

  const headerTitle = i18n.t(`adventure_title_${gameType}`);

  const navigation = useNavigation<NavigationProp>();
  const scrollRef = useRef<ScrollView>(null);

  // ⭐ 0이 아니라 화면 너비로 시작 → 첫 렌더부터 정확한 위치로 그린다
  const [trackWidth, setTrackWidth] = useState(windowWidth);
  const [viewportHeight, setViewportHeight] = useState(0);

  // 첫 스크롤이 끝날 때까지 투명 (맨 위가 보였다가 점프하는 현상 방지)
  const [scrollReady, setScrollReady] = useState(false);
  // 나머지 노드까지 전부 렌더링할지 여부
  const [renderAll, setRenderAll] = useState(false);

  const { progress, isLoading, reloadProgress } = useProgress(gameType);

  const hasFocusedOnceRef = useRef(false);

  useFocusEffect(
    useCallback(() => {
      if (!hasFocusedOnceRef.current) {
        hasFocusedOnceRef.current = true;
        return;
      }

      void reloadProgress();
    }, [reloadProgress]),
  );

  // ==================================================
  // 현재 게임에 실제로 존재하는 Level
  // ==================================================

  const levels = useMemo(() => {
    if (gameType === "color") return colorLevels;
    if (gameType === "shape") return shapeLevels;
    return categoryLevels;
  }, [gameType]);

  const availableStages = useMemo(
    () =>
      STAGE_CONFIGS.filter((stage) =>
        levels.some((levelConfig) => levelConfig.level === stage.level),
      ),
    [levels],
  );

  const contentHeight =
    TOP_PADDING + BOTTOM_PADDING + (availableStages.length - 1) * NODE_STEP_Y;

  const positions = useMemo(
    () =>
      availableStages.map((stage, index) => {
        const y = contentHeight - BOTTOM_PADDING - index * NODE_STEP_Y;

        const usableHalfWidth = Math.max(
          trackWidth / 2 - HORIZONTAL_SAFE_PADDING,
          0,
        );

        const x = trackWidth / 2 + stage.xOffset * usableHalfWidth;

        return { x, y };
      }),
    [availableStages, contentHeight, trackWidth],
  );

  // level → progress 조회를 O(1)로
  const levelMap = useMemo(() => {
    const map = new Map<number, LevelProgress>();
    progress.levels.forEach((item) => map.set(item.level, item));
    return map;
  }, [progress]);

  const currentLevel = useMemo(
    () =>
      progress.levels.find((item) => item.unlocked && !item.completed)?.level,
    [progress],
  );

  const currentIndex = useMemo(
    () => availableStages.findIndex((stage) => stage.level === currentLevel),
    [availableStages, currentLevel],
  );

  // 현재 스테이지가 없으면(전부 완료 등) 기존 동작대로 맨 아래(1단계 쪽)로 스크롤
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
  // 첫 진입 시 현재 Level로 초기 스크롤
  // ==================================================

  const hasInitialScrollRef = useRef(false);

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
      setScrollReady(true);
    });

    return () => cancelAnimationFrame(frame);
  }, [viewportHeight, isLoading, currentIndex, positions]);

  // 안전장치: 어떤 이유로든 스크롤 준비가 안 돼도 화면은 보이게
  useEffect(() => {
    const timer = setTimeout(() => setScrollReady(true), SCROLL_READY_FALLBACK);
    return () => clearTimeout(timer);
  }, []);

  // ==================================================
  // Stage 클릭
  // ==================================================

  const handleStagePress = (level: number) => {
    const unlocked = levelMap.get(level)?.unlocked ?? false;

    if (!unlocked) return;

    navigation.navigate("ClassificationPlayScreen", {
      gameType,
      level,
    });
  };

  const handleGoStickerBook = () => {
    triggerHaptic("light");
    navigation.navigate("IntegratedStickerGalleryScreen", {
      initialTab: gameType,
    });
  };

  const handleBack = () => {
    triggerHaptic("light");
    navigation.goBack();
  };

  const bottomSafeOffset = Math.max(insets.bottom, 4);

  return (
    <Container>
      <GradientBackground />
      <DecorativeBackground />
      <AppHeader
        onBack={handleBack}
        center={
          <StageMapHeaderCenter>
            <StageMapTitle>{headerTitle}</StageMapTitle>
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
          style={{ opacity: scrollReady ? 1 : 0 }}
          onLayout={(event) => {
            const w = event.nativeEvent.layout.width;
            setTrackWidth((prev) => (Math.abs(prev - w) < 0.5 ? prev : w));
          }}
          contentContainerStyle={{
            minHeight: contentHeight,
            paddingBottom: BANNER_AD_HEIGHT + bottomSafeOffset + 16,
          }}
        >
          <View style={{ height: contentHeight, direction: "ltr" }}>
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

              const pos = positions[index];
              const levelProgress = levelMap.get(stage.level);

              return (
                <StageNode
                  gameType={gameType}
                  key={stage.level}
                  level={stage.level}
                  name={stage.name}
                  unlocked={levelProgress?.unlocked ?? false}
                  completed={levelProgress?.completed ?? false}
                  stars={levelProgress?.stars ?? 0}
                  maxStars={levelProgress?.maxStars ?? 5}
                  isCurrent={stage.level === currentLevel}
                  onPress={() => {
                    triggerHaptic("light");
                    handleStagePress(stage.level);
                  }}
                  style={{
                    left: pos.x - NODE_CONTAINER_WIDTH / 2,
                    top: pos.y - NODE_RADIUS,
                  }}
                />
              );
            })}
          </View>
        </ScrollView>

        <StickerBookFloatingButton
          onPress={handleGoStickerBook}
          activeOpacity={0.8}
          style={{
            bottom: BANNER_AD_HEIGHT + bottomSafeOffset + 12,
          }}
        >
          <Ionicons
            name="book-outline"
            size={26}
            color={BASIC_COLORS.SECONDARY}
          />
        </StickerBookFloatingButton>

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
