import trycatcher from "@/global/utils/trycatcher";
import api from "@/services/api";
import { IManga, IUserManga } from "@/stores/manga/mangaStore.type";
import { HttpStatusCode } from "axios";

export async function createUserManga(manga: IManga) {
  const { response, error } = await trycatcher(
    api.post("/user-manga", {
      manga_id: manga.id,
      image: manga.image,
      referer: manga.provider,
      title: manga.title,
    })
  );

  if (error) {
    console.log(error.response.status);
    return;
  }

  return response?.data;
}

export async function getUserManga(manga: IManga) {
  const { response, error } = await trycatcher(
    api.get(`/user-manga/${manga.id}`)
  );

  const errorOrNotFound =
    error && error.response.status === HttpStatusCode.NotFound;

  if (errorOrNotFound) {
    const createdUserManga = await createUserManga(manga);

    if (createdUserManga?.status !== HttpStatusCode.Created) {
      return;
    }

    return createdUserManga as IUserManga;
  }

  if (error || response?.status !== HttpStatusCode.Ok) {
    return;
  }

  return response.data as IUserManga;
}
