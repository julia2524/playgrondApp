// import React, { useEffect, useState } from "react";
// import {
//   I18nManager,
//   ImageBackground,
//   Text,
//   TouchableOpacity,
//   useWindowDimensions,
// } from "react-native";

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
// import SettingButton from "../../components/common/SettingButton";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import { BASIC_COLORS, PASTEL_BG } from "../../design-system/tokens/colors";
// import ResponsiveScreen from "../../utils/ResponsiveScreen";
// import i18n from "../../i18n";
// import { useLanguage } from "../../context/LanguageContext";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import GuardianNoticeModal from "../../components/GuardianNoticeModal";
// import { getGuardianNoticeEnabled } from "../../components/GuardianNotice/guardianNoticeStorage";
// import { triggerHaptic } from "../../utils/haptic";
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
//       style={{ flex: 1 }}
//     >
//       <ResponsiveScreen>
//         <Container>
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
//             {/* <SettingButton
//               onPress={() => {
//                 triggerHaptic("light");
//                 navigation.navigate("SettingScreen" as never);
//               }}
//             /> */}
//           </Header>

//           {/* 안내 문구 */}
//           <GuideTextContainer>
//             <GuideText>{i18n.t("guide")}</GuideText>
//           </GuideTextContainer>

//           {/* 게임 카드 그리드 */}
//           <GameGridWrapper>
//             <GameGrid>
//               {/* 1. 색깔 분류 (활성화) */}
//               <GameCardItem
//                 bgColor={BASIC_COLORS.ACCENT}
//                 emoji={
//                   <Ionicons
//                     name="color-palette"
//                     size={40}
//                     color={PASTEL_BG.neutral}
//                   />
//                 }
//                 title={i18n.t("game_color_title")}
//                 desc={i18n.t("game_color_desc")}
//                 onPress={() => {
//                   triggerHaptic("light");
//                   goToStageMap("color");
//                 }}
//               />

//               {/* 2. 모양 분류 (준비중) */}
//               <GameCardItem
//                 bgColor={BASIC_COLORS.SECONDARY}
//                 emoji={
//                   <Ionicons
//                     name="diamond"
//                     size={40}
//                     color={PASTEL_BG.neutral}
//                   />
//                 }
//                 title={i18n.t("game_shape_title")}
//                 desc={i18n.t("game_shape_desc")}
//                 onPress={() => {
//                   triggerHaptic("light");
//                   goToStageMap("shape");
//                 }}
//               />

//               {/* 3. 크기 분류 (준비중) */}
//               <GameCardItem
//                 bgColor={BASIC_COLORS.SUCCESS}
//                 emoji={
//                   <Ionicons
//                     name="fast-food"
//                     size={40}
//                     color={PASTEL_BG.neutral}
//                   />
//                 }
//                 title={i18n.t("game_category_title")}
//                 desc={i18n.t("game_category_desc")}
//                 onPress={() => {
//                   triggerHaptic("light");
//                   goToStageMap("category");
//                 }}
//               />

//               {/* 4. 새로운 놀이 (준비중) */}
//               {/* <GameCardItem
//                 bgColor={PASTEL_BG.blue} // 진한 파랑 대신 중립 파스텔톤
//                 emoji={
//                   <Ionicons
//                     name="sparkles"
//                     size={40}
//                     color={BASIC_COLORS.BORDER}
//                   />
//                   // 흰색 대신 연한 회색 아이콘 → 자연스럽게 "아직 아니에요" 느낌
//                 }
//                 title={i18n.t("game_new_title")}
//                 desc={i18n.t("game_new_desc")}
//                 onPress={() => handleLockedGame(i18n.t("game_new_title"))}
//               /> */}
//               <GameCardItem
//                 bgColor={PASTEL_BG.neutral} // 진한 파랑 대신 중립 파스텔톤
//                 emoji={
//                   <Ionicons
//                     name="settings-outline"
//                     size={40}
//                     color={BASIC_COLORS.TEXT_SUB}
//                   />
//                   // 흰색 대신 연한 회색 아이콘 → 자연스럽게 "아직 아니에요" 느낌
//                 }
//                 title={i18n.t("setting_title")}
//                 desc=""
//                 onPress={() => {
//                   triggerHaptic("light");
//                   navigation.navigate("SettingScreen" as never);
//                 }}
//               />
//             </GameGrid>
//             {/* <TouchableOpacity
//               onPress={() => navigation.navigate("LanguageScreen")}
//             >
//               <Text style={{ fontSize: 16, fontWeight: "bold" }}>
//                 🌐 번역 검증하기
//               </Text>
//             </TouchableOpacity> */}
//           </GameGridWrapper>

//           {/* ⭐ 게임 카드 그리드 바로 밑에 추가할 설정 버튼 */}
//           {/* <BottomSettingButton
//             onPress={() => {
//               triggerHaptic("light");
//               navigation.navigate("SettingScreen" as never);
//             }}
//             activeOpacity={0.8}
//           >
//             <Ionicons
//               name="settings-outline"
//               size={20}
//               color={BASIC_COLORS.TEXT_MAIN}
//             />
//             <BottomSettingButtonText>
//               {i18n.t("setting_title") || "setting"}
//             </BottomSettingButtonText>
//           </BottomSettingButton> */}
//           {/* 하단 푸터 */}
//           <Footer>{i18n.t("footer_made_with")}</Footer>
//           {guardianNoticeLoaded && (
//             <GuardianNoticeModal
//               visible={guardianNoticeVisible}
//               onClose={handleGuardianNoticeClose}
//             />
//           )}
//         </Container>
//         {/* ⭐ 2. ImageBackground 바로 아래에 CustomAlert를 넣어주기! */}
//         <CustomAlert
//           visible={alertVisible}
//           title={alertTitle}
//           message={alertMessage}
//           onClose={() => setAlertVisible(false)}
//         />
//       </ResponsiveScreen>
//     </ImageBackground>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  I18nManager,
  ImageBackground,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

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
  SubTitleText,
  Title,
  TitleContainer,
} from "./homeStyles";
import CustomAlert from "../../components/common/CustomAlert";
import { shapeLevels } from "../classification/shape/constants/levels";
import { createShapeRound } from "../classification/shape/shapeGenerators";
import SettingButton from "../../components/common/SettingButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BASIC_COLORS, PASTEL_BG } from "../../design-system/tokens/colors";
import ResponsiveScreen from "../../utils/ResponsiveScreen";
import i18n from "../../i18n";
import { useLanguage } from "../../context/LanguageContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GuardianNoticeModal from "../../components/GuardianNoticeModal";
import { getGuardianNoticeEnabled } from "../../components/GuardianNotice/guardianNoticeStorage";
import { triggerHaptic } from "../../utils/haptic";
type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

// ✅ 앱이 완전히 종료되기 전까지 한 번만 보여주기 위한 세션 플래그
let hasShownGuardianNoticeThisSession = false;

export default function HomeScreen() {
  console.log("RTL?", I18nManager.isRTL);
  const [guardianNoticeVisible, setGuardianNoticeVisible] = useState(false);
  const [guardianNoticeLoaded, setGuardianNoticeLoaded] = useState(false);

  // ==========================================
  // 보호자 안내 팝업 설정 확인
  // ==========================================

  useEffect(() => {
    // 이미 이번 세션에서 한 번 보여줬으면 더 이상 안 띄움
    if (hasShownGuardianNoticeThisSession) {
      setGuardianNoticeLoaded(true);
      return;
    }
    const loadGuardianNoticeSetting = async () => {
      const enabled = await getGuardianNoticeEnabled();

      if (enabled) {
        setGuardianNoticeVisible(true);
      }
      hasShownGuardianNoticeThisSession = true; // 이번 앱 실행에서는 더 이상 안 보여줌
      setGuardianNoticeLoaded(true);
    };

    loadGuardianNoticeSetting();
  }, []);

  // ==========================================
  // 팝업 닫기
  // ==========================================

  const handleGuardianNoticeClose = () => {
    setGuardianNoticeVisible(false);
  };
  const navigation = useNavigation<HomeNavigationProp>();
  useLanguage(); // 💡 이 선언 하나만 넣어두면, 언어가 바뀔 때 HomeScreen이 자동으로 다시 그려집니다!
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
    triggerHaptic("light");
    showAlert(
      i18n.t("alert_locked_title"),
      i18n.t("alert_locked_message", { gameName }),
    );
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
      style={{ flex: 1, width: "100%", height: "100%" }}
    >
      {/* 💡 핵심: 태블릿에서 전체 내용이 우측으로 밀려 잘리는 현상을 막기 위해 
            부모 뷰에 너비 100%와 중앙 정렬(alignItems: 'center')을 강제합니다. */}
      <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
        <Container style={{ width: "100%", maxWidth: 600 }}>
          {/* 상단 헤더 */}
          <Header>
            <TitleContainer>
              <SubTitle>
                <Ionicons
                  name="cloud-outline"
                  size={24}
                  color={BASIC_COLORS.BORDER}
                />
                <SubTitleText>{i18n.t("subtitle")}</SubTitleText>
              </SubTitle>
              <Title>{i18n.t("title")}</Title>
            </TitleContainer>
          </Header>

          {/* 안내 문구 */}
          <GuideTextContainer>
            <GuideText>{i18n.t("guide")}</GuideText>
          </GuideTextContainer>

          {/* 게임 카드 그리드 */}
          <GameGridWrapper style={{ width: "100%" }}>
            <GameGrid>
              {/* 1. 색깔 분류 (활성화) */}
              <GameCardItem
                bgColor={BASIC_COLORS.ACCENT}
                emoji={
                  <Ionicons
                    name="color-palette"
                    size={40}
                    color={PASTEL_BG.neutral}
                  />
                }
                title={i18n.t("game_color_title")}
                desc={i18n.t("game_color_desc")}
                onPress={() => {
                  triggerHaptic("light");
                  goToStageMap("color");
                }}
              />

              {/* 2. 모양 분류 (준비중) */}
              <GameCardItem
                bgColor={BASIC_COLORS.SECONDARY}
                emoji={
                  <Ionicons
                    name="diamond"
                    size={40}
                    color={PASTEL_BG.neutral}
                  />
                }
                title={i18n.t("game_shape_title")}
                desc={i18n.t("game_shape_desc")}
                onPress={() => {
                  triggerHaptic("light");
                  goToStageMap("shape");
                }}
              />

              {/* 3. 크기 분류 (준비중) */}
              <GameCardItem
                bgColor={BASIC_COLORS.SUCCESS}
                emoji={
                  <Ionicons
                    name="fast-food"
                    size={40}
                    color={PASTEL_BG.neutral}
                  />
                }
                title={i18n.t("game_category_title")}
                desc={i18n.t("game_category_desc")}
                onPress={() => {
                  triggerHaptic("light");
                  goToStageMap("category");
                }}
              />

              <GameCardItem
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
              />
            </GameGrid>
          </GameGridWrapper>

          {/* 하단 푸터 */}
          <Footer>{i18n.t("footer_made_with")}</Footer>

          {guardianNoticeLoaded && (
            <GuardianNoticeModal
              visible={guardianNoticeVisible}
              onClose={handleGuardianNoticeClose}
            />
          )}
        </Container>
      </View>

      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
    </ImageBackground>
  );
}
