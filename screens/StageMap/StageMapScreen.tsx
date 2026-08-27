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
  x: number;
}

const stages: Stage[] = [
  {
    level: 1,
    name: "알록달록 앵두 밭",
    unlocked: true,
    completed: true,
    x: 150,
  },
  {
    level: 2,
    name: "싱그러운 풀숲",
    unlocked: true,
    completed: false,
    x: 80,
  },
  {
    level: 3,
    name: "무지개 언덕",
    unlocked: false,
    completed: false,
    x: 220,
  },
  {
    level: 4,
    name: "별빛 호수",
    unlocked: false,
    completed: false,
    x: 110,
  },
  {
    level: 5,
    name: "캔디 공장",
    unlocked: false,
    completed: false,
    x: 200,
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

  const STAGE_POSITIONS = [
    { centerX: 168 },
    { centerX: 93 },
    { centerX: 218 },
    { centerX: 123 },
    { centerX: 248 },
  ];

  const renderItem = ({ item, index }: { item: Stage; index: number }) => {
    const position = STAGE_POSITIONS[index];

    const previousPosition = index > 0 ? STAGE_POSITIONS[index - 1] : null;

    return (
      <MapItem>
        {previousPosition && (
          <Path
            fromX={previousPosition.centerX}
            toX={position.centerX}
            height={140}
            completed={stages[index - 1].completed}
          />
        )}

        <StageNode
          level={item.level}
          name={item.name}
          unlocked={item.unlocked}
          completed={item.completed}
          onPress={() => handleStagePress(item.level, item.unlocked)}
          style={{
            left: position.centerX - 38,
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
