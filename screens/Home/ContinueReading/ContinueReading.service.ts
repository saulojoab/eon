import { useState, useEffect } from "react";
import { useAuthStore } from "@/stores/auth/authStore";
import { useMangaStore } from "@/stores/manga/mangaStore";
import { useRouter } from "expo-router";
import { getCurrentlyReading } from "@/services/requests/currently-reading/currently-reading";
import { ICurrentlyReading, IUserManga } from "@/stores/manga/mangaStore.type";
import { emptyReadingMessages } from "@/global/utils/randomPhrases";
import { getMangaInformation } from "@/services/requests/manga";

export const useContinueReadingService = () => {
  const { user } = useAuthStore();
  const { setSelectedManga, currentlyReadingManga, setCurrentlyReading } =
    useMangaStore();
  const { navigate } = useRouter();

  const [loading, setLoading] = useState(false);

  async function getCurrentlyReadingMangas() {
    setLoading(true);

    const response = await getCurrentlyReading(user?.id ?? "");

    setCurrentlyReading(response);
    setLoading(false);
  }

  useEffect(() => {
    getCurrentlyReadingMangas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleContinueReading(userManga: IUserManga) {
    const manga = await getMangaInformation(
      userManga.referer,
      userManga.manga_id
    );

    if (!manga) {
      return;
    }

    setSelectedManga(manga);

    navigate("/manga");
  }

  function handleRemoveFromReading() {
    console.log("remove");
  }

  function getEmptyReadingMessage() {
    return emptyReadingMessages[
      Math.floor(Math.random() * emptyReadingMessages.length)
    ];
  }

  return {
    loading,
    currentlyReading: currentlyReadingManga,
    handleRemoveFromReading,
    handleContinueReading,
    getEmptyReadingMessage,
  };
};
