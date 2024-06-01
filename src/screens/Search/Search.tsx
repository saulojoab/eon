/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';
import responsive from '@/global/utils/responsive';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSearchService } from './Search.service';

import {
  SearchAndOptionsContainer,
  MangaSearchInput,
  SettingsIcon,
  PointingUpAnimation,
  SearchGuideText,
  MangaList,
  MangaItem,
  MangaImage,
  MangaTitle,
  Container,
} from './Search.styles';

export default function Search(): JSX.Element {
  const theme = useTheme();
  const {
    handleInputChange,
    handleSelectManga,
    loading,
    mangaData,
    search,
    goToSelectSources,
  } = useSearchService();

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
        <SettingsIcon onPress={goToSelectSources}>
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
