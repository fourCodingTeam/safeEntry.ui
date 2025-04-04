import { theme } from "@/constants/theme";
import styled from "styled-components/native";

export const HeaderWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
`;
export const HeaderText = styled.Text`
  font-family: ${theme.fonts.poppinsNormal};
  font-size: ${theme.sizes.lg};
`;
