import React from "react";
import { useLoginService } from "./Login.service";

import {
  EonLogoContainer,
  ForgotPasswordContainer,
  ForgotPasswordText,
  SignupView,
  SignupText,
  SignupTouchable,
  SignupTouchableText,
  Container,
  FormContainer,
} from "./Login.styles";
import Typography from "@/components/Typography/Typography";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";

export default function Login() {
  const {
    buttonIsDisabled,
    goToSignUp,
    loading,
    login,
    setEmail,
    setPassword,
    email,
    password,
  } = useLoginService();

  return (
    <Container>
      <EonLogoContainer>{/* TODO: add Eon logo */}</EonLogoContainer>
      <Typography variant="title">Welcome back</Typography>

      <FormContainer>
        <Input
          icon="at"
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
        <Input
          icon="lock"
          placeholder="Password"
          isPassword
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
      </FormContainer>

      <ForgotPasswordContainer>
        <ForgotPasswordText>Forgot Password?</ForgotPasswordText>
      </ForgotPasswordContainer>

      <Button
        label="Login"
        loading={loading}
        disabled={buttonIsDisabled}
        onPress={login}
      />

      <SignupView>
        <SignupText>New to EON?</SignupText>
        <SignupTouchable onPress={goToSignUp}>
          <SignupTouchableText>Signup now!</SignupTouchableText>
        </SignupTouchable>
      </SignupView>
    </Container>
  );
}
