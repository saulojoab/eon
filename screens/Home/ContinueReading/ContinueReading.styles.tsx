import LottieView from "lottie-react-native";
import styled from "@emotion/native";
import { responsive } from "@/global/utils/responsive";

export const NotReadingAnythingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const NotReadingAnythingAnimation = styled(LottieView)`
  width: ${responsive(50, false)};
  height: ${responsive(70, false)};
  align-self: center;
  flex: 0.15;
`;

export const NotReadingAnythingText = styled.Text`
  font-size: ${({ theme }) => theme.layout.font.medium};
  font-family: ${({ theme }) => theme.fonts.lightItalic};
  color: ${({ theme }) => theme.colors.white};
  padding-right: ${({ theme }) => theme.layout.spacing.large};
  margin-top: ${({ theme }) => theme.layout.spacing.medium};
  margin-bottom: ${({ theme }) => theme.layout.spacing.xlarge};
  text-align: justify;
  flex: 0.85;
`;

export const MangaList = styled.FlatList``;

export const LoadingContainer = styled.View`
  width: ${responsive(150, false)};
  height: ${responsive(220, false)};
  align-items: center;
  justify-content: center;
`;
