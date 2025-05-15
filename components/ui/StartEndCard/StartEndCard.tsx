import React from "react";
import { StyledText } from "../styles";
import {
  ContentWrapper,
  Elipse,
  StartContentWrapper,
  StartEndCardWrapper,
  StyledTextMedium,
  TitleWrapper,
} from "./StartEndCard.styles";
import { StartEndCardProps } from "./StartEndCard.types";

export function StartEndCard({
  startDescription,
  startTitle,
  endDescription,
  endTitle,
}: StartEndCardProps) {
  return (
    <StartEndCardWrapper>
      <StartContentWrapper>
        <TitleWrapper>
          <Elipse elipseColor={"blue"} />
          <StyledTextMedium>{startTitle}</StyledTextMedium>
        </TitleWrapper>
        <StyledText>{startDescription}</StyledText>
      </StartContentWrapper>
      {endTitle && endDescription && (
        <ContentWrapper>
          <TitleWrapper>
            <Elipse elipseColor={"midnight"} />
            <StyledTextMedium>{endTitle}</StyledTextMedium>
          </TitleWrapper>
          <StyledText>{endDescription}</StyledText>
        </ContentWrapper>
      )}
    </StartEndCardWrapper>
  );
}
