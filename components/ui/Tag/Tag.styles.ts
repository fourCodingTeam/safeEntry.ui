import { theme } from "@/constants/theme";
import styled from "styled-components/native";

type TagWrapperProps = {
  color: string;
};

export const TagWrapper = styled.View<TagWrapperProps>`
  align-items: center;
  justify-content: center;
  padding: 0 ${theme.sizes.sm};
  background-color: ${({ color }: TagWrapperProps) => color};
  border-radius: ${theme.sizes.lg};
`;

export const TagText = styled.Text`
  font-family: ${theme.fonts.poppinsNormal};
  color: ${theme.colors.white};
  font-size: ${theme.sizes.md};
`;
