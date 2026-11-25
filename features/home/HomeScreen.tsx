// import React, { useEffect, useState } from "react";
// import { I18nManager, ImageBackground, View } from "react-native";

// import { useNavigation } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { RootStackParamList } from "../../navigation/types";
// import { ASSETS } from "../../assets/assets";
// import GameCardItem from "../../design-system/ui/GameCardItem";

// import {
//   Container,
//   Footer,
//   GameGrid,
//   GameGridWrapper,
//   GuideText,
//   GuideTextContainer,
//   Header,
//   SubTitle,
//   SubTitleText,
//   Title,
//   TitleContainer,
// } from "./homeStyles";
// import CustomAlert from "../../components/common/CustomAlert";
// import { shapeLevels } from "../classification/shape/constants/levels";
// import { createShapeRound } from "../classification/shape/shapeGenerators";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import { BASIC_COLORS, PASTEL_BG } from "../../design-system/tokens/colors";
// import i18n from "../../i18n";
// import { useLanguage } from "../../context/LanguageContext";
// import GuardianNoticeModal from "../../components/GuardianNoticeModal";
// import { getGuardianNoticeEnabled } from "../../components/GuardianNotice/guardianNoticeStorage";
// import { triggerHaptic } from "../../utils/haptic";
// import {
//   ClayCategoryIcon,
//   ClayColorIcon,
//   ClayShapeIcon,
// } from "../../components/icons/ClayGameIcons";
// type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

// // ✅ 앱이 완전히 종료되기 전까지 한 번만 보여주기 위한 세션 플래그
// let hasShownGuardianNoticeThisSession = false;

// export default function HomeScreen() {
//   console.log("RTL?", I18nManager.isRTL);
//   const [guardianNoticeVisible, setGuardianNoticeVisible] = useState(false);
//   const [guardianNoticeLoaded, setGuardianNoticeLoaded] = useState(false);

//   // ==========================================
//   // 보호자 안내 팝업 설정 확인
//   // ==========================================

//   useEffect(() => {
//     // 이미 이번 세션에서 한 번 보여줬으면 더 이상 안 띄움
//     if (hasShownGuardianNoticeThisSession) {
//       setGuardianNoticeLoaded(true);
//       return;
//     }
//     const loadGuardianNoticeSetting = async () => {
//       const enabled = await getGuardianNoticeEnabled();

//       if (enabled) {
//         setGuardianNoticeVisible(true);
//       }
//       hasShownGuardianNoticeThisSession = true; // 이번 앱 실행에서는 더 이상 안 보여줌
//       setGuardianNoticeLoaded(true);
//     };

//     loadGuardianNoticeSetting();
//   }, []);

//   // ==========================================
//   // 팝업 닫기
//   // ==========================================

//   const handleGuardianNoticeClose = () => {
//     setGuardianNoticeVisible(false);
//   };
//   const navigation = useNavigation<HomeNavigationProp>();
//   useLanguage(); // 💡 이 선언 하나만 넣어두면, 언어가 바뀔 때 HomeScreen이 자동으로 다시 그려집니다!
//   // 색깔 분류 게임으로 이동하는 함수
//   const goToStageMap = (gameType: "color" | "shape" | "category") => {
//     navigation.navigate("StageMapScreen", { gameType });
//   };
//   const [alertVisible, setAlertVisible] = useState(false);
//   const [alertTitle, setAlertTitle] = useState("");
//   const [alertMessage, setAlertMessage] = useState("");

//   // 알럿 띄우는 헬퍼 함수
//   const showAlert = (title: string, message: string) => {
//     setAlertTitle(title);
//     setAlertMessage(message);
//     setAlertVisible(true);
//   };

//   const handleLockedGame = (gameName: string) => {
//     triggerHaptic("light");
//     showAlert(
//       i18n.t("alert_locked_title"),
//       i18n.t("alert_locked_message", { gameName }),
//     );
//   };
//   const testAllShapeLevels = () => {
//     shapeLevels.forEach((config) => {
//       const round = createShapeRound(config, 1);

//       console.log(`\n========== LEVEL ${config.level} ==========`);
//       console.log(JSON.stringify(round, null, 2));

//       // 1. 정답 Object 찾기
//       const correctObject = round.objects.find(
//         (object) => object.id === round.correctObjectId,
//       );

//       // 2. answer에 연결된 실제 Target 찾기
//       const correctTargetId = correctObject
//         ? round.answer[correctObject.id]
//         : undefined;

//       const correctTarget = round.targets.find(
//         (target) => target.id === correctTargetId,
//       );

//       // 3. 검증
//       const isShapeMatched = correctObject?.shapeId === correctTarget?.shapeId;

//       // 추가 검증 (있으면 더 좋음)
//       const hasCorrectAnswer = !!correctTargetId;
//       const hasWrongObject =
//         config.mode === "choice"
//           ? (round.wrongObjectIds?.length ?? 0) > 0
//           : true;

//       const passed = isShapeMatched && hasCorrectAnswer && hasWrongObject;

//       console.log(`Level ${config.level}:`, passed ? "✅ PASS" : "❌ FAIL");

//       if (!passed) {
//         console.log("  - correctObject shapeId:", correctObject?.shapeId);
//         console.log("  - correctTarget shapeId:", correctTarget?.shapeId);
//         console.log("  - answer:", round.answer);
//       }
//     });
//   };
//   const testAllShapeLevelsMultiple = (times = 100) => {
//     let failCount = 0;

//     for (let i = 0; i < times; i++) {
//       shapeLevels.forEach((config) => {
//         try {
//           const round = createShapeRound(config, 1);
//           // 1. 정답 Object 찾기
//           const correctObject = round.objects.find(
//             (object) => object.id === round.correctObjectId,
//           );

//           // 2. answer에 연결된 실제 Target 찾기
//           const correctTargetId = correctObject
//             ? round.answer[correctObject.id]
//             : undefined;

//           const correctTarget = round.targets.find(
//             (target) => target.id === correctTargetId,
//           );

//           // 3. 검증
//           const isShapeMatched =
//             correctObject?.shapeId === correctTarget?.shapeId;

//           // 추가 검증 (있으면 더 좋음)
//           const hasCorrectAnswer = !!correctTargetId;
//           const hasWrongObject =
//             config.mode === "choice"
//               ? (round.wrongObjectIds?.length ?? 0) > 0
//               : true;

//           const passed = isShapeMatched && hasCorrectAnswer && hasWrongObject;
//           if (!passed) failCount++;
//         } catch (e) {
//           console.error(`Level ${config.level} throw:`, e);
//           failCount++;
//         }
//       });
//     }

//     console.log(`총 실패 횟수: ${failCount}`);
//   };

//   return (
//     <ImageBackground
//       source={ASSETS.homeBackground}
//       resizeMode="cover"
//       style={{ flex: 1, width: "100%", height: "100%" }}
//     >
//       {/* 💡 핵심: 태블릿에서 전체 내용이 우측으로 밀려 잘리는 현상을 막기 위해
//             부모 뷰에 너비 100%와 중앙 정렬(alignItems: 'center')을 강제합니다. */}
//       <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
//         <Container style={{ width: "100%", maxWidth: 600 }}>
//           {/* 상단 헤더 */}
//           <Header>
//             <TitleContainer>
//               <SubTitle>
//                 <Ionicons
//                   name="cloud-outline"
//                   size={24}
//                   color={BASIC_COLORS.BORDER}
//                 />
//                 <SubTitleText>{i18n.t("subtitle")}</SubTitleText>
//               </SubTitle>
//               <Title>{i18n.t("title")}</Title>
//             </TitleContainer>
//           </Header>

//           {/* 안내 문구 */}
//           <GuideTextContainer>
//             <GuideText>{i18n.t("guide")}</GuideText>
//           </GuideTextContainer>

//           {/* 게임 카드 그리드 */}
//           <GameGridWrapper style={{ width: "100%" }}>
//             <GameGrid>
//               <GameCardItem
//                 bgColor={BASIC_COLORS.ACCENT}
//                 emoji={<ClayColorIcon size={76} />}
//                 title={i18n.t("game_color_title")}
//                 desc={i18n.t("game_color_desc")}
//                 onPress={() => {
//                   triggerHaptic("light");
//                   goToStageMap("color");
//                 }}
//               />
//               <GameCardItem
//                 bgColor={BASIC_COLORS.SECONDARY}
//                 emoji={<ClayShapeIcon size={76} />}
//                 title={i18n.t("game_shape_title")}
//                 desc={i18n.t("game_shape_desc")}
//                 onPress={() => {
//                   triggerHaptic("light");
//                   goToStageMap("shape");
//                 }}
//               />
//               <GameCardItem
//                 bgColor={BASIC_COLORS.SUCCESS}
//                 emoji={<ClayCategoryIcon size={76} />}
//                 title={i18n.t("game_category_title")}
//                 desc={i18n.t("game_category_desc")}
//                 onPress={() => {
//                   triggerHaptic("light");
//                   goToStageMap("category");
//                 }}
//               />
//               <GameCardItem
//                 bgColor={PASTEL_BG.neutral}
//                 emoji={
//                   <Ionicons
//                     name="pencil-outline"
//                     size={40}
//                     color={BASIC_COLORS.TEXT_SUB}
//                   />
//                 }
//                 title="꼬불꼬불 선 따라가기"
//                 desc="팬더와 함께 선을 그려봐요!"
//                 onPress={() => {
//                   triggerHaptic("light");
//                   navigation.navigate("TracingGameScreen");
//                 }}
//               />

//               {/* <GameCardItem
//                 bgColor={PASTEL_BG.neutral}
//                 emoji={
//                   <Ionicons
//                     name="settings-outline"
//                     size={40}
//                     color={BASIC_COLORS.TEXT_SUB}
//                   />
//                 }
//                 title={i18n.t("setting_title")}
//                 desc=""
//                 onPress={() => {
//                   triggerHaptic("light");
//                   navigation.navigate("SettingScreen" as never);
//                 }}
//               /> */}
//             </GameGrid>
//           </GameGridWrapper>

//           {/* 하단 푸터 */}
//           <Footer>{i18n.t("footer_made_with")}</Footer>

//           {guardianNoticeLoaded && (
//             <GuardianNoticeModal
//               visible={guardianNoticeVisible}
//               onClose={handleGuardianNoticeClose}
//             />
//           )}
//         </Container>
//       </View>

//       <CustomAlert
//         visible={alertVisible}
//         title={alertTitle}
//         message={alertMessage}
//         onClose={() => setAlertVisible(false)}
//       />
//     </ImageBackground>
//   );
// }

import React, { useEffect, useState } from "react";
import { ImageBackground, ScrollView, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";

import { ASSETS } from "../../assets/assets";
import { AppText } from "../../utils/AppText";
import { BASIC_COLORS, PASTEL_BG } from "../../design-system/tokens/colors";
import i18n from "../../i18n";

import { useLanguage } from "../../context/LanguageContext";
import GuardianNoticeModal from "../../components/GuardianNoticeModal";
import { getGuardianNoticeEnabled } from "../../components/GuardianNotice/guardianNoticeStorage";

import { ClayColorIcon } from "../../components/icons/ClayGameIcons";
import { triggerHaptic } from "../../utils/haptic";

import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";
import GameCardItem from "../../design-system/ui/GameCardItem";

// ==========================================
// Navigation
// ==========================================

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

// 앱 실행 중 보호자 안내 팝업 한 번만 표시
let hasShownGuardianNoticeThisSession = false;

// ==========================================
// Home Screen
// ==========================================

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProp>();

  useLanguage();

  const [guardianNoticeVisible, setGuardianNoticeVisible] = useState(false);
  const [guardianNoticeLoaded, setGuardianNoticeLoaded] = useState(false);

  // ==========================================
  // 보호자 안내 팝업 설정 확인
  // ==========================================

  useEffect(() => {
    let isMounted = true;

    if (hasShownGuardianNoticeThisSession) {
      setGuardianNoticeLoaded(true);
      return;
    }

    const loadGuardianNoticeSetting = async () => {
      try {
        const enabled = await getGuardianNoticeEnabled();

        if (!isMounted) return;

        if (enabled) {
          setGuardianNoticeVisible(true);
        }
      } catch (error) {
        console.warn("보호자 안내 설정을 불러오지 못했습니다.", error);
      } finally {
        hasShownGuardianNoticeThisSession = true;

        if (isMounted) {
          setGuardianNoticeLoaded(true);
        }
      }
    };

    loadGuardianNoticeSetting();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleGuardianNoticeClose = () => {
    setGuardianNoticeVisible(false);
  };

  // ==========================================
  // 섹션 이동
  // ==========================================

  const goToDrawingSection = () => {
    triggerHaptic("light");
    navigation.navigate("DrawingSectionScreen" as never);
  };

  const goToClassificationSection = () => {
    triggerHaptic("light");
    navigation.navigate("ClassificationSectionScreen" as never);
  };

  // ==========================================
  // Render
  // ==========================================

  return (
    <ImageBackground
      source={ASSETS.homeBackground}
      resizeMode="cover"
      style={{ flex: 1, width: "100%", height: "100%" }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <ScreenContainer>
          {/* 상단 인사말 */}
          <HeaderArea>
            <TitleRow>
              <Ionicons
                name="cloud-outline"
                size={24}
                color={BASIC_COLORS.BORDER}
              />
              <SubTitleText>{i18n.t("subtitle")}</SubTitleText>
            </TitleRow>

            <MainTitle>{i18n.t("title")}</MainTitle>
            <GuideText>{i18n.t("guide")}</GuideText>
          </HeaderArea>

          {/* 놀이 공간 선택 카드 (2개) */}
          <SectionList>
            {/* 그리기 놀이터 */}
            <CardWrapper $shadowColor="#5E4AD1">
              <SectionCard
                $bgColor="#8370F2"
                onPress={goToDrawingSection}
                accessibilityRole="button"
                accessibilityLabel={i18n.t("section_drawing_title")}
              >
                {({ pressed }) => (
                  <CardInner $pressed={pressed}>
                    <IconBadge>
                      <Ionicons
                        name="color-palette"
                        size={44}
                        color="#FFFFFF"
                      />
                    </IconBadge>

                    <CardTextGroup>
                      <CardTitle>{i18n.t("section_drawing_title")}</CardTitle>
                      <CardDesc>{i18n.t("section_drawing_desc")}</CardDesc>
                    </CardTextGroup>
                  </CardInner>
                )}
              </SectionCard>
            </CardWrapper>

            {/* 분류 놀이터 */}
            <CardWrapper $shadowColor="#DC6E26">
              <SectionCard
                $bgColor="#FF944D"
                onPress={goToClassificationSection}
                accessibilityRole="button"
                accessibilityLabel={i18n.t("section_classification_title")}
              >
                {({ pressed }) => (
                  <CardInner $pressed={pressed}>
                    <IconBadge>
                      <ClayColorIcon size={62} />
                    </IconBadge>

                    <CardTextGroup>
                      <CardTitle>
                        {i18n.t("section_classification_title")}
                      </CardTitle>
                      <CardDesc>
                        {i18n.t("section_classification_desc")}
                      </CardDesc>
                    </CardTextGroup>
                  </CardInner>
                )}
              </SectionCard>
            </CardWrapper>
          </SectionList>
          {/* <GameCardItem
            bgColor={PASTEL_BG.neutral}
            emoji={
              <Ionicons
                name="settings-outline"
                size={40}
                color={BASIC_COLORS.TEXT_SUB}
              />
            }
            title={i18n.t("setting_title")}
            desc=""
            onPress={() => {
              triggerHaptic("light");
              navigation.navigate("SettingScreen" as never);
            }}
          /> */}

          {/* 하단 배경(아기 판다·흙길) 공간 + Skinny Mommy Bear 푸터 */}
          <BottomArea>
            <Footer>{i18n.t("footer_made_with")}</Footer>
          </BottomArea>
        </ScreenContainer>
      </ScrollView>

      {/* 보호자 안내 팝업 */}
      {guardianNoticeLoaded && (
        <GuardianNoticeModal
          visible={guardianNoticeVisible}
          onClose={handleGuardianNoticeClose}
        />
      )}
    </ImageBackground>
  );
}

// ==========================================
// Styles
// ==========================================

const ScreenContainer = styled.View`
  flex: 1;
  width: 100%;
  max-width: 600px;
  padding-horizontal: 24px;
  padding-top: 32px;
  padding-bottom: 16px;
`;

const HeaderArea = styled.View`
  align-items: center;
  margin-bottom: 24px;
`;

const TitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
`;

const SubTitleText = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.small}px;
  font-weight: 700;
  color: #5b7083;
`;

const MainTitle = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.title}px;
  font-weight: 900;
  color: ${BASIC_COLORS.TEXT_MAIN};
  text-align: center;
`;

const GuideText = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.body}px;
  font-weight: 600;
  color: #6b7f91;
  text-align: center;
  margin-top: 6px;
`;

const SectionList = styled.View`
  width: 100%;
  gap: 18px;
`;

const CardWrapper = styled.View<{ $shadowColor: string }>`
  width: 100%;
  border-radius: 32px;
  background-color: transparent;
  elevation: 4;
  shadow-color: ${(props) => props.$shadowColor};
  shadow-offset: 0px 8px;
  shadow-opacity: 0.28;
  shadow-radius: 12px;
`;

const SectionCard = styled.Pressable<{ $bgColor: string }>`
  width: 100%;
  border-radius: 32px;
  background-color: ${(props) => props.$bgColor};
  overflow: hidden;
`;

const CardInner = styled(View)<{ $pressed: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: 20px 24px;
  gap: 18px;
  transform: ${(props) => (props.$pressed ? "scale(0.98)" : "scale(1)")};
`;

const IconBadge = styled.View`
  width: 78px;
  height: 78px;
  border-radius: 26px;
  background-color: rgba(255, 255, 255, 0.22);
  align-items: center;
  justify-content: center;
`;

const CardTextGroup = styled.View`
  flex: 1;
`;

const CardTitle = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.heading}px;
  font-weight: 900;
  color: #ffffff;
`;

const CardDesc = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.body}px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.94);
  margin-top: 4px;
`;

const BottomArea = styled.View`
  flex: 1;
  min-height: 150px;
  justify-content: flex-end;
`;

const Footer = styled(AppText)`
  text-align: center;
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.small}px;
  color: #94a3b8;
`;
