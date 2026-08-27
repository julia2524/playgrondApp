import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f8f9fe;
`;

// --------------------------------------------------
// Header
// --------------------------------------------------

export const Header = styled.View`
  height: 72px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding-horizontal: 20px;

  background-color: #ffffff;

  border-bottom-width: 1px;
  border-bottom-color: #edf0f7;

  elevation: 3;
`;

export const BackButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;

  align-items: center;
  justify-content: center;

  border-radius: 22px;

  background-color: #f8f9fe;
`;

export const BackText = styled.Text`
  font-size: 32px;
  color: #2c3e50;
  margin-top: -4px;
`;

export const HeaderTitle = styled.Text`
  font-family: "Jua";
  font-size: 22px;
  color: #2c3e50;
`;

export const HeaderRight = styled.View`
  width: 44px;
`;

// --------------------------------------------------
// Map
// --------------------------------------------------
export const MapItem = styled.View`
  height: 170px;
  width: 100%;
  position: relative;
`;

// --------------------------------------------------
// Stage Node
// --------------------------------------------------

export const NodeContainer = styled.View`
  position: absolute;

  width: 120px;

  align-items: center;
`;

export const StageButton = styled.TouchableOpacity<{
  unlocked: boolean;
  completed: boolean;
}>`
  width: 86px;
  height: 86px;

  border-radius: 43px;

  align-items: center;
  justify-content: center;

  background-color: ${(props) =>
    !props.unlocked ? "#E3E7EF" : props.completed ? "#45B48B" : "#FE9404"};

  border-width: 5px;
  border-color: #ffffff;

  elevation: 7;

  shadow-color: #64748b;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.18;
  shadow-radius: 6px;
`;

export const StageNumber = styled.Text`
  font-family: "Jua";
  font-size: 32px;
  color: #ffffff;
`;

export const LockIcon = styled.Text`
  font-size: 28px;
`;

export const StarRow = styled.View`
  position: absolute;
  bottom: -10px;
  flex-direction: row;
  padding-horizontal: 7px;
  padding-vertical: 2px;
  border-radius: 14px;
  background-color: #ffffff;
  elevation: 3;
`;

export const StageName = styled.Text`
  margin-top: 10px;
  font-family: "Jua";
  font-size: 14px;
  color: #2c3e50;
  background-color: rgba(255, 255, 255, 0.92);
  padding-horizontal: 11px;
  padding-vertical: 5px;
  border-radius: 14px;
  elevation: 2;
`;

// --------------------------------------------------
// Path
// --------------------------------------------------

export const PathContainer = styled.View`
  position: absolute;

  width: 100%;
  height: 180px;

  align-items: center;
`;

export const PathLine = styled.View<{
  completed: boolean;
}>`
  width: 7px;
  height: 180px;

  border-radius: 4px;

  background-color: ${(props) => (props.completed ? "#9ADFC8" : "#DDE3EE")};
`;
