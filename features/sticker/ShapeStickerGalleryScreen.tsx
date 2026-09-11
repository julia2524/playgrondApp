import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import AppHeader from "../../components/common/AppHeader";
import { RenderShapeItemSvg } from "../classification/shape/assets/shapeItemSvgs";
import { SHAPE_ITEM_POOL } from "../classification/shape/constants/shapePool";

export default function ShapeStickerGalleryScreen() {
  const navigation = useNavigation<any>();
  const [selectedColor, setSelectedColor] = useState<string>("natural");

  const sampleColors = [
    "natural",
    "#F03E3E",
    "#1971C2",
    "#F9C80E",
    "#2F9E44",
    "#AE3EC9",
    "#E8590C",
    "#FFF",
  ];

  const handleStickerPress = (id: string, name: string) => {
    navigation.navigate("StickerDetailScreen", {
      gameType: "shape",
      stickerId: id,
      stickerName: name,
    });
  };

  return (
    <Container>
      <AppHeader
        onBack={() => navigation.goBack()}
        center={<HeaderTitle>도형 스티커 갤러리</HeaderTitle>}
      />

      <ColorPickerBar>
        <ColorLabel>적용할 색상:</ColorLabel>
        {sampleColors.map((color) => (
          <ColorButton
            key={color}
            color={color === "natural" ? "#FFFFFF" : color}
            isSelected={selectedColor === color}
            onPress={() => setSelectedColor(color)}
          />
        ))}
      </ColorPickerBar>

      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 30,
        }}
      >
        <GridContainer>
          {SHAPE_ITEM_POOL.map((item) => (
            <StickerCard
              key={item.id}
              onPress={() => handleStickerPress(item.id, item.label)}
              activeOpacity={0.7}
            >
              <RenderShapeItemSvg
                itemId={item.id}
                colorHex={
                  selectedColor === "natural" ? undefined : selectedColor
                }
              />
              <StickerName numberOfLines={1}>{item.label}</StickerName>
            </StickerCard>
          ))}
        </GridContainer>
      </ScrollView>
    </Container>
  );
}

// ---------- Styled ----------
const Container = styled.View`
  flex: 1;
  background-color: #f8fafc;
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #334155;
`;

const ColorPickerBar = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 12px 16px;
  margin: 8px 16px 0 16px;
  border-radius: 16px;
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

const StickerCard = styled(TouchableOpacity)`
  width: 30%;
  aspect-ratio: 1;
  background-color: #ffffff;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  padding: 8px;
  elevation: 3;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.08;
  shadow-radius: 4px;
`;

const StickerName = styled.Text`
  font-size: 11px;
  color: #64748b;
  margin-top: 6px;
  font-weight: bold;
  text-align: center;
`;
