import { theme } from "@/constants/theme";
import { useUserStore } from "@/stores";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { StyledText } from "../styles";
import {
  ContentWrapper,
  Header,
  OptionsWrapper,
  StyledMenuOption,
  Title,
} from "./Menu.styles";
import { MenuProps } from "./Menu.types";

export function Menu({ visible, onClose, isResident }: MenuProps) {
  const { setUsername, setRole, setToken } = useUserStore();
  const router = useRouter();

  const handleOpenPreferences = () => {
    router.push("/preferences");
    onClose();
  };

  const handleLogout = () => {
    setUsername(null);
    setRole(null);
    setToken(null);
    router.replace("/auth");
  };
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={{ flex: 1 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1, justifyContent: "flex-end" }}
          >
            <TouchableWithoutFeedback onPress={() => {}}>
              <View>
                <ContentWrapper>
                  <Header>
                    <TouchableOpacity onPress={onClose}>
                      <Ionicons name="chevron-back" size={18} />
                    </TouchableOpacity>
                    <Title>Opções</Title>
                  </Header>
                  <OptionsWrapper>
                    {isResident && (
                      <StyledMenuOption
                        activeOpacity={0.5}
                        onPress={handleOpenPreferences}
                      >
                        <Ionicons name="options" size={18} />
                        <StyledText>Preferências</StyledText>
                      </StyledMenuOption>
                    )}
                    <StyledMenuOption
                      activeOpacity={0.8}
                      onPress={handleLogout}
                    >
                      <Ionicons
                        name="log-out-outline"
                        size={18}
                        color={theme.colors.black}
                      />
                      <StyledText>Sair</StyledText>
                    </StyledMenuOption>
                  </OptionsWrapper>
                </ContentWrapper>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
