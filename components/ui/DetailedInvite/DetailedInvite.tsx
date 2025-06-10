import { theme } from "@/constants/theme";
import { InviteResponse } from "@/services/@types";
import {
  getInviteByResidentIdAndVisitorIdAndCode,
  putActivateInvite,
  putDeactivateInvite,
} from "@/services/api";
import { useUserStore } from "@/stores";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import React, { useEffect, useRef, useState } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { captureRef } from "react-native-view-shot";
import { Button } from "../Button";
import { Loader } from "../Loader";
import { StartEndCard } from "../StartEndCard/StartEndCard";
import { StyledText } from "../styles";
import { ToastProvider, useToast } from "../ToastProvider";
import {
  ButtonsWrapper,
  CardsWrapper,
  Code,
  CodeWrapper,
  ContentWrapper,
  Header,
  QrCodeShareWrapper,
  QrCodeTextWrapper,
  Title,
} from "./DetailedInvite.styles";
import { DetailedInviteProps } from "./DetailedInvite.types";

export function DetailedInvite({
  code,
  visitorId,
  residentId,
  visible,
  onClose,
}: DetailedInviteProps) {
  const toast = useToast();
  const [invite, setInvite] = useState<InviteResponse | null>(null);
  const [hideItem, setHideItem] = useState(false);
  const { token, username } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const qrCodeRef = useRef(null);
  const [refreshFlag, setRefreshFlag] = useState(0);

  useEffect(() => {
    const fetchInvite = async () => {
      if (!token || !residentId || !visitorId || !code) return;
      setIsLoading(true);
      try {
        const data = await getInviteByResidentIdAndVisitorIdAndCode(
          token,
          residentId,
          visitorId,
          code
        );
        console.log(data);
        setInvite(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do convite:", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (visible) {
      fetchInvite();
    } else {
      setInvite(null);
    }
  }, [visible, token, residentId, visitorId, code, refreshFlag]);

  if (invite == null) return;

  const qrData = {
    addressId: invite.addressId,
    visitorId: invite.visitorId,
    code: invite.code,
  };

  const formatName = (fullName: string) => {
    const shortName = fullName.trim().split(" ");
    return shortName.slice(0, 2).join(" ");
  };

  const onShare = async () => {
    try {
      setHideItem(true);

      await new Promise((resolve) => setTimeout(resolve, 1));

      const uri = await captureRef(qrCodeRef, {
        format: "png",
        quality: 1,
      });

      const fileName = `${FileSystem.cacheDirectory}qr-code.png`;
      await FileSystem.copyAsync({ from: uri, to: fileName });

      const available = await Sharing.isAvailableAsync();
      if (available) {
        await Clipboard.setStringAsync(
          `Convite de ${invite?.code}: ${invite?.justification}`
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
    } finally {
      setHideItem(false);
    }
  };

  const handleDeactivateInvite = async () => {
    if (!token || !invite || !visitorId || !code) return;
    setIsLoading(true);
    try {
      await putDeactivateInvite(token, invite.addressId, visitorId, code);
      setRefreshFlag((prev) => prev + 1);
    } catch (error) {
      console.error("Erro ao desativar o convite:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActivateInvite = async () => {
    if (!token || !invite || !visitorId || !code) return;
    setIsLoading(true);
    try {
      await putActivateInvite(token, invite.addressId, visitorId, code);
      setRefreshFlag((prev) => prev + 1);
    } catch (error) {
      console.error("Erro ao ativar o convite:", error);
    } finally {
      setIsLoading(false);
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
          {!invite || isLoading ? (
            <Loader />
          ) : (
            <>
              <View
                collapsable={false}
                ref={qrCodeRef}
                style={{
                  backgroundColor: theme.colors.white,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                }}
              >
                {!hideItem && (
                  <Header>
                    <TouchableOpacity onPress={onClose}>
                      <Ionicons name="chevron-back" size={18} />
                    </TouchableOpacity>
                    <Title>Visita de {formatName(invite.visitorName)}</Title>
                  </Header>
                )}

                {hideItem && username !== null && (
                  <Header>
                    <Title>Convite feito por {formatName(username)}</Title>
                  </Header>
                )}

                <CardsWrapper>
                  {!hideItem && (
                    <StartEndCard
                      startTitle="Validade do Convite"
                      startDescription={
                        invite.isActive ? "Convite ativo" : "Convite inativo"
                      }
                    />
                  )}
                  <StartEndCard
                    startTitle="Inicio da Visita"
                    startDescription={new Date(
                      invite.startDate
                    ).toLocaleDateString("pt-br", {
                      dateStyle: "short",
                    })}
                    endTitle="Duração da Visita"
                    endDescription={`${invite.daysToExpiration} dias`}
                  />
                  <StartEndCard
                    startTitle="Motivo da Visita"
                    startDescription={invite.justification}
                  />

                  <QrCodeShareWrapper>
                    <QrCodeTextWrapper>
                      {!hideItem ? (
                        <StyledText>QR Code</StyledText>
                      ) : (
                        <StyledText>
                          Apresente este QR Code na entrada
                        </StyledText>
                      )}
                      <QRCode
                        value={JSON.stringify(qrData)}
                        size={278}
                        backgroundColor={theme.colors.white}
                      />
                    </QrCodeTextWrapper>
                    <CodeWrapper>
                      {!hideItem ? (
                        <StyledText>Código numérico</StyledText>
                      ) : (
                        <StyledText>Ou informe este código:</StyledText>
                      )}
                      <Code>{invite.code}</Code>
                    </CodeWrapper>
                  </QrCodeShareWrapper>
                </CardsWrapper>
              </View>

              <View
                style={{
                  backgroundColor: theme.colors.white,
                  paddingHorizontal: 16,
                }}
              >
                <ButtonsWrapper>
                  <Button color="blue" text="Compartilhar" onPress={onShare} />
                  <Button
                    color={invite.isActive ? "black" : "blue"}
                    text={invite.isActive ? "Desativar" : "Ativar"}
                    onPress={
                      invite.isActive
                        ? handleDeactivateInvite
                        : handleActivateInvite
                    }
                  />
                </ButtonsWrapper>
              </View>
            </>
          )}
        </ContentWrapper>
      </ToastProvider>
    </Modal>
  );
}
