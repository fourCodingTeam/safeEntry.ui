import { useUserStore } from "@/stores";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Menu } from "../Menu";
import {
  HeaderText,
  HeaderWrapper,
  StyledTouchableOpacity,
} from "./Header.styles";
import { HeaderProps } from "./Header.types";

export function Header({ pageTitle }: HeaderProps) {
  const username = useUserStore((state) => state.username);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    setMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <HeaderWrapper>
        {username ? (
          <HeaderText>Olá, {username}</HeaderText>
        ) : (
          <HeaderText>{pageTitle}</HeaderText>
        )}
        <StyledTouchableOpacity onPress={handleOpenMenu}>
          <Ionicons name="ellipsis-vertical" size={18} />
        </StyledTouchableOpacity>
      </HeaderWrapper>
      <Menu visible={menuOpen} onClose={handleCloseMenu} />
    </>
  );
}
