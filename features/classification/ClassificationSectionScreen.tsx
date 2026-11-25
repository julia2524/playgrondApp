// import React, { useRef, useState } from "react";
// import {
//   Animated,
//   Pressable,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   View,
// } from "react-native";

// import { useNavigation } from "@react-navigation/native";
// import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

// import Ionicons from "@expo/vector-icons/Ionicons";
// import styled from "styled-components/native";

// import type { RootStackParamList } from "../../navigation/types";
// import { AppText } from "../../utils/AppText";
// import { BASIC_COLORS } from "../../design-system/tokens/colors";
// import { useLanguage } from "../../context/LanguageContext";
// import i18n from "../../i18n";

// import {
//   ClayCategoryIcon,
//   ClayColorIcon,
//   ClayShapeIcon,
// } from "../../components/icons/ClayGameIcons";

// import { triggerHaptic } from "../../utils/haptic";

// // ==========================================
// // Navigation
// // ==========================================

// type NavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   "ClassificationSectionScreen"
// >;

// type GameType = "color" | "shape" | "category";

// // ==========================================
// // Screen
// // ==========================================

// export default function ClassificationSectionScreen() {
//   const navigation = useNavigation<NavigationProp>();
//   useLanguage();

//   const [selected, setSelected] = useState<GameType | null>(null);

//   const animations = useRef({
//     color: new Animated.Value(1),
//     shape: new Animated.Value(1),
//     category: new Animated.Value(1),
//   }).current;

//   const opacities = useRef({
//     color: new Animated.Value(1),
//     shape: new Animated.Value(1),
//     category: new Animated.Value(1),
//   }).current;

//   const headerOpacity = useRef(new Animated.Value(1)).current;
//   const footerOpacity = useRef(new Animated.Value(1)).current;

//   const goToGame = (gameType: GameType) => {
//     if (selected) return;

//     setSelected(gameType);
//     triggerHaptic("light");

//     const otherTypes = (["color", "shape", "category"] as GameType[]).filter(
//       (type) => type !== gameType,
//     );

//     const selectedAnimation = Animated.timing(animations[gameType], {
//       toValue: 5.5,
//       duration: 550,
//       useNativeDriver: true,
//     });

//     const otherAnimations = otherTypes.map((type) =>
//       Animated.timing(opacities[type], {
//         toValue: 0,
//         duration: 350,
//         useNativeDriver: true,
//       }),
//     );

//     Animated.parallel([
//       selectedAnimation,
//       ...otherAnimations,
//       Animated.timing(headerOpacity, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: true,
//       }),
//       Animated.timing(footerOpacity, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: true,
//       }),
//     ]).start(({ finished }) => {
//       if (!finished) return;

//       navigation.navigate("StageMapScreen", { gameType });
//     });
//   };

//   const handleBack = () => {
//     if (selected) return;

//     triggerHaptic("light");
//     navigation.goBack();
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="dark-content" backgroundColor="#FFF9F0" />

//       <View style={styles.container}>
//         {/* 배경 장식 */}
//         <View pointerEvents="none" style={styles.backgroundDecor}>
//           <View style={styles.softCircleOne} />
//           <View style={styles.softCircleTwo} />
//           <View style={styles.softCircleThree} />

//           <BubbleDot style={styles.bubbleDotOne} />
//           <BubbleDot style={styles.bubbleDotTwo} />
//           <BubbleDot style={styles.bubbleDotThree} />
//           <BubbleDot style={styles.bubbleDotFour} />
//           <BubbleDot style={styles.bubbleDotFive} />
//         </View>

//         {/* 헤더 */}
//         <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
//           <Pressable
//             onPress={handleBack}
//             disabled={!!selected}
//             style={styles.backButton}
//             accessibilityRole="button"
//             accessibilityLabel="뒤로 가기"
//           >
//             <Ionicons
//               name="arrow-back"
//               size={23}
//               color={BASIC_COLORS.TEXT_MAIN}
//             />
//           </Pressable>

//           <View style={styles.headerLabel}>
//             <Ionicons name="water" size={14} color="#66B8D5" />
//             <StyledLabel>
//               {i18n.t("section_classification_title", {
//                 defaultValue: "분류 놀이터",
//               })}
//             </StyledLabel>
//           </View>

//           <View style={styles.headerRight} />
//         </Animated.View>

//         {/* 타이틀 */}
//         <Animated.View style={[styles.titleArea, { opacity: headerOpacity }]}>
//           <AppText style={styles.eyebrow}>
//             {i18n.t("classification_bubble_eyebrow", {
//               defaultValue: "POP POP POP!",
//             })}
//           </AppText>

//           <AppText style={styles.title}>
//             {i18n.t("classification_select_title", {
//               defaultValue: "무엇을 찾아볼까?",
//             })}
//           </AppText>

//           <AppText style={styles.description}>
//             {i18n.t("classification_bubble_desc", {
//               defaultValue: "마음에 드는 비눗방울을 톡!",
//             })}
//           </AppText>
//         </Animated.View>

//         {/* 비눗방울 놀이터 */}
//         <View style={styles.playground}>
//           {/* 색깔 */}
//           <Bubble
//             type="color"
//             scale={animations.color}
//             opacity={opacities.color}
//             selected={selected === "color"}
//             onPress={() => goToGame("color")}
//             size={148}
//             color="#F8B98F"
//             borderColor="#FFE0C8"
//             position={styles.colorPosition}
//             title={i18n.t("classification_color_title", {
//               defaultValue: "알록달록 색깔 찾기",
//             })}
//             subtitle={i18n.t("classification_color_desc", {
//               defaultValue: "같은 색깔끼리 모아볼까?",
//             })}
//           />

//           {/* 모양 */}
//           <Bubble
//             type="shape"
//             scale={animations.shape}
//             opacity={opacities.shape}
//             selected={selected === "shape"}
//             onPress={() => goToGame("shape")}
//             size={132}
//             color="#AFA2ED"
//             borderColor="#DCD4FF"
//             position={styles.shapePosition}
//             title={i18n.t("classification_shape_title", {
//               defaultValue: "반짝반짝 모양 찾기",
//             })}
//             subtitle={i18n.t("classification_shape_desc", {
//               defaultValue: "동그라미, 세모, 네모!",
//             })}
//           />

//           {/* 분류 */}
//           <Bubble
//             type="category"
//             scale={animations.category}
//             opacity={opacities.category}
//             selected={selected === "category"}
//             onPress={() => goToGame("category")}
//             size={140}
//             color="#91D5C2"
//             borderColor="#C8F0E4"
//             position={styles.categoryPosition}
//             title={i18n.t("classification_category_title", {
//               defaultValue: "친구들끼리 모으기",
//             })}
//             subtitle={i18n.t("classification_category_desc", {
//               defaultValue: "동물, 음식, 탈것을 찾아봐!",
//             })}
//           />

//           {/* 가운데 물방울 장식 */}
//           <Animated.View
//             pointerEvents="none"
//             style={[styles.centerDecoration, { opacity: headerOpacity }]}
//           >
//             <View style={styles.centerBubble}>
//               <Ionicons name="sparkles" size={29} color="#FFFFFF" />
//             </View>
//             <AppText style={styles.centerText}>톡!</AppText>
//           </Animated.View>
//         </View>

//         {/* 하단 */}
//         <Animated.View style={[styles.footer, { opacity: footerOpacity }]}>
//           <View style={styles.footerBubble}>
//             <Ionicons name="water" size={16} color="#76BCD7" />
//           </View>

//           <AppText style={styles.footerText}>
//             {i18n.t("classification_select_footer", {
//               defaultValue: "천천히 살펴보고 골라도 좋아! ✨",
//             })}
//           </AppText>
//         </Animated.View>
//       </View>
//     </SafeAreaView>
//   );
// }

// // ==========================================
// // Bubble
// // ==========================================

// function Bubble({
//   type,
//   scale,
//   opacity,
//   selected,
//   onPress,
//   size,
//   color,
//   borderColor,
//   position,
//   title,
//   subtitle,
// }: {
//   type: GameType;
//   scale: Animated.Value;
//   opacity: Animated.Value;
//   selected: boolean;
//   onPress: () => void;
//   size: number;
//   color: string;
//   borderColor: string;
//   position: object;
//   title: string;
//   subtitle: string;
// }) {
//   const Icon =
//     type === "color"
//       ? ClayColorIcon
//       : type === "shape"
//         ? ClayShapeIcon
//         : ClayCategoryIcon;

//   return (
//     <View style={[styles.bubblePosition, position]}>
//       <Animated.View
//         style={[
//           styles.bubbleGroup,
//           {
//             opacity,
//             zIndex: selected ? 20 : 1,
//           },
//         ]}
//       >
//         <Pressable
//           onPress={onPress}
//           disabled={!!selected}
//           accessibilityRole="button"
//           accessibilityLabel={title}
//           style={styles.bubblePressable}
//         >
//           <Animated.View
//             style={[
//               styles.bubble,
//               {
//                 width: size,
//                 height: size,
//                 borderRadius: size / 2,
//                 backgroundColor: color,
//                 borderColor,
//                 transform: [{ scale }],
//               },
//             ]}
//           >
//             {/* 버블 내부 반사광 */}
//             <View style={styles.bubbleReflection} />
//             <View style={styles.bubbleReflectionSmall} />

//             {/* 아이콘 */}
//             <View style={styles.iconArea}>
//               <Icon size={type === "color" ? 72 : 66} />
//             </View>

//             {/* 빛나는 점 */}
//             <View style={styles.bubbleShine} />
//             <View style={styles.bubbleShineSmall} />

//             {/* 아래쪽 반사광 */}
//             <View style={styles.bubbleBottomShine} />
//           </Animated.View>
//         </Pressable>

//         <Animated.View
//           style={[
//             styles.bubbleLabel,
//             {
//               opacity: selected ? 0 : 1,
//             },
//           ]}
//         >
//           <AppText style={styles.bubbleTitle}>{title}</AppText>

//           <AppText style={styles.bubbleSubtitle}>{subtitle}</AppText>
//         </Animated.View>
//       </Animated.View>
//     </View>
//   );
// }

// // ==========================================
// // Decorative Bubble Dot
// // ==========================================

// function BubbleDot({ style }: { style: object }) {
//   return <View pointerEvents="none" style={[styles.decorBubble, style]} />;
// }

// // ==========================================
// // Styled
// // ==========================================

// const StyledLabel = styled(AppText)`
//   font-family: ${(props) => props.theme.fontFamily};
//   font-size: 12px;
//   font-weight: 800;
//   color: #6b9fb4;
// `;

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#FFF9F0",
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "#FFF9F0",
//     overflow: "hidden",
//   },

//   // Background
//   backgroundDecor: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   softCircleOne: {
//     position: "absolute",
//     width: 230,
//     height: 230,
//     borderRadius: 115,
//     backgroundColor: "#FDE8D9",
//     top: "18%",
//     right: -125,
//     opacity: 0.6,
//   },
//   softCircleTwo: {
//     position: "absolute",
//     width: 190,
//     height: 190,
//     borderRadius: 95,
//     backgroundColor: "#E3F3F8",
//     bottom: "12%",
//     left: -110,
//     opacity: 0.8,
//   },
//   softCircleThree: {
//     position: "absolute",
//     width: 130,
//     height: 130,
//     borderRadius: 65,
//     backgroundColor: "#EEE9FF",
//     top: "54%",
//     left: "40%",
//     opacity: 0.45,
//   },

//   decorBubble: {
//     position: "absolute",
//     borderWidth: 1.5,
//     borderColor: "rgba(126,190,214,0.35)",
//     backgroundColor: "rgba(255,255,255,0.25)",
//     borderRadius: 100,
//   },
//   bubbleDotOne: {
//     width: 24,
//     height: 24,
//     top: "17%",
//     left: "13%",
//   },
//   bubbleDotTwo: {
//     width: 13,
//     height: 13,
//     top: "30%",
//     right: "12%",
//   },
//   bubbleDotThree: {
//     width: 18,
//     height: 18,
//     bottom: "24%",
//     right: "12%",
//   },
//   bubbleDotFour: {
//     width: 10,
//     height: 10,
//     bottom: "12%",
//     left: "27%",
//   },
//   bubbleDotFive: {
//     width: 15,
//     height: 15,
//     top: "62%",
//     left: "8%",
//   },

//   // Header
//   header: {
//     height: 58,
//     paddingHorizontal: 22,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   backButton: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     backgroundColor: "#FFFFFF",
//     alignItems: "center",
//     justifyContent: "center",
//     elevation: 3,
//     shadowColor: "#B8C8CE",
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//   },
//   headerLabel: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//     paddingHorizontal: 13,
//     paddingVertical: 8,
//     borderRadius: 30,
//     backgroundColor: "#E8F5F8",
//   },
//   headerRight: {
//     width: 44,
//   },

//   // Title
//   titleArea: {
//     alignItems: "center",
//     marginTop: 24,
//   },
//   eyebrow: {
//     color: "#E99D77",
//     fontSize: 11,
//     fontWeight: "900",
//     letterSpacing: 2,
//     marginBottom: 10,
//   },
//   title: {
//     color: BASIC_COLORS.TEXT_MAIN,
//     fontSize: 27,
//     fontWeight: "900",
//   },
//   description: {
//     color: "#9B9A94",
//     fontSize: 13,
//     fontWeight: "600",
//     marginTop: 9,
//   },

//   // Playground
//   playground: {
//     flex: 1,
//     position: "relative",
//     marginTop: 12,
//   },
//   bubblePosition: {
//     position: "absolute",
//   },
//   bubbleGroup: {
//     alignItems: "center",
//   },
//   bubblePressable: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   bubble: {
//     borderWidth: 3,
//     alignItems: "center",
//     justifyContent: "center",
//     overflow: "hidden",
//     elevation: 8,
//     shadowColor: "#A6B8C0",
//     shadowOffset: { width: 0, height: 9 },
//     shadowOpacity: 0.23,
//     shadowRadius: 12,
//   },
//   bubbleReflection: {
//     position: "absolute",
//     width: "55%",
//     height: "17%",
//     borderRadius: 50,
//     backgroundColor: "rgba(255,255,255,0.5)",
//     top: "12%",
//     left: "12%",
//     transform: [{ rotate: "-30deg" }],
//   },
//   bubbleReflectionSmall: {
//     position: "absolute",
//     width: "30%",
//     height: "9%",
//     borderRadius: 30,
//     backgroundColor: "rgba(255,255,255,0.28)",
//     top: "27%",
//     left: "15%",
//     transform: [{ rotate: "-30deg" }],
//   },
//   iconArea: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   bubbleShine: {
//     position: "absolute",
//     width: 11,
//     height: 11,
//     borderRadius: 10,
//     backgroundColor: "rgba(255,255,255,0.9)",
//     top: "20%",
//     right: "22%",
//   },
//   bubbleShineSmall: {
//     position: "absolute",
//     width: 5,
//     height: 5,
//     borderRadius: 5,
//     backgroundColor: "rgba(255,255,255,0.8)",
//     top: "30%",
//     right: "17%",
//   },
//   bubbleBottomShine: {
//     position: "absolute",
//     width: "48%",
//     height: 5,
//     borderRadius: 10,
//     backgroundColor: "rgba(255,255,255,0.25)",
//     bottom: "12%",
//   },

//   bubbleLabel: {
//     alignItems: "center",
//     marginTop: 10,
//     width: 170,
//   },
//   bubbleTitle: {
//     color: BASIC_COLORS.TEXT_MAIN,
//     fontSize: 15,
//     fontWeight: "900",
//     textAlign: "center",
//   },
//   bubbleSubtitle: {
//     color: "#99968F",
//     fontSize: 10,
//     fontWeight: "600",
//     textAlign: "center",
//     marginTop: 4,
//   },

//   // Bubble positions
//   colorPosition: {
//     top: "5%",
//     left: "8%",
//   },
//   shapePosition: {
//     top: "34%",
//     right: "7%",
//   },
//   categoryPosition: {
//     bottom: "6%",
//     left: "13%",
//   },

//   // Center decoration
//   centerDecoration: {
//     position: "absolute",
//     top: "46%",
//     left: "49%",
//     alignItems: "center",
//     transform: [{ translateX: -25 }],
//   },
//   centerBubble: {
//     width: 54,
//     height: 54,
//     borderRadius: 27,
//     backgroundColor: "#F8D7C6",
//     borderWidth: 2,
//     borderColor: "#FFFFFF",
//     alignItems: "center",
//     justifyContent: "center",
//     elevation: 4,
//   },
//   centerText: {
//     color: "#D89B7B",
//     fontSize: 11,
//     fontWeight: "900",
//     marginTop: 5,
//   },

//   // Footer
//   footer: {
//     alignItems: "center",
//     paddingBottom: 22,
//     paddingTop: 8,
//   },
//   footerBubble: {
//     width: 34,
//     height: 34,
//     borderRadius: 17,
//     backgroundColor: "#E7F4F7",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 8,
//   },
//   footerText: {
//     color: "#A39E93",
//     fontSize: 11,
//     fontWeight: "600",
//   },
// });

import React, { useRef, useState } from "react";
import { Animated, Pressable, SafeAreaView, StatusBar } from "react-native";

import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";

import type { RootStackParamList } from "../../navigation/types";
import { AppText } from "../../utils/AppText";
import { BASIC_COLORS } from "../../design-system/tokens/colors";
import { useLanguage } from "../../context/LanguageContext";
import i18n from "../../i18n";

import {
  ClayCategoryIcon,
  ClayColorIcon,
  ClayShapeIcon,
} from "../../components/icons/ClayGameIcons";

import { triggerHaptic } from "../../utils/haptic";

// ==========================================
// Navigation
// ==========================================

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ClassificationSectionScreen"
>;

type GameType = "color" | "shape" | "category";

// ==========================================
// Screen
// ==========================================

export default function ClassificationSectionScreen() {
  const navigation = useNavigation<NavigationProp>();
  useLanguage();

  const [selected, setSelected] = useState<GameType | null>(null);

  const animations = useRef({
    color: new Animated.Value(1),
    shape: new Animated.Value(1),
    category: new Animated.Value(1),
  }).current;

  const opacities = useRef({
    color: new Animated.Value(1),
    shape: new Animated.Value(1),
    category: new Animated.Value(1),
  }).current;

  const headerOpacity = useRef(new Animated.Value(1)).current;
  const footerOpacity = useRef(new Animated.Value(1)).current;

  const goToGame = (gameType: GameType) => {
    if (selected) return;

    setSelected(gameType);
    triggerHaptic("light");

    const otherTypes = (["color", "shape", "category"] as GameType[]).filter(
      (type) => type !== gameType,
    );

    const selectedAnimation = Animated.timing(animations[gameType], {
      toValue: 5.5,
      duration: 550,
      useNativeDriver: true,
    });

    const otherAnimations = otherTypes.map((type) =>
      Animated.timing(opacities[type], {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
    );

    Animated.parallel([
      selectedAnimation,
      ...otherAnimations,
      Animated.timing(headerOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(footerOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (!finished) return;

      navigation.navigate("StageMapScreen", { gameType });
    });
  };

  const handleBack = () => {
    if (selected) return;

    triggerHaptic("light");
    navigation.goBack();
  };

  return (
    <SafeAreaContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF9F0" />

      <ScreenContainer>
        {/* 배경 장식 */}
        <BackgroundDecor pointerEvents="none">
          <SoftCircleOne />
          <SoftCircleTwo />
          <SoftCircleThree />

          <DecorBubble $size={24} $top="17%" $left="13%" />
          <DecorBubble $size={13} $top="30%" $right="12%" />
          <DecorBubble $size={18} $bottom="24%" $right="12%" />
          <DecorBubble $size={10} $bottom="12%" $left="27%" />
          <DecorBubble $size={15} $top="62%" $left="8%" />
        </BackgroundDecor>

        {/* 헤더 */}
        <Header style={{ opacity: headerOpacity }}>
          <BackButton
            onPress={handleBack}
            disabled={!!selected}
            accessibilityRole="button"
            accessibilityLabel="뒤로 가기"
          >
            <Ionicons
              name="arrow-back"
              size={23}
              color={BASIC_COLORS.TEXT_MAIN}
            />
          </BackButton>

          <HeaderLabel>
            <Ionicons name="water" size={14} color="#5BB4D4" />
            <HeaderLabelText>
              {i18n.t("section_classification_title", {
                defaultValue: "분류 놀이터",
              })}
            </HeaderLabelText>
          </HeaderLabel>

          <HeaderRightSpace />
        </Header>

        {/* 타이틀 */}
        <TitleArea style={{ opacity: headerOpacity }}>
          <EyebrowText>
            {i18n.t("classification_bubble_eyebrow", {
              defaultValue: "POP POP POP!",
            })}
          </EyebrowText>

          <MainTitleText>
            {i18n.t("classification_select_title", {
              defaultValue: "무엇을 찾아볼까?",
            })}
          </MainTitleText>

          <DescriptionText>
            {i18n.t("classification_bubble_desc", {
              defaultValue: "마음에 드는 비눗방울을 톡!",
            })}
          </DescriptionText>
        </TitleArea>

        {/* 비눗방울 놀이터 */}
        <Playground>
          {/* 색깔 분류 */}
          <Bubble
            type="color"
            scale={animations.color}
            opacity={opacities.color}
            selected={selected === "color"}
            onPress={() => goToGame("color")}
            size={146}
            color="#FFBE94"
            borderColor="#FFF1E6"
            shadowColor="#E69E73"
            position={{ top: "4%", left: "7%" }}
            title={i18n.t("classification_color_title", {
              defaultValue: "알록달록 색깔 찾기",
            })}
            subtitle={i18n.t("classification_color_desc", {
              defaultValue: "같은 색깔끼리 모아볼까?",
            })}
          />

          {/* 모양 분류 */}
          <Bubble
            type="shape"
            scale={animations.shape}
            opacity={opacities.shape}
            selected={selected === "shape"}
            onPress={() => goToGame("shape")}
            size={134}
            color="#BEB3F5"
            borderColor="#F0ECFF"
            shadowColor="#9A8CE0"
            position={{ top: "32%", right: "7%" }}
            title={i18n.t("classification_shape_title", {
              defaultValue: "반짝반짝 모양 찾기",
            })}
            subtitle={i18n.t("classification_shape_desc", {
              defaultValue: "동그라미, 세모, 네모!",
            })}
          />

          {/* 사물 분류 */}
          <Bubble
            type="category"
            scale={animations.category}
            opacity={opacities.category}
            selected={selected === "category"}
            onPress={() => goToGame("category")}
            size={140}
            color="#9CE0CC"
            borderColor="#E6FBF4"
            shadowColor="#74BFA9"
            position={{ bottom: "5%", left: "12%" }}
            title={i18n.t("classification_category_title", {
              defaultValue: "친구들끼리 모으기",
            })}
            subtitle={i18n.t("classification_category_desc", {
              defaultValue: "동물, 음식, 탈것을 찾아봐!",
            })}
          />

          {/* 가운데 물방울 장식 */}
          <CenterDecoration
            pointerEvents="none"
            style={{ opacity: headerOpacity }}
          >
            <CenterBubble>
              <Ionicons name="sparkles" size={26} color="#5BB4D4" />
            </CenterBubble>
            <CenterText>톡!</CenterText>
          </CenterDecoration>
        </Playground>

        {/* 하단 */}
        <FooterArea style={{ opacity: footerOpacity }}>
          <FooterBubble>
            <Ionicons name="water" size={16} color="#68B9D6" />
          </FooterBubble>

          <FooterText>
            {i18n.t("classification_select_footer", {
              defaultValue: "천천히 살펴보고 골라도 좋아! ✨",
            })}
          </FooterText>
        </FooterArea>
      </ScreenContainer>
    </SafeAreaContainer>
  );
}

// ==========================================
// Bubble Component
// ==========================================

interface BubbleProps {
  type: GameType;
  scale: Animated.Value;
  opacity: Animated.Value;
  selected: boolean;
  onPress: () => void;
  size: number;
  color: string;
  borderColor: string;
  shadowColor: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  title: string;
  subtitle: string;
}

function Bubble({
  type,
  scale,
  opacity,
  selected,
  onPress,
  size,
  color,
  borderColor,
  shadowColor,
  position,
  title,
  subtitle,
}: BubbleProps) {
  const Icon =
    type === "color"
      ? ClayColorIcon
      : type === "shape"
        ? ClayShapeIcon
        : ClayCategoryIcon;

  return (
    <BubblePosition
      style={[
        position as object,
        {
          zIndex: selected ? 30 : 1,
          elevation: selected ? 30 : 1,
        },
      ]}
    >
      <BubbleGroup style={{ opacity }}>
        <BubblePressable
          onPress={onPress}
          disabled={selected}
          accessibilityRole="button"
          accessibilityLabel={title}
        >
          <BubbleCircle
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: color,
              borderColor,
              shadowColor,
              elevation: selected ? 20 : 8,
              transform: [{ scale }],
            }}
          >
            {/* 버블 내부 반사광 */}
            <BubbleReflection />
            <BubbleReflectionSmall />

            {/* 3D 클레이 아이콘 */}
            <IconArea>
              <Icon size={type === "color" ? 72 : 66} />
            </IconArea>

            {/* 빛나는 점 & 하단 반사광 */}
            <BubbleShine />
            <BubbleShineSmall />
            <BubbleBottomShine />
          </BubbleCircle>
        </BubblePressable>

        <BubbleLabel style={{ opacity: selected ? 0 : 1 }}>
          <BubbleTitle>{title}</BubbleTitle>
          <BubbleSubtitle>{subtitle}</BubbleSubtitle>
        </BubbleLabel>
      </BubbleGroup>
    </BubblePosition>
  );
}

// ==========================================
// Styles
// ==========================================

const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff9f0;
`;

const ScreenContainer = styled.View`
  flex: 1;
  background-color: #fff9f0;
  overflow: hidden;
`;

const BackgroundDecor = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const SoftCircleOne = styled.View`
  position: absolute;
  width: 230px;
  height: 230px;
  border-radius: 115px;
  background-color: #fde8d9;
  top: 18%;
  right: -125px;
  opacity: 0.6;
`;

const SoftCircleTwo = styled.View`
  position: absolute;
  width: 190px;
  height: 190px;
  border-radius: 95px;
  background-color: #e3f3f8;
  bottom: 12%;
  left: -110px;
  opacity: 0.8;
`;

const SoftCircleThree = styled.View`
  position: absolute;
  width: 130px;
  height: 130px;
  border-radius: 65px;
  background-color: #eee9ff;
  top: 54%;
  left: 40%;
  opacity: 0.45;
`;

interface DecorBubbleProps {
  $size: number;
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
}

const DecorBubble = styled.View<DecorBubbleProps>`
  position: absolute;
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  border-radius: ${(props) => props.$size / 2}px;
  border-width: 1.5px;
  border-color: rgba(126, 190, 214, 0.38);
  background-color: rgba(255, 255, 255, 0.35);
  ${(props) => (props.$top ? `top: ${props.$top};` : "")}
  ${(props) => (props.$bottom ? `bottom: ${props.$bottom};` : "")}
  ${(props) => (props.$left ? `left: ${props.$left};` : "")}
  ${(props) => (props.$right ? `right: ${props.$right};` : "")}
`;

const Header = styled(Animated.View)`
  height: 58px;
  padding-horizontal: 22px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 5;
`;

const BackButton = styled.Pressable`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  elevation: 3;
  shadow-color: #b8c8ce;
  shadow-offset: 0px 3px;
  shadow-opacity: 0.2;
  shadow-radius: 5px;
`;

const HeaderLabel = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  padding-horizontal: 14px;
  padding-vertical: 8px;
  border-radius: 30px;
  background-color: #e6f5fa;
`;

const HeaderLabelText = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 12px;
  font-weight: 800;
  color: #5b99b2;
`;

const HeaderRightSpace = styled.View`
  width: 44px;
`;

const TitleArea = styled(Animated.View)`
  align-items: center;
  margin-top: 18px;
  z-index: 5;
`;

const EyebrowText = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  color: #e99d77;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 2px;
  margin-bottom: 8px;
`;

const MainTitleText = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  color: ${BASIC_COLORS.TEXT_MAIN};
  font-size: ${(props) => props.theme.typography.title}px;
  font-weight: 900;
  text-align: center;
`;

const DescriptionText = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  color: #96948e;
  font-size: ${(props) => props.theme.typography.body}px;
  font-weight: 600;
  margin-top: 8px;
`;

const Playground = styled.View`
  flex: 1;
  position: relative;
  margin-top: 8px;
`;

const BubblePosition = styled.View`
  position: absolute;
`;

const BubbleGroup = styled(Animated.View)`
  align-items: center;
`;

const BubblePressable = styled(Pressable)`
  align-items: center;
  justify-content: center;
`;

const BubbleCircle = styled(Animated.View)`
  border-width: 3.5px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  shadow-offset: 0px 9px;
  shadow-opacity: 0.25;
  shadow-radius: 12px;
`;

const BubbleReflection = styled.View`
  position: absolute;
  width: 55%;
  height: 17%;
  border-radius: 50px;
  background-color: rgba(255, 255, 255, 0.55);
  top: 12%;
  left: 12%;
  transform: rotate(-30deg);
`;

const BubbleReflectionSmall = styled.View`
  position: absolute;
  width: 30%;
  height: 9%;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.32);
  top: 27%;
  left: 15%;
  transform: rotate(-30deg);
`;

const IconArea = styled.View`
  align-items: center;
  justify-content: center;
`;

const BubbleShine = styled.View`
  position: absolute;
  width: 11px;
  height: 11px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.92);
  top: 20%;
  right: 22%;
`;

const BubbleShineSmall = styled.View`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.85);
  top: 30%;
  right: 17%;
`;

const BubbleBottomShine = styled.View`
  position: absolute;
  width: 48%;
  height: 5px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.3);
  bottom: 12%;
`;

const BubbleLabel = styled(Animated.View)`
  align-items: center;
  margin-top: 10px;
  width: 176px;
`;

const BubbleTitle = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  color: ${BASIC_COLORS.TEXT_MAIN};
  font-size: 15px;
  font-weight: 900;
  text-align: center;
`;

const BubbleSubtitle = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  color: #95928b;
  font-size: 11px;
  font-weight: 600;
  text-align: center;
  margin-top: 3px;
`;

const CenterDecoration = styled(Animated.View)`
  position: absolute;
  top: 45%;
  left: 50%;
  align-items: center;
  transform: translateX(-27px);
`;

const CenterBubble = styled.View`
  width: 54px;
  height: 54px;
  border-radius: 27px;
  background-color: #e2f4fa;
  border-width: 2.5px;
  border-color: #ffffff;
  align-items: center;
  justify-content: center;
  elevation: 3;
  shadow-color: #b2d4e0;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.25;
  shadow-radius: 6px;
`;

const CenterText = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  color: #6ab0ca;
  font-size: 11px;
  font-weight: 900;
  margin-top: 5px;
`;

const FooterArea = styled(Animated.View)`
  align-items: center;
  padding-bottom: 22px;
  padding-top: 8px;
  z-index: 5;
`;

const FooterBubble = styled.View`
  width: 34px;
  height: 34px;
  border-radius: 17px;
  background-color: #e6f5fa;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

const FooterText = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  color: #a39e93;
  font-size: 12px;
  font-weight: 600;
`;
