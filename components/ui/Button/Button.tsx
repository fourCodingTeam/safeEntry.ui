import React from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { ButtonProps, colors } from "./Button.types";
import { ButtonContainer, ButtonText } from "./Button.styles";

export function Button({ color, text }: ButtonProps) {
  const baseColor = colors[color];
  const touchedColor =
    colors[
      `touched${
        color.charAt(0).toUpperCase() + color.slice(1)
      }` as keyof typeof colors
    ];

  const pressed = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(pressed.value ? touchedColor : baseColor, {
        duration: 100,
      }),
      transform: [
        {
          scale: withTiming(pressed.value ? 0.99 : 1, { duration: 100 }),
        },
      ],
    };
  });

  return (
    <ButtonContainer
      style={[animatedStyle]}
      onTouchStart={() => (pressed.value = true)}
      onTouchEnd={() => (pressed.value = false)}
    >
      <ButtonText>{text}</ButtonText>
    </ButtonContainer>
  );
}
