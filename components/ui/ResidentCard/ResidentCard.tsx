import { StatusEnum } from "@/constants/roleEunm";
import { theme } from "@/constants/theme";
import { formatPhoneNumber } from "@/utils/fomrmatPhoneNumber";
import { formatName } from "@/utils/formatName";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Linking } from "react-native";
import {
  CardWrapper,
  ContactTag,
  ContactTagWhatsapp,
  ContactTextWhite,
  IconWrapper,
  InfoWrapper,
  InfoWrapperEnd,
  ResidentName,
  ResidentPhoneNumber,
  ResidentStatus,
  Row,
  StatusTag,
} from "./ResidentCard.styles";
import { ResidentCardProps } from "./ResidentCard.types";

export function ResidentCard({ name, phoneNumber, status }: ResidentCardProps) {
  const getStatusDescription = (status: number): string => {
    switch (status) {
      case 1:
        return StatusEnum.Disponivel;
      case 2:
        return StatusEnum.AguardandoEntrega;
      case 3:
        return StatusEnum.AguardandoVisita;
      case 4:
        return StatusEnum.NaoQueroReceberVisitas;
      default:
        return "Status desconhecido";
    }
  };

  const openWhatsApp = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    console.log(phoneNumber);
    Linking.openURL(whatsappUrl).catch((err) =>
      console.error("Erro ao abrir o WhatsApp:", err)
    );
  };

  const makeCall = () => {
    const telUrl = `tel:${phoneNumber}`;
    Linking.openURL(telUrl).catch((err) =>
      console.error("Erro ao fazer a ligação:", err)
    );
  };

  return (
    <CardWrapper>
      <Row>
        <InfoWrapper>
          <ResidentName>{formatName(name)}</ResidentName>
          <ResidentPhoneNumber>
            {formatPhoneNumber(phoneNumber.toString())}
          </ResidentPhoneNumber>
        </InfoWrapper>
        <InfoWrapperEnd>
          <ResidentName>Status</ResidentName>
          <StatusTag>
            <ResidentStatus>{getStatusDescription(status)}</ResidentStatus>
          </StatusTag>
        </InfoWrapperEnd>
      </Row>
      <IconWrapper>
        <ContactTagWhatsapp
          onPress={openWhatsApp}
          activeOpacity={0.6}
          disabled={status === 4}
        >
          <Ionicons name="logo-whatsapp" size={20} color={theme.colors.white} />
          <ContactTextWhite>WhatsApp</ContactTextWhite>
        </ContactTagWhatsapp>
        <ContactTag
          onPress={makeCall}
          activeOpacity={0.6}
          disabled={status === 4}
        >
          <Ionicons
            name="call"
            size={20}
            color={theme.colors.white}
            disabled={status === 4}
          />
          <ContactTextWhite>Ligar</ContactTextWhite>
        </ContactTag>
      </IconWrapper>
    </CardWrapper>
  );
}
