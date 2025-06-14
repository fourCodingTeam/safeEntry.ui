import { Header } from "@/components/ui";
import React from "react";
import { PageContainer } from "../styles";

type PageProps = {
  children: React.ReactNode;
  pageTitle?: string;
  ableToGoBack?: boolean;
  ableToShowOptions?: boolean;
  isResident?: boolean;
};

export function PageLayout({
  children,
  pageTitle,
  ableToShowOptions,
  ableToGoBack,
  isResident,
}: PageProps) {
  return (
    <PageContainer>
      <Header
        pageTitle={pageTitle}
        ableToShowOptions={ableToShowOptions}
        ableToGoBack={ableToGoBack}
        isResident={isResident}
      />
      {children}
    </PageContainer>
  );
}
