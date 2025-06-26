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
  const { personId, token } = useUserStore();
  const toast = useToast();

  const [nome, setNome] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [houseNumber, setHouseNumber] = useState(0);
  const [email, setEmail] = useState("");
  const [isHomeOwner, setIsHomeOwner] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!personId || !token) {
      return;
    }
    if (!nome || !phoneNumber || !houseNumber || !email || !isHomeOwner) {
      toast.show("Preencha todos os campos!", 2500, "error");
      return;
    }
    setIsLoading(true);
    try {
      await postCreateResident(
        token,
        nome,
        parseInt(phoneNumber),
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

  return (
    <PageLayout pageTitle="Cadastrar Morador" isResident={false}>
      <FormWrapper>
        <InputsWrapper>
          <Input
            type="text"
            label="Nome"
            placeholder="Digite o nome do morador"
            value={nome}
            maxLength={75}
            onChange={(value) => setNome(value as string)}
          />
          <Input
            type="text"
            label="Telefone"
            placeholder="(XX) XXXXX-XXXX"
            value={phoneNumber}
            maxLength={11}
            keyboardType="N"
            onChange={(value) => setPhoneNumber(value as string)}
          />
          <Input
            type="text"
            label="Número da Casa"
            placeholder="Digite o número da casa do morador"
            keyboardType="N"
            value={houseNumber}
            onChange={(value) => setHouseNumber(value as number)}
          />
          <Input
            type="text"
            label="E-mail"
            placeholder="Digite o e-mail do morador"
            value={email}
            maxLength={150}
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
            text={"Cadastrar"}
            onPress={handleSubmit}
            disabled={isLoading}
          />
        </ButtonWrapper>
      </FormWrapper>
    </PageLayout>
  );
}
