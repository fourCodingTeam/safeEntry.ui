import { theme } from "@/constants/theme";
import styled from "styled-components/native";

export const TestView = styled.ScrollView``;

export const InviteCardsWrapper = styled.ScrollView`
  width: 100%;
  padding-top: ${theme.sizes.md};
  margin-bottom: ${theme.sizes.lgMax};
  padding-horizontal: ${theme.sizes.md};
`;

export const ImageWrapper = styled.TouchableOpacity`
  width: 100%;
  height: 84px;
  border-radius: ${theme.sizes.md};
  overflow: hidden;
  padding-horizontal: ${theme.sizes.md};
`;

export const StyledImage = styled.Image`
  width: 100%;
  height: 84px;
  object-fit: contain;
`;

export const StyledSectionTitle = styled.Text`
  font-size: ${theme.sizes.mdPart};
  font-family: ${theme.fonts.poppinsNormal};
  color: ${theme.colors.placeholder};
`;
