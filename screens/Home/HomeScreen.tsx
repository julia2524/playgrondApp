import React from "react";
import { Alert } from "react-native";
import {
  CardBubble,
  Container,
  Footer,
  GameCard,
  GameDesc,
  GameEmoji,
  GameGrid,
  GameTitle,
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
        {/* 색깔 분류 (활성화) */}
        <GameCard bgColor="#FE9404" onPress={goToStageMap} activeOpacity={0.9}>
          {/* 💧 우측 상단 몽글몽글 물방울 효과 */}
          <CardBubble />
          <GameEmoji>🎨</GameEmoji>
          <GameTitle>색깔 분류</GameTitle>
          <GameDesc>같은 색깔끼리 모아봐요</GameDesc>
        </GameCard>

        {/* 모양 분류 (준비중) */}
        <GameCard
          bgColor="#7569E8"
          disabled={true}
          onPress={() => handleLockedGame("모양 분류")}
          activeOpacity={0.9}
        >
          {/* 💧 우측 상단 몽글몽글 물방울 효과 */}
          <CardBubble />
          <GameEmoji>🔷</GameEmoji>
          <GameTitle>모양 분류</GameTitle>
          <GameDesc>준비 중이에요</GameDesc>
        </GameCard>

        {/* 크기 분류 (준비중) */}
        <GameCard
          bgColor="#45B48B"
          disabled={true}
          onPress={() => handleLockedGame("크기 분류")}
          activeOpacity={0.9}
        >
          {/* 💧 우측 상단 몽글몽글 물방울 효과 */}
          <CardBubble />
          <GameEmoji>📏</GameEmoji>
          <GameTitle>크기 분류</GameTitle>
          <GameDesc>준비 중이에요</GameDesc>
        </GameCard>

        {/* 새로운 놀이 (준비중) */}
        <GameCard
          bgColor="#67cff4"
          disabled={true}
          onPress={() => handleLockedGame("새로운 놀이")}
          activeOpacity={0.9}
        >
          {/* 💧 우측 상단 몽글몽글 물방울 효과 */}
          <CardBubble />
          <GameEmoji>✨</GameEmoji>
          <GameTitle>새로운 놀이</GameTitle>
          <GameDesc>준비 중이에요</GameDesc>
        </GameCard>
      </GameGrid>

      {/* 하단 푸터 */}
      <Footer>Made with song for little explorers 💛</Footer>
    </Container>
  );
}
