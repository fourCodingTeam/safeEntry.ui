import { theme } from "@/constants/theme";
import styled from "styled-components/native";

export const PageContainer = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.white};
  align-items: center;
  justify-content: flex-start;
  gap: ${theme.sizes.md};
`;
