import { isIos } from '@/global/utils/platformChecker';
import responsive from '@/global/utils/responsive';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { resetState } from '@/redux/features/authSlice';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';

interface ProfileOptionProps {
  icon: string;
  onPress: () => void;
  label: string;
}

function ProfileOption({ icon, onPress, label }: ProfileOptionProps) {
  const theme = useTheme();

  return (
    <ProfileOptionContainer onPress={onPress}>
      <ProfileOptionIconContainer>
        <Icon
          name={icon}
          solid
          size={responsive(20)}
          color={theme.colors.white}
        />
      </ProfileOptionIconContainer>
      <ProfileOptionText>{label}</ProfileOptionText>
      <ProfileOptionIndicatorIcon
        name="chevron-right"
        size={responsive(20)}
        color={theme.colors.white}
      />
    </ProfileOptionContainer>
  );
}

export default function Profile() {
  const theme = useTheme();
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();

  function logout() {
    dispatch(resetState());
    navigation.navigate('Login');
  }

  return (
    <Container>
      <ProfileAndNameContainer>
        <ProfileImage source={{ uri: user.profilePicture }} />
        <ProfileAndDateContainer>
          <ProfileName>{user.username}</ProfileName>
          <DateText>
            Member since: {new Date(user.createdAt).toLocaleDateString()}
          </DateText>
        </ProfileAndDateContainer>
      </ProfileAndNameContainer>
      <Separator />
      <ProfileOption icon="user" label="Profile Data" onPress={() => {}} />
      <ProfileOption icon="heart" label="Favorites" onPress={() => {}} />
      <ProfileOption icon="cog" label="Settings" onPress={() => {}} />
      <Separator />
      <ProfileOption icon="users" label="Community" onPress={() => {}} />
      <ProfileOption
        icon="code"
        label="Source Code"
        onPress={() => Linking.openURL('https://github.com/saulojoab/eon')}
      />
      <ProfileOption
        icon="question"
        label="Help"
        onPress={() =>
          Linking.openURL(
            'https://github.com/saulojoab/eon/issues/new?assignees=saulojoab&labels=bug&projects=&template=🐞-bug-report.md&title=%5BBUG%5D',
          )
        }
      />
      <ProfileOption icon="sign-out-alt" label="Log out" onPress={logout} />
      <MadeWithLoveContainer>
        <MadeWithLoveText>Made with</MadeWithLoveText>
        <MadeWithLoveIcon
          name="heart"
          solid
          size={responsive(14)}
          color={theme.colors.accent}
        />
        <MadeWithLoveText>
          by Saulo Joab & the open source community
        </MadeWithLoveText>
      </MadeWithLoveContainer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${responsive(30)}px;
  padding-top: ${isIos ? responsive(60) : responsive(30)}px;
`;

const ProfileAndNameContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${responsive(20)}px;
`;

const ProfileImage = styled.Image`
  width: ${responsive(100)}px;
  height: ${responsive(100)}px;
  border-radius: ${responsive(50)}px;
`;

const ProfileName = styled.Text`
  font-size: ${responsive(30)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
  margin-left: ${responsive(20)}px;
`;

const Separator = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${responsive(20)}px;
`;

const ProfileOptionContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${responsive(20)}px;
`;

const ProfileOptionIconContainer = styled.View`
  width: ${responsive(50)}px;
  height: ${responsive(50)}px;
  border-radius: ${responsive(25)}px;
  background-color: ${({ theme }) => theme.colors.secondary};
  justify-content: center;
  align-items: center;
  margin-right: ${responsive(10)}px;
`;

const ProfileOptionText = styled.Text`
  font-size: ${responsive(20)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.white};
`;

const ProfileOptionIndicatorIcon = styled(Icon)`
  margin-left: auto;
  margin-right: ${responsive(10)}px;
`;

const MadeWithLoveContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: ${responsive(20)}px;
  position: absolute;
  bottom: ${responsive(20)}px;
  left: 0;
  right: 0;
`;

const MadeWithLoveText = styled.Text`
  font-size: ${responsive(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.white};
`;

const MadeWithLoveIcon = styled(Icon)`
  margin-left: ${responsive(5)}px;
  margin-right: ${responsive(5)}px;
`;

const ProfileAndDateContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const DateText = styled.Text`
  font-size: ${responsive(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.white};
  margin-left: ${responsive(20)}px;
`;
