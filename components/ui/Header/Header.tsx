import { useRouter } from "expo-router";
import React from "react";
import {
  HeaderText,
  HeaderWrapper,
  StyledTouchableOpacity,
} from "./Header.styles";
import { HeaderProps } from "./Header.types";

export function Header({ userName, pageTitle }: HeaderProps) {
  const router = useRouter();

  return (
    <HeaderWrapper>
      {userName ? (
        <HeaderText>Olá, {userName}</HeaderText>
      ) : (
        <HeaderText>{pageTitle}</HeaderText>
      )}
      <StyledTouchableOpacity
        onPress={() => {
          router.canGoBack() ? router.back() : router.push("/");
        }}
      ></StyledTouchableOpacity>
    </HeaderWrapper>
  );
}
