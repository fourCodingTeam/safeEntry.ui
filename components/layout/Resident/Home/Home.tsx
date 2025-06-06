import { Button, InviteCard } from "@/components/ui";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { PageLayout } from "../../PageLayout";
import {
  ImageWrapper,
  InviteCardsWrapper,
  StyledImage,
  StyledSectionTitle,
} from "./Home.styles";

import { DetailedInvite } from "@/components/ui/DetailedInvite";
import { getInviteById } from "@/mock/mock";
import { InviteResponse } from "@/services/@types";
import { getInvitesByResidentId } from "@/services/api";
import { useUserStore } from "@/stores";
import { StyledText } from "../../styles";

export function Home() {
  const router = useRouter();
  const [selectedInvite, setSelectedInvite] = useState<
    null | (typeof invites)[0]
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invites, setInvites] = useState<InviteResponse[]>([]);
  const { token, username } = useUserStore();

  useEffect(() => {
    const fetchInvitesAsync = async () => {
      if (!token || !username) {
        return;
      }
      try {
        const invitesData = await getInvitesByResidentId(6, token);
        setInvites(invitesData);
      } catch (error) {
        console.error("Erro top", error);
      }
    };

    fetchInvitesAsync();

    const interval = setInterval(fetchInvitesAsync, 1000);

    return () => clearInterval(interval);
  }, []);

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
      <PageLayout>
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
                .filter((invite) => invite.isActive)
                .slice(0, 4)
                .map((invite, index) => (
                  <InviteCard
                    key={index}
                    personName={invite.visitorName}
                    inviteDate={invite.startDate}
                    ativo={invite.isActive}
                    onPress={async () => {
                      setSelectedInvite(invite);
                      setIsModalOpen(true);
                    }}
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
          code={selectedInvite.code}
          residentId={6}
          visitorId={selectedInvite.visitorId}
        />
      )}
    </>
  );
}
