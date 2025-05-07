import styled from "@emotion/native";

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.layout.header.medium};
  font-family: ${({ theme }) => theme.fonts.extraBold};
`;

export const Body = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.layout.font.medium};
  font-family: ${({ theme }) => theme.fonts.light};
`;
