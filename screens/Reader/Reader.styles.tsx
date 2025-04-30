import responsive from "@/global/utils/responsive";
import LottieView from "lottie-react-native";
import { Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const OverlayTouchable = styled.TouchableHighlight`
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${Dimensions.get("window").height}px;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const Overlay = styled(Animated.View)``;

export const TitleAndBackButtonSection = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${responsive(20)}px;
  padding-top: ${responsive(60)}px;
`;

export const YouAreReadingSection = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: flex-end;
  margin-left: ${responsive(10)}px;
`;

export const YouAreReadingText = styled.Text`
  font-size: ${responsive(20)}px;
  color: ${(props) => props.theme.colors.white};
  margin-left: ${responsive(10)}px;
`;
export const CurrentPageText = styled.Text`
  font-size: ${responsive(14)}px;
  color: ${(props) => props.theme.colors.white};
  padding-left: ${responsive(20)}px;
  padding-right: ${responsive(20)}px;
`;

export const FinishedAnimation = styled(LottieView)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;
