import { Input, InviteCard } from "@/components/ui";
import rawInvitesData from "@/mock/invites.json";
import React, { useState } from "react";
import { PageLayout } from "../PageLayout";
import { FiltersWrapper, InviteCardsWrapper } from "./History.styles";

export function History() {
  const [nome, setNome] = useState("");
  const [selectedFilterOption, setSelectedFilterOption] = useState("");

  const filterOptions = [
    { label: "Sem filtro", value: "" },
    { label: "Data crescente", value: "byDateAscending" },
    { label: "Data decrescente", value: "byDateDescending" },
    { label: "Status: ativos primeiro", value: "byStatusActiveFirst" },
    { label: "Status: inativos primeiro", value: "byStatusInactiveFirst" },
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
      : selectedFilterOption === "byStatusActiveFirst"
      ? filtered.sort((a, b) => (b.status ? 1 : 0) - (a.status ? 1 : 0))
      : selectedFilterOption === "byStatusInactiveFirst"
      ? filtered.sort((a, b) => (a.status ? 1 : 0) - (b.status ? 1 : 0))
      : filtered;
  };

  const filteredData = applyFilters(rawInvitesData);

  return (
    <PageLayout pageTitle="Histórico">
      <FiltersWrapper>
        <Input
          type="text"
          value={nome}
          label="Nome do visitante"
          placeholder="Digite o nome do visitante"
          onChange={(value) => setNome(value)}
        />
        <Input
          type="select"
          label="Ordenar por"
          value={selectedFilterOption}
          onChange={(value) => setSelectedFilterOption(value)}
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
            personName={item.nome}
            inviteDate={item.inicioVisita}
            status={item.status}
          />
        ))}
      </InviteCardsWrapper>
    </PageLayout>
  );
}
