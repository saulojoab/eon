import React from "react";
import { useTheme } from "@emotion/react";
import { LoadingSpinner } from "./LoadingRender.styles";

export default function LoadingRender() {
  const theme = useTheme();
  return <LoadingSpinner size="large" color={theme.colors.white} />;
}
