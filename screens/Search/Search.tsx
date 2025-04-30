import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components/native";
import responsive from "@/global/utils/responsive";
import { FontAwesome5 as Icon } from "@expo/vector-icons";
import { useSearchService } from "./Search.service";

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
  MangaProviderText,
} from "./Search.styles";

export default function Search(): JSX.Element {
  const theme = useTheme();
  const {
    handleInputChange,
    handleSelectManga,
    loading,
    mangaData,
    search,
    goToSelectSources,
    anyProvidersSelected,
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
      {search === "" && (
        <>
          <PointingUpAnimation
            source={require("@/assets/lottie/pointingUp.json")}
            autoPlay
            loop
          />

          {anyProvidersSelected ? (
            <SearchGuideText>Search for any manga above!</SearchGuideText>
          ) : (
            <SearchGuideText>
              You need to select at least one provider before searching.
            </SearchGuideText>
          )}
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
            <MangaProviderText>{item.provider}</MangaProviderText>
            <MangaTitle numberOfLines={1}>{item.title}</MangaTitle>
          </MangaItem>
        )}
        keyExtractor={(item: any) => item.title}
        numColumns={2}
        contentContainerStyle={{ alignItems: "center" }}
      />
    </Container>
  );
}
