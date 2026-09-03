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
  SettingButton,
  SettingButtonText,
  SubTitle,
  Title,
  TitleContainer,
} from "./homeStyles";
import CustomAlert from "../../components/common/CustomAlert";
type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProp>();
  // 색깔 분류 게임으로 이동하는 함수
  const goToStageMap = (gameType: "color" | "shape") => {
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
            onPress={() => showAlert("설정", "설정 화면은 준비 중이에요!")}
            activeOpacity={0.8}
          >
            {/* <SettingButtonText>⚙️</SettingButtonText> */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("StickerGalleryScreen" as never)
              }
            >
              <Text
                style={{ fontSize: 12, fontWeight: "bold", color: "#2563EB" }}
              >
                스티커보기
              </Text>
            </TouchableOpacity>
          </SettingButton>
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
              title="색깔 분류"
              desc="같은 색끼리!"
              onPress={() => goToStageMap("color")}
            />

            {/* 2. 모양 분류 (준비중) */}
            <GameCardItem
              bgColor="#7569E8"
              emoji="🔷"
              title="모양 분류"
              desc="같은 모양끼리!"
              onPress={() => goToStageMap("shape")}
            />

            {/* 3. 크기 분류 (준비중) */}
            <GameCardItem
              bgColor="#45B48B"
              emoji="📏"
              title="크기 분류"
              desc="같은 크기끼리!"
              onPress={() => handleLockedGame("크기 분류")}
            />

            {/* 4. 새로운 놀이 (준비중) */}
            <GameCardItem
              bgColor="#67cff4"
              emoji="✨"
              title="새로운 놀이"
              desc="준비 중이에요"
              disabled={true}
              onPress={() => handleLockedGame("새로운 놀이")}
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
