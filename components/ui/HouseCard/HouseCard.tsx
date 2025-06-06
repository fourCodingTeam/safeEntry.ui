import { theme } from "@/constants/theme";
import React from "react";
import { StyledText } from "../styles";
import {
  InviteCardWrapper,
  PersonInfoWrapper,
  StatusWrapper,
  TagText,
  TagWrapper,
} from "./HouseCard.styles";
import { InviteCardProps } from "./HouseCard.types";

export function HouseCard({
  houseNumber,
  activeInvites,
  onPress,
}: InviteCardProps) {
  return (
    <InviteCardWrapper activeOpacity={0.8} onPress={onPress}>
      <PersonInfoWrapper>
        <StyledText>Casa N.{houseNumber}</StyledText>
      </PersonInfoWrapper>
      <StatusWrapper>
        <StyledText>Convites Ativos</StyledText>
        <TagWrapper
          color={
            activeInvites > 1 ? theme.colors.blue : theme.colors.placeholder
          }
        >
          <TagText>
            {activeInvites > 1 ? `${activeInvites} Convites` : `Sem convites`}
          </TagText>
        </TagWrapper>
      </StatusWrapper>
    </InviteCardWrapper>
  );
}
