import responsive from '@/global/utils/responsive';
import styled from 'styled-components/native';

export const RecommendedList = styled.FlatList``;

export const MangaPressable = styled.TouchableOpacity``;

export const MangaImage = styled.Image`
  width: ${responsive(150)}px;
  height: ${responsive(220)}px;
  margin-right: ${responsive(15)}px;
`;
