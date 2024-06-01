import { useTheme } from 'styled-components/native';
import { ProfileOptionProps } from './ProfileOption.type';
import responsive from '@/global/utils/responsive';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  ProfileOptionContainer,
  ProfileOptionIconContainer,
  ProfileOptionText,
  ProfileOptionIndicatorIcon,
} from './ProfileOptions.style';

export default function ProfileOption({
  icon,
  onPress,
  label,
}: ProfileOptionProps) {
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
