import responsive from '@/global/utils/responsive';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import { isIos } from '@/global/utils/platformChecker';

export const Container = styled(LinearGradient)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const HomeContent = styled.ScrollView``;

export const TopLogoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: ${isIos ? responsive(60) : responsive(20)}px;
  background-color: ${({ theme }) => theme.colors.background};
  padding-bottom: ${responsive(20)}px;
`;

export const LogoText = styled.Text`
  font-size: ${responsive(30)}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
  margin-left: ${responsive(10)}px;
`;

export const WelcomeBackText = styled.Text`
  font-size: ${responsive(19)}px;
  font-family: ${({ theme }) => theme.fonts.mediumItalic};
  color: ${({ theme }) => theme.colors.white};
  padding-left: ${responsive(10)}px;
  padding-right: ${responsive(20)}px;
  margin-top: ${responsive(20)}px;
  margin-bottom: ${responsive(20)}px;
  text-align: justify;
`;
