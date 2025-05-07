import { responsive } from "@/global/utils/responsive";
import styled from "@emotion/native";
import { FontAwesome5 as Icon } from "@expo/vector-icons";

export const ProfileOptionContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.layout.spacing.xlarge};
`;

export const ProfileOptionIconContainer = styled.View`
  width: ${responsive(50, false)};
  height: ${responsive(50, false)};
  border-radius: 25px;
  background-color: ${({ theme }) => theme.colors.secondary};
  justify-content: center;
  align-items: center;
  margin-right: ${({ theme }) => theme.layout.spacing.medium};
`;

export const ProfileOptionText = styled.Text`
  font-size: ${({ theme }) => theme.layout.font.medium};
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.white};
`;

export const ProfileOptionIndicatorIcon = styled(Icon)`
  margin-left: auto;
  margin-right: ${({ theme }) => theme.layout.spacing.medium};
`;
