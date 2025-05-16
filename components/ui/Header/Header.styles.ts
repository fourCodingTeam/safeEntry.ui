import { theme } from "@/constants/theme";
import styled from "styled-components/native";

export const HeaderWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.sizes.lgMax} ${theme.sizes.md} 0 ${theme.sizes.md};
`;
export const HeaderText = styled.Text`
  font-family: ${theme.fonts.poppinsNormal};
  font-size: ${theme.sizes.lg};
`;
export const StyledTouchableOpacity = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: ${theme.colors.blue};
  border-radius: 50px;
`;
export const IconLetter = styled.Text`
  color: ${theme.colors.white};
  font-family: ${theme.fonts.poppinsMedium};
`;
