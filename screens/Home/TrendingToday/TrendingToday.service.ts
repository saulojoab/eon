import React, { useEffect } from "react";
import { useMangaStore } from "@/stores/manga/mangaStore";
import { useRouter } from "expo-router";
import { getTrendingTodayManga } from "@/services/requests/analytics/analytics";
import { IUserManga } from "@/stores/manga/mangaStore.type";
import { getMangaInformation } from "@/services/requests/manga";

export const useTrendingTodayService = () => {
  const [trendingTodayManga, setTrendingTodayManga] =
    React.useState<IUserManga>();
  const [loading, setLoading] = React.useState(false);

  const { setSelectedManga } = useMangaStore();
  const { navigate } = useRouter();

  async function getTrendingToday() {
    setLoading(true);
    const manga = await getTrendingTodayManga();

    if (!manga) {
      setLoading(false);
      return;
    }

    setTrendingTodayManga(manga);
    setLoading(false);
  }

  async function handleSelectManga() {
    if (!trendingTodayManga) {
      return;
    }

    const manga = await getMangaInformation(
      trendingTodayManga.referer,
      trendingTodayManga.manga_id
    );

    if (!manga) {
      return;
    }

    setSelectedManga(manga);

    navigate("/manga");
  }

  useEffect(() => {
    getTrendingToday();
  }, []);

  return {
    loading,
    trendingTodayManga,
    handleSelectManga,
  };
};
