import { PageLayout, Form } from "@/components/layout/";

import React, { Text } from "react-native";

export default function FormularioPage() {
  return (
    <PageLayout isGreeting={false} pageTitle="Convidar">
      <Form />
    </PageLayout>
  );
}
