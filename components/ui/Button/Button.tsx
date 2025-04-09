import React from "react";
import { ButtonProps, colors } from "./Button.types";
import { ButtonContainer, ButtonText } from "./Button.styles";

export function Button({ color, text, onPress }: ButtonProps) {
  return (
    <ButtonContainer
      onPress={onPress}
      buttonColor={color}
      activeOpacity={0.8}
    >
      <ButtonText>{text}</ButtonText>
    </ButtonContainer>
  );
}
