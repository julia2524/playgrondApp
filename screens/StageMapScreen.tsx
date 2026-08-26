import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { useRef } from "react";
import { FlatList, ListRenderItem, TouchableOpacity, View } from "react-native";
import {
  BackText,
  Container,
  Header,
  StageButton,
  StageNameText,
  StageNumberText,
  StageRow,
  StageTitleLabel,
  TitleText,
} from "../styles/stageMapStyles";
import { stages } from "../constants/stages";

type StageMapNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "StageMapScreen"
>;
export interface Stage {
  level: number;
  name: string;
  unlocked: boolean;
  align: "left" | "center" | "right";
}
export default function StageMapScreen() {
  const navigation = useNavigation<StageMapNavigationProp>();

  const flatListRef = useRef<FlatList<Stage>>(null);

  const handleStagePress = (level: number, unlocked: boolean) => {
    if (!unlocked) {
      alert("🔒 아직 잠겨 있어요!\n이전 단계를 먼저 깨보세요!");
      return;
    }

    navigation.navigate("ClassificationPlayScreen", {
      level,
    });
  };

  const renderStage: ListRenderItem<Stage> = ({ item }) => {
    return (
      <StageRow align={item.align}>
        <StageButton
          isUnlocked={item.unlocked}
          activeOpacity={0.8}
          onPress={() => handleStagePress(item.level, item.unlocked)}
        >
          <StageNumberText>{item.unlocked ? item.level : "🔒"}</StageNumberText>
        </StageButton>

        <StageTitleLabel>
          <StageNameText>{item.name}</StageNameText>
        </StageTitleLabel>
      </StageRow>
    );
  };

  return (
    <Container>
      {/* Header */}
      <Header>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <BackText>‹</BackText>
        </TouchableOpacity>

        <TitleText>🎨 색깔 분류 모험</TitleText>

        <View style={{ width: 28 }} />
      </Header>

      {/* Level Map */}
      <FlatList
        ref={flatListRef}
        data={stages}
        renderItem={renderStage}
        keyExtractor={(item) => String(item.level)}
        inverted
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 40,
          paddingBottom: 100,
        }}
      />
    </Container>
  );
}
