export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  favorites: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuthStore {
  user: IUser | null;
  isAuthenticated: boolean;
  login: (user: any) => void;
  logout: () => void;
}
