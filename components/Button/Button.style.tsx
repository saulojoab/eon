import styled from "@emotion/native";
import { IButtonStyle } from "./Button.type";

export const Container = styled.TouchableOpacity<IButtonStyle>`
  width: 100%;
  height: 50px;
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.gray : theme.colors.accent};
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.layout.font.medium};
  font-family: ${(props) => props.theme.fonts.extraBold};
`;
