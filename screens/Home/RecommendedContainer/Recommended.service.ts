import { useState, useEffect } from "react";
import { useMangaStore } from "@/stores/manga/mangaStore";
import { useRouter } from "expo-router";
import { getRecommendedManga } from "@/services/requests/analytics/analytics";
import { IUserManga } from "@/stores/manga/mangaStore.type";
import { getMangaInformation } from "@/services/requests/manga";
import { getImageProxy } from "@/global/utils/getImageProxy";

export const useRecommendedService = () => {
  const [recommendedManga, setRecommendedManga] = useState<IUserManga[]>();
  const [loading, setLoading] = useState(false);

  const { setSelectedManga } = useMangaStore();
  const { navigate } = useRouter();

  async function getRecommended() {
    setLoading(true);
    const manga = await getRecommendedManga();

    if (!manga) {
      setLoading(false);
      return;
    }

    manga.map((m) => {
      return {
        ...m,
        image: getImageProxy(m.image, m.referer),
      };
    });

    setRecommendedManga(manga);
    setLoading(false);
  }

  useEffect(() => {
    getRecommended();
  }, []);

  async function handleSelectManga(selectedManga: IUserManga) {
    const manga = await getMangaInformation(
      selectedManga.referer,
      selectedManga.manga_id
    );

    if (!manga) {
      return;
    }

    setSelectedManga(manga);

    navigate("/manga");
  }

  const shouldDisplay = !loading && (recommendedManga?.length ?? 0) > 0;

  return {
    loading,
    shouldDisplay,
    recommendedManga,
    handleSelectManga,
  };
};
