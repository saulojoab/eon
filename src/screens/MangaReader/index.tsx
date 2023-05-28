/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { Dimensions, Image } from 'react-native';
import api from '@/services/api';
import styled from 'styled-components/native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from 'styled-components/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import responsive from '@/global/utils/responsive';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useAppSelector } from '@/hooks/redux';

interface Chapter {
  page: number;
  img: string;
}

interface ImageViewerImages {
  url: string;
  width: number;
  height: number;
}

function LoadingRender() {
  return <LoadingSpinner size="large" color={'#fff'} />;
}

export default function MangaReader({ route }: { route: any }) {
  const { id, chapter: chapterNumber, mangaName } = route.params;
  const [mangaChapters, setMangaChapters] =
    React.useState<ImageViewerImages[]>();
  const [showOverlay, setShowOverlay] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(0);

  const { selectedSource, selectedManga } = useAppSelector(
    state => state.manga,
  );

  const theme = useTheme();

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  async function getMangaData() {
    setLoading(true);
    try {
      const response = await api.get(
        `/manga/${selectedSource}/read?chapterId=${id}`,
      );

      const pages: ImageViewerImages[] = [];

      response.data.map((chapter: Chapter) => {
        const encoded = encodeURIComponent(chapter.img);
        const encodedReferer = encodeURIComponent(
          JSON.stringify({ Referer: selectedManga.referer }),
        );

        console.log(chapter.img);

        pages.push({
          url: `${api.defaults.baseURL}/utils/image-proxy?url=${encoded}&headers=${encodedReferer}`,
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        });
      });

      console.log(pages);

      setMangaChapters(pages);
      setLoading(false);
    } catch (error: any) {
      console.log(error.response.status);
    }
  }

  function toggleOverlay() {
    setShowOverlay(!showOverlay);
  }

  useEffect(() => {
    getMangaData();
  }, []);

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
            <Image
              onError={() => console.log('error ocurred')}
              {...props}
              resizeMode="contain"
            />
          )}
          loadingRender={LoadingRender}
          imageUrls={mangaChapters}
          onChange={index => setCurrentPage(index || 0)}
          onClick={toggleOverlay}
          renderIndicator={() => <></>}
          enablePreload
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
                onPress={() => navigation.goBack()}
              />
              <YouAreReadingSection>
                <YouAreReadingText style={{ fontWeight: 'bold' }}>
                  {mangaName}
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

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const LoadingSpinner = styled.ActivityIndicator`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const OverlayTouchable = styled.TouchableWithoutFeedback``;

const Overlay = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${Dimensions.get('window').height}px;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
`;

const TitleAndBackButtonSection = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${responsive(20)}px;
  padding-top: ${responsive(60)}px;
`;

const YouAreReadingSection = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: flex-end;
  margin-left: ${responsive(10)}px;
`;

const YouAreReadingText = styled.Text`
  font-size: ${responsive(20)}px;
  color: ${props => props.theme.colors.white};
  margin-left: ${responsive(10)}px;
`;
const CurrentPageText = styled.Text`
  font-size: ${responsive(14)}px;
  color: ${props => props.theme.colors.white};
  padding-left: ${responsive(20)}px;
  padding-right: ${responsive(20)}px;
`;
