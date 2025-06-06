import { BASE_URL } from "@/constants/apiConfig";
import { AdressRequest, AdressType } from "@/services/@types/adress";

export async function GetAllAdresses({ employeeId }: AdressRequest) {
  try {
    const response = await fetch(`${BASE_URL}/Adress`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ employeeId: employeeId }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch adresses");
    }

    const adresses = (await response.json()) as AdressType;
    return adresses;
  } catch (error) {
    throw error;
  }
}
