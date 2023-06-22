import { createSlice } from '@reduxjs/toolkit';

export interface CurrentlyReadingMangaProps {
  manga: {
    manga_id: string;
    image: string;
    referer: string;
    title: string;
    views: number;
    todayViews: {
      date: string;
      count: 0;
    };
    createdAt: string;
  };
  current_chapter: string;
  finished_chapters: string[];
  createdAt: string;
}

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
  currentlyReading: Array<CurrentlyReadingMangaProps>;
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
    setCurrentlyReading: (state, action) => {
      const newState = {
        ...state,
        currentlyReading: action.payload,
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
  resetState,
  setCurrentlyReading,
} = mangaSlice.actions;
export default mangaSlice.reducer;
