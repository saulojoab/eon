import { ActivityIndicator } from "react-native";
import { ButtonText, Container } from "./Button.style";
import { useTheme } from "@emotion/react";
import { IButton } from "./Button.type";

export default function Button({
  disabled = false,
  onPress,
  loading,
  label,
}: IButton) {
  const theme = useTheme();

  return (
    <Container disabled={disabled} onPress={onPress}>
      {loading ? (
        <ActivityIndicator color={theme.colors.black} />
      ) : (
        <ButtonText>{label}</ButtonText>
      )}
    </Container>
  );
}
