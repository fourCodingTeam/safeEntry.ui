import React from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import { Button } from "../Button";
import { StartEndCard } from "../StartEndCard/StartEndCard";
import {
  ButtonsWrapper,
  CardsWrapper,
  ContentWrapper,
  Header,
  Title,
} from "./DetailedInvite.styles";
import { DetailedInviteProps } from "./DetailedInvite.types";

export function DetailedInvite({
  visible,
  onClose,
  invitedPersonName,
}: DetailedInviteProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <ContentWrapper>
        <Header>
          <TouchableOpacity onPress={() => onClose()}>
            <Image source={require("@/assets/icons/back-icon.png")} />
          </TouchableOpacity>
          <Title>Visita de {invitedPersonName}</Title>
        </Header>
        <CardsWrapper>
          <StartEndCard
            startTitle={"Validade do Convite"}
            startDescription={"Convite ativo"}
          />
          <StartEndCard
            startTitle={"Inicio da Visita"}
            startDescription={"27 Fev, 2025 às 14:40"}
            endTitle={"Fim da Visita"}
            endDescription={"07 Mar, 2025 às 15:40"}
          />
          <StartEndCard
            startTitle={"Duracão prevista"}
            startDescription={"10 dias"}
            endTitle={"Duracão Efetiva"}
            endDescription={"12 dias"}
          />
          <StartEndCard
            startTitle={"Motivo da Visita"}
            startDescription={"Festa de Aniversario"}
          />
        </CardsWrapper>
        <View>
          <Text>QR CODE</Text>
        </View>
        <ButtonsWrapper>
          <Button color={"blue"} text={"Compartilhar"} onPress={() => false} />
          <Button color={"black"} text={"Desativar"} onPress={() => false} />
        </ButtonsWrapper>
      </ContentWrapper>
    </Modal>
  );
}
