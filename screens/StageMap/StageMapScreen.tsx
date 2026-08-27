import React from "react";
import { FlatList, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import {
  BackButton,
  BackText,
  Container,
  Header,
  HeaderRight,
  HeaderTitle,
  MapItem,
} from "../../styles/stageMapStyles";
import Path from "../../components/stageMap/Path";
import StageNode from "../../components/stageMap/StageNode";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "StageMapScreen"
>;

interface Stage {
  level: number;
  name: string;
  unlocked: boolean;
  completed: boolean;
}

const stages: Stage[] = [
  {
    level: 1,
    name: "알록달록 앵두밭",
    unlocked: true,
    completed: false,
  },
  {
    level: 2,
    name: "싱그러운 풀숲",
    unlocked: true,
    completed: false,
  },
  {
    level: 3,
    name: "무지개 언덕",
    unlocked: false,
    completed: false,
  },
  {
    level: 4,
    name: "별빛 호수",
    unlocked: false,
    completed: false,
  },
  {
    level: 5,
    name: "달콤 캔디 공장",
    unlocked: false,
    completed: false,
  },
];

export default function StageMapScreen() {
  const navigation = useNavigation<NavigationProp>();

  const handleStagePress = (level: number, unlocked: boolean) => {
    if (!unlocked) {
      return;
    }

    navigation.navigate("ClassificationPlayScreen", { level });
  };

  const renderItem = ({ item, index }: { item: Stage; index: number }) => {
    const positions = [
      { left: 130 },
      { left: 55 },
      { left: 180 },
      { left: 85 },
      { left: 210 },
    ];

    const position = positions[index % positions.length];

    return (
      <MapItem>
        {/* 🛤️ 이전 스테이지와 연결되는 길 */}
        {index > 0 && <Path completed={stages[index - 1].completed} />}

        {/* ⭐ 스테이지 */}
        <StageNode
          level={item.level}
          name={item.name}
          unlocked={item.unlocked}
          completed={item.completed}
          onPress={() => handleStagePress(item.level, item.unlocked)}
          style={{
            left: position.left,
            top: 30,
          }}
        />
      </MapItem>
    );
  };

  return (
    <Container>
      {/* --------------------------------
          Header
      -------------------------------- */}

      <Header>
        <BackButton onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <BackText>‹</BackText>
        </BackButton>

        <HeaderTitle>🎨 색깔 분류 모험</HeaderTitle>

        <HeaderRight />
      </Header>

      {/* --------------------------------
          ⭐ 핵심
          FlatList + inverted
      -------------------------------- */}

      <FlatList
        inverted
        data={stages}
        keyExtractor={(item) => item.level.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 40,
          paddingBottom: 120,
        }}
      />
    </Container>
  );
}
