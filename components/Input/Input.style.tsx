import styled from "@emotion/native";

export const InputContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  gap: ${({ theme }) => theme.layout.spacing.medium};
  padding: ${({ theme }) => theme.layout.spacing.medium};
`;

export const StyledInput = styled.TextInput`
  flex: 1;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.gray};
  color: ${(props) => props.theme.colors.white};
  font-size: ${({ theme }) => theme.layout.font.medium};
  font-family: ${(props) => props.theme.fonts.light};
  font-weight: 300;
`;

export const ShowPasswordContainer = styled.TouchableOpacity`
  position: absolute;
  right: ${({ theme }) => theme.layout.spacing.small};
  justify-content: center;
  align-items: center;
  height: 100%;
`;
