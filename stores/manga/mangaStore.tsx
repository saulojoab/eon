import { create } from "zustand";
import {
  ICurrentlyReading,
  IMangaStore,
  IManga,
  IMangaChapter,
} from "./mangaStore.type";

export interface IProvider {
  name: string;
}

export const useMangaStore = create<IMangaStore>((set, get) => ({
  selectedProviders: [],
  selectedManga: null,
  selectedChapter: null,
  currentlyReadingManga: [],

  setSelectedManga: (manga: IManga) => set({ selectedManga: manga }),
  setSelectedChapter: (chapter: IMangaChapter) => {
    set({ selectedChapter: chapter });
  },
  setSelectedProviders: (providers: IProvider[]) =>
    set({ selectedProviders: providers }),
  addToCurrentlyReading: (currentlyReadingNew: ICurrentlyReading) => {
    const { currentlyReadingManga } = get();
    const alreadyOnCurrentlyReading = currentlyReadingManga.find(
      (c) => c.manga._id === currentlyReadingNew.manga._id
    );

    if (alreadyOnCurrentlyReading) {
      const updatedCurrentlyReading = currentlyReadingManga.map((c) =>
        c.manga._id === currentlyReadingNew.manga._id
          ? { ...c, ...currentlyReadingNew, manga: c.manga, user: c.user }
          : c
      );
      set({ currentlyReadingManga: updatedCurrentlyReading });
      return;
    }

    set({
      currentlyReadingManga: [...currentlyReadingManga, currentlyReadingNew],
    });
  },

  setCurrentlyReading: (currentlyReading: ICurrentlyReading[]) =>
    set({ currentlyReadingManga: currentlyReading }),

  toggleProvider: (source: IProvider) => {
    const { selectedProviders } = get();

    if (!selectedProviders.some((p) => p.name === source.name)) {
      set({ selectedProviders: [...selectedProviders, source] });
      return;
    }

    const newProviders = selectedProviders.filter(
      (provider) => provider.name !== source.name
    );

    set({ selectedProviders: newProviders });
  },
}));
