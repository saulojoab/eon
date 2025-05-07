import React from "react";
import { ActivityIndicator } from "react-native";
import { useContinueReadingService } from "./ContinueReading.service";
import {
  LoadingContainer,
  NotReadingAnythingText,
  MangaList,
  NotReadingAnythingAnimation,
  NotReadingAnythingContainer,
} from "./ContinueReading.styles";
import MangaPreview from "@/components/MangaPreview/MangaPreview";
import { MangaContainer } from "../Home.styles";

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
          <MangaContainer>
            <MangaPreview
              onLongPress={() => handleRemoveFromReading()}
              onPress={() => handleContinueReading(item.manga)}
              image={item.manga.image ?? ""}
            />
          </MangaContainer>
        )}
        horizontal
      />
    </>
  );
}
