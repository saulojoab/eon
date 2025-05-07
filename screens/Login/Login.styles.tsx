import styled from "@emotion/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.layout.spacing.xxlarge};
  gap: ${({ theme }) => theme.layout.spacing.medium};
`;

export const FormContainer = styled.View`
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ForgotPasswordContainer = styled.TouchableOpacity`
  margin-top: ${({ theme }) => theme.layout.spacing.medium};
  margin-bottom: ${({ theme }) => theme.layout.spacing.medium};
  align-items: flex-end;
  width: 100%;
`;

export const ForgotPasswordText = styled.Text`
  color: ${(props) => props.theme.colors.white};
  font-size: ${({ theme }) => theme.layout.font.medium};
  font-family: ${({ theme }) => theme.fonts.extraBold};
`;

export const SignupView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const SignupText = styled.Text`
  color: ${(props) => props.theme.colors.white};
  font-size: ${({ theme }) => theme.layout.font.medium};
  font-family: ${(props) => props.theme.fonts.bold};
`;

export const SignupTouchable = styled.TouchableOpacity`
  margin-left: ${({ theme }) => theme.layout.spacing.small};
`;

export const SignupTouchableText = styled.Text`
  color: ${(props) => props.theme.colors.accent};
  font-size: ${({ theme }) => theme.layout.font.medium};
  font-family: ${(props) => props.theme.fonts.extraBold};
`;

export const EonLogoContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
`;

/* const EonLogo = styled.Image`
  width: 400px;  height: 250px;`; */
