import { TrendingTodayContainer } from '@/containers/Home';
import responsive from '@/global/utils/responsive';
import React from 'react';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FlatList } from 'react-native';
import { isIos } from '@/global/utils/platformChecker';

export default function Home() {
  const theme = useTheme();
  return (
    <Container>
      <TopLogoContainer>
        <LogoText>EON</LogoText>
      </TopLogoContainer>
      <HomeContent>
        <TrendingTodayContainer />
        <SectionView>
          <Icon
            name="book-open"
            solid
            size={responsive(22)}
            color={theme.colors.accent}
          />
          <SectionTitle>CONTINUE READING</SectionTitle>
        </SectionView>
        <FlatList
          data={[
            {
              key: 'Devin',
              url: 'https://external-preview.redd.it/zLWbWihVjsnu6BTlQVsCNgCEDPFUkZWgMNGEkXXixmU.jpg?auto=webp&s=308a16fc79c0d79e55f430e78e183b5768c1dfdb',
            },
            {
              key: 'Kevin',
              url: 'https://img1.ak.crunchyroll.com/i/spire1/0fc1917ecdc3a494b9ee78f0e85bb2fe1600229040_main.jpg',
            },
            {
              key: 'Roger',
              url: 'https://m.media-amazon.com/images/I/91D07epNE9L.jpg',
            },
          ]}
          renderItem={({ item }) => <MangaImage source={{ uri: item.url }} />}
          horizontal
        />

        <SectionView>
          <Icon
            name="globe-americas"
            solid
            size={responsive(22)}
            color={theme.colors.accent}
          />
          <SectionTitle>RECOMMENDED</SectionTitle>
        </SectionView>
        <FlatList
          data={[
            {
              key: 'Devin',
              url: 'https://m.media-amazon.com/images/I/91D07epNE9L.jpg',
            },
            {
              key: 'Kevin',
              url: 'https://m.media-amazon.com/images/I/91D07epNE9L.jpg',
            },
            {
              key: 'Roger',
              url: 'https://m.media-amazon.com/images/I/91D07epNE9L.jpg',
            },
          ]}
          renderItem={({ item }) => <MangaImage source={{ uri: item.url }} />}
          horizontal
        />
      </HomeContent>
    </Container>
  );
}

const Container = styled.View`
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

const SectionView = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: ${responsive(50)}px;
  padding-left: ${responsive(10)}px;
  margin-top: ${responsive(5)}px;
`;

const SectionTitle = styled.Text`
  font-size: ${responsive(15)}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
  margin-left: ${responsive(10)}px;
`;

const MangaImage = styled.Image`
  width: ${responsive(150)}px;
  height: ${responsive(220)}px;
  margin-right: ${responsive(15)}px;
`;
