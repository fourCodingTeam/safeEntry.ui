import { Button, Input, ToastProvider, useToast } from "@/components/ui";
import { postPasswordChange } from "@/services/api/User";
import { useUserStore } from "@/stores";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { PageLayout } from "../PageLayout";
import {
  FormWrapper,
  GoBackWrapper,
  InputsWrapper,
  StyledGoBackText,
  StyledGoBackTouchableOpacity,
} from "./PasswordChange.styles";

export function PasswordChange() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useUserStore();

  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const handleSubmitPasswordChange = async () => {
    if (!token || !email || !password || !confirmPassword) {
      toast.show("Preencha todos os campos!", 3000, "error");
      return;
    }
    if (password !== confirmPassword) {
      toast.show("A senha deve ser igual nos dois campos.", 3000, "error");
      return;
    }
    setIsLoading(true);
    try {
      await postPasswordChange(token, email, password, confirmPassword);
    } catch (error) {
      setIsLoading(false);
      return error;
    } finally {
      toast.show("Senha atualizada com sucesso!", 2000, "success");
      setIsLoading(false);
      router.dismissAll();
    }
  };

  const handlePress = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <ToastProvider>
      <PageLayout pageTitle="Atualizar senha" ableToShowOptions={false}>
        <GoBackWrapper>
          <StyledGoBackTouchableOpacity onPress={handlePress}>
            <Ionicons name="chevron-back" size={18} />
            <StyledGoBackText>Voltar</StyledGoBackText>
          </StyledGoBackTouchableOpacity>
        </GoBackWrapper>
        <FormWrapper>
          <InputsWrapper>
            <Input
              type="text"
              label="E-mail"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(value) => setEmail(value as string)}
            />
            <Input
              type="text"
              label="Senha"
              placeholder="Digite sua nova senha"
              value={password}
              isPassword
              onChange={(value) => setPassword(value as string)}
            />
            <Input
              type="text"
              label="Confirmação de Senha"
              placeholder="Digite sua nova senha novamente"
              value={confirmPassword}
              isPassword
              onChange={(value) => setConfirmPassword(value as string)}
            />
            <Button
              color="blue"
              text="Salvar"
              onPress={handleSubmitPasswordChange}
              disabled={isLoading}
            />
          </InputsWrapper>
        </FormWrapper>
      </PageLayout>
    </ToastProvider>
  );
}
