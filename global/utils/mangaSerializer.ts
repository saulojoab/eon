import { IUserManga } from "@/stores/manga/mangaStore.type";

export interface ChapterProps {
  id: string;
  chapter: string;
  title: string;
}

export interface MangaFromCrawlers {
  id: string;
  title: string;
  altTitles: string[];
  headerForImage: { Referer: string };
  image: string;
  chapters: ChapterProps[];
  description: string;
}

export function serializeMangaFromDatabase(manga: IUserManga) {
  return {
    id: manga.id,
    title: manga.title,
    altTitles: [manga.title],
    headerForImage: { Referer: manga.referer },
    image: manga.image,
    chapters: [],
    description: "",
  };
}

export function serializeMangaFromCrawlers(manga: MangaFromCrawlers) {
  return {
    __v: null,
    _id: null,
    createdAt: null,
    image: manga.image,
    manga_id: manga.id,
    referer: manga.headerForImage.Referer,
    title: manga.title,
    todayViews: {
      _id: null,
      count: null,
      date: null,
    },
    chapters: manga.chapters,
    description: manga.description,
  };
}
