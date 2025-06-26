import { Input, Loader } from "@/components/ui";
import { EmptyList } from "@/components/ui/EmptyList";
import { HouseCard } from "@/components/ui/HouseCard";
import { AddressResponse } from "@/services/@types";
import { getAllAddresses, getInviteCountByAddressId } from "@/services/api";
import { useAddressStore, useUserStore } from "@/stores";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { PageLayout } from "../../PageLayout";
import { FiltersWrapper, InviteCardsWrapper } from "./AdminHistory.styles";

export function AdminHistory() {
  const router = useRouter();
  const { setAddressId, setHouseNumber } = useAddressStore();
  const { token, username, personId } = useUserStore();

  const [openSelect, setOpenSelect] = useState<string | null>(null);

  const [nome, setNome] = useState("");
  const [searchHouseNumber, setSearchHouseNumber] = useState(0);
  const [selectedFilterOption, setSelectedFilterOption] = useState("");
  const [inviteCounts, setInviteCounts] = useState<Record<number, number>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [addresses, setAddresses] = useState<AddressResponse[]>([]);

  useEffect(() => {
    const fetchAllAddressesAsync = async () => {
      if (!token || !username || !personId) {
        return;
      }
      setIsLoading(true);
      try {
        const addressesData = await getAllAddresses(personId, token);
        const inviteCountsPromises = addressesData.map(async (address) => {
          return await getInviteCountByAddressId(address.id, token);
        });

        const inviteCounts = await Promise.all(inviteCountsPromises);
        const inviteCountsMap: Record<number, number> = {};
        inviteCounts.forEach((item, i) => {
          inviteCountsMap[addressesData[i].id] = item.count;
        });
        setInviteCounts(inviteCountsMap);
        setAddresses(addressesData);
      } catch (error) {
        console.error(`Mensagem de erro: ${error}`);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllAddressesAsync();

    const interval = setInterval(fetchAllAddressesAsync, 50000);

    return () => clearInterval(interval);
  }, [token, username, personId]);

  const filterOptions = [
    { label: "Sem filtro", value: "" },
    { label: "Número da casa", value: "byHouseNumber" },
    { label: "Número de convites", value: "byNumberOfInvites" },
  ];

  const applyFilters = (data: AddressResponse[]) => {
    let filtered = [...data];

    filtered = nome.trim()
      ? filtered.filter((item) =>
          item.residents.some((resident) =>
            resident.name.toLowerCase().includes(nome.toLowerCase())
          )
        )
      : filtered;

    filtered = searchHouseNumber
      ? filtered.filter((item) =>
          item.homeNumber.toString().includes(searchHouseNumber.toString())
        )
      : filtered;

    if (selectedFilterOption === "byHouseNumber") {
      filtered = filtered.sort((a, b) =>
        a.homeNumber > b.homeNumber ? 1 : -1
      );
    } else if (selectedFilterOption === "byNumberOfInvites") {
      filtered = filtered.sort(
        (a, b) => (inviteCounts[b.id] || 0) - (inviteCounts[a.id] || 0)
      );
    }

    return filtered;
  };

  const filteredData = applyFilters(addresses);

  return (
    <>
      <PageLayout pageTitle="Casas" isResident={false}>
        <FiltersWrapper>
          <Input
            type="text"
            value={nome}
            label="Nome do Morador"
            placeholder="Pesquisar com o nome do Morador"
            onChange={(value) => setNome(value as string)}
          />
          <Input
            type="text"
            value={searchHouseNumber}
            label="Número da Casa"
            placeholder="Pesquisar com o Nº da casa"
            keyboardType="N"
            onChange={(value) => setSearchHouseNumber(value as number)}
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
        {isLoading && <Loader />}

        {!isLoading && addresses.length === 0 && <EmptyList />}

        {!isLoading && addresses.length > 0 && (
          <InviteCardsWrapper>
            {filteredData.map((item) => {
              const owner = item.residents.find(
                (resident) => resident.isHomeOwner
              );

              return (
                <HouseCard
                  key={item.id}
                  houseNumber={item.homeNumber}
                  houseOwnerName={owner ? owner.name : ""}
                  activeInvites={inviteCounts[item.id] || 0}
                  onPress={() => {
                    setAddressId(item.id);
                    setHouseNumber(item.homeNumber);
                    router.push({
                      pathname: "/houseInvites/[id]",
                      params: { id: item.id },
                    });
                  }}
                />
              );
            })}
          </InviteCardsWrapper>
        )}
      </PageLayout>
    </>
  );
}
