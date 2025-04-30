import React from "react";
import { ActivityIndicator } from "react-native";
import { useContinueReadingService } from "./ContinueReading.service";
import {
  LoadingContainer,
  NotReadingAnythingText,
  MangaList,
  MangaPressable,
  MangaImage,
  NotReadingAnythingAnimation,
  NotReadingAnythingContainer,
} from "./ContinueReading.styles";

export default function ContinueReading() {
  const {
    currentlyReading,
    getEmptyReadingMessage,
    handleContinueReading,
    handleRemoveFromReading,
    loading,
  } = useContinueReadingService();

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#fff" />
      </LoadingContainer>
    );
  }

  if (currentlyReading.length === 0) {
    return (
      <NotReadingAnythingContainer>
        <NotReadingAnythingAnimation
          autoPlay
          loop
          source={require("@/assets/lottie/noReadingList.json")}
        />
        <NotReadingAnythingText>
          There's nothing on your reading list... {getEmptyReadingMessage()}
        </NotReadingAnythingText>
      </NotReadingAnythingContainer>
    );
  }

  return (
    <>
      <MangaList
        data={currentlyReading}
        renderItem={({ item }: any) => (
          <MangaPressable
            onLongPress={() => handleRemoveFromReading()}
            onPress={() => handleContinueReading(item.manga)}
          >
            <MangaImage source={{ uri: item.manga.image ?? "" }} />
          </MangaPressable>
        )}
        horizontal
      />
    </>
  );
}
