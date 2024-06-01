import responsive from '@/global/utils/responsive';
import React from 'react';
import { Linking } from 'react-native';
import { useTheme } from 'styled-components';
import ProfileOption from './ProfileOption/ProfileOption';

import {
  ProfileAndNameContainer,
  ProfileImage,
  ProfileAndDateContainer,
  ProfileName,
  DateText,
  Separator,
  MadeWithLoveContainer,
  MadeWithLoveText,
  MadeWithLoveIcon,
  Container,
} from './Profile.styles';
import { useProfileService } from './Profile.service';

export default function Profile() {
  const theme = useTheme();
  const { user, logout } = useProfileService();

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
