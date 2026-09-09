import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import AppHeader from "../../components/common/AppHeader";
import { RenderCategoryItemSvg } from "./category/assets/categoryItemSvgs";

export default function CategoryStickerGalleryScreen() {
  const navigation = useNavigation<any>();
  // 🌟 "natural"을 초기값 혹은 선택값으로 지정할 수 있게 설정
  const [selectedColor, setSelectedColor] = useState<string>("natural");

  const sampleColors = [
    "natural",
    "#F03E3E", // 빨강
    "#1971C2", // 파랑
    "#F9C80E", // 노랑
    "#2F9E44", // 초록
    "#AE3EC9", // 보라
    "#E8590C", // 주황
    "#FFF",
  ];

  const categoryStickerKeys = [
    // 동물
    "dog",
    "cat",
    "rabbit",
    "turtle",
    "tiger",
    "bear",
    "chicken",
    "duck",
    "penguin",
    "whale",
    "shark",
    "octopus",
    "dolphin",
    "insect",
    "butterfly",
    "ladybug",

    // 먹는 것
    "apple",
    "banana",
    "strawberry",
    "watermelon",
    "grape",
    "carrot",
    "cucumber",
    "tomato",
    "rice",
    "gimbap",
    "pizza",
    "hamburger",
    "cake",
    "cookie",
    "bread",
    "iceCream",
    "milk",
    "drink",

    // 입는 것
    "tshirt",
    "clothes",
    "shoes",
    "sneakers",
    "hat",

    // 생활하는 것
    "tv",
    "bed",
    "furniture",
    "electronics",
    "stationery",
    "umbrella",
    "daily",
    "cleaning",
    "bathroom",
    "kitchen",

    // 탈것
    "car",
    "bus",
    "train",
    "airplane",
    "ship",
    "vehicle",
    "road",
    "air",
  ];
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
    "dolphin",
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

      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 300,
        }}
      >
        <ColorPickerBar>
          <ColorLabel>적용할 색상:</ColorLabel>

          {sampleColors.map((color) => (
            <ColorButton
              key={color}
              color={color}
              isSelected={selectedColor === color}
              onPress={() => setSelectedColor(color)}
            />
          ))}
        </ColorPickerBar>

        <GridContainer>
          {categoryStickerKeys1.map((key) => (
            <StickerCard key={key}>
              <RenderCategoryItemSvg
                itemId={key}
                colorHex={
                  selectedColor === "natural" ? undefined : selectedColor
                }
              />
              <StickerName>{key}</StickerName>
            </StickerCard>
          ))}
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
