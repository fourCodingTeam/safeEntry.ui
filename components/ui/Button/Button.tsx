import { theme } from "@/constants/theme";
import React from "react";
import { ActivityIndicator } from "react-native";
import { ButtonContainer, ButtonText } from "./Button.styles";
import { ButtonProps } from "./Button.types";

export function Button({ color, text, onPress, disabled }: ButtonProps) {
  return (
    <ButtonContainer
      onPress={onPress}
      buttonColor={color}
      activeOpacity={0.8}
      disabled={disabled}
    >
      {disabled ? (
        <ActivityIndicator color={theme.colors.white} size={27} />
      ) : (
        <ButtonText>{text}</ButtonText>
      )}
    </ButtonContainer>
  );
}
