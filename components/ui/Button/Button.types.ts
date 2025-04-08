import { theme } from "@/constants/theme";

export const colors = {
  blue: theme.colors.blue,
  touchedBlue: theme.colors.touchedBlue,
  black: theme.colors.black,
  touchedBlack: theme.colors.touchedBlack,
};

export type ButtonColors = keyof typeof colors;

export interface ButtonProps {
  color: ButtonColors;
  text: string;
}
