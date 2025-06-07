import { Button, Input } from "@/components/ui";
import { useUserStore } from "@/stores";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { PageLayout } from "../../PageLayout";
import {
  FormWrapper,
  GoBackWrapper,
  IconLetter,
  InputsWrapper,
  LetterWrapper,
  StyledGoBackText,
  StyledGoBackTouchableOpacity,
} from "./Preferences.styles";

export function Preferences() {
  const router = useRouter();
  const [callPreference, setCallPreference] = useState("");
  const { username } = useUserStore();
  const firstLetter = username?.slice(0, 1).toUpperCase();

  const handlePress = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <PageLayout pageTitle="Preferências" ableToShowOptions={false}>
      <GoBackWrapper>
        <StyledGoBackTouchableOpacity onPress={handlePress}>
          <Ionicons name="chevron-back" size={18} />
          <StyledGoBackText>Voltar</StyledGoBackText>
        </StyledGoBackTouchableOpacity>
      </GoBackWrapper>
      <LetterWrapper>
        <IconLetter>{firstLetter}</IconLetter>
      </LetterWrapper>
      <FormWrapper>
        <InputsWrapper>
          <Input
            type="select"
            label="Preferência de Contato"
            placeholder="Selecione a preferência de contato"
            value={callPreference}
            onChange={(value) => setCallPreference(value as string)}
            options={[
              { label: "Quero receber ligações", value: "1" },
              { label: "Não quero receber ligações", value: "2" },
              { label: "Fora de casa", value: "3" },
              { label: "No trabalho", value: "4" },
            ]}
          />
          <Button color="blue" text="Salvar" />
        </InputsWrapper>
      </FormWrapper>
    </PageLayout>
  );
}
