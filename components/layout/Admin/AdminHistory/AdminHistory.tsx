import { Input } from "@/components/ui";
import { DetailedInvite } from "@/components/ui/DetailedInvite";
import { HouseCard } from "@/components/ui/HouseCard";
import rawInvitesData from "@/mock/invites.json";
import { getInviteById } from "@/mock/mock";
import React, { useState } from "react";
import { PageLayout } from "../../PageLayout";
import { StyledText } from "../../styles";
import { FiltersWrapper, InviteCardsWrapper } from "./AdminHistory.styles";

export function AdminHistory() {
  const [nome, setNome] = useState("");
  const [selectedFilterOption, setSelectedFilterOption] = useState("");
  const [selectedInvite, setSelectedInvite] = useState<
    null | (typeof rawInvitesData)[0]
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = async (inviteId: number) => {
    try {
      const invite = (await getInviteById(
        inviteId
      )) as (typeof rawInvitesData)[0];
      if (invite) {
        setSelectedInvite(invite);
        setIsModalOpen(true);
      }
      return invite;
    } catch (error) {
      console.error("Failed to fetch invite:", error);
    }
  };

  const filterOptions = [
    { label: "Sem filtro", value: "" },
    { label: "Data crescente", value: "byDateAscending" },
    { label: "Data decrescente", value: "byDateDescending" },
  ];

  const applyFilters = (data: typeof rawInvitesData) => {
    let filtered = [...data];

    filtered = nome.trim()
      ? filtered.filter((item) =>
          item.nome.toLowerCase().includes(nome.toLowerCase())
        )
      : filtered;

    return selectedFilterOption === "byDateAscending"
      ? filtered.sort((a, b) =>
          new Date(a.inicioVisita).getTime() >
          new Date(b.inicioVisita).getTime()
            ? 1
            : -1
        )
      : selectedFilterOption === "byDateDescending"
      ? filtered.sort((a, b) =>
          new Date(a.inicioVisita).getTime() <
          new Date(b.inicioVisita).getTime()
            ? 1
            : -1
        )
      : filtered;
  };

  const filteredData = applyFilters(rawInvitesData);

  return (
    <>
      <PageLayout pageTitle="Casas" isResident={false}>
        {rawInvitesData.length > 0 ? (
          <>
            <FiltersWrapper>
              <Input
                type="text"
                value={nome}
                label="Número da Casa"
                placeholder="Digite o número da casa"
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
                <HouseCard
                  key={index}
                  houseNumber={item.nome}
                  activeInvites={item.id}
                  onPress={() => handleCardClick(item.id)}
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
          inviteId={selectedInvite.id}
        />
      )}
    </>
  );
}
