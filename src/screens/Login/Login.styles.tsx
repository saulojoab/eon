import responsive from '@/global/utils/responsive';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  align-items: flex-start;
  justify-content: center;
  padding: ${responsive(30)}px;
`;

export const Title = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: ${responsive(40)}px;
  font-family: ${props => props.theme.fonts.extraBold};
  font-weight: bold;
  margin-bottom: ${responsive(40)}px;
`;

export const Input = styled.TextInput`
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.colors.gray};
  color: ${props => props.theme.colors.white};
  font-size: ${responsive(18)}px;
  font-family: ${props => props.theme.fonts.light};
  font-weight: 300;
  padding-top: ${responsive(5)}px;
  padding-bottom: ${responsive(5)}px;
  padding-left: ${responsive(5)}px;
  width: 100%;
`;

export const InputContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: ${responsive(40)}px;
  padding-left: ${responsive(15)}px;
  padding-right: ${responsive(10)}px;
`;

export const ShowPasswordContainer = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: 'red';
`;

export const InputIcon = styled(Icon)`
  margin-right: ${responsive(15)}px;
`;

export const ForgotPasswordContainer = styled.TouchableOpacity`
  margin-top: ${responsive(10)}px;
  margin-bottom: ${responsive(10)}px;
  align-items: flex-end;
  width: 100%;
`;

export const ForgotPasswordText = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: ${responsive(18)}px;
  font-family: ${props => props.theme.fonts.extraBold};
`;

interface LoginButtonProps {
  disabled: boolean;
}

export const LoginButton = styled.TouchableOpacity<LoginButtonProps>`
  width: 100%;
  height: ${responsive(50)}px;
  background-color: ${props =>
    props.disabled ? props.theme.colors.gray : props.theme.colors.accent};
  align-items: center;
  justify-content: center;
  border-radius: ${responsive(10)}px;
  margin-top: ${responsive(40)}px;
`;

export const LoginButtonText = styled.Text`
  color: ${props => props.theme.colors.black};
  font-size: ${responsive(18)}px;
  font-family: ${props => props.theme.fonts.extraBold};
`;

export const SignupView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: ${responsive(60)}px;
`;

export const SignupText = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: ${responsive(18)}px;
  font-family: ${props => props.theme.fonts.bold};
`;

export const SignupTouchable = styled.TouchableOpacity`
  margin-left: ${responsive(5)}px;
`;

export const SignupTouchableText = styled.Text`
  color: ${props => props.theme.colors.accent};
  font-size: ${responsive(18)}px;
  font-family: ${props => props.theme.fonts.extraBold};
`;

export const EonLogoContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
`;

/* const EonLogo = styled.Image`
  width: ${responsive(400)}px;
  height: ${responsive(250)}px;
`; */
