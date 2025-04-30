import { getMangaInformation, searchManga } from "@/services/requests/manga";
import { useMangaStore } from "@/stores/manga/mangaStore";
import { IMangaSearchResult } from "@/stores/manga/mangaStore.type";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";

export const useSearchService = () => {
  const [mangaData, setMangaData] = React.useState<IMangaSearchResult[]>([]);
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { selectedProviders, setSelectedManga } = useMangaStore();

  const { navigate } = useRouter();

  async function getMangaData(): Promise<void> {
    setLoading(true);
    const response = await searchManga(selectedProviders, search);

    if (!response) {
      setLoading(false);
      return;
    }

    setMangaData(response);
    setLoading(false);
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search !== "") {
        getMangaData();
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    setSearch("");
    setMangaData([]);
  }, [selectedProviders]);

  const handleInputChange = (text: string): void => {
    setSearch(text);
    if (text === "") {
      setMangaData([]);
      setLoading(false);
      return;
    }
  };

  async function handleSelectManga(manga: IMangaSearchResult) {
    const mangaFromApi = await getMangaInformation(manga.provider, manga.id);

    setSelectedManga({
      ...manga,
      ...mangaFromApi,
    });

    navigate("/manga");
  }

  function goToSelectSources() {
    navigate("/sources");
  }

  const anyProvidersSelected = selectedProviders.length > 0;

  return {
    handleInputChange,
    handleSelectManga,
    loading,
    mangaData,
    search,
    goToSelectSources,
    anyProvidersSelected,
  };
};
