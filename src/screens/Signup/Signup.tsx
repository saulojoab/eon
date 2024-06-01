import React from 'react';
import responsive from '@/global/utils/responsive';
import { useTheme } from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ActivityIndicator } from 'react-native';
import { useSignupService } from './Signup.service';

import {
  EonLogoContainer,
  Title,
  ProfilePictureContainer,
  ProfilePicture,
  InputContainer,
  InputIcon,
  ShowPasswordContainer,
  LoginButton,
  LoginButtonText,
  SignupView,
  SignupText,
  SignupTouchable,
  SignupTouchableText,
  Input,
  Container,
} from './Signup.styles';

export default function Signup() {
  const theme = useTheme();
  const {
    userName,
    setUserName,
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirmation,
    setPasswordConfirmation,
    showPassword,
    showPasswordConfirmation,
    toggleShowPassword,
    toggleShowPasswordConfirmation,
    loading,
    profilePicture,
    pickImage,
    createUser,
    goToLogin,
  } = useSignupService();

  return (
    <Container>
      <EonLogoContainer>
        {/*
          <EonLogo
            resizeMode="contain"
            source={{
              uri: 'https://images.squarespace-cdn.com/content/v1/5c4e60a512b13f52d82b57a2/1659753423495-KTB7GW7OBGIPV8PW0UAJ/webArtboard+1.png',
            }}
          />
        */}
      </EonLogoContainer>
      <Title>Sign Up</Title>
      <ProfilePictureContainer onPress={pickImage}>
        <ProfilePicture
          resizeMode="cover"
          source={{
            uri:
              profilePicture ||
              'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
          }}
        />
      </ProfilePictureContainer>
      <InputContainer>
        <InputIcon
          size={responsive(25)}
          color={theme.colors.gray}
          name="user"
        />
        <Input
          value={userName}
          onChangeText={value => setUserName(value)}
          placeholderTextColor={theme.colors.gray}
          placeholder="Username"
        />
      </InputContainer>
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
      <InputContainer>
        <InputIcon
          size={responsive(25)}
          color={theme.colors.gray}
          name="lock"
        />
        <Input
          placeholderTextColor={theme.colors.gray}
          placeholder="Confirm Password"
          value={passwordConfirmation}
          onChangeText={value => setPasswordConfirmation(value)}
          secureTextEntry={!showPasswordConfirmation}
        />
        <ShowPasswordContainer onPress={toggleShowPasswordConfirmation}>
          <Icon
            size={18}
            color={theme.colors.white}
            name={showPasswordConfirmation ? 'eye' : 'eye-slash'}
          />
        </ShowPasswordContainer>
      </InputContainer>
      <LoginButton onPress={createUser}>
        {loading ? (
          <ActivityIndicator color={theme.colors.black} />
        ) : (
          <LoginButtonText>Sign up</LoginButtonText>
        )}
      </LoginButton>
      <SignupView>
        <SignupText>Already have an account?</SignupText>
        <SignupTouchable onPress={goToLogin}>
          <SignupTouchableText>Log in!</SignupTouchableText>
        </SignupTouchable>
      </SignupView>
    </Container>
  );
}
