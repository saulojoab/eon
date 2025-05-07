import { LinearGradient } from "expo-linear-gradient";
import styled from "@emotion/native";
import { responsive } from "@/global/utils/responsive";

export const TrendingTodayContainerView = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: ${responsive(200, false)};
`;

export const TrendingTodayImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const TrendingTodayInfoBackground = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.layout.spacing.medium};
  position: absolute;
`;

export const TrendingTodayTag = styled.View`
  height: ${responsive(30, false)};
  max-width: ${responsive(160, false)};
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.black};
  top: ${({ theme }) => theme.layout.spacing.small};
  flex-direction: row;
  border-radius: 10px;
`;

export const TrendingTodayTagText = styled.Text`
  font-size: ${({ theme }) => theme.layout.font.small};
  font-family: ${({ theme }) => theme.fonts.black};
  color: ${({ theme }) => theme.colors.white};
  margin-left: ${({ theme }) => theme.layout.spacing.small};
`;

export const TrendingTodayMangaName = styled.Text`
  font-size: ${({ theme }) => theme.layout.font.xxlarge};
  font-family: ${({ theme }) => theme.fonts.lightItalic};
  color: ${({ theme }) => theme.colors.white};
  margin-left: ${({ theme }) => theme.layout.spacing.small};
  bottom: ${({ theme }) => theme.layout.spacing.medium};
  right: ${({ theme }) => theme.layout.spacing.medium};
  position: absolute;
`;
