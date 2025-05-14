import { Button, Input } from "@/components/ui";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyledContainer,
  StyledImageBackground,
  StyledText,
} from "./Authentication.styles";

export function Authentication() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Preencha todos os campos!");
      return;
    }
    if (username === "admin" && password === "admin1234") {
      router.push("/(tabs)");
    } else {
      alert("Usuário ou senha inválidos!");
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
          value={username}
          placeholder="Usuário"
          onChange={(value) => setUsername(value)}
        />
        <Input
          type="text"
          value={password}
          placeholder="Senha"
          onChange={(value) => setPassword(value)}
          isPassword={true}
        />
        <Button color={"black"} text={"Entrar"} onPress={handleLogin} />
      </StyledContainer>
    </StyledImageBackground>
  );
}
