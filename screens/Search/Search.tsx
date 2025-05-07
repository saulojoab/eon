import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "@emotion/react";
import { FontAwesome5 as Icon } from "@expo/vector-icons";
import { useSearchService } from "./Search.service";

import {
  SearchAndOptionsContainer,
  SettingsIcon,
  PointingUpAnimation,
  SearchGuideText,
  MangaList,
  Container,
  InputContainer,
} from "./Search.styles";
import MangaPreview from "@/components/MangaPreview/MangaPreview";
import Input from "@/components/Input/Input";
import { responsive } from "@/global/utils/responsive";

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
        <InputContainer>
          <Input
            value={search}
            onChangeText={handleInputChange}
            placeholder="Ex: Oyasumi Punpun"
            icon="search"
          />
        </InputContainer>
        <SettingsIcon onPress={goToSelectSources}>
          <Icon
            name="cog"
            size={+theme.layout.icon.medium}
            color={theme.colors.gray}
          />
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
          <MangaPreview
            onPress={() => {
              handleSelectManga(item);
            }}
            image={item.image}
            provider={item.provider}
            title={item.title}
          />
        )}
        keyExtractor={(item: any) => item.title}
        numColumns={3}
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: +responsive(16, false, true),
        }}
        columnWrapperStyle={{
          margin: +responsive(16, false, true),
          gap: +responsive(16, false, true),
        }}
      />
    </Container>
  );
}
