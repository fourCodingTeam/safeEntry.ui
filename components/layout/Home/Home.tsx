import { Button, InviteCard } from "@/components/ui";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { PageLayout } from "../PageLayout";
import {
  ImageWrapper,
  InviteCardsWrapper,
  StyledImage,
  StyledSectionTitle,
} from "./Home.styles";

import { DetailedInvite } from "@/components/ui/DetailedInvite";
import invites from "@/mock/invites.json";
import { getInviteById } from "@/mock/mock";
import { StyledText } from "../styles";

export function Home() {
  const router = useRouter();
  const [selectedInvite, setSelectedInvite] = useState<
    null | (typeof invites)[0]
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = async (inviteId: number) => {
    try {
      const invite = (await getInviteById(inviteId)) as (typeof invites)[0];
      if (invite) {
        setSelectedInvite(invite);
        setIsModalOpen(true);
      }
      return invite;
    } catch (error) {
      console.error("Failed to fetch invite:", error);
    }
  };

  return (
    <>
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
          {invites.length > 0 ? (
            <>
              {invites
                .sort((a, b) => Number(b.ativo) - Number(a.ativo))
                .slice(0, 4)
                .map((invite, index) => (
                  <InviteCard
                    key={index}
                    personName={invite.nome}
                    inviteDate={invite.inicioVisita}
                    ativo={invite.ativo}
                    onPress={() => handleCardClick(invite.id)}
                  />
                ))}
            </>
          ) : (
            <StyledText>Não há convites aqui!</StyledText>
          )}
          <Button
            color={"blue"}
            text={"Ver mais"}
            onPress={() => router.replace("/historico")}
          />
        </InviteCardsWrapper>
      </PageLayout>
      {selectedInvite && isModalOpen && (
        <DetailedInvite
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          inviteId={selectedInvite.id}
        />
      )}
    </>
  );
}
