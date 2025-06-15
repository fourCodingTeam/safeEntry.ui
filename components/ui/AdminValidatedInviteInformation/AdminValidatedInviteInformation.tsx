import { theme } from "@/constants/theme";
import { InviteResponse } from "@/services/@types";
import { getInviteByResidentIdAndVisitorIdAndCode } from "@/services/api";
import { useUserStore } from "@/stores";
import { formatDateLong } from "@/utils/formatDate";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import { Loader } from "../Loader";
import { StartEndCard } from "../StartEndCard/StartEndCard";
import { ToastProvider } from "../ToastProvider";
import {
  CardsWrapper,
  ContentWrapper,
  Header,
  Title,
} from "./AdminValidatedInviteInformation.styles";
import { DetailedInviteProps } from "./AdminValidatedInviteInformation.types";

export function AdminValidatedInviteInformation({
  code,
  homeDescription,
  createdByResidentId,
  createdByResidentName,
  visitorId,
  visitorName,
  employeeName,
  inviteExpirationDate,
  validatedAt,
  approval,
  visible,
  onClose,
}: DetailedInviteProps) {
  const [invite, setInvite] = useState<InviteResponse | null>(null);
  const { token } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const qrCodeRef = useRef(null);

  useEffect(() => {
    const fetchInvite = async () => {
      if (!token || !createdByResidentId || !visitorId || !code) return;
      setIsLoading(true);
      try {
        const data = await getInviteByResidentIdAndVisitorIdAndCode(
          token,
          createdByResidentId,
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
  }, [visible, token, createdByResidentId, visitorId, code]);

  if (invite == null) return;

  const formatName = (fullName: string) => {
    const shortName = fullName.trim().split(" ");
    return shortName.slice(0, 2).join(" ");
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
          {isLoading ? (
            <Loader />
          ) : (
            invite && (
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
                      startTitle="Validade"
                      startDescription={
                        invite.isActive ? "Convite ativo" : "Convite inativo"
                      }
                      endTitle="Status"
                      endDescription={approval ? "Aprovado" : "Não aprovado"}
                    />
                    <StartEndCard
                      startTitle="Inicio da Visita"
                      startDescription={formatDateLong(invite.startDate)}
                      endTitle="Duração da Visita"
                      endDescription={`${invite.daysToExpiration} dias`}
                    />
                    <StartEndCard
                      startTitle="Data de Fim da Visita"
                      startDescription={
                        inviteExpirationDate
                          ? formatDateLong(inviteExpirationDate)
                          : "Não disponível"
                      }
                    />
                    <StartEndCard
                      startTitle="Data de Aprovação"
                      startDescription={
                        validatedAt
                          ? formatDateLong(new Date(validatedAt))
                          : "Data não disponível"
                      }
                    />
                    <StartEndCard
                      startTitle="Nome do Morador"
                      startDescription={
                        createdByResidentName
                          ? formatName(createdByResidentName)
                          : "Não disponível"
                      }
                      endTitle="Moradia"
                      endDescription={`Casa ${homeDescription}`}
                    />
                    <StartEndCard
                      startTitle="Nome do Funcionário Responsável"
                      startDescription={
                        employeeName
                          ? formatName(employeeName)
                          : "Não disponível"
                      }
                    />
                    <StartEndCard
                      startTitle="Nome do Visitante"
                      startDescription={
                        visitorName ? formatName(visitorName) : "Não disponível"
                      }
                    />
                    <StartEndCard
                      startTitle="Motivo da Visita"
                      startDescription={invite.justification}
                    />
                  </CardsWrapper>
                </View>
              </>
            )
          )}
        </ContentWrapper>
      </ToastProvider>
    </Modal>
  );
}
