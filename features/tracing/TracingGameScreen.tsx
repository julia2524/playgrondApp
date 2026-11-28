import React, { useCallback, useEffect, useRef, useState } from "react";

import { Modal, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import { AppText } from "../../utils/AppText";
import { TracingBoardSize } from "./types/tracing.types";
import { TRACING_LINES } from "./paths/lineCatalog";
import { TracingCanvas } from "./components/TracingCanvas";
import { TracingResultModal } from "./components/TracingResultModal";
import { useTracingGame } from "./hooks/useTracingGame";
import { BASIC_COLORS } from "../../design-system/tokens/colors";

import AppHeader from "../../components/common/AppHeader";
import GradientBackground from "../../design-system/backgrounds/GradientBackground";
import StarBadge from "../../design-system/ui/StarBadge";
import SettingButton from "../../components/common/SettingButton";

import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type {
  RootStackParamList,
  TracingGameType,
} from "../../navigation/types";

import { triggerHaptic } from "../../utils/haptic";

import {
  MascotWrapper,
  MissionBubble,
  MissionText,
} from "../classification/styles/classificationStyles";

import Mascot from "../../design-system/ui/Mascot";
import { ASSETS } from "../../assets/assets";
import { Ionicons } from "@expo/vector-icons";
import { playSound } from "../../utils/sound";
import i18n from "../../i18n";
import { recordTracingStageResult } from "./storage/tracingProgressStorage";
import { useLanguage } from "../../context/LanguageContext";

import { createShapeTracingGuide } from "./guides/createShapeTracingGuide";
import { createObjectTracingGuide } from "./guides/createObjectTracingGuide";
import { SHAPE_STAGES } from "./data/shapeStages";
import { createTracingGuide } from "./guides/createTracingGuide";
import { OBJECT_STAGES } from "./data/objectStages";

import AppleTracingArtwork from "./components/artworks/AppleTracingArtwork";
import CarrotTracingArtwork from "./components/artworks/CarrotTracingArtwork";
import FishTracingArtwork from "./components/artworks/FishTracingArtwork";
import FlowerTracingArtwork from "./components/artworks/FlowerTracingArtwork";
import MushroomTracingArtwork from "./components/artworks/MushroomTracingArtwork";
import HouseTracingArtwork from "./components/artworks/HouseTracingArtwork";
import SailboatTracingArtwork from "./components/artworks/SailboatTracingArtwork";
import UmbrellaTracingArtwork from "./components/artworks/UmbrellaTracingArtwork";

interface TracingGameScreenProps {
  onBack?: () => void;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type TracingGameRouteProp = RouteProp<RootStackParamList, "TracingGameScreen">;

function StarRow({
  remaining,
  total = 5,
}: {
  remaining: number;
  total?: number;
}) {
  const filled = Math.max(0, Math.min(total, remaining));

  return (
    <StarRowContainer>
      {Array.from({ length: total }).map((_, index) => (
        <StarBadge
          key={index}
          type={index < filled ? "full" : "empty"}
          size={30}
        />
      ))}
    </StarRowContainer>
  );
}
const OBJECT_ARTWORKS = {
  apple: AppleTracingArtwork,
  carrot: CarrotTracingArtwork,
  fish: FishTracingArtwork,
  flower: FlowerTracingArtwork,
  mushroom: MushroomTracingArtwork,
  house: HouseTracingArtwork,
  sailboat: SailboatTracingArtwork,
  umbrella: UmbrellaTracingArtwork,
} as const;

export default function TracingGameScreen({ onBack }: TracingGameScreenProps) {
  useLanguage();

  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<TracingGameRouteProp>();

  // 맵에서 전달받은 스테이지 번호 (1부터 시작)
  const initialStage = route.params?.stage ?? 1;

  // 그리기 게임 유형
  const gameType: TracingGameType = route.params?.gameType ?? "line";

  // 게임 유형에 따라 전체 스테이지 수 결정
  const totalStages =
    gameType === "shape"
      ? SHAPE_STAGES.length
      : gameType === "object"
        ? OBJECT_STAGES.length
        : TRACING_LINES.length;

  const [progressLabel, setProgressLabel] = useState(() =>
    i18n.t("drawing_progress_follow_path"),
  );

  // 사물 컬러 완성 애니메이션
  const [isArtworkCompleted, setIsArtworkCompleted] = useState(false);
  const [artworkCompleting, setArtworkCompleting] = useState(false);

  const artworkCompleteTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const handleBack = useCallback(() => {
    if (onBack) {
      onBack();
      return;
    }

    navigation.goBack();
  }, [onBack, navigation]);

  const {
    currentStageIndex,
    remainingStars,
    gameStatus,
    isProcessing,
    lastResult,
    handleFailedAttempt,
    handleStageComplete,
    handleRetry,
    handleNextStage,
    handleResetGame,
    handleDevSkipStage,
    handleDevPrevStage,
    canvasResetKey,
    stageKey,
  } = useTracingGame({
    totalStages,
    initialStage,
    getStageMeta: (index) => {
      if (gameType === "shape") {
        const shape = SHAPE_STAGES[index] ?? SHAPE_STAGES[0];

        return {
          stageNo: shape.no,
          title: shape.title,
          mission: shape.mission,
        };
      }

      if (gameType === "object") {
        const object = OBJECT_STAGES[index] ?? OBJECT_STAGES[0];

        return {
          stageNo: object.no,
          title: object.title,
          mission: object.mission,
        };
      }

      const line = TRACING_LINES[index] ?? TRACING_LINES[0];

      return {
        stageNo: line.no,
        title: line.title,
        mission: line.mission,
      };
    },
  });

  // ==================================================
  // Save Stage Result
  // ==================================================

  const savedResultKeys = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!lastResult) {
      return;
    }

    const saveResult = async () => {
      const level = lastResult.stageIndex + 1;
      const earnedStars = lastResult.remainingStars;

      // 게임 유형까지 포함해 중복 저장 방지
      const resultKey = `${gameType}-${level}-${earnedStars}`;

      if (savedResultKeys.current.has(resultKey)) {
        return;
      }

      savedResultKeys.current.add(resultKey);

      await recordTracingStageResult(level, earnedStars, totalStages, gameType);
    };

    void saveResult();
  }, [lastResult, gameType, totalStages]);

  // ==================================================
  // Current Stage
  // ==================================================

  const lineInfo = TRACING_LINES[currentStageIndex] ?? TRACING_LINES[0];
  const shapeInfo = SHAPE_STAGES[currentStageIndex] ?? SHAPE_STAGES[0];
  const objectInfo = OBJECT_STAGES[currentStageIndex] ?? OBJECT_STAGES[0];

  const lineType = lineInfo.type;

  const createGuide = useCallback(
    (size: TracingBoardSize) => {
      if (gameType === "shape") {
        return createShapeTracingGuide(shapeInfo, size);
      }

      if (gameType === "object") {
        return createObjectTracingGuide(objectInfo, size);
      }

      return createTracingGuide(lineType, size);
    },
    [gameType, shapeInfo, objectInfo, lineType],
  );

  // ==================================================
  // Artwork Reset
  // ==================================================

  useEffect(() => {
    if (artworkCompleteTimer.current) {
      clearTimeout(artworkCompleteTimer.current);
      artworkCompleteTimer.current = null;
    }

    setIsArtworkCompleted(false);
    setArtworkCompleting(false);

    return () => {
      if (artworkCompleteTimer.current) {
        clearTimeout(artworkCompleteTimer.current);
        artworkCompleteTimer.current = null;
      }
    };
  }, [gameType, currentStageIndex]);

  // ==================================================
  // Drawing Events
  // ==================================================

  // 그리기 시작
  const handleDrawingStart = useCallback(() => {
    void playSound("grab");
    triggerHaptic("light");
  }, []);

  // 그리기 실패
  const handleTracingFailed = useCallback(() => {
    void playSound("wrong_sound");
    triggerHaptic("error");
    handleFailedAttempt();
  }, [handleFailedAttempt]);

  // 그리기 재도전
  const handleTracingRetry = useCallback(() => {
    if (artworkCompleteTimer.current) {
      clearTimeout(artworkCompleteTimer.current);
      artworkCompleteTimer.current = null;
    }

    setIsArtworkCompleted(false);
    setArtworkCompleting(false);

    handleRetry();
  }, [handleRetry]);

  // 그리기 성공
  const handleTracingComplete = useCallback(() => {
    // 이미 완료 애니메이션이 진행 중이면 중복 실행 방지
    if (artworkCompleting) return;

    void playSound("correct_sound");
    triggerHaptic("success");

    // 모든 게임에서 입력 잠금
    setArtworkCompleting(true);

    // 사물 게임이면 컬러 애니메이션 시작
    if (gameType === "object") {
      setIsArtworkCompleted(true);
    }

    // 애니메이션 시간만큼 기다린 뒤 결과 처리
    artworkCompleteTimer.current = setTimeout(() => {
      handleStageComplete();
      setArtworkCompleting(false);
      artworkCompleteTimer.current = null;
    }, 750);
  }, [artworkCompleting, gameType, handleStageComplete]);

  const inputLocked =
    artworkCompleting ||
    isProcessing ||
    gameStatus === "success" ||
    gameStatus === "result" ||
    gameStatus === "retry" ||
    gameStatus === "completed";

  return (
    <StyledSafeArea edges={["bottom"]}>
      <Container>
        {/* 공통 게임 헤더 */}
        <GameHeaderShell>
          <GradientBackground />

          <AppHeader
            onBack={handleBack}
            center={
              <HeaderTitle>
                {gameType === "shape"
                  ? i18n.t("drawing_shape_title")
                  : gameType === "object"
                    ? i18n.t("drawing_object_title")
                    : i18n.t("drawing_line_title")}
              </HeaderTitle>
            }
            right={
              <SettingButton
                onPress={() => {
                  triggerHaptic("light");
                  navigation.navigate("SettingScreen" as never);
                }}
              />
            }
          />

          <StarRow remaining={remainingStars} />

          <MascotWrapper>
            <Mascot size={90} />
          </MascotWrapper>
        </GameHeaderShell>

        {/* 미션 안내 */}
        <MissionArea>
          <MissionBubble>
            <MissionText>{progressLabel}</MissionText>
          </MissionBubble>
        </MissionArea>

        {/* 게임 보드 */}
        <BoardArea>
          {__DEV__ && (
            <>
              <StageProgress>
                <StageProgressText>
                  STAGE {currentStageIndex + 1} / {totalStages}
                </StageProgressText>
              </StageProgress>

              <DevNavigation>
                <DevSkipButton
                  onPress={handleDevPrevStage}
                  disabled={currentStageIndex === 0}
                  style={{
                    opacity: currentStageIndex === 0 ? 0.35 : 1,
                  }}
                >
                  <Ionicons name="play-back" size={16} color="#FFFFFF" />
                  <DevSkipText>PREV</DevSkipText>
                </DevSkipButton>

                <DevSkipButton
                  onPress={handleDevSkipStage}
                  disabled={currentStageIndex === totalStages - 1}
                  style={{
                    opacity: currentStageIndex === totalStages - 1 ? 0.35 : 1,
                  }}
                >
                  <DevSkipText>NEXT</DevSkipText>
                  <Ionicons name="play-forward" size={16} color="#FFFFFF" />
                </DevSkipButton>
              </DevNavigation>
            </>
          )}

          <TracingCanvas
            key={`stage-${gameType}-${stageKey}-${
              gameType === "shape"
                ? shapeInfo.id
                : gameType === "object"
                  ? objectInfo.id
                  : lineType
            }`}
            createGuide={createGuide}
            resetKey={canvasResetKey}
            onComplete={handleTracingComplete}
            onFailedAttempt={handleTracingFailed}
            onDrawingStart={handleDrawingStart}
            onProgressLabelChange={setProgressLabel}
            inputLocked={inputLocked}
            tutorialEnabled={gameStatus === "playing" && !inputLocked}
            showPanda={gameType === "line"}
            artwork={
              gameType === "object"
                ? (() => {
                    const Artwork =
                      OBJECT_ARTWORKS[
                        objectInfo.id as keyof typeof OBJECT_ARTWORKS
                      ];

                    return Artwork ? (
                      <Artwork isCompleted={isArtworkCompleted} />
                    ) : undefined;
                  })()
                : undefined
            }
          />
        </BoardArea>

        {/* 스테이지 성공 결과 모달 */}
        <TracingResultModal
          visible={gameStatus === "result"}
          result={lastResult}
          onNext={handleNextStage}
          onRestart={handleTracingRetry}
          onClose={handleBack}
        />

        {/* 재도전 모달 */}
        <Modal
          visible={gameStatus === "retry"}
          transparent
          animationType="fade"
          onRequestClose={handleRetry}
        >
          <ModalOverlay>
            <RetryModalCard>
              <RetryMascotArea>
                <RetryMascot source={ASSETS.mascotBear} resizeMode="contain" />
              </RetryMascotArea>

              <RetryTitle>{i18n.t("drawing_retry_title")}</RetryTitle>

              <RetrySubtitle>{i18n.t("drawing_retry_subtitle")}</RetrySubtitle>

              <RetryPrimaryButton
                onPress={() => {
                  triggerHaptic("light");
                  handleTracingRetry();
                }}
              >
                <RetryButtonContent>
                  <Ionicons name="refresh" size={25} color="#FFFFFF" />
                  <ModalPrimaryText>
                    {i18n.t("drawing_retry_button")}
                  </ModalPrimaryText>
                </RetryButtonContent>
              </RetryPrimaryButton>
            </RetryModalCard>
          </ModalOverlay>
        </Modal>

        {/* 전체 완료 화면 */}
        <Modal
          visible={gameStatus === "completed"}
          transparent
          animationType="fade"
          onRequestClose={handleResetGame}
        >
          <ModalOverlay>
            <ModalCard>
              <StarRow
                remaining={
                  lastResult ? lastResult.remainingStars : remainingStars
                }
              />
            </ModalCard>
          </ModalOverlay>
        </Modal>
      </Container>
    </StyledSafeArea>
  );
}

/* ==================================================
   Screen Layout
================================================== */

const MissionArea = styled.View`
  align-items: center;
  justify-content: center;
  padding-horizontal: 20px;
`;

const StyledSafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${BASIC_COLORS.BACKGROUND};
`;

const Container = styled.View`
  flex: 1;
  overflow: hidden;
  background-color: ${BASIC_COLORS.BACKGROUND};
`;

/* ==================================================
   Header
================================================== */

const GameHeaderShell = styled.View`
  position: relative;
`;

const HeaderTitle = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.subheading}px;
  color: ${BASIC_COLORS.TEXT_MAIN};
  text-align: center;
`;

const StarRowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2px;
  margin-top: -10px;
`;

/* ==================================================
   Drawing Board
================================================== */

const BoardArea = styled.View`
  flex: 1;
  margin-horizontal: 16px;
  margin-top: 4px;
  margin-bottom: 16px;
  border-radius: 28px;
  background-color: ${BASIC_COLORS.CARD_BG};
  overflow: hidden;
  elevation: 3;
`;

/* ==================================================
   Modals
================================================== */

const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(44, 62, 80, 0.5);
  align-items: center;
  justify-content: center;
  padding-horizontal: 28px;
`;

const ModalCard = styled.View`
  width: 100%;
  max-width: 340px;
  background-color: ${BASIC_COLORS.CARD_BG};
  border-radius: 28px;
  padding-horizontal: 24px;
  padding-top: 28px;
  padding-bottom: 24px;
  align-items: center;
  gap: 10px;
  elevation: 12;
`;

const ModalPrimaryButton = styled(Pressable)`
  width: 100%;
  background-color: ${BASIC_COLORS.SUCCESS};
  border-radius: 22px;
  padding-vertical: 14px;
  align-items: center;
`;

const RetryPrimaryButton = styled(ModalPrimaryButton)`
  margin-top: 6px;
`;

const ModalPrimaryText = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.body}px;
  font-weight: 800;
  color: #ffffff;
`;

const RetryModalCard = styled(ModalCard)`
  padding-top: 20px;
  padding-bottom: 26px;
  border-radius: 32px;
  max-width: 350px;
`;

const RetryMascotArea = styled.View`
  width: 190px;
  height: 165px;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const RetryMascot = styled.Image`
  width: 150px;
  height: 150px;
`;

const RetryTitle = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.heading}px;
  font-weight: 900;
  color: ${BASIC_COLORS.TEXT_MAIN};
  text-align: center;
`;

const RetrySubtitle = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.small}px;
  color: ${BASIC_COLORS.TEXT_SUB};
  text-align: center;
`;

const RetryButtonContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 9px;
`;

const DevSkipText = styled(AppText)`
  font-size: 11px;
  font-weight: 900;
  color: #ffffff;
`;

const DevNavigation = styled.View`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 100;
  flex-direction: row;
  gap: 8px;
`;

const DevSkipButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 8px 12px;
  border-radius: 18px;
  background-color: #7b61c9;
  elevation: 5;
`;

const StageProgress = styled.View`
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 100;
  padding: 7px 12px;
  border-radius: 16px;
  background-color: rgba(123, 97, 201, 0.12);
`;

const StageProgressText = styled(AppText)`
  font-size: 12px;
  font-weight: 900;
  color: #7b61c9;
`;
