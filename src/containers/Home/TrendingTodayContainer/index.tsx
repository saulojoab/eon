import responsive from '@/global/utils/responsive';
import React, { useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import { useTheme } from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import trycatcher from '@/global/utils/trycatcher';
import MANGA_REQUESTS from '@/services/requests/manga';
import { useAppDispatch } from '@/hooks/redux';
import SOURCE_UTILS from '@/global/utils/sources';
import { setSelectedManga, updateSource } from '@/redux/features/mangaSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { MangaFromDatabase } from '@/global/utils/mangaSerializer';
import { Skeleton } from 'moti/skeleton';

export default function TrendingTodayContainer() {
  const theme = useTheme();
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
    navigation.navigate('MangaDetails');
  }

  useEffect(() => {
    getTrendingTodayManga();
  }, []);

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

const TrendingTodayContainerView = styled.TouchableOpacity`
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
