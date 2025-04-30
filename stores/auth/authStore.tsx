import { create } from "zustand";
import { IAuthStore } from "./authStore.type";

export const useAuthStore = create<IAuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
