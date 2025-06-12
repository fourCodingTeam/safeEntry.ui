import { BASE_URL } from "@/constants/apiConfig";
import { createResidentResponse } from "@/services/@types";

export async function getResidentById(
  id: number,
  token: string
): Promise<createResidentResponse> {
  try {
    const response = await fetch(`${BASE_URL}/Residents/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw response.status;
    }

    const residentData = (await response.json()) as createResidentResponse;
    return residentData;
  } catch (error) {
    throw error;
  }
}

export async function patchUpdatePersonStatus(
  residentId: number,
  newStatus: number,
  token: string
) {
  try {
    const response = await fetch(`${BASE_URL}/Residents/status/${residentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newStatus: newStatus }),
    });

    if (!response.ok) {
      throw response.status;
    }

    return true;
  } catch (error) {
    throw error;
  }
}
