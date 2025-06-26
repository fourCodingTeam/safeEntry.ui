import {
  AdminValidateDetailedInvite,
  Input,
  InviteCard,
  Loader,
  ResidentCard,
} from "@/components/ui";
import { EmptyList } from "@/components/ui/EmptyList";
import { AddressResponse, InviteResponse } from "@/services/@types";
import { getAllAddresses, getInvitesByAddressId } from "@/services/api";
import { useAddressStore, useUserStore } from "@/stores";
import React, { useEffect, useState } from "react";
import { PageLayout } from "../../PageLayout";
import { StyledTopText } from "../../styles";
import { FiltersWrapper, InviteCardsWrapper } from "./AdminInvites.styles";

export function AdminInvites() {
  const { token, personId } = useUserStore();
  const { addressId, houseNumber } = useAddressStore();

  const [openSelect, setOpenSelect] = useState<string | null>(null);

  const [nome, setNome] = useState("");
  const [selectedFilterOption, setSelectedFilterOption] = useState("");
  const [selectedInvite, setSelectedInvite] = useState<InviteResponse>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visitorId, setVisitorId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [addresses, setAddresses] = useState<AddressResponse[]>([]);
  const [invites, setInvites] = useState<InviteResponse[]>([]);

  useEffect(() => {
    const fetchInvitesAsync = async () => {
      if (!token || !addressId || !personId) {
        return;
      }
      setIsLoading(true);
      try {
        const addressesData = await getAllAddresses(personId, token);
        const invitesData = await getInvitesByAddressId(addressId, token);
        setInvites(invitesData);

        if (invitesData.length > 0 && invitesData[0].residentId) {
          const residentId = invitesData[0].residentId
            ? invitesData[0].residentId
            : null;
          const filteredAddress = addressesData.find((address) =>
            address.residents.some((resident) => resident.id === residentId)
          );

          setAddresses(filteredAddress ? [filteredAddress] : []);

          if (filteredAddress) {
            console.log("Filtered Address:", filteredAddress);
          } else {
            console.log("No address found for the given residentId.");
          }
        } else {
          console.log("No invites or residentId found.");
        }
      } catch (error) {
        console.error("Erro: ", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvitesAsync();

    const interval = setInterval(fetchInvitesAsync, 500000);

    return () => clearInterval(interval);
  }, [token, addressId]);

  const filterOptions = [
    { label: "Mais próximos", value: "byDateAscending" },
    { label: "Mais distantes", value: "byDateDescending" },
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
      : filtered.sort((a, b) =>
          new Date(a.startDate).getTime() > new Date(b.startDate).getTime()
            ? 1
            : -1
        );
  };

  const filteredData = applyFilters(invites);

  return (
    <>
      <PageLayout
        pageTitle={`Casa ${houseNumber}`}
        isResident={false}
        ableToGoBack={true}
      >
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
            name="filterOptions"
            openSelect={openSelect}
            setOpenSelect={setOpenSelect}
          />
        </FiltersWrapper>
        {isLoading ? (
          <Loader />
        ) : invites.length > 0 ? (
          <>
            <InviteCardsWrapper>
              <StyledTopText>Moradores</StyledTopText>
              {addresses
                ?.flatMap((address) => address.residents)
                .map((resident, index) => (
                  <ResidentCard
                    key={index}
                    name={resident.name}
                    phoneNumber={resident.phoneNumber}
                    status={resident.status}
                  />
                ))}
              <StyledTopText>Convites</StyledTopText>
              {filteredData.map((item, index) => (
                <InviteCard
                  key={index}
                  personName={item.visitorName}
                  inviteDate={item.startDate}
                  ativo={item.isActive}
                  onPress={async () => {
                    setVisitorId(item.visitorId);
                    setSelectedInvite(item);
                    setIsModalOpen(true);
                  }}
                />
              ))}
            </InviteCardsWrapper>
          </>
        ) : (
          <EmptyList />
        )}
      </PageLayout>
      {selectedInvite && isModalOpen && visitorId !== null && (
        <AdminValidateDetailedInvite
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          code={selectedInvite.code}
          residentId={selectedInvite.residentId}
          visitorId={selectedInvite.visitorId}
        />
      )}
    </>
  );
}
