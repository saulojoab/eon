import React from "react";
import { FlatList, StatusBar } from "react-native";
import { useTheme } from "@emotion/react";
import { FontAwesome5 as Icon } from "@expo/vector-icons";

import { Skeleton } from "moti/skeleton";
import { useMangaService } from "./Manga.service";

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
} from "./Manga.styles";

export default function Manga() {
  const theme = useTheme();
  const {
    manga,
    userMangaData,
    loading,
    isFavorite,
    showFullDescription,
    toggleFavorite,
    toggleShowFullDescription,
    isCurrentlyReading,
    isRead,
    handleSelectChapter,
    goBack,
  } = useMangaService();

  return (
    <Container>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={theme.colors.primary}
      />

      <TitleAndBackButtonSection>
        <BackButton onPress={goBack}>
          <Icon
            size={+theme.layout.icon.large}
            color={theme.colors.white}
            name="arrow-left"
          />
        </BackButton>
        <Favorite isFavorite={isFavorite} onPress={toggleFavorite} />
      </TitleAndBackButtonSection>

      <MangaImageTitleContainer>
        <MangaTitleContainer>
          <Skeleton
            show={loading}
            width={"50%"}
            height={40}
            radius={0}
            colorMode="dark"
          >
            <MangaTitle>{manga?.title}</MangaTitle>
          </Skeleton>
        </MangaTitleContainer>

        <ViewsContainer>
          <ViewsIcon
            size={+theme.layout.icon.small}
            color={theme.colors.white}
            name="eye"
          />
          <ViewCount>{userMangaData?.views}</ViewCount>
        </ViewsContainer>

        <MangaImage resizeMode="cover" source={{ uri: manga?.image }} />
        <MangaImageFadingForeground
          colors={["rgba(0,0,0,0.8)", "rgba(0,0,0,0.2)", "rgba(0,0,0,0.8)"]}
        />
      </MangaImageTitleContainer>

      <DataSection>
        <Skeleton show={loading} width={"100%"} height={80} colorMode="dark">
          <MangaDescription
            onPress={toggleShowFullDescription}
            numberOfLines={showFullDescription ? undefined : 4}
          >
            {manga?.description}
          </MangaDescription>
        </Skeleton>

        <SectionTitle>Chapters</SectionTitle>
      </DataSection>

      <Skeleton show={loading} width={"100%"} height={"100%"} colorMode="dark">
        <FlatList
          data={manga?.chapters}
          renderItem={({ item }) => (
            <ChapterItem
              currentlyReading={isCurrentlyReading(item)}
              isRead={isRead(item)}
              onPress={() => {
                handleSelectChapter(item);
              }}
            >
              <ChapterTitle>{item.title}</ChapterTitle>
            </ChapterItem>
          )}
          keyExtractor={(item) => item.id}
          numColumns={3}
        />
      </Skeleton>
    </Container>
  );
}
