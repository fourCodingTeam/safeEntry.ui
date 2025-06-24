import { StatusEnum } from "@/constants/roleEunm";
import { theme } from "@/constants/theme";
import { useUserStore } from "@/stores";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  EditButton,
  StatusCard,
  StatusTextWrapper,
  StatusWrapper,
  StyledEmoji,
  StyledStatusText,
} from "./StatusIndicator.styles";

export function StatusIndicator() {
  const { statusId } = useUserStore();
  const router = useRouter();

  const allStatus = [
    { label: StatusEnum.Disponivel, value: 1 },
    { label: StatusEnum.AguardandoEntrega, value: 2 },
    { label: StatusEnum.AguardandoVisita, value: 3 },
    { label: StatusEnum.NaoQueroReceberVisitas, value: 4 },
  ];

  const allEmojis = {
    [StatusEnum.Disponivel]: "😃",
    [StatusEnum.AguardandoEntrega]: "📦",
    [StatusEnum.AguardandoVisita]: "⏲️",
    [StatusEnum.NaoQueroReceberVisitas]: "😴",
  };

  const statusLabel =
    allStatus.find((status) => status.value === statusId)?.label ||
    "Indefinido";

  const emojiByStatus =
    statusLabel in allEmojis
      ? allEmojis[statusLabel as keyof typeof allEmojis]
      : "❓";

  return (
    <StatusWrapper
      activeOpacity={0.8}
      onPress={() => router.push("/preferences")}
    >
      <StatusCard>
        <StatusTextWrapper>
          <StyledEmoji>{emojiByStatus}</StyledEmoji>
          <StyledStatusText>{statusLabel}!</StyledStatusText>
        </StatusTextWrapper>
        <EditButton>
          <Ionicons name="pencil" size={16} color={theme.colors.white} />
        </EditButton>
      </StatusCard>
    </StatusWrapper>
  );
}
