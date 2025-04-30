import { useMangaStore } from "@/stores/manga/mangaStore";
import { useRouter } from "expo-router";

export const useSourceService = () => {
  const { back } = useRouter();

  const { selectedProviders, toggleProvider } = useMangaStore();

  function handleSelectSource(provider: string) {
    toggleProvider({ name: provider });
  }

  function goBack() {
    back();
  }

  return {
    selectedProviders,
    handleSelectSource,
    goBack,
  };
};
