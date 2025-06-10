import { theme } from "@/constants/theme";
import { postCreateResident } from "@/services/api";
import { useUserStore } from "@/stores";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, Input, useToast } from "../../../ui";
import { PageLayout } from "../../PageLayout";
import {
  ButtonWrapper,
  FormWrapper,
  InputsWrapper,
  StyledCheckBoxText,
  StyledCheckBoxWrapper,
} from "./AdminForm.styles";

export function AdminForm() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [houseNumber, setHouseNumber] = useState(0);
  const [email, setEmail] = useState("");
  const [isHomeOwner, setIsHomeOwner] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { personId, token } = useUserStore();

  const toast = useToast();

  const handleSubmit = async () => {
    if (!personId || !token) {
      return;
    }
    setIsLoading(true);
    try {
      await postCreateResident(
        token,
        nome,
        parseInt(phoneNumber.replace(/\D/g, "")),
        1,
        houseNumber,
        email,
        "SaF3Entry@2025",
        isHomeOwner
      );

      toast.show("Morador cadastrado com sucesso!", 3000, "success");
      router.replace("/historico");
    } catch (error) {
      setIsLoading(false);
      return error;
    } finally {
      setNome("");
      setPhoneNumber("");
      setHouseNumber(0);
      setEmail("");
      setIsHomeOwner(false);
      setIsLoading(false);
    }
  };

  function formatPhoneNumber(value: string): string {
    const cleaned = value.replace(/\D/g, "").slice(0, 11);

    if (cleaned.length <= 2) {
      return `(${cleaned}`;
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    } else if (cleaned.length <= 10) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(
        6
      )}`;
    } else {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(
        7,
        11
      )}`;
    }
  }

  return (
    <PageLayout pageTitle="Cadastrar Morador" isResident={false}>
      <FormWrapper>
        <InputsWrapper>
          <Input
            type="text"
            label="Nome"
            placeholder="Digite o nome do morador"
            value={nome}
            onChange={(value) => setNome(value as string)}
          />
          <Input
            type="text"
            label="phoneNumber"
            placeholder="(XX) XXXXX-XXXX"
            value={phoneNumber}
            onChange={(value) =>
              setPhoneNumber(formatPhoneNumber(value as string))
            }
          />
          <Input
            type="text"
            label="Número da Casa"
            placeholder="Digite o número da casa do morador"
            value={houseNumber}
            onChange={(value) => setHouseNumber(value as number)}
          />
          <Input
            type="text"
            label="E-mail"
            placeholder="Digite o e-mail do morador"
            value={email}
            onChange={(value) => setEmail(value as string)}
          />
          <StyledCheckBoxWrapper>
            <Checkbox
              value={isHomeOwner}
              onValueChange={setIsHomeOwner}
              color={isHomeOwner ? theme.colors.blue : theme.colors.placeholder}
              style={{ borderRadius: 4, borderWidth: 1 }}
            />
            <StyledCheckBoxText
              style={{
                color: isHomeOwner
                  ? theme.colors.black
                  : theme.colors.placeholder,
              }}
            >
              É responsável pela casa
            </StyledCheckBoxText>
          </StyledCheckBoxWrapper>
        </InputsWrapper>
        <ButtonWrapper>
          <Button
            color={"blue"}
            text={"Convidar"}
            onPress={handleSubmit}
            disabled={isLoading}
          />
        </ButtonWrapper>
      </FormWrapper>
    </PageLayout>
  );
}
