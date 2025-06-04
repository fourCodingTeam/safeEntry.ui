import { theme } from "@/constants/theme";
import styled from "styled-components/native";

export const ContentWrapper = styled.View`
  position: absolute;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.black40};
  justify-content: flex-end;
  padding: ${theme.sizes.lg} ${theme.sizes.md};
  gap: ${theme.sizes.md};
  bottom: 0;
  width: 100%;
  height: auto;
  border-radius: ${theme.sizes.smMax};
`;

export const OptionsWrapper = styled.View`
  width: 100%;
  gap: ${theme.sizes.xs};
  align-items: center;
  justify-content: left;
`;

export const StyledMenuOption = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: ${theme.sizes.sm};
  border-radius: ${theme.sizes.xs};
  width: 100%;
  padding: ${theme.sizes.smMax} ${theme.sizes.sm};
  background-color: ${theme.colors.offWhite};
`;

export const StyledHighlightedMenuOption = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: ${theme.sizes.sm};
  background-color: ${theme.colors.red};
  border-radius: ${theme.sizes.xs};
  width: 100%;
  padding: ${theme.sizes.smMax} ${theme.sizes.sm};
`;

export const StyledHighlightedText = styled.Text`
  color: ${theme.colors.white};
  font-family: ${theme.fonts.poppinsNormal};
  font-size: ${theme.sizes.md};
`;

export const Header = styled.View`
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
