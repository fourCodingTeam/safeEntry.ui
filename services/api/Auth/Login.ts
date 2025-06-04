import { BASE_URL } from "@/constants/apiConfig";
import { loginAuth } from "@/services/@types/loginAuth";

export async function Login(email: string, password: string) {
  try {
    const response = await fetch(`${BASE_URL}/Auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    const loginData = (await response.json()) as loginAuth;

    return loginData;
  } catch (error) {
    throw error;
  }
}
