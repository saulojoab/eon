import { IUser } from "../auth/authStore.type";
import { IProvider } from "./mangaStore";

export interface IMangaStore {
  selectedManga: IManga | null;
  selectedChapter: IMangaChapter | null;
  selectedProviders: IProvider[];
  currentlyReadingManga: ICurrentlyReading[];
  setSelectedManga: (manga: IManga) => void;
  setSelectedChapter: (chapter: IMangaChapter) => void;
  setSelectedProviders: (provider: IProvider[]) => void;
  addToCurrentlyReading: (currentlyReading: ICurrentlyReading) => void;
  setCurrentlyReading: (currentlyReading: ICurrentlyReading[]) => void;
  toggleProvider: (provider: IProvider) => void;
}

export interface IUserManga {
  _id: string;
  manga_id: string;
  image: string;
  referer: string;
  title: string;
  views: number;
  todayViews: ITodayViews;
  createdAt: Date;
}

export interface IMangaSearchResult {
  id: string;
  title: string;
  altTitles?: string[];
  image?: string;
  description?: string;
  status?: string;
  releaseDate: string;
  provider: string;
}

export interface IMangaChapter {
  id: string;
  title: string;
  volume?: number;
  pages?: number;
  releaseDate?: string;
}

export interface IMangaChapterPage {
  img: string;
  page: number;
}

export interface IManga extends IMangaSearchResult {
  authors?: string[];
  genres?: string[];
  links?: string[];
  characters?: string[];
  recommendations?: IMangaSearchResult[];
  chapters?: IMangaChapter[];
}

export interface ITodayViews {
  date: Date;
  count: number;
}

export interface ICurrentlyReading {
  manga: IUserManga;
  user: IUser;
  current_chapter: string;
  finished_chapters: string[];
  createdAt: string;
}
