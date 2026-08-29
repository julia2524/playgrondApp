import styled from "styled-components/native";
import { Animated } from "react-native";
import { BASIC_COLORS } from "../../../../../constants/colors";
import { RADIUS } from "../../../../../constants/radius";

export const Overlay = styled.View`
  position: absolute;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  align-items: center;
  justify-content: center;

  background-color: rgba(255, 255, 255, 0.94);

  z-index: 999;
`;

export const Content = styled.View`
  width: 88%;

  align-items: center;

  background-color: #ffffff;

  padding-horizontal: 24px;
  padding-vertical: 28px;

  border-radius: ${RADIUS.xl}px;

  border-width: 2px;
  border-color: #edf1f5;

  elevation: 10;

  shadow-color: #64748b;
  shadow-offset: 0px 6px;
  shadow-opacity: 0.12;
  shadow-radius: 12px;
`;

export const MascotWrapper = styled.View`
  margin-bottom: 8px;
`;

export const Title = styled.Text`
  font-family: "Jua";

  font-size: 24px;

  line-height: 32px;

  color: ${BASIC_COLORS.TEXT_MAIN};

  text-align: center;

  margin-bottom: 12px;
`;

export const Description = styled.Text`
  font-family: "Jua";

  font-size: 16px;

  line-height: 25px;

  color: #64748b;

  text-align: center;

  margin-bottom: 18px;
`;

export const DemoArea = styled.View`
  width: 240px;
  height: 90px;

  flex-direction: row;

  align-items: center;
  justify-content: space-between;

  padding-horizontal: 20px;

  margin-bottom: 12px;

  background-color: #f8fafc;

  border-radius: ${RADIUS.lg}px;

  border-width: 2px;
  border-color: #e2e8f0;
`;

export const Finger = styled(Animated.Text)`
  font-size: 42px;
`;

export const Arrow = styled.Text`
  font-size: 34px;

  color: ${BASIC_COLORS.PRIMARY};
`;

export const Button = styled.TouchableOpacity`
  width: 100%;

  margin-top: 8px;

  padding-vertical: 15px;

  align-items: center;
  justify-content: center;

  background-color: ${BASIC_COLORS.PRIMARY};

  border-radius: ${RADIUS.md}px;

  elevation: 4;
`;

export const ButtonText = styled.Text`
  font-family: "Jua";

  font-size: 18px;

  color: #ffffff;

  text-align: center;
`;

export const DemoStage = styled.View`
  width: 240px;
  height: 100px;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin-bottom: 16px;
`;

export const DemoSlot = styled.View`
  width: 70px;
  height: 70px;
  border-radius: 35px;

  border-width: 3px;
  border-style: dashed;
  border-color: #94a3b8;

  position: absolute;
  right: 20px;
`;

export const DemoBallWrapper = styled(Animated.View)`
  position: absolute;
  left: 20px;

  align-items: center;
`;

export const DemoBall = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;

  background-color: #e8f3ff;
  border-width: 4px;
  border-color: #0fa6dd;
`;

export const FingerIcon = styled.Text`
  font-size: 36px;
  margin-top: -18px; /* 공 위에 손가락이 겹치도록 */
`;

export const DemoContainer = styled.View`
  width: 300px;
  height: 190px;

  position: relative;

  align-items: center;
  justify-content: center;

  background-color: rgba(255, 255, 255, 0.75);

  border-radius: ${RADIUS.xl}px;

  border-width: 2px;
  border-color: #edf1f5;

  margin-bottom: 20px;
`;

export const DemoSticker = styled.View`
  position: absolute;

  left: 40px;
  top: 55px;

  width: 70px;
  height: 70px;

  border-radius: 35px;

  background-color: #60a5fa;

  border-width: 4px;
  border-color: #ffffff;

  elevation: 4;
`;

export const DemoTarget = styled.View`
  position: absolute;

  right: 40px;
  top: 55px;

  width: 70px;
  height: 70px;

  border-radius: 35px;

  background-color: rgba(255, 255, 255, 0.3);

  border-width: 3px;
  border-style: dashed;
  border-color: #94a3b8;
`;

export const DemoFinger = styled(Animated.Text)`
  font-size: 42px;
`;

export const DemoArrow = styled.Text`
  position: absolute;

  left: 130px;
  top: 70px;

  font-size: 32px;

  color: ${BASIC_COLORS.PRIMARY};
`;

export const DemoText = styled.Text`
  position: absolute;

  bottom: 18px;

  font-family: "Jua";

  font-size: 15px;

  color: ${BASIC_COLORS.TEXT_MAIN};
`;
export const PracticeBoard = styled.View`
  width: 100%;
  height: 280px;

  align-items: center;
  justify-content: space-around;
`;
