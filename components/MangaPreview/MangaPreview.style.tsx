import styled from "@emotion/native";

export const Container = styled.TouchableOpacity`
  flex-direction: column;
  width: 120px;
  height: 180px;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 5px;
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
  align-self: center;
`;

export const ProviderText = styled.Text`
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-size: ${({ theme }) => theme.layout.font.small};
  font-family: ${(props) => props.theme.fonts.default};
  color: ${(props) => props.theme.colors.secondary};
  background-color: ${(props) => props.theme.colors.white};
  padding: ${({ theme }) => theme.layout.spacing.small};
  border-radius: 3px;
  overflow: hidden;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.layout.font.small};
  font-family: ${(props) => props.theme.fonts.italic};
  color: ${(props) => props.theme.colors.white};
  margin-top: ${({ theme }) => theme.layout.spacing.small};
`;
