import React, { useEffect, useState } from "react";
import { useMangaStore } from "@/stores/manga/mangaStore";
import { useRouter } from "expo-router";
import { IMangaChapter, IUserManga } from "@/stores/manga/mangaStore.type";
import { getUserManga } from "@/services/requests/user-manga/user-manga";
import { addOrUpdateCurrentlyReading } from "@/services/requests/currently-reading/currently-reading";
import { useAuthStore } from "@/stores/auth/authStore";

export const useMangaService = () => {
  const {
    selectedManga,
    setSelectedChapter,
    currentlyReadingManga,
    addToCurrentlyReading,
  } = useMangaStore();
  const { user } = useAuthStore();

  const [showFullDescription, setShowFullDescription] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const [userMangaData, setUserMangaData] = useState<IUserManga>();

  const { navigate, back } = useRouter();

  async function getMangaData() {
    setLoading(true);

    if (!selectedManga) {
      return;
    }

    const response = await getUserManga(selectedManga);

    if (!response) return;

    setUserMangaData(response);
    selectedManga.chapters = selectedManga.chapters?.reverse();

    setLoading(false);
  }

  useEffect(() => {
    getMangaData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSelectChapter(chapter: IMangaChapter) {
    // Updating the currently reading chapter for this manga for the current user.
    const response = await addOrUpdateCurrentlyReading(
      user?.id ?? "",
      userMangaData?._id ?? "",
      chapter.id,
      undefined
    );

    if (!response) return;

    addToCurrentlyReading(response);

    setSelectedChapter(chapter);

    navigate({
      pathname: "/reader",
    });
  }

  const toggleShowFullDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const isCurrentlyReading = (chapter: IMangaChapter): boolean =>
    currentlyReadingManga.some((item) => item.current_chapter === chapter.id);

  const isRead = (chapter: IMangaChapter): boolean => {
    return currentlyReadingManga.some((manga) =>
      manga.finished_chapters?.includes(chapter.id)
    );
  };

  function goBack() {
    back();
  }

  return {
    manga: selectedManga,
    userMangaData,
    loading,
    showFullDescription,
    toggleShowFullDescription,
    handleSelectChapter,
    isCurrentlyReading,
    isRead,
    isFavorite,
    toggleFavorite,
    goBack,
  };
};
