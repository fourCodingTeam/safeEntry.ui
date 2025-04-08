import React from "react";
import {
  InviteCardWrapper,
  PersonInfoWrapper,
  StatusWrapper,
  StyledDateString,
  StyledText,
} from "./InviteCard.styles";
import { InviteCardProps } from "./InviteCard.types";
import { Tag } from "../Tag";

export function InviteCard({
  personName,
  inviteDate,
  status,
}: InviteCardProps) {
  return (
    <InviteCardWrapper>
      <PersonInfoWrapper>
        <StyledText>{personName}</StyledText>
        <StyledDateString>{inviteDate}</StyledDateString>
      </PersonInfoWrapper>
      <StatusWrapper>
        <StyledText>Status</StyledText>
        <Tag active={status} />
      </StatusWrapper>
    </InviteCardWrapper>
  );
}
