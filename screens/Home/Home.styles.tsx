import { LinearGradient } from "expo-linear-gradient";
import styled from "@emotion/native";

export const Container = styled(LinearGradient)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const HomeContent = styled.ScrollView``;

export const TopLogoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
  padding-bottom: ${({ theme }) => theme.layout.spacing.large};
`;

export const LogoText = styled.Text`
  font-size: ${({ theme }) => theme.layout.header.small};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
  margin-left: ${({ theme }) => theme.layout.spacing.medium};
`;

export const WelcomeBackText = styled.Text`
  font-size: ${({ theme }) => theme.layout.font.large};
  font-family: ${({ theme }) => theme.fonts.thinItalic};
  color: ${({ theme }) => theme.colors.white};
  padding-left: ${({ theme }) => theme.layout.spacing.medium};
  padding-right: ${({ theme }) => theme.layout.spacing.large};
  margin-top: ${({ theme }) => theme.layout.spacing.xlarge};
  margin-bottom: ${({ theme }) => theme.layout.spacing.xlarge};
  text-align: justify;
`;

export const MangaContainer = styled.View`
  margin-right: ${({ theme }) => theme.layout.spacing.small};
`;
