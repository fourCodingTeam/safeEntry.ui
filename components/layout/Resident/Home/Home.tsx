import { Button, InviteCard, Loader, StatusIndicator } from "@/components/ui";
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
import { EmptyList } from "@/components/ui/EmptyList";
import { InviteResponse } from "@/services/@types";
import { getInvitesByResidentId } from "@/services/api";
import { getResidentById } from "@/services/api/Status";
import { useUserStore } from "@/stores";

export function Home() {
  const router = useRouter();
  const [selectedInvite, setSelectedInvite] = useState<
    null | (typeof invites)[0]
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invites, setInvites] = useState<InviteResponse[]>([]);
  const { personId, token, username, setStatusId } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchInvitesAsync = async () => {
      if (!token || !username || !personId) {
        return;
      }
      setIsLoading(true);
      try {
        const residentData = await getResidentById(personId, token);
        const invitesData = await getInvitesByResidentId(personId, token);
        setStatusId(residentData.status);
        setInvites(invitesData);
      } catch (error) {
        console.error("Erro top", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvitesAsync();

    const interval = setInterval(fetchInvitesAsync, 10000);

    return () => clearInterval(interval);
  }, [personId, token, username]);

  const activeInvites = invites.filter((invite) => invite.isActive).slice(0, 4);

  return (
    <>
      <PageLayout>
        <StatusIndicator />
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
          {isLoading ? (
            <Loader />
          ) : activeInvites.length > 0 ? (
            <>
              {activeInvites.map((invite, index) => (
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
            <EmptyList />
          )}
          {invites.length < 3 ||
            (invites && !isLoading && (
              <Button
                color={"blue"}
                text={"Ver mais"}
                onPress={() => router.push("/historico")}
              />
            ))}
        </InviteCardsWrapper>
      </PageLayout>
      {selectedInvite && isModalOpen && personId !== null && (
        <DetailedInvite
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          code={selectedInvite.code}
          residentId={personId}
          visitorId={selectedInvite.visitorId}
        />
      )}
    </>
  );
}
