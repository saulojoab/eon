import { TextInputProps } from "react-native";

export interface IInput {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  isPassword?: boolean;
  icon?: string;
  keyboardType?: TextInputProps["keyboardType"];
}
