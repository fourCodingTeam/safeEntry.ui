import React from "react";
import { View } from "react-native";
import { Header } from "@/components/ui";
import { SafeAreaView } from "react-native-safe-area-context";
import { PageContainer } from "../styles";

type PageProps = {
  children: React.ReactNode;
  pageTitle?: string;
  isGreeting?: boolean;
  userName?: string;
};

export function PageLayout({
  children,
  pageTitle,
  isGreeting = false,
  userName,
}: PageProps) {
  return (
    <PageContainer>
      <Header
        isGreeting={isGreeting}
        pageTitle={pageTitle}
        userName={userName}
      />
      {children}
    </PageContainer>
  );
}
