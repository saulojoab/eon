import styled from "@emotion/native";

export const RecommendedList = styled.FlatList``;

export const NothingToRecommendText = styled.Text`
  font-size: ${({ theme }) => theme.layout.font.medium};
  font-family: ${({ theme }) => theme.fonts.lightItalic};
  color: ${({ theme }) => theme.colors.white};
  padding-left: ${({ theme }) => theme.layout.spacing.medium};
  padding-right: ${({ theme }) => theme.layout.spacing.large};
  margin-top: ${({ theme }) => theme.layout.spacing.small};
  margin-bottom: ${({ theme }) => theme.layout.spacing.xlarge};
  text-align: justify;
`;
