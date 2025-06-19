import React from "react";
import { StyledIcon } from "./Icon.styles";
import { IconProps } from "./Icon.types";

const icons = {
  house: require("@/assets/icons/house-icon.png"),
  clock: require("@/assets/icons/clock-icon.png"),
  plus: require("@/assets/icons/plus-icon.png"),
  qr: require("@/assets/icons/qr-icon.png"),
  ticket: require("@/assets/icons/ticket-icon.png"),
  icon: require("@/assets/icons/logo.png"),
  back: require("@/assets/icons/back-icon.png"),
  housePerson: require("@/assets/icons/house-chimney-user-solid.png"),
};

export function Icon({ name, color }: IconProps) {
  const source = icons[name as keyof typeof icons] || icons.house;

  return <StyledIcon source={source} tintColor={color} />;
}
