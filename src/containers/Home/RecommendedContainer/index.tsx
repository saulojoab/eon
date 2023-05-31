import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { eonApi } from '@/services/apis';
import responsive from '@/global/utils/responsive';
import trycatcher from '@/global/utils/trycatcher';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

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

  const theme = useTheme();

  async function getRecommendedManga() {
    setLoading(true);
    const { response, error } = await trycatcher(eonApi.get('/manga/trending'));

    if (error) {
      console.log(error.response.status);
      setLoading(false);
      return;
    }

    setRecommendedManga(response?.data);
    setLoading(false);
  }

  useEffect(() => {
    getRecommendedManga();
  }, []);

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color={theme.colors.accent} />
      </LoadingContainer>
    );
  }

  return (
    <RecommendedList
      data={recommendedManga}
      renderItem={({ item }: any) => (
        <MangaImage source={{ uri: item.image }} />
      )}
      horizontal
    />
  );
}

const RecommendedList = styled.FlatList``;

const MangaImage = styled.Image`
  width: ${responsive(150)}px;
  height: ${responsive(220)}px;
  margin-right: ${responsive(15)}px;
`;

const LoadingContainer = styled.View`
  width: ${responsive(150)}px;
  height: ${responsive(220)}px;
  margin-right: ${responsive(15)}px;
`;
