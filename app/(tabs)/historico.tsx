import { PageLayout } from "@/components/layout";
import React, { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HistoricoPage() {
  return (
    <PageLayout isGreeting={false} pageTitle="Histórico">
      <Text>Histórico</Text>
    </PageLayout>
  );
}
