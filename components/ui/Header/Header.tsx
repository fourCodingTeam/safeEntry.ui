import { theme } from "@/constants/theme";
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
  IconLetter,
  LeftWrapper,
  LetterWrapper,
  StatusTag,
  StyledTouchableOpacity,
} from "./Header.styles";
import { HeaderProps } from "./Header.types";

export function Header({
  pageTitle,
  ableToGoBack = false,
  ableToShowOptions = true,
  isResident = true,
}: HeaderProps) {
  const { username, statusId } = useUserStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const firstLetter = username?.slice(0, 1).toUpperCase();

  const handleOpenMenu = () => {
    setMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  const colorByStatusId =
    statusId === 1
      ? theme.colors.green
      : statusId === 2 || statusId === 3
      ? theme.colors.yellow
      : theme.colors.red;

  return (
    <>
      <HeaderWrapper>
        <LeftWrapper>
          {ableToGoBack && (
            <TouchableOpacity
              onPress={() => router.canGoBack() && router.back()}
              style={{
                width: 24,
                height: 24,
                justifyContent: "center",
                alignItems: "center",
              }}
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
            {isResident ? (
              <>
                <StatusTag color={colorByStatusId} />
                <LetterWrapper>
                  <IconLetter>{firstLetter}</IconLetter>
                </LetterWrapper>
              </>
            ) : (
              <Ionicons
                name="ellipsis-vertical"
                size={18}
                color={theme.colors.black}
              />
            )}
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
