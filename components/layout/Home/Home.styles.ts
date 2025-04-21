import { theme } from "@/constants/theme";
import styled from "styled-components/native";

export const TestView = styled.ScrollView``;

export const InviteCardsWrapper = styled.View`
  width: 100%;
  gap: ${theme.sizes.sm};
`;

export const ImageWrapper = styled.TouchableOpacity`
  width: 100%;
  height: 84px;
  border-radius: ${theme.sizes.md};
  overflow: hidden;
`;

export const StyledImage = styled.Image`
  width: 100%;
  height: 84px;
`;

export const StyledSectionTitle = styled.Text`
  font-size: ${theme.sizes.mdMax};
  font-family: ${theme.fonts.poppinsNormal};
  color: ${theme.colors.placeholder};
`;
