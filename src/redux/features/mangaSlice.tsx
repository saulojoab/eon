import { createSlice } from '@reduxjs/toolkit';

export interface MangaSliceProps {
  selectedManga: {
    id: string;
    image: string;
    referer: string;
    title: string;
    views: number;
    todayViews: {
      date: Date;
      views: number;
    };
  };
  currentlyReading: Array<{
    id: string;
    currentChapter: string;
    finishedChapters: string[];
    image: string;
    source: string;
    referer: string;
  }>;
  selectedSource: string;
}

const initialState: MangaSliceProps = {
  selectedManga: {
    id: '',
    image: '',
    referer: '',
    title: '',
    views: -1,
    todayViews: {
      date: new Date(),
      views: -1,
    },
  },
  selectedSource: 'mangakakalot',
  currentlyReading: [],
};

const mangaSlice = createSlice({
  name: 'manga',
  initialState,
  reducers: {
    updateSource: (state, action) => {
      const newState = {
        ...state,
        selectedSource: action.payload,
      };
      return newState;
    },
    setSelectedManga: (state, action) => {
      const newState = {
        ...state,
        selectedManga: action.payload,
      };
      return newState;
    },
    addToCurrentlyReading: (state, action) => {
      const newState = {
        ...state,
        currentlyReading: [...state.currentlyReading, action.payload],
      };
      return newState;
    },
    removeFromCurrentlyReading: (state, action) => {
      const newState = {
        ...state,
        currentlyReading: state.currentlyReading.filter(
          manga => manga.id !== action.payload,
        ),
      };
      return newState;
    },
    updateCurrentChapter: (state, action) => {
      const newState = {
        ...state,
        currentlyReading: state.currentlyReading.map(manga => {
          if (manga.id === action.payload.id) {
            return {
              ...manga,
              currentChapter: action.payload.currentChapter,
            };
          }
          return manga;
        }),
      };

      return newState;
    },
    addFinishedChapter: (state, action) => {
      const newState = {
        ...state,
        currentlyReading: state.currentlyReading.map(manga => {
          if (
            manga.id === action.payload.id &&
            !manga.finishedChapters.some(
              chapter => chapter === action.payload.chapter,
            )
          ) {
            return {
              ...manga,
              finishedChapters: [
                ...manga.finishedChapters,
                action.payload.chapter,
              ],
            };
          }
          return manga;
        }),
      };
      return newState;
    },
    resetState: () => initialState,
  },
});

export const {
  updateSource,
  setSelectedManga,
  addToCurrentlyReading,
  addFinishedChapter,
  updateCurrentChapter,
  resetState,
  removeFromCurrentlyReading,
} = mangaSlice.actions;
export default mangaSlice.reducer;
