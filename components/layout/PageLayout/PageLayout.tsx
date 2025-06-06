import { Header } from "@/components/ui";
import React from "react";
import { PageContainer } from "../styles";

type PageProps = {
  children: React.ReactNode;
  pageTitle?: string;
  isGreeting?: boolean;
  ableToShowOptions?: boolean;
  isResident?: boolean;
};

export function PageLayout({
  children,
  pageTitle,
  ableToShowOptions,
  isResident,
}: PageProps) {
  return (
    <PageContainer>
      <Header
        pageTitle={pageTitle}
        ableToShowOptions={ableToShowOptions}
        isResident={isResident}
      />
      {children}
    </PageContainer>
  );
}
