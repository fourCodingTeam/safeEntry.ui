import React from "react";
import { Text } from "react-native";
import { ButtonProps } from "./Button.types";
import { ButtonContainer } from "./Button.styles";

export function Button({ color, text }: ButtonProps) {
  return (
    <ButtonContainer color={color}>
      <Text>{text}</Text>
    </ButtonContainer>
  );
}
