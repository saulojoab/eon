import trycatcher from "@/global/utils/trycatcher";
import api from "@/services/api";
import { HttpStatusCode } from "axios";

export async function loginAPI(email: string, password: string) {
  const { response, error } = await trycatcher(
    api.post("/users/login", {
      email,
      password,
    })
  );

  if (error || response?.status !== HttpStatusCode.Ok) {
    return;
  }

  return response.data;
}

export async function signup(
  username: string,
  email: string,
  password: string,
  profilePicture: string
) {
  const { response, error } = await trycatcher(
    api.post("/users", {
      username,
      email,
      password,
      profilePicture,
    })
  );

  if (error || response?.status !== HttpStatusCode.Created) {
    return;
  }

  return response.data;
}
