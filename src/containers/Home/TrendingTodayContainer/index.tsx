import responsive from '@/global/utils/responsive';
import React, { useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import { useTheme } from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import trycatcher from '@/global/utils/trycatcher';
import { eonApi } from '@/services/apis';
import { ActivityIndicator } from 'react-native';

interface TrendingTodayMangaProps {
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

export default function TrendingTodayContainer() {
  const theme = useTheme();
  const [trendingTodayManga, setTrendingTodayManga] =
    React.useState<TrendingTodayMangaProps>();
  const [loading, setLoading] = React.useState(false);

  async function getTrendingTodayManga() {
    setLoading(true);
    const { response, error } = await trycatcher(
      eonApi.get('/manga/trending-today'),
    );

    if (error) {
      console.log(error.response.status);
      setLoading(false);
      return;
    }

    setTrendingTodayManga(response?.data);
    setLoading(false);
  }

  useEffect(() => {
    getTrendingTodayManga();
  }, []);

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color={theme.colors.accent} />
      </LoadingContainer>
    );
  }

  if (!loading && !trendingTodayManga) {
    return null;
  }

  return (
    <TrendingTodayContainerView>
      {trendingTodayManga?.image && (
        <TrendingTodayImage
          source={{
            uri: trendingTodayManga?.image,
          }}
        />
      )}

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
          {trendingTodayManga?.title}
        </TrendingTodayMangaName>
      </TrendingTodayInfoBackground>
    </TrendingTodayContainerView>
  );
}

const TrendingTodayContainerView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: ${responsive(250)}px;
`;

const TrendingTodayImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const TrendingTodayInfoBackground = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  padding: ${responsive(10)}px;
  position: absolute;
`;

const TrendingTodayTag = styled.View`
  height: ${responsive(30)}px;
  max-width: ${responsive(144)}px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.black};
  top: ${responsive(5)}px;
  flex-direction: row;
  border-radius: ${responsive(10)}px;
`;

const TrendingTodayTagText = styled.Text`
  font-size: ${responsive(12)}px;
  font-family: ${({ theme }) => theme.fonts.black};
  color: ${({ theme }) => theme.colors.white};
  margin-left: ${responsive(5)}px;
`;

const TrendingTodayMangaName = styled.Text`
  font-size: ${responsive(30)}px;
  font-family: ${({ theme }) => theme.fonts.lightItalic};
  color: ${({ theme }) => theme.colors.white};
  margin-left: ${responsive(5)}px;
  bottom: ${responsive(10)}px;
  right: ${responsive(10)}px;
  position: absolute;
`;

const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  height: ${responsive(250)}px;
`;
