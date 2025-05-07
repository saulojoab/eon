import { useTheme } from "@emotion/react";
import { ProfileOptionProps } from "./ProfileOption.type";
import React from "react";
import { FontAwesome5 as Icon } from "@expo/vector-icons";
import {
  ProfileOptionContainer,
  ProfileOptionIconContainer,
  ProfileOptionText,
  ProfileOptionIndicatorIcon,
} from "./ProfileOptions.style";

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
          size={+theme.layout.icon.medium}
          color={theme.colors.white}
        />
      </ProfileOptionIconContainer>
      <ProfileOptionText>{label}</ProfileOptionText>
      <ProfileOptionIndicatorIcon
        name="chevron-right"
        size={+theme.layout.icon.medium}
        color={theme.colors.white}
      />
    </ProfileOptionContainer>
  );
}
