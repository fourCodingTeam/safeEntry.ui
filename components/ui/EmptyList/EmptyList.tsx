import React from "react";
import { StyledText } from "../styles";
import { EmptyListView, StyledImage } from "./EmptyList.styles";

export function EmptyList() {
  return (
    <EmptyListView>
      <StyledText>Não há convites aqui!</StyledText>
      <StyledImage source={require("@/assets/images/EmptyState.png")} />
    </EmptyListView>
  );
}
