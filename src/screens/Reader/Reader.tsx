/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from 'styled-components/native';
import responsive from '@/global/utils/responsive';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import { useReaderService } from './Reader.service';
import {
  FinishedAnimation,
  OverlayTouchable,
  Overlay,
  TitleAndBackButtonSection,
  YouAreReadingSection,
  YouAreReadingText,
  CurrentPageText,
  Container,
} from './Reader.styles';
import LoadingRender from './LoadingRender/LoadingRender';

export default function Reader({ route }: { route: any }) {
  const theme = useTheme();
  const {
    mangaChapters,
    showOverlay,
    loading,
    currentPage,
    finished,
    chapterNumber,
    handlePageChange,
    toggleOverlay,
    handleGoBack,
    animationRef,
    setFinished,
    selectedManga,
  } = useReaderService(route);

  if (loading) {
    return (
      <Container>
        <LoadingRender />
      </Container>
    );
  }

  return (
    <Container>
      {mangaChapters && (
        <ImageViewer
          renderImage={props => (
            <FastImage
              onError={() => console.log('error ocurred')}
              {...props}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}
          loadingRender={LoadingRender}
          imageUrls={mangaChapters}
          onChange={index => handlePageChange(index || 0)}
          onClick={toggleOverlay}
          renderIndicator={() => <></>}
          enablePreload
        />
      )}

      {finished && (
        <FinishedAnimation
          ref={animationRef}
          source={require('@/assets/lottie/finishedChapter.json')}
          onAnimationFinish={() => setFinished(false)}
          autoPlay
          loop={false}
        />
      )}

      {showOverlay && (
        <OverlayTouchable onPress={toggleOverlay}>
          <Overlay
            key="overlay"
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(300)}
          >
            <TitleAndBackButtonSection>
              <Icon
                name="arrow-left"
                size={30}
                color={theme.colors.white}
                onPress={handleGoBack}
              />
              <YouAreReadingSection>
                <YouAreReadingText style={{ fontWeight: 'bold' }}>
                  {selectedManga.title}
                </YouAreReadingText>
              </YouAreReadingSection>
            </TitleAndBackButtonSection>
            <YouAreReadingText
              style={{
                paddingLeft: responsive(10),
                marginBottom: responsive(10),
              }}
            >
              {chapterNumber}
            </YouAreReadingText>
            <CurrentPageText>
              You are currently on page {Number(currentPage) + 1}. There are a
              total of {mangaChapters?.length} pages on this chapter.
            </CurrentPageText>
          </Overlay>
        </OverlayTouchable>
      )}
    </Container>
  );
}
