import { Input, InviteCard } from "@/components/ui";
import { DetailedInvite } from "@/components/ui/DetailedInvite";
import { InviteResponse } from "@/services/@types";
import { getInvitesByResidentId } from "@/services/api";
import { useUserStore } from "@/stores";
import React, { useEffect, useState } from "react";
import { PageLayout } from "../../PageLayout";
import { StyledText } from "../../styles";
import { FiltersWrapper, InviteCardsWrapper } from "./History.styles";

export function History() {
  const [nome, setNome] = useState("");
  const [selectedFilterOption, setSelectedFilterOption] = useState("");
  const [selectedInvite, setSelectedInvite] = useState<InviteResponse>();
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

    const interval = setInterval(fetchInvitesAsync, 10000);

    return () => clearInterval(interval);
  }, [token, username]);

  const filterOptions = [
    { label: "Sem filtro", value: "" },
    { label: "Data crescente", value: "byDateAscending" },
    { label: "Data decrescente", value: "byDateDescending" },
    { label: "Status: ativos primeiro", value: "byStatusActiveFirst" },
    { label: "Status: inativos primeiro", value: "byStatusInactiveFirst" },
  ];

  const applyFilters = (data: InviteResponse[]) => {
    let filtered = [...data];

    filtered = nome.trim()
      ? filtered.filter((item) =>
          item.visitorName.toLowerCase().includes(nome.toLowerCase())
        )
      : filtered;

    return selectedFilterOption === "byDateAscending"
      ? filtered.sort((a, b) =>
          new Date(a.startDate).getTime() > new Date(b.startDate).getTime()
            ? 1
            : -1
        )
      : selectedFilterOption === "byDateDescending"
      ? filtered.sort((a, b) =>
          new Date(a.startDate).getTime() < new Date(b.startDate).getTime()
            ? 1
            : -1
        )
      : selectedFilterOption === "byStatusActiveFirst"
      ? filtered.sort((a, b) => (b.isActive ? 1 : 0) - (a.isActive ? 1 : 0))
      : selectedFilterOption === "byStatusInactiveFirst"
      ? filtered.sort((a, b) => (a.isActive ? 1 : 0) - (b.isActive ? 1 : 0))
      : filtered;
  };

  const filteredData = applyFilters(invites);

  return (
    <>
      <PageLayout pageTitle="Histórico">
        {invites.length > 0 ? (
          <>
            <FiltersWrapper>
              <Input
                type="text"
                value={nome}
                label="Nome do visitante"
                placeholder="Digite o nome do visitante"
                onChange={(value) => setNome(value as string)}
              />
              <Input
                type="select"
                label="Ordenar por"
                value={selectedFilterOption}
                onChange={(value) => setSelectedFilterOption(value as string)}
                options={filterOptions.map((option) => ({
                  label: option.label,
                  value: option.value,
                }))}
              />
            </FiltersWrapper>
            <InviteCardsWrapper>
              {filteredData.map((item, index) => (
                <InviteCard
                  key={index}
                  personName={item.visitorName}
                  inviteDate={item.startDate}
                  ativo={item.isActive}
                  onPress={async () => {
                    setSelectedInvite(item);
                    setIsModalOpen(true);
                  }}
                />
              ))}
            </InviteCardsWrapper>
          </>
        ) : (
          <StyledText>Não há convites aqui!</StyledText>
        )}
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
