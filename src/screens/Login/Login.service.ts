import trycatcher from '@/global/utils/trycatcher';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setUser } from '@/redux/features/authSlice';
import eonApi from '@/services/eon-api';
import { useNavigation } from '@react-navigation/native';
import { HttpStatusCode } from 'axios';
import React, { useEffect } from 'react';

export const useLoginService = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const navigation = useNavigation<any>();
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
    navigation.navigate('Signup');
  }

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  async function login() {
    setLoading(true);

    const { response, error } = await trycatcher(
      eonApi.post('/users/login', {
        email,
        password,
      }),
    );

    if (error || response?.status !== HttpStatusCode.Ok) {
      setLoading(false);
      return;
    }

    dispatch(setUser(response.data));
    navigation.navigate('Main');
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const buttonIsDisabled =
    !email || !password || emailRegex.test(email) === false;

  return {
    setEmail,
    setPassword,
    search,
    goToSignUp,
    toggleShowPassword,
    loading,
    login,
    buttonIsDisabled,
    showPassword,
    email,
    password,
  };
};
