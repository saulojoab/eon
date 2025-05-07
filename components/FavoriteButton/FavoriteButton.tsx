import React from "react";
import { useTheme } from "@emotion/react";
import { FontAwesome5 as Icon } from "@expo/vector-icons";

import { IFavoriteButton } from "./FavoriteButton.type";
import { Container } from "./FavoriteButton.style";

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
        size={+theme.layout.icon.medium}
      />
    </Container>
  );
}
