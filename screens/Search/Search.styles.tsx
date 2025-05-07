import { responsive } from "@/global/utils/responsive";
import styled from "@emotion/native";
import Lottie from "lottie-react-native";

export const Container = styled.View`
  flex: 1;
  padding: ${({ theme }) => theme.layout.spacing.medium};
  background-color: ${(props) => props.theme.colors.background};
`;

export const MangaList = styled.FlatList`
  flex: 1;
  width: 100%;
`;

export const SearchGuideText = styled.Text`
  font-size: ${({ theme }) => theme.layout.font.medium};
  font-family: ${(props) => props.theme.fonts.light};
  color: ${(props) => props.theme.colors.gray};
  margin-bottom: ${({ theme }) => theme.layout.spacing.xlarge};
  align-self: center;
`;

export const InputContainer = styled.View`
  flex: 0.9;
`;

export const SearchAndOptionsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.layout.spacing.xlarge};
`;

export const SettingsIcon = styled.TouchableOpacity`
  flex: 0.1;
  align-items: center;
  justify-content: center;
`;

export const PointingUpAnimation = styled(Lottie)`
  width: ${responsive(50, false)};
  height: ${responsive(50, false)};
  transform: rotate(180deg);
  margin-bottom: ${({ theme }) => theme.layout.spacing.large};
  align-self: center;
`;
