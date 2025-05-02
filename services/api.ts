import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://eon-api.onrender.com"
    : process.env.EXPO_PUBLIC_API_URL;

const api = axios.create({
  baseURL,
});

export default api;
