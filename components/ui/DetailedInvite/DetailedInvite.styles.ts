import { theme } from "@/constants/theme";
import styled from "styled-components/native";

export const ContentWrapper = styled.View`
  align-items: center;
  justify-content: center;
  gap: ${theme.sizes.md};
`;

export const Header = styled.View`
  padding-left: ${theme.sizes.lg};
  gap: ${theme.sizes.md};
  align-items: left;
  width: 100%;
`;

export const Title = styled.Text`
  color: ${theme.colors.black};
  font-family: ${theme.fonts.poppinsNormal};
  font-size: ${theme.sizes.mdMax};
`;

export const CardsWrapper = styled.View`
  align-items: center;
  justify-content: center;
  width: 90%;
  gap: ${theme.sizes.md};
`;

export const ButtonsWrapper = styled.View`
  padding-horizontal: ${theme.sizes.md};
  width: 100%;
  gap: ${theme.sizes.md};
`;

export const ButtonText = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.sizes.md};
  font-family: ${theme.fonts.poppinsMedium};
`;
