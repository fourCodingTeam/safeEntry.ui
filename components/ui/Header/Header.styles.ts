import { theme } from "@/constants/theme";
import styled from "styled-components/native";

interface StatusTagProps {
  color?: string;
}
export const HeaderWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.sizes.lg} ${theme.sizes.md} 0 ${theme.sizes.md};
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
export const LetterWrapper = styled.View`
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 100px;
  background-color: ${theme.colors.blue};
`;

export const IconLetter = styled.Text`
  color: ${theme.colors.white};
  font-family: ${theme.fonts.poppinsMedium};
  font-size: ${theme.sizes.md};
`;
export const StatusTag = styled.View<StatusTagProps>`
  bottom: ${theme.sizes.xs};
  right: ${theme.sizes.xs};
  position: absolute;
  align-items: center;
  padding: 6px;
  border: 2px solid ${theme.colors.white};
  border-radius: ${theme.sizes.xl};
  background-color: ${({ color }: StatusTagProps) =>
    color || theme.colors.blue};
  z-index: 2;
`;
export const StatusText = styled.Text`
  color: ${theme.colors.white};
  font-family: ${theme.fonts.poppinsNormal};
  font-size: ${theme.sizes.sm};
`;
