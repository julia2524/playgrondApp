import React from "react";
import { Alert, ImageBackground } from "react-native";
import {
  Container,
  Footer,
  GameGrid,
  GuideText,
  GuideTextContainer,
  Header,
  SettingButton,
  SettingButtonText,
  SubTitle,
  Title,
  TitleContainer,
} from "../../styles/homeStyles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import GameCardItem from "../../components/common/GameCardItem";
import { ASSETS } from "../../constants/assets";

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProp>();
  // 색깔 분류 게임으로 이동하는 함수
  const goToStageMap = () => {
    navigation.navigate("StageMapScreen");
  };

  const handleLockedGame = (gameName: string) => {
    Alert.alert("잠금", `🔒 ${gameName}은 다음 업데이트에서 만나요!`);
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
            onPress={() => Alert.alert("설정", "설정 화면은 준비 중이에요!")}
            activeOpacity={0.8}
          >
            <SettingButtonText>⚙️</SettingButtonText>
          </SettingButton>
        </Header>

        {/* 안내 문구 */}
        <GuideTextContainer>
          <GuideText>하고 싶은 놀이를 하나 골라봐!</GuideText>
        </GuideTextContainer>

        {/* 게임 카드 그리드 */}
        <GameGrid>
          {/* 1. 색깔 분류 (활성화) */}
          <GameCardItem
            bgColor="#FE9404"
            emoji="🎨"
            title="색깔 분류"
            desc="같은 색끼리!"
            onPress={() => navigation.navigate("StageMapScreen")}
          />

          {/* 2. 모양 분류 (준비중) */}
          <GameCardItem
            bgColor="#7569E8"
            emoji="🔷"
            title="모양 분류"
            desc="같은 모양끼리!"
            disabled={true}
            onPress={() => handleLockedGame("모양 분류")}
          />

          {/* 3. 크기 분류 (준비중) */}
          <GameCardItem
            bgColor="#45B48B"
            emoji="📏"
            title="크기 분류"
            desc="같은 크기끼리!"
            disabled={true}
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

        {/* 하단 푸터 */}
        <Footer>Made with song for little explorers 💛</Footer>
      </Container>
    </ImageBackground>
  );
}
