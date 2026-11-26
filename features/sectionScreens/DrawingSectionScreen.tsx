import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Alert, Pressable, StatusBar, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
import Svg, { Circle, Ellipse, Path, Rect } from "react-native-svg";

import type { RootStackParamList } from "../../navigation/types";
import { AppText } from "../../utils/AppText";
import { BASIC_COLORS } from "../../design-system/tokens/colors";
import { useLanguage } from "../../context/LanguageContext";
import i18n from "../../i18n";
import { triggerHaptic } from "../../utils/haptic";

import AppHeader from "../../components/common/AppHeader";
import SettingButton from "../../components/common/SettingButton";
import BannerAd from "../../services/BannerAd";

import GradientBackground from "../../design-system/backgrounds/GradientBackground";
import DecorativeBackground from "../../design-system/backgrounds/DecorativeBackground";
import type { LayoutChangeEvent } from "react-native";
import PopEffect from "../../components/common/PopEffect";

import { TRACING_LINES } from "../tracing/paths/lineCatalog";

import { preloadTracingGameProgress } from "../tracing/storage/tracingProgressStorage";

// ==========================================
// Types
// ==========================================

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "DrawingSectionScreen"
>;

type DrawingType = "line" | "shape" | "object";

type BlobPosition = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
};

type DrawingItem = {
  type: DrawingType;
  color: string;
  borderColor: string;
  shadowColor: string;
  size: number;
  position: BlobPosition;
  titleKey: string;
  defaultTitle: string;
  descKey: string;
  defaultDesc: string;
  renderIcon: () => React.ReactNode;
};

const BANNER_AD_HEIGHT = 60;
// PopEffect(360ms)가 거의 끝난 뒤 이동
const NAVIGATE_DELAY = 300;

// ==========================================
// Drawing Items
// ==========================================

const DRAWING_ITEMS: DrawingItem[] = [
  {
    type: "line",
    color: "#F5C8AA",
    borderColor: "#FFF0E5",
    shadowColor: "#E5A984",
    size: 150,
    position: {
      top: "3%",
      left: "5%",
    },
    titleKey: "drawing_line_title",
    defaultTitle: "꼬불꼬불 선그리기",
    descKey: "drawing_line_desc",
    defaultDesc: "선을 따라 쭉쭉 그려볼까?",
    renderIcon: () => <LineDrawingIcon />,
  },
  {
    type: "shape",
    color: "#C9C0EA",
    borderColor: "#F3F0FF",
    shadowColor: "#A99DD4",
    size: 138,
    position: {
      top: "32%",
      right: "6%",
    },
    titleKey: "drawing_shape_title",
    defaultTitle: "알록달록 모양그리기",
    descKey: "drawing_shape_desc",
    defaultDesc: "동그라미, 세모, 네모!",
    renderIcon: () => <ShapeDrawingIcon />,
  },
  {
    type: "object",
    color: "#B7DCC8",
    borderColor: "#EDFAF1",
    shadowColor: "#8FBEA5",
    size: 146,
    position: {
      bottom: "5%",
      left: "13%",
    },
    titleKey: "drawing_object_title",
    defaultTitle: "재미있는 사물그리기",
    descKey: "drawing_object_desc",
    defaultDesc: "무엇을 그려볼까?",
    renderIcon: () => <ObjectDrawingIcon />,
  },
];

// ==========================================
// Screen
// ==========================================

export default function DrawingSectionScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  useLanguage();

  const navTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (navTimerRef.current) clearTimeout(navTimerRef.current);
    };
  }, []);

  const [selected, setSelected] = useState<DrawingType | null>(null);

  const [centers, setCenters] = useState<
    Partial<Record<DrawingType, { x: number; y: number }>>
  >({});

  const [burst, setBurst] = useState<{
    type: DrawingType;
    x: number;
    y: number;
    color: string;
  } | null>(null);

  const animations = useRef<Record<DrawingType, Animated.Value>>({
    line: new Animated.Value(1),
    shape: new Animated.Value(1),
    object: new Animated.Value(1),
  }).current;

  const opacities = useRef<Record<DrawingType, Animated.Value>>({
    line: new Animated.Value(1),
    shape: new Animated.Value(1),
    object: new Animated.Value(1),
  }).current;

  const headerOpacity = useRef(new Animated.Value(1)).current;
  const titleOpacity = useRef(new Animated.Value(1)).current;

  const bottomSafeOffset = Math.max(insets.bottom, 4);

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
      titleOpacity.setValue(1);

      // 그리기 놀이터에 들어온 순간 진행 상황 미리 불러오기
      void preloadTracingGameProgress(TRACING_LINES.length);

      return undefined;
    }, [animations, opacities, headerOpacity, titleOpacity]),
  );
  const handleSelect = (type: DrawingType) => {
    if (selected || burst) return;

    const center = centers[type];
    if (!center) return;

    const item = DRAWING_ITEMS.find((entry) => entry.type === type);
    if (!item) return;

    setSelected(type);
    triggerHaptic("light");

    setBurst({
      type,
      x: center.x,
      y: center.y,
      color: item.color,
    });

    const otherTypes = (["line", "shape", "object"] as DrawingType[]).filter(
      (item) => item !== type,
    );

    // 선택한 물감 방울: 눌림 → 팽창하며 동시에 투명해짐
    Animated.sequence([
      Animated.timing(animations[type], {
        toValue: 0.88,
        duration: 45,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(animations[type], {
          toValue: 1.15,
          duration: 65,
          useNativeDriver: true,
        }),
        Animated.timing(opacities[type], {
          toValue: 0,
          duration: 65,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // 선택하지 않은 물감 방울
    Animated.parallel([
      ...otherTypes.map((otherType) =>
        Animated.timing(opacities[otherType], {
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
      Animated.timing(titleOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
    // 선 그리기만 이동 (나머지는 아직 준비 중 안내)

    // if (type === "line") {
    //   navTimerRef.current = setTimeout(() => {
    //     navigation.navigate("TracingStageMapScreen", {
    //       gameType: "line",
    //     });
    //   }, NAVIGATE_DELAY);
    // }

    if (type === "line" || type === "shape") {
      navTimerRef.current = setTimeout(() => {
        navigation.navigate("TracingStageMapScreen", {
          gameType: type,
        });
      }, NAVIGATE_DELAY);
    }
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

  return (
    <ScreenContainer>
      <GradientBackground />
      <DecorativeBackground />

      <StatusBar barStyle="dark-content" backgroundColor="#FFF9F0" />

      {/* Header */}
      <Animated.View
        style={{
          opacity: headerOpacity,
          zIndex: 10,
        }}
      >
        <AppHeader
          onBack={handleBack}
          center={
            <HeaderCenter>
              <HeaderTitle>
                {i18n.t("section_drawing_title", {
                  defaultValue: "그리기 놀이터",
                })}
              </HeaderTitle>
            </HeaderCenter>
          }
          right={<SettingButton onPress={handleOpenSettings} />}
        />
      </Animated.View>

      {/* Title */}
      <Animated.View style={{ opacity: titleOpacity }}>
        <TitleArea>
          {/* <EyebrowText>MY LITTLE ART STUDIO</EyebrowText> */}

          <MainTitle>{i18n.t("drawing_section_headline")}</MainTitle>

          <GuideText>{i18n.t("drawing_section_guide")}</GuideText>
        </TitleArea>
      </Animated.View>

      {/* Paint Playground */}
      <PaintPlayground>
        {DRAWING_ITEMS.map((item) => (
          <PaintBlob
            key={item.type}
            item={item}
            scale={animations[item.type]}
            opacity={opacities[item.type]}
            selected={selected === item.type}
            onPress={() => handleSelect(item.type)}
            onLayout={(event) => {
              const { x, y, width } = event.nativeEvent.layout;

              setCenters((prev) => ({
                ...prev,
                [item.type]: {
                  x: x + width / 2,
                  y: y + item.size / 2,
                },
              }));
            }}
          />
        ))}

        {/* 작은 물감 장식 */}
        <PaintDot
          style={{
            top: "17%",
            right: "15%",
          }}
        />

        <PaintDotSmall
          style={{
            top: "25%",
            left: "39%",
          }}
        />

        <PaintDot
          style={{
            bottom: "22%",
            right: "13%",
          }}
        />

        <PaintDotSmall
          style={{
            bottom: "15%",
            right: "37%",
          }}
        />

        <CenterSparkle
          style={{
            top: "48%",
            left: "43%",
          }}
        >
          <Svg width="38" height="38" viewBox="0 0 38 38">
            <Path
              d="M19 2 C21 13 25 17 36 19 C25 21 21 25 19 36 C17 25 13 21 2 19 C13 17 17 13 19 2Z"
              fill="#F5D9A9"
            />
          </Svg>
        </CenterSparkle>
        {burst && (
          <PopEffect
            x={burst.x}
            y={burst.y}
            color={burst.color}
            variant="paint"
            onComplete={() => {
              const type = burst.type;
              setBurst(null);

              // 선 그리기와 모양 그리기는 스테이지 맵으로 이동
              if (type === "line" || type === "shape") {
                return;
              }

              // 사물 그리기는 아직 준비 중
              Alert.alert("재미있는 사물그리기", "준비 중이에요!");
            }}
            // onComplete={() => {
            //   const type = burst.type;
            //   setBurst(null);

            //   // 선 그리기는 타이머에서 이미 이동 처리됨
            //   if (type === "line") return;

            //   const activity = DRAWING_ITEMS.find((item) => item.type === type);

            //   Alert.alert(
            //     activity
            //       ? i18n.t(activity.titleKey, {
            //           defaultValue: activity.defaultTitle,
            //         })
            //       : "그리기 놀이터",
            //     "준비 중이에요!",
            //   );
            // }}
          />
        )}
      </PaintPlayground>

      {/* Bottom Banner */}
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
// Paint Blob
// ==========================================

interface PaintBlobProps {
  item: DrawingItem;
  scale: Animated.Value;
  opacity: Animated.Value;
  selected: boolean;
  onPress: () => void;
  onLayout: (event: LayoutChangeEvent) => void;
}

function PaintBlob({
  item,
  scale,
  opacity,
  selected,
  onPress,
  onLayout,
}: PaintBlobProps) {
  const title = i18n.t(item.titleKey, {
    defaultValue: item.defaultTitle,
  });

  const description = i18n.t(item.descKey, {
    defaultValue: item.defaultDesc,
  });

  return (
    <BlobPosition
      onLayout={onLayout}
      style={[
        item.position as object,
        {
          zIndex: selected ? 30 : 2,
          elevation: selected ? 30 : 2,
        },
      ]}
    >
      <BlobGroup
        style={{
          opacity: selected ? 1 : opacity,
        }}
      >
        <BlobPressable
          onPress={onPress}
          disabled={selected}
          accessibilityRole="button"
          accessibilityLabel={title}
        >
          <BlobCircle
            style={{
              width: item.size,
              height: item.size,
              opacity: selected ? opacity : 1,
              shadowColor: item.shadowColor,
              elevation: selected ? 25 : 8,
              transform: [{ scale }],
            }}
          >
            <BlobShape color={item.color} borderColor={item.borderColor} />

            <BlobHighlight />

            <BlobIconArea>{item.renderIcon()}</BlobIconArea>

            <BlobShine />
            <BlobShineSmall />
          </BlobCircle>
        </BlobPressable>

        <BlobLabel style={{ opacity: selected ? 0 : 1 }}>
          <BlobTitle>{title}</BlobTitle>
          <BlobDescription>{description}</BlobDescription>
        </BlobLabel>
      </BlobGroup>
    </BlobPosition>
  );
}

// ==========================================
// Blob Shape
// ==========================================

function BlobShape({
  color,
  borderColor,
}: {
  color: string;
  borderColor: string;
}) {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 160 160"
      style={{ position: "absolute" }}
    >
      <Path
        d="
          M80 7
          C96 4 108 13 119 23
          C135 28 149 42 151 58
          C159 75 151 94 143 108
          C139 126 123 138 106 143
          C90 155 70 153 54 146
          C35 144 20 131 16 113
          C4 99 5 79 12 62
          C14 43 28 29 45 23
          C55 11 66 8 80 7 Z
        "
        fill={color}
        stroke={borderColor}
        strokeWidth="5"
      />
    </Svg>
  );
}

function BlobHighlight() {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 160 160"
      style={{ position: "absolute" }}
    >
      <Ellipse
        cx="48"
        cy="31"
        rx="23"
        ry="8"
        fill="rgba(255,255,255,0.40)"
        transform="rotate(-28 48 31)"
      />
      <Ellipse
        cx="40"
        cy="48"
        rx="11"
        ry="4"
        fill="rgba(255,255,255,0.28)"
        transform="rotate(-28 40 48)"
      />
      <Path
        d="M47 133 Q80 148 111 130"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}

// ==========================================
// Activity Icons
// ==========================================

export function LineDrawingIcon() {
  return (
    <Svg width="76" height="76" viewBox="0 0 76 76">
      <Path
        d="M10 48 C19 12 34 65 45 34 S61 26 65 14"
        stroke="#FFFDF8"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="2 7"
        fill="none"
      />

      <Path
        d="M48 12 L65 14 L60 31"
        stroke="#FFFDF8"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <Circle cx="10" cy="48" r="5" fill="#FFFDF8" />
    </Svg>
  );
}

function ShapeDrawingIcon() {
  return (
    <Svg width="76" height="76" viewBox="0 0 76 76">
      <Circle cx="19" cy="45" r="12" fill="#FFF2C8" />

      <Path d="M49 14 L66 45 L32 45 Z" fill="#F9E3E9" />

      <Rect x="42" y="51" width="23" height="17" rx="5" fill="#E4F4E9" />
    </Svg>
  );
}

function ObjectDrawingIcon() {
  return (
    <Svg width="76" height="76" viewBox="0 0 76 76">
      <Path
        d="M38 24 C18 12 10 33 21 49 C29 61 47 63 56 47 C66 29 50 16 38 24Z"
        fill="#FFF1DF"
      />

      <Path
        d="M38 24 C38 14 45 10 51 12"
        stroke="#FFFDF8"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      <Path d="M42 20 Q53 6 59 16 Q51 25 42 20Z" fill="#E8F3D9" />

      <Circle cx="28" cy="35" r="2" fill="#E7A89A" />
    </Svg>
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

const HeaderCenter = styled.View`
  align-items: center;
  justify-content: center;
`;

const HeaderTitle = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.subheading}px;
  color: ${BASIC_COLORS.TEXT_MAIN};
  text-align: center;
`;

const TitleArea = styled.View`
  align-items: center;
  padding-horizontal: 20px;
  margin-top: 12px;
  z-index: 5;
`;

const EyebrowText = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  color: #d2a98b;
  font-size: 10px;
  letter-spacing: 2px;
  margin-bottom: 7px;
`;

const MainTitle = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.title}px;
  font-weight: 900;
  color: ${BASIC_COLORS.TEXT_MAIN};
  text-align: center;
`;

const GuideText = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.body}px;
  color: #999188;
  margin-top: 7px;
`;

const PaintPlayground = styled.View`
  flex: 1;
  position: relative;
  margin-top: 5px;
  overflow: visible;
`;

const BlobPosition = styled(Animated.View)`
  position: absolute;
`;

const BlobGroup = styled(Animated.View)`
  align-items: center;
`;

const BlobPressable = styled(Pressable)`
  align-items: center;
  justify-content: center;
`;

const BlobCircle = styled(Animated.View)`
  align-items: center;
  justify-content: center;
  shadow-offset: 0px 9px;
  shadow-opacity: 0.25;
  shadow-radius: 12px;
`;

const BlobIconArea = styled.View`
  align-items: center;
  justify-content: center;
`;

const BlobShine = styled.View`
  position: absolute;
  width: 9px;
  height: 9px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  top: 23%;
  right: 22%;
`;

const BlobShineSmall = styled.View`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.8);
  top: 31%;
  right: 17%;
`;

const BlobLabel = styled(Animated.View)`
  align-items: center;
  margin-top: 9px;
  width: 175px;
`;

const BlobTitle = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  color: ${BASIC_COLORS.TEXT_MAIN};
  font-size: 14px;
  font-weight: 800;
  text-align: center;
`;

const BlobDescription = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  color: #969087;
  font-size: 11px;
  text-align: center;
  margin-top: 3px;
`;

const PaintDot = styled(Animated.View)`
  position: absolute;
  width: 13px;
  height: 13px;
  border-radius: 10px;
  background-color: rgba(245, 200, 170, 0.55);
`;

const PaintDotSmall = styled(Animated.View)`
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 5px;
  background-color: rgba(201, 192, 234, 0.65);
`;

const CenterSparkle = styled(Animated.View)`
  position: absolute;
  opacity: 0.75;
`;

const BannerAdContainer = styled.View`
  min-height: 60px;
  align-items: center;
  justify-content: center;
  background-color: ${BASIC_COLORS.CARD_BG};
`;
