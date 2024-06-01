import React from 'react';
import responsive from '@/global/utils/responsive';
import { Skeleton } from 'moti/skeleton';
import { useRecommendedService } from './Recommended.service';
import {
  RecommendedList,
  MangaPressable,
  MangaImage,
} from './Recommended.styles';

export default function Recommended() {
  const { handleSelectManga, loading, recommendedManga } =
    useRecommendedService();

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
