import React from "react";
import { FontAwesome5 as Icon } from "@expo/vector-icons";
import { useTheme } from "@emotion/react";
import { FadeIn, FadeOut } from "react-native-reanimated";
import PagerView from "react-native-pager-view";
import { useReaderService } from "./Reader.service";
import {
  FinishedAnimation,
  OverlayTouchable,
  Overlay,
  TitleAndBackButtonSection,
  YouAreReadingSection,
  YouAreReadingText,
  CurrentPageText,
  Container,
} from "./Reader.styles";
import LoadingRender from "./LoadingRender/LoadingRender";
import { Image } from "expo-image";
import { Zoomable } from "@likashefqet/react-native-image-zoom";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TouchableWithoutFeedback } from "react-native";

export default function Reader() {
  const theme = useTheme();
  const {
    mangaChapters,
    showOverlay,
    loading,
    currentPage,
    finished,
    handlePageChange,
    toggleOverlay,
    handleGoBack,
    animationRef,
    setFinished,
    selectedManga,
    selectedChapter,
  } = useReaderService();

  if (loading) {
    return (
      <Container>
        <LoadingRender />
      </Container>
    );
  }

  return (
    <Container>
      <GestureHandlerRootView>
        {mangaChapters && (
          <PagerView
            style={{ flex: 1 }}
            orientation="horizontal"
            initialPage={0}
            onPageSelected={(e) => handlePageChange(e.nativeEvent.position)}
          >
            {mangaChapters.map((item, index) => (
              <Zoomable
                isDoubleTapEnabled
                onSingleTap={toggleOverlay}
                key={index}
              >
                <TouchableWithoutFeedback onPress={toggleOverlay}>
                  <Image
                    source={{ uri: item.url }}
                    style={{ flex: 1 }}
                    contentFit="contain"
                  />
                </TouchableWithoutFeedback>
              </Zoomable>
            ))}
          </PagerView>
        )}

        {finished && (
          <FinishedAnimation
            ref={animationRef}
            source={require("@/assets/lottie/finishedChapter.json")}
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
                  size={+theme.layout.icon.large}
                  color={theme.colors.white}
                  onPress={handleGoBack}
                />
                <YouAreReadingSection>
                  <YouAreReadingText style={{ fontWeight: "bold" }}>
                    {selectedManga?.title}
                  </YouAreReadingText>
                </YouAreReadingSection>
              </TitleAndBackButtonSection>
              <YouAreReadingText>{selectedChapter?.title}</YouAreReadingText>
              <CurrentPageText>
                You are currently on page {Number(currentPage) + 1}. There are a
                total of {mangaChapters?.length} pages on this chapter.
              </CurrentPageText>
            </Overlay>
          </OverlayTouchable>
        )}
      </GestureHandlerRootView>
    </Container>
  );
}
