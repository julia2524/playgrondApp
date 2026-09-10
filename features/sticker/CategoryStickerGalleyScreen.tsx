// import React, { useState } from "react";
// import { ScrollView, TouchableOpacity } from "react-native";
// import styled from "styled-components/native";
// import { useNavigation } from "@react-navigation/native";

// import AppHeader from "../../components/common/AppHeader";
// import { RenderCategoryItemSvg } from "../classification/category/assets/categoryItemSvgs";
// import { CategoryGameObjects1 } from "../classification/category/constants/categoryPool";
// import { CategoryGameObject } from "../classification/category/type/types";

// // ---------- 색상 거리 유틸 (generator와 동일 로직) ----------
// function hexToRgb(hex: string) {
//   const h = hex.replace("#", "");
//   const full =
//     h.length === 3
//       ? h
//           .split("")
//           .map((c) => c + c)
//           .join("")
//       : h;
//   return {
//     r: parseInt(full.slice(0, 2), 16),
//     g: parseInt(full.slice(2, 4), 16),
//     b: parseInt(full.slice(4, 6), 16),
//   };
// }

// function colorDistance(hexA: string, hexB: string): number {
//   const a = hexToRgb(hexA);
//   const b = hexToRgb(hexB);
//   const rmean = (a.r + b.r) / 2;
//   const dr = a.r - b.r;
//   const dg = a.g - b.g;
//   const db = a.b - b.b;
//   return Math.sqrt(
//     (2 + rmean / 256) * dr * dr +
//       4 * dg * dg +
//       (2 + (255 - rmean) / 256) * db * db,
//   );
// }

// // ---------- 실제 데이터 기반 색상 계열 ----------
// // 데이터에 자주 등장하는 variant id들 (필요하면 자유롭게 추가/삭제)
// const COLOR_FAMILIES = [
//   "natural",
//   "red",
//   "orange",
//   "yellow",
//   "green",
//   "blue",
//   "purple",
//   "pink",
//   "brown",
//   "gray",
//   "white",
//   "black",
// ] as const;

// type ColorFamily = (typeof COLOR_FAMILIES)[number];

// // 해당 계열 id를 가진 variant를 데이터 전체에서 찾아 대표 hex로 사용 (버튼 스와치용)
// function getRepresentativeHex(familyId: string): string {
//   for (const obj of CategoryGameObjects1) {
//     const match = obj.variants.find((v) => v.id === familyId);
//     if (match) return match.primary;
//   }
//   return "#CCCCCC"; // 데이터에 아예 없는 계열이면 회색으로 폴백
// }

// // 오브젝트별로 "이 계열에 가장 알맞은 variant"를 찾아 실제 hex 반환
// function resolveVariantHex(
//   obj: CategoryGameObject,
//   familyId: ColorFamily,
// ): string | undefined {
//   if (familyId === "natural") return undefined; // 컴포넌트 기본색 사용

//   // 1순위: id가 정확히 일치하는 variant
//   const exact = obj.variants.find((v) => v.id === familyId);
//   if (exact) return exact.primary;

//   // 2순위: 대표색과 가장 색이 비슷한 variant
//   const representative = getRepresentativeHex(familyId);
//   let closest = obj.variants[0];
//   let closestDist = colorDistance(closest.primary, representative);
//   for (const v of obj.variants) {
//     const d = colorDistance(v.primary, representative);
//     if (d < closestDist) {
//       closest = v;
//       closestDist = d;
//     }
//   }
//   return closest.primary;
// }

// // 버튼에 쓸 {id, 대표hex} 목록 (컴포넌트 바깥에서 한 번만 계산)
// const sampleColors: { id: ColorFamily; hex: string }[] = COLOR_FAMILIES.map(
//   (id) => ({
//     id,
//     hex: id === "natural" ? "natural" : getRepresentativeHex(id),
//   }),
// );

// export default function CategoryStickerGalleryScreen() {
//   const navigation = useNavigation<any>();
//   const [selectedFamily, setSelectedFamily] = useState<ColorFamily>("natural");

//   const categoryStickerKeys1 = [
//     "sparrow",
//     "corn",
//     "broccoli",
//     "mushroom",
//     "stingray",
//     "dog",
//     "cat",
//     "rabbit",
//     "chicken",
//     "duck",
//     "penguin",
//     "whale",
//     "shark",
//     "octopus",
//     "squid",
//     "apple",
//     "banana",
//     "strawberry",
//     "watermelon",
//     "carrot",
//     "cucumber",
//     "tomato",
//     "rice",
//     "gimbap",
//     "pizza",
//     "hamburger",
//     "cake",
//     "cookie",
//     "iceCream",
//     "car",
//     "bus",
//     "train",
//     "airplane",
//     "ship",
//     "bicycle",
//     "helicopter",
//     "boat",
//     "candy",
//     "donut",
//     "chocolate",
//     "pig",
//     "bear",
//     "cow",
//     "owl",
//     "parrot",
//     "jellyfish",
//     "crab",
//     "grape",
//     "tangerine",
//     "peach",
//     "eggplant",
//     "chili",
//     "pumpkin",
//     "soup",
//     "sandwich",
//     "dumpling",
//     "submarine",
//     "rocket",
//     "hotAirBalloon",
//     "truck",
//     "excavator",
//     "subway",
//   ];

//   return (
//     <Container>
//       <AppHeader
//         onBack={() => navigation.goBack()}
//         center={<HeaderTitle>도형 스티커 갤러리</HeaderTitle>}
//       />
//       <ColorPickerBar>
//         <ColorLabel></ColorLabel>

//         {sampleColors.map(({ id, hex }) => (
//           <ColorButton
//             key={id}
//             color={id === "natural" ? "#FFFFFF" : hex}
//             isSelected={selectedFamily === id}
//             onPress={() => setSelectedFamily(id)}
//           />
//         ))}
//       </ColorPickerBar>
//       <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 300 }}>
//         <GridContainer>
//           {categoryStickerKeys1.map((key) => {
//             const obj = CategoryGameObjects1.find((o) => o.id === key);
//             const colorHex = obj
//               ? resolveVariantHex(obj, selectedFamily)
//               : undefined;

//             return (
//               <StickerCard key={key}>
//                 <RenderCategoryItemSvg itemId={key} colorHex={colorHex} />
//                 <StickerName>{key}</StickerName>
//               </StickerCard>
//             );
//           })}
//         </GridContainer>
//       </ScrollView>
//     </Container>
//   );
// }

import React, { useState, useCallback } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import AppHeader from "../../components/common/AppHeader";
import { getUnlockedStickers } from "./utils/stickerStorage";
import { CategoryGameObjects1 } from "../classification/category/constants/categoryPool";
import { CategoryGameObject } from "../classification/category/type/types";
import { RenderCategoryItemSvg } from "../classification/category/assets/categoryItemSvgs";
// import { RenderCategoryItemSvg } from "./category/assets/categoryItemSvgs";
// import { CategoryGameObjects1 } from "./category/constants/categoryPool";
// import { CategoryGameObject } from "./category/type/types";
// import { getUnlockedStickers } from "../../utils/stickerStorage"; // 저장소 함수

// // ---------- 실제 데이터 기반 색상 계열 ----------
// // 데이터에 자주 등장하는 variant id들 (필요하면 자유롭게 추가/삭제)
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
// // ---------- 색상 거리 유틸 (generator와 동일 로직) ----------
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
// // 해당 계열 id를 가진 variant를 데이터 전체에서 찾아 대표 hex로 사용 (버튼 스와치용)
function getRepresentativeHex(familyId: string): string {
  for (const obj of CategoryGameObjects1) {
    const match = obj.variants.find((v) => v.id === familyId);
    if (match) return match.primary;
  }
  return "#CCCCCC"; // 데이터에 아예 없는 계열이면 회색으로 폴백
}

// // 오브젝트별로 "이 계열에 가장 알맞은 variant"를 찾아 실제 hex 반환
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
  const [unlockedStickers, setUnlockedStickers] = useState<string[]>([]);

  // 화면에 들어올 때마다 해금된 스티커 데이터 최신화
  useFocusEffect(
    useCallback(() => {
      let isMounted = true;
      getUnlockedStickers().then((list) => {
        if (isMounted) setUnlockedStickers(list);
      });
      return () => {
        isMounted = false;
      };
    }, []),
  );

  return (
    <Container>
      <AppHeader
        onBack={() => navigation.goBack()}
        center={
          <HeaderTitle>
            스티커 도장깨기 ({unlockedStickers.length}/
            {categoryStickerKeys1.length})
          </HeaderTitle>
        }
      />

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

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        <GridContainer>
          {categoryStickerKeys1.map((key) => {
            const obj = CategoryGameObjects1.find((o) => o.id === key);
            const isUnlocked = unlockedStickers.includes(key); // 해금 여부 판단
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
                  // 미해금 시 실루엣/자물쇠
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

// ---------- 추가/수정된 Styled Components ----------

const StickerCard = styled.View<{ isUnlocked: boolean }>`
  width: 30%;
  aspect-ratio: 1;
  background-color: ${(props) =>
    props.isUnlocked
      ? "rgba(255, 255, 255, 0.95)"
      : "rgba(241, 245, 249, 0.6)"};
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  padding: 8px;
  elevation: ${(props) => (props.isUnlocked ? 3 : 0)};
  opacity: ${(props) => (props.isUnlocked ? 1 : 0.6)};
`;

const LockedContainer = styled.View`
  align-items: center;
  justify-content: center;
  position: relative;
`;

const LockBadge = styled.Text`
  position: absolute;
  font-size: 18px;
`;

const Container = styled.View`
  flex: 1;
  padding-bottom: 60px;
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

const StickerName = styled.Text`
  font-size: 11px;
  color: #64748b;
  margin-top: 4px;
  font-weight: bold;
`;
