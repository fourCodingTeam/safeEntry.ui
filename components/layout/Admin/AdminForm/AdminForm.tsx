import invites from "@/mock/invites.json";
import { getAllMotives } from "@/mock/mock";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, Input, useToast } from "../../../ui";
import { PageLayout } from "../../PageLayout";
import { ButtonWrapper, FormWrapper, InputsWrapper } from "./AdminForm.styles";

export function AdminForm() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [reason, setReason] = useState("");
  const [inviteValidity, setInviteValidity] = useState("");
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

  return (
    <PageLayout pageTitle="Convidar" isResident={false}>
      <FormWrapper>
        <InputsWrapper>
          <Input
            type="text"
            label="Nome"
            placeholder="Digite o nome do visitante"
            value={nome}
            onChange={(value) => setNome(value as string)}
          />
          <Input
            type="select"
            label="Motivo"
            placeholder="Selecione o motivo da visita"
            value={reason}
            onChange={(value) => setReason(value as string)}
            options={motivesOptions}
          />
          <Input
            type="date"
            label="Data da visita"
            placeholder="Selecione a data da visita"
            value={visitDate as Date}
            onChange={(value) => setVisitDate(value as Date)}
          />
          <Input
            type="select"
            label="Validade do convite"
            placeholder="Selecione a validade do convite"
            value={inviteValidity}
            onChange={(value) => setInviteValidity(value as string)}
            options={[
              { label: "1 dia", value: "1" },
              { label: "2 dias", value: "2" },
              { label: "3 dias", value: "3" },
              { label: "4 dias", value: "4" },
              { label: "5 dias", value: "5" },
              { label: "6 dias", value: "6" },
            ]}
          />
        </InputsWrapper>
        <ButtonWrapper>
          <Button color={"blue"} text={"Convidar"} onPress={handleSubmit} />
        </ButtonWrapper>
      </FormWrapper>
    </PageLayout>
  );
}
