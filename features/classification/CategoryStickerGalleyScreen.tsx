import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import AppHeader from "../../components/common/AppHeader";
import { RenderCategoryItemSvg } from "./category/assets/categoryItemSvgs";
import { CategoryGameObjects1 } from "./category/constants/categoryPool";
import { CategoryGameObject } from "./category/type/types";

// ---------- 색상 거리 유틸 (generator와 동일 로직) ----------
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

// ---------- 실제 데이터 기반 색상 계열 ----------
// 데이터에 자주 등장하는 variant id들 (필요하면 자유롭게 추가/삭제)
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

// 해당 계열 id를 가진 variant를 데이터 전체에서 찾아 대표 hex로 사용 (버튼 스와치용)
function getRepresentativeHex(familyId: string): string {
  for (const obj of CategoryGameObjects1) {
    const match = obj.variants.find((v) => v.id === familyId);
    if (match) return match.primary;
  }
  return "#CCCCCC"; // 데이터에 아예 없는 계열이면 회색으로 폴백
}

// 오브젝트별로 "이 계열에 가장 알맞은 variant"를 찾아 실제 hex 반환
function resolveVariantHex(
  obj: CategoryGameObject,
  familyId: ColorFamily,
): string | undefined {
  if (familyId === "natural") return undefined; // 컴포넌트 기본색 사용

  // 1순위: id가 정확히 일치하는 variant
  const exact = obj.variants.find((v) => v.id === familyId);
  if (exact) return exact.primary;

  // 2순위: 대표색과 가장 색이 비슷한 variant
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

// 버튼에 쓸 {id, 대표hex} 목록 (컴포넌트 바깥에서 한 번만 계산)
const sampleColors: { id: ColorFamily; hex: string }[] = COLOR_FAMILIES.map(
  (id) => ({
    id,
    hex: id === "natural" ? "natural" : getRepresentativeHex(id),
  }),
);

export default function CategoryStickerGalleryScreen() {
  const navigation = useNavigation<any>();
  const [selectedFamily, setSelectedFamily] = useState<ColorFamily>("natural");

  const categoryStickerKeys1 = [
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

  return (
    <Container>
      <AppHeader
        onBack={() => navigation.goBack()}
        center={<HeaderTitle>도형 스티커 갤러리</HeaderTitle>}
      />

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 300 }}>
        <ColorPickerBar>
          <ColorLabel></ColorLabel>

          {sampleColors.map(({ id, hex }) => (
            <ColorButton
              key={id}
              color={id === "natural" ? "#FFFFFF" : hex}
              isSelected={selectedFamily === id}
              onPress={() => setSelectedFamily(id)}
            />
          ))}
        </ColorPickerBar>

        <GridContainer>
          {categoryStickerKeys1.map((key) => {
            const obj = CategoryGameObjects1.find((o) => o.id === key);
            const colorHex = obj
              ? resolveVariantHex(obj, selectedFamily)
              : undefined;

            return (
              <StickerCard key={key}>
                <RenderCategoryItemSvg itemId={key} colorHex={colorHex} />
                <StickerName>{key}</StickerName>
              </StickerCard>
            );
          })}
        </GridContainer>
      </ScrollView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #334155;
`;

const ColorPickerBar = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 12px 16px;
  border-radius: 16px;
  margin-bottom: 20px;
  justify-content: space-between;
`;

const ColorLabel = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #475569;
`;

const ColorButton = styled(TouchableOpacity)<{
  color: string;
  isSelected: boolean;
}>`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background-color: ${(props) => props.color};
  border-width: ${(props) => (props.isSelected ? "3px" : "1px")};
  border-color: ${(props) => (props.isSelected ? "#1E293B" : "#CBD5E1")};
`;

const GridContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const StickerCard = styled.View`
  width: 30%;
  aspect-ratio: 1;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  padding: 8px;
  elevation: 3;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

const StickerName = styled.Text`
  font-size: 11px;
  color: #64748b;
  margin-top: 4px;
  font-weight: bold;
`;
