import React from "react";
import { Modal, Pressable } from "react-native";
import styled from "styled-components/native";

import type { TracingStageResult } from "../hooks/useTracingGame";
import { AppText } from "../../../utils/AppText";

interface TracingResultModalProps {
  visible: boolean;
  result: TracingStageResult | null;
  onNext: () => void;
}

/**
 * 스테이지 성공 결과 모달 (임시 구현)
 * 실제 프로젝트의 ResultModal이 있으면 이 컴포넌트를 교체하면 됩니다.
 */
export function TracingResultModal({
  visible,
  result,
  onNext,
}: TracingResultModalProps) {
  if (!result) return null;

  const stars = Array.from({ length: 5 }, (_, i) =>
    i < result.remainingStars ? "⭐" : "☆",
  ).join("");

  const primaryLabel = result.isLastStage ? "결과 보기" : "다음 스테이지";

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onNext}
    >
      <Overlay>
        <Card>
          <Emoji>🎉</Emoji>
          <Badge>STAGE {result.stageNo}</Badge>
          <Title>{result.title}</Title>
          {result.mission ? <Mission>{result.mission}</Mission> : null}

          <StatRow>
            <StatLabel>남은 별</StatLabel>
            <StarsText>{stars}</StarsText>
          </StatRow>

          <StatRow>
            <StatLabel>획득 점수</StatLabel>
            <ScoreText>{result.score}</ScoreText>
          </StatRow>

          <PrimaryButton onPress={onNext}>
            <PrimaryButtonText>{primaryLabel}</PrimaryButtonText>
          </PrimaryButton>
        </Card>
      </Overlay>
    </Modal>
  );
}

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(82, 103, 123, 0.4);
  align-items: center;
  justify-content: center;
  padding-horizontal: 28px;
`;

const Card = styled.View`
  width: 100%;
  max-width: 340px;
  background-color: #ffffff;
  border-radius: 28px;
  padding-horizontal: 24px;
  padding-top: 28px;
  padding-bottom: 22px;
  align-items: center;
  gap: 8px;
`;

const Emoji = styled(AppText)`
  font-size: 40px;
  margin-bottom: 2px;
`;

const Badge = styled(AppText)`
  font-size: 13px;
  font-weight: 800;
  color: #7bc9b4;
  letter-spacing: 1px;
`;

const Title = styled(AppText)`
  font-size: 22px;
  font-weight: 800;
  color: #52677b;
  text-align: center;
`;

const Mission = styled(AppText)`
  font-size: 14px;
  font-weight: 600;
  color: #8297a8;
  text-align: center;
  margin-bottom: 6px;
`;

const StatRow = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-vertical: 10px;
  padding-horizontal: 12px;
  background-color: #f5fafc;
  border-radius: 16px;
  margin-top: 4px;
`;

const StatLabel = styled(AppText)`
  font-size: 14px;
  font-weight: 700;
  color: #71869a;
`;

const StarsText = styled(AppText)`
  font-size: 16px;
  letter-spacing: 2px;
`;

const ScoreText = styled(AppText)`
  font-size: 20px;
  font-weight: 800;
  color: #52677b;
`;

const PrimaryButton = styled(Pressable)`
  margin-top: 14px;
  width: 100%;
  background-color: #7bc9b4;
  border-radius: 22px;
  padding-vertical: 14px;
  align-items: center;
`;

const PrimaryButtonText = styled(AppText)`
  font-size: 16px;
  font-weight: 800;
  color: #ffffff;
`;
