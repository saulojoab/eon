import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { signup } from "@/services/requests/user/user";
import { useState } from "react";

export const useSignupService = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [userName, setUserName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const [loading, setLoading] = useState(false);

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  function toggleShowPasswordConfirmation() {
    setShowPasswordConfirmation(!showPasswordConfirmation);
  }

  const { navigate } = useRouter();

  function goToLogin() {
    navigate("/");
  }

  async function createUser() {
    setLoading(true);
    const response = await signup(userName, email, password, profilePicture);

    if (!response) {
      setLoading(false);
      return;
    }

    setLoading(false);
    goToLogin();
  }

  async function pickImage() {
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.3,
      base64: true,
      selectionLimit: 1,
    });

    if (!image.assets || image.canceled) {
      return;
    }

    setProfilePicture(
      `data:image/jpeg;base64, ${image.assets[0].base64 ?? ""}`
    );
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirmation,
    setPasswordConfirmation,
    profilePicture,
    setProfilePicture,
    userName,
    setUserName,
    showPassword,
    showPasswordConfirmation,
    toggleShowPassword,
    toggleShowPasswordConfirmation,
    loading,
    createUser,
    goToLogin,
    pickImage,
  };
};
