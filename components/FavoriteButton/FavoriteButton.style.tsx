import styled from "@emotion/native";

export const Container = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.layout.spacing.medium};
`;
