import { responsive } from "@/global/utils/responsive";
import styled from "@emotion/native";
import { FontAwesome5 as Icon } from "@expo/vector-icons";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.layout.spacing.xxlarge};
`;

export const ProfileAndNameContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.layout.spacing.xlarge};
`;

export const ProfileImage = styled.Image`
  width: ${responsive(100, false)};
  height: ${responsive(100, false)};
  border-radius: 50px;
`;

export const ProfileName = styled.Text`
  font-size: ${({ theme }) => theme.layout.header.medium};
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
  margin-left: ${({ theme }) => theme.layout.spacing.xlarge};
`;

export const Separator = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.layout.spacing.xlarge};
`;

export const MadeWithLoveContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: ${({ theme }) => theme.layout.spacing.xlarge};
  position: absolute;
  bottom: ${({ theme }) => theme.layout.spacing.large};
  left: 0;
  right: 0;
`;

export const MadeWithLoveText = styled.Text`
  font-size: ${({ theme }) => theme.layout.font.small};
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.white};
`;

export const MadeWithLoveIcon = styled(Icon)`
  margin-left: ${({ theme }) => theme.layout.spacing.small};
  margin-right: ${({ theme }) => theme.layout.spacing.small};
`;

export const ProfileAndDateContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const DateText = styled.Text`
  font-size: ${({ theme }) => theme.layout.font.medium};
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.white};
  margin-left: ${({ theme }) => theme.layout.spacing.xlarge};
`;
