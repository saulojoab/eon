import trycatcher from '@/global/utils/trycatcher';
import { eonApi, mangaApi } from '../apis';
import { HttpStatusCode } from 'axios';
import {
  MangaFromCrawlers,
  MangaFromDatabase,
  serializeMangaFromCrawlers,
} from '@/global/utils/mangaSerializer';

async function getRecommendedManga() {
  const { response, error } = await trycatcher(eonApi.get('/manga/trending'));

  if (error) {
    console.log(error.response.status);
    throw error;
  }

  return response?.data;
}

async function getTrendingTodayManga() {
  const { response, error } = await trycatcher(
    eonApi.get('/manga/trending-today'),
  );

  if (error) {
    console.log(error.response.status);
    throw error;
  }

  return response?.data;
}

async function getMangaInformationFromDatabase(manga: MangaFromDatabase) {
  const { response, error } = await trycatcher(
    eonApi.get(`/manga/${manga.manga_id}`),
  );

  if (error && error.response.status === HttpStatusCode.NotFound) {
    const { response: createdManga } = await trycatcher(
      eonApi.post('/manga', {
        manga_id: manga.manga_id,
        image: manga.image,
        referer: manga.referer,
        title: manga.title,
      }),
    );

    if (createdManga?.status !== HttpStatusCode.Created) {
      return;
    }

    return {
      id: createdManga.data._id,
      manga_id: createdManga.data.manga_id,
      image: createdManga.data.image,
      referer: createdManga.data.referer,
      title: createdManga.data.title,
      views: createdManga.data.views,
      todayViews: createdManga.data.todayViews,
    };
  }

  if (error || response?.status !== HttpStatusCode.Ok) {
    return;
  }

  return {
    id: response.data._id,
    manga_id: response.data.manga_id,
    image: response.data.image,
    referer: response.data.referer,
    title: response.data.title,
    views: response.data.views,
    todayViews: response.data.todayViews,
  };
}

async function getMangaInformationFromCrawlers(
  selectedSource: string,
  mangaId: string,
) {
  const { response, error } = await trycatcher(
    mangaApi.get(`/manga/${selectedSource}/info?id=${mangaId}`),
  );

  if (error) {
    console.log('getMangaInformationFromCrawlers', error.response.status);
  }

  return serializeMangaFromCrawlers(response?.data);
}

async function searchManga(selectedSource: string, search: string) {
  const { response, error } = await trycatcher(
    mangaApi.get(`/manga/${selectedSource}/${search}`),
  );

  if (error) {
    console.log('searchManga', error.response.status);
  }

  return response?.data.results.map((manga: MangaFromCrawlers) => {
    return serializeMangaFromCrawlers(manga);
  });
}

async function getMangaChapterPages(
  selectedSource: string,
  //mangaId: string,
  chapterId: string,
) {
  const { response, error } = await trycatcher(
    mangaApi.get(`/manga/${selectedSource}/read?chapterId=${chapterId}`),
  );

  if (error) {
    console.log('getMangaChapterPages', error.response.status);
  }

  return response?.data;
}

export default {
  getRecommendedManga,
  getTrendingTodayManga,
  getMangaInformationFromDatabase,
  searchManga,
  getMangaInformationFromCrawlers,
  getMangaChapterPages,
};
