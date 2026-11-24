import React, { useEffect, useRef } from "react";
import { Animated, Easing, Image, ImageSourcePropType } from "react-native";
import styled from "styled-components/native";

interface BambooEatingAnimationProps {
  source: ImageSourcePropType;
  width?: number;
  height?: number;
  visible?: boolean;
  onComplete?: () => void;
}

export default function BambooEatingAnimation({
  source,
  width = 180,
  height = 190,
  visible = true,
  onComplete,
}: BambooEatingAnimationProps) {
  const pandaScale = useRef(new Animated.Value(1)).current;
  const bambooRotate = useRef(new Animated.Value(0)).current;
  const leafRotate = useRef(new Animated.Value(0)).current;

  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!visible) {
      animationRef.current?.stop();
      pandaScale.setValue(1);
      bambooRotate.setValue(0);
      leafRotate.setValue(0);
      return;
    }

    const createChewAnimation = () =>
      Animated.sequence([
        Animated.parallel([
          Animated.timing(pandaScale, {
            toValue: 1.035,
            duration: 180,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(bambooRotate, {
            toValue: 1,
            duration: 180,
            useNativeDriver: true,
          }),
          Animated.timing(leafRotate, {
            toValue: 1,
            duration: 180,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(pandaScale, {
            toValue: 1,
            duration: 180,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(bambooRotate, {
            toValue: 0,
            duration: 180,
            useNativeDriver: true,
          }),
          Animated.timing(leafRotate, {
            toValue: 0,
            duration: 180,
            useNativeDriver: true,
          }),
        ]),
      ]);

    animationRef.current = Animated.sequence([
      createChewAnimation(),
      createChewAnimation(),
      createChewAnimation(),
    ]);

    animationRef.current.start(({ finished }) => {
      if (finished) {
        onCompleteRef.current?.();
      }
    });

    return () => {
      animationRef.current?.stop();
    };
  }, [visible, pandaScale, bambooRotate, leafRotate]);

  const bambooRotation = bambooRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["-3deg", "3deg"],
  });

  const leftLeafRotation = leafRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["-43deg", "-27deg"],
  });

  const rightLeafRotation = leafRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["27deg", "43deg"],
  });

  return (
    <EatingContainer pointerEvents="none" boxWidth={width} boxHeight={height}>
      {/* 대나무 */}
      <BambooWrapper style={{ transform: [{ rotate: bambooRotation }] }}>
        <BambooStalk>
          <BambooHighlight />
          <BambooJointTop />
          <BambooJointBottom />
        </BambooStalk>

        <LeftLeaf style={{ transform: [{ rotate: leftLeafRotation }] }} />

        <RightLeaf style={{ transform: [{ rotate: rightLeafRotation }] }} />
      </BambooWrapper>

      {/* 기존 팬더곰 */}
      <PandaWrapper style={{ transform: [{ scale: pandaScale }] }}>
        <PandaSprite source={source} resizeMode="contain" />
      </PandaWrapper>
    </EatingContainer>
  );
}

interface EatingContainerProps {
  boxWidth: number;
  boxHeight: number;
}

const EatingContainer = styled.View.attrs<EatingContainerProps>(
  ({ boxWidth, boxHeight }) => ({
    style: {
      width: boxWidth,
      height: boxHeight,
    },
  }),
)`
  position: relative;
  align-items: center;
  justify-content: flex-end;
`;

const BambooWrapper = styled(Animated.View)`
  position: absolute;
  width: 34px;
  height: 112px;
  left: 53%;
  top: 12px;
  z-index: 2;
  align-items: center;
`;

const BambooStalk = styled.View`
  width: 19px;
  height: 105px;
  border-radius: 9px;
  background-color: #77bd63;
  border-width: 1.5px;
  border-color: #559d4d;
  overflow: hidden;
`;

const BambooHighlight = styled.View`
  position: absolute;
  left: 4px;
  top: 5px;
  width: 4px;
  height: 90px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.35);
`;

const BambooJointTop = styled.View`
  position: absolute;
  top: 25px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #4e984a;
`;

const BambooJointBottom = styled.View`
  position: absolute;
  top: 70px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #4e984a;
`;

const LeafBase = styled(Animated.View)`
  position: absolute;
  width: 29px;
  height: 13px;
  border-radius: 20px;
  background-color: #65b95b;
  border-width: 1px;
  border-color: #4e984a;
`;

const LeftLeaf = styled(LeafBase)`
  top: 4px;
  left: -12px;
`;

const RightLeaf = styled(LeafBase)`
  top: 0;
  right: -13px;
`;

const PandaWrapper = styled(Animated.View)`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: flex-end;
  z-index: 3;
`;

const PandaSprite = styled(Image)`
  width: 100%;
  height: 100%;
`;
