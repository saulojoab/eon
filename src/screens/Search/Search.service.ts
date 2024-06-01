import { MangaFromDatabase } from '@/global/utils/mangaSerializer';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { setSelectedManga } from '@/redux/features/mangaSlice';
import MANGA_REQUESTS from '@/services/requests/manga';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';

export const useSearchService = () => {
  const [mangaData, setMangaData] = React.useState<MangaFromDatabase[]>([]);
  const [search, setSearch] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const selectedSource = useAppSelector(state => state.manga.selectedSource);

  const { navigate } = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useAppDispatch();

  async function getMangaData(): Promise<void> {
    setLoading(true);
    const response = await MANGA_REQUESTS.searchManga(selectedSource, search);
    setMangaData(response);
    setLoading(false);
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search !== '') {
        getMangaData();
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  useEffect(() => {
    setSearch('');
    setMangaData([]);
  }, [selectedSource]);

  const handleInputChange = (text: string): void => {
    setSearch(text);
    if (text === '') {
      setMangaData([]);
      setLoading(false);
      return;
    }
  };

  async function handleSelectManga(manga: MangaFromDatabase) {
    const mangaFromApi = await MANGA_REQUESTS.getMangaInformationFromDatabase(
      manga,
    );

    dispatch(
      setSelectedManga({
        id: mangaFromApi?.manga_id || manga.manga_id,
        image: mangaFromApi?.image || manga.image,
        referer: mangaFromApi?.referer || manga.referer,
        title: mangaFromApi?.title || manga.title,
        views: mangaFromApi?.views || 1,
        todayViews: mangaFromApi?.todayViews || {
          date: new Date(),
          views: 1,
        },
      }),
    );
    navigate('Manga');
  }

  function goToSelectSources() {
    navigate('Sources');
  }

  return {
    handleInputChange,
    handleSelectManga,
    loading,
    mangaData,
    search,
    goToSelectSources,
  };
};
