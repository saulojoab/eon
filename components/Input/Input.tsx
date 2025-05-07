import { useTheme } from "@emotion/react";
import {
  InputContainer,
  ShowPasswordContainer,
  StyledInput,
} from "./Input.style";
import { useInputService } from "./Input.service";
import { FontAwesome5 as Icon } from "@expo/vector-icons";
import { IInput } from "./Input.type";

export default function Input({
  value,
  onChangeText,
  placeholder,
  isPassword,
  icon,
  keyboardType,
}: IInput) {
  const theme = useTheme();
  const { passwordVisibility, togglePasswordVisibility } = useInputService();

  return (
    <InputContainer>
      {icon && (
        <Icon
          size={+theme.layout.icon.medium}
          color={theme.colors.gray}
          name={icon}
        />
      )}
      <StyledInput
        keyboardType={keyboardType}
        placeholderTextColor={theme.colors.gray}
        placeholder={placeholder}
        value={value}
        onChangeText={(value: string) => onChangeText(value)}
        secureTextEntry={!isPassword ? false : passwordVisibility}
      />
      {isPassword && (
        <ShowPasswordContainer onPress={togglePasswordVisibility}>
          <Icon
            size={+theme.layout.icon.small}
            color={theme.colors.white}
            name={passwordVisibility ? "eye" : "eye-slash"}
          />
        </ShowPasswordContainer>
      )}
    </InputContainer>
  );
}
