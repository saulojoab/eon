import { useAuthStore } from "@/stores/auth/authStore";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { loginAPI } from "@/services/requests/user/user";

export const useLoginService = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const { navigate } = useRouter();
  const { login: setUser, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  function goToSignUp() {
    navigate("/signup");
  }

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  async function login() {
    setLoading(true);

    const data = await loginAPI(email, password);

    if (!data) {
      setLoading(false);
      return;
    }

    setUser(data);

    navigate("/home");
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const buttonIsDisabled =
    !email || !password || emailRegex.test(email) === false;

  return {
    setEmail,
    setPassword,
    goToSignUp,
    toggleShowPassword,
    loading,
    login,
    buttonIsDisabled,
    showPassword,
    email,
    password,
  };
};
