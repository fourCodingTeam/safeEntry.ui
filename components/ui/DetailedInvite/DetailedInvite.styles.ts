import { theme } from "@/constants/theme";
import styled from "styled-components/native";

export const ContentWrapper = styled.View`
  background-color: ${theme.colors.white};
  align-items: center;
  justify-content: flex-start;
  padding: ${theme.sizes.md};
  gap: ${theme.sizes.md};
  height: 100%;
`;

export const StyledScrollView = styled.ScrollView``;

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
  width: 100%;
  gap: ${theme.sizes.sm};
`;

export const ButtonText = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.sizes.md};
  font-family: ${theme.fonts.poppinsMedium};
`;

export const QrCodeShareWrapper = styled.View`
  flex-direction: column;
  align-items: center;
  gap: ${theme.sizes.md};
  background-color: ${theme.colors.white};
  width: 100%;
  align-items: center;
  border-radius: ${theme.sizes.md};
  border: 1px solid ${theme.colors.black40};
  padding: ${theme.sizes.smMax} ${theme.sizes.md};
  elevation: 2;
`;
