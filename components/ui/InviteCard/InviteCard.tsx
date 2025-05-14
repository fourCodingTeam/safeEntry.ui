import React from "react";
import { StyledText } from "../styles";
import { Tag } from "../Tag";
import {
  InviteCardWrapper,
  PersonInfoWrapper,
  StatusWrapper,
  StyledDateString,
} from "./InviteCard.styles";
import { InviteCardProps } from "./InviteCard.types";

export function InviteCard({
  personName,
  inviteDate,
  status,
}: InviteCardProps) {
  const formatDate = (dateString: string) => {
    const formattedDate = new Date(dateString).toLocaleDateString("pt-BR", {
      dateStyle: "short",
    });
    return formattedDate;
  };

  const formatName = (fullName: string) => {
    const shortName = fullName.trim().split(" ");
    return shortName.slice(0, 2).join(" ");
  };

  return (
    <InviteCardWrapper>
      <PersonInfoWrapper>
        <StyledText>{formatName(personName)}</StyledText>
        <StyledDateString>{formatDate(inviteDate)}</StyledDateString>
      </PersonInfoWrapper>
      <StatusWrapper>
        <StyledText>Status</StyledText>
        <Tag active={status} />
      </StatusWrapper>
    </InviteCardWrapper>
  );
}
