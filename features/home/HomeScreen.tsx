import React, { useState } from "react";
import { Alert, ImageBackground, Text, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { ASSETS } from "../../assets/assets";
import GameCardItem from "../../design-system/ui/GameCardItem";

import {
  Container,
  Footer,
  GameGrid,
  GameGridWrapper,
  GuideText,
  GuideTextContainer,
  Header,
  SubTitle,
  Title,
  TitleContainer,
} from "./homeStyles";
import CustomAlert from "../../components/common/CustomAlert";
import { shapeLevels } from "../classification/shape/constants/levels";
import { createShapeRound } from "../classification/shape/shapeGenerators";
import SettingButton from "../../components/common/SettingButton";
type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProp>();
  // 색깔 분류 게임으로 이동하는 함수
  const goToStageMap = (gameType: "color" | "shape" | "category") => {
    navigation.navigate("StageMapScreen", { gameType });
  };
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  // 알럿 띄우는 헬퍼 함수
  const showAlert = (title: string, message: string) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const handleLockedGame = (gameName: string) => {
    showAlert("잠금", `${gameName}는\n 다음 업데이트에서 만나요!`);
    // Alert.alert("잠금", ` ${gameName}은 다음 업데이트에서 만나요!`);
  };
  const testAllShapeLevels = () => {
    shapeLevels.forEach((config) => {
      const round = createShapeRound(config, 1);

      console.log(`\n========== LEVEL ${config.level} ==========`);
      console.log(JSON.stringify(round, null, 2));

      // 1. 정답 Object 찾기
      const correctObject = round.objects.find(
        (object) => object.id === round.correctObjectId,
      );

      // 2. answer에 연결된 실제 Target 찾기
      const correctTargetId = correctObject
        ? round.answer[correctObject.id]
        : undefined;

      const correctTarget = round.targets.find(
        (target) => target.id === correctTargetId,
      );

      // 3. 검증
      const isShapeMatched = correctObject?.shapeId === correctTarget?.shapeId;

      // 추가 검증 (있으면 더 좋음)
      const hasCorrectAnswer = !!correctTargetId;
      const hasWrongObject =
        config.mode === "choice"
          ? (round.wrongObjectIds?.length ?? 0) > 0
          : true;

      const passed = isShapeMatched && hasCorrectAnswer && hasWrongObject;

      console.log(`Level ${config.level}:`, passed ? "✅ PASS" : "❌ FAIL");

      if (!passed) {
        console.log("  - correctObject shapeId:", correctObject?.shapeId);
        console.log("  - correctTarget shapeId:", correctTarget?.shapeId);
        console.log("  - answer:", round.answer);
      }
    });
  };
  const testAllShapeLevelsMultiple = (times = 100) => {
    let failCount = 0;

    for (let i = 0; i < times; i++) {
      shapeLevels.forEach((config) => {
        try {
          const round = createShapeRound(config, 1);
          // 1. 정답 Object 찾기
          const correctObject = round.objects.find(
            (object) => object.id === round.correctObjectId,
          );

          // 2. answer에 연결된 실제 Target 찾기
          const correctTargetId = correctObject
            ? round.answer[correctObject.id]
            : undefined;

          const correctTarget = round.targets.find(
            (target) => target.id === correctTargetId,
          );

          // 3. 검증
          const isShapeMatched =
            correctObject?.shapeId === correctTarget?.shapeId;

          // 추가 검증 (있으면 더 좋음)
          const hasCorrectAnswer = !!correctTargetId;
          const hasWrongObject =
            config.mode === "choice"
              ? (round.wrongObjectIds?.length ?? 0) > 0
              : true;

          const passed = isShapeMatched && hasCorrectAnswer && hasWrongObject;
          if (!passed) failCount++;
        } catch (e) {
          console.error(`Level ${config.level} throw:`, e);
          failCount++;
        }
      });
    }

    console.log(`총 실패 횟수: ${failCount}`);
  };

  return (
    <ImageBackground
      source={ASSETS.homeBackground}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <Container>
        {/* 상단 헤더 */}
        <Header>
          <TitleContainer>
            <SubTitle>☁️ 끼리끼리 놀이터</SubTitle>
            <Title>어떤 놀이를 해볼까?</Title>
          </TitleContainer>
          <SettingButton
            onPress={() => navigation.navigate("SettingScreen" as never)}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("StickerGalleryScreen" as never)}
          >
            <Text
              style={{ fontSize: 12, fontWeight: "bold", color: "#2563EB" }}
            >
              모양
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CategoryStickerGalleryScreen" as never)
            }
          >
            <Text
              style={{ fontSize: 12, fontWeight: "bold", color: "#eb2525" }}
            >
              종류
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => navigation.navigate("CategoryTestScreen" as never)}
          >
            <Text
              style={{ fontSize: 12, fontWeight: "bold", color: "#2563EB" }}
            >
              종류 분류 테스터
            </Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            onPress={() => navigation.navigate("RainbowTestScreen" as never)}
          >
            <Text
              style={{ fontSize: 12, fontWeight: "bold", color: "#2563EB" }}
            >
              무지개 테스터
            </Text>
          </TouchableOpacity> */}
        </Header>

        {/* 안내 문구 */}
        <GuideTextContainer>
          <GuideText>하고 싶은 놀이를 하나 골라봐!</GuideText>
        </GuideTextContainer>

        {/* 게임 카드 그리드 */}
        <GameGridWrapper>
          <GameGrid>
            {/* 1. 색깔 분류 (활성화) */}
            <GameCardItem
              bgColor="#FE9404"
              emoji="🎨"
              title="알록달록 색깔"
              desc="같은 색끼리 척척!"
              onPress={() => goToStageMap("color")}
            />

            {/* 2. 모양 분류 (준비중) */}
            <GameCardItem
              bgColor="#7569E8"
              emoji="🔷"
              title="반짝반짝 모양"
              desc="같은 모양끼리 쏙쏙!"
              onPress={() => goToStageMap("shape")}
            />

            {/* 3. 크기 분류 (준비중) */}
            <GameCardItem
              bgColor="#45B48B"
              emoji="🥑"
              title="친구들 모여라"
              desc="종류별로 짝을 찾아줘!"
              onPress={() => goToStageMap("category")}
            />

            {/* 4. 새로운 놀이 (준비중) */}
            <GameCardItem
              bgColor="#67cff4"
              emoji="✨"
              title="새로운 놀이"
              desc="준비 중이에요"
              disabled={true}
              onPress={() => handleLockedGame("크기 분류")}
            />
          </GameGrid>
        </GameGridWrapper>

        {/* 하단 푸터 */}
        <Footer>Made with song for little explorers 💛</Footer>
      </Container>
      {/* ⭐ 2. ImageBackground 바로 아래에 CustomAlert를 넣어주기! */}
      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
    </ImageBackground>
  );
}
