import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import responsive from '@/global/utils/responsive';
import { useTheme } from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { eonApi } from '@/services/apis';
import { HttpStatusCode } from 'axios';
import { ActivityIndicator } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setUser } from '@/redux/features/authSlice';

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const navigation = useNavigation<any>();
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(state => state.auth.user).username !== '';

  useEffect(() => {
    if (isAuth) {
      navigation.navigate('Main');
    }
  }, [isAuth]);

  function search() {
    navigation.navigate('Main');
  }

  function goToSignUp() {
    navigation.navigate('SignUp');
  }

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  async function login() {
    setLoading(true);
    try {
      const response = await eonApi.post('/users/login', {
        email,
        password,
      });

      if (response.status !== HttpStatusCode.Ok) {
        setLoading(false);
        return;
      }

      dispatch(setUser(response.data));
      navigation.navigate('Main');
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const buttonIsDisabled =
    !email || !password || emailRegex.test(email) === false;

  return (
    <Container>
      <EonLogoContainer>
        <EonLogo
          resizeMode="contain"
          source={{
            uri: 'https://images.squarespace-cdn.com/content/v1/5c4e60a512b13f52d82b57a2/1659753423495-KTB7GW7OBGIPV8PW0UAJ/webArtboard+1.png',
          }}
        />
      </EonLogoContainer>
      <Title onPress={search}>Login</Title>
      <InputContainer>
        <InputIcon size={responsive(25)} color={theme.colors.gray} name="at" />
        <Input
          keyboardType="email-address"
          value={email}
          onChangeText={value => setEmail(value)}
          placeholderTextColor={theme.colors.gray}
          placeholder="Email"
        />
      </InputContainer>
      <InputContainer>
        <InputIcon
          size={responsive(25)}
          color={theme.colors.gray}
          name="lock"
        />
        <Input
          placeholderTextColor={theme.colors.gray}
          placeholder="Password"
          value={password}
          onChangeText={value => setPassword(value)}
          secureTextEntry={!showPassword}
        />
        <ShowPasswordContainer onPress={toggleShowPassword}>
          <Icon
            size={18}
            color={theme.colors.white}
            name={showPassword ? 'eye' : 'eye-slash'}
          />
        </ShowPasswordContainer>
      </InputContainer>
      <ForgotPasswordContainer>
        <ForgotPasswordText>Forgot Password?</ForgotPasswordText>
      </ForgotPasswordContainer>
      <LoginButton disabled={buttonIsDisabled} onPress={login}>
        {loading ? (
          <ActivityIndicator color={theme.colors.black} />
        ) : (
          <LoginButtonText>Login</LoginButtonText>
        )}
      </LoginButton>
      <SignupView>
        <SignupText>New to EON?</SignupText>
        <SignupTouchable onPress={goToSignUp}>
          <SignupTouchableText>Signup now!</SignupTouchableText>
        </SignupTouchable>
      </SignupView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  align-items: flex-start;
  justify-content: center;
  padding: ${responsive(30)}px;
`;

const Title = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: ${responsive(40)}px;
  font-family: ${props => props.theme.fonts.extraBold};
  font-weight: bold;
  margin-bottom: ${responsive(40)}px;
`;

const Input = styled.TextInput`
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

const InputContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: ${responsive(40)}px;
  padding-left: ${responsive(15)}px;
  padding-right: ${responsive(10)}px;
`;

const ShowPasswordContainer = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: 'red';
`;

const InputIcon = styled(Icon)`
  margin-right: ${responsive(15)}px;
`;

const ForgotPasswordContainer = styled.TouchableOpacity`
  margin-top: ${responsive(10)}px;
  margin-bottom: ${responsive(10)}px;
  align-items: flex-end;
  width: 100%;
`;

const ForgotPasswordText = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: ${responsive(18)}px;
  font-family: ${props => props.theme.fonts.extraBold};
`;

interface LoginButtonProps {
  disabled: boolean;
}

const LoginButton = styled.TouchableOpacity<LoginButtonProps>`
  width: 100%;
  height: ${responsive(50)}px;
  background-color: ${props =>
    props.disabled ? props.theme.colors.gray : props.theme.colors.accent};
  align-items: center;
  justify-content: center;
  border-radius: ${responsive(10)}px;
  margin-top: ${responsive(40)}px;
`;

const LoginButtonText = styled.Text`
  color: ${props => props.theme.colors.black};
  font-size: ${responsive(18)}px;
  font-family: ${props => props.theme.fonts.extraBold};
`;

const SignupView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: ${responsive(60)}px;
`;

const SignupText = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: ${responsive(18)}px;
  font-family: ${props => props.theme.fonts.bold};
`;

const SignupTouchable = styled.TouchableOpacity`
  margin-left: ${responsive(5)}px;
`;

const SignupTouchableText = styled.Text`
  color: ${props => props.theme.colors.accent};
  font-size: ${responsive(18)}px;
  font-family: ${props => props.theme.fonts.extraBold};
`;

const EonLogoContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const EonLogo = styled.Image`
  width: ${responsive(400)}px;
  height: ${responsive(250)}px;
`;
