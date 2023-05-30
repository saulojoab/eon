import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import responsive from '@/global/utils/responsive';
import { useTheme } from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-crop-picker';
import { eonApi } from '@/services/apis';
import { ActivityIndicator } from 'react-native';
import { HttpStatusCode } from 'axios';

export default function SignUp() {
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
  const theme = useTheme();

  function goToLogin() {
    navigation.navigate('Login');
  }

  async function createUser() {
    setLoading(true);
    const response = await eonApi.post('/users', {
      username: userName,
      email,
      password,
      profile_picture: profilePicture,
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
  margin-bottom: ${responsive(30)}px;
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

const LoginButton = styled.TouchableOpacity`
  width: 100%;
  height: ${responsive(50)}px;
  background-color: ${props => props.theme.colors.accent};
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
  height: ${responsive(100)}px;
`;

const ProfilePictureContainer = styled.TouchableOpacity`
  width: 100%;
  height: ${responsive(100)}px;
  align-items: center;
  justify-content: center;
  margin-bottom: ${responsive(40)}px;
`;

const ProfilePicture = styled.Image`
  width: ${responsive(120)}px;
  height: ${responsive(120)}px;
  border-radius: ${responsive(100)}px;
`;
