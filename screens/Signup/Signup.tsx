import React from "react";
import { useSignupService } from "./Signup.service";

import {
  EonLogoContainer,
  ProfilePictureContainer,
  ProfilePicture,
  SignupView,
  SignupText,
  SignupTouchable,
  SignupTouchableText,
  Container,
  FormContainer,
} from "./Signup.styles";
import Typography from "@/components/Typography/Typography";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";

export default function Signup() {
  const {
    userName,
    setUserName,
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirmation,
    setPasswordConfirmation,
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

      <Typography variant="title">Sign Up</Typography>

      <ProfilePictureContainer onPress={pickImage}>
        <ProfilePicture
          resizeMode="cover"
          source={{
            uri:
              profilePicture ||
              "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg",
          }}
        />
      </ProfilePictureContainer>

      <FormContainer>
        <Input
          icon="user"
          placeholder="Username"
          onChangeText={(value) => setUserName(value)}
          value={userName}
        />

        <Input
          icon="at"
          placeholder="Email"
          onChangeText={(value) => setEmail(value)}
          value={email}
          keyboardType="email-address"
        />

        <Input
          icon="lock"
          placeholder="Password"
          onChangeText={(value) => setPassword(value)}
          value={password}
          isPassword
        />

        <Input
          icon="lock"
          placeholder="Confirm Password"
          onChangeText={(value) => setPasswordConfirmation(value)}
          value={passwordConfirmation}
          isPassword
        />
      </FormContainer>

      <Button label="Sign up" onPress={createUser} loading={loading} />

      <SignupView>
        <SignupText>Already have an account?</SignupText>
        <SignupTouchable onPress={goToLogin}>
          <SignupTouchableText>Log in!</SignupTouchableText>
        </SignupTouchable>
      </SignupView>
    </Container>
  );
}
