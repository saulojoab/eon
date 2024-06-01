import { ChapterProps } from '@/global/utils/mangaSerializer';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { addToCurrentlyReading } from '@/redux/features/mangaSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import MANGA_REQUESTS from '@/services/requests/manga';

export const useMangaService = () => {
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

    navigation.navigate('Reader', {
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

  function goBack() {
    navigation.goBack();
  }

  return {
    mangaData,
    loading,
    showFullDescription,
    toggleShowFullDescription,
    handleSelectChapter,
    isCurrentlyReading,
    isRead,
    isFavorite,
    toggleFavorite,
    views,
    goBack,
    image,
  };
};
