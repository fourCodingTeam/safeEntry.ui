import { theme } from "@/constants/theme";
import styled from "styled-components/native";

export const HeaderWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.sizes.lgMax} ${theme.sizes.md} 0 ${theme.sizes.md};
`;
export const LeftWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${theme.sizes.md};
`;
export const HeaderText = styled.Text`
  font-family: ${theme.fonts.poppinsNormal};
  font-size: ${theme.sizes.lg};
`;
export const StyledTouchableOpacity = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;
