import React from 'react';
import { FlatList, StatusBar } from 'react-native';
import { useTheme } from 'styled-components/native';
import responsive from '@/global/utils/responsive';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Skeleton } from 'moti/skeleton';
import { useMangaService } from './Manga.service';

import {
  TitleAndBackButtonSection,
  BackButton,
  Favorite,
  MangaImageTitleContainer,
  MangaTitleContainer,
  MangaTitle,
  ViewsContainer,
  ViewsIcon,
  ViewCount,
  MangaImage,
  MangaImageFadingForeground,
  DataSection,
  MangaDescription,
  SectionTitle,
  ChapterItem,
  ChapterTitle,
  Container,
} from './Manga.styles';

export default function Manga() {
  const theme = useTheme();
  const {
    mangaData,
    loading,
    views,
    isFavorite,
    showFullDescription,
    toggleFavorite,
    toggleShowFullDescription,
    isCurrentlyReading,
    isRead,
    handleSelectChapter,
    goBack,
    image,
  } = useMangaService();

  return (
    <Container>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={theme.colors.primary}
      />

      <TitleAndBackButtonSection>
        <BackButton onPress={goBack}>
          <Icon size={30} color={theme.colors.white} name="arrow-left" />
        </BackButton>
        <Favorite isFavorite={isFavorite} onPress={toggleFavorite} />
      </TitleAndBackButtonSection>

      <MangaImageTitleContainer>
        <MangaTitleContainer>
          <Skeleton
            show={loading}
            width={'50%'}
            height={responsive(40)}
            radius={0}
            colorMode="dark"
          >
            <MangaTitle>{mangaData?.title}</MangaTitle>
          </Skeleton>
        </MangaTitleContainer>

        <ViewsContainer>
          <ViewsIcon
            size={responsive(15)}
            color={theme.colors.white}
            name="eye"
          />
          <ViewCount>{views}</ViewCount>
        </ViewsContainer>

        <MangaImage resizeMode="cover" source={{ uri: image }} />
        <MangaImageFadingForeground
          colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.8)']}
        />
      </MangaImageTitleContainer>

      <DataSection>
        <Skeleton
          show={loading}
          width={'100%'}
          height={responsive(80)}
          colorMode="dark"
        >
          <MangaDescription
            onPress={toggleShowFullDescription}
            numberOfLines={showFullDescription ? undefined : 4}
          >
            {mangaData?.description}
          </MangaDescription>
        </Skeleton>

        <SectionTitle>Chapters</SectionTitle>
      </DataSection>

      <Skeleton show={loading} width={'100%'} height={'100%'} colorMode="dark">
        <FlatList
          data={mangaData?.chapters}
          renderItem={({ item }) => (
            <ChapterItem
              currentlyReading={isCurrentlyReading(item)}
              isRead={isRead(item)}
              //isRead={false}
              onPress={() => {
                handleSelectChapter(item);
              }}
            >
              <ChapterTitle>{item.title.slice(6)}</ChapterTitle>
            </ChapterItem>
          )}
          keyExtractor={item => item.id}
          numColumns={3}
        />
      </Skeleton>
    </Container>
  );
}
