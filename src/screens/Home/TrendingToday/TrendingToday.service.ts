import { MangaFromDatabase } from '@/global/utils/mangaSerializer';
import trycatcher from '@/global/utils/trycatcher';
import { useAppDispatch } from '@/hooks/redux';
import { updateSource, setSelectedManga } from '@/redux/features/mangaSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MANGA_REQUESTS from '@/services/requests/manga';
import SOURCE_UTILS from '@/global/utils/sources';
import React, { useEffect } from 'react';

export const useTrendingTodayService = () => {
  const [trendingTodayManga, setTrendingTodayManga] =
    React.useState<MangaFromDatabase>();
  const [loading, setLoading] = React.useState(false);

  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  async function getTrendingTodayManga() {
    setLoading(true);
    const { response, error } = await trycatcher(
      MANGA_REQUESTS.getTrendingTodayManga(),
    );

    if (error) {
      setLoading(false);
      return;
    }

    setTrendingTodayManga(response);
    setLoading(false);
  }

  async function handleSelectManga() {
    if (!trendingTodayManga) {
      return;
    }

    dispatch(
      updateSource(SOURCE_UTILS.getSourceByURL(trendingTodayManga.referer)),
    );

    const mangaFromApi = await MANGA_REQUESTS.getMangaInformationFromDatabase(
      trendingTodayManga,
    );

    dispatch(
      setSelectedManga({
        id: mangaFromApi?.manga_id || trendingTodayManga._id,
        image: mangaFromApi?.image || trendingTodayManga.image,
        referer: mangaFromApi?.referer || trendingTodayManga.referer,
        title: mangaFromApi?.title || trendingTodayManga.title,
        views: mangaFromApi?.views || 1,
        todayViews: mangaFromApi?.todayViews || {
          date: new Date(),
          views: 1,
        },
      }),
    );
    navigation.navigate('Manga');
  }

  useEffect(() => {
    getTrendingTodayManga();
  }, []);

  return {
    loading,
    trendingTodayManga,
    handleSelectManga,
  };
};
