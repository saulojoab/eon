import React, { useEffect } from 'react';
import { FlatList, StatusBar } from 'react-native';
import MANGA_REQUESTS from '@/services/requests/manga';
import styled, { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/core';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import responsive from '@/global/utils/responsive';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FavoriteButton } from '@/components';
import LinearGradient from 'react-native-linear-gradient';
import { isIos } from '@/global/utils/platformChecker';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { addToCurrentlyReading } from '@/redux/features/mangaSlice';
import { ChapterProps } from '@/global/utils/mangaSerializer';
import { Skeleton } from 'moti/skeleton';

export default function MangaDetails() {
  const { id, image, views } = useAppSelector(
    state => state.manga.selectedManga,
  );

  const [mangaData, setMangaData] = React.useState<any>({});
  const [showFullDescription, setShowFullDescription] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const { selectedSource, currentlyReading } = useAppSelector(
    state => state.manga,
  );

  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useAppDispatch();

  async function getMangaData() {
    setLoading(true);
    //const mangaInCurrentlyReading = currentlyReading.find(
    //  item => item.id === id,
    //);
    console.log(selectedSource);

    const response = await MANGA_REQUESTS.getMangaInformationFromCrawlers(
      selectedSource,
      id,
    );

    if (!response) return;

    setMangaData({
      ...response,
      chapters: response.chapters.reverse(),
    });

    setLoading(false);
  }

  useEffect(() => {
    getMangaData();
  }, []);

  function handleSelectChapter(chapter: any) {
    if (!currentlyReading.find(item => item.manga.manga_id === id)) {
      dispatch(
        addToCurrentlyReading({
          id: id,
          currentChapter: chapter.id,
          finishedChapters: [],
          image: image,
          source: selectedSource,
          referer: mangaData?.referer,
        }),
      );
    }

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

  const isCurrentlyReading = (chapter: ChapterProps): boolean =>
    currentlyReading.some(item => item.current_chapter === chapter.id);

  const isRead = (chapter: ChapterProps): boolean => {
    return (
      currentlyReading.filter(manga =>
        manga.finished_chapters?.some(cpt => cpt === chapter.id),
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
        <MangaTitleContainer>
          <Skeleton
            show={loading}
            width={'50%'}
            height={responsive(40)}
            radius={0}
            colorMode="dark"
          >
            <MangaTitle>{mangaData?.title}</MangaTitle>
          </Skeleton>
        </MangaTitleContainer>

        <ViewsContainer>
          <ViewsIcon
            size={responsive(15)}
            color={theme.colors.white}
            name="eye"
          />
          <ViewCount>{views}</ViewCount>
        </ViewsContainer>

        <MangaImage resizeMode="cover" source={{ uri: image }} />
        <MangaImageFadingForeground
          colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.8)']}
        />
      </MangaImageTitleContainer>

      <DataSection>
        <Skeleton
          show={loading}
          width={'100%'}
          height={responsive(80)}
          colorMode="dark"
        >
          <MangaDescription
            onPress={toggleShowFullDescription}
            numberOfLines={showFullDescription ? undefined : 4}
          >
            {mangaData?.description}
          </MangaDescription>
        </Skeleton>

        <SectionTitle>Chapters</SectionTitle>
      </DataSection>

      <Skeleton show={loading} width={'100%'} height={'100%'} colorMode="dark">
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
      </Skeleton>
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

const MangaTitleContainer = styled.View`
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 1;
  bottom: ${responsive(25)}px;
  left: 0;
  right: 0;
`;

const MangaTitle = styled.Text`
  font-size: ${responsive(30)}px;
  font-weight: 100;
  text-align: center;
  color: ${props => props.theme.colors.white};
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

  padding-top: ${responsive(10)}px;
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

const ViewsContainer = styled.View`
  flex-direction: row;
  position: absolute;
  z-index: 1;
  bottom: ${responsive(5)}px;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
`;

const ViewCount = styled.Text`
  font-size: ${responsive(14)}px;
  color: ${props => props.theme.colors.white};
  font-family: ${props => props.theme.fonts.light};
  margin-left: ${responsive(5)}px;
`;

const ViewsIcon = styled(Icon)``;
