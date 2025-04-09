import styled from "styled-components/native";
import { theme } from "@/constants/theme";
import { ButtonColors, colors } from "./Button.types";

interface ButtonProps {
  buttonColor: ButtonColors;
}

export const ButtonContainer = styled.TouchableOpacity<ButtonProps>`
  align-items: center;
  justify-content: center;
  width: 100vw;
  background-color: ${({ buttonColor }: ButtonProps) => colors[buttonColor]};
  padding: ${theme.sizes.md};
  border-radius: ${theme.sizes.lg};
`;

export const ButtonText = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.sizes.md};
`;
