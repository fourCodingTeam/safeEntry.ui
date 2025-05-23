import { theme } from "@/constants/theme";
import invitesData from "@/mock/invites.json";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import React, { useRef } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { captureRef } from "react-native-view-shot";
import { Button } from "../Button";
import { StartEndCard } from "../StartEndCard/StartEndCard";
import { StyledText } from "../styles";
import { ToastProvider, useToast } from "../ToastProvider";
import {
  ButtonsWrapper,
  CardsWrapper,
  ContentWrapper,
  Header,
  QrCodeShareWrapper,
  QrCodeTextWrapper,
  Title,
} from "./DetailedInvite.styles";

type DetailedInviteProps = {
  visible: boolean;
  inviteId: number;
  onClose: () => void;
};

export function DetailedInvite({
  visible,
  inviteId,
  onClose,
}: DetailedInviteProps) {
  const invite = invitesData.find((item) => item.id === inviteId);
  const toast = useToast();

  if (!invite) return null;

  const formatName = (fullName: string) => {
    const shortName = fullName.trim().split(" ");
    return shortName.slice(0, 2).join(" ");
  };

  const qrCodeRef = useRef(null);

  const onShare = async () => {
    try {
      const uri = await captureRef(qrCodeRef, {
        format: "png",
        quality: 1,
      });

      const fileName = `${FileSystem.cacheDirectory}qr-code.png`;
      await FileSystem.copyAsync({ from: uri, to: fileName });

      const available = await Sharing.isAvailableAsync();
      if (available) {
        await Clipboard.setStringAsync(
          `Convite de ${invite.nome}: ${invite.qrCodeUrl}`
        );
        await Sharing.shareAsync(fileName);
      } else {
        toast.show(
          "Compartilhamento indisponível no dispositivo.",
          3000,
          "error"
        );
      }
    } catch (error) {
      console.error("Erro ao compartilhar QR Code:", error);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <ToastProvider>
        <ContentWrapper>
          <View
            collapsable={false}
            ref={qrCodeRef}
            style={{
              backgroundColor: theme.colors.white,
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
          >
            <Header>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="chevron-back" size={18} />
              </TouchableOpacity>
              <Title>Visita de {formatName(invite.nome)}</Title>
            </Header>
            <CardsWrapper>
              <StartEndCard
                startTitle="Validade do Convite"
                startDescription={
                  invite.ativo ? "Convite ativo" : "Convite inativo"
                }
              />
              <StartEndCard
                startTitle="Inicio da Visita"
                startDescription={new Date(
                  invite.inicioVisita
                ).toLocaleDateString("pt-br", {
                  dateStyle: "short",
                })}
                endTitle="Fim da Visita"
                endDescription={
                  invite.fimVisita
                    ? new Date(invite.fimVisita).toLocaleDateString("pt-br", {
                        dateStyle: "short",
                      })
                    : "Data não disponível"
                }
              />
              <StartEndCard
                startTitle="Duração prevista"
                startDescription={`${invite.duracaoPrevistaDias} dia(s)`}
                endTitle="Duração efetiva"
                endDescription={
                  invite.duracaoEfetivaDias
                    ? `${invite.duracaoEfetivaDias} dia(s)`
                    : "Não calculada"
                }
              />
              <StartEndCard
                startTitle="Motivo da Visita"
                startDescription={invite.motivoVisita}
              />
            </CardsWrapper>
            <QrCodeShareWrapper>
              <QrCodeTextWrapper>
                <StyledText>Escaneie o QR Code para visualizar</StyledText>
                <QRCode
                  value={invite.qrCodeUrl}
                  size={278}
                  backgroundColor={theme.colors.white}
                />
              </QrCodeTextWrapper>
            </QrCodeShareWrapper>
          </View>
          <View
            style={{
              backgroundColor: theme.colors.white,
              paddingHorizontal: 16,
            }}
          >
            <ButtonsWrapper>
              <Button color="blue" text="Compartilhar" onPress={onShare} />
              <Button color="black" text="Desativar" onPress={() => false} />
            </ButtonsWrapper>
          </View>
        </ContentWrapper>
      </ToastProvider>
    </Modal>
  );
}
