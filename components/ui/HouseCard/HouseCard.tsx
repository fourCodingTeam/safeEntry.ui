import { theme } from "@/constants/theme";
import React from "react";
import { StyledText } from "../styles";
import {
  HouseCardWrapper,
  PersonInfoWrapper,
  StatusWrapper,
  StyledOwnerText,
  TagText,
  TagWrapper,
} from "./HouseCard.styles";
import { HouseCardProps } from "./HouseCard.types";

export function HouseCard({
  houseNumber,
  activeInvites,
  houseOwnerName,
  onPress,
}: HouseCardProps) {
  return (
    <HouseCardWrapper activeOpacity={0.8} onPress={onPress}>
      <PersonInfoWrapper>
        <StyledText>Casa N. {houseNumber}</StyledText>
        <StyledOwnerText>{houseOwnerName}</StyledOwnerText>
      </PersonInfoWrapper>
      <StatusWrapper>
        <StyledText>Convites Ativos</StyledText>
        <TagWrapper
          color={
            activeInvites > 0 ? theme.colors.blue : theme.colors.placeholder
          }
        >
          <TagText>
            {activeInvites > 0 ? `${activeInvites} Convites` : `Sem convites`}
          </TagText>
        </TagWrapper>
      </StatusWrapper>
    </HouseCardWrapper>
  );
}
