import { createSlice } from '@reduxjs/toolkit';

export interface AuthProps {
  user: {
    _id: string;
    username: string;
    email: string;
    password: string;
    profilePicture: string;
    favorites: string[];
    createdAt: Date;
    updatedAt: Date;
  };
}

const initialState: AuthProps = {
  user: {
    _id: '',
    username: '',
    email: '',
    password: '',
    profilePicture: '',
    favorites: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const newState = {
        ...state,
        user: action.payload,
      };
      return newState;
    },
    addMangaToFavorites: (state, action) => {
      const newState = {
        ...state,
        user: {
          ...state.user,
          favorites: [...state.user.favorites, action.payload],
        },
      };
      return newState;
    },
    resetState: () => initialState,
  },
});

export const { addMangaToFavorites, resetState, setUser } = authSlice.actions;
export default authSlice.reducer;
