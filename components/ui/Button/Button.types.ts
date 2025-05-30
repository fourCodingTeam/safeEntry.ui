import { theme } from "@/constants/theme";

export const colors = {
  blue: theme.colors.blue,
  black: theme.colors.black,
};

export type ButtonColors = keyof typeof colors;

export interface ButtonProps {
  color: ButtonColors;
  text: string;
  onPress?: () => void;
  disabled?: boolean;
}
