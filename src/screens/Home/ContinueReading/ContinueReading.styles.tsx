import responsive from '@/global/utils/responsive';
import styled from 'styled-components/native';

export const MangaImage = styled.Image`
  width: ${responsive(150)}px;
  height: ${responsive(220)}px;
  margin-right: ${responsive(15)}px;
`;

export const NotReadingAnythingText = styled.Text`
  font-size: ${responsive(15)}px;
  font-family: ${({ theme }) => theme.fonts.lightItalic};
  color: ${({ theme }) => theme.colors.white};
  padding-left: ${responsive(10)}px;
  padding-right: ${responsive(20)}px;
  margin-top: ${responsive(10)}px;
  margin-bottom: ${responsive(20)}px;
  text-align: justify;
`;

export const MangaPressable = styled.TouchableOpacity``;

export const MangaList = styled.FlatList``;

export const LoadingContainer = styled.View`
  width: ${responsive(150)}px;
  height: ${responsive(220)}px;
  align-items: center;
  justify-content: center;
`;
