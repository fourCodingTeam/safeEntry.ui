import { theme } from "@/constants/theme";
import { useUserStore } from "@/stores";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { StyledText } from "../styles";
import { ContentWrapper, Header, OptionsWrapper, Title } from "./Menu.styles";
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
                      <Pressable
                        onPress={handleOpenPreferences}
                        android_ripple={{ color: "rgba(0,0,0,0.1)" }}
                        style={({ pressed }) => ({
                          width: "100%",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                          padding: 20,
                          backgroundColor: pressed
                            ? "rgba(0,0,0,0.05)"
                            : "transparent",
                        })}
                      >
                        <Ionicons name="build" size={18} />
                        <StyledText>Preferências</StyledText>
                      </Pressable>
                    )}

                    <Pressable
                      onPress={handleLogout}
                      android_ripple={{ color: "rgba(0,0,0,0.1)" }}
                      style={({ pressed }) => ({
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                        padding: 20,
                        backgroundColor: pressed
                          ? "rgba(0,0,0,0.05)"
                          : "transparent",
                      })}
                    >
                      <Ionicons
                        name="exit"
                        size={18}
                        color={theme.colors.red}
                      />
                      <StyledText style={{ color: theme.colors.red }}>
                        Sair
                      </StyledText>
                    </Pressable>
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
