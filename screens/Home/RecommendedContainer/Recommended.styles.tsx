import responsive from "@/global/utils/responsive";
import { Image } from "expo-image";
import styled from "styled-components/native";

export const RecommendedList = styled.FlatList``;

export const MangaPressable = styled.TouchableOpacity``;

export const MangaImage = styled(Image)`
  width: ${responsive(150)}px;
  height: ${responsive(220)}px;
  margin-right: ${responsive(15)}px;
  border: 1px solid white;
`;

export const NothingToRecommendText = styled.Text`
  font-size: ${responsive(15)}px;
  font-family: ${({ theme }) => theme.fonts.lightItalic};
  color: ${({ theme }) => theme.colors.white};
  padding-left: ${responsive(10)}px;
  padding-right: ${responsive(20)}px;
  margin-top: ${responsive(10)}px;
  margin-bottom: ${responsive(20)}px;
  text-align: justify;
`;
