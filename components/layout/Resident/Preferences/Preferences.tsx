import { Button, Input, useToast } from "@/components/ui";
import { StatusEnum } from "@/constants/roleEunm";
import {
  getResidentById,
  patchUpdatePersonStatus,
} from "@/services/api/Status";
import { useUserStore } from "@/stores";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
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
  const { username, token, personId, setStatusId } = useUserStore();
  const toast = useToast();

  const [openSelect, setOpenSelect] = useState<string | null>(null);

  const [callPreference, setCallPreference] = useState(0);
  const firstLetter = username?.slice(0, 1).toUpperCase();
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  useEffect(() => {
    const fetchUserDataAsync = async () => {
      if (!token || !personId) {
        return;
      }
      setIsLoading(true);
      try {
        const residentData = await getResidentById(personId, token);
        setCallPreference(residentData.status);
      } catch (error) {
        console.error("Erro top", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDataAsync();
  }, [token, personId]);

  const handleSubmit = async () => {
    if (!token || !personId) {
      return;
    }
    setIsLoading(true);
    try {
      await patchUpdatePersonStatus(personId, callPreference, token);
      setStatusId(callPreference);
      toast.show("Status atualizado com sucesso!", 2500, "success");
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const allStatus = [
    { label: StatusEnum.Disponivel, value: 1 },
    { label: StatusEnum.AguardandoEntrega, value: 2 },
    { label: StatusEnum.AguardandoVisita, value: 3 },
    { label: StatusEnum.NaoQueroReceberVisitas, value: 4 },
  ];

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
            onChange={(value) => setCallPreference(Number(value))}
            options={allStatus}
            name="callPreference"
            openSelect={openSelect}
            setOpenSelect={setOpenSelect}
          />
          <Button
            color="blue"
            text="Salvar"
            onPress={handleSubmit}
            disabled={isLoading}
          />
        </InputsWrapper>
      </FormWrapper>
    </PageLayout>
  );
}
