import { BASE_URL } from "@/constants/apiConfig";
import { ValidatedInvitesResponse } from "@/services/@types";

export async function getValidatedInvitesByCondominiumId(
  condominiumId: number,
  token: string
): Promise<ValidatedInvitesResponse[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/InviteHistory/condominium/${condominiumId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw response.status;
    }

    const validatedInvitesData =
      (await response.json()) as ValidatedInvitesResponse[];

    return validatedInvitesData;
  } catch (error) {
    throw error;
  }
}
