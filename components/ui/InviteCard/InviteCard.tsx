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
