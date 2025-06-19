import { theme } from "@/constants/theme";
import { formatDateLong } from "@/utils/formatDate";
import { formatName } from "@/utils/formatName";
import React from "react";
import { StyledText } from "../styles";
import {
  InfoAndSubInfoWrapper,
  InviteCardWrapper,
  PersonInfoWrapper,
  StatusWrapper,
  StyledDateString,
  TagText,
  TagWrapper,
} from "./ValidatedInviteCard.styles";
import { InviteCardProps } from "./ValidatedInviteCard.types";

export function ValidatedInviteCard({
  personName,
  employeeName,
  houseNumber,
  validated,
  validatedAt,
  visitorName,
  onPress,
}: InviteCardProps) {
  return (
    <InviteCardWrapper activeOpacity={0.8} onPress={onPress}>
      <PersonInfoWrapper>
        <InfoAndSubInfoWrapper>
          <StyledText>Gerado por: {formatName(personName)}</StyledText>
          <StyledDateString>Casa {houseNumber}</StyledDateString>
        </InfoAndSubInfoWrapper>
        <InfoAndSubInfoWrapper>
          <StyledText>Aprovado por: {formatName(employeeName)}</StyledText>
          <StyledDateString>Em {formatDateLong(validatedAt)}</StyledDateString>
        </InfoAndSubInfoWrapper>
        <StyledText>Visitante: {formatName(visitorName)}</StyledText>
      </PersonInfoWrapper>
      <StatusWrapper>
        <StyledText>Status</StyledText>
        <TagWrapper
          color={validated ? theme.colors.blue : theme.colors.midnight60}
        >
          {validated ? (
            <TagText>Validado</TagText>
          ) : (
            <TagText>Não validado</TagText>
          )}
        </TagWrapper>
      </StatusWrapper>
    </InviteCardWrapper>
  );
}
