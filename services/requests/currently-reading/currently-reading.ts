import trycatcher from "@/global/utils/trycatcher";
import { HttpStatusCode } from "axios";
import api from "@/services/api";
import { ICurrentlyReading } from "@/stores/manga/mangaStore.type";

export async function getCurrentlyReading(userId: string) {
  const { response, error } = await trycatcher(
    api.get(`/user-manga/currently-reading/${userId}`)
  );

  if (error || response?.status !== HttpStatusCode.Ok) {
    console.log(error);
    return [];
  }

  return response?.data as ICurrentlyReading[];
}

export async function addOrUpdateCurrentlyReading(
  userId: string,
  mangaId: string,
  currentChapter?: string,
  finishedChapter?: string
) {
  const { response, error } = await trycatcher(
    api.patch(`/user-manga/currently-reading/${userId}/${mangaId}`, {
      current_chapter: currentChapter,
      finished_chapter: finishedChapter,
    })
  );

  if (
    error ||
    (response?.status !== HttpStatusCode.Ok &&
      response?.status !== HttpStatusCode.Created)
  ) {
    console.log(error);
    return;
  }

  return response?.data as ICurrentlyReading;
}

export async function removeMangaFromCurrentlyReading(
  userId: string,
  mangaId: string
) {
  const { response, error } = await trycatcher(
    api.delete(`/user-manga/currently-reading/${userId}/${mangaId}`)
  );

  if (error || response?.status !== 200) {
    console.log(error);
    return;
  }

  return response?.data as ICurrentlyReading[];
}

export default { getCurrentlyReading, removeMangaFromCurrentlyReading };
