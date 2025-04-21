import { Button, InviteCard } from "@/components/ui";
import { useRouter } from "expo-router";
import React from "react";
import {
  ImageWrapper,
  InviteCardsWrapper,
  StyledImage,
  StyledSectionTitle,
} from "./Home.styles";

const invites = [
  {
    personName: "Thiago",
    inviteDate: "27 Fev, 2025",
    status: true,
  },
  {
    personName: "Eduardo Pinha",
    inviteDate: "25 Fev, 2025",
    status: true,
  },
  {
    personName: "Marcelo Gonçalves",
    inviteDate: "21 Fev, 2025",
    status: false,
  },
  {
    personName: "Guilherme",
    inviteDate: "20 Fev, 2025",
    status: false,
  },
  {
    personName: "Ana Maria",
    inviteDate: "19 Fev, 2025",
    status: false,
  },
  {
    personName: "Thiago",
    inviteDate: "18 Fev, 2025",
    status: false,
  },
];

export function Home() {
  const router = useRouter();

  return (
    <>
      <ImageWrapper
        activeOpacity={0.6}
        onPress={() => {
          router.replace("/formulario");
        }}
      >
        <StyledImage source={require("@/assets/images/FoundInvites.png")} />
      </ImageWrapper>
      <InviteCardsWrapper>
        <StyledSectionTitle>Convites Ativos</StyledSectionTitle>
        {invites
          .sort((a, b) => Number(b.status) - Number(a.status))
          .slice(0, 4)
          .map((invite, index) => (
            <InviteCard
              key={index}
              personName={invite.personName}
              inviteDate={invite.inviteDate}
              status={invite.status}
            />
          ))}
        <Button
          color={"blue"}
          text={"Ver mais"}
          onPress={() => router.replace("/historico")}
        />
      </InviteCardsWrapper>
    </>
  );
}
