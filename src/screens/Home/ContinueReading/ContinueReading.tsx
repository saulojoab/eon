import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useContinueReadingService } from './ContinueReading.service';
import {
  LoadingContainer,
  NotReadingAnythingText,
  MangaList,
  MangaPressable,
  MangaImage,
} from './ContinueReading.styles';

export default function ContinueReading() {
  const {
    currentlyReading,
    getRandomText,
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
    return <NotReadingAnythingText>{getRandomText()}</NotReadingAnythingText>;
  }

  return (
    <>
      <MangaList
        data={currentlyReading}
        renderItem={({ item: manga }: any) => (
          <MangaPressable
            onLongPress={() => handleRemoveFromReading()}
            onPress={() => handleContinueReading(manga)}
          >
            <MangaImage source={{ uri: manga.image || '' }} />
          </MangaPressable>
        )}
        horizontal
      />
    </>
  );
}
