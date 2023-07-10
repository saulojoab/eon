import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import responsive from '@/global/utils/responsive';
import trycatcher from '@/global/utils/trycatcher';
import MANGA_REQUESTS from '@/services/requests/manga';
import { useAppDispatch } from '@/hooks/redux';
import { setSelectedManga, updateSource } from '@/redux/features/mangaSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import SOURCE_UTILS from '@/global/utils/sources';
import { Skeleton } from 'moti/skeleton';

interface RecommendedMangaProps {
  __v: number;
  _id: string;
  createdAt: Date;
  image: string;
  manga_id: string;
  referer: string;
  title: string;
  todayViews: {
    _id: string;
    count: number;
    date: Date;
  };
  views: number;
}

export default function RecommendedContainer() {
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
    navigation.navigate('MangaDetails');
  }

  return (
    <Skeleton
      show={loading}
      width={responsive(150)}
      radius={0}
      height={responsive(220)}
    >
      <RecommendedList
        data={recommendedManga}
        renderItem={({ item }: any) => (
          <MangaPressable onPress={() => handleSelectManga(item)}>
            <MangaImage source={{ uri: item.image }} />
          </MangaPressable>
        )}
        horizontal
      />
    </Skeleton>
  );
}

const RecommendedList = styled.FlatList``;

const MangaPressable = styled.TouchableOpacity``;

const MangaImage = styled.Image`
  width: ${responsive(150)}px;
  height: ${responsive(220)}px;
  margin-right: ${responsive(15)}px;
`;
