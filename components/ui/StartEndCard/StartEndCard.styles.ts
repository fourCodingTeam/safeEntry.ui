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
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.colors.white};
  width: 100%;
  height: 82px;
  align-items: center;
  shadowcolor: ${theme.colors.blue};
  elevation: 16;
  border-radius: ${theme.sizes.md};
  padding: ${theme.sizes.md} ${theme.sizes.lg};
`;

export const Elipse = styled.View<ElipseProps>`
  width: 10px;
  height: 10px;
  background-color: ${({ elipseColor }: ElipseProps) => colors[elipseColor]};
  border-radius: 50%;
`;

export const ContentWrapper = styled.View``;

export const StyledTextMedium = styled.Text`
  color: ${theme.colors.black};
  font-family: ${theme.fonts.poppinsMedium};
  font-size: ${theme.sizes.md};
`;
