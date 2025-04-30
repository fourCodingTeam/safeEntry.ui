import { Form, PageLayout } from "@/components/layout/";

import React from "react-native";

export default function FormularioPage() {
  return (
    <PageLayout isGreeting={false} pageTitle="Convidar">
      <Form />
    </PageLayout>
  );
}
