import { theme } from "@/constants/theme";
import styled from "styled-components/native";

export const FiltersWrapper = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: ${theme.sizes.sm};
  padding-horizontal: ${theme.sizes.md};
`;

export const InviteCardsWrapper = styled.ScrollView`
  width: 100%;
  margin-bottom: 8px;
  padding-horizontal: ${theme.sizes.md};
`;
export const MoradoresCardWrapper = styled.ScrollView`
  width: 100%;
  min-height: 180px;
  max-height: 190px;
  padding-horizontal: ${theme.sizes.md};
`;

export const ImageWrapper = styled.View`
  width: 100%;
  height: 400px;
  border-radius: ${theme.sizes.md};
  overflow: hidden;
  padding-horizontal: ${theme.sizes.md};
`;

export const StyledImage = styled.Image`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
