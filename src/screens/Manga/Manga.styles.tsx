import { FavoriteButton } from '@/components';
import { isIos } from '@/global/utils/platformChecker';
import responsive from '@/global/utils/responsive';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components/native';
import { ChapterItemProps } from './Manga.type';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  padding-bottom: ${responsive(20)}px;
`;

export const MangaDescription = styled.Text`
  font-size: ${responsive(14)}px;
  text-align: justify;
  color: ${props => props.theme.colors.white};
  font-weight: 300;
`;

export const MangaImage = styled.Image`
  width: 100%;
  height: ${responsive(250)}px;
`;

export const MangaImageTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const MangaTitleContainer = styled.View`
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 1;
  bottom: ${responsive(25)}px;
  left: 0;
  right: 0;
`;

export const MangaTitle = styled.Text`
  font-size: ${responsive(30)}px;
  font-weight: 100;
  text-align: center;
  color: ${props => props.theme.colors.white};
`;

export const ChapterItem = styled.TouchableOpacity<ChapterItemProps>`
  flex: 1;
  margin: ${responsive(4)}px;
  opacity: ${props => (props.isRead ? 0.5 : 1)};
  background-color: ${props =>
    props.currentlyReading ? props.theme.colors.primary : 'transparent'};
  border: 1px solid ${props => props.theme.colors.white};
  border-radius: ${responsive(5)}px;
  margin-bottom: ${responsive(10)}px;
  padding: ${responsive(10)}px;
  justify-content: center;
  align-items: center;
`;

export const ChapterTitle = styled.Text`
  font-size: ${responsive(13)}px;
  font-weight: bold;
  text-align: center;
  color: ${props => props.theme.colors.white};
`;

export const TitleAndBackButtonSection = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${responsive(20)}px;
  position: absolute;
  justify-content: space-between;
  z-index: 1;
  width: 100%;
  padding-top: ${isIos ? responsive(60) : responsive(20)}px;
`;

export const BackButton = styled.TouchableOpacity`
  width: ${responsive(30)}px;
  height: ${responsive(30)}px;
  border-radius: ${responsive(15)}px;
  justify-content: center;
  align-items: center;
`;

export const SectionTitle = styled.Text`
  font-size: ${responsive(20)}px;
  color: ${props => props.theme.colors.white};
  font-weight: bold;
  width: 100%;
  margin-top: ${responsive(20)}px;
`;
export const DataSection = styled.View`
  flex-direction: column;
  padding: ${responsive(20)}px;

  padding-top: ${responsive(10)}px;
`;

export const Favorite = styled(FavoriteButton)`
  position: absolute;
  right: ${responsive(15)}px;
  bottom: ${responsive(15)}px;
`;

export const MangaImageFadingForeground = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  padding: ${responsive(10)}px;
  position: absolute;
`;

export const ViewsContainer = styled.View`
  flex-direction: row;
  position: absolute;
  z-index: 1;
  bottom: ${responsive(5)}px;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
`;

export const ViewCount = styled.Text`
  font-size: ${responsive(14)}px;
  color: ${props => props.theme.colors.white};
  font-family: ${props => props.theme.fonts.light};
  margin-left: ${responsive(5)}px;
`;

export const ViewsIcon = styled(Icon)``;
