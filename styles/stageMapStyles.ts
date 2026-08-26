import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f8f9fe;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 16px 24px;

  background-color: #ffffff;

  border-bottom-width: 1px;
  border-bottom-color: #e2e8f0;
`;

export const BackText = styled.Text`
  font-size: 28px;
  color: #2c3e50;
  font-weight: bold;
`;

export const TitleText = styled.Text`
  font-size: 20px;
  color: #2c3e50;
  font-weight: bold;
`;

export const MapContentContainer = styled.View`
  padding-top: 40px;
  padding-bottom: 100px;
  padding-horizontal: 24px;
`;

export const StageRow = styled.View<{
  align: "left" | "center" | "right";
}>`
  width: 100%;

  align-items: ${(props) =>
    props.align === "left"
      ? "flex-start"
      : props.align === "right"
        ? "flex-end"
        : "center"};

  margin-bottom: 45px;
`;

export const StageButton = styled.TouchableOpacity<{
  isUnlocked: boolean;
}>`
  width: 82px;
  height: 82px;

  border-radius: 41px;

  align-items: center;
  justify-content: center;

  background-color: ${(props) => (props.isUnlocked ? "#FE9404" : "#CBD5E1")};

  border-width: 4px;
  border-color: #ffffff;

  elevation: 5;

  shadow-color: #64748b;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.18;
  shadow-radius: 6px;
`;

export const StageNumberText = styled.Text`
  font-size: 26px;
  color: #ffffff;
  font-weight: bold;
`;

export const StageTitleLabel = styled.View`
  margin-top: 8px;

  padding-horizontal: 14px;
  padding-vertical: 6px;

  border-radius: 16px;

  background-color: rgba(255, 255, 255, 0.92);

  elevation: 2;
`;

export const StageNameText = styled.Text`
  font-size: 13px;
  color: #475569;
  font-weight: bold;
`;
