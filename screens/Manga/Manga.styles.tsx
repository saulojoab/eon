import FavoriteButton from "@/components/FavoriteButton/FavoriteButton";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 as Icon } from "@expo/vector-icons";
import styled from "@emotion/native";
import { ChapterItemProps } from "./Manga.type";
import { responsive } from "@/global/utils/responsive";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding-bottom: ${({ theme }) => theme.layout.spacing.large};
`;

export const MangaDescription = styled.Text`
  font-size: ${({ theme }) => theme.layout.font.small};

  text-align: justify;
  color: ${(props) => props.theme.colors.white};
  font-weight: 300;
`;

export const MangaImage = styled.Image`
  width: 100%;
  height: ${responsive(200, false)};
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
  bottom: 25px;
  left: 0;
  right: 0;
`;

export const MangaTitle = styled.Text`
  font-size: ${({ theme }) => theme.layout.header.small};
  font-weight: 100;
  text-align: center;
  color: ${(props) => props.theme.colors.white};
`;

export const ChapterItem = styled.TouchableOpacity<ChapterItemProps>`
  flex: 1;
  margin: ${({ theme }) => theme.layout.spacing.small};
  opacity: ${(props) => (props.isRead ? 0.5 : 1)};
  background-color: ${(props) =>
    props.currentlyReading ? props.theme.colors.primary : "transparent"};
  border: 1px solid ${(props) => props.theme.colors.white};
  border-radius: 5px;
  margin-bottom: ${({ theme }) => theme.layout.spacing.medium};
  padding: ${({ theme }) => theme.layout.spacing.medium};
  justify-content: center;
  align-items: center;
`;

export const ChapterTitle = styled.Text`
  font-size: ${({ theme }) => theme.layout.font.small};
  font-weight: bold;
  text-align: center;
  color: ${(props) => props.theme.colors.white};
`;

export const TitleAndBackButtonSection = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.layout.spacing.large};
  position: absolute;
  justify-content: space-between;
  z-index: 1;
  width: 100%;
`;

export const BackButton = styled.TouchableOpacity`
  width: ${responsive(30, false)};
  height: ${responsive(30, false)};
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;

export const SectionTitle = styled.Text`
  font-size: ${({ theme }) => theme.layout.font.large};
  color: ${(props) => props.theme.colors.white};
  font-weight: bold;
  width: 100%;
  margin-top: ${({ theme }) => theme.layout.spacing.xlarge};
`;
export const DataSection = styled.View`
  flex-direction: column;
  padding: ${({ theme }) => theme.layout.spacing.large};
  padding-top: ${({ theme }) => theme.layout.spacing.medium};
`;

export const Favorite = styled(FavoriteButton)`
  position: absolute;
  right: ${({ theme }: any) => theme.layout.spacing.medium};
  bottom: ${({ theme }: any) => theme.layout.spacing.medium};
`;

export const MangaImageFadingForeground = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.layout.spacing.medium};
  position: absolute;
`;

export const ViewsContainer = styled.View`
  flex-direction: row;
  position: absolute;
  z-index: 1;
  bottom: ${({ theme }) => theme.layout.spacing.small};
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
`;

export const ViewCount = styled.Text`
  font-size: ${({ theme }) => theme.layout.font.medium};
  color: ${(props) => props.theme.colors.white};
  font-family: ${(props) => props.theme.fonts.light};
  margin-left: ${({ theme }) => theme.layout.spacing.small};
`;

export const ViewsIcon = styled(Icon)``;
