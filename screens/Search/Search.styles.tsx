import { isIos } from "@/global/utils/platformChecker";
import responsive from "@/global/utils/responsive";
import styled from "styled-components/native";
import Lottie from "lottie-react-native";

export const Container = styled.View`
  flex: 1;
  padding: ${responsive(10)}px;
  padding-top: ${isIos ? responsive(60) : responsive(50)}px;
  background-color: ${(props) => props.theme.colors.background};
`;

export const MangaItem = styled.TouchableOpacity`
  flex-direction: column;
  width: ${responsive(180)}px;
  height: ${responsive(220)}px;
  margin: ${responsive(20)}px;
  margin-bottom: ${responsive(30)}px;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 5px;
`;

export const MangaList = styled.FlatList`
  flex: 1;
  width: 100%;
`;

export const MangaImage = styled.Image`
  width: 100%;
  height: 100%;
  align-self: center;
`;

export const MangaProviderText = styled.Text`
  position: absolute;
  bottom: ${responsive(5)}px;
  right: ${responsive(5)}px;
  font-size: ${responsive(12)}px;
  font-family: ${(props) => props.theme.fonts.default};
  color: ${(props) => props.theme.colors.secondary};
  background-color: ${(props) => props.theme.colors.white};
  padding: ${responsive(5)}px;
  border-radius: 3px;
  overflow: hidden;
`;

export const MangaTitle = styled.Text`
  font-size: ${responsive(14)}px;
  font-family: ${(props) => props.theme.fonts.italic};
  color: ${(props) => props.theme.colors.white};
  margin-top: ${responsive(5)}px;
`;

export const SearchGuideText = styled.Text`
  font-size: ${responsive(16)}px;
  font-family: ${(props) => props.theme.fonts.light};
  color: ${(props) => props.theme.colors.gray};
  margin-bottom: ${responsive(20)}px;
  align-self: center;
`;

export const MangaSearchInput = styled.TextInput`
  width: 90%;
  height: ${responsive(50)}px;
  font-family: ${(props) => props.theme.fonts.default};
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.colors.gray};
  padding: ${responsive(10)}px;
  color: ${(props) => props.theme.colors.white};
`;

export const SearchAndOptionsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${responsive(20)}px;
`;

export const SettingsIcon = styled.TouchableOpacity``;

export const PointingUpAnimation = styled(Lottie)`
  width: ${responsive(80)}px;
  height: ${responsive(80)}px;
  transform: rotate(180deg);
  margin-bottom: ${responsive(15)}px;
  align-self: center;
`;
