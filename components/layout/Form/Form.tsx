import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, Input } from "../../ui";
import { PageLayout } from "../PageLayout";
import { ButtonWrapper, FormWrapper, InputsWrapper } from "./Form.styles";

export function Form() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [reason, setReason] = useState("");
  const [InvitValidity, setInvitValidity] = useState("");
  const [visitDate, setVisitDate] = useState("");
  return (
    <PageLayout pageTitle="Convidar">
      <FormWrapper>
        <InputsWrapper>
          <Input
            type="text"
            label="Nome"
            placeholder="Digite o nome do visitante"
            value={nome}
            onChange={setNome}
          />
          <Input
            type="select"
            label="Motivo"
            placeholder="Selecione o motivo da visita"
            value={reason}
            onChange={setReason}
            options={[{ label: "Sexo", value: "sexo" }]}
          />
          <Input
            type="date"
            label="Data da visita"
            placeholder="Selecione a data da visita"
            value={visitDate}
            onChange={setVisitDate}
          />
          <Input
            type="select"
            label="Validade do convite"
            placeholder="Selecione a validade do convite"
            value={InvitValidity}
            onChange={setInvitValidity}
            options={[
              { label: "1", value: "1" },
              { label: "2", value: "2" },
              { label: "3", value: "3" },
              { label: "4", value: "4" },
              { label: "5", value: "5" },
              { label: "6", value: "6" },
            ]}
          />
        </InputsWrapper>
        <ButtonWrapper>
          <Button
            color={"blue"}
            text={"Convidar"}
            onPress={() => router.replace("/historico")}
          />
        </ButtonWrapper>
      </FormWrapper>
    </PageLayout>
  );
}
