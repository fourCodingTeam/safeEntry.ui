import { useUserStore } from "@/stores";
import { useRouter } from "expo-router";
import React from "react";
import {
  HeaderText,
  HeaderWrapper,
  IconLetter,
  StyledTouchableOpacity,
} from "./Header.styles";
import { HeaderProps } from "./Header.types";

export function Header({ userName, pageTitle }: HeaderProps) {
  const router = useRouter();
  const username = useUserStore((state) => state.username);

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
      >
        <IconLetter>{username.slice(0, 1).toUpperCase()}</IconLetter>
      </StyledTouchableOpacity>
    </HeaderWrapper>
  );
}
