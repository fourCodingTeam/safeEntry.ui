import { Header } from "@/components/ui";
import React from "react";
import { PageContainer } from "../styles";

type PageProps = {
  children: React.ReactNode;
  pageTitle?: string;
  isGreeting?: boolean;
  userName?: string;
};

export function PageLayout({ children, pageTitle, userName }: PageProps) {
  return (
    <PageContainer>
      <Header pageTitle={pageTitle} userName={userName} />
      {children}
    </PageContainer>
  );
}
