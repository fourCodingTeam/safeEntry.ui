import { Input, Button } from "../../ui";
import React, { useState } from "react";
import { PageContainer } from "../styles";
import {
  ImageWrapper,
  FormWrapper,
  StyledImage,
  StyledSectionTitle,
  Subtitle,
} from "./Form.styles";
import { useRouter } from "expo-router";

export function Form() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [reason, setReason] = useState("");
  const [InvitValidity, setInvitValidity] = useState("");
  const [visitDate, setVisitDate] = useState("");
  return (
    <>
      <FormWrapper>
        <Subtitle>Nome</Subtitle>
        <Input
          type="text"
          placeholder="Digite o nome do visitante"
          value={nome}
          onChange={setNome}
        />
        <Subtitle>Motivo</Subtitle>
        <Input
          type="select"
          placeholder="Selecione o motivo da visita"
          value={reason}
          onChange={setReason}
          options={["Sexo", "Ifood", "Visita"]}
        />
        <Subtitle>Data da visita</Subtitle>
        <Input
          type="date"
          placeholder="Selecione a data da visita"
          value={visitDate}
          onChange={setVisitDate}
        />
        <Subtitle>Validade do convite</Subtitle>
        <Input
          type="select"
          placeholder="Selecione a validade do convite"
          value={InvitValidity}
          onChange={setInvitValidity}
          options={["1", "2", "3", "4", "5", "6"]}
        />

        <Button
          color={"blue"}
          text={"Convidar"}
          onPress={() => router.replace("/historico")}
        />
      </FormWrapper>
    </>
  );
}
