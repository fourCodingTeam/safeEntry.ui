import { Home, PageLayout } from "@/components/layout";
import React from "react-native";

export default function HomePage() {
  return (
    <PageLayout isGreeting={true} userName={"Guilherme"}>
      <Home />
    </PageLayout>
  );
}
