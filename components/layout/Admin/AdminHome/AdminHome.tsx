import { Button, Loader } from "@/components/ui";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { PageLayout } from "../../PageLayout";
import {
  ImageWrapper,
  InviteCardsWrapper,
  StyledImage,
  StyledSectionTitle,
} from "./AdminHome.styles";

import { EmptyList } from "@/components/ui/EmptyList";
import { HouseCard } from "@/components/ui/HouseCard";
import { AddressResponse } from "@/services/@types";
import { getAllAddresses, getInviteCountByAddressId } from "@/services/api";
import { useAddressStore, useUserStore } from "@/stores";
import { useCameraStore } from "@/stores/CameraStore";

export function AdminHome() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setIsOpen } = useCameraStore();
  const [isLoading, setIsLoading] = useState(false);
  const [inviteCounts, setInviteCounts] = useState<Record<number, number>>({});
  const [addresses, setAddresses] = useState<AddressResponse[]>([]);
  const { setAddressId, setHouseNumber } = useAddressStore();
  const { token, username, personId } = useUserStore();

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

  const sortedAddresses = addresses
    .slice()
    .sort((a, b) => (inviteCounts[b.id] || 0) - (inviteCounts[a.id] || 0));

  return (
    <>
      <PageLayout isResident={false}>
        <ImageWrapper
          activeOpacity={0.6}
          onPress={() => {
            setIsOpen(true);
            router.push("/(admin)/scan");
          }}
        >
          <StyledImage source={require("@/assets/images/ReadQrCode.png")} />
        </ImageWrapper>
        <InviteCardsWrapper>
          <StyledSectionTitle>Casas com mais convites</StyledSectionTitle>
          {!isLoading ? (
            sortedAddresses.length > 0 ? (
              <>
                {sortedAddresses.slice(0, 4).map((item) => {
                  const owner = item.residents.find((res) => res.isHomeOwner);
                  return (
                    <HouseCard
                      key={item.id}
                      houseNumber={item.homeNumber}
                      houseOwnerName={owner?.name || ""}
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
                <Button
                  color={"blue"}
                  text={"Ver mais"}
                  onPress={() => router.replace("/historico")}
                />
              </>
            ) : (
              <EmptyList />
            )
          ) : (
            <Loader />
          )}
        </InviteCardsWrapper>
      </PageLayout>
    </>
  );
}
