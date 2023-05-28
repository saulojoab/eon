import { SectionContainer, TrendingTodayContainer } from '@/containers/Home';
import responsive from '@/global/utils/responsive';
import React from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { isIos } from '@/global/utils/platformChecker';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  removeFromCurrentlyReading,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resetState,
  setSelectedManga,
} from '@/redux/features/mangaSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from 'styled-components';

interface CurrentlyReadingMangaProps {
  id: string;
  currentChapter: string;
  finishedChapters: string[];
  image: string;
  source: string;
  referer: string;
}

export default function Home() {
  const { currentlyReading } = useAppSelector(state => state.manga);
  const mockedRecommendedData = [
    {
      key: 'Devin',
      url: 'https://m.media-amazon.com/images/I/91D07epNE9L.jpg',
    },
    {
      key: 'Kevin',
      url: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/32/Serial_Experiments_Lain_DVD_vol_1.jpg/220px-Serial_Experiments_Lain_DVD_vol_1.jpg',
    },
    {
      key: 'Roger',
      url: 'https://static.wikia.nocookie.net/onepiece/images/c/c6/Volume_100.png/revision/latest?cb=20210903160940',
    },
  ];

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const theme = useTheme();

  const dispatch = useAppDispatch();
  //dispatch(resetState());

  function handleContinueReading(manga: CurrentlyReadingMangaProps) {
    dispatch(
      setSelectedManga({
        id: manga.id,
        image: manga.image,
        referer: manga.referer,
      }),
    );
    navigation.navigate('MangaDetails');
  }

  function handleRemoveFromReading(manga: CurrentlyReadingMangaProps) {
    dispatch(removeFromCurrentlyReading(manga.id));
  }

  return (
    <Container colors={[theme.colors.black, theme.colors.secondary]}>
      <TopLogoContainer>
        <LogoText>EON</LogoText>
      </TopLogoContainer>
      <HomeContent>
        <TrendingTodayContainer />
        <SectionContainer icon="book-open" title="CONTINUE READING" />

        {currentlyReading.length === 0 ? (
          <NotReadingAnythingText>
            Currently, you are not reading anything.
          </NotReadingAnythingText>
        ) : (
          <FlatList
            data={currentlyReading}
            renderItem={({ item: manga }) => (
              <MangaPressable
                onLongPress={() => handleRemoveFromReading(manga)}
                onPress={() => handleContinueReading(manga)}
              >
                <MangaImage source={{ uri: manga.image }} />
              </MangaPressable>
            )}
            horizontal
          />
        )}

        <SectionContainer icon="globe-americas" title="RECOMMENDED" />
        <FlatList
          data={mockedRecommendedData}
          renderItem={({ item }) => <MangaImage source={{ uri: item.url }} />}
          horizontal
        />
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

const MangaImage = styled.Image`
  width: ${responsive(150)}px;
  height: ${responsive(220)}px;
  margin-right: ${responsive(15)}px;
`;

const NotReadingAnythingText = styled.Text`
  font-size: ${responsive(15)}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
  margin-left: ${responsive(10)}px;
  margin-top: ${responsive(10)}px;
  margin-bottom: ${responsive(20)}px;
`;

const MangaPressable = styled.TouchableOpacity``;
