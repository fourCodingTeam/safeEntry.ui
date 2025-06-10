import { BASE_URL } from "@/constants/apiConfig";
import { createResidentResponse } from "@/services/@types";

export async function postCreateResident(
  token: string,
  name: string,
  phoneNumber: number,
  condominiumId: number,
  homeNumber: number,
  email: string,
  password: string,
  isHomeOwner: boolean,
  homeStreet?: string
): Promise<createResidentResponse | null> {
  try {
    const response = await fetch(`${BASE_URL}/Residents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        token,
        name,
        phoneNumber,
        condominiumId,
        homeStreet,
        homeNumber,
        email,
        password,
        isHomeOwner,
      }),
    });

    if (!response.ok) {
      console.error("Failed to create resident:", response.status);
      return null;
    }
    const data = await response.json();
    return data as createResidentResponse;
  } catch (error) {
    console.error("Erro ao criar um novo morador", error);
    throw error;
  }
}
