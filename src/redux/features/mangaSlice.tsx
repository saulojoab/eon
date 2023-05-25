import { createSlice } from '@reduxjs/toolkit';

export interface MangaSliceProps {
  selectedManga: {
    id: string;
    image: string;
  };
  selectedSource: string;
}

const initialState: MangaSliceProps = {
  selectedManga: {
    id: '',
    image: '',
  },
  selectedSource: 'mangakakalot',
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
  },
});

export const { updateSource, setSelectedManga } = mangaSlice.actions;
export default mangaSlice.reducer;
