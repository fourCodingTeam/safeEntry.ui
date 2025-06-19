import { theme } from "@/constants/theme";
import styled from "styled-components/native";

export const ContentWrapper = styled.View`
  position: absolute;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.black40};
  justify-content: flex-end;
  gap: ${theme.sizes.mdMax};
  bottom: 0;
  width: 100%;
  height: auto;
  border-radius: ${theme.sizes.smMax};
  padding: 0 0 ${theme.sizes.sm} 0;
`;

export const OptionsWrapper = styled.View`
  width: 100%;
  gap: ${theme.sizes.sm};
  align-items: center;
  justify-content: left;
`;

export const StyledMenuOption = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${theme.colors.white};
  gap: ${theme.sizes.smMax};
  padding: ${theme.sizes.md} ${theme.sizes.mdMax};
  width: 100%;
`;

export const StyledHighlightedMenuOption = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: ${theme.sizes.sm};
  background-color: ${theme.colors.red};
  border-radius: ${theme.sizes.xs};
  width: 100%;
  padding: ${theme.sizes.lg} ${theme.sizes.md};
`;

export const Header = styled.View`
  padding: ${theme.sizes.smMax} ${theme.sizes.sm};
  gap: ${theme.sizes.md};
  flex-direction: row;
  align-items: center;
  justify-content: left;
  width: 100%;
`;

export const Title = styled.Text`
  color: ${theme.colors.black};
  font-family: ${theme.fonts.poppinsNormal};
  font-size: ${theme.sizes.mdPart};
`;
