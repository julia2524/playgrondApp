import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Pressable, StatusBar } from "react-native";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";

import type { RootStackParamList } from "../../navigation/types";
import { AppText } from "../../utils/AppText";
import { BASIC_COLORS } from "../../design-system/tokens/colors";
import { useLanguage } from "../../context/LanguageContext";
import i18n from "../../i18n";

import AppHeader from "../../components/common/AppHeader";
import SettingButton from "../../components/common/SettingButton";
import BannerAd from "../../services/BannerAd";

import {
  ClayCategoryIcon,
  ClayColorIcon,
  ClayShapeIcon,
} from "../../components/icons/ClayGameIcons";

import { triggerHaptic } from "../../utils/haptic";
import GradientBackground from "../../design-system/backgrounds/GradientBackground";
import DecorativeBackground from "../../design-system/backgrounds/DecorativeBackground";

import type { LayoutChangeEvent } from "react-native";
import PopEffect from "../../components/common/PopEffect";
import { preloadGameProgress } from "../classification/progress/progressStorage";

// ==========================================
// Navigation
// ==========================================

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ClassificationSectionScreen"
>;

type GameType = "color" | "shape" | "category";

const BANNER_AD_HEIGHT = 60;
// PopEffect(360ms)가 거의 끝난 뒤 이동. 더 보고 싶으면 360까지 올려도 돼요
const NAVIGATE_DELAY = 300;

// ==========================================
// Screen
// ==========================================

export default function ClassificationSectionScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  useLanguage();
  const navTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (navTimerRef.current) clearTimeout(navTimerRef.current);
    };
  }, []);
  const [selected, setSelected] = useState<GameType | null>(null);

  const [centers, setCenters] = useState<
    Partial<Record<GameType, { x: number; y: number }>>
  >({});

  const [burst, setBurst] = useState<{
    x: number;
    y: number;
    color: string;
  } | null>(null);

  const animations = useRef({
    color: new Animated.Value(1),
    shape: new Animated.Value(1),
    category: new Animated.Value(1),
  }).current;

  const opacities = useRef({
    color: new Animated.Value(1),
    shape: new Animated.Value(1),
    category: new Animated.Value(1),
  }).current;

  const headerOpacity = useRef(new Animated.Value(1)).current;
  const footerOpacity = useRef(new Animated.Value(1)).current;

  // ========================================
  // Focus 시 선택 애니메이션 초기화
  // ========================================

  useFocusEffect(
    useCallback(() => {
      setSelected(null);
      setBurst(null);

      Object.values(animations).forEach((animation) => {
        animation.setValue(1);
      });

      Object.values(opacities).forEach((opacity) => {
        opacity.setValue(1);
      });

      headerOpacity.setValue(1);
      footerOpacity.setValue(1);

      // 분류게임 진행도 미리 불러오기
      void Promise.all([
        preloadGameProgress("color"),
        preloadGameProgress("shape"),
        preloadGameProgress("category"),
      ]);

      return undefined;
    }, [animations, opacities, headerOpacity, footerOpacity]),
  );
  const goToGame = (gameType: GameType) => {
    if (selected || burst) return;

    const center = centers[gameType];
    if (!center) return;

    setSelected(gameType);
    triggerHaptic("light");

    setBurst({
      x: center.x,
      y: center.y,
      color:
        gameType === "color"
          ? "#F6CDB2"
          : gameType === "shape"
            ? "#C9C1ED"
            : "#B5DFD1",
    });

    const otherTypes = (["color", "shape", "category"] as GameType[]).filter(
      (type) => type !== gameType,
    );

    // 선택한 버블: 눌림 → 팽창 → 즉시 소멸
    Animated.sequence([
      Animated.timing(animations[gameType], {
        toValue: 0.88,
        duration: 45,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(animations[gameType], {
          toValue: 1.15,
          duration: 65,
          useNativeDriver: true,
        }),
        Animated.timing(opacities[gameType], {
          toValue: 0,
          duration: 65,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // 선택하지 않은 버블과 화면 요소
    Animated.parallel([
      ...otherTypes.map((type) =>
        Animated.timing(opacities[type], {
          toValue: 0,
          duration: 170,
          useNativeDriver: true,
        }),
      ),
      Animated.timing(headerOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(footerOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
    // 버블 터지는 효과가 보인 뒤 이동
    navTimerRef.current = setTimeout(() => {
      navigation.navigate("StageMapScreen", { gameType });
    }, NAVIGATE_DELAY);
  };

  const handleBack = () => {
    if (selected) return;

    triggerHaptic("light");
    navigation.navigate("Home");
  };

  const handleOpenSettings = () => {
    if (selected) return;

    triggerHaptic("light");
    navigation.navigate("SettingScreen" as never);
  };

  const bottomSafeOffset = Math.max(insets.bottom, 4);

  return (
    <ScreenContainer>
      <GradientBackground />
      <DecorativeBackground />
      <StatusBar barStyle="dark-content" backgroundColor="#FFF9F0" />

      {/* StageMap과 동일한 헤더 */}
      <Animated.View style={{ opacity: headerOpacity, zIndex: 5 }}>
        <AppHeader
          onBack={handleBack}
          center={
            <StageMapHeaderCenter>
              <StageMapTitle>
                {i18n.t("section_classification_title", {
                  defaultValue: "분류 놀이터",
                })}
              </StageMapTitle>
            </StageMapHeaderCenter>
          }
          right={<SettingButton onPress={handleOpenSettings} />}
        />
      </Animated.View>

      {/* 타이틀 */}
      <TitleArea style={{ opacity: headerOpacity }}>
        <MainTitleText>
          {i18n.t("classification_select_title", {
            defaultValue: "무엇을 찾아볼까?",
          })}
        </MainTitleText>

        <DescriptionText>
          {i18n.t("classification_bubble_desc", {
            defaultValue: "마음에 드는 비눗방울을 톡!",
          })}
        </DescriptionText>
      </TitleArea>

      {/* 비눗방울 놀이터 */}
      <Playground>
        {/* 색깔 분류 */}
        <Bubble
          type="color"
          scale={animations.color}
          opacity={opacities.color}
          selected={selected === "color"}
          onPress={() => goToGame("color")}
          size={146}
          color="#F6CDB2"
          borderColor="#FFF4E9"
          shadowColor="#E7B493"
          position={{ top: "3%", left: "6%" }}
          title={i18n.t("game_color_title")}
          subtitle={i18n.t("game_color_desc")}
          onLayout={(event) => {
            const { x, y, width } = event.nativeEvent.layout;
            setCenters((prev) => ({
              ...prev,
              color: { x: x + width / 2, y: y + 73 },
            }));
          }}
        />

        {/* 모양 분류 */}
        <Bubble
          type="shape"
          scale={animations.shape}
          opacity={opacities.shape}
          selected={selected === "shape"}
          onPress={() => goToGame("shape")}
          size={134}
          color="#C9C1ED"
          borderColor="#F4F1FF"
          shadowColor="#A69BD7"
          position={{ top: "32%", right: "7%" }}
          title={i18n.t("game_shape_title")}
          subtitle={i18n.t("game_shape_desc")}
          onLayout={(event) => {
            const { x, y, width } = event.nativeEvent.layout;
            setCenters((prev) => ({
              ...prev,
              shape: { x: x + width / 2, y: y + 67 },
            }));
          }}
        />

        {/* 사물 분류 */}
        <Bubble
          type="category"
          scale={animations.category}
          opacity={opacities.category}
          selected={selected === "category"}
          onPress={() => goToGame("category")}
          size={140}
          color="#B5DFD1"
          borderColor="#EDFAF4"
          shadowColor="#8FC6B3"
          position={{ bottom: "5%", left: "12%" }}
          title={i18n.t("game_category_title")}
          subtitle={i18n.t("game_category_desc")}
          onLayout={(event) => {
            const { x, y, width } = event.nativeEvent.layout;
            setCenters((prev) => ({
              ...prev,
              category: { x: x + width / 2, y: y + 70 },
            }));
          }}
        />
        {burst && (
          <PopEffect
            x={burst.x}
            y={burst.y}
            color={burst.color}
            variant="bubble"
            onComplete={() => {
              const gameType = selected;
              setBurst(null);

              if (gameType) {
                navigation.navigate("StageMapScreen", { gameType });
              }
            }}
          />
        )}
      </Playground>

      {/* StageMap과 동일한 하단 고정 배너 광고 */}
      <BannerAdContainer
        style={{
          height: BANNER_AD_HEIGHT + bottomSafeOffset,
          paddingBottom: bottomSafeOffset,
        }}
      >
        <BannerAd />
      </BannerAdContainer>
    </ScreenContainer>
  );
}

// ==========================================
// Bubble Component
// ==========================================

interface BubbleProps {
  type: GameType;
  scale: Animated.Value;
  opacity: Animated.Value;
  selected: boolean;
  onPress: () => void;
  size: number;
  color: string;
  borderColor: string;
  shadowColor: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  title: string;
  subtitle: string;
  onLayout: (event: LayoutChangeEvent) => void;
}

function Bubble({
  type,
  scale,
  opacity,
  selected,
  onPress,
  size,
  color,
  borderColor,
  shadowColor,
  position,
  title,
  subtitle,
  onLayout,
}: BubbleProps) {
  const Icon =
    type === "color"
      ? ClayColorIcon
      : type === "shape"
        ? ClayShapeIcon
        : ClayCategoryIcon;

  return (
    <BubblePosition
      onLayout={onLayout}
      style={[
        position as object,
        {
          zIndex: selected ? 30 : 1,
          elevation: selected ? 30 : 1,
        },
      ]}
    >
      <BubbleGroup
        style={{
          opacity: selected ? 1 : opacity,
        }}
      >
        <BubblePressable
          onPress={onPress}
          disabled={selected}
          accessibilityRole="button"
          accessibilityLabel={title}
        >
          <BubbleCircle
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: color,
              borderColor,
              shadowColor,
              elevation: selected ? 20 : 8,
              opacity: selected ? opacity : 1,
              transform: [{ scale }],
            }}
          >
            {/* 버블 내부 반사광 */}
            <BubbleReflection />
            <BubbleReflectionSmall />

            {/* 3D 클레이 아이콘 */}
            <IconArea>
              <Icon size={type === "color" ? 72 : 66} />
            </IconArea>

            {/* 빛나는 점 & 하단 반사광 */}
            <BubbleShine />
            <BubbleShineSmall />
            <BubbleBottomShine />
          </BubbleCircle>
        </BubblePressable>

        <BubbleLabel style={{ opacity: selected ? 0 : 1 }}>
          <BubbleTitle>{title}</BubbleTitle>
          <BubbleSubtitle>{subtitle}</BubbleSubtitle>
        </BubbleLabel>
      </BubbleGroup>
    </BubblePosition>
  );
}

// ==========================================
// Styles
// ==========================================

const ScreenContainer = styled.View`
  flex: 1;
  background-color: #fff9f0;
  overflow: hidden;
`;

const BackgroundDecor = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const SoftCircleOne = styled.View`
  position: absolute;
  width: 230px;
  height: 230px;
  border-radius: 115px;
  background-color: #fde8d9;
  top: 18%;
  right: -125px;
  opacity: 0.6;
`;

const SoftCircleTwo = styled.View`
  position: absolute;
  width: 190px;
  height: 190px;
  border-radius: 95px;
  background-color: #e3f3f8;
  bottom: 12%;
  left: -110px;
  opacity: 0.8;
`;

const SoftCircleThree = styled.View`
  position: absolute;
  width: 130px;
  height: 130px;
  border-radius: 65px;
  background-color: #eee9ff;
  top: 54%;
  left: 40%;
  opacity: 0.45;
`;

interface DecorBubbleProps {
  $size: number;
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
}

const DecorBubble = styled.View<DecorBubbleProps>`
  position: absolute;
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  border-radius: ${(props) => props.$size / 2}px;
  border-width: 1.5px;
  border-color: rgba(126, 190, 214, 0.38);
  background-color: rgba(255, 255, 255, 0.35);
  ${(props) => (props.$top ? `top: ${props.$top};` : "")}
  ${(props) => (props.$bottom ? `bottom: ${props.$bottom};` : "")}
  ${(props) => (props.$left ? `left: ${props.$left};` : "")}
  ${(props) => (props.$right ? `right: ${props.$right};` : "")}
`;

const HeaderLabel = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  padding-horizontal: 14px;
  padding-vertical: 8px;
  border-radius: 30px;
  background-color: #e6f5fa;
`;

const HeaderLabelText = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 12px;
  color: #5b99b2;
`;

const TitleArea = styled(Animated.View)`
  align-items: center;
  margin-top: 10px;
  z-index: 5;
`;

const EyebrowText = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  color: #e99d77;
  font-size: 11px;
  letter-spacing: 2px;
  margin-bottom: 6px;
`;

const MainTitleText = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  color: ${BASIC_COLORS.TEXT_MAIN};
  font-size: ${(props) => props.theme.typography.title}px;
  text-align: center;
`;

const DescriptionText = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  color: #96948e;
  font-size: ${(props) => props.theme.typography.body}px;
  margin-top: 6px;
`;

const Playground = styled.View`
  flex: 1;
  position: relative;
  margin-top: 4px;
`;

const BubblePosition = styled.View`
  position: absolute;
`;

const BubbleGroup = styled(Animated.View)`
  align-items: center;
`;

const BubblePressable = styled(Pressable)`
  align-items: center;
  justify-content: center;
`;

const BubbleCircle = styled(Animated.View)`
  border-width: 3.5px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  shadow-offset: 0px 9px;
  shadow-opacity: 0.25;
  shadow-radius: 12px;
`;

const BubbleReflection = styled.View`
  position: absolute;
  width: 55%;
  height: 17%;
  border-radius: 50px;
  background-color: rgba(255, 255, 255, 0.55);
  top: 12%;
  left: 12%;
  transform: rotate(-30deg);
`;

const BubbleReflectionSmall = styled.View`
  position: absolute;
  width: 30%;
  height: 9%;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.32);
  top: 27%;
  left: 15%;
  transform: rotate(-30deg);
`;

const IconArea = styled.View`
  align-items: center;
  justify-content: center;
`;

const BubbleShine = styled.View`
  position: absolute;
  width: 11px;
  height: 11px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.92);
  top: 20%;
  right: 22%;
`;

const BubbleShineSmall = styled.View`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.85);
  top: 30%;
  right: 17%;
`;

const BubbleBottomShine = styled.View`
  position: absolute;
  width: 48%;
  height: 5px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.3);
  bottom: 12%;
`;

const BubbleLabel = styled(Animated.View)`
  align-items: center;
  margin-top: 10px;
  width: 176px;
`;

const BubbleTitle = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  color: ${BASIC_COLORS.TEXT_MAIN};
  font-size: 15px;
  text-align: center;
`;

const BubbleSubtitle = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  color: #95928b;
  font-size: 11px;
  text-align: center;
  margin-top: 3px;
`;

const CenterDecoration = styled(Animated.View)`
  position: absolute;
  top: 45%;
  left: 50%;
  align-items: center;
  transform: translateX(-27px);
`;

const CenterBubble = styled.View`
  width: 54px;
  height: 54px;
  border-radius: 27px;
  background-color: #e2f4fa;
  border-width: 2.5px;
  border-color: #ffffff;
  align-items: center;
  justify-content: center;
  elevation: 3;
  shadow-color: #b2d4e0;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.25;
  shadow-radius: 6px;
`;

const CenterText = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  color: #6ab0ca;
  font-size: 11px;
  margin-top: 5px;
`;

const FooterArea = styled(Animated.View)`
  align-items: center;
  padding-bottom: 10px;
  padding-top: 4px;
  z-index: 5;
`;

const FooterBubble = styled.View`
  width: 34px;
  height: 34px;
  border-radius: 17px;
  background-color: #e6f5fa;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
`;

const FooterText = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  color: #a39e93;
  font-size: 12px;
`;

const BannerAdContainer = styled.View`
  min-height: 60px;
  align-items: center;
  justify-content: center;
  background-color: ${BASIC_COLORS.CARD_BG};
`;

export const StageMapHeaderCenter = styled.View`
  align-items: center;
  justify-content: center;
`;

export const StageMapTitle = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.subheading}px;
  color: ${BASIC_COLORS.TEXT_MAIN};
  text-align: center;
`;
