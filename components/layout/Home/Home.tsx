import { Button, InviteCard } from "@/components/ui";
import { useRouter } from "expo-router";
import React from "react";
import { PageLayout } from "../PageLayout";
import {
  ImageWrapper,
  InviteCardsWrapper,
  StyledImage,
  StyledSectionTitle,
} from "./Home.styles";

import invites from "@/mock/invites.json";

export function Home() {
  const router = useRouter();

  return (
    <PageLayout userName={"Guilherme"}>
      <ImageWrapper
        activeOpacity={0.6}
        onPress={() => {
          router.push("/formulario");
        }}
      >
        <StyledImage source={require("@/assets/images/FoundInvites.png")} />
      </ImageWrapper>
      <InviteCardsWrapper>
        <StyledSectionTitle>Convites Ativos</StyledSectionTitle>
        {invites
          .sort((a, b) => Number(b.status) - Number(a.status))
          .slice(0, 4)
          .flatMap((invite, index) => (
            <InviteCard
              key={index}
              personName={invite.nome}
              inviteDate={invite.inicioVisita}
              status={invite.status}
            />
          ))}
        <Button
          color={"blue"}
          text={"Ver mais"}
          onPress={() => router.replace("/historico")}
        />
      </InviteCardsWrapper>
    </PageLayout>
  );
}
