import React, { useState, useMemo } from "react";
import { ScrollView, TouchableOpacity, Dimensions, View } from "react-native";
import styled from "styled-components/native";
import { useNavigation, useRoute } from "@react-navigation/native";

import AppHeader from "../../components/common/AppHeader";

// 데이터 풀
import { CategoryGameObjects1 } from "../classification/category/constants/categoryPool";
import { COLOR_ITEM_POOL } from "../classification/color/constants/colorPool";
import { SHAPE_ITEM_POOL } from "../classification/shape/constants/shapePool";

// SVG 렌더러
import { RenderCategoryItemSvg } from "../classification/category/assets/categoryItemSvgs";
import { RenderColorItemSvg } from "../classification/color/assets/ColorItemSvgs";
import {
  RenderBasicShapeSvg,
  RenderShapeItemSvg,
} from "../classification/shape/assets/shapeItemSvgs";
import BannerAd from "../../services/BannerAd";
import { BASIC_COLORS } from "../../design-system/tokens/colors";

const { width } = Dimensions.get("window");

// 색상 팔레트 (공통으로 쓸 기본 색들)
const COLOR_PALETTE = [
  { id: "natural", hex: undefined, label: "기본" },
  { id: "red", hex: "#EF5350", label: "빨강" },
  { id: "orange", hex: "#FFA726", label: "주황" },
  { id: "yellow", hex: "#FFEE58", label: "노랑" },
  { id: "green", hex: "#66BB6A", label: "초록" },
  { id: "blue", hex: "#42A5F5", label: "파랑" },
  { id: "purple", hex: "#AB47BC", label: "보라" },
  { id: "pink", hex: "#EC407A", label: "분홍" },
  { id: "brown", hex: "#8D6E63", label: "갈색" },
  { id: "gray", hex: "#90A4AE", label: "회색" },
  { id: "white", hex: "#FAFAFA", label: "흰색" },
  { id: "black", hex: "#424242", label: "검정" },
];
// BASIC_SHAPE_IDS는 prefix 없는 순수 이름으로 정의
const BASIC_SHAPE_IDS = ["circle", "square", "triangle", "heart", "star"];

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
export default function StickerDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { gameType, stickerId, stickerName } = route.params;

  // 현재 선택된 색상 (hex 또는 undefined)
  const [selectedColorHex, setSelectedColorHex] = useState<string | undefined>(
    undefined,
  );

  // 해당 스티커 데이터 찾기
  const stickerData = useMemo(() => {
    if (gameType === "category") {
      return CategoryGameObjects1.find((o) => o.id === stickerId) ?? null;
    }
    if (gameType === "color") {
      return COLOR_ITEM_POOL.find((o) => o.id === stickerId) ?? null;
    }
    if (gameType === "shape") {
      return SHAPE_ITEM_POOL.find((o) => o.id === stickerId) ?? null;
    }
    return null;
  }, [gameType, stickerId]);

  // category일 경우 variants 기반 색상 팔레트 만들기
  const availableColors = useMemo(() => {
    // gameType이 category이고, variants가 실제로 있을 때만 처리
    if (
      gameType === "category" &&
      stickerData &&
      "variants" in stickerData &&
      Array.isArray(stickerData.variants)
    ) {
      const variantColors = stickerData.variants.map((v: any) => ({
        id: v.id,
        hex: v.primary,
        label: v.id,
      }));
      return [
        { id: "natural", hex: undefined, label: "기본" },
        ...variantColors,
      ];
    }

    // color / shape는 공통 팔레트
    return COLOR_PALETTE;
  }, [gameType, stickerData]);
  // SVG 렌더
  const renderBigSvg = () => {
    const size = Math.min(width * 0.55, 220);

    if (gameType === "color") {
      return (
        <ScaledIcon size={size}>
          <RenderColorItemSvg
            shapeId={stickerId}
            colorHex={selectedColorHex ?? "#94A3B8"}
          />
        </ScaledIcon>
      );
    }
    if (gameType === "shape") {
      const normalizedShapeId = stickerId?.replace(/^basic/i, "");
      const isBasicShape = BASIC_SHAPE_IDS.includes(normalizedShapeId);

      return (
        <ScaledIcon size={size * 0.8}>
          {isBasicShape ? (
            <RenderBasicShapeSvg
              shapeId={normalizedShapeId}
              colorHex={selectedColorHex}
            />
          ) : (
            <RenderShapeItemSvg
              itemId={stickerId}
              colorHex={selectedColorHex}
            />
          )}
        </ScaledIcon>
      );
    }

    // category
    return (
      <RenderCategoryItemSvg
        itemId={stickerId}
        size={size}
        colorHex={selectedColorHex}
      />
    );
  };

  // 설명 텍스트 (나중에 데이터에 description 필드 추가하면 더 좋아짐)
  const description = useMemo(() => {
    if (gameType === "category" && stickerData) {
      // category 전용 속성 안전하게 접근
      const top = "topCategory" in stickerData ? stickerData.topCategory : "";
      const sub = "subCategory" in stickerData ? stickerData.subCategory : "";

      if (top || sub) {
        return `${stickerName}는 ${top} 카테고리의 ${sub}에 속해요.`;
      }
      return `${stickerName} 스티커예요!`;
    }

    if (gameType === "color") {
      return `${stickerName}의 색깔을 자유롭게 바꿔볼 수 있어요!`;
    }

    if (gameType === "shape") {
      return `${stickerName}의 모양을 다양한 색으로 칠해볼 수 있어요!`;
    }

    return "";
  }, [gameType, stickerData, stickerName]);

  return (
    <Container>
      <AppHeader
        onBack={() => navigation.goBack()}
        center={<HeaderTitle>{stickerName}</HeaderTitle>}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* 큰 스티커 미리보기 */}
        <PreviewCard>
          <SvgWrapper>{renderBigSvg()}</SvgWrapper>
          <PreviewName>{stickerName}</PreviewName>
        </PreviewCard>

        {/* 설명 */}
        <DescriptionCard>
          <DescriptionTitle>어떤 스티커인가요?</DescriptionTitle>
          <DescriptionText>{description}</DescriptionText>
        </DescriptionCard>

        {/* 색상 선택 */}
        <ColorSection>
          <SectionTitle>색상 바꾸기</SectionTitle>
          <ColorGrid>
            {availableColors.map((color) => {
              const isSelected =
                selectedColorHex === color.hex ||
                (selectedColorHex === undefined && color.hex === undefined);

              return (
                <ColorButton
                  key={color.id}
                  onPress={() => setSelectedColorHex(color.hex)}
                  isSelected={isSelected}
                  style={{
                    backgroundColor: color.hex ?? "#FFFFFF",
                    borderColor: isSelected ? "#1E293B" : "#CBD5E1",
                  }}
                >
                  {color.hex === undefined && <NaturalLabel>기본</NaturalLabel>}
                </ColorButton>
              );
            })}
          </ColorGrid>
        </ColorSection>
      </ScrollView>
      {/* ⭐ 화면 하단 고정 광고 */}
      <BannerAdContainer>
        <BannerAd />
      </BannerAdContainer>
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
const BannerAdContainer = styled.View`
  height: 60px;
  align-items: center;
  justify-content: center;
  background-color: ${BASIC_COLORS.CARD_BG};
`;

const PreviewCard = styled.View`
  margin: 20px 20px 12px 20px;
  background-color: #ffffff;
  border-radius: 24px;
  padding: 28px 20px;
  align-items: center;
  elevation: 3;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.06;
  shadow-radius: 8px;
`;

const SvgWrapper = styled.View`
  width: 200px;
  height: 200px;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
`;

const PreviewName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #0f172a;
`;

const DescriptionCard = styled.View`
  margin: 0 20px 16px 20px;
  background-color: #ffffff;
  border-radius: 18px;
  padding: 16px 18px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.04;
  shadow-radius: 4px;
`;

const DescriptionTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #475569;
  margin-bottom: 6px;
`;

const DescriptionText = styled.Text`
  font-size: 15px;
  color: #334155;
  line-height: 22px;
`;

const ColorSection = styled.View`
  margin: 0 20px;
  background-color: #ffffff;
  border-radius: 18px;
  padding: 16px 18px 20px 18px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.04;
  shadow-radius: 4px;
`;

const SectionTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #475569;
  margin-bottom: 14px;
`;

const ColorGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
`;

const ColorButton = styled(TouchableOpacity)<{ isSelected: boolean }>`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  border-width: ${(props) => (props.isSelected ? 3 : 1.5)}px;
  align-items: center;
  justify-content: center;
`;

const NaturalLabel = styled.Text`
  font-size: 10px;
  font-weight: bold;
  color: #64748b;
`;
