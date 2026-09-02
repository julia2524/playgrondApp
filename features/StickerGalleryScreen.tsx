import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import AppHeader from "../components/common/AppHeader";
import { RenderItemSvg } from "./classification-color/assets/ColorItemSvgs";

export default function StickerGalleryScreen() {
  const navigation = useNavigation<any>();
  const [selectedColor, setSelectedColor] = useState("#F03E3E");

  const sampleColors = [
    "#F03E3E",
    "#1971C2",
    "#F9C80E",
    "#2F9E44",
    "#AE3EC9",
    "#E8590C",
  ];

  const stickerKeys = [
    "apple",
    "strawberry",
    "balloon",
    "fireTruck",
    "cherry",
    "fish",
    "blueberry",
    "umbrella",
    "whale",
    "milk",
    "banana",
    "bee",
    "bell",
    "chick",
    "sunflower",
    "star",
    "tree",
    "broccoli",
    "butterfly",
    "cactus",
    "crow",
    "cat",
    "cloud",
    "snowman",
    "rabbit",
    "cottonCandy",
    "cupcake",
    "donut",
    "mushroom",
    "flower",
    "ladybug",
    "koala",
    "watermelon",
    "grape",
    "owl",
    "rocket",
    "frog",
    "clock",
    "car",
    "ship",
    "dog",
    "fox",
    "pig",
    "bear",
    "penguin",
    "snail",
  ];

  return (
    <Container>
      <AppHeader
        onBack={() => navigation.goBack()}
        center={<HeaderTitle>스티커 갤러리 모음</HeaderTitle>}
      />

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
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
          {stickerKeys.map((key) => (
            <StickerCard key={key}>
              <RenderItemSvg shapeId={key} colorHex={selectedColor} />
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
