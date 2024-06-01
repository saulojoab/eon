import eonApi from '@/services/eon-api';
import { useNavigation } from '@react-navigation/native';
import { HttpStatusCode } from 'axios';
import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';

export const useSignupService = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const [profilePicture, setProfilePicture] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    React.useState(false);

  const [loading, setLoading] = React.useState(false);

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  function toggleShowPasswordConfirmation() {
    setShowPasswordConfirmation(!showPasswordConfirmation);
  }

  const navigation = useNavigation<any>();

  function goToLogin() {
    navigation.navigate('Login');
  }

  async function createUser() {
    setLoading(true);
    const response = await eonApi.post('/users', {
      username: userName,
      email,
      password,
      profilePicture,
    });

    if (response.status !== HttpStatusCode.Created) {
      setLoading(false);
      return;
    }

    setLoading(false);
    navigation.navigate('Login');
  }

  async function pickImage() {
    const image: any = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
      includeBase64: true,
    });

    setProfilePicture(`data:image/jpeg;base64,${image.data}`);
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirmation,
    setPasswordConfirmation,
    profilePicture,
    setProfilePicture,
    userName,
    setUserName,
    showPassword,
    showPasswordConfirmation,
    toggleShowPassword,
    toggleShowPasswordConfirmation,
    loading,
    createUser,
    goToLogin,
    pickImage,
  };
};
