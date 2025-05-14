import { theme } from "@/constants/theme";
import styled from "styled-components/native";

export const FiltersWrapper = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${theme.sizes.sm};
  padding-horizontal: ${theme.sizes.md};
`;

export const InviteCardsWrapper = styled.ScrollView`
  width: 100%;
  margin-bottom: 96px;
  padding-horizontal: ${theme.sizes.md};
`;
