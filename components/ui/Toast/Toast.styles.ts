import { theme } from "@/constants/theme";
import styled from "styled-components/native";
import { ToastProps } from "./Toast.types";

export const ToastContainer = styled.View<ToastProps>`
  position: absolute;
  top: ${theme.sizes.md};
  left: ${theme.sizes.md};
  right: ${theme.sizes.md};
  padding: ${theme.sizes.mdMax};
  background-color: ${theme.colors.white};
  border-left-width: 10px;
  border-radius: ${theme.sizes.sm};
  z-index: 9999;
  elevation: 10;
  border-color: ${({ type }: ToastProps) =>
    type === "success"
      ? theme.colors.blue
      : type === "error"
      ? theme.colors.red
      : theme.colors.midnight};
`;

export const ToastText = styled.Text<ToastProps>`
  font-size: ${theme.sizes.md};
  font-family: ${theme.fonts.poppinsNormal};
  text-align: center;
  color: ${({ type }: ToastProps) =>
    type === "success"
      ? theme.colors.blue
      : type === "error"
      ? theme.colors.red
      : theme.colors.midnight};
`;
