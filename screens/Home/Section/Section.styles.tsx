import { responsive } from "@/global/utils/responsive";
import styled from "@emotion/native";

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: ${responsive(50, false)};
  padding-left: ${({ theme }) => theme.layout.spacing.medium};
  margin-top: ${({ theme }) => theme.layout.spacing.small};
`;

export const SectionTitle = styled.Text`
  font-size: ${({ theme }) => theme.layout.font.medium};
  font-family: ${({ theme }) => theme.fonts.extraBold};
  color: ${({ theme }) => theme.colors.white};
  margin-left: ${({ theme }) => theme.layout.spacing.medium};
`;
