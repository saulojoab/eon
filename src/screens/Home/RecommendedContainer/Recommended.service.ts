import trycatcher from '@/global/utils/trycatcher';
import { useAppDispatch } from '@/hooks/redux';
import { updateSource, setSelectedManga } from '@/redux/features/mangaSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import { RecommendedMangaProps } from './Recommended.type';
import SOURCE_UTILS from '@/global/utils/sources';
import MANGA_REQUESTS from '@/services/requests/manga';

export const useRecommendedService = () => {
  const [recommendedManga, setRecommendedManga] =
    useState<RecommendedMangaProps[]>();
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  async function getRecommendedManga() {
    setLoading(true);
    const { response, error } = await trycatcher(
      MANGA_REQUESTS.getRecommendedManga(),
    );

    if (error) {
      setLoading(false);
      return;
    }

    setRecommendedManga(response);
    setLoading(false);
  }

  useEffect(() => {
    getRecommendedManga();
  }, []);

  async function handleSelectManga(manga: any) {
    dispatch(updateSource(SOURCE_UTILS.getSourceByURL(manga.referer)));

    const mangaFromApi = await MANGA_REQUESTS.getMangaInformationFromDatabase(
      manga,
    );

    dispatch(
      setSelectedManga({
        id: mangaFromApi?.manga_id || manga._id,
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
    navigation.navigate('Manga');
  }

  return {
    loading,
    recommendedManga,
    handleSelectManga,
  };
};
