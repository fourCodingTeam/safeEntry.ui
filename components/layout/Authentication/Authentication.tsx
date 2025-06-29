import { Button, Input, ToastProvider, useToast } from "@/components/ui";
import { RoleEnum } from "@/constants/roleEunm";
import { Login } from "@/services/api/Auth";
import { getResidentById } from "@/services/api/Status";
import { useUserStore } from "@/stores";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyledContainer,
  StyledImageBackground,
  StyledText,
} from "./Authentication.styles";

export function Authentication() {
  const { setUsername, setRole, setToken, setPersonId, setStatusId } =
    useUserStore();
  const [inputUsername, setInputUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const handleLogin = async () => {
    if (!inputUsername.trim() || !password.trim()) {
      toast.show("Preencha todos os campos!", 2000, "error");
      return;
    }

    setIsLoading(true);
    const formattedUsername = inputUsername.replaceAll(" ", "");
    const formattedPassword = password.replaceAll(" ", "");

    try {
      const response = await Login(formattedUsername, formattedPassword);
      console.log(response);

      if (!response) {
        toast.show("Usuário ou senha inválidos!", 2000, "error");
        setIsLoading(false);
        return;
      }

      setUsername(response.personName);
      setRole(
        (response.role === RoleEnum.RESIDENT
          ? RoleEnum.RESIDENT
          : RoleEnum.EMPLOYEE
        ).toString()
      );
      setToken(response.token);
      setPersonId(response.personId);

      if (response.isFirstLogin) {
        toast.show("Defina sua nova senha.", 3000, "neutral");
        setIsLoading(false);
        router.push("/passwordChange");
        setPassword("");
        setInputUsername("");
      } else {
        setTimeout(async () => {
          if (response.role === 1) {
            const residentData = await getResidentById(
              response.personId,
              response.token
            );
            setStatusId(residentData.status);
            router.replace("/(tabs)");
          } else {
            router.replace("/(admin)");
          }
          setPassword("");
          setInputUsername("");
        }, 500);
      }
    } catch (error) {
      console.error(error);
      toast.show("Erro ao autenticar. Tente novamente!", 2000, "error");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <ToastProvider>
      <StyledImageBackground
        source={require("@/assets/images/LoginWallpaper.png")}
        resizeMode="cover"
      >
        <StyledContainer>
          <StyledText>Login</StyledText>
          <Input
            type="text"
            value={inputUsername || ""}
            placeholder="Usuário ou e-mail"
            onChange={(value: string | number | Date) => {
              if (typeof value === "string") {
                setInputUsername(value);
              }
            }}
          />
          <Input
            type="text"
            value={password || ""}
            placeholder="Senha"
            onChange={(value) => setPassword(value as string)}
            isPassword={true}
          />
          <Button
            color={"black"}
            text={"Entrar"}
            onPress={handleLogin}
            disabled={isLoading}
          />
        </StyledContainer>
      </StyledImageBackground>
    </ToastProvider>
  );
}
