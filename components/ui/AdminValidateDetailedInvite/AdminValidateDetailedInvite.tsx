import { theme } from "@/constants/theme";
import { InviteResponse } from "@/services/@types";
import {
  getInviteByResidentIdAndVisitorIdAndCode,
  postInviteValidate,
} from "@/services/api";
import { useAddressStore, useUserStore } from "@/stores";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import { Button } from "../Button";
import { Input } from "../Input";
import { StartEndCard } from "../StartEndCard/StartEndCard";
import { ToastProvider, useToast } from "../ToastProvider";
import {
  ButtonsWrapper,
  CardsWrapper,
  ContentWrapper,
  Header,
  Title,
  ValidateCodeTitle,
  ValidateCodeWrapper,
} from "./AdminValidateDetailedInvite.styles";
import { DetailedInviteProps } from "./AdminValidateDetailedInvite.types";

export function AdminValidateDetailedInvite({
  code,
  visitorId,
  residentId,
  visible,
  onClose,
}: DetailedInviteProps) {
  const toast = useToast();
  const [invite, setInvite] = useState<InviteResponse | null>(null);
  const { token, personId } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const qrCodeRef = useRef(null);
  const [validationCode, setValidationCode] = useState(0);

  const { addressId } = useAddressStore();

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
  }, [visible, token, residentId, visitorId, code]);

  if (invite == null) return;

  const formatName = (fullName: string) => {
    const shortName = fullName.trim().split(" ");
    return shortName.slice(0, 2).join(" ");
  };

  const handleValidateInvite = async () => {
    if (
      !token ||
      !residentId ||
      !visitorId ||
      !addressId ||
      !personId ||
      !code
    ) {
      toast.show("Ocorreu um erro ao validar o convite.", 2000, "error");
      return;
    }

    setIsLoading(true);
    try {
      const data = await postInviteValidate(
        token,
        addressId,
        visitorId,
        personId,
        validationCode,
        new Date()
      );

      toast.show(
        "Convite validado com sucesso! Entrada liberada.",
        2000,
        "success"
      );
      onClose();
    } catch (error) {
      toast.show("Código inválido. Tente novamente.", 2000, "error");
      onClose();
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
          {invite && (
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
                <Header>
                  <TouchableOpacity onPress={onClose}>
                    <Ionicons name="chevron-back" size={18} />
                  </TouchableOpacity>
                  <Title>Visita de {formatName(invite.visitorName)}</Title>
                </Header>

                <CardsWrapper>
                  <StartEndCard
                    startTitle="Validade do Convite"
                    startDescription={
                      invite.isActive ? "Convite ativo" : "Convite inativo"
                    }
                  />

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
                  <ValidateCodeWrapper>
                    <ValidateCodeTitle>Código Numérico</ValidateCodeTitle>
                    <Input
                      type="text"
                      value={validationCode}
                      onChange={(value) => setValidationCode(value as number)}
                      placeholder="Digite o código fornecido pelo visitante"
                      label="Código"
                    />
                  </ValidateCodeWrapper>
                </CardsWrapper>
              </View>
              <View
                style={{
                  backgroundColor: theme.colors.white,
                  paddingHorizontal: 16,
                }}
              >
                <ButtonsWrapper>
                  <Button
                    color="blue"
                    text="Validar"
                    onPress={handleValidateInvite}
                    disabled={isLoading}
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
