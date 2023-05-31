/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { eonApi, mangaApi } from '@/services/apis';
import styled, { useTheme } from 'styled-components/native';
import responsive from '@/global/utils/responsive';
import { useNavigation } from '@react-navigation/core';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { isIos } from '@/global/utils/platformChecker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setSelectedManga } from '@/redux/features/mangaSlice';
import Lottie from 'lottie-react-native';
import { HttpStatusCode } from 'axios';
import trycatcher from '@/global/utils/trycatcher';

interface MangaResult {
  id: string;
  title: string;
  altTitles: string[];
  headerForImage: { Referer: string };
  image: string;
}

export default function Search(): JSX.Element {
  const [mangaData, setMangaData] = React.useState<MangaResult[]>([]);
  const [search, setSearch] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const selectedSource = useAppSelector(state => state.manga.selectedSource);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const theme = useTheme();
  const dispatch = useAppDispatch();

  async function getMangaData(): Promise<void> {
    setLoading(true);

    const response = await mangaApi.get(`/manga/${selectedSource}/${search}`);

    setLoading(false);

    setMangaData(response.data.results);
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search !== '') {
        getMangaData();
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const handleInputChange = (text: string): void => {
    setSearch(text);
    if (text === '') {
      setMangaData([]);
      setLoading(false);
      return;
    }
  };

  async function getMangaDataFromEonApi(manga: MangaResult) {
    const { response, error } = await trycatcher(
      eonApi.get(`/manga/${manga.id}`),
    );

    if (error && error.response.status === HttpStatusCode.NotFound) {
      const { response: createdManga } = await trycatcher(
        eonApi.post('/manga', {
          manga_id: manga.id,
          image: manga.image,
          referer: manga.headerForImage.Referer,
          title: manga.title,
        }),
      );

      if (createdManga?.status !== HttpStatusCode.Created) {
        return;
      }

      return {
        id: createdManga.data._id,
        manga_id: createdManga.data.manga_id,
        image: createdManga.data.image,
        referer: createdManga.data.referer,
        title: createdManga.data.title,
        views: createdManga.data.views,
        todayViews: createdManga.data.todayViews,
      };
    }

    if (error || response?.status !== HttpStatusCode.Ok) {
      return;
    }

    return {
      id: response.data._id,
      manga_id: response.data.manga_id,
      image: response.data.image,
      referer: response.data.referer,
      title: response.data.title,
      views: response.data.views,
      todayViews: response.data.todayViews,
    };
  }

  async function handleSelectManga(manga: MangaResult) {
    const mangaFromApi = await getMangaDataFromEonApi(manga);

    dispatch(
      setSelectedManga({
        id: mangaFromApi?.manga_id || manga.id,
        image: mangaFromApi?.image || manga.image,
        referer: mangaFromApi?.referer || manga.headerForImage.Referer,
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
    <Container>
      <SearchAndOptionsContainer>
        <MangaSearchInput
          onChangeText={handleInputChange}
          placeholder="Ex: Oyasumi Punpun"
          autoCapitalize="none"
          placeholderTextColor={theme.colors.gray}
          autoComplete="off"
        />
        <SettingsIcon onPress={() => navigation.navigate('SelectSources')}>
          <Icon name="cog" size={responsive(20)} color={theme.colors.gray} />
        </SettingsIcon>
      </SearchAndOptionsContainer>
      {search === '' && (
        <>
          <PointingUpAnimation
            source={require('@/assets/lottie/pointingUp.json')}
            autoPlay
            loop
          />
          <SearchGuideText>Search for any manga above!</SearchGuideText>
        </>
      )}
      {loading && <ActivityIndicator />}
      <MangaList
        data={mangaData}
        renderItem={({ item }: any) => (
          <MangaItem
            onPress={() => {
              handleSelectManga(item);
            }}
          >
            <MangaImage resizeMode="cover" source={{ uri: item.image }} />
            <MangaTitle numberOfLines={1}>{item.title}</MangaTitle>
          </MangaItem>
        )}
        keyExtractor={(item: any) => item.title}
        numColumns={2}
        contentContainerStyle={{ alignItems: 'center' }}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: ${responsive(10)}px;
  padding-top: ${isIos ? responsive(60) : responsive(20)}px;
  background-color: ${props => props.theme.colors.background};
`;

const MangaItem = styled.TouchableOpacity`
  flex-direction: column;
  width: ${responsive(180)}px;
  height: ${responsive(220)}px;
  margin: ${responsive(20)}px;
  margin-bottom: ${responsive(30)}px;
  background-color: ${props => props.theme.colors.white};
  shadow-color: ${props => props.theme.colors.black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 2px;
  elevation: 2;
  border-radius: 5px;
`;

const MangaList = styled.FlatList`
  flex: 1;
  width: 100%;
`;

const MangaImage = styled.Image`
  width: 100%;
  height: 100%;
  align-self: center;
`;

const MangaTitle = styled.Text`
  font-size: ${responsive(14)}px;
  font-family: ${props => props.theme.fonts.italic};
  color: ${props => props.theme.colors.white};
  margin-top: ${responsive(5)}px;
`;

const SearchGuideText = styled.Text`
  font-size: ${responsive(14)}px;
  font-family: ${props => props.theme.fonts.boldItalic};
  color: ${props => props.theme.colors.gray};
  margin-bottom: ${responsive(20)}px;
  align-self: center;
`;

const MangaSearchInput = styled.TextInput`
  width: 90%;
  height: ${responsive(50)}px;
  font-family: ${props => props.theme.fonts.default};
  border-radius: 5px;
  border: 1px solid ${props => props.theme.colors.gray};
  padding: ${responsive(10)}px;
  color: ${props => props.theme.colors.white};
`;

const SearchAndOptionsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${responsive(20)}px;
`;

const SettingsIcon = styled.TouchableOpacity``;

const PointingUpAnimation = styled(Lottie)`
  width: ${responsive(80)}px;
  align-self: center;
`;
