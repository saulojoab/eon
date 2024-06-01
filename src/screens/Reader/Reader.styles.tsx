import responsive from '@/global/utils/responsive';
import { Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import Lottie from 'lottie-react-native';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

export const OverlayTouchable = styled.TouchableWithoutFeedback``;

export const Overlay = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${Dimensions.get('window').height}px;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
`;

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
  color: ${props => props.theme.colors.white};
  margin-left: ${responsive(10)}px;
`;
export const CurrentPageText = styled.Text`
  font-size: ${responsive(14)}px;
  color: ${props => props.theme.colors.white};
  padding-left: ${responsive(20)}px;
  padding-right: ${responsive(20)}px;
`;

export const FinishedAnimation = styled(Lottie)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;
