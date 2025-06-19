import { theme } from "@/constants/theme";
import styled from "styled-components/native";

export const ContentWrapper = styled.ScrollView`
  background-color: ${theme.colors.white};
  height: 100%;
  z-index: 1;
`;

export const Header = styled.View`
  gap: ${theme.sizes.md};
  flex-direction: row;
  align-items: center;
  justify-content: left;
  margin-bottom: ${theme.sizes.md};
  width: 100%;
  padding: ${theme.sizes.lg} 0 0 0;
`;

export const Title = styled.Text`
  color: ${theme.colors.black};
  font-family: ${theme.fonts.poppinsNormal};
  font-size: ${theme.sizes.mdPart};
`;

export const CardsWrapper = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: ${theme.sizes.sm};
`;

export const ButtonsWrapper = styled.View`
  flex-direction: column;
  gap: ${theme.sizes.sm};
  background-color: ${theme.colors.white};
  width: 100%;
  border-radius: ${theme.sizes.md};
  border: 1px solid ${theme.colors.black40};
  padding: ${theme.sizes.smMax} ${theme.sizes.md};
  elevation: 2;
  margin-bottom: ${theme.sizes.md};
`;

export const ButtonText = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.sizes.md};
  font-family: ${theme.fonts.poppinsMedium};
`;

export const ValidateCodeWrapper = styled.View`
  flex-direction: column;
  gap: ${theme.sizes.md};
  background-color: ${theme.colors.white};
  width: 100%;
  align-items: center;
  border-radius: ${theme.sizes.md};
  border: 1px solid ${theme.colors.black40};
  padding: ${theme.sizes.smMax} ${theme.sizes.md};
  elevation: 2;
`;

export const ValidateCodeTitle = styled.Text`
  color: ${theme.colors.black};
  font-family: ${theme.fonts.poppinsMedium};
  font-size: ${theme.sizes.mdPart};
`;
