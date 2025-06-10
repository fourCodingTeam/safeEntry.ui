import { theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import { Button } from "../Button";
import { ToastProvider } from "../ToastProvider";
import {
  ButtonsWrapper,
  CardsWrapper,
  ContentWrapper,
  ErrorText,
  Header,
  StyledImage,
  Title,
} from "./DeniedModal.styles";
import { DeniedModalProps } from "./DeniedModal.types";

export function DeniedModal({
  visible,
  onClose,
  message,
  resetScanner,
}: DeniedModalProps) {
  const router = useRouter();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <ToastProvider>
        <View
          collapsable={false}
          style={{
            backgroundColor: theme.colors.white,
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
        >
          <Header>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={18} />
            </TouchableOpacity>
            <Title>Visita Recusada</Title>
          </Header>
          <ContentWrapper>
            <CardsWrapper>
              <ErrorText>{message}</ErrorText>
              <StyledImage
                source={require("@/assets/images/DeniedInvite.png")}
              />
              <ButtonsWrapper>
                <Button
                  color="blue"
                  text="Ler Novamente"
                  onPress={resetScanner}
                />
                <Button
                  color="black"
                  text="Voltar ao Inicio"
                  onPress={resetScanner}
                />
              </ButtonsWrapper>
            </CardsWrapper>
          </ContentWrapper>
        </View>
      </ToastProvider>
    </Modal>
  );
}
