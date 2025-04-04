import React from "react";
import { IconProps } from "./Icon.types";
import { StyledIcon } from "./Icon.styles";

const icons = {
  house: require("@/assets/icons/house-icon.png"),
  clock: require("@/assets/icons/clock-icon.png"),
  plus: require("@/assets/icons/plus-icon.png"),
  qr: require("@/assets/icons/qr-icon.png"),
  icon: require("@/assets/icons/logo.png"),
};

export function Icon({ name, color }: IconProps) {
  const source = icons[name as keyof typeof icons] || icons.house;

  return <StyledIcon source={source} tintColor={color} />;
}
