import React from "react";
import { useTheme } from "styled-components/native";
import { FontAwesome5 as Icon } from "@expo/vector-icons";

import { IFavoriteButton } from "./FavoriteButton.type";
import { Container } from "./FavoriteButton.style";
import responsive from "@/global/utils/responsive";

export default function FavoriteButton({
  isFavorite,
  onPress,
  style,
}: IFavoriteButton) {
  const theme = useTheme();

  return (
    <Container style={style} onPress={onPress}>
      <Icon
        name="heart"
        color={isFavorite ? theme.colors.accent : theme.colors.white}
        size={responsive(20)}
      />
    </Container>
  );
}
