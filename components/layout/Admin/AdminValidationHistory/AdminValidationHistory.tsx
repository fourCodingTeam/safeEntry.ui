import {
  AdminValidatedInviteInformation,
  Loader,
  ValidatedInviteCard,
} from "@/components/ui";
import { EmptyList } from "@/components/ui/EmptyList";
import { ValidatedInvitesResponse } from "@/services/@types";
import { getValidatedInvitesByCondominiumId } from "@/services/api";
import { useUserStore } from "@/stores";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { PageLayout } from "../../PageLayout";
import {
  DateFilterButton,
  DateFilterButtonText,
  FiltersWrapper,
  InviteCardsWrapper,
} from "./AdminValidationHistory.styles";

export function AdminValidationHistory() {
  const [selectedFilterOption, setSelectedFilterOption] = useState("");
  const [selectedInvite, setSelectedInvite] =
    useState<ValidatedInvitesResponse>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visitorId, setVisitorId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [invites, setInvites] = useState<ValidatedInvitesResponse[]>([]);
  const [dateRangeOption, setDateRangeOption] = useState("all");

  const { token } = useUserStore();

  useEffect(() => {
    const fetchInvitesAsync = async () => {
      if (!token) {
        return;
      }
      setIsLoading(true);
      try {
        const invitesData = await getValidatedInvitesByCondominiumId(1, token);
        setInvites(invitesData);
      } catch (error) {
        console.error("Erro:", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvitesAsync();

    const interval = setInterval(fetchInvitesAsync, 10000);

    return () => clearInterval(interval);
  }, [token]);

  const filterOptions = [
    { label: "Todos", value: "all" },
    { label: "Hoje", value: "today" },
    { label: "Últimos 3 dias", value: "last3days" },
    { label: "Última semana", value: "last7days" },
    { label: "Último mês", value: "last30days" },
  ];

  const applyFilters = (data: ValidatedInvitesResponse[]) => {
    let filtered = [...data];

    if (selectedFilterOption === "byDateInterval") {
      const now = new Date();
      const filterByDate = (date: string) => {
        const validatedDate = new Date(date);
        const diffInMs = now.getTime() - validatedDate.getTime();
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

        switch (dateRangeOption) {
          case "today":
            return validatedDate.toDateString() === now.toDateString();
          case "last3days":
            return diffInDays <= 3;
          case "last7days":
            return diffInDays <= 7;
          case "last30days":
            return diffInDays <= 30;
          case "all":
          default:
            return true;
        }
      };

      filtered = filtered.filter((item) => filterByDate(item.validatedAt));
      filtered.sort(
        (a, b) =>
          new Date(b.validatedAt).getTime() - new Date(a.validatedAt).getTime()
      );
    }

    return filtered;
  };

  const filteredData = applyFilters(invites);

  return (
    <>
      <PageLayout pageTitle={`Histórico`} isResident={false}>
        <FiltersWrapper>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filterOptions.map(({ label, value }) => (
              <DateFilterButton
                key={value}
                onPress={() => {
                  setSelectedFilterOption("byDateInterval");
                  setDateRangeOption(value);
                }}
                selected={
                  selectedFilterOption === "byDateInterval" &&
                  dateRangeOption === value
                }
              >
                <DateFilterButtonText
                  selected={
                    selectedFilterOption === "byDateInterval" &&
                    dateRangeOption === value
                  }
                >
                  {label}
                </DateFilterButtonText>
              </DateFilterButton>
            ))}
          </ScrollView>
        </FiltersWrapper>
        {isLoading ? (
          <Loader />
        ) : invites.length > 0 ? (
          <>
            <InviteCardsWrapper>
              {filteredData.map((item, index) => (
                <ValidatedInviteCard
                  key={index}
                  personName={item.createdByResidentName}
                  employeeName={item.employeeName}
                  houseNumber={item.homeDescription}
                  validated={item.approval}
                  validatedAt={item.validatedAt}
                  visitorName={item.visitorName}
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
        <AdminValidatedInviteInformation
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          code={selectedInvite.code}
          createdByResidentId={selectedInvite.createdByResidentId}
          visitorId={selectedInvite.visitorId}
          createdByResidentName={selectedInvite.createdByResidentName}
          employeeName={selectedInvite.employeeName}
          homeDescription={selectedInvite.homeDescription}
          visitorName={selectedInvite.visitorName}
          approval={selectedInvite.approval}
          validatedAt={selectedInvite.validatedAt}
          inviteExpirationDate={selectedInvite.inviteExpirationDate}
        />
      )}
    </>
  );
}
