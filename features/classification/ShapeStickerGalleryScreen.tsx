import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import AppHeader from "../../components/common/AppHeader";
import { RenderShapeItemSvg } from "./shape/assets/shapeItemSvgs";

export default function ShapeStickerGalleryScreen() {
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

  const shapeStickerKeys = [
    // 🔵 circle
    "ball",
    "tomato",
    "watermelon",
    "cookie",
    "donut",
    "donut1",
    "button1",
    "button2",
    "circleClock",
    "wheel",
    "lollipop",
    "cake",

    "sunglasses",
    "basketball",
    "baseball",
    "tennisBall",
    "plate",
    "fullMoon",
    "orange",
    "roundBalloon",
    "sun",

    // "drum",

    // 🟦 square
    "envelop",
    "cheese",
    "chocolateBar",

    "box",
    "phone",
    "switch",
    "remoteControl",
    "frame",
    "book",
    "bread",
    "window",
    "window1",
    "calendar",
    "microwave",
    "pillow",
    "calculator",
    "tv",
    "giftBox",
    "giftBox1",
    "squareClock",
    "door",
    "bookshelf",
    "refrigerator",
    "laptop",
    "squareCakeSlice",
    "sandwich",
    "squareSunglasses",

    // triangle
    "triangleRuller",
    "pizzaSlice",
    "watermelonSlice",
    "triangleInstrument",
    "partyHat",
    "christmasTree",
    "flag",
    // "triangleCakeSlice",
    "pyramid",
    "triangleSandwich",
    "triangleKimbap",

    "tent",
    "mountain",
    "sailboat",
    "triangleCookie",

    // heart
    "heartCookie",

    "heartLollipop",
    "heartPillow",
    "heartCake",
    "heartButton",
    "heartClock",
    "heartSunglasses",
    "heartGem",
    "heartNecklace",

    // star
    "starCookie",
    "starBalloon",
    "starBalloon1",

    "starWand",
    "starPillow",
    "starfish",
    "starButton",
    "starClock",
    "starCake",
    "starOrnament",
    "starSunglasses",
    "starNecklace",
    "medal",
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
          {shapeStickerKeys.map((key) => (
            <StickerCard key={key}>
              <RenderShapeItemSvg
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
