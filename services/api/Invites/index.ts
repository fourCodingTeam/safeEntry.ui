import { BASE_URL } from "@/constants/apiConfig";
import {
  InviteGenerateRequest,
  InviteGenerateResponse,
  InviteResponse,
} from "@/services/@types/invite";

export async function getInvitesByResidentId(
  residentId: number,
  token: string
): Promise<InviteResponse[]> {
  try {
    const response = await fetch(`${BASE_URL}/Invite/resident/${residentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return [];
    }

    const invitesData = (await response.json()) as InviteResponse[];

    return invitesData;
  } catch (error) {
    throw error;
  }
}

export async function getInviteByResidentIdAndVisitorIdAndCode(
  token: string,
  residentId: number,
  visitorId: number,
  code: number
): Promise<InviteResponse | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/Invite/resident/${residentId}/${visitorId}/${code}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch invite:", response.status);
      return null;
    }

    const inviteData = (await response.json()) as InviteResponse;

    return inviteData;
  } catch (error) {
    console.error("Error fetching invite:", error);
    throw error;
  }
}

export async function postInviteGenerate(
  token: string,
  residentId: number,
  visitorName: string,
  visitorPhoneNumber: number,
  startDate: Date,
  daysToExpiration: number,
  justification: string
) {
  try {
    const response = await fetch(`${BASE_URL}/Invite/Generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        residentId,
        visitorName,
        visitorPhoneNumber,
        startDate,
        daysToExpiration,
        justification,
      } as InviteGenerateRequest),
    });

    if (!response.ok) {
      console.error("Failed to generate invite:", response.status);
      return { code: response.status } as InviteGenerateResponse;
    }

    const inviteData = (await response.json()) as InviteGenerateResponse;
    return inviteData;
  } catch (error) {
    throw error;
  }
}
