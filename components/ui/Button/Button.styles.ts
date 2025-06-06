import { theme } from "@/constants/theme";
import styled from "styled-components/native";
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
  border-radius: ${theme.sizes.sm};
`;

export const ButtonText = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.sizes.md};
  font-family: ${theme.fonts.poppinsMedium};
`;
