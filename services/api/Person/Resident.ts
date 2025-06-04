import { BASE_URL } from "@/constants/apiConfig";
import { createPersonRequest } from "../../request/Person/CreatePersonRequest";

export async function CreatePerson(data: createPersonRequest): Promise<String> {
  try {
    const response = await fetch(`${BASE_URL}/Resident`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Erro ${response.status}: ${errorData.message || "Erro desconhecido"}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao criar um novo morador", error);
    throw error;
  }
}
