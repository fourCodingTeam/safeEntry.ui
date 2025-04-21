import { PageLayout } from "@/components/layout";
import { Button } from "@/components/ui";
import { DetailedInvite } from "@/components/ui/DetailedInvite";
import { useRouter } from "expo-router";
import { useState } from "react";
import React from "react-native";

export default function FormularioPage() {
  const [OpenDetailedInviteModal, setOpenDetailedInviteModal] = useState(false);
  const router = useRouter();

  return (
    <PageLayout isGreeting={false} pageTitle="Convidar">
      <Button
        color={"blue"}
        text={"Convite Detalhado"}
        onPress={() => setOpenDetailedInviteModal(!OpenDetailedInviteModal)}
      />
      <DetailedInvite
        visible={OpenDetailedInviteModal}
        onClose={() => setOpenDetailedInviteModal(false)}
        invitedPersonName="Yuri Araujo"
      />
    </PageLayout>
  );
}
