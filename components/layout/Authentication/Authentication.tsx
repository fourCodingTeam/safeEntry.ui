import { Button, Input, useToast } from "@/components/ui";
import { useUserStore } from "@/stores";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyledContainer,
  StyledImageBackground,
  StyledText,
} from "./Authentication.styles";

export function Authentication() {
  const { username, setUsername } = useUserStore();
  const [password, setPassword] = useState("");
  const router = useRouter();
  const toast = useToast();

  const handleLogin = async () => {
    if ((username && !username.trim()) || !password.trim()) {
      toast.show("Preencha todos os campos!", 2000, "error");
      return;
    }
    if (username === "Eder" && password === "senha1234") {
      router.push("/(tabs)");
      setPassword("");
    } else {
      toast.show("Usuário ou senha inválidos!", 2000, "error");
    }
  };

  return (
    <StyledImageBackground
      source={require("@/assets/images/LoginWallpaper.png")}
      resizeMode="cover"
    >
      <StyledContainer>
        <StyledText>Login</StyledText>
        <Input
          type="text"
          value={username ? username : ""}
          placeholder="Usuário"
          onChange={(value) => setUsername(value as string)}
        />
        <Input
          type="text"
          value={password}
          placeholder="Senha"
          onChange={(value) => setPassword(value as string)}
          isPassword={true}
        />
        <Button color={"black"} text={"Entrar"} onPress={handleLogin} />
      </StyledContainer>
    </StyledImageBackground>
  );
}
