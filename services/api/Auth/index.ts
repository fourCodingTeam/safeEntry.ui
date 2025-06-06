import { BASE_URL } from "@/constants/apiConfig";
import { loginAuth } from "@/services/@types/loginAuth";

export async function Login(email: string, password: string) {
  try {
    const response = await fetch(`${BASE_URL}/Auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return null;
    }

    const loginData = (await response.json()) as loginAuth;

    return loginData;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}
