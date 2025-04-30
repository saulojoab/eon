import React from "react";
import { useTheme } from "styled-components/native";

import {
  TopLogoContainer,
  LogoText,
  WelcomeBackText,
  HomeContent,
  Container,
} from "./Home.styles";
import TrendingToday from "./TrendingToday/TrendingToday";
import ContinueReading from "./ContinueReading/ContinueReading";
import Recommended from "./RecommendedContainer/Recommended";
import Section from "./Section/Section";
import { useAuthStore } from "@/stores/auth/authStore";

export default function Home() {
  const { user } = useAuthStore();
  const theme = useTheme();

  return (
    <Container colors={[theme.colors.secondary, theme.colors.black]}>
      <TopLogoContainer>
        <LogoText>EON</LogoText>
      </TopLogoContainer>
      <WelcomeBackText>
        Welcome back, {user?.username}! Hope you're doing good.
      </WelcomeBackText>
      <HomeContent>
        <TrendingToday />
        <Section icon="book-open" title="CONTINUE READING" />
        <ContinueReading />

        <Section icon="globe-americas" title="RECOMMENDED" />
        <Recommended />
      </HomeContent>
    </Container>
  );
}
