export interface IButtonStyle {
  disabled: boolean;
}

export interface IButton {
  disabled?: boolean;
  onPress: () => void;
  loading: boolean;
  label: string;
}
