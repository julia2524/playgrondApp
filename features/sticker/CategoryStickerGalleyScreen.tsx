import React, { useState, useCallback } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import AppHeader from "../../components/common/AppHeader";
import { getUnlockedStickers, GameType } from "./utils/stickerStorage";
import { CategoryGameObjects1 } from "../classification/category/constants/categoryPool";
import { CategoryGameObject } from "../classification/category/type/types";
import { RenderCategoryItemSvg } from "../classification/category/assets/categoryItemSvgs";

// ---------- 상단 모드 탭 정의 ----------
const GAME_TABS: { id: GameType; label: string; icon: string }[] = [
  { id: "category", label: "친구 찾기", icon: "🥑" },
  { id: "color", label: "색깔 찾기", icon: "🎨" },
  { id: "shape", label: "모양 찾기", icon: "🔷" },
];

// ---------- 실제 데이터 기반 색상 계열 ----------
const COLOR_FAMILIES = [
  "natural",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "pink",
  "brown",
  "gray",
  "white",
  "black",
] as const;

type ColorFamily = (typeof COLOR_FAMILIES)[number];

const categoryStickerKeys1 = [
  "sparrow",
  "corn",
  "broccoli",
  "mushroom",
  "stingray",
  "dog",
  "cat",
  "rabbit",
  "chicken",
  "duck",
  "penguin",
  "whale",
  "shark",
  "octopus",
  "squid",
  "apple",
  "banana",
  "strawberry",
  "watermelon",
  "carrot",
  "cucumber",
  "tomato",
  "rice",
  "gimbap",
  "pizza",
  "hamburger",
  "cake",
  "cookie",
  "iceCream",
  "car",
  "bus",
  "train",
  "airplane",
  "ship",
  "bicycle",
  "helicopter",
  "boat",
  "candy",
  "donut",
  "chocolate",
  "pig",
  "bear",
  "cow",
  "owl",
  "parrot",
  "jellyfish",
  "crab",
  "grape",
  "tangerine",
  "peach",
  "eggplant",
  "chili",
  "pumpkin",
  "soup",
  "sandwich",
  "dumpling",
  "submarine",
  "rocket",
  "hotAirBalloon",
  "truck",
  "excavator",
  "subway",
];

// ---------- 색상 거리 유틸 ----------
function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

function colorDistance(hexA: string, hexB: string): number {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  const rmean = (a.r + b.r) / 2;
  const dr = a.r - b.r;
  const dg = a.g - b.g;
  const db = a.b - b.b;
  return Math.sqrt(
    (2 + rmean / 256) * dr * dr +
      4 * dg * dg +
      (2 + (255 - rmean) / 256) * db * db,
  );
}

function getRepresentativeHex(familyId: string): string {
  for (const obj of CategoryGameObjects1) {
    const match = obj.variants.find((v) => v.id === familyId);
    if (match) return match.primary;
  }
  return "#CCCCCC";
}

function resolveVariantHex(
  obj: CategoryGameObject,
  familyId: ColorFamily,
): string | undefined {
  if (familyId === "natural") return undefined;

  const exact = obj.variants.find((v) => v.id === familyId);
  if (exact) return exact.primary;

  const representative = getRepresentativeHex(familyId);
  let closest = obj.variants[0];
  let closestDist = colorDistance(closest.primary, representative);
  for (const v of obj.variants) {
    const d = colorDistance(v.primary, representative);
    if (d < closestDist) {
      closest = v;
      closestDist = d;
    }
  }
  return closest.primary;
}

const sampleColors: { id: ColorFamily; hex: string }[] = COLOR_FAMILIES.map(
  (id) => ({
    id,
    hex: id === "natural" ? "natural" : getRepresentativeHex(id),
  }),
);

export default function CategoryStickerGalleyScreen() {
  const navigation = useNavigation<any>();
  const [selectedTab, setSelectedTab] = useState<GameType>("category");
  const [selectedFamily, setSelectedFamily] = useState<ColorFamily>("natural");
  const [unlockedStickers, setUnlockedStickers] = useState<string[]>([]);

  // 💡 선택된 탭(selectedTab)이 바뀔 때마다 해당 게임 모드의 해금 스티커 불러오기
  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      getUnlockedStickers(selectedTab).then((list) => {
        if (isMounted) {
          setUnlockedStickers(list);
        }
      });

      return () => {
        isMounted = false;
      };
    }, [selectedTab]),
  );

  return (
    <Container>
      <AppHeader
        onBack={() => navigation.goBack()}
        center={
          <HeaderTitle>
            📖 통합 스티커북 ({unlockedStickers.length}/
            {categoryStickerKeys1.length})
          </HeaderTitle>
        }
      />

      {/* 1. 상단 게임 모드 선택 탭 */}
      <TabContainer>
        {GAME_TABS.map((tab) => (
          <ModeTabButton
            key={tab.id}
            isSelected={selectedTab === tab.id}
            onPress={() => setSelectedTab(tab.id)}
          >
            <ModeTabText isSelected={selectedTab === tab.id}>
              {tab.icon} {tab.label}
            </ModeTabText>
          </ModeTabButton>
        ))}
      </TabContainer>

      {/* 2. 색상 선택 바 */}
      <ColorPickerBar>
        {sampleColors.map(({ id, hex }) => (
          <ColorButton
            key={id}
            color={id === "natural" ? "#FFFFFF" : hex}
            isSelected={selectedFamily === id}
            onPress={() => setSelectedFamily(id)}
          />
        ))}
      </ColorPickerBar>

      {/* 3. 스티커 그리드 목록 */}
      <ScrollView contentContainerStyle={{}}>
        <GridContainer>
          {categoryStickerKeys1.map((key) => {
            const obj = CategoryGameObjects1.find((o) => o.id === key);
            const isUnlocked = unlockedStickers.includes(key);
            const colorHex = obj
              ? resolveVariantHex(obj, selectedFamily)
              : undefined;

            return (
              <StickerCard key={key} isUnlocked={isUnlocked}>
                {isUnlocked ? (
                  <>
                    <RenderCategoryItemSvg itemId={key} colorHex={colorHex} />
                    <StickerName>{obj?.name ?? key}</StickerName>
                  </>
                ) : (
                  <LockedContainer>
                    <RenderCategoryItemSvg itemId={key} colorHex="#CBD5E1" />
                    <LockBadge>🔒</LockBadge>
                    <StickerName style={{ color: "#94A3B8" }}>???</StickerName>
                  </LockedContainer>
                )}
              </StickerCard>
            );
          })}
        </GridContainer>
      </ScrollView>
    </Container>
  );
}

// ---------- Styled Components ----------

const Container = styled.View`
  flex: 1;
  background-color: #f8fafc;
  padding-bottom: 10px;
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #334155;
`;

const TabContainer = styled.View`
  flex-direction: row;
  padding: 12px 16px 4px 16px;
  justify-content: space-between;
`;

const ModeTabButton = styled(TouchableOpacity)<{ isSelected: boolean }>`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  margin: 0 4px;
  border-radius: 14px;
  background-color: ${(props) => (props.isSelected ? "#3B82F6" : "#E2E8F0")};
`;

const ModeTabText = styled.Text<{ isSelected: boolean }>`
  font-size: 13px;
  font-weight: bold;
  color: ${(props) => (props.isSelected ? "#FFFFFF" : "#64748B")};
`;

const ColorPickerBar = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px 16px;
  margin: 10px 16px 0 16px;
  border-radius: 16px;
  justify-content: space-between;
`;

const ColorButton = styled(TouchableOpacity)<{
  color: string;
  isSelected: boolean;
}>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${(props) => props.color};
  border-width: ${(props) => (props.isSelected ? "2.5px" : "1px")};
  border-color: ${(props) => (props.isSelected ? "#1E293B" : "#CBD5E1")};
`;

const GridContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const StickerCard = styled.View<{ isUnlocked: boolean }>`
  width: 30%;
  aspect-ratio: 1;
  background-color: ${(props) =>
    props.isUnlocked ? "#FFFFFF" : "rgba(241, 245, 249, 0.7)"};
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  padding: 8px;
  elevation: ${(props) => (props.isUnlocked ? 3 : 0)};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: ${(props) => (props.isUnlocked ? 0.05 : 0)};
  shadow-radius: 4px;
`;

const LockedContainer = styled.View`
  align-items: center;
  justify-content: center;
  opacity: 0.5;
`;

const LockBadge = styled.Text`
  position: absolute;
  font-size: 18px;
`;

const StickerName = styled.Text`
  font-size: 11px;
  color: #64748b;
  margin-top: 6px;
  font-weight: bold;
`;
