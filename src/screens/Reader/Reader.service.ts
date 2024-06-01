import { useAppSelector } from '@/hooks/redux';
import api from '@/services/eon-api';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useRef, useEffect } from 'react';
import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ImageViewerImages, Chapter } from './Reader.type';
import Lottie from 'lottie-react-native';
import MANGA_REQUESTS from '@/services/requests/manga';

export const useReaderService = (route: any) => {
  const { id, chapter: chapterNumber } = route.params;

  const [mangaChapters, setMangaChapters] = React.useState<ImageViewerImages[]>(
    [],
  );
  const [showOverlay, setShowOverlay] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [finished, setFinished] = React.useState(false);

  const animationRef = useRef<Lottie>(null);

  const { selectedSource, selectedManga } = useAppSelector(
    state => state.manga,
  );

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  async function getMangaData() {
    setLoading(true);
    try {
      const response = await MANGA_REQUESTS.getMangaChapterPages(
        selectedSource,
        id,
      );

      const pages: ImageViewerImages[] = [];

      FastImage.preload(
        response.map((chapter: Chapter) => {
          return {
            uri: `${
              api.defaults.baseURL
            }/utils/image-proxy?url=${encodeURIComponent(
              chapter.img,
            )}&headers=${encodeURIComponent(
              JSON.stringify({ Referer: selectedManga.referer }),
            )}`,
          };
        }),
      );

      response.map((chapter: Chapter) => {
        const encoded = encodeURIComponent(chapter.img);
        const encodedReferer = encodeURIComponent(
          JSON.stringify({ Referer: selectedManga.referer }),
        );

        pages.push({
          url: `${api.defaults.baseURL}/utils/image-proxy?url=${encoded}&headers=${encodedReferer}`,
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        });
      });

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

  function handlePageChange(index: number) {
    setCurrentPage(index);

    if (index === mangaChapters?.length - 1) {
      setFinished(true);
    }
  }

  function handleGoBack() {
    navigation.goBack();
  }

  return {
    loading,
    mangaChapters,
    showOverlay,
    currentPage,
    finished,
    animationRef,
    toggleOverlay,
    handlePageChange,
    handleGoBack,
    chapterNumber,
    setFinished,
    selectedManga,
  };
};
