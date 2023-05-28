import React, { useEffect } from 'react';
import { FlatList, StatusBar } from 'react-native';
import api from '@/services/api';
import styled, { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/core';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import responsive from '@/global/utils/responsive';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FavoriteButton } from '@/components';
import LinearGradient from 'react-native-linear-gradient';
import { isIos } from '@/global/utils/platformChecker';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  addToCurrentlyReading,
  updateCurrentChapter,
} from '@/redux/features/mangaSlice';

interface Chapter {
  id: string;
  chapter: string;
  title: string;
}
interface MangaData {
  id: string;
  title: string;
  altTitles: string[];
  authors: string[];
  headerForImage: { Referer: string };
  image: string;
  status: string;
  genres: string[];
  description: string;
  chapters: Array<Chapter>;
}

export default function MangaDetails() {
  const { id, image } = useAppSelector(state => state.manga.selectedManga);

  const [mangaData, setMangaData] = React.useState<MangaData>();
  const [showFullDescription, setShowFullDescription] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const { selectedSource, currentlyReading } = useAppSelector(
    state => state.manga,
  );

  console.log(currentlyReading);

  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useAppDispatch();

  async function getMangaData() {
    const mangaInCurrentlyReading = currentlyReading.find(
      item => item.id === id,
    );

    try {
      const response = await api.get(
        `/manga/${
          mangaInCurrentlyReading
            ? mangaInCurrentlyReading.source
            : selectedSource
        }/info?id=${id}`,
      );

      if (!response.data) return;

      setMangaData({
        ...response.data,
        chapters: response.data.chapters.reverse(),
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getMangaData();
  }, []);

  function handleSelectChapter(chapter: any) {
    if (!currentlyReading.find(item => item.id === id)) {
      dispatch(
        addToCurrentlyReading({
          id: id,
          currentChapter: chapter.id,
          finishedChapters: [],
          image: image,
          source: selectedSource,
          referer: mangaData?.headerForImage.Referer,
        }),
      );
    }

    dispatch(updateCurrentChapter({ id: id, currentChapter: chapter.id }));

    navigation.navigate('MangaReader', {
      id: chapter.id,
      chapter: chapter.title,
    });
  }

  const toggleShowFullDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const isCurrentlyReading = (chapter: Chapter): boolean =>
    currentlyReading.some(item => item.currentChapter === chapter.id);

  const isRead = (chapter: Chapter): boolean => {
    console.log(currentlyReading);

    return (
      currentlyReading.filter(manga =>
        manga.finishedChapters.some(cpt => cpt === chapter.id),
      ).length > 0
    );
  };

  return (
    <Container>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={theme.colors.primary}
      />

      <TitleAndBackButtonSection>
        <BackButton onPress={() => navigation.goBack()}>
          <Icon size={30} color={theme.colors.white} name="arrow-left" />
        </BackButton>
        <Favorite isFavorite={isFavorite} onPress={toggleFavorite} />
      </TitleAndBackButtonSection>

      <MangaImageTitleContainer>
        <MangaImage resizeMode="cover" source={{ uri: image }} />
        <MangaImageFadingForeground
          colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.8)']}
        />
        <MangaTitle>{mangaData?.title}</MangaTitle>
      </MangaImageTitleContainer>

      <DataSection>
        <MangaDescription
          onPress={toggleShowFullDescription}
          numberOfLines={showFullDescription ? undefined : 4}
        >
          {mangaData?.description}
        </MangaDescription>

        <SectionTitle>Chapters</SectionTitle>
      </DataSection>
      <FlatList
        data={mangaData?.chapters}
        renderItem={({ item }) => (
          <ChapterItem
            currentlyReading={isCurrentlyReading(item)}
            isRead={isRead(item)}
            //isRead={false}
            onPress={() => {
              handleSelectChapter(item);
            }}
          >
            <ChapterTitle>{item.title.slice(6)}</ChapterTitle>
          </ChapterItem>
        )}
        keyExtractor={item => item.id}
        numColumns={3}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  padding-bottom: ${responsive(20)}px;
`;

const MangaDescription = styled.Text`
  font-size: ${responsive(14)}px;
  text-align: justify;
  margin-top: ${responsive(10)}px;
  color: ${props => props.theme.colors.white};
  font-weight: 300;
`;

const MangaImage = styled.Image`
  width: 100%;
  height: ${responsive(250)}px;
`;

const MangaImageTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const MangaTitle = styled.Text`
  font-size: ${responsive(30)}px;
  color: ${props => props.theme.colors.white};
  font-weight: 100;
  position: absolute;
  z-index: 1;
  bottom: ${responsive(20)}px;
  left: 0;
  right: 0;
  text-align: center;
`;

interface ChapterItemProps {
  currentlyReading: boolean;
  isRead: boolean;
}

const ChapterItem = styled.TouchableOpacity<ChapterItemProps>`
  flex: 1;
  margin: ${responsive(4)}px;
  opacity: ${props => (props.isRead ? 0.5 : 1)};
  background-color: ${props =>
    props.currentlyReading ? props.theme.colors.primary : 'transparent'};
  border: 1px solid ${props => props.theme.colors.white};
  border-radius: ${responsive(5)}px;
  margin-bottom: ${responsive(10)}px;
  padding: ${responsive(10)}px;
  justify-content: center;
  align-items: center;
`;

const ChapterTitle = styled.Text`
  font-size: ${responsive(13)}px;
  font-weight: bold;
  text-align: center;
  color: ${props => props.theme.colors.white};
`;

const TitleAndBackButtonSection = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${responsive(20)}px;
  position: absolute;
  justify-content: space-between;
  z-index: 1;
  width: 100%;
  padding-top: ${isIos ? responsive(60) : responsive(20)}px;
`;

const BackButton = styled.TouchableOpacity`
  width: ${responsive(30)}px;
  height: ${responsive(30)}px;
  border-radius: ${responsive(15)}px;
  justify-content: center;
  align-items: center;
`;

const SectionTitle = styled.Text`
  font-size: ${responsive(20)}px;
  color: ${props => props.theme.colors.white};
  font-weight: bold;
  width: 100%;
  margin-top: ${responsive(20)}px;
`;
const DataSection = styled.View`
  flex-direction: column;
  padding: ${responsive(20)}px;
  padding-top: 0px;
`;

const Favorite = styled(FavoriteButton)`
  position: absolute;
  right: ${responsive(15)}px;
  bottom: ${responsive(15)}px;
`;

const MangaImageFadingForeground = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  padding: ${responsive(10)}px;
  position: absolute;
`;
