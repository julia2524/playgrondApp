import React, { useState, useCallback } from "react";
import { ScrollView, TouchableOpacity, Dimensions, View } from "react-native";
import styled from "styled-components/native";
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from "@react-navigation/native";

import AppHeader from "../../components/common/AppHeader";
import { GameType, getAllUnlockedStickers } from "./utils/stickerStorage";

// ===== 데이터 풀 =====
import { CategoryGameObjects1 } from "../classification/category/constants/categoryPool";
import { RenderCategoryItemSvg } from "../classification/category/assets/categoryItemSvgs";

import { COLOR_ITEM_POOL } from "../classification/color/constants/colorPool";
import {
  BASIC_SHAPE_LIST,
  SHAPE_ITEM_POOL,
} from "../classification/shape/constants/shapePool";
import {
  RenderBasicShapeSvg,
  RenderShapeItemSvg,
} from "../classification/shape/assets/shapeItemSvgs";

import BannerAd from "../../services/BannerAd";
import { RenderColorItemSvg } from "../classification/color/assets/ColorItemSvgs";

const { width } = Dimensions.get("window");

// ---------- 탭 정의 ----------
const TABS: { id: GameType; label: string; icon: string }[] = [
  { id: "category", label: "친구 찾기", icon: "🥑" },
  { id: "color", label: "색깔 찾기", icon: "🎨" },
  { id: "shape", label: "모양 찾기", icon: "🔷" },
];

const STICKER_POOLS: Record<GameType, any[]> = {
  category: CategoryGameObjects1,
  color: COLOR_ITEM_POOL,
  shape: [...BASIC_SHAPE_LIST, ...SHAPE_ITEM_POOL],
};

// shape/color SVG들의 대략적인 원본 캔버스 크기 (대부분 viewBox 0 0 100 100, Svg width/height 90~100)
const NATIVE_ICON_SIZE = 100;

const ScaledIcon = ({
  size,
  children,
}: {
  size: number;
  children: React.ReactNode;
}) => {
  const scale = size / NATIVE_ICON_SIZE;
  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <View
        style={{
          width: NATIVE_ICON_SIZE,
          height: NATIVE_ICON_SIZE,
          transform: [{ scale }],
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default function IntegratedStickerGalleryScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const initialTab = route.params?.initialTab ?? "category";
  const [activeTab, setActiveTab] = useState<GameType>(initialTab);

  const [unlockedMap, setUnlockedMap] = useState<Record<GameType, string[]>>({
    color: [],
    shape: [],
    category: [],
  });

  // 화면 포커스 시 최신 해금 데이터 불러오기
  useFocusEffect(
    useCallback(() => {
      let isMounted = true;
      getAllUnlockedStickers().then((map) => {
        if (isMounted) setUnlockedMap(map);
      });
      return () => {
        isMounted = false;
      };
    }, []),
  );

  const currentList = STICKER_POOLS[activeTab] ?? [];
  const currentUnlockedList = unlockedMap[activeTab] ?? [];

  const unlockedCount = currentUnlockedList.length;
  const totalCount = currentList.length;
  const progressPercent =
    totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

  // 스티커 클릭 → 디테일 화면으로
  const handleStickerPress = (obj: { id: string; name: string }) => {
    const isUnlocked = currentUnlockedList.includes(obj.id);
    if (!isUnlocked) return;

    navigation.navigate("StickerDetailScreen", {
      gameType: activeTab,
      stickerId: obj.id,
      stickerName: obj.name,
    });
  };

  // ===== SVG 렌더 함수 (해금되었을 때만 원래 색상대로 렌더링) =====
  const renderStickerSvg = (
    itemId: string,
    size: number = 65,
    colorHex?: string,
  ) => {
    switch (activeTab) {
      case "color":
        return (
          <ScaledIcon size={size}>
            <RenderColorItemSvg
              shapeId={itemId}
              colorHex={colorHex ?? "#94A3B8"}
            />
          </ScaledIcon>
        );

      case "shape": {
        const isBasicShape = [
          "circle",
          "square",
          "triangle",
          "heart",
          "star",
        ].includes(itemId);

        return (
          <ScaledIcon size={size}>
            {isBasicShape ? (
              <RenderBasicShapeSvg shapeId={itemId} />
            ) : (
              <RenderShapeItemSvg itemId={itemId} />
            )}
          </ScaledIcon>
        );
      }
      case "category":
      default:
        return <RenderCategoryItemSvg itemId={itemId} size={size} />;
    }
  };

  const BOTTOM_SPACER = 40;

  return (
    <Container>
      <AppHeader
        onBack={() => navigation.goBack()}
        center={<HeaderTitle>📖 내 스티커북</HeaderTitle>}
      />

      {/* 1. 탭 */}
      <TabContainer>
        {TABS.map((tab) => (
          <TabButton
            key={tab.id}
            isActive={activeTab === tab.id}
            onPress={() => setActiveTab(tab.id)}
          >
            <TabIcon>{tab.icon}</TabIcon>
            <TabText isActive={activeTab === tab.id}>{tab.label}</TabText>
          </TabButton>
        ))}
      </TabContainer>

      {/* 2. 진행률 */}
      <ProgressCard>
        <ProgressInfoRow>
          <ProgressTitle>스티커 수집율</ProgressTitle>
          <ProgressCount>
            {unlockedCount} / {totalCount}개 ({progressPercent}%)
          </ProgressCount>
        </ProgressInfoRow>
        <ProgressBarBackground>
          <ProgressBarFill percent={progressPercent} />
        </ProgressBarBackground>
      </ProgressCard>

      {/* 3. 그리드 */}
      <ScrollView
        key={activeTab}
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <GridContainer>
          {currentList.map((item) => {
            const id = item.id;
            const name = item.name ?? item.label ?? item.id;
            const isUnlocked = currentUnlockedList.includes(id);

            return (
              <StickerCard
                key={id}
                isUnlocked={isUnlocked}
                activeOpacity={isUnlocked ? 0.7 : 1}
                onPress={() => handleStickerPress({ id, name })}
                disabled={!isUnlocked}
              >
                {isUnlocked ? (
                  <>
                    {/* 🔓 해금 상태: 원래 색상 이미지 + 이름 */}
                    <StickerImageArea>
                      {renderStickerSvg(id, 60)}
                    </StickerImageArea>
                    <StickerName numberOfLines={1}>{name}</StickerName>
                  </>
                ) : (
                  <>
                    {/* 🔒 미해금 이스터에그 상태: 궁금증 유발 물음표만! */}
                    <StickerImageArea>
                      <QuestionMark>❓</QuestionMark>
                    </StickerImageArea>
                    <LockedName>???</LockedName>
                  </>
                )}
              </StickerCard>
            );
          })}
        </GridContainer>

        <Spacer height={BOTTOM_SPACER} />
      </ScrollView>

      {/* 하단 광고 */}
      <BottomAdContainer>
        <BannerAd />
      </BottomAdContainer>
    </Container>
  );
}

// ---------- Styled Components ----------

const Container = styled.View`
  flex: 1;
  background-color: #f8fafc;
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #1e293b;
`;

const TabContainer = styled.View`
  flex-direction: row;
  padding: 12px 16px 4px 16px;
  justify-content: space-between;
`;

const TabButton = styled(TouchableOpacity)<{ isActive: boolean }>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px 0px;
  margin: 0 4px;
  border-radius: 16px;
  background-color: ${(props) => (props.isActive ? "#FFFFFF" : "#E2E8F0")};
  elevation: ${(props) => (props.isActive ? 4 : 0)};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: ${(props) => (props.isActive ? 0.08 : 0)};
  shadow-radius: 4px;
`;

const TabIcon = styled.Text`
  font-size: 16px;
  margin-right: 6px;
`;

const TabText = styled.Text<{ isActive: boolean }>`
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => (props.isActive ? "#0F172A" : "#64748B")};
`;

const ProgressCard = styled.View`
  margin: 12px 20px 8px 20px;
  padding: 14px 16px;
  background-color: #ffffff;
  border-radius: 18px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 6px;
  elevation: 2;
`;

const ProgressInfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const ProgressTitle = styled.Text`
  font-size: 13px;
  font-weight: bold;
  color: #475569;
`;

const ProgressCount = styled.Text`
  font-size: 13px;
  font-weight: bold;
  color: #2563eb;
`;

const ProgressBarBackground = styled.View`
  height: 10px;
  background-color: #f1f5f9;
  border-radius: 5px;
  overflow: hidden;
`;

const ProgressBarFill = styled.View<{ percent: number }>`
  height: 100%;
  width: ${(props) => props.percent}%;
  background-color: #3b82f6;
  border-radius: 5px;
`;

const GridContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const StickerCard = styled(TouchableOpacity)<{ isUnlocked: boolean }>`
  width: 30%;
  height: 110px;
  background-color: ${(props) => (props.isUnlocked ? "#FFFFFF" : "#F1F5F9")};
  border-radius: 18px;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  padding: 6px;
  elevation: ${(props) => (props.isUnlocked ? 3 : 0)};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: ${(props) => (props.isUnlocked ? 0.06 : 0)};
  shadow-radius: 4px;
  border-width: ${(props) => (props.isUnlocked ? 1.5 : 1)}px;
  border-color: ${(props) => (props.isUnlocked ? "#CBD5E1" : "#E2E8F0")};
  border-style: ${(props) => (props.isUnlocked ? "solid" : "dashed")};
`;

const StickerImageArea = styled.View`
  height: 68px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const QuestionMark = styled.Text`
  font-size: 32px;
  opacity: 0.6;
`;

const StickerName = styled.Text`
  font-size: 11px;
  color: #334155;
  margin-top: 6px;
  font-weight: bold;
  text-align: center;
`;

const LockedName = styled.Text`
  font-size: 11px;
  color: #94a3b8;
  margin-top: 6px;
  font-weight: bold;
`;

const Spacer = styled.View<{ height: number }>`
  height: ${(props) => props.height}px;
`;

const BottomAdContainer = styled.View`
  height: 60px;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #f8fafc;
  border-top-width: 1px;
  border-top-color: #e2e8f0;
`;
