import { useUserStore } from "@/stores";
import { formatName } from "@/utils/formatName";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Menu } from "../Menu";
import {
  HeaderText,
  HeaderWrapper,
  LeftWrapper,
  StyledTouchableOpacity,
} from "./Header.styles";
import { HeaderProps } from "./Header.types";

export function Header({
  pageTitle,
  ableToGoBack = false,
  ableToShowOptions = true,
  isResident = true,
}: HeaderProps) {
  const username = useUserStore((state) => state.username);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleOpenMenu = () => {
    setMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <HeaderWrapper>
        <LeftWrapper>
          {ableToGoBack && (
            <TouchableOpacity
              onPress={() => router.canGoBack() && router.back()}
            >
              <Ionicons name="chevron-back" size={18} />
            </TouchableOpacity>
          )}
          {!pageTitle ? (
            <HeaderText>Olá, {formatName(username)}</HeaderText>
          ) : (
            <HeaderText>{pageTitle}</HeaderText>
          )}
        </LeftWrapper>
        {ableToShowOptions && (
          <StyledTouchableOpacity onPress={handleOpenMenu}>
            <Ionicons name="ellipsis-vertical" size={18} />
          </StyledTouchableOpacity>
        )}
      </HeaderWrapper>
      <Menu
        visible={menuOpen}
        onClose={handleCloseMenu}
        isResident={isResident}
      />
    </>
  );
}
