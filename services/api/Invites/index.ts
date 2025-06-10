import { BASE_URL } from "@/constants/apiConfig";
import {
  InviteGenerateRequest,
  InviteGenerateResponse,
  InviteResponse,
  InviteValidateRequest,
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

export async function getInvitesByAddressId(
  addressId: number,
  token: string
): Promise<InviteResponse[]> {
  try {
    const response = await fetch(`${BASE_URL}/Invite/address/${addressId}`, {
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
export async function postInviteValidate(
  token: string,
  addressId: number,
  visitorId: number,
  employeeId: number,
  code: number,
  dateNow: Date
) {
  try {
    const response = await fetch(`${BASE_URL}/Invite/Validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        addressId,
        visitorId,
        employeeId,
        code,
        dateNow,
      } as InviteValidateRequest),
    });

    if (!response.ok) {
      console.error("Failed to validate invite:", response.status);
      return "Convite expirado ou não existente";
    }

    return true;
  } catch (error) {
    throw error;
  }
}

export async function putDeactivateInvite(
  token: string,
  addressId: number,
  visitorId: number,
  code: number
) {
  try {
    const response = await fetch(
      `${BASE_URL}/Invite/deactivate/${addressId}/${visitorId}/${code}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to deactivate invite:", response.status);
      return "Convite expirado ou não existente";
    }

    return true;
  } catch (error) {
    throw error;
  }
}

export async function putActivateInvite(
  token: string,
  addressId: number,
  visitorId: number,
  code: number
) {
  try {
    const response = await fetch(
      `${BASE_URL}/Invite/activate/${addressId}/${visitorId}/${code}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to activate invite:", response.status);
      return "Convite expirado ou não existente";
    }

    return true;
  } catch (error) {
    throw error;
  }
}
