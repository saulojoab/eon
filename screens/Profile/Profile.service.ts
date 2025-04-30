import { useAuthStore } from "@/stores/auth/authStore";
import { useRouter } from "expo-router";

export const useProfileService = () => {
  const { user, logout: logoutFromStore } = useAuthStore();
  const { navigate } = useRouter();

  function logout() {
    logoutFromStore();
    navigate("/");
  }

  return {
    user,
    logout,
  };
};
