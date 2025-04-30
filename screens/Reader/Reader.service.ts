import React, { useRef, useEffect } from "react";
import { Dimensions } from "react-native";
import { ImageViewerImages } from "./Reader.type";
import Lottie from "lottie-react-native";
import { getMangaChapterPages } from "@/services/requests/manga";
import { useRouter } from "expo-router";
import { useMangaStore } from "@/stores/manga/mangaStore";
import { IMangaChapterPage } from "@/stores/manga/mangaStore.type";
import { addOrUpdateCurrentlyReading } from "@/services/requests/currently-reading/currently-reading";
import { useAuthStore } from "@/stores/auth/authStore";
import { getUserManga } from "@/services/requests/user-manga/user-manga";
import { getImageProxy } from "@/global/utils/getImageProxy";

export const useReaderService = () => {
  const { selectedChapter, selectedManga, addToCurrentlyReading } =
    useMangaStore();
  const { user } = useAuthStore();

  const [mangaChapters, setMangaChapters] = React.useState<ImageViewerImages[]>(
    []
  );
  const [showOverlay, setShowOverlay] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [finished, setFinished] = React.useState(false);

  const animationRef = useRef<Lottie>(null);

  const { back } = useRouter();

  async function getMangaPages() {
    setLoading(true);
    try {
      const response = await getMangaChapterPages(
        selectedChapter?.id ?? "",
        selectedManga?.id ?? "",
        selectedManga?.provider ?? ""
      );

      const pages: ImageViewerImages[] = [];

      if (!response) {
        setLoading(false);
        return;
      }

      response.map((chapter: IMangaChapterPage) => {
        const url = getImageProxy(chapter.img, selectedManga?.provider ?? "");

        pages.push({
          url: url,
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
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
    getMangaPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handlePageChange(index: number) {
    setCurrentPage(index);

    if (index === mangaChapters?.length - 1) {
      setFinished(true);

      if (!selectedManga) {
        return;
      }

      const userManga = await getUserManga(selectedManga);

      // Marking this chapter as finished for this manga for the current user.
      const response = await addOrUpdateCurrentlyReading(
        user?.id ?? "",
        userManga?._id ?? "",
        undefined,
        selectedChapter?.id ?? ""
      );

      if (!response) return;

      addToCurrentlyReading(response);
    }
  }

  function handleGoBack() {
    back();
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
    setFinished,
    selectedManga,
    selectedChapter,
  };
};
