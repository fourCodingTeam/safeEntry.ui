import { Header, InviteCard } from "@/components/ui";
import React from "react";
import { PageContainer } from "../styles";
import { InviteCardsWrapper } from "./Home.styles";

export function Home() {
  return (
    <PageContainer>
      <Header isGreeting={true} userName="Guilherme" />
      <InviteCardsWrapper>
        <InviteCard
          personName={"Thiago de Pau"}
          inviteDate={"27 Fev, 2025"}
          status={true}
        />
        <InviteCard
          personName={"Thiago de Pau"}
          inviteDate={"25 Fev, 2025"}
          status={true}
        />
        <InviteCard
          personName={"Thiago de Pau"}
          inviteDate={"21 Fev, 2025"}
          status={false}
        />
      </InviteCardsWrapper>
    </PageContainer>
  );
}
