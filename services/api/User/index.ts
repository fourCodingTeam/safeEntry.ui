import { BASE_URL } from "@/constants/apiConfig";
import { GetUsersResponse } from "@/services/@types/users/users";

export async function postRegisterUser(
  token: string,
  personId: number,
  email: string,
  password: string,
  userType: number
) {
  try {
    const response = await fetch(`${BASE_URL}/Auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        token,
        personId,
        email,
        password,
        userType,
      }),
    });

    if (!response.ok) {
      console.error("Failed to create user:", response.status);
      return "Algum campo errado.";
    }
    return true;
  } catch (error) {
    console.error("Erro ao criar um novo usuário", error);
    throw error;
  }
}

export async function postPasswordChange(
  token: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  try {
    const response = await fetch(`${BASE_URL}/Auth/password/change`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        token,
        email,
        password,
        confirmPassword,
      }),
    });

    if (!response.ok) {
      console.error("Failed to change password:", response.status);
      return "Algum campo errado.";
    }
    return true;
  } catch (error) {
    console.error("Erro ao alterar a senha", error);
    throw error;
  }
}

export async function getUsers(token: string): Promise<GetUsersResponse[]> {
  try {
    const response = await fetch(`${BASE_URL}/Auth/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw response.status;
    }

    const userData = (await response.json()) as GetUsersResponse[];
    return userData;
  } catch (error) {
    throw error;
  }
}
