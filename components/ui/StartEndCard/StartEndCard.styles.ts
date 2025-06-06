import { theme } from "@/constants/theme";
import styled from "styled-components/native";
import { colors, ElipseColors } from "./StartEndCard.types";

interface ElipseProps {
  elipseColor: ElipseColors;
}

export const TitleWrapper = styled.View`
  flex-direction: row;
  align-items: baseline;
  gap: 8px;
`;

export const StartEndCardWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: ${theme.colors.white};
  width: 100%;
  align-items: center;
  border-radius: ${theme.sizes.md};
  border: 1px solid ${theme.colors.black40};
  padding: ${theme.sizes.smMax} ${theme.sizes.md};
  elevation: 2;
`;

export const Elipse = styled.View<ElipseProps>`
  width: 10px;
  height: 10px;
  background-color: ${({ elipseColor }: ElipseProps) => colors[elipseColor]};
  border-radius: 50%;
`;

export const StartContentWrapper = styled.View`
  align-items: flex-start;
`;
export const ContentWrapper = styled.View`
  align-items: flex-end;
`;

export const StyledTextMedium = styled.Text`
  color: ${theme.colors.black};
  font-family: ${theme.fonts.poppinsMedium};
  font-size: ${theme.sizes.md};
`;
