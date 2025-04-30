import trycatcher from "@/global/utils/trycatcher";
import api from "../api";
import {
  IManga,
  IMangaChapterPage,
  IMangaSearchResult,
} from "@/stores/manga/mangaStore.type";
import { IProvider } from "@/stores/manga/mangaStore";

export async function searchManga(
  selectedProviders: IProvider[],
  search: string
) {
  const { response, error } = await trycatcher(
    api.post(`/mangas/search`, {
      query: search,
      providers: selectedProviders.map((p) => p.name).join(","),
    })
  );

  if (error) {
    console.log("searchManga", error.response.status);
    return;
  }

  return response?.data as IMangaSearchResult[];
}

export async function getMangaInformation(
  selectedSource: string,
  mangaId: string
) {
  const { response, error } = await trycatcher(
    api.post(`/mangas/info`, {
      id: mangaId,
      provider: selectedSource,
    })
  );

  if (error) {
    console.log("getMangaInfo", error.response.status);
    return;
  }

  return response?.data as IManga;
}

export async function getMangaChapterPages(
  chapterId: string,
  mangaId: string,
  provider: string
) {
  const { response, error } = await trycatcher(
    api.post(`/mangas/chapter`, {
      chapterId,
      mangaId,
      provider,
    })
  );

  if (error) {
    console.log("getMangaChapterPages", error.response.status);
    return;
  }

  return response?.data as IMangaChapterPage[];
}
