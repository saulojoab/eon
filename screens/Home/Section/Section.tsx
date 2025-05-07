import React from "react";
import { FontAwesome5 as Icon } from "@expo/vector-icons";
import { useTheme } from "@emotion/react";
import { SectionContainerProps } from "./Section.type";

import { Container, SectionTitle } from "./Section.styles";

export default function Section({ title, icon }: SectionContainerProps) {
  const theme = useTheme();

  return (
    <Container>
      <Icon
        name={icon as any}
        size={+theme.layout.icon.small}
        color={theme.colors.accent}
      />
      <SectionTitle>{title}</SectionTitle>
    </Container>
  );
}
