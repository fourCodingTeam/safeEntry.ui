import { theme } from "@/constants/theme";
import styled from "styled-components/native";

export const StyledImageBackground = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

export const StyledContainer = styled.View`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  padding: ${theme.sizes.mdMax} ${theme.sizes.md};
  gap: ${theme.sizes.sm};
`;

export const StyledText = styled.Text`
  font-family: ${theme.fonts.poppinsNormal};
  font-size: ${theme.sizes.lg};
  color: ${theme.colors.black};
`;
