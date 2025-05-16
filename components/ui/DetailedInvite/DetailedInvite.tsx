import { theme } from "@/constants/theme";
import invitesData from "@/mock/invites.json";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { Button } from "../Button";
import { StartEndCard } from "../StartEndCard/StartEndCard";
import {
  ButtonsWrapper,
  CardsWrapper,
  ContentWrapper,
  Header,
  QrCodeShareWrapper,
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

  if (!invite) return null;

  const formatName = (fullName: string) => {
    const shortName = fullName.trim().split(" ");
    return shortName.slice(0, 2).join(" ");
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <ContentWrapper>
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
            startDescription={new Date(invite.inicioVisita).toLocaleDateString(
              "pt-br",
              {
                dateStyle: "short",
              }
            )}
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
          <QRCode
            value={invite.qrCodeUrl}
            size={200}
            backgroundColor={theme.colors.white}
          />
          <ButtonsWrapper>
            <Button color="blue" text="Compartilhar" onPress={() => false} />
            <Button color="black" text="Desativar" onPress={() => false} />
          </ButtonsWrapper>
        </QrCodeShareWrapper>
      </ContentWrapper>
    </Modal>
  );
}
