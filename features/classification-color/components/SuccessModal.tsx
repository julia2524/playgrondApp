import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";

import { TouchableOpacity } from "react-native";
import { BASIC_COLORS, PASTEL_BG } from "../../../design-system/tokens/colors";
import { RootStackParamList } from "../../../navigation/types";
import Mascot from "../../../design-system/ui/Mascot";
import { STAGE_CONFIGS } from "../../StageMap/stageConfigs";
import CandyStar from "../../../design-system/ui/CandyStar";
import CloudLevelBadge from "../../../components/common/CloudLevelBadge";

interface SuccessModalProps {
  show: boolean;

  level: number;

  earnedStars: number;

  onRestart: () => void;

  onNextLevel: () => void;
}

type GameOverNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SuccessModal({
  show,
  level,
  earnedStars,
  onRestart,
  onNextLevel,
}: SuccessModalProps) {
  const navigation = useNavigation<GameOverNavigationProp>();

  if (!show) return null;

  const currentStageIndex = STAGE_CONFIGS.findIndex(
    (stage) => stage.level === level,
  );

  const isLastLevel = currentStageIndex === STAGE_CONFIGS.length - 1;

  const onGoHome = () => {
    navigation.navigate("Home");
  };

  // ⭐ 별을 무지개처럼 배치
  const starOffsets = [18, 6, 0, 6, 18];

  return (
    <SuccessModalOverlay>
      <SuccessModalContent>
        {/* ==========================================
            ☁️ 구름만 하늘색/하얀색 박스 맨 위 중앙에 둥둥 걸쳐지도록 배치!
        ========================================== */}
        <SuccessCloudBadge>
          <CloudLevelBadge size={300} />
          <SuccessLevelText>LEVEL {level}</SuccessLevelText>
        </SuccessCloudBadge>

        <SuccessModalInner>
          {/* ==========================================
              ⭐ 별 무지개 배치
          ========================================== */}

          <SuccessEmojiRow>
            {Array.from({ length: 5 }).map((_, index) => {
              const starPosition = index + 1;

              let type: "full" | "half" | "empty" = "empty";

              if (earnedStars >= starPosition) {
                type = "full";
              } else if (earnedStars >= starPosition - 0.5) {
                type = "half";
              }

              return (
                <SuccessStarWrapper
                  key={index}
                  style={{
                    marginTop: starOffsets[index],
                  }}
                >
                  <CandyStar size={46} type={type} />
                </SuccessStarWrapper>
              );
            })}
          </SuccessEmojiRow>

          {/* ==========================================
              🎉 성공 메시지
          ========================================== */}

          <SuccessTitle>최고야!</SuccessTitle>

          {/* ==========================================
              🐻 마스코트
          ========================================== */}

          <SuccessMascotWrapper>
            <Mascot size={100} />
          </SuccessMascotWrapper>

          {/* ==========================================
              🎮 버튼
          ========================================== */}

          <SuccessButtons>
            <SuccessButton
              variant="secondary"
              onPress={onRestart}
              activeOpacity={0.85}
            >
              <ButtonText>↻</ButtonText>
            </SuccessButton>

            {!isLastLevel ? (
              <SuccessButton
                variant="primary"
                onPress={onNextLevel}
                activeOpacity={0.85}
              >
                <ButtonText>▶</ButtonText>
              </SuccessButton>
            ) : (
              <SuccessButton
                variant="primary"
                onPress={onGoHome}
                activeOpacity={0.85}
              >
                <ButtonText>⌂</ButtonText>
              </SuccessButton>
            )}
          </SuccessButtons>
        </SuccessModalInner>
      </SuccessModalContent>
    </SuccessModalOverlay>
  );
}

export const SuccessModalOverlay = styled.View`
  position: absolute;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: rgba(44, 62, 80, 0.45);

  align-items: center;
  justify-content: center;

  z-index: 999;
  elevation: 999;
`;

// ==================================================
// ⭐ 바깥쪽 하늘색 박스 (패딩을 아주 얇게 주어 합체된 느낌 연출)
// ==================================================

export const SuccessModalContent = styled.View`
  width: 86%;
  max-width: 360px;

  background-color: ${PASTEL_BG.blue};

  border-radius: 34px;

  /* 구름이 위로 튀어나가지 않고 딱 테두리에 얹히도록 패딩을 얇게 유지 */
  padding: 6px;

  border-width: 3px;
  border-color: ${BASIC_COLORS.PRIMARY};

  elevation: 14;

  shadow-color: ${BASIC_COLORS.PRIMARY};
  shadow-offset: 0px 6px;
  shadow-opacity: 0.22;
  shadow-radius: 10px;

  position: relative;
`;

// ==================================================
// ☁️ 안쪽 하얀색 박스 (하늘색 박스와 거의 한몸처럼 꽉 차게 배치)
// ==================================================

export const SuccessModalInner = styled.View`
  width: 100%;

  background-color: ${BASIC_COLORS.CARD_BG};

  border-radius: 28px;

  padding: 24px 22px 22px;

  align-items: center;

  border-width: 2px;
  border-color: #ffffff;
`;

// ==================================================
// ☁️ LEVEL 구름 배지 (박스 천장 상단에 둥둥 걸쳐지도록 절대위치 부여)
// ==================================================

export const SuccessCloudBadge = styled.View`
  position: absolute;
  top: -90px;
  left: 0;
  right: 0;

  align-items: center;
  justify-content: center;

  z-index: 10;
`;

export const SuccessLevelText = styled.Text`
  position: absolute;

  font-size: 24px;
  font-weight: 900;

  color: ${BASIC_COLORS.PRIMARY};

  text-align: center;

  top: 50px;
`;

// ==================================================
// ⭐ 별 영역
// ==================================================

export const SuccessEmojiRow = styled.View`
  flex-direction: row;

  align-items: flex-start;
  justify-content: center;

  width: 100%;

  margin-bottom: 18px;
`;

export const SuccessStarWrapper = styled.View`
  margin-horizontal: 1px;

  align-items: center;
  justify-content: center;
`;

// ==================================================
// 🎉 성공 메시지
// ==================================================

export const SuccessTitle = styled.Text`
  font-size: 30px;

  font-weight: 900;

  color: ${BASIC_COLORS.PRIMARY};

  text-align: center;

  margin-bottom: 2px;
`;

export const SuccessSubtitle = styled.Text`
  font-size: 20px;

  font-weight: 800;

  color: ${BASIC_COLORS.SECONDARY};

  text-align: center;

  margin-bottom: 8px;
`;

// ==================================================
// 🐻 마스코트
// ==================================================

export const SuccessMascotWrapper = styled.View`
  align-items: center;
  justify-content: center;

  margin-top: 2px;
  margin-bottom: 10px;
`;

// ==================================================
// 🎮 버튼
// ==================================================

export const SuccessButtons = styled.View`
  flex-direction: row;

  justify-content: center;

  width: 100%;

  gap: 14px;

  margin-top: 4px;
`;

export const SuccessButton = styled(TouchableOpacity)<{
  variant?: "primary" | "secondary";
}>`
  flex: 1;

  min-height: 58px;

  align-items: center;
  justify-content: center;

  border-radius: 28px;

  background-color: ${(props) =>
    props.variant === "primary" ? BASIC_COLORS.SUCCESS : BASIC_COLORS.ACCENT};

  border-width: 2px;

  border-color: ${(props) =>
    props.variant === "primary" ? "#6AC8A3" : "#FFB54A"};

  border-bottom-width: 5px;

  border-bottom-color: ${(props) =>
    props.variant === "primary" ? "#2E8F69" : "#D97900"};

  elevation: 5;

  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.16;
  shadow-radius: 5px;
`;

export const ButtonText = styled.Text`
  font-size: 30px;

  font-weight: 900;

  color: #ffffff;

  text-align: center;

  line-height: 34px;
`;
