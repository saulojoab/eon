import trycatcher from "@/global/utils/trycatcher";
import api from "@/services/api";
import { IUserManga } from "@/stores/manga/mangaStore.type";

export async function getRecommendedManga() {
  const { response, error } = await trycatcher(
    api.get("/user-manga/analytics/trending")
  );

  if (error) {
    console.log(error.response.status);
    return;
  }

  return response?.data as IUserManga[];
}

export async function getTrendingTodayManga() {
  const { response, error } = await trycatcher(
    api.get("/user-manga/analytics/trending-today")
  );

  if (error) {
    console.log(error.response.status);
    return;
  }

  return response?.data as IUserManga;
}
