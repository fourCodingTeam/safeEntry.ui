import React from "react";
import { HeaderProps } from "./Header.types";
import { HeaderWrapper, HeaderText } from "./Header.styles";
import { Image } from "react-native";

export function Header({ isGreeting, userName, pageTitle }: HeaderProps) {
  return (
    <HeaderWrapper>
      {isGreeting ? (
        <HeaderText>Olá, {userName}</HeaderText>
      ) : (
        <HeaderText>{pageTitle}</HeaderText>
      )}
      <Image source={require("@/assets/icons/logo.png")} />
    </HeaderWrapper>
  );
}
