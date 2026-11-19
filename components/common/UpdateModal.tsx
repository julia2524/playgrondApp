// import React from "react";
// import { ActivityIndicator, Modal, Platform } from "react-native";
// import styled from "styled-components/native";
// import { AppText } from "../../utils/AppText";

// interface UpdateModalProps {
//   visible: boolean;
//   isUpdating: boolean;
//   onUpdate: () => void | Promise<void>;
//   onLater: () => void | Promise<void>;
// }

// export default function UpdateModal({
//   visible,
//   isUpdating,
//   onUpdate,
//   onLater,
// }: UpdateModalProps) {
//   const handleLater = () => {
//     if (isUpdating) return;
//     onLater();
//   };

//   return (
//     <Modal
//       visible={visible}
//       transparent
//       animationType="fade"
//       statusBarTranslucent
//       onRequestClose={handleLater}
//     >
//       <Overlay>
//         <ModalContainer>
//           {/* 상단 장식 */}
//           <Decoration>
//             <Sparkle style={{ top: 8, left: 24 }}>✦</Sparkle>
//             <Sparkle style={{ top: 28, right: 20 }}>✧</Sparkle>
//             <Sparkle style={{ bottom: 18, left: 42 }}>✧</Sparkle>
//             <Sparkle style={{ bottom: 8, right: 48 }}>✦</Sparkle>

//             {/* 업데이트 일러스트 */}
//             <IllustrationCircle>
//               <Cloud>☁️</Cloud>
//               <Bear>🧸</Bear>
//               <UpdateSymbol>↻</UpdateSymbol>
//               <TinyStar>⭐</TinyStar>
//             </IllustrationCircle>
//           </Decoration>

//           {/* 안내 문구 */}
//           <Eyebrow>HELLO, LITTLE FRIEND!</Eyebrow>

//           <Title>
//             새로운 친구가{"\n"}
//             찾아왔어요!
//           </Title>

//           <Description>
//             더 즐겁고 재미있는 놀이를 위해{"\n"}
//             새로운 버전으로 업데이트해 주세요.
//           </Description>

//           {/* 업데이트 안내 박스 */}
//           <InfoBox>
//             <InfoIcon>🎁</InfoIcon>
//             <InfoText>
//               새로운 놀이와 즐거운 시간이{"\n"}
//               기다리고 있어요!
//             </InfoText>
//           </InfoBox>

//           {/* 업데이트 버튼 */}
//           <UpdateButton
//             onPress={onUpdate}
//             disabled={isUpdating}
//             style={({ pressed }) => ({
//               opacity: isUpdating ? 0.7 : pressed ? 0.85 : 1,
//               transform: [{ scale: pressed && !isUpdating ? 0.98 : 1 }],
//             })}
//           >
//             {isUpdating ? (
//               <ButtonContent>
//                 <ActivityIndicator color="#FFFFFF" size="small" />
//                 <UpdateButtonText>업데이트 준비 중...</UpdateButtonText>
//               </ButtonContent>
//             ) : (
//               <ButtonContent>
//                 <UpdateButtonText>업데이트하기</UpdateButtonText>
//                 <ButtonArrow>→</ButtonArrow>
//               </ButtonContent>
//             )}
//           </UpdateButton>

//           {/* 나중에 버튼 */}
//           <LaterButton
//             onPress={handleLater}
//             disabled={isUpdating}
//             style={({ pressed }) => ({
//               opacity: isUpdating ? 0.4 : pressed ? 0.6 : 1,
//             })}
//           >
//             <LaterButtonText>나중에 할게요</LaterButtonText>
//           </LaterButton>

//           <Footer>우리 다음에도 재미있게 놀아요! ♡</Footer>
//         </ModalContainer>
//       </Overlay>
//     </Modal>
//   );
// }

// // ==========================================
// // Styles
// // ==========================================

// const Overlay = styled.View`
//   flex: 1;
//   background-color: rgba(65, 55, 75, 0.48);
//   justify-content: center;
//   align-items: center;
//   padding-horizontal: 24px;
// `;

// const ModalContainer = styled.View`
//   width: 100%;
//   max-width: 370px;
//   background-color: #fffdf9;
//   border-radius: 32px;
//   padding-horizontal: 26px;
//   padding-top: 18px;
//   padding-bottom: 24px;
//   align-items: center;
//   overflow: hidden;

//   ${Platform.select({
//     android: `
//       elevation: 14;
//     `,
//     ios: `
//       shadow-color: #786b83;
//       shadow-offset: 0px 10px;
//       shadow-opacity: 0.18;
//       shadow-radius: 20px;
//     `,
//   })}
// `;

// const Decoration = styled.View`
//   width: 100%;
//   height: 190px;
//   justify-content: center;
//   align-items: center;
//   position: relative;
// `;

// const Sparkle = styled(AppText)`
//   position: absolute;
//   color: #f4c77d;
//   font-size: 22px;
// `;

// const IllustrationCircle = styled.View`
//   width: 154px;
//   height: 154px;
//   border-radius: 77px;
//   background-color: #f4edff;
//   justify-content: center;
//   align-items: center;
//   position: relative;
// `;

// const Cloud = styled(AppText)`
//   position: absolute;
//   font-size: 90px;
//   opacity: 0.75;
// `;

// const Bear = styled(AppText)`
//   font-size: 67px;
//   z-index: 2;
//   margin-top: 5px;
// `;

// const UpdateSymbol = styled(AppText)`
//   position: absolute;
//   right: 5px;
//   bottom: 13px;
//   width: 42px;
//   height: 42px;
//   border-radius: 21px;
//   background-color: #a8dcca;
//   color: #ffffff;
//   font-size: 30px;
//   font-weight: 800;
//   text-align: center;
//   text-align-vertical: center;
//   overflow: hidden;
//   z-index: 3;
// `;

// const TinyStar = styled(AppText)`
//   position: absolute;
//   top: 12px;
//   right: 18px;
//   font-size: 19px;
// `;

// const Eyebrow = styled(AppText)`
//   color: #b49acb;
//   font-size: 10px;
//   font-weight: 800;
//   letter-spacing: 2px;
//   margin-bottom: 12px;
// `;

// const Title = styled(AppText)`
//   color: #55465e;
//   font-size: 24px;
//   font-weight: 800;
//   line-height: 34px;
//   text-align: center;
//   margin-bottom: 12px;
// `;

// const Description = styled(AppText)`
//   color: #928795;
//   font-size: 14px;
//   font-weight: 500;
//   line-height: 23px;
//   text-align: center;
// `;

// const InfoBox = styled.View`
//   width: 100%;
//   min-height: 66px;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//   background-color: #fff4e9;
//   border-radius: 18px;
//   padding-horizontal: 14px;
//   padding-vertical: 12px;
//   margin-top: 22px;
//   margin-bottom: 20px;
// `;

// const InfoIcon = styled(AppText)`
//   font-size: 27px;
//   margin-right: 12px;
// `;

// const InfoText = styled(AppText)`
//   color: #a78670;
//   font-size: 12px;
//   font-weight: 700;
//   line-height: 19px;
// `;

// const UpdateButton = styled.Pressable`
//   width: 100%;
//   min-height: 54px;
//   background-color: #a995d5;
//   border-radius: 19px;
//   justify-content: center;
//   align-items: center;
// `;

// const ButtonContent = styled.View`
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//   gap: 10px;
// `;

// const UpdateButtonText = styled(AppText)`
//   color: #ffffff;
//   font-size: 16px;
//   font-weight: 800;
// `;

// const ButtonArrow = styled(AppText)`
//   color: #ffffff;
//   font-size: 20px;
//   font-weight: 700;
// `;

// const LaterButton = styled.Pressable`
//   padding-horizontal: 24px;
//   padding-vertical: 15px;
// `;

// const LaterButtonText = styled(AppText)`
//   color: #aaa0ad;
//   font-size: 13px;
//   font-weight: 600;
// `;

// const Footer = styled(AppText)`
//   color: #c6bbc8;
//   font-size: 10px;
//   font-weight: 500;
//   margin-top: 3px;
// `;

import React from "react";
import { ActivityIndicator, Modal, Platform } from "react-native";
import styled from "styled-components/native";
import { AppText } from "../../utils/AppText";
import i18n from "../../i18n";

interface UpdateModalProps {
  visible: boolean;
  isUpdating: boolean;
  onUpdate: () => void | Promise<void>;
  onLater: () => void | Promise<void>;
}

export default function UpdateModal({
  visible,
  isUpdating,
  onUpdate,
  onLater,
}: UpdateModalProps) {
  const handleLater = () => {
    if (isUpdating) return;
    onLater();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={handleLater}
    >
      <Overlay>
        <ModalContainer>
          {/* 상단 장식 */}
          <Decoration>
            <Sparkle style={{ top: 8, left: 24 }}>✦</Sparkle>
            <Sparkle style={{ top: 28, right: 20 }}>✧</Sparkle>
            <Sparkle style={{ bottom: 18, left: 42 }}>✧</Sparkle>
            <Sparkle style={{ bottom: 8, right: 48 }}>✦</Sparkle>

            {/* 업데이트 일러스트 */}
            <IllustrationCircle>
              <Cloud>☁️</Cloud>
              <Bear>🧸</Bear>
              <UpdateSymbol>↻</UpdateSymbol>
              <TinyStar>⭐</TinyStar>
            </IllustrationCircle>
          </Decoration>

          {/* 안내 문구 */}
          <Eyebrow>{i18n.t("updateModal_eyebrow")}</Eyebrow>

          <Title>{i18n.t("updateModal_title")}</Title>

          <Description>{i18n.t("updateModal_description")}</Description>

          {/* 업데이트 안내 박스 */}
          <InfoBox>
            {/* <InfoIcon>🎁</InfoIcon> */}
            <InfoText>{i18n.t("updateModal_infoText")}</InfoText>
          </InfoBox>

          {/* 업데이트 버튼 */}
          <UpdateButton
            onPress={onUpdate}
            disabled={isUpdating}
            style={({ pressed }) => ({
              opacity: isUpdating ? 0.7 : pressed ? 0.85 : 1,
              transform: [{ scale: pressed && !isUpdating ? 0.98 : 1 }],
            })}
          >
            {isUpdating ? (
              <ButtonContent>
                <ActivityIndicator color="#FFFFFF" size="small" />
                <UpdateButtonText>
                  {i18n.t("updateModal_updating")}
                </UpdateButtonText>
              </ButtonContent>
            ) : (
              <ButtonContent>
                <UpdateButtonText>
                  {i18n.t("updateModal_updateButton")}
                </UpdateButtonText>
                {/* <ButtonArrow>→</ButtonArrow> */}
              </ButtonContent>
            )}
          </UpdateButton>

          {/* 나중에 버튼 */}
          <LaterButton
            onPress={handleLater}
            disabled={isUpdating}
            style={({ pressed }) => ({
              opacity: isUpdating ? 0.4 : pressed ? 0.6 : 1,
            })}
          >
            <LaterButtonText>
              {i18n.t("updateModal_laterButton")}
            </LaterButtonText>
          </LaterButton>

          <Footer>{i18n.t("updateModal_footer")}</Footer>
        </ModalContainer>
      </Overlay>
    </Modal>
  );
}

// ==========================================
// Styles
// ==========================================

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(65, 55, 75, 0.48);
  justify-content: center;
  align-items: center;
  padding-horizontal: 24px;
`;

const ModalContainer = styled.View`
  width: 100%;
  max-width: 370px;
  background-color: #fffdf9;
  border-radius: 32px;
  padding-horizontal: 26px;
  padding-top: 18px;
  padding-bottom: 24px;
  align-items: center;
  overflow: hidden;

  ${Platform.select({
    android: `
      elevation: 14;
    `,
    ios: `
      shadow-color: #786b83;
      shadow-offset: 0px 10px;
      shadow-opacity: 0.18;
      shadow-radius: 20px;
    `,
  })}
`;

const Decoration = styled.View`
  width: 100%;
  height: 190px;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Sparkle = styled(AppText)`
  position: absolute;
  color: #f4c77d;
  font-size: 22px;
`;

const IllustrationCircle = styled.View`
  width: 154px;
  height: 154px;
  border-radius: 77px;
  background-color: #f4edff;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Cloud = styled(AppText)`
  position: absolute;
  font-size: 90px;
  opacity: 0.75;
`;

const Bear = styled(AppText)`
  font-size: 67px;
  z-index: 2;
  margin-top: 5px;
`;

const UpdateSymbol = styled(AppText)`
  position: absolute;
  right: 5px;
  bottom: 13px;
  width: 42px;
  height: 42px;
  border-radius: 21px;
  background-color: #a8dcca;
  color: #ffffff;
  font-size: 30px;
  font-weight: 800;
  text-align: center;
  text-align-vertical: center;
  overflow: hidden;
  z-index: 3;
`;

const TinyStar = styled(AppText)`
  position: absolute;
  top: 12px;
  right: 18px;
  font-size: 19px;
`;

const Eyebrow = styled(AppText)`
  color: #b49acb;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 2px;
  margin-bottom: 12px;
`;

const Title = styled(AppText)`
  color: #55465e;
  font-size: 24px;
  font-weight: 800;
  line-height: 34px;
  text-align: center;
  margin-bottom: 12px;
`;

const Description = styled(AppText)`
  color: #928795;
  font-size: 14px;
  font-weight: 500;
  line-height: 23px;
  text-align: center;
`;

const InfoBox = styled.View`
  width: 100%;
  min-height: 66px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #fff4e9;
  border-radius: 18px;
  padding-horizontal: 14px;
  padding-vertical: 12px;
  margin-top: 22px;
  margin-bottom: 20px;
`;

const InfoIcon = styled(AppText)`
  font-size: 27px;
  margin-right: 12px;
`;

const InfoText = styled(AppText)`
  color: #a78670;
  font-size: 12px;
  font-weight: 700;
  line-height: 19px;
`;

const UpdateButton = styled.Pressable`
  width: 100%;
  min-height: 54px;
  background-color: #a995d5;
  border-radius: 19px;
  justify-content: center;
  align-items: center;
`;

const ButtonContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const UpdateButtonText = styled(AppText)`
  color: #ffffff;
  font-size: 16px;
  font-weight: 800;
`;

const ButtonArrow = styled(AppText)`
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
`;

const LaterButton = styled.Pressable`
  padding-horizontal: 24px;
  padding-vertical: 15px;
`;

const LaterButtonText = styled(AppText)`
  color: #aaa0ad;
  font-size: 13px;
  font-weight: 600;
`;

const Footer = styled(AppText)`
  color: #c6bbc8;
  font-size: 10px;
  font-weight: 500;
  margin-top: 3px;
`;
