import {
  ContinueReadingContainer,
  RecommendedContainer,
  SectionContainer,
  TrendingTodayContainer,
} from '@/containers/Home';
import responsive from '@/global/utils/responsive';
import React from 'react';
import styled from 'styled-components/native';
import { isIos } from '@/global/utils/platformChecker';
import { useAppSelector } from '@/hooks/redux';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from 'styled-components';

export default function Home() {
  const { user } = useAppSelector(state => state.auth);
  const theme = useTheme();

  return (
    <Container colors={[theme.colors.black, theme.colors.secondary]}>
      <TopLogoContainer>
        <LogoText>EON</LogoText>
      </TopLogoContainer>
      <WelcomeBackText>
        Welcome back, {user.username}! Hope you're doing good.
      </WelcomeBackText>
      <HomeContent>
        <TrendingTodayContainer />
        <SectionContainer icon="book-open" title="CONTINUE READING" />
        <ContinueReadingContainer />

        <SectionContainer icon="globe-americas" title="RECOMMENDED" />
        <RecommendedContainer />
      </HomeContent>
    </Container>
  );
}

const Container = styled(LinearGradient)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

const HomeContent = styled.ScrollView``;

const TopLogoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: ${isIos ? responsive(60) : responsive(20)}px;
  background-color: ${({ theme }) => theme.colors.background};
  padding-bottom: ${responsive(20)}px;
`;

const LogoText = styled.Text`
  font-size: ${responsive(30)}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
  margin-left: ${responsive(10)}px;
`;

const WelcomeBackText = styled.Text`
  font-size: ${responsive(19)}px;
  font-family: ${({ theme }) => theme.fonts.mediumItalic};
  color: ${({ theme }) => theme.colors.white};
  padding-left: ${responsive(10)}px;
  padding-right: ${responsive(20)}px;
  margin-top: ${responsive(20)}px;
  margin-bottom: ${responsive(20)}px;
  text-align: justify;
`;
