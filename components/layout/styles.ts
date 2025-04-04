import { theme } from "@/constants/theme";
import styled from "styled-components/native";

export const PageContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-vertical: ${theme.sizes.xl};
  padding-horizontal: ${theme.sizes.mdMax};
  gap: ${theme.sizes.lgMax};
`;
