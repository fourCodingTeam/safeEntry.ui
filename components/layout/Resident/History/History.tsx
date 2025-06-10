import { Input, InviteCard, Loader } from "@/components/ui";
import { DetailedInvite } from "@/components/ui/DetailedInvite";
import { EmptyList } from "@/components/ui/EmptyList";
import { InviteResponse } from "@/services/@types";
import { getInvitesByResidentId } from "@/services/api";
import { useUserStore } from "@/stores";
import React, { useEffect, useState } from "react";
import { PageLayout } from "../../PageLayout";
import { FiltersWrapper, InviteCardsWrapper } from "./History.styles";

export function History() {
  const [nome, setNome] = useState("");
  const [selectedFilterOption, setSelectedFilterOption] = useState("");
  const [selectedInvite, setSelectedInvite] = useState<InviteResponse>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [invites, setInvites] = useState<InviteResponse[]>([]);
  const { token, username, personId } = useUserStore();

  useEffect(() => {
    const fetchInvitesAsync = async () => {
      if (!token || !username || !personId) {
        return;
      }
      setIsLoading(true);
      try {
        const invitesData = await getInvitesByResidentId(personId, token);
        setInvites(invitesData);
      } catch (error) {
        console.error("Erro top", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvitesAsync();

    const interval = setInterval(fetchInvitesAsync, 500000);

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
        {isLoading ? (
          <Loader />
        ) : invites.length > 0 ? (
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
        ) : (
          <InviteCardsWrapper>
            <EmptyList />
          </InviteCardsWrapper>
        )}
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
