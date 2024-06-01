import React from 'react';
import responsive from '@/global/utils/responsive';
import { useTheme } from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ActivityIndicator } from 'react-native';
import { useLoginService } from './Login.service';

import {
  EonLogoContainer,
  Title,
  InputContainer,
  InputIcon,
  ShowPasswordContainer,
  ForgotPasswordContainer,
  ForgotPasswordText,
  LoginButton,
  LoginButtonText,
  SignupView,
  SignupText,
  SignupTouchable,
  SignupTouchableText,
  Container,
  Input,
} from './Login.styles';

export default function Login() {
  const theme = useTheme();
  const {
    buttonIsDisabled,
    goToSignUp,
    loading,
    login,
    search,
    setEmail,
    setPassword,
    toggleShowPassword,
    showPassword,
    email,
    password,
  } = useLoginService();

  return (
    <Container>
      <EonLogoContainer>
        {/*<EonLogo
          resizeMode="contain"
          source={{
            uri: 'https://images.squarespace-cdn.com/content/v1/5c4e60a512b13f52d82b57a2/1659753423495-KTB7GW7OBGIPV8PW0UAJ/webArtboard+1.png',
          }}
        />
        */}
      </EonLogoContainer>
      <Title onPress={search}>Welcome back</Title>
      <InputContainer>
        <InputIcon size={responsive(20)} color={theme.colors.gray} name="at" />
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
          size={responsive(20)}
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
