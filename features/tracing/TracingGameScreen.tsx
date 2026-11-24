import React, { useCallback, useMemo, useState } from "react";
import { Modal, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import { AppText } from "../../utils/AppText";
import { TracingBoardSize } from "./types/tracing.types";
import { createTracingGuide } from "./paths/createTracingGuide";
import { TRACING_LINES } from "./paths/lineCatalog";
import { TracingCanvas } from "./components/TracingCanvas";
import { TracingResultModal } from "./components/TracingResultModal";
import { useTracingGame } from "./hooks/useTracingGame";

import { BASIC_COLORS } from "../../design-system/tokens/colors";
import AppHeader from "../../components/common/AppHeader";
import GradientBackground from "../../design-system/backgrounds/GradientBackground";
import StarBadge from "../../design-system/ui/StarBadge";
import SettingButton from "../../components/common/SettingButton";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { triggerHaptic } from "../../utils/haptic";

import {
  MascotWrapper,
  MissionBubble,
  MissionText,
} from "../classification/styles/classificationStyles";
import Mascot from "../../design-system/ui/Mascot";

/**
 * 음계 재생 연결 지점
 *
 * 남은 별 5 → 도레미파솔
 * 남은 별 4 → 도레미파
 * 남은 별 3 → 도레미
 * 남은 별 2 → 도레
 * 남은 별 1 → 도
 */
async function playNotesForRemainingStars(
  remainingStars: number,
): Promise<void> {
  // TODO: 실제 playEarnedNotes 연결
  const count = Math.min(Math.max(remainingStars, 0), 5);
  const ms = Math.max(280, count * 220 + 120);

  await new Promise((resolve) => setTimeout(resolve, ms));
}

interface TracingGameScreenProps {
  onBack?: () => void;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

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

export default function TracingGameScreen({ onBack }: TracingGameScreenProps) {
  const navigation = useNavigation<NavigationProp>();
  const [progressLabel, setProgressLabel] = useState("길을 따라가 볼까요!");

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
    canvasResetKey,
    stageKey,
  } = useTracingGame({
    totalStages: TRACING_LINES.length,
    playNotesForStars: playNotesForRemainingStars,
    getStageMeta: (index) => {
      const line = TRACING_LINES[index] ?? TRACING_LINES[0];

      return {
        stageNo: line.no,
        title: line.title,
        mission: line.mission,
      };
    },
  });

  const lineInfo = TRACING_LINES[currentStageIndex] ?? TRACING_LINES[0];
  const lineType = lineInfo.type;

  const createGuide = useCallback(
    (size: TracingBoardSize) => createTracingGuide(lineType, size),
    [lineType],
  );

  const inputLocked =
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
            center={<HeaderTitle>꼬불꼬불 선 따라가기</HeaderTitle>}
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
        {/* <MissionArea>
          <StageLabel>{stageLabel}</StageLabel>
          <MissionText>{lineInfo.mission}</MissionText>
          <MissionSubText>{lineInfo.hint}</MissionSubText>
        </MissionArea> */}
        <MissionArea>
          <MissionBubble>
            <MissionText>{progressLabel}</MissionText>
          </MissionBubble>
        </MissionArea>

        {/* 게임 보드 */}
        <BoardArea>
          <TracingCanvas
            key={`stage-${stageKey}-${lineType}`}
            createGuide={createGuide}
            resetKey={canvasResetKey}
            onComplete={handleStageComplete}
            onFailedAttempt={handleFailedAttempt}
            onProgressLabelChange={setProgressLabel}
            inputLocked={inputLocked}
            showPanda
          />
        </BoardArea>

        {/* 스테이지 성공 결과 모달 */}
        <TracingResultModal
          visible={gameStatus === "result"}
          result={lastResult}
          onNext={handleNextStage}
          onRestart={handleRetry}
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
            <ModalCard>
              <ModalEmoji>🐼</ModalEmoji>
              <ModalTitle>한 번 더 해 볼까?</ModalTitle>
              <ModalSubtitle>별을 다시 모아서 출발하자!</ModalSubtitle>

              <RetryPrimaryButton onPress={handleRetry}>
                <ModalPrimaryText>다시 시작하기</ModalPrimaryText>
              </RetryPrimaryButton>
            </ModalCard>
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
              <ModalEmoji>🎉</ModalEmoji>
              <ModalTitle>우와! 모두 해냈어요!</ModalTitle>
              <ModalSubtitle>
                팬더 친구와 함께 멋진 길을 완성했어요!
              </ModalSubtitle>

              {lastResult ? (
                <>
                  <FinalMeta>
                    마지막 스테이지 {lastResult.stageNo} · 점수{" "}
                    {lastResult.score}
                  </FinalMeta>
                  <StarRow remaining={lastResult.remainingStars} />
                </>
              ) : (
                <StarRow remaining={remainingStars} />
              )}

              <ModalButtonRow>
                <ModalPrimaryButton onPress={handleResetGame}>
                  <ModalPrimaryText>다시 해보기</ModalPrimaryText>
                </ModalPrimaryButton>

                {onBack ? (
                  <ModalSecondaryButton onPress={handleBack}>
                    <ModalSecondaryText>게임 나가기</ModalSecondaryText>
                  </ModalSecondaryButton>
                ) : null}
              </ModalButtonRow>
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
  /* margin-top: -30px; */
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

const StageLabel = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.small}px;
  color: ${BASIC_COLORS.PRIMARY};
  text-align: center;
  margin-bottom: 8px;
`;

/* ==================================================
   Mission
================================================== */

const MissionSubText = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.small}px;
  margin-top: 9px;
  color: ${BASIC_COLORS.TEXT_SUB};
  text-align: center;
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

const ModalEmoji = styled(AppText)`
  font-size: 42px;
  margin-bottom: 4px;
`;

const ModalTitle = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.heading}px;
  color: ${BASIC_COLORS.TEXT_MAIN};
  text-align: center;
`;

const ModalSubtitle = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.small}px;
  color: ${BASIC_COLORS.TEXT_SUB};
  text-align: center;
  margin-bottom: 8px;
`;

const FinalMeta = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.tiny}px;
  font-weight: 700;
  color: ${BASIC_COLORS.TEXT_SUB};
  margin-top: 4px;
`;

const ModalButtonRow = styled.View`
  width: 100%;
  gap: 10px;
  margin-top: 8px;
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

const ModalSecondaryButton = styled(Pressable)`
  width: 100%;
  background-color: ${BASIC_COLORS.BACKGROUND};
  border-radius: 22px;
  padding-vertical: 14px;
  align-items: center;
`;

const ModalSecondaryText = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.small}px;
  font-weight: 700;
  color: ${BASIC_COLORS.TEXT_MAIN};
`;
