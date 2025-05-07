import LottieView from "lottie-react-native";
import { Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import styled from "@emotion/native";

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
  height: ${Dimensions.get("window").height};
  background-color: rgba(0, 0, 0, 0.7);
`;

export const Overlay = styled(Animated.View)`
  gap: ${({ theme }) => theme.layout.spacing.medium};
`;

export const TitleAndBackButtonSection = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.layout.spacing.medium};
`;

export const YouAreReadingSection = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: flex-end;
  margin-left: ${({ theme }) => theme.layout.spacing.medium};
`;

export const YouAreReadingText = styled.Text`
  font-size: ${({ theme }) => theme.layout.font.large};
  color: ${(props) => props.theme.colors.white};
  margin-left: ${({ theme }) => theme.layout.spacing.medium};
`;
export const CurrentPageText = styled.Text`
  font-size: ${({ theme }) => theme.layout.font.small};
  color: ${(props) => props.theme.colors.white};
  padding-left: ${({ theme }) => theme.layout.spacing.large};
  padding-right: ${({ theme }) => theme.layout.spacing.large};
`;

export const FinishedAnimation = styled(LottieView)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;
