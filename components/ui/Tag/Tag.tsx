import React from "react";
import { TagProps } from "./Tag.types";
import { TagText, TagWrapper } from "./Tag.styles";
import { theme } from "@/constants/theme";
import { View } from "react-native";

export function Tag({ active }: TagProps) {
  return (
    <TagWrapper color={active ? theme.colors.blue : theme.colors.midnight60}>
      {active ? <TagText>Ativo</TagText> : <TagText>Inativo</TagText>}
    </TagWrapper>
  );
}
