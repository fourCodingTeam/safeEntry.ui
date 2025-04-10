import { theme } from "@/constants/theme";

export type StartEndCardProps = {
  isFinished?: boolean;
  startTitle: string;
  endTitle?: string;
  startDescription: string;
  endDescription?: string;
};

export const colors = {
  blue: theme.colors.blue,
  midnight: theme.colors.midnight,
};

export type ElipseColors = keyof typeof colors;
