import { getAllMotives } from "@/mock/mock";
import { postInviteGenerate } from "@/services/api";
import { useUserStore } from "@/stores";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, Input, useToast } from "../../../ui";
import { PageLayout } from "../../PageLayout";
import { ButtonWrapper, FormWrapper, InputsWrapper } from "./Form.styles";

export function Form() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState<string | null>("");
  const [reason, setReason] = useState("");
  const [inviteValidity, setInviteValidity] = useState("");
  const [visitDate, setVisitDate] = useState<Date | null>(null);
  const inicioVisita = new Date(visitDate as Date);
  const [motivesOptions, setMotivesOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const toast = useToast();
  const { token } = useUserStore();
  const [isloading, setIsloading] = useState(false);

  const handleSubmit = async () => {
    const motivoSelecionado = motivesOptions.find(
      (option) => option.value === reason
    );

    if (!nome || !reason || !inviteValidity || !visitDate || !telefone) {
      toast.show("Preencha todos os campos!", 1500, "error");
      return;
    }

    setIsloading(true);

    try {
      if (!token) {
        return;
      }
      await postInviteGenerate(
        token,
        6,
        nome,
        parseInt(telefone.replace(/\D/g, "")),
        visitDate,
        parseInt(inviteValidity),
        motivoSelecionado?.label || "Motivo não selecionado"
      );

      toast.show("Convite gerado com sucesso!", 3000, "success");
      router.replace("/historico");

      setNome("");
      setTelefone(null);
      setReason("");
      setInviteValidity("");
      setVisitDate(null);
    } catch (error) {
      setIsloading(false);
      throw error;
    } finally {
      setIsloading(false);
    }
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

  function formatPhoneNumber(value: string): string {
    const cleaned = value.replace(/\D/g, "").slice(0, 11);

    const match = cleaned.match(/^(\d{0,2})(\d{0,1})(\d{0,4})(\d{0,4})$/);

    if (!match) return value;

    const [, ddd, firstDigit, middle, last] = match;

    let result = "";
    if (ddd) result += `(${ddd}`;
    if (ddd.length === 2) result += `) `;
    if (firstDigit) result += `${firstDigit} `;
    if (middle) result += `${middle}`;
    if (middle.length === 4 && last) result += `-`;
    if (last) result += `${last}`;

    return result.trim();
  }

  return (
    <PageLayout pageTitle="Convidar">
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
            type="text"
            label="Telefone"
            placeholder="Telefone do visitante"
            keyboardType="N"
            maxLength={16}
            value={telefone as string}
            onChange={(value) =>
              setTelefone(formatPhoneNumber(value as string))
            }
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
          <Button
            color={"blue"}
            text={"Convidar"}
            onPress={handleSubmit}
            disabled={isloading}
          />
        </ButtonWrapper>
      </FormWrapper>
    </PageLayout>
  );
}
