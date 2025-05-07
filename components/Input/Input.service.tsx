import { useState } from "react";

export const useInputService = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  function togglePasswordVisibility() {
    setPasswordVisibility((prev) => !prev);
  }

  return {
    passwordVisibility,
    togglePasswordVisibility,
  };
};
