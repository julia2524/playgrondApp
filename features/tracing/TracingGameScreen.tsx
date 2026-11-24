// import React, { useCallback, useMemo } from "react";
// import { Modal, TouchableOpacity, Pressable } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import styled from "styled-components/native";

// import { AppText } from "../../utils/AppText";
// import { TracingBoardSize } from "./types/tracing.types";
// import { createTracingGuide } from "./paths/createTracingGuide";
// import { TRACING_LINES } from "./paths/lineCatalog";
// import { TracingCanvas } from "./components/TracingCanvas";
// import { TracingResultModal } from "./components/TracingResultModal";
// import { useTracingGame } from "./hooks/useTracingGame";

// /**
//  * 음계 재생 연결 지점
//  * 실제 프로젝트:
//  *   import { playEarnedNotes } from "...";
//  *   playNotesForStars: (n) => playEarnedNotes(n)
//  * 남은 별 5 → 도레미파솔 … 1 → 도
//  */
// async function playNotesForRemainingStars(
//   remainingStars: number,
// ): Promise<void> {
//   // TODO: await playEarnedNotes(remainingStars);
//   const count = Math.min(Math.max(remainingStars, 0), 5);
//   const ms = Math.max(280, count * 220 + 120);
//   await new Promise((resolve) => setTimeout(resolve, ms));
// }

// interface TracingGameScreenProps {
//   onBack?: () => void;
// }

// function StarRow({
//   remaining,
//   total = 5,
// }: {
//   remaining: number;
//   total?: number;
// }) {
//   const filled = Math.max(0, Math.min(total, remaining));
//   const stars = Array.from({ length: total }, (_, i) =>
//     i < filled ? "⭐" : "☆",
//   );
//   return <StarText>{stars.join("")}</StarText>;
// }

// export default function TracingGameScreen({ onBack }: TracingGameScreenProps) {
//   const {
//     currentStageIndex,
//     remainingStars,
//     gameStatus,
//     isProcessing,
//     totalStages,
//     lastResult,
//     handleFailedAttempt,
//     handleStageComplete,
//     handleRetry,
//     handleNextStage,
//     handleResetGame,
//     canvasResetKey,
//     stageKey,
//   } = useTracingGame({
//     totalStages: TRACING_LINES.length,
//     playNotesForStars: playNotesForRemainingStars,
//     getStageMeta: (index) => {
//       const line = TRACING_LINES[index] ?? TRACING_LINES[0];
//       return {
//         stageNo: line.no,
//         title: line.title,
//         mission: line.mission,
//       };
//     },
//   });

//   const lineInfo = TRACING_LINES[currentStageIndex] ?? TRACING_LINES[0];
//   const lineType = lineInfo.type;

//   const createGuide = useCallback(
//     (size: TracingBoardSize) => createTracingGuide(lineType, size),
//     [lineType],
//   );

//   const inputLocked =
//     isProcessing ||
//     gameStatus === "success" ||
//     gameStatus === "result" ||
//     gameStatus === "retry" ||
//     gameStatus === "completed";

//   const stageLabel = useMemo(
//     () => `${String(currentStageIndex + 1).padStart(2, "0")} / ${totalStages}`,
//     [currentStageIndex, totalStages],
//   );

//   return (
//     <StyledSafeArea edges={["top", "bottom"]}>
//       <Container>
//         <Background />

//         {/* 상단 헤더 */}
//         <Header>
//           <BackButton onPress={onBack} activeOpacity={0.7}>
//             <BackIcon>‹</BackIcon>
//           </BackButton>

//           <HeaderCenter>
//             <HeaderTitle>꼬불꼬불 선 따라가기</HeaderTitle>
//             <StageLabel>{stageLabel}</StageLabel>
//           </HeaderCenter>

//           <HeaderRight>
//             <StarRow remaining={remainingStars} />
//           </HeaderRight>
//         </Header>

//         {/* 미션 안내 */}
//         <MissionArea>
//           <MissionText>{lineInfo.mission}</MissionText>
//           <MissionSubText>{lineInfo.hint}</MissionSubText>
//         </MissionArea>

//         {/* 게임 보드 */}
//         <BoardArea>
//           <TracingCanvas
//             key={`stage-${stageKey}-${lineType}`}
//             createGuide={createGuide}
//             resetKey={canvasResetKey}
//             onComplete={handleStageComplete}
//             onFailedAttempt={handleFailedAttempt}
//             inputLocked={inputLocked}
//             showPanda
//           />
//         </BoardArea>

//         {/* 스테이지 성공 ResultModal (음계 재생이 끝난 뒤에만) */}
//         <TracingResultModal
//           visible={gameStatus === "result"}
//           result={lastResult}
//           onNext={handleNextStage}
//         />

//         {/* 재도전 모달 (별 0개) */}
//         <Modal
//           visible={gameStatus === "retry"}
//           transparent
//           animationType="fade"
//           onRequestClose={handleRetry}
//         >
//           <ModalOverlay>
//             <ModalCard>
//               <ModalEmoji>🐼</ModalEmoji>
//               <ModalTitle>한 번 더 해 볼까?</ModalTitle>
//               <ModalSubtitle>별을 다시 모아서 출발하자!</ModalSubtitle>
//               <RetryPrimaryButton onPress={handleRetry}>
//                 <ModalPrimaryText>다시 시작하기</ModalPrimaryText>
//               </RetryPrimaryButton>
//             </ModalCard>
//           </ModalOverlay>
//         </Modal>

//         {/* 전체 완료 화면 (20스테이지 성공 후 ResultModal에서 「결과 보기」) */}
//         <Modal
//           visible={gameStatus === "completed"}
//           transparent
//           animationType="fade"
//           onRequestClose={handleResetGame}
//         >
//           <ModalOverlay>
//             <ModalCard>
//               <ModalEmoji>🎉</ModalEmoji>
//               <ModalTitle>우와! 모두 해냈어요!</ModalTitle>
//               <ModalSubtitle>
//                 팬더 친구와 함께 멋진 길을 완성했어요!
//               </ModalSubtitle>
//               {lastResult ? (
//                 <>
//                   <FinalMeta>
//                     마지막 스테이지 {lastResult.stageNo} · 점수{" "}
//                     {lastResult.score}
//                   </FinalMeta>
//                   <StarRow remaining={lastResult.remainingStars} />
//                 </>
//               ) : (
//                 <StarRow remaining={remainingStars} />
//               )}
//               <ModalButtonRow>
//                 <ModalPrimaryButton onPress={handleResetGame}>
//                   <ModalPrimaryText>다시 해보기</ModalPrimaryText>
//                 </ModalPrimaryButton>
//                 {onBack ? (
//                   <ModalSecondaryButton onPress={onBack}>
//                     <ModalSecondaryText>게임 나가기</ModalSecondaryText>
//                   </ModalSecondaryButton>
//                 ) : null}
//               </ModalButtonRow>
//             </ModalCard>
//           </ModalOverlay>
//         </Modal>
//       </Container>
//     </StyledSafeArea>
//   );
// }

// const StyledSafeArea = styled(SafeAreaView)`
//   flex: 1;
//   background-color: #eaf5fc;
// `;

// const Container = styled.View`
//   flex: 1;
//   overflow: hidden;
// `;

// const Background = styled.View`
//   position: absolute;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   left: 0;
//   background-color: #eaf5fc;
// `;

// const Header = styled.View`
//   height: 76px;
//   padding-horizontal: 16px;
//   padding-top: 8px;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//   z-index: 10;
// `;

// const BackButton = styled(TouchableOpacity)`
//   position: absolute;
//   left: 16px;
//   top: 12px;
//   width: 44px;
//   height: 44px;
//   border-radius: 22px;
//   background-color: rgba(255, 255, 255, 0.85);
//   align-items: center;
//   justify-content: center;
// `;

// const BackIcon = styled(AppText)`
//   font-size: 34px;
//   line-height: 38px;
//   color: #657487;
//   margin-top: -4px;
// `;

// const HeaderCenter = styled.View`
//   align-items: center;
// `;

// const HeaderTitle = styled(AppText)`
//   font-size: 18px;
//   font-weight: 800;
//   color: #52677b;
// `;

// const StageLabel = styled(AppText)`
//   margin-top: 2px;
//   font-size: 12px;
//   font-weight: 700;
//   color: #8297a8;
// `;

// const HeaderRight = styled.View`
//   position: absolute;
//   right: 12px;
//   top: 12px;
//   min-width: 88px;
//   height: 40px;
//   border-radius: 20px;
//   background-color: rgba(255, 255, 255, 0.9);
//   align-items: center;
//   justify-content: center;
//   padding-horizontal: 10px;
// `;

// const StarText = styled(AppText)`
//   font-size: 15px;
//   font-weight: 800;
//   color: #657487;
//   letter-spacing: 1px;
// `;

// const MissionArea = styled.View`
//   align-items: center;
//   justify-content: center;
//   padding-horizontal: 20px;
//   padding-top: 4px;
//   padding-bottom: 8px;
// `;

// const MissionText = styled(AppText)`
//   font-size: 18px;
//   font-weight: 800;
//   color: #52677b;
//   background-color: #ffffff;
//   padding-horizontal: 22px;
//   padding-vertical: 12px;
//   border-radius: 22px;
//   overflow: hidden;
//   text-align: center;
//   elevation: 3;
// `;

// const MissionSubText = styled(AppText)`
//   margin-top: 9px;
//   font-size: 14px;
//   font-weight: 600;
//   color: #8297a8;
// `;

// const BoardArea = styled.View`
//   flex: 1;
//   margin-horizontal: 16px;
//   margin-top: 4px;
//   margin-bottom: 16px;
//   border-radius: 28px;
//   background-color: #ffffff;
//   overflow: hidden;
//   elevation: 3;
// `;

// const ModalOverlay = styled.View`
//   flex: 1;
//   background-color: rgba(82, 103, 123, 0.35);
//   align-items: center;
//   justify-content: center;
//   padding-horizontal: 28px;
// `;

// const ModalCard = styled.View`
//   width: 100%;
//   max-width: 340px;
//   background-color: #ffffff;
//   border-radius: 28px;
//   padding-horizontal: 24px;
//   padding-top: 28px;
//   padding-bottom: 24px;
//   align-items: center;
//   gap: 10px;
// `;

// const ModalEmoji = styled(AppText)`
//   font-size: 42px;
//   margin-bottom: 4px;
// `;

// const ModalTitle = styled(AppText)`
//   font-size: 22px;
//   font-weight: 800;
//   color: #52677b;
//   text-align: center;
// `;

// const ModalSubtitle = styled(AppText)`
//   font-size: 15px;
//   font-weight: 600;
//   color: #8297a8;
//   text-align: center;
//   margin-bottom: 8px;
// `;

// const FinalMeta = styled(AppText)`
//   font-size: 13px;
//   font-weight: 700;
//   color: #71869a;
//   margin-top: 4px;
// `;

// const ModalButtonRow = styled.View`
//   width: 100%;
//   gap: 10px;
//   margin-top: 8px;
// `;

// const ModalPrimaryButton = styled(Pressable)`
//   width: 100%;
//   background-color: #7bc9b4;
//   border-radius: 22px;
//   padding-vertical: 14px;
//   align-items: center;
// `;

// const RetryPrimaryButton = styled(ModalPrimaryButton)`
//   margin-top: 6px;
// `;

// const ModalPrimaryText = styled(AppText)`
//   font-size: 16px;
//   font-weight: 800;
//   color: #ffffff;
// `;

// const ModalSecondaryButton = styled(Pressable)`
//   width: 100%;
//   background-color: #f0f6fa;
//   border-radius: 22px;
//   padding-vertical: 14px;
//   align-items: center;
// `;

// const ModalSecondaryText = styled(AppText)`
//   font-size: 15px;
//   font-weight: 700;
//   color: #657487;
// `;

import React, { useCallback, useMemo } from "react";
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
import i18n from "../../i18n";
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
    totalStages,
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

  const stageLabel = useMemo(
    () => `${String(currentStageIndex + 1).padStart(2, "0")} / ${totalStages}`,
    [currentStageIndex, totalStages],
  );

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
          <StageLabel>{stageLabel}</StageLabel>

          <MissionBubble>
            <MissionText>{lineInfo.mission}</MissionText>
          </MissionBubble>

          <MissionSubText>{lineInfo.hint}</MissionSubText>
        </MissionArea>

        {/* 게임 보드 */}
        <BoardArea>
          <TracingCanvas
            key={`stage-${stageKey}-${lineType}`}
            createGuide={createGuide}
            resetKey={canvasResetKey}
            onComplete={handleStageComplete}
            onFailedAttempt={handleFailedAttempt}
            inputLocked={inputLocked}
            showPanda
          />
        </BoardArea>

        {/* 스테이지 성공 결과 모달 */}
        <TracingResultModal
          visible={gameStatus === "result"}
          result={lastResult}
          onNext={handleNextStage}
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
  margin-top: -30px;
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
