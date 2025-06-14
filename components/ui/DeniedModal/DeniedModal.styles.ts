import { theme } from "@/constants/theme";
import styled from "styled-components/native";

export const ContentWrapper = styled.View`
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.white};
  height: 100%;
  z-index: 1;
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
  padding: ${theme.sizes.smMax} ${theme.sizes.md};
`;

export const ErrorText = styled.Text`
  color: ${theme.colors.red};
  font-family: ${theme.fonts.poppinsMedium};
  font-size: ${theme.sizes.mdPart};
`;

export const StyledImage = styled.Image`
  width: 100%;
  height: 160px;
  object-fit: contain;
`;
