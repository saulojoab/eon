import trycatcher from '@/global/utils/trycatcher';
import { eonApi } from '../apis';
import { HttpStatusCode } from 'axios';

export interface CurrentlyReadingProps {
  manga_id: string;
  user_id: string;
  current_chapter: string;
  finished_chapters: string[];
  createdAt: string;
}

async function getCurrentlyReading(userId: string) {
  const { response, error } = await trycatcher(
    eonApi.get(`/manga/currently-reading/${userId}`),
  );

  if (error || response?.status !== HttpStatusCode.Ok) {
    console.log(error);
    return [];
  }

  return response?.data as CurrentlyReadingProps[];
}

async function removeMangaFromCurrentlyReading(
  userId: string,
  mangaId: string,
) {
  const { response, error } = await trycatcher(
    eonApi.delete(`/currently-reading/${userId}/${mangaId}`),
  );

  if (error || response?.status !== 200) {
    console.log(error);
    return;
  }

  return response?.data as CurrentlyReadingProps[];
}

export default { getCurrentlyReading, removeMangaFromCurrentlyReading };
