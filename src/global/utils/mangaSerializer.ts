export interface MangaFromDatabase {
  __v: number;
  _id: string;
  createdAt: string;
  image: string;
  manga_id: string;
  referer: string;
  title: string;
  todayViews: {
    _id: string;
    count: number;
    date: string;
  };
  chapters: ChapterProps[];
  description: string;
}

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

export function serializeMangaFromDatabase(manga: MangaFromDatabase) {
  return {
    id: manga._id,
    title: manga.title,
    altTitles: [manga.title],
    headerForImage: { Referer: manga.referer },
    image: manga.image,
    chapters: [],
    description: '',
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
