import responsive from '@/global/utils/responsive';
import React from 'react';
import { useTheme } from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Skeleton } from 'moti/skeleton';
import { useTrendingTodayService } from './TrendingToday.service';
import {
  TrendingTodayContainerView,
  TrendingTodayImage,
  TrendingTodayInfoBackground,
  TrendingTodayTag,
  TrendingTodayTagText,
  TrendingTodayMangaName,
} from './TrendingToday.styles';

export default function TrendingToday() {
  const theme = useTheme();
  const { handleSelectManga, loading, trendingTodayManga } =
    useTrendingTodayService();

  if (!loading && !trendingTodayManga) {
    return null;
  }

  return (
    <TrendingTodayContainerView onPress={handleSelectManga}>
      <Skeleton width={'100%'} height={'100%'} show={loading} radius={0}>
        {trendingTodayManga?.image && (
          <TrendingTodayImage
            source={{
              uri: trendingTodayManga?.image,
            }}
          />
        )}
      </Skeleton>

      <TrendingTodayInfoBackground
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.9)']}
      >
        <TrendingTodayTag>
          <Icon
            name="star"
            solid
            size={responsive(12)}
            color={theme.colors.accent}
          />
          <TrendingTodayTagText>TRENDING TODAY</TrendingTodayTagText>
        </TrendingTodayTag>

        <TrendingTodayMangaName>
          {trendingTodayManga?.title || (
            <Skeleton show width={responsive(200)} height={responsive(40)} />
          )}
        </TrendingTodayMangaName>
      </TrendingTodayInfoBackground>
    </TrendingTodayContainerView>
  );
}
