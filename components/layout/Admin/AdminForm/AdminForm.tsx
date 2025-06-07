import { theme } from "@/constants/theme";
import invites from "@/mock/invites.json";
import { getAllMotives } from "@/mock/mock";
import { format } from "date-fns";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
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
  const [reason, setReason] = useState("");
  const [inviteValidity, setInviteValidity] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [visitDate, setVisitDate] = useState<Date | null>(null);
  const inicioVisita = new Date(visitDate as Date);
  const [motivesOptions, setMotivesOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const toast = useToast();

  const handleSubmit = () => {
    const motivoSelecionado = motivesOptions.find(
      (option) => option.value === reason
    );

    if (!nome || !reason || !inviteValidity || !visitDate) {
      toast.show("Preencha todos os campos!", 1500, "error");
      return;
    }

    const novoInvite = {
      id: invites.length + 1,
      nome,
      inicioVisita: format(inicioVisita, "yyyy-MM-dd"),
      motivoVisita: motivoSelecionado?.label || "",
      duracaoPrevistaDias: parseInt(inviteValidity),
      qrCodeUrl: `https://youtube.com`,
      ativo: true,
    };

    setNome("");
    setReason("");
    setInviteValidity("");
    setVisitDate(null);

    invites.push(novoInvite);
    toast.show("Convite criado com sucesso!", 1500, "success");
    router.replace("/historico");
  };

  useEffect(() => {
    async function fetchMotives() {
      const motives = await getAllMotives();
      const options = (motives as any[]).map((m) => ({
        label: m.descricao,
        value: m.id.toString(),
      }));
      setMotivesOptions(options);
    }

    fetchMotives();
  }, []);

  // name
  // phone
  // home number
  // email
  // password

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
            label="Telefone"
            placeholder="(XX) XXXXX-XXXX"
            value={nome}
            onChange={(value) => setNome(value as string)}
          />
          <Input
            type="text"
            label="Número da Casa"
            placeholder="Digite o número da casa do morador"
            value={nome}
            onChange={(value) => setNome(value as string)}
          />
          <Input
            type="text"
            label="E-mail"
            placeholder="Digite o e-mail do morador"
            value={nome}
            onChange={(value) => setNome(value as string)}
          />
          <Input
            type="text"
            label="Senha"
            placeholder="Digite a senha do morador"
            value={nome}
            onChange={(value) => setNome(value as string)}
          />
          <StyledCheckBoxWrapper>
            <Checkbox
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? theme.colors.blue : theme.colors.placeholder}
              style={{ borderRadius: 4, borderWidth: 1 }}
            />
            <StyledCheckBoxText
              style={{
                color: isChecked
                  ? theme.colors.black
                  : theme.colors.placeholder,
              }}
            >
              É responsável pela casa
            </StyledCheckBoxText>
          </StyledCheckBoxWrapper>
        </InputsWrapper>
        <ButtonWrapper>
          <Button color={"blue"} text={"Convidar"} onPress={handleSubmit} />
        </ButtonWrapper>
      </FormWrapper>
    </PageLayout>
  );
}
