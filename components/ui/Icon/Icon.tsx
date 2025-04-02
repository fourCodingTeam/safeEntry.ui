import React from "react";
import { Image } from "react-native";
import { IconProps } from "./Icon.types";
import { theme } from "@/constants/theme";
import { StyledIcon } from "./Icon.styles";

const icons = {
  house: require("@/assets/icons/house-icon.png"),
  clock: require("@/assets/icons/clock-icon.png"),
  plus: require("@/assets/icons/plus-icon.png"),
  qr: require("@/assets/icons/qr-icon.png"),
};

export function Icon({ name, color }: IconProps) {
  const source = icons[name as keyof typeof icons] || icons.house;

  return <StyledIcon source={source} tintColor={color} />;
}
